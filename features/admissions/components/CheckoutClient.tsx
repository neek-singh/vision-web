"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { initiatePayment } from "@/app/actions/payments";
import Link from "next/link";

interface CheckoutClientProps {
  admission: {
    id: string;
    student_name: string;
    email: string;
    phone: string;
    status: string;
    courses: {
      id: string;
      title: string;
      course_code: string;
      fee: number;
      discount_fee: number | null;
    };
  };
}

export function CheckoutClient({ admission }: CheckoutClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const course = admission.courses;
  const finalFee = 0; // Fixed Admission Fee

  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await initiatePayment(admission.id, finalFee);
      if (res.error) {
        setError(res.error);
        setLoading(false);
      } else if (res.redirectUrl) {
        router.push(res.redirectUrl);
      }
    } catch (e) {
      console.error(e);
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 md:px-6 lg:px-8 pt-24 md:pt-32">
      <div className="max-w-5xl mx-auto">
        {/* Back Link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-8 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 group-hover:-translate-x-1 transition-transform"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Dashboard
        </Link>

        {/* Heading */}
        <div className="mb-10 text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Secure Checkout
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            Review your admission details and complete payment using SMEPay
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-semibold flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Student Details Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-blue-500"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Admission Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium">
                <div>
                  <span className="text-slate-400 block text-xs uppercase tracking-wider mb-0.5">Student Name</span>
                  <span className="text-slate-900">{admission.student_name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs uppercase tracking-wider mb-0.5">Admission ID</span>
                  <span className="text-slate-950 font-mono text-xs">{admission.id}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs uppercase tracking-wider mb-0.5">Email Address</span>
                  <span className="text-slate-900">{admission.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs uppercase tracking-wider mb-0.5">Phone Number</span>
                  <span className="text-slate-900">{admission.phone}</span>
                </div>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-blue-500"
                >
                  <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="2" y1="10" x2="22" y2="10"></line>
                </svg>
                Payment Method
              </h2>
              <div className="p-4 rounded-xl border-2 border-blue-500 bg-blue-50/20 flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-4 border-blue-600 flex items-center justify-center shrink-0"></div>
                  <div>
                    <span className="font-bold text-slate-900 block text-sm">SMEPay (UPI Gateway)</span>
                    <span className="text-slate-500 text-xs mt-0.5">Pay securely using Google Pay, PhonePe, Paytm, BHIM, or QR code.</span>
                  </div>
                </div>
                <div className="px-2.5 py-1 bg-blue-50 border border-blue-100 rounded text-[10px] font-black text-blue-600 uppercase tracking-widest shrink-0">
                  UPI
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-blue-500"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                Order Summary
              </h2>

              {/* Course Info */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Selected Course
                </span>
                <span className="font-bold text-slate-900 text-base block leading-snug">
                  {course.title}
                </span>
                <span className="text-xs text-slate-500 font-semibold mt-1 inline-block">
                  Code: {course.course_code}
                </span>
              </div>

              {/* Price Calculation */}
              <div className="space-y-3.5 border-b border-slate-100 pb-5 text-sm font-semibold text-slate-500">
                <div className="flex justify-between">
                  <span>Admission Fee</span>
                  <span className="text-slate-950 font-bold">₹{finalFee}</span>
                </div>
              </div>

              {/* Total Payable */}
              <div className="flex justify-between items-baseline pt-1">
                <span className="text-base font-extrabold text-slate-900">Total Payable</span>
                <div className="text-right">
                  <span className="text-2xl font-black text-slate-900">₹{finalFee}</span>
                </div>
              </div>

              {/* Pay Button */}
              <button
                disabled={loading}
                onClick={handlePayment}
                className="w-full h-12 bg-blue-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/10 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4.5 w-4.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    {finalFee === 0 ? "Complete Admission" : "Pay Admission Fee"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
