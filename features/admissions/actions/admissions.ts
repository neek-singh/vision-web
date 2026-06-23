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
      
      const { count } = await supabase
        .from("students")
        .select("*", { count: "exact", head: true })
        .ilike("student_id", `${idPrefix}%`);
      
      const nextNumber = (count || 0) + 1;
      const sequence = nextNumber.toString().padStart(3, "0");
      const studentId = `${idPrefix}${sequence}`;

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
