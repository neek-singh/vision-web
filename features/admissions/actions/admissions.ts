"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import bcrypt from "bcryptjs";

export async function submitAdmission(formData: any) {
  try {
    const supabase = await createServerSupabaseClient();
    
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { student_name, email, phone, course_id, message } = formData;

    // Fetch user profile to see if it is already completed
    const { data: profile } = user
      ? await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle()
      : { data: null };

    const isProfileCompleted = !!profile?.is_profile_completed;

    const insertPayload: any = {
      user_id: user?.id,
      student_name: profile?.full_name || student_name,
      email: user?.email || email,
      phone: profile?.phone || phone || (user ? profile?.phone : ""),
      course_id,
      status: "pending",
      message: message || null,
    };

    if (isProfileCompleted && profile) {
      insertPayload.father_name = profile.father_name;
      insertPayload.mother_name = profile.mother_name;
      insertPayload.dob = profile.dob;
      insertPayload.gender = profile.gender;
      insertPayload.category = profile.category;
      insertPayload.address = profile.address;
      insertPayload.qualification = profile.qualification;
      insertPayload.photo_url = profile.photo_url;
      insertPayload.signature_url = profile.signature_url;
      insertPayload.identity_proof_url = profile.identity_proof_url;
      insertPayload.aadhar_proof_url = profile.aadhar_proof_url;
      insertPayload.caste_proof_url = profile.caste_proof_url;
      insertPayload.document_verified = !!profile.document_verified;
      insertPayload.flow_step = profile.document_verified ? "payment" : "review";
    }

    const { data, error } = await supabase
      .from("admissions")
      .insert(insertPayload)
      .select();

    if (error) {
      console.error("Supabase admission insert error:", error);
      throw error;
    }

    revalidatePath("/admin/admissions");
    return { success: true, data };
  } catch (e: any) {
    console.error("Admission saving error:", e);
    return { error: e.message || "Failed to process application" };
  }
}

export async function deleteAdmissionEntry(id: string) {
  try {
    const supabase = await createServerSupabaseClient();
    
    const { error } = await supabase
      .from("admissions")
      .delete()
      .eq("id", id);

    if (error) throw error;

    revalidatePath("/admin/admissions");
    return { success: true };
  } catch (e: any) {
    console.error("Admission deletion error:", e);
    return { error: e.message || "Failed to delete application" };
  }
}

// 📄 Update Admission Personal Details (Step 3)
export async function updateAdmissionPersonalDetails(
  admissionId: string,
  details: {
    father_name: string;
    mother_name: string;
    dob: string;
    gender: string;
    category: string;
    address: string;
    qualification: string;
  }
) {
  try {
    const supabase = await createServerSupabaseClient();

    const { error } = await supabase
      .from("admissions")
      .update({
        father_name: details.father_name,
        mother_name: details.mother_name,
        dob: details.dob,
        gender: details.gender,
        category: details.category,
        address: details.address,
        qualification: details.qualification,
        flow_step: "documents",
      })
      .eq("id", admissionId);

    if (error) throw error;

    // Sync to user profile if logged in
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from("profiles")
        .update({
          father_name: details.father_name,
          mother_name: details.mother_name,
          dob: details.dob,
          gender: details.gender,
          category: details.category,
          address: details.address,
          qualification: details.qualification,
        })
        .eq("id", user.id);
    }

    revalidatePath("/dashboard");
    revalidatePath(`/admissions/pipeline/${admissionId}`);
    return { success: true };
  } catch (e: any) {
    console.error("Personal details update error:", e);
    return { error: e.message || "Failed to save personal details" };
  }
}

// 📸 Update Admission Documents (Step 4)
export async function updateAdmissionDocuments(
  admissionId: string,
  docs: {
    photo_url: string;
    signature_url: string;
    identity_proof_url: string;
  }
) {
  try {
    const supabase = await createServerSupabaseClient();

    const { error } = await supabase
      .from("admissions")
      .update({
        photo_url: docs.photo_url,
        signature_url: docs.signature_url,
        identity_proof_url: docs.identity_proof_url,
        flow_step: "review",
      })
      .eq("id", admissionId);

    if (error) throw error;

    // Sync to user profile if logged in and mark profile as completed
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from("profiles")
        .update({
          photo_url: docs.photo_url,
          signature_url: docs.signature_url,
          identity_proof_url: docs.identity_proof_url,
          is_profile_completed: true,
        })
        .eq("id", user.id);
    }

    revalidatePath("/dashboard");
    revalidatePath(`/admissions/pipeline/${admissionId}`);
    revalidatePath("/admin/admissions");
    return { success: true };
  } catch (e: any) {
    console.error("Documents update error:", e);
    return { error: e.message || "Failed to save documents" };
  }
}

// 👑 Admin Document Verification (Step 5)
export async function verifyAdmissionDocuments(admissionId: string, verified: boolean) {
  try {
    const supabase = await createServerSupabaseClient();

    const { error } = await supabase
      .from("admissions")
      .update({
        document_verified: verified,
        flow_step: verified ? "payment" : "review",
      })
      .eq("id", admissionId);

    if (error) throw error;

    // Sync verification status back to profile so future courses bypass verification
    const { data: admissionData } = await supabase
      .from("admissions")
      .select("user_id")
      .eq("id", admissionId)
      .single();

    if (admissionData?.user_id) {
      await supabase
        .from("profiles")
        .update({ document_verified: verified })
        .eq("id", admissionData.user_id);
    }

    revalidatePath("/dashboard");
    revalidatePath(`/admissions/pipeline/${admissionId}`);
    revalidatePath("/admin/admissions");
    return { success: true };
  } catch (e: any) {
    console.error("Document verification error:", e);
    return { error: e.message || "Failed to verify documents" };
  }
}

// 🔑 Create Student Account & Course Enrollment (Step 7)
export async function createStudentAccountAction(admissionId: string) {
  try {
    const supabase = await createServerSupabaseClient();

    // 1. Get admission details
    const { data: admission, error: fetchError } = await supabase
      .from("admissions")
      .select("*, courses(course_code, title)")
      .eq("id", admissionId)
      .single();

    if (fetchError || !admission) {
      throw new Error("Could not find admission record.");
    }

    // Check if payment is completed
    const { data: payment } = await supabase
      .from("admission_payments")
      .select("id")
      .eq("admission_id", admissionId)
      .eq("status", "completed")
      .maybeSingle();

    if (!payment) {
      throw new Error("Payment is not completed. Please complete payment first.");
    }

    // 2. Check if student already exists for this admission
    const { data: existingStudent } = await supabase
      .from("students")
      .select("id, student_id")
      .eq("admission_id", admissionId)
      .single();

    if (existingStudent) {
      return { success: true, studentId: existingStudent.student_id };
    }

    // Check if student already exists with this email to avoid unique constraint violation
    const { data: studentByEmail } = await supabase
      .from("students")
      .select("id, student_id")
      .eq("email", admission.email)
      .maybeSingle();

    let targetStudent = studentByEmail;

    if (!targetStudent) {
      // 3. Generate Sequential Student ID
      const year = new Date().getFullYear();
      const idPrefix = `VIT${year}STD`;

      // Find the highest existing student_id for this year
      const { data: latestStudents } = await supabase
        .from("students")
        .select("student_id")
        .ilike("student_id", `${idPrefix}%`)
        .order("student_id", { ascending: false })
        .limit(1);

      let nextNum = 1;
      if (latestStudents && latestStudents.length > 0) {
        const latestId = latestStudents[0].student_id;
        if (latestId) {
          const seqStr = latestId.replace(idPrefix, "");
          const seqNum = parseInt(seqStr, 10);
          if (!isNaN(seqNum)) {
            nextNum = seqNum + 1;
          }
        }
      }

      let studentId = "";
      let attempts = 0;
      while (!studentId && attempts < 10) {
        const sequence = String(nextNum + attempts).padStart(3, "0");
        const candidate = `${idPrefix}${sequence}`;

        const { data: existing } = await supabase
          .from("students")
          .select("id")
          .eq("student_id", candidate)
          .maybeSingle();

        if (!existing) {
          studentId = candidate;
        }
        attempts++;
      }

      if (!studentId) {
        throw new Error("Could not generate a unique Student ID");
      }

      // 4. Generate Password
      const firstName = admission.student_name.trim().split(/\s+/)[0];
      const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
      const last4Phone = admission.phone.replace(/\D/g, "").slice(-4);
      const plainPassword = `${capitalizedFirstName}@${last4Phone}`;

      // 5. Hash Password
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      // Format address for students table if it was JSON string
      let formattedAddress = admission.address;
      try {
        if (admission.address && (admission.address.startsWith("{") || admission.address.startsWith("["))) {
          const parsed = JSON.parse(admission.address);
          formattedAddress = `Village/City: ${parsed.village || ""}, Post: ${parsed.post || ""}, District: ${parsed.district || ""}, State: ${parsed.state || ""}, Pin Code: ${parsed.pin || ""}`;
        }
      } catch (e) {
        // Fallback to raw text
      }

      // 6. Insert into students table
      const { data: newStudent, error: studentError } = await supabase
        .from("students")
        .insert({
          student_id: studentId,
          name: admission.student_name,
          email: admission.email,
          phone: admission.phone,
          course: (admission.courses as any)?.title || "N/A",
          password: hashedPassword,
          admission_id: admissionId,
          father_name: admission.father_name,
          mother_name: admission.mother_name,
          dob: admission.dob,
          gender: admission.gender,
          education: admission.qualification, // Highest Qualification maps to education
          category: admission.category,       // Category maps to category
          address: formattedAddress
        })
        .select()
        .single();

      if (studentError) {
        console.error("Student creation error:", studentError);
        throw new Error("Failed to create student account: " + studentError.message);
      }

      targetStudent = newStudent;
    } else {
      // Link existing student to this admission record
      await supabase
        .from("students")
        .update({ admission_id: admissionId })
        .eq("id", targetStudent.id);
    }

    // 7. Create enrollment (if not already enrolled)
    if (targetStudent) {
      const { data: existingEnrollment } = await supabase
        .from("enrollments")
        .select("id")
        .eq("student_id", targetStudent.id)
        .eq("course_id", admission.course_id)
        .maybeSingle();

      if (!existingEnrollment) {
        await supabase
          .from("enrollments")
          .insert({
            student_id: targetStudent.id,
            course_id: admission.course_id,
            batch: null,
            progress_percentage: 0
          });
      }
    }

    revalidatePath("/dashboard");
    revalidatePath(`/admissions/pipeline/${admissionId}`);
    return { success: true, studentId: targetStudent?.student_id };
  } catch (e: any) {
    console.error("Student creation error in pipeline:", e);
    return { error: e.message || "Failed to create student account" };
  }
}

// 📱 Send OTP to student mobile for admission verification
export async function sendAdmissionOtp(phone: string) {
  const sanitizedPhone = phone.trim().replace(/\D/g, "");
  if (sanitizedPhone.length !== 10) {
    return { error: "Please enter a valid 10-digit mobile number." };
  }

  const supabase = await createServerSupabaseClient();

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes

  try {
    // 1. Clear old OTPs for this phone
    await supabase
      .from("admission_otps")
      .delete()
      .eq("phone", sanitizedPhone);

    // 2. Save new OTP
    const { error: insertError } = await supabase
      .from("admission_otps")
      .insert({
        phone: sanitizedPhone,
        otp,
        expires_at: expiresAt,
      });

    if (insertError) {
      console.error("OTP insert error:", insertError);
      return { error: "Failed to generate OTP. Please try again." };
    }

    // 3. Send SMS via TextBee API
    const textBeeUrl = "https://api.textbee.dev/api/v1/gateway/devices/6a38c43577015dcde182aaaa/send-sms";
    const response = await fetch(textBeeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "77fcb14a-f6a2-4aa6-9e38-869b77c0256e",
      },
      body: JSON.stringify({
        recipients: [`+91${sanitizedPhone}`],
        message: `Vision IT: Your OTP for admission verification is ${otp}. Valid for 10 minutes.`,
      }),
    });

    if (!response.ok) {
      const resText = await response.text();
      console.error("TextBee OTP response error:", resText);
      return { error: "Failed to send SMS OTP. Please check device connectivity." };
    }

    return { success: true };
  } catch (err: any) {
    console.error("SMS sending exception:", err);
    return { error: err.message || "Failed to send SMS OTP. Please try again." };
  }
}

// 🔐 Verify OTP and generate Admission Number
export async function verifyAdmissionOtp(
  phone: string,
  otp: string,
  admissionId: string
) {
  const sanitizedPhone = phone.trim().replace(/\D/g, "");
  const sanitizedOtp = otp.trim();

  if (sanitizedPhone.length !== 10) {
    return { error: "Invalid mobile number." };
  }

  if (sanitizedOtp.length !== 6) {
    return { error: "OTP must be exactly 6 digits." };
  }

  const supabase = await createServerSupabaseClient();

  try {
    // 1. Fetch latest active OTP for this phone
    const { data: otpRecord, error: otpError } = await supabase
      .from("admission_otps")
      .select("*")
      .eq("phone", sanitizedPhone)
      .eq("otp", sanitizedOtp)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (otpError || !otpRecord) {
      return { error: "Invalid or expired OTP. Please request a new one." };
    }

    // 2. Delete the used OTP record
    await supabase
      .from("admission_otps")
      .delete()
      .eq("id", otpRecord.id);

    // 3. Check if admission number is already generated
    const { data: existingAdmission, error: fetchErr } = await supabase
      .from("admissions")
      .select("admission_no")
      .eq("id", admissionId)
      .single();

    if (fetchErr) {
      return { error: "Could not find admission record." };
    }

    let admissionNo = existingAdmission?.admission_no;

    if (!admissionNo) {
      // 4. Generate next sequential Admission No (e.g. VIT2026ADM0001)
      const currentYear = new Date().getFullYear();
      const prefix = `VIT${currentYear}ADM`;

      const { count } = await supabase
        .from("admissions")
        .select("id", { count: "exact", head: true })
        .like("admission_no", `${prefix}%`);

      const nextSeq = String((count || 0) + 1).padStart(4, "0");
      admissionNo = `${prefix}${nextSeq}`;

      // 5. Update admission record with generated Admission No.
      const { error: updateErr } = await supabase
        .from("admissions")
        .update({
          admission_no: admissionNo,
          updated_at: new Date().toISOString(),
        })
        .eq("id", admissionId);

      if (updateErr) {
        console.error("Admission number update error:", updateErr);
        return { error: "Failed to generate Admission Number." };
      }
    }

    revalidatePath("/admin/admissions");
    revalidatePath("/dashboard");
    revalidatePath(`/admissions/pipeline/${admissionId}`);

    return { success: true, admissionNo };
  } catch (err: any) {
    console.error("OTP verification error:", err);
    return { error: err.message || "Failed to verify OTP." };
  }
}

