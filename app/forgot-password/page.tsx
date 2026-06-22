"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { sendPasswordResetOTP, verifyOTP, verifyOTPAndResetPassword } from "@/features/auth/actions/auth";
import {
  Phone,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  ShieldCheck,
  ArrowLeft,
  KeyRound,
  CheckCircle2
} from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();

  // 'request' = enter phone to get OTP
  // 'verify' = enter OTP to verify
  // 'reset' = enter new password
  // 'success' = password reset confirmation
  const [step, setStep] = useState<"request" | "verify" | "reset" | "success">("request");
  const [phone, setPhone] = useState("");
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
  const [verifiedOtp, setVerifiedOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Send OTP
  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const sanitizedPhone = phone.trim().replace(/\D/g, "");
    if (sanitizedPhone.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await sendPasswordResetOTP(sanitizedPhone);

      if (res.error) {
        setError(res.error);
      } else {
        setSuccessMsg(`OTP sent successfully to +91 ${sanitizedPhone}.`);
        setStep("verify");
        // Reset OTP input boxes
        setOtpValues(Array(6).fill(""));
        // Delay focus slightly to ensure render
        setTimeout(() => {
          document.getElementById("otp-0")?.focus();
        }, 100);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // OTP Change and Navigation Handlers
  const handleOtpChange = (value: string, index: number) => {
    const val = value.replace(/\D/g, "");
    const newOtp = [...otpValues];
    newOtp[index] = val ? val[val.length - 1] : "";
    setOtpValues(newOtp);

    // If a digit was entered, move focus to the next box
    if (val && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!otpValues[index] && index > 0) {
        // If current box is empty, clear and focus the previous box
        const newOtp = [...otpValues];
        newOtp[index - 1] = "";
        setOtpValues(newOtp);
        document.getElementById(`otp-${index - 1}`)?.focus();
      } else if (otpValues[index]) {
        // If current box has a value, just clear it
        const newOtp = [...otpValues];
        newOtp[index] = "";
        setOtpValues(newOtp);
      }
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim().replace(/\D/g, "");
    if (pastedData.length >= 6) {
      const newOtp = pastedData.slice(0, 6).split("");
      setOtpValues(newOtp);
      document.getElementById("otp-5")?.focus();
    }
  };

  // Verify OTP only
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    const otpCode = otpValues.join("");
    if (otpCode.length !== 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await verifyOTP(phone, otpCode);

      if (res.error) {
        setError(res.error);
        // Clear OTP inputs on failure for retry
        setOtpValues(Array(6).fill(""));
        document.getElementById("otp-0")?.focus();
      } else {
        setVerifiedOtp(otpCode);
        setStep("reset");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during verification. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset Password using verified OTP
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await verifyOTPAndResetPassword(phone, verifiedOtp, password);

      if (res.error) {
        setError(res.error);
      } else {
        setStep("success");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-[#0a0f1d] relative overflow-hidden">
      {/* Back Button */}
      <Link
        href="/login"
        className="absolute top-8 left-8 flex items-center gap-3 text-gray-400 hover:text-white transition-colors group z-20"
      >
        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </div>
        <span className="font-medium hidden sm:block">Back to Login</span>
      </Link>

      {/* Background glowing orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Glass Container */}
      <div className="relative w-full max-w-md bg-white/[0.03] backdrop-blur-2xl p-8 rounded-3xl border border-white/10 shadow-2xl z-10">
        
        {/* Step 1: Request OTP */}
        {step === "request" && (
          <>
            <div className="mb-8 text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20 mb-4">
                <KeyRound className="w-6 h-6 text-blue-400" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
                Forgot Password
              </h1>
              <p className="text-gray-400 text-sm max-w-xs mx-auto">
                Enter your registered mobile number. We'll send you an OTP to reset your password.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 text-sm bg-red-500/10 text-red-400 rounded-xl border border-red-500/20 flex items-start gap-3 animate-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleRequestOTP} className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="Mobile Number (10 digits)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-200"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full py-3.5 mt-2 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] flex items-center justify-center overflow-hidden"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Send OTP"
                )}
              </button>
            </form>
          </>
        )}

        {/* Step 2: Verify OTP (Dynamic 6-Box layout) */}
        {step === "verify" && (
          <>
            <div className="mb-8 text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20 mb-4">
                <ShieldCheck className="w-6 h-6 text-blue-400" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
                Verify OTP
              </h1>
              <p className="text-gray-400 text-sm max-w-xs mx-auto">
                We've sent an OTP to <span className="text-blue-400 font-bold">+91 {phone}</span>. Please enter the 6-digit code.
              </p>
            </div>

            {successMsg && (
              <div className="mb-6 p-4 text-sm bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                <p>{successMsg}</p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 text-sm bg-red-500/10 text-red-400 rounded-xl border border-red-500/20 flex items-start gap-3 animate-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleVerifyOTP} className="space-y-6">
              
              {/* Dynamic 6-Box OTP Fields */}
              <div className="flex justify-between gap-2.5 px-1">
                {otpValues.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    required
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, idx)}
                    onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                    onPaste={idx === 0 ? handleOtpPaste : undefined}
                    className="w-12 h-12 text-center rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xl outline-none focus:border-blue-500/80 focus:bg-white/10 focus:ring-2 focus:ring-blue-500/20 transition-all font-mono"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full py-3.5 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] flex items-center justify-center overflow-hidden"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep("request");
                  setError("");
                  setSuccessMsg("");
                }}
                className="w-full text-center text-sm text-gray-400 hover:text-white transition-colors"
              >
                Change Mobile Number
              </button>
            </form>
          </>
        )}

        {/* Step 3: Reset Password (Show ONLY after OTP validation) */}
        {step === "reset" && (
          <>
            <div className="mb-8 text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 mb-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-450" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
                New Password
              </h1>
              <p className="text-gray-400 text-sm max-w-xs mx-auto">
                OTP verified successfully! Please enter your new password below.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 text-sm bg-red-500/10 text-red-400 rounded-xl border border-red-500/20 flex items-start gap-3 animate-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleResetPassword} className="space-y-4">
              
              {/* Password Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="New Password (min 8 chars)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {/* Confirm Password Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full py-3.5 mt-2 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] flex items-center justify-center overflow-hidden"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Resetting password...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          </>
        )}

        {/* Step 4: Success Screen */}
        {step === "success" && (
          <div className="text-center py-6 flex flex-col items-center">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20 mb-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
              Password Reset
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Your password has been successfully updated. Redirecting you to the login page...
            </p>

            <Link
              href="/login"
              className="group flex items-center justify-center w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all duration-200 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]"
            >
              Go to Login
            </Link>
          </div>
        )}

      </div>
    </main>
  );
}
