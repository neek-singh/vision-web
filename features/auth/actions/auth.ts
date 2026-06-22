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
