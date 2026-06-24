"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateAdmissionStatus } from "@/app/actions/admin";
import { verifyAdmissionDocuments } from "@/features/admissions/actions/admissions";
import Link from "next/link";

interface Admission {
  id: string;
  student_name: string;
  email: string;
  phone: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  father_name: string | null;
  dob: string | null;
  gender: string | null;
  address: string | null;
  qualification: string | null;
  photo_url: string | null;
  signature_url: string | null;
  identity_proof_url: string | null;
  flow_step: string | null;
  document_verified: boolean;
  message: string | null;
  courses: {
    title: string;
    course_code: string;
  };
}

interface AdminAdmissionsClientProps {
  initialAdmissions: Admission[];
}

export function AdminAdmissionsClient({ initialAdmissions }: AdminAdmissionsClientProps) {
  const router = useRouter();
  const [admissions, setAdmissions] = useState<Admission[]>(initialAdmissions);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStatusUpdate = async (id: string, status: "approved" | "rejected") => {
    setUpdatingId(id);
    setError(null);
    try {
      const res = await updateAdmissionStatus(id, status);
      if (res.error) {
        setError(res.error);
        setUpdatingId(null);
      } else {
        // Update local state
        setAdmissions((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status } : item))
        );
        setUpdatingId(null);
        router.refresh();
      }
    } catch (e) {
      console.error(e);
      setError("Failed to update status. Please try again.");
      setUpdatingId(null);
    }
  };

  const handleVerifyDocuments = async (id: string, verified: boolean) => {
    setUpdatingId(id);
    setError(null);
    try {
      const res = await verifyAdmissionDocuments(id, verified);
      if (res.error) {
        setError(res.error);
        setUpdatingId(null);
      } else {
        // Update local state
        setAdmissions((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  document_verified: verified,
                  flow_step: verified ? "payment" : "review",
                }
              : item
          )
        );
        setUpdatingId(null);
        router.refresh();
      }
    } catch (e) {
      console.error(e);
      setError("Failed to update document verification status. Please try again.");
      setUpdatingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 md:px-6 lg:px-8 pt-24 md:pt-32">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Admissions Panel (Admin) 🛡️
            </h1>
            <p className="text-slate-500 text-sm font-semibold mt-1">
              Review, approve, or reject student course admission requests
            </p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center h-10 px-4 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Go to Student Dashboard
          </Link>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-semibold flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {error}
          </div>
        )}

        {/* Admissions List Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900">Submitted Applications</h2>
            <span className="px-2.5 py-1 bg-slate-100 border border-slate-200/60 rounded text-[10px] font-black text-slate-600 uppercase tracking-widest shrink-0">
              Total: {admissions.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200/60 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-4">Student Details</th>
                  <th className="px-6 py-4">Course Applied</th>
                  <th className="px-6 py-4">Date Applied</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 font-medium">
                {admissions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      No admission requests found.
                    </td>
                  </tr>
                ) : (
                  admissions.map((item) => (
                    <>
                      <tr key={item.id} className="hover:bg-slate-50/40 transition-colors">
                        {/* Student Info */}
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-slate-900 text-sm">{item.student_name}</span>
                            <span className="text-slate-400 text-xs">{item.email}</span>
                            <span className="text-slate-400 text-xs">{item.phone}</span>
                          </div>
                        </td>

                        {/* Course Applied */}
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-slate-800">{item.courses?.title || "Course"}</span>
                            <span className="text-slate-400 text-xs">Code: {item.courses?.course_code || "N/A"}</span>
                          </div>
                        </td>

                        {/* Date Applied */}
                        <td className="px-6 py-4 text-slate-500 text-xs">
                          {new Date(item.created_at).toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                              item.status === "approved"
                                ? "bg-green-50 text-green-700 border border-green-200"
                                : item.status === "rejected"
                                ? "bg-red-50 text-red-700 border border-red-200"
                                : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-xs">
                          {item.status === "pending" ? (
                            <div className="flex gap-2 items-center">
                              <button
                                disabled={updatingId !== null}
                                onClick={() => handleStatusUpdate(item.id, "approved")}
                                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold transition-colors cursor-pointer disabled:opacity-50"
                              >
                                {updatingId === item.id ? "Processing..." : "Approve"}
                              </button>
                              <button
                                disabled={updatingId !== null}
                                onClick={() => handleStatusUpdate(item.id, "rejected")}
                                className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-colors cursor-pointer disabled:opacity-50"
                              >
                                Reject
                              </button>
                              <button
                                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                                className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 rounded-lg text-xs font-bold cursor-pointer transition-colors"
                              >
                                {expandedId === item.id ? "Hide Details" : "View Details"}
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400 font-semibold capitalize">{item.status}</span>
                              <button
                                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                                className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 rounded-lg text-xs font-bold cursor-pointer transition-colors"
                              >
                                {expandedId === item.id ? "Hide Details" : "View Details"}
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                      {expandedId === item.id && (
                        <tr className="bg-slate-50/50">
                          <td colSpan={5} className="px-6 py-5 border-t border-b border-slate-100">
                            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 max-w-4xl animate-in fade-in slide-in-from-top-1 duration-200">
                              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                <h3 className="font-extrabold text-sm text-slate-900">Inquiry / Admission Details</h3>
                                <div className="flex items-center gap-2">
                                  {item.flow_step && (
                                    <>
                                      <span className="text-xs font-bold text-slate-400">Current Step:</span>
                                      <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded">
                                        {item.flow_step}
                                      </span>
                                    </>
                                  )}
                                  {item.document_verified && (
                                    <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded">
                                      Verified
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Show inquiry message if present */}
                              {item.message && (
                                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs font-semibold text-slate-800">
                                  <span className="text-blue-500 font-bold block uppercase tracking-wider mb-1 text-[10px]">Inquiry Message</span>
                                  <p className="whitespace-pre-wrap">{item.message}</p>
                                </div>
                              )}

                              {/* Show Form Details if present */}
                              {item.father_name ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-medium text-slate-700">
                                  <div>
                                    <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-0.5">Father's Name</span>
                                    <span className="text-slate-900 font-semibold">{item.father_name}</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-0.5">Date of Birth</span>
                                    <span className="text-slate-900 font-semibold">
                                      {item.dob ? new Date(item.dob).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                      }) : "N/A"}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-0.5">Gender</span>
                                    <span className="text-slate-900 font-semibold capitalize">{item.gender}</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-0.5">Qualification</span>
                                    <span className="text-slate-900 font-semibold">{item.qualification}</span>
                                  </div>
                                  <div className="sm:col-span-2">
                                    <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-0.5">Residential Address</span>
                                    <span className="text-slate-900 font-semibold block whitespace-pre-line">{item.address}</span>
                                  </div>
                                </div>
                              ) : item.flow_step ? (
                                <p className="text-xs text-slate-400 italic">Personal details form not yet completed by the student.</p>
                              ) : null}

                              {/* Show uploaded documents if present */}
                              {(item.photo_url || item.signature_url || item.identity_proof_url) && (
                                <div className="border-t border-slate-100 pt-4">
                                  <span className="text-xs font-bold text-slate-900 block mb-3">Uploaded Documents</span>
                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                    {item.photo_url && (
                                      <div className="flex flex-col items-center p-3 border border-slate-100 rounded-xl bg-slate-50 gap-2">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Profile Photo</span>
                                        <a href={item.photo_url} target="_blank" rel="noreferrer" className="w-16 h-16 rounded-full overflow-hidden border border-slate-200 block hover:opacity-80 transition-opacity">
                                          <img src={item.photo_url} alt="Photo" className="w-full h-full object-cover" />
                                        </a>
                                      </div>
                                    )}

                                    {item.signature_url && (
                                      <div className="flex flex-col items-center p-3 border border-slate-100 rounded-xl bg-slate-50 gap-2">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Signature</span>
                                        <a href={item.signature_url} target="_blank" rel="noreferrer" className="h-10 border border-slate-200 block hover:opacity-80 transition-opacity p-1 bg-white">
                                          <img src={item.signature_url} alt="Signature" className="max-h-full object-contain" />
                                        </a>
                                      </div>
                                    )}

                                    {item.identity_proof_url && (
                                      <div className="flex flex-col items-center p-3 border border-slate-100 rounded-xl bg-slate-50 gap-2">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Identity Proof</span>
                                        <a href={item.identity_proof_url} target="_blank" rel="noreferrer" className="px-3 py-1.5 bg-white border border-slate-200 text-blue-600 rounded-lg font-bold text-xs hover:bg-slate-50 transition-colors inline-flex items-center gap-1">
                                          View Marksheet / ID
                                        </a>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Document Verification Control */}
                              {item.flow_step === "review" && !item.document_verified && (
                                <div className="border-t border-slate-100 pt-4 flex justify-end gap-3">
                                  <button
                                    disabled={updatingId !== null}
                                    onClick={() => handleVerifyDocuments(item.id, false)}
                                    className="px-3.5 py-1.5 border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg font-bold text-xs cursor-pointer transition-colors"
                                  >
                                    Reject Documents
                                  </button>
                                  <button
                                    disabled={updatingId !== null}
                                    onClick={() => handleVerifyDocuments(item.id, true)}
                                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs cursor-pointer transition-colors"
                                  >
                                    {updatingId === item.id ? "Processing..." : "Approve & Verify Documents"}
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
