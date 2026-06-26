"use client";

import { useState, useEffect } from "react";
import { submitAdmission, sendAdmissionOtp, verifyAdmissionOtp } from "@/features/admissions/actions/admissions";
import { initiatePayment } from "@/app/actions/payments";

const WHATSAPP = "918103170595";
const PHONE = "+91 81031 70595";

interface Props {
  profile: Record<string, any> | null;
  userEmail: string;
  course: {
    id: string;
    title: string;
    course_code: string;
    fee: number;
    discount_fee: number | null;
  } | null;
  rollNumber: string;
}

// Parse address JSON safely
function parseAddress(raw: any) {
  if (!raw) return { village: "", post: "", district: "", state: "", pin: "" };
  if (typeof raw === "object") return { village: raw.village ?? "", post: raw.post ?? "", district: raw.district ?? "", state: raw.state ?? "", pin: raw.pin ?? "" };
  try {
    const parsed = JSON.parse(raw);
    return { village: parsed.village ?? "", post: parsed.post ?? "", district: parsed.district ?? "", state: parsed.state ?? "", pin: parsed.pin ?? "" };
  } catch {
    return { village: raw, post: "", district: "", state: "", pin: "" };
  }
}

export default function ApplyFormClient({ profile, userEmail, course, rollNumber }: Props) {
  const [form, setForm] = useState({
    student_name: profile?.full_name ?? "",
    phone:        profile?.phone ?? "",
    email:        userEmail ?? "",
    father_name:  profile?.father_name ?? "",
    mother_name:  profile?.mother_name ?? "",
    dob:          profile?.dob ?? "",
    gender:       profile?.gender ?? "",
    category:     profile?.category ?? "",
    qualification: profile?.qualification ?? "",
    message:      "",
  });

  const [address, setAddress] = useState(parseAddress(profile?.address));
  const [documents, setDocuments] = useState<string[]>([]);
  const [declared, setDeclared] = useState(false);

  const toggleDocument = (key: string) =>
    setDocuments((prev) =>
      prev.includes(key) ? prev.filter((d) => d !== key) : [...prev, key]
    );

  const [loading, setLoading]   = useState(false);
  const [step, setStep]         = useState<"form" | "otp" | "payment">("form");
  const [admissionId, setAdmissionId] = useState<string>("");
  const [admissionNo, setAdmissionNo] = useState<string>("");
  
  const [otp, setOtp]           = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [error, setError]       = useState("");

  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const addressString = [address.village, address.post, address.district, address.state, address.pin].filter(Boolean).join(", ");
      const result = await submitAdmission({ 
        ...form, 
        address: addressString, 
        documents: documents.join(", "), 
        course_id: course?.id ?? "" 
      });
      if ((result as any)?.error) throw new Error((result as any).error);
      
      const insertedAdmission = (result as any)?.data?.[0];
      if (!insertedAdmission || !insertedAdmission.id) {
        throw new Error("Failed to retrieve admission record ID.");
      }
      
      setAdmissionId(insertedAdmission.id);
      
      // Send OTP via SMS
      const otpRes = await sendAdmissionOtp(form.phone);
      if (otpRes.error) {
        throw new Error(otpRes.error);
      }
      
      setStep("otp");
      setResendTimer(60);
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.trim().length !== 6) {
      setOtpError("OTP must be exactly 6 digits.");
      return;
    }
    setOtpLoading(true);
    setOtpError("");
    try {
      const result = await verifyAdmissionOtp(form.phone, otp, admissionId);
      if (result.error) {
        throw new Error(result.error);
      }
      if (result.admissionNo) {
        setAdmissionNo(result.admissionNo);
        setStep("payment");
      } else {
        throw new Error("Admission Number generation failed.");
      }
    } catch (err: any) {
      setOtpError(err?.message ?? "Failed to verify OTP.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    setOtpLoading(true);
    setOtpError("");
    try {
      const otpRes = await sendAdmissionOtp(form.phone);
      if (otpRes.error) {
        throw new Error(otpRes.error);
      }
      setResendTimer(60);
      setOtp("");
    } catch (err: any) {
      setOtpError(err?.message ?? "Failed to send OTP.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!course) return;
    const finalFee = 0; // Fixed Admission Fee
    setPaymentLoading(true);
    setError("");
    try {
      const res = await initiatePayment(admissionId, finalFee);
      if (res.error) {
        throw new Error(res.error);
      } else if (res.redirectUrl) {
        window.location.href = res.redirectUrl;
      }
    } catch (err: any) {
      setError(err?.message ?? "An unexpected error occurred. Please try again.");
      setPaymentLoading(false);
    }
  };

  // ── OTP STEP UI ─────────────────────────────────────────────────────────────
  if (step === "otp") {
    return (
      <main className="min-h-screen bg-slate-50 py-12 px-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="m9 11 2 2 4-4"/>
                </svg>
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">Verify Mobile Number</h2>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed flex items-center justify-center gap-1.5 flex-wrap">
                <span>We have sent a 6-digit verification code to</span>
                <span className="font-semibold text-slate-800">+91 {form.phone}</span>
                <button
                  type="button"
                  onClick={() => setStep("form")}
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-extrabold hover:underline cursor-pointer"
                  title="Change Phone Number"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="inline">
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                  </svg>
                  Edit
                </button>
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="space-y-3">
                <div className="relative flex items-center">
                  <input
                    type="tel"
                    maxLength={6}
                    pattern="[0-9]*"
                    inputMode="numeric"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    className="w-full text-center tracking-[0.75em] pl-[0.75em] text-3xl font-black py-4 rounded-2xl border-2 border-slate-200 bg-slate-50/50 text-slate-800 placeholder:text-slate-300 placeholder:tracking-normal placeholder:font-normal placeholder:text-lg focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-300 font-mono shadow-inner"
                    required
                    autoFocus
                  />
                </div>
                
                <div className="flex justify-between items-center text-xs px-1">
                  <button
                    type="button"
                    onClick={() => setOtp("")}
                    disabled={!otp}
                    className="text-slate-500 hover:text-slate-700 transition-colors disabled:opacity-30 disabled:pointer-events-none font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                      <path d="M3 3v5h5"/>
                    </svg>
                    Clean Input
                  </button>

                  {resendTimer > 0 ? (
                    <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="animate-spin text-slate-400">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75" />
                      </svg>
                      Resend in <span className="text-slate-600 font-bold">{resendTimer}s</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={otpLoading}
                      className="text-blue-600 hover:text-blue-800 font-extrabold transition-colors disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m22 2-7 20-4-9-9-4Z"/>
                        <path d="M22 2 11 13"/>
                      </svg>
                      Resend OTP
                    </button>
                  )}
                </div>
              </div>

              {otpError && (
                <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 font-medium flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="shrink-0 text-red-500">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {otpError}
                </div>
              )}

              <button
                type="submit"
                disabled={otpLoading || otp.length !== 6}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex items-center justify-center"
              >
                {otpLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Verifying OTP...
                  </span>
                ) : (
                  "Verify & Generate Admission No."
                )}
              </button>
            </form>

            <div className="mt-8 text-center border-t border-slate-100 pt-5">
              <button
                type="button"
                onClick={() => setStep("form")}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Go Back to Application Form
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ── ADMISSION NO & PAYMENT UI ───────────────────────────────────────────────
  if (step === "payment") {
    const finalFee = 0; // Fixed Admission Fee

    return (
      <main className="min-h-screen bg-slate-50 py-12 px-4">
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 text-center text-white relative">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h2 className="text-2xl font-black tracking-tight">Admission Confirmed!</h2>
              <p className="text-emerald-50 text-xs font-semibold uppercase tracking-wider mt-1.5 opacity-90">
                Admission No Generated Successfully
              </p>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 text-center">
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-1">
                  Your Admission Number
                </span>
                <div className="flex items-center justify-center gap-2.5">
                  <span className="text-2xl font-black font-mono text-emerald-950 tracking-wider">
                    {admissionNo}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(admissionNo);
                      alert("Admission Number copied to clipboard!");
                    }}
                    className="p-1.5 hover:bg-emerald-100/70 active:scale-95 text-emerald-700 rounded-lg transition-all cursor-pointer"
                    title="Copy Admission Number"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                    </svg>
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-2 font-medium">
                  Please save this Admission Number for all future communications.
                </p>
              </div>

              {course && (
                <>
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-blue-500" viewBox="0 0 24 24">
                        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                      </svg>
                      Order Invoice Summary
                    </h3>
                    
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Course Selected</span>
                      <span className="font-extrabold text-slate-900 text-base block">{course.title}</span>
                      <span className="text-[10px] text-slate-500 font-bold mt-0.5 inline-block">Code: {course.course_code}</span>
                    </div>

                    <div className="space-y-3 px-1 text-sm font-semibold text-slate-500">
                      <div className="flex justify-between border-t border-slate-100 pt-3 items-baseline">
                        <span className="text-base font-extrabold text-slate-900">Total Admission Fee</span>
                        <div className="text-right">
                          <span className="text-2xl font-black text-slate-900">₹{finalFee}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2 font-medium">
                      {error}
                    </p>
                  )}

                  <div className="space-y-3 pt-2">
                    <button
                      disabled={paymentLoading}
                      onClick={handlePayment}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {paymentLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          {finalFee === 0 ? "Processing..." : "Processing Payment..."}
                        </>
                      ) : (
                        <>
                          {finalFee === 0 ? "Complete Admission" : "Pay Admission Fee"}
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                          </svg>
                        </>
                      )}
                    </button>
                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-semibold tracking-wide uppercase">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="text-slate-400">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                      Secure UPI transaction processed via SMEPay
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 pt-24 md:pt-32">
      <div className="max-w-5xl mx-auto">

        {/* Back Link positioned on the left side of the screen (aligned with header/logo) */}
        <div className="mb-6">
          <a href="/courses" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors group">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-1 group-hover:-translate-x-1 transition-transform">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Courses
          </a>
        </div>

        {/* Center the narrow form container */}
        <div className="max-w-xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">Apply for Admission</h1>
          {(course?.title || rollNumber) && (
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
              {course?.title && (
                <p className="text-sm text-slate-500">
                  Course: <span className="font-semibold text-blue-700">{course.title}</span>
                </p>
              )}
              {rollNumber && (
                <p className="text-sm text-slate-500">
                  Registration No: <span className="font-semibold text-slate-900">{rollNumber}</span>
                </p>
              )}
            </div>
          )}
          {profile && (
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Profile details auto-filled
            </div>
          )}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Section: Personal Info */}
            <SectionTitle>Personal Information</SectionTitle>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name" required readOnly>
                <input type="text" name="student_name" required placeholder="Rahul Kumar"
                  value={form.student_name} readOnly />
              </Field>

              <Field label="Phone Number" required>
                <input type="tel" name="phone" required placeholder="9876543210"
                  value={form.phone} onChange={handleChange} />
              </Field>

              <Field label="Email Address" readOnly>
                <input type="email" name="email" placeholder="rahul@email.com"
                  value={form.email} readOnly />
              </Field>

              <Field label="Date of Birth" readOnly>
                <input type="date" name="dob" value={form.dob} readOnly />
              </Field>

              <Field label="Gender" readOnly>
                <select name="gender" value={form.gender} disabled>
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </Field>

              <Field label="Category" readOnly>
                <select name="category" value={form.category} disabled>
                  <option value="">Select category</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </Field>

            </div>

            {/* Section: Address */}
            <SectionTitle>Address</SectionTitle>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Village / City" readOnly>
                  <input type="text" name="village" placeholder="e.g. Tukudand"
                    value={address.village} readOnly />
                </Field>
                <Field label="Post" readOnly>
                  <input type="text" name="post" placeholder="e.g. Masga"
                    value={address.post} readOnly />
                </Field>
                <Field label="District" readOnly>
                  <input type="text" name="district" placeholder="e.g. Surajpur"
                    value={address.district} readOnly />
                </Field>
                <Field label="State" readOnly>
                  <input type="text" name="state" placeholder="e.g. Chhattisgarh"
                    value={address.state} readOnly />
                </Field>
                <Field label="PIN Code" readOnly>
                  <input type="text" name="pin" placeholder="e.g. 497223" maxLength={6}
                    value={address.pin} readOnly />
                </Field>
              </div>
            </div>

            {/* Section: Family Info */}
            <SectionTitle>Family Details</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Father's Name" readOnly>
                <input type="text" name="father_name" placeholder="Father's name"
                  value={form.father_name} readOnly />
              </Field>
              <Field label="Mother's Name" readOnly>
                <input type="text" name="mother_name" placeholder="Mother's name"
                  value={form.mother_name} readOnly />
              </Field>
            </div>

            {/* Section: Academic */}
            <SectionTitle>Academic Details</SectionTitle>
            <Field label="Highest Qualification" readOnly>
              <select name="qualification" value={form.qualification} disabled>
                <option value="">Select qualification</option>
                <option value="10th">10th Pass</option>
                <option value="12th">12th Pass</option>
                <option value="Diploma">Diploma</option>
                <option value="Graduate">Graduate</option>
                <option value="Post Graduate">Post Graduate</option>
                <option value="Other">Other</option>
              </select>
            </Field>

            {/* Section: Documents */}
            <SectionTitle>Documents Available</SectionTitle>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {([
                  { key: "aadhar_card",      label: "Aadhar Card",         icon: "🪪" },
                  { key: "passport_photo",   label: "Passport Size Photo", icon: "📷" },
                  { key: "marksheet",        label: "Marksheet",           icon: "📄" },
                  { key: "caste_cert",       label: "Caste Certificate",   icon: "📜" },
                ] as { key: string; label: string; icon: string }[]).map(({ key, label, icon }) => {
                  const checked = documents.includes(key);
                  return (
                    <label
                      key={key}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all select-none ${
                        checked
                          ? "border-blue-500 bg-blue-50 text-blue-800"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                          checked ? "bg-blue-600 border-blue-600" : "border-slate-300 bg-white"
                        }`}
                      >
                        {checked && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        )}
                      </span>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={checked}
                        onChange={() => toggleDocument(key)}
                      />
                      <span className="text-sm font-medium">{icon} {label}</span>
                    </label>
                  );
                })}
              </div>
            </div>


            {/* Declaration */}
            <div
              onClick={() => setDeclared(p => !p)}
              className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer select-none transition-all ${
                declared
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 bg-slate-50 hover:border-slate-300"
              }`}
            >
              <span
                className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                  declared ? "bg-blue-600 border-blue-600" : "border-slate-300 bg-white"
                }`}
              >
                {declared && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                )}
              </span>
              <p className="text-sm text-slate-700 leading-relaxed">
                मैं घोषणा करता/करती हूँ कि ऊपर दी गई सभी जानकारी मेरी जानकारी और विश्वास के अनुसार{" "}
                <span className="font-semibold text-slate-900">सत्य एवं सही</span> है।
                कोई भी जानकारी गलत पाए जाने पर मेरा प्रवेश निरस्त किया जा सकता है।
              </p>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !declared}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {loading ? "Submitting…" : "Submit Application"}
            </button>
          </form>
        </div>

        {/* Help */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Need help?{" "}
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer"
            className="text-green-600 font-semibold hover:underline">
            WhatsApp us
          </a>{" "}
          or call{" "}
          <a href={`tel:${PHONE}`} className="text-blue-600 font-semibold hover:underline">
            {PHONE}
          </a>
        </p>
      </div>
      </div>
    </main>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-1.5 pt-1">
      {children}
    </p>
  );
}

function Field({
  label,
  required,
  readOnly,
  children,
}: {
  label: string;
  required?: boolean;
  readOnly?: boolean;
  children: React.ReactElement;
}) {
  const inputClass = readOnly
    ? "w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-500 bg-slate-100 cursor-not-allowed resize-none select-none opacity-80"
    : "w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white resize-none";

  const child = React.cloneElement(children as React.ReactElement<any>, {
    className: inputClass,
  });

  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide flex items-center gap-1">
        {label} {required && <span className="text-red-500">*</span>}
        {readOnly && (
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 ml-0.5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        )}
      </label>
      {child}
    </div>
  );
}

// Need React for cloneElement
import React from "react";
