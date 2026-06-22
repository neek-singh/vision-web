import { createServerSupabaseClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import Link from "next/link";

function PipelineFlow({ 
  status, 
  flowStep, 
  documentVerified, 
  completedPayment 
}: { 
  status: string; 
  flowStep: string | null; 
  documentVerified: boolean; 
  completedPayment: boolean; 
}) {
  const isApproved = status === "approved";
  const isRejected = status === "rejected";
  const isPending = status === "pending";

  const currentStep = flowStep || "personal";

  // Step 1: Student Registration (Pre-filled, always checked)
  const isStep1Done = true;

  // Step 2: Course Selection (Pre-filled, always checked)
  const isStep2Done = true;

  // Step 3: Personal Details Form
  const isStep3Done = isApproved && (currentStep === "documents" || currentStep === "review" || currentStep === "payment" || documentVerified);
  const isStep3Active = isApproved && currentStep === "personal";

  // Step 4: Document Upload
  const isStep4Done = isApproved && (currentStep === "review" || currentStep === "payment" || documentVerified);
  const isStep4Active = isApproved && currentStep === "documents";

  // Step 5: Admission Review (Document review)
  const isStep5Done = isApproved && (currentStep === "payment" || documentVerified);
  const isStep5Active = isApproved && currentStep === "review";

  // Step 6: Fee Payment
  const isStep6Done = completedPayment;
  const isStep6Active = isApproved && (currentStep === "payment" || documentVerified) && !completedPayment;

  // Step 7: Student Account Credentials
  const isStep7Done = completedPayment;
  const isStep7Active = false; // completed at same time as payment

  // Step 8: LMS Access
  const isStep8Done = completedPayment;
  const isStep8Active = false;

  const renderStep = (idx: number, label: string, isDone: boolean, isActive: boolean, isError: boolean = false) => {
    return (
      <div className="flex flex-col items-center group relative shrink-0">
        <div className={`w-4.5 h-4.5 rounded-full flex items-center justify-center text-[8px] font-extrabold border transition-all duration-300 ${
          isError 
            ? "bg-red-50 border-red-200 text-red-500" 
            : isDone 
              ? "bg-emerald-50 border-emerald-200 text-emerald-600" 
              : isActive 
                ? "bg-blue-50 border-blue-200 text-blue-500 animate-pulse ring-2 ring-blue-500/10" 
                : "bg-slate-50 border-slate-200 text-slate-400"
        }`}>
          {isError ? "✕" : isDone ? "✓" : idx}
        </div>
        <span className="text-[7.5px] text-slate-500 font-bold mt-1 tracking-wider uppercase">{label}</span>
      </div>
    );
  };

  return (
    <div className="flex items-center gap-1 py-1.5 max-w-[420px] sm:max-w-[480px]">
      {renderStep(1, "Reg", isStep1Done, false)}
      <div className={`w-3 h-[2px] bg-emerald-500`} />
      
      {renderStep(2, "Course", isStep2Done, false)}
      <div className={`w-3 h-[2px] ${isApproved ? (isRejected ? 'bg-red-300' : 'bg-emerald-500') : 'bg-slate-200'}`} />

      {renderStep(3, "Details", isStep3Done, isStep3Active, isRejected)}
      <div className={`w-3 h-[2px] ${isStep4Done ? 'bg-emerald-500' : isStep4Active || isStep3Active ? 'bg-blue-300' : 'bg-slate-200'}`} />

      {renderStep(4, "Docs", isStep4Done, isStep4Active)}
      <div className={`w-3 h-[2px] ${isStep5Done ? 'bg-emerald-500' : isStep5Active || isStep4Active ? 'bg-blue-300' : 'bg-slate-200'}`} />

      {renderStep(5, "Review", isStep5Done, isStep5Active)}
      <div className={`w-3 h-[2px] ${isStep6Done ? 'bg-emerald-500' : isStep6Active || isStep5Active ? 'bg-blue-300' : 'bg-slate-200'}`} />

      {renderStep(6, "Pay", isStep6Done, isStep6Active)}
      <div className={`w-3 h-[2px] ${isStep7Done ? 'bg-emerald-500' : 'bg-slate-200'}`} />

      {renderStep(7, "Acc", isStep7Done, isStep7Active)}
      <div className={`w-3 h-[2px] ${isStep8Done ? 'bg-emerald-500' : 'bg-slate-200'}`} />

      {renderStep(8, "LMS", isStep8Done, isStep8Active)}
    </div>
  );
}

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // ✅ Profile fetch
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  // ✅ 🔥 JOIN query (includes admission_payments)
  const { data: admissions } = await supabase
    .from("admissions")
    .select(`
      id,
      status,
      created_at,
      flow_step,
      document_verified,
      courses(title, course_code),
      admission_payments(id, status, transaction_id)
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 px-4 pt-24 pb-10 md:pt-36 md:pb-16">

      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Welcome, {profile?.full_name || "Student"} 👋
          </h1>
          <p className="text-gray-500 text-base font-medium">
            Manage your courses and track your progress
          </p>
        </div>

        {/* Admissions Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">My Admissions</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">

              <thead className="bg-gray-50/80 text-gray-500 font-semibold border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Course</th>
                  <th className="px-6 py-4">Date Applied</th>
                  <th className="px-6 py-4">Progress Pipeline</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {!admissions || admissions.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <p className="text-gray-500 font-medium">No admissions yet.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  admissions.map((item: any) => {
                    const formattedCourse = Array.isArray(item.courses) ? item.courses[0] : item.courses;
                    const payments = Array.isArray(item.admission_payments) ? item.admission_payments : [];
                    const completedPayment = payments.find((p: any) => p.status === "completed");
                    const pendingPayment = payments.find((p: any) => p.status === "pending");

                    return (
                      <tr key={item.id} className="hover:bg-gray-50/50 transition-colors duration-150">

                        <td className="px-6 py-4 font-semibold text-gray-800">
                          {formattedCourse?.title || "Course"}
                        </td>

                        <td className="px-6 py-4 text-gray-500">
                          {new Date(item.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>

                        <td className="px-6 py-4">
                          <PipelineFlow 
                            status={item.status} 
                            flowStep={item.flow_step} 
                            documentVerified={item.document_verified} 
                            completedPayment={!!completedPayment} 
                          />
                        </td>

                        <td className="px-6 py-4 text-xs font-semibold">
                          {completedPayment ? (
                            <span className="text-emerald-600 font-bold flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-emerald-600" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                              Paid
                            </span>
                          ) : item.status === "approved" ? (
                            (!item.flow_step || item.flow_step === "personal" || item.flow_step === "documents") ? (
                              <Link
                                href={`/admissions/pipeline/${item.id}`}
                                className="inline-flex items-center px-3.5 py-1.5 bg-green-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold shadow-md shadow-green-500/10 transition-colors"
                              >
                                Complete Admission
                              </Link>
                            ) : item.flow_step === "review" ? (
                              <Link
                                href={`/admissions/pipeline/${item.id}`}
                                className="inline-flex items-center px-3.5 py-1.5 bg-amber-500 hover:bg-slate-900 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-500/10 transition-colors"
                              >
                                Under Review
                              </Link>
                            ) : pendingPayment ? (
                              <Link
                                href={`/payment/gateway/${pendingPayment.id}`}
                                className="inline-flex items-center px-3.5 py-1.5 bg-blue-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/10 transition-colors"
                              >
                                Resume Pay
                              </Link>
                            ) : (
                              <Link
                                href={`/admissions/pipeline/${item.id}`}
                                className="inline-flex items-center px-3.5 py-1.5 bg-green-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold shadow-md shadow-green-500/10 transition-colors"
                              >
                                Pay Tuition Fee
                              </Link>
                            )
                          ) : item.status === "rejected" ? (
                            <span className="text-red-500 font-medium">Admission Rejected</span>
                          ) : (
                            <span className="text-slate-400 font-medium">Pending Approval</span>
                          )}
                        </td>

                      </tr>
                    );
                  })
                )}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </main>
  );
}