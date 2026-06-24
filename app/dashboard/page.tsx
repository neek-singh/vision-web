import { createServerSupabaseClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import Link from "next/link";

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

  // ✅ Admissions fetch
  const { data: admissions } = await supabase
    .from("admissions")
    .select(`
      id,
      status,
      flow_step,
      document_verified,
      admission_no,
      created_at,
      courses(title),
      admission_payments(id, status)
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
                  <th className="px-6 py-4">Admission No.</th>
                  <th className="px-6 py-4">Course</th>
                  <th className="px-6 py-4">Date Applied</th>
                  <th className="px-6 py-4 text-right">Actions</th>
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

                        <td className="px-6 py-4">
                          {item.admission_no ? (
                            <span className="font-mono text-sm font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/80 shadow-sm">
                              {item.admission_no}
                            </span>
                          ) : (
                            <span className="text-slate-400 text-xs italic font-medium">Pending Assignment</span>
                          )}
                        </td>

                        <td className="px-6 py-4 font-semibold text-gray-800">
                          {formattedCourse?.title || "Course"}
                        </td>

                        <td className="px-6 py-4 text-gray-500 font-medium">
                          {new Date(item.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>

                        <td className="px-6 py-4 text-right">
                          {completedPayment ? (
                            <div className="inline-flex gap-2">
                              <Link
                                href={`/payment/status?paymentId=${completedPayment.id}&print=form`}
                                target="_blank"
                                className="inline-flex items-center gap-1.5 px-3 h-8 border border-slate-200 hover:border-blue-500 hover:text-blue-600 bg-white text-slate-600 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-98 cursor-pointer"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                                </svg>
                                Form
                              </Link>
                              <Link
                                href={`/payment/status?paymentId=${completedPayment.id}&print=receipt`}
                                target="_blank"
                                className="inline-flex items-center gap-1.5 px-3 h-8 border border-slate-200 hover:border-emerald-500 hover:text-emerald-600 bg-white text-slate-600 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-98 cursor-pointer"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
                                  <rect x="2" y="4" width="20" height="16" rx="2"/><line x1="12" y1="4" x2="12" y2="20"/><line x1="2" y1="12" x2="22" y2="12"/>
                                </svg>
                                Receipt
                              </Link>
                            </div>
                          ) : item.status === "approved" ? (
                            (!item.flow_step || item.flow_step === "personal" || item.flow_step === "documents") ? (
                              <Link
                                href={`/admissions/pipeline/${item.id}`}
                                className="inline-flex items-center px-3.5 h-8 bg-green-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold shadow-md shadow-green-500/10 transition-colors"
                              >
                                Complete Admission
                              </Link>
                            ) : item.flow_step === "review" ? (
                              <Link
                                href={`/admissions/pipeline/${item.id}`}
                                className="inline-flex items-center px-3.5 h-8 bg-amber-500 hover:bg-slate-900 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-500/10 transition-colors"
                              >
                                Under Review
                              </Link>
                            ) : pendingPayment ? (
                              <Link
                                href={`/payment/gateway/${pendingPayment.id}`}
                                className="inline-flex items-center px-3.5 h-8 bg-blue-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/10 transition-colors"
                              >
                                Resume Pay
                              </Link>
                            ) : (
                              <Link
                                href={`/admissions/pipeline/${item.id}`}
                                className="inline-flex items-center px-3.5 h-8 bg-green-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold shadow-md shadow-green-500/10 transition-colors"
                              >
                                Pay Tuition Fee
                              </Link>
                            )
                          ) : item.status === "rejected" ? (
                            <span className="text-red-500 font-bold text-xs bg-red-50 px-2.5 py-1 rounded-lg border border-red-200">Rejected</span>
                          ) : (
                            <span className="text-slate-400 font-bold text-xs bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">Pending Approval</span>
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