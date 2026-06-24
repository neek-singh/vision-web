"use client";

import { useState, Suspense, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AuthServices } from "@/lib/auth";
import { sendOtpSms, checkAccountExists } from "@/features/auth/actions/auth";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  Loader2,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "";

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isAutoLoggedIn, setIsAutoLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // OTP States
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [existingAccountField, setExistingAccountField] = useState<"email" | "phone" | null>(null);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for resend
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const validateForm = () => {
    if (!formData.full_name.trim()) return "Full name is required.";
    if (!formData.email.trim()) return "Email address is required.";
    if (!formData.phone.trim()) return "Mobile number is required.";
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone))
      return "Please enter a valid 10-digit Indian mobile number.";
    if (formData.password.length < 8)
      return "Password must be at least 8 characters.";
    if (formData.password !== formData.confirm_password)
      return "Passwords do not match.";
    return "";
  };

  // Step 1: Validate form, check existing account, then send OTP
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setExistingAccountField(null);

    const validationErr = validateForm();
    if (validationErr) {
      setError(validationErr);
      return;
    }

    setOtpSending(true);
    try {
      // 🔍 Check if email or phone already exists
      const check = await checkAccountExists(formData.email, formData.phone);
      if (check.exists) {
        setExistingAccountField(check.field as "email" | "phone");
        setError(check.message || "Account already exists. Please log in.");
        return;
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otp);

      const smsRes = await sendOtpSms(formData.phone, otp);
      if (!smsRes.success) {
        setError(
          "Failed to send OTP. Please check your mobile number and try again."
        );
        return;
      }

      // OTP sent successfully — open modal
      setOtpDigits(["", "", "", "", "", ""]);
      setOtpError("");
      setShowOtpModal(true);
      setResendCooldown(60);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setOtpSending(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setOtpSending(true);
    setOtpError("");
    try {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otp);
      await sendOtpSms(formData.phone, otp);
      setOtpDigits(["", "", "", "", "", ""]);
      setResendCooldown(60);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch {
      setOtpError("Failed to resend OTP. Please try again.");
    } finally {
      setOtpSending(false);
    }
  };

  // OTP digit input handlers
  const handleOtpChange = (index: number, val: string) => {
    const digit = val.slice(-1).replace(/\D/g, "");
    const newDigits = [...otpDigits];
    newDigits[index] = digit;
    setOtpDigits(newDigits);
    setOtpError("");
    if (digit && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      const newDigits = [...otpDigits];
      newDigits[index - 1] = "";
      setOtpDigits(newDigits);
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData
      .getData("text")
      .trim()
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!text) return;
    const newDigits = Array(6)
      .fill("")
      .map((_, i) => text[i] || "");
    setOtpDigits(newDigits);
    otpRefs.current[Math.min(text.length - 1, 5)]?.focus();
  };

  // Step 2: Verify OTP and create account
  const handleVerifyAndSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otpDigits.join("");

    if (enteredOtp.length < 6) {
      setOtpError("Please enter the complete 6-digit OTP.");
      return;
    }

    if (enteredOtp !== generatedOtp) {
      setOtpError("Incorrect OTP. Please check the code sent to your mobile.");
      return;
    }

    setOtpVerifying(true);
    setOtpError("");

    try {
      const { data, error: authError } = await AuthServices.signUp(
        formData.email,
        formData.password,
        formData.full_name,
        redirectPath,
        formData.phone
      );

      if (authError) {
        if (
          authError.message.includes("already registered") ||
          authError.message.includes("already exists")
        ) {
          setOtpError("Email already exists. Redirecting to login...");
          setTimeout(() => {
            router.push(
              `/login${redirectPath ? `?redirect=${encodeURIComponent(redirectPath)}` : ""}`
            );
          }, 2000);
          return;
        }
        setOtpError(authError.message);
        return;
      }

      const hasSession = !!data?.session;
      setIsAutoLoggedIn(hasSession);
      setShowOtpModal(false);
      setSuccess(true);

      if (hasSession) {
        setTimeout(() => router.push("/profile"), 2000);
      } else {
        setTimeout(
          () =>
            router.push(
              `/login${redirectPath ? `?redirect=${encodeURIComponent(redirectPath)}` : ""}`
            ),
          3000
        );
      }
    } catch (err) {
      setOtpError("Something went wrong. Please try again.");
    } finally {
      setOtpVerifying(false);
    }
  };

  // ✅ Success Screen
  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 bg-[#0a0f1d] relative overflow-hidden">
        <Link
          href="/"
          className="absolute top-8 left-8 flex items-center gap-3 text-gray-400 hover:text-white transition-colors group z-20"
        >
          <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <span className="font-medium hidden sm:block">Back to Home</span>
        </Link>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 max-w-md w-full text-center shadow-2xl animate-in fade-in zoom-in duration-500">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
            {isAutoLoggedIn ? "Welcome! 🎉" : "Account Created!"}
          </h2>
          <p className="text-gray-400 mb-2 leading-relaxed text-sm">
            {isAutoLoggedIn
              ? "Your account has been successfully created and verified."
              : "We've sent a verification link to your email. Please verify before logging in."}
          </p>
          <p className="text-gray-500 text-xs mb-8">
            {isAutoLoggedIn
              ? "Redirecting to your profile..."
              : "Redirecting to login page..."}
          </p>
          <Link
            href={
              isAutoLoggedIn
                ? "/profile"
                : `/login${redirectPath ? `?redirect=${encodeURIComponent(redirectPath)}` : ""}`
            }
            className="group flex items-center justify-center w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all duration-200 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]"
          >
            {isAutoLoggedIn ? "Go to Profile" : "Go to Login"}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </main>
    );
  }

  // 📝 Signup Form
  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-[#0a0f1d] relative overflow-hidden">
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-3 text-gray-400 hover:text-white transition-colors group z-20"
      >
        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </div>
        <span className="font-medium hidden sm:block">Back to Home</span>
      </Link>

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-md bg-white/[0.03] backdrop-blur-2xl p-8 rounded-3xl border border-white/10 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Create Account
          </h1>
          <p className="text-gray-400 text-sm">Join us to get started</p>
        </div>

        {error && (
          <div className={`mb-5 p-4 text-sm rounded-xl border flex flex-col gap-3 animate-in slide-in-from-top-2 ${
            existingAccountField
              ? "bg-amber-500/10 text-amber-300 border-amber-500/25"
              : "bg-red-500/10 text-red-400 border-red-500/20"
          }`}>
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{error}</p>
            </div>
            {existingAccountField && (
              <Link
                href={`/login${redirectPath ? `?redirect=${encodeURIComponent(redirectPath)}` : ""}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all"
              >
                Go to Login
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
            </div>
            <input
              type="text"
              name="full_name"
              required
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-200"
            />
          </div>

          {/* Email */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
            </div>
            <input
              type="email"
              name="email"
              required
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-200"
            />
          </div>

          {/* Mobile Number */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
            </div>
            <input
              type="tel"
              name="phone"
              required
              placeholder="Mobile Number (10-digit)"
              value={formData.phone}
              onChange={handleChange}
              maxLength={10}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-200"
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="Password (min. 8 characters)"
              value={formData.password}
              onChange={handleChange}
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

          {/* Confirm Password */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirm_password"
              required
              placeholder="Confirm Password"
              value={formData.confirm_password}
              onChange={handleChange}
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

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={otpSending}
            className="relative w-full py-3.5 mt-2 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2"
          >
            {otpSending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending OTP...
              </>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5" />
                Sign Up & Verify
              </>
            )}
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-8 text-center">
          Already have an account?{" "}
          <Link
            href={`/login${redirectPath ? `?redirect=${encodeURIComponent(redirectPath)}` : ""}`}
            className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors"
          >
            Log in here
          </Link>
        </p>
      </div>

      {/* ─── OTP Verification Modal ─── */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-[#0f1629] border border-white/10 rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 rounded-t-3xl" />

            {/* Icon */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                <Phone className="w-7 h-7 text-blue-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-1">Verify Mobile Number</h2>
              <p className="text-gray-400 text-xs leading-relaxed">
                We've sent a 6-digit OTP to{" "}
                <span className="text-white font-semibold">+91 {formData.phone}</span>
              </p>
            </div>

            {/* OTP Error */}
            {otpError && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-medium text-center animate-in slide-in-from-top-2">
                {otpError}
              </div>
            )}

            {/* OTP Form */}
            <form onSubmit={handleVerifyAndSignup} className="space-y-5">
              {/* 6-Digit OTP boxes */}
              <div className="flex justify-center gap-2.5">
                {otpDigits.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { otpRefs.current[i] = el; }}
                    id={`signup-otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    onPaste={handleOtpPaste}
                    className="w-11 h-13 text-center text-xl font-extrabold text-white bg-white/5 border border-white/15 focus:border-blue-500 focus:bg-white/10 focus:ring-2 focus:ring-blue-500/30 rounded-xl outline-none transition-all duration-150"
                    style={{ height: "52px" }}
                  />
                ))}
              </div>

              {/* Resend */}
              <div className="text-center">
                {resendCooldown > 0 ? (
                  <p className="text-gray-500 text-xs">
                    Resend OTP in{" "}
                    <span className="text-blue-400 font-bold">{resendCooldown}s</span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={otpSending}
                    className="text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors flex items-center gap-1.5 mx-auto disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${otpSending ? "animate-spin" : ""}`} />
                    {otpSending ? "Sending..." : "Resend OTP"}
                  </button>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowOtpModal(false)}
                  disabled={otpVerifying}
                  className="flex-1 h-11 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 rounded-xl text-sm font-semibold transition-all cursor-pointer disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={otpVerifying || otpDigits.join("").length < 6}
                  className="flex-1 h-11 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                >
                  {otpVerifying ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Verify & Create
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center px-4 bg-[#0a0f1d] relative overflow-hidden">
          <div className="flex flex-col items-center gap-4 animate-pulse">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <p className="text-white font-medium text-sm">Loading secure registration...</p>
          </div>
        </main>
      }
    >
      <SignupForm />
    </Suspense>
  );
}