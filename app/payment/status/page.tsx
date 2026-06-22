import { createServerSupabaseClient } from "@/lib/supabase-server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Status | Vision IT Computer Institute",
  description: "Check the status of your course fee payment.",
};

export const dynamic = "force-dynamic";

export default async function PaymentStatusPage({
  searchParams,
}: {
  searchParams: Promise<{ paymentId?: string }>;
}) {
  const { paymentId } = await searchParams;

  if (!paymentId) {
    redirect("/dashboard");
  }

  const supabase = await createServerSupabaseClient();

  // Get active session user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch payment details
  const { data: payment, error } = await supabase
    .from("admission_payments")
    .select(`
      id,
      amount,
      status,
      transaction_id,
      created_at,
      admissions(
        id,
        user_id,
        student_name,
        courses(title, course_code)
      )
    `)
    .eq("id", paymentId)
    .single();

  if (error || !payment) {
    return notFound();
  }

  const formattedPayment = {
    id: payment.id,
    amount: Number(payment.amount),
    status: payment.status,
    transaction_id: payment.transaction_id,
    created_at: payment.created_at,
    admission: {
      id: (payment.admissions as any)?.id,
      user_id: (payment.admissions as any)?.user_id,
      student_name: (payment.admissions as any)?.student_name,
      courses: {
        title: (payment.admissions as any)?.courses?.title,
        course_code: (payment.admissions as any)?.courses?.course_code,
      },
    },
  };

  // Authorization check
  if (formattedPayment.admission.user_id !== user.id) {
    return notFound();
  }

  const isSuccess = formattedPayment.status === "completed";
  const isFailed = formattedPayment.status === "failed";

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 px-4 md:px-6 lg:px-8 pt-24 md:pt-32">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-xl p-8 text-center space-y-6">
        
        {/* Status Icon */}
        <div className="flex justify-center">
          {isSuccess ? (
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          ) : isFailed ? (
            <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
          )}
        </div>

        {/* Title */}
        <div>
          <h1 className="text-2xl font-black text-slate-900 leading-tight">
            {isSuccess ? "Payment Successful!" : isFailed ? "Payment Failed" : "Verification Pending"}
          </h1>
          <p className="text-slate-500 text-sm font-semibold mt-1.5">
            {isSuccess 
              ? "Thank you! Your course fee has been processed." 
              : isFailed 
                ? "We couldn't process your transaction. Please try again." 
                : "We are currently checking the status with SMEPay."}
          </p>
        </div>

        {/* Details Card */}
        <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl text-left text-sm font-medium space-y-4">
          <div className="flex justify-between items-baseline border-b border-slate-200/60 pb-3">
            <span className="text-slate-400 text-xs uppercase tracking-wider">Course Name</span>
            <span className="text-slate-900 font-bold max-w-[200px] text-right truncate">
              {formattedPayment.admission.courses.title}
            </span>
          </div>

          <div className="flex justify-between items-baseline border-b border-slate-200/60 pb-3">
            <span className="text-slate-400 text-xs uppercase tracking-wider">Amount Paid</span>
            <span className="text-slate-900 font-extrabold text-base">
              ₹{formattedPayment.amount.toFixed(2)}
            </span>
          </div>

          {formattedPayment.transaction_id && (
            <div className="flex justify-between items-baseline border-b border-slate-200/60 pb-3">
              <span className="text-slate-400 text-xs uppercase tracking-wider">Transaction ID</span>
              <span className="text-slate-950 font-mono text-xs font-bold">
                {formattedPayment.transaction_id}
              </span>
            </div>
          )}

          <div className="flex justify-between items-baseline">
            <span className="text-slate-400 text-xs uppercase tracking-wider">Date & Time</span>
            <span className="text-slate-900">
              {new Date(formattedPayment.created_at).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {isSuccess ? (
            <Link
              href="/dashboard"
              className="w-full h-11 bg-blue-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              Go to My Dashboard
            </Link>
          ) : isFailed ? (
            <Link
              href={`/checkout/${formattedPayment.admission.id}`}
              className="w-full h-11 bg-red-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              Try Paying Again
            </Link>
          ) : (
            <Link
              href="/dashboard"
              className="w-full h-11 bg-blue-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              Return to Dashboard
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
