"use server";

import { createPublicSupabaseClient } from "@/lib/supabase-server";

export async function getVerificationRecord(queryStr: string) {
  const sanitizedQuery = queryStr.trim();

  if (!sanitizedQuery) {
    return { error: "Please enter a valid Roll Number, Certificate Number, or Marksheet Number." };
  }

  try {
    const supabase = createPublicSupabaseClient();

    // Query the verifications table by roll_number, certificate_no, marksheet_no, admission_no, or student_id (case-insensitive where possible)
    const { data, error } = await supabase
      .from("verifications")
      .select("*")
      .or(`roll_number.ilike.${sanitizedQuery},certificate_no.ilike.${sanitizedQuery},marksheet_no.ilike.${sanitizedQuery},admission_no.ilike.${sanitizedQuery},student_id.ilike.${sanitizedQuery}`)
      .maybeSingle();

    if (error) {
      console.error("Verification query error:", error);
      return { error: "An error occurred while checking credentials. Please try again." };
    }

    if (!data) {
      return { error: "No records found matching this reference. Please check the number and try again." };
    }

    return { success: true, record: data };
  } catch (err: any) {
    console.error("Verification exception:", err);
    return { error: "Failed to connect to the database. Please try again later." };
  }
}
