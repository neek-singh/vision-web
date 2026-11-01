"use server";

import { createPublicSupabaseClient } from "@/lib/supabase-server";
import { headers } from "next/headers";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory sliding window rate limiter: max 5 requests per IP per minute
const rateLimitMap = new Map<string, RateLimitEntry>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  // Periodic cleanup if map grows
  if (rateLimitMap.size > 1000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (now > val.resetAt) rateLimitMap.delete(key);
    }
  }

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 1000 });
    return false;
  }

  if (entry.count >= 5) {
    return true;
  }

  entry.count += 1;
  return false;
}

export async function getVerificationRecord(queryStr: string, dobStr?: string) {
  // 1. IP-based rate limiting
  try {
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : headersList.get("x-real-ip") || "unknown";

    if (checkRateLimit(ip)) {
      return {
        error: "Too many verification requests from this device. Please wait a minute before trying again.",
      };
    }
  } catch (headerErr) {
    console.warn("Could not determine client IP for rate limiting:", headerErr);
  }

  const sanitizedQuery = queryStr?.trim();
  const sanitizedDob = dobStr?.trim();

  // 2. Server-side compulsory validation: both Query and DOB required
  if (!sanitizedQuery || !sanitizedDob) {
    return {
      error: "Both Certificate ID / Roll Number and Date of Birth are required to verify records.",
    };
  }

  try {
    const supabase = createPublicSupabaseClient();

    // 3. Query matching student reference
    const { data, error } = await supabase
      .from("verifications")
      .select("id, student_name, course_name, roll_number, certificate_no, marksheet_no, issue_date, status, dob")
      .or(
        `roll_number.ilike.${sanitizedQuery},certificate_no.ilike.${sanitizedQuery},marksheet_no.ilike.${sanitizedQuery},admission_no.ilike.${sanitizedQuery},student_id.ilike.${sanitizedQuery}`
      )
      .maybeSingle();

    if (error) {
      console.error("Verification query error:", error);
      return {
        error: "Unable to verify credentials at this moment. Please try again.",
      };
    }

    const genericNotFound = "No verified record found matching the provided Certificate ID and Date of Birth.";

    // 4. Record not found
    if (!data || !data.dob) {
      return { error: genericNotFound };
    }

    // 5. Server-side DOB verification (exact date match)
    const inputDate = new Date(sanitizedDob).toISOString().split("T")[0];
    const recordDate = new Date(data.dob).toISOString().split("T")[0];

    if (inputDate !== recordDate) {
      return { error: genericNotFound };
    }

    // 6. Safe public fields only — no phone, address, or internal URLs leaked
    const safeRecord = {
      student_name: data.student_name,
      course_name: data.course_name,
      roll_number: data.certificate_no || data.roll_number,
      certificate_no: data.certificate_no || data.roll_number,
      issue_date: data.issue_date,
      status: data.status || "Verified",
      center_name: "Vision IT Computer Institute",
      center_code: "DCE/25/041",
    };

    return { success: true, record: safeRecord };
  } catch (err: any) {
    console.error("Verification exception:", err);
    return {
      error: "Failed to connect to the verification registry. Please try again later.",
    };
  }
}
