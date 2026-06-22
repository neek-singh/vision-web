"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AuthServices } from "@/lib/auth";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ArrowLeft
} from "lucide-react";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "";

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isAutoLoggedIn, setIsAutoLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 🔐 Validation
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsLoading(true);

    try {
      // 🚀 Signup
      const { data, error: authError } = await AuthServices.signUp(
        formData.email,
        formData.password,
        formData.full_name,
        redirectPath
      );

      if (authError) {
        if (authError.message.includes("already registered") || authError.message.includes("already exists")) {
          setError("Email already exists. Redirecting to login page...");
          setIsLoading(false);
          setTimeout(() => {
            router.push(`/login${redirectPath ? `?redirect=${encodeURIComponent(redirectPath)}` : ""}`);
          }, 2000);
          return;
        } else {
          setError(authError.message);
        }
        setIsLoading(false);
        return;
      }

      // Check if user is auto-logged in by Supabase
      const hasSession = !!data?.session;
      setIsAutoLoggedIn(hasSession);
      setSuccess(true);

      if (hasSession) {
        // ⏳ Auto redirect directly to target since they are already logged in
        setTimeout(() => {
          router.push(redirectPath || "/dashboard");
        }, 2000);
      } else {
        // ⏳ Auto redirect to login
        setTimeout(() => {
          router.push(`/login${redirectPath ? `?redirect=${encodeURIComponent(redirectPath)}` : ""}`);
        }, 3000);
      }

    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // 🎉 Success UI
  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 bg-[#0a0f1d] relative overflow-hidden">
        {/* Back Button */}
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 max-w-md w-full text-center shadow-2xl animate-in fade-in zoom-in duration-500">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
            {isAutoLoggedIn ? "Welcome!" : "Account Created"}
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            {isAutoLoggedIn 
              ? "Your account has been successfully created. Redirecting you to your destination..."
              : "We've sent a verification link to your email. Please verify your account before logging in."}
          </p>

          <Link
            href={isAutoLoggedIn 
              ? (redirectPath || "/dashboard")
              : `/login${redirectPath ? `?redirect=${encodeURIComponent(redirectPath)}` : ""}`}
            className="group flex items-center justify-center w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all duration-200 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]"
          >
            {isAutoLoggedIn ? "Proceed" : "Go to Login"}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </main>
    );
  }

  // 📝 Form UI
  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-[#0a0f1d] relative overflow-hidden">
      {/* Back Button */}
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
          <div className="mb-6 p-4 text-sm bg-red-500/10 text-red-400 rounded-xl border border-red-500/20 flex items-start gap-3 animate-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>{error}</p>
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

          {/* Password */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="Password"
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="relative w-full py-3.5 mt-2 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] flex items-center justify-center overflow-hidden"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Creating account...
              </>
            ) : (
              "Sign Up"
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
    </main>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center px-4 bg-[#0a0f1d] relative overflow-hidden">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-white font-medium text-sm">Loading secure registration...</p>
        </div>
      </main>
    }>
      <SignupForm />
    </Suspense>
  );
}