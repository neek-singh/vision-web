"use server";

import { createServerSupabaseClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export async function signOut() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/");
}

// 📱 Send password reset OTP via TextBee SMS Gateway
export async function sendPasswordResetOTP(phone: string) {
  const sanitizedPhone = phone.trim().replace(/\D/g, "");
  
  if (sanitizedPhone.length !== 10) {
    return { error: "Please enter a valid 10-digit mobile number." };
  }

  const supabase = await createServerSupabaseClient();

  // 1. Verify if the phone number exists in admissions
  const { data: admission, error: fetchError } = await supabase
    .from("admissions")
    .select("email")
    .eq("phone", sanitizedPhone)
    .limit(1);

  if (fetchError || !admission || admission.length === 0) {
    return { error: "This mobile number is not registered with any student profile." };
  }

  const email = admission[0].email;

  // 2. Generate a 6-digit numeric OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes

  // 3. Save OTP in the database (clear old ones first)
  await supabase
    .from("password_reset_otps")
    .delete()
    .eq("phone", sanitizedPhone);

  const { error: insertError } = await supabase
    .from("password_reset_otps")
    .insert([
      {
        email,
        phone: sanitizedPhone,
        otp,
        expires_at: expiresAt,
      }
    ]);

  if (insertError) {
    console.error("OTP insert error:", insertError);
    return { error: "Failed to generate OTP. Please try again." };
  }

  // 4. Send SMS via TextBee API
  try {
    const textBeeUrl = "https://api.textbee.dev/api/v1/gateway/devices/6a38c43577015dcde182aaaa/send-sms";
    const response = await fetch(textBeeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "77fcb14a-f6a2-4aa6-9e38-869b77c0256e",
      },
      body: JSON.stringify({
        recipients: [`+91${sanitizedPhone}`],
        message: `Vision IT: Your OTP for password reset is ${otp}. Valid for 10 minutes.`,
      }),
    });

    if (!response.ok) {
      const resText = await response.text();
      console.error("TextBee response error:", resText);
      return { error: "Failed to send SMS. Please check network/device connectivity." };
    }

    return { success: true };
  } catch (err) {
    console.error("SMS sending exception:", err);
    return { error: "Failed to send SMS OTP. Please try again later." };
  }
}

// 🔐 Verify OTP and reset password securely
export async function verifyOTPAndResetPassword(
  phone: string,
  otp: string,
  newPassword: string
) {
  const sanitizedPhone = phone.trim().replace(/\D/g, "");
  const sanitizedOtp = otp.trim();

  if (sanitizedPhone.length !== 10) {
    return { error: "Invalid mobile number." };
  }

  if (sanitizedOtp.length !== 6) {
    return { error: "OTP must be exactly 6 digits." };
  }

  if (newPassword.length < 8) {
    return { error: "Password must be at least 8 characters long." };
  }

  const supabase = await createServerSupabaseClient();

  // Call the secure Postgres RPC function
  const { data: isSuccess, error: rpcError } = await supabase.rpc(
    "verify_otp_and_reset_password",
    {
      user_phone: sanitizedPhone,
      user_otp: sanitizedOtp,
      new_password: newPassword,
    }
  );

  if (rpcError) {
    console.error("Reset password RPC error:", rpcError);
    return { error: "An error occurred during password reset. Please try again." };
  }

  if (!isSuccess) {
    return { error: "Invalid or expired OTP. Please request a new one." };
  }

  return { success: true };
}

// 📱 Verify OTP only (before password reset)
export async function verifyOTP(phone: string, otp: string) {
  const sanitizedPhone = phone.trim().replace(/\D/g, "");
  const sanitizedOtp = otp.trim();

  if (sanitizedPhone.length !== 10) {
    return { error: "Invalid mobile number." };
  }

  if (sanitizedOtp.length !== 6) {
    return { error: "OTP must be exactly 6 digits." };
  }

  const supabase = await createServerSupabaseClient();

  const { data: isSuccess, error } = await supabase.rpc("verify_otp_only", {
    user_phone: sanitizedPhone,
    user_otp: sanitizedOtp,
  });

  if (error) {
    console.error("verify_otp_only RPC error:", error);
    return { error: "An error occurred during verification. Please try again." };
  }

  if (!isSuccess) {
    return { error: "Invalid or expired OTP. Please try again." };
  }

  return { success: true };
}

// 👤 Fetch the full authenticated user profile
export async function getUserProfile() {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) throw error;
    return { success: true, profile };
  } catch (e: any) {
    console.error("Error fetching user profile:", e);
    return { error: e.message || "Failed to fetch profile" };
  }
}

// 👤 Update/complete user profile details
export async function updateUserProfile(profileData: {
  full_name: string;
  father_name: string;
  mother_name: string;
  dob: string;
  gender: string;
  category: string;
  qualification: string;
  phone: string;
  address: string;
  photo_url?: string;
  signature_url?: string;
  identity_proof_url?: string;
  aadhar_proof_url?: string;
  caste_proof_url?: string;
  forceComplete?: boolean; // true when called from OTP-verified path (first-time only)
}) {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    // Fetch existing profile to preserve roll_number and check completion
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    // Check if all required fields are truly filled
    const fieldsComplete = !!(
      profileData.full_name?.trim() &&
      profileData.phone?.trim() &&
      profileData.father_name?.trim() &&
      profileData.mother_name?.trim() &&
      profileData.dob?.trim() &&
      profileData.gender?.trim() &&
      profileData.category?.trim() &&
      profileData.qualification?.trim() &&
      profileData.address?.trim() &&
      profileData.photo_url?.trim() &&
      profileData.signature_url?.trim() &&
      profileData.identity_proof_url?.trim() &&
      profileData.aadhar_proof_url?.trim()
    );

    // forceComplete=true means user went through OTP (first-time verify) — always mark complete
    const isComplete = profileData.forceComplete ? true : fieldsComplete;

    // Roll number is generated ONLY ONCE per account — when profile becomes complete for the first time
    let rollNumber = existingProfile?.roll_number || null;

    if (isComplete && !rollNumber) {
      const currentYear = new Date().getFullYear();
      const prefix = `VIT${currentYear}`;

      const { count } = await supabase
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .like("roll_number", `${prefix}%`);

      const nextSeq = String((count || 0) + 1).padStart(4, "0");
      rollNumber = `${prefix}${nextSeq}`;
    }

    const { revalidatePath } = await import("next/cache");

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profileData.full_name || existingProfile?.full_name,
        father_name: profileData.father_name || null,
        mother_name: profileData.mother_name || null,
        dob: profileData.dob || null,
        gender: profileData.gender || null,
        category: profileData.category || null,
        qualification: profileData.qualification || null,
        phone: profileData.phone || null,
        address: profileData.address || null,
        photo_url: profileData.photo_url || existingProfile?.photo_url || null,
        signature_url: profileData.signature_url || existingProfile?.signature_url || null,
        identity_proof_url: profileData.identity_proof_url || existingProfile?.identity_proof_url || null,
        aadhar_proof_url: profileData.aadhar_proof_url || existingProfile?.aadhar_proof_url || null,
        caste_proof_url: profileData.caste_proof_url || existingProfile?.caste_proof_url || null,
        roll_number: rollNumber,
        is_profile_completed: isComplete,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) throw error;

    revalidatePath("/profile");
    revalidatePath("/dashboard");
    return { success: true, rollNumber, isComplete };
  } catch (e: any) {
    console.error("Error updating user profile:", e);
    return { error: e.message || "Failed to update profile" };
  }
}


// 📱 Send OTP to student mobile via TextBee SMS Gateway
export async function sendOtpSms(phone: string, otp: string) {
  const sanitizedPhone = phone.trim().replace(/\D/g, "");
  if (sanitizedPhone.length !== 10) {
    return { success: false, error: "Please enter a valid 10-digit mobile number." };
  }

  try {
    const textBeeUrl = "https://api.textbee.dev/api/v1/gateway/devices/6a38c43577015dcde182aaaa/send-sms";
    const response = await fetch(textBeeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "77fcb14a-f6a2-4aa6-9e38-869b77c0256e",
      },
      body: JSON.stringify({
        recipients: [`+91${sanitizedPhone}`],
        message: `Vision IT: Your OTP for registration is ${otp}. Valid for 10 minutes.`,
      }),
    });

    if (!response.ok) {
      const resText = await response.text();
      console.error("TextBee OTP response error:", resText);
      return { success: false, error: "Failed to send SMS OTP via TextBee." };
    }

    return { success: true };
  } catch (err: any) {
    console.error("SMS sending exception:", err);
    return { success: false, error: err.message || "Failed to send SMS." };
  }
}

// 📱 Send Registration Number to student mobile via TextBee SMS Gateway
export async function sendRegistrationSms(phone: string, studentName: string, regNumber: string) {
  const sanitizedPhone = phone.trim().replace(/\D/g, "");
  if (sanitizedPhone.length !== 10) {
    return { success: false, error: "Please enter a valid 10-digit mobile number." };
  }

  try {
    const textBeeUrl = "https://api.textbee.dev/api/v1/gateway/devices/6a38c43577015dcde182aaaa/send-sms";
    const message = `Dear ${studentName}, your Student Profile is successfully verified. Your Registration Number is ${regNumber}. Thank you, Vision IT.`;

    const response = await fetch(textBeeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "77fcb14a-f6a2-4aa6-9e38-869b77c0256e",
      },
      body: JSON.stringify({
        recipients: [`+91${sanitizedPhone}`],
        message: message,
      }),
    });

    if (!response.ok) {
      const resText = await response.text();
      console.error("TextBee Registration response error:", resText);
      return { success: false, error: "Failed to send registration SMS via TextBee." };
    }

    return { success: true };
  } catch (err: any) {
    console.error("SMS sending exception:", err);
    return { success: false, error: err.message || "Failed to send SMS." };
  }
}

// 👤 Sync profile data from institute students table if exists
export async function syncProfileFromStudent() {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.email) return { error: "Not authenticated" };

    // 1. Fetch current profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profile && profile.roll_number) {
      // Profile already has a roll number, no need to sync
      return { success: true, profile };
    }

    // 2. Search student in students table
    const emailToSearch = user.email.trim().toLowerCase();
    const { data: student } = await supabase
      .from("students")
      .select("*")
      .ilike("email", emailToSearch)
      .maybeSingle();

    if (!student) {
      return { success: false, reason: "No student record found" };
    }

    // 3. Prepare updated data
    const serializedAddress = student.address ? JSON.stringify({
      village: student.address,
      post: "",
      district: "",
      state: "Chhattisgarh",
      pin: ""
    }) : null;

    const updatedData = {
      full_name: profile?.full_name || student.name,
      phone: profile?.phone || student.phone,
      father_name: profile?.father_name || student.father_name,
      mother_name: profile?.mother_name || student.mother_name,
      dob: profile?.dob || student.dob,
      gender: profile?.gender || student.gender,
      category: profile?.category || student.category,
      address: profile?.address || serializedAddress,
      qualification: profile?.qualification || student.education,
      photo_url: profile?.photo_url || student.photo_url,
      roll_number: profile?.roll_number || student.student_id,
      is_profile_completed: true,
    };

    // 4. Update the profile
    const { data: newProfile, error: updateError } = await supabase
      .from("profiles")
      .update(updatedData)
      .eq("id", user.id)
      .select()
      .single();

    if (updateError) throw updateError;

    const { revalidatePath } = await import("next/cache");
    revalidatePath("/profile");
    revalidatePath("/dashboard");

    return { success: true, profile: newProfile };
  } catch (err: any) {
    console.error("Error in syncProfileFromStudent:", err);
    return { error: err.message || "Failed to sync profile" };
  }
}

