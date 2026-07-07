"use client";

import { useState } from "react";
import { getVerificationRecord } from "../actions/verification";
import { 
  Search, 
  ShieldCheck, 
  FileCheck2, 
  FileSpreadsheet, 
  Calendar, 
  GraduationCap, 
  User, 
  UserCheck, 
  Award, 
  Download, 
  AlertCircle,
  RotateCcw,
  ArrowRight
} from "lucide-react";

export default function VerificationPortal({ initialQuery }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery || "");
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  // Auto-search if initialQuery is provided on mount
  useState(() => {
    if (initialQuery) {
      handleSearch(null, initialQuery);
    }
  });

  async function handleSearch(e: React.FormEvent | null, searchStr?: string) {
    if (e) e.preventDefault();
    const term = searchStr || query;
    if (!term.trim()) return;

    setLoading(true);
    setError(null);
    setRecord(null);
    setSearched(true);

    try {
      const res = await getVerificationRecord(term);
      if (res.error) {
        setError(res.error);
      } else {
        setRecord(res.record);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setQuery("");
    setRecord(null);
    setError(null);
    setSearched(false);
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* 🔍 Search Card */}
      {!record && !error && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-6 md:p-10 relative overflow-hidden transition-all duration-300">
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-50/50 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex p-3 bg-blue-50 rounded-2xl text-blue-600 mb-4 border border-blue-100/50">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
              Credential Verification System
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Verify the authenticity of Certificates and Marksheets issued by Vision IT Computer Institute. Enter either the Roll Number, Certificate Number, or Marksheet Number.
            </p>
          </div>

          <form onSubmit={(e) => handleSearch(e)} className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-4">
            <div className="relative w-full flex items-center">
              <div className="absolute left-4.5 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Roll No, Certificate No, or Marksheet No..."
                className="w-full pl-12.5 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all shadow-inner"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-md shadow-blue-500/10 hover:shadow-blue-500/25 active:scale-95 hover:-translate-y-0.5"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Verify Credentials
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* ⚠️ Error State (Not Found) */}
      {searched && error && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-8 text-center max-w-xl mx-auto animate-in fade-in zoom-in-95 duration-300">
          <div className="inline-flex p-3 bg-rose-50 text-rose-600 rounded-full mb-4 border border-rose-100">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Verification Failed</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            {error}
          </p>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      )}

      {/* 🎉 Success State (Verified Record Display) */}
      {searched && record && (() => {
        const isRunning = record.status?.toLowerCase() === "running";
        if (isRunning) {
          return (
            <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-400">
              {/* Status Banner */}
              <div className="bg-blue-50 border border-blue-200/60 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm shadow-blue-500/5">
                <div className="flex items-center gap-4 text-center sm:text-left">
                  <div className="p-3 bg-blue-500 text-white rounded-2xl shadow-md shadow-blue-500/20">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-blue-955 font-bold text-lg leading-tight">Active Student Record</h3>
                    <p className="text-blue-700/95 text-xs font-semibold mt-0.5">
                      This student is currently enrolled and pursuing their course at Vision IT Computer Institute.
                    </p>
                  </div>
                </div>
                <div className="px-4 py-1.5 bg-blue-500 text-white text-[11px] font-black tracking-wider uppercase rounded-full shadow-inner flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                  Running
                </div>
              </div>

              {/* Simple Profile Details Card */}
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                  <UserCheck className="w-5 h-5 text-blue-600" />
                  <h4 className="font-bold text-slate-800 text-sm tracking-wide uppercase">Student Details</h4>
                </div>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <User className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Student Name</span>
                      <span className="text-slate-800 font-bold text-base mt-0.5 block">{record.student_name}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <User className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Father's Name</span>
                      <span className="text-slate-700 font-bold text-sm mt-0.5 block">{record.father_name}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <User className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Mother's Name</span>
                      <span className="text-slate-700 font-bold text-sm mt-0.5 block">{record.mother_name || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Calendar className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Date of Birth</span>
                      <span className="text-slate-700 font-bold text-sm mt-0.5 block">
                        {record.dob 
                          ? new Date(record.dob).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
                          : 'N/A'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <GraduationCap className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Course Pursuing</span>
                      <span className="text-blue-700 font-bold text-sm mt-0.5 block">{record.course_name}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <div className="flex justify-center bg-slate-50 border border-slate-200/50 rounded-3xl p-5 shadow-inner">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-blue-500/10 hover:shadow-blue-500/25 active:scale-95 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  Verify Another
                </button>
              </div>
            </div>
          );
        }

        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-400">
            
            {/* Status Banner */}
            <div className={`border rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm ${
              isRunning 
                ? "bg-blue-50 border-blue-200/60 shadow-blue-500/5" 
                : "bg-emerald-50 border-emerald-200/60 shadow-emerald-500/5"
            }`}>
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className={`p-3 text-white rounded-2xl shadow-md ${
                  isRunning 
                    ? "bg-blue-500 shadow-blue-500/20" 
                    : "bg-emerald-500 shadow-emerald-500/20"
                }`}>
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className={`font-bold text-lg leading-tight ${isRunning ? "text-blue-955" : "text-emerald-955"}`}>
                    {isRunning ? "Active Student Record" : "Verified Credential"}
                  </h3>
                  <p className={`text-xs font-semibold mt-0.5 ${isRunning ? "text-blue-700/95" : "text-emerald-700/95"}`}>
                    {isRunning 
                      ? "This student is currently pursuing their course at Vision IT Computer Institute."
                      : "This certificate and marksheet record is authentic and officially issued."
                    }
                  </p>
                </div>
              </div>
              <div className={`px-4 py-1.5 text-white text-[11px] font-black tracking-wider uppercase rounded-full shadow-inner flex items-center gap-1 ${
                isRunning ? "bg-blue-500" : "bg-emerald-500"
              }`}>
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                {record.status}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Student & Course details Card (Left Panel) */}
              <div className="md:col-span-7 bg-white rounded-3xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                    <UserCheck className="w-5 h-5 text-blue-600" />
                    <h4 className="font-bold text-slate-800 text-sm tracking-wide uppercase">Candidate Profile</h4>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <User className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Student Name</span>
                        <span className="text-slate-800 font-bold text-base mt-0.5 block">{record.student_name}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <User className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Father's Name</span>
                        <span className="text-slate-700 font-bold text-sm mt-0.5 block">{record.father_name}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <GraduationCap className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                          {isRunning ? "Course Pursuing" : "Course Completed"}
                        </span>
                        <span className="text-blue-700 font-bold text-sm mt-0.5 block">{record.course_name}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div className="flex items-start gap-3">
                        <Award className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Roll Number</span>
                          <span className="text-slate-700 font-bold text-xs mt-0.5 block">{record.roll_number}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <UserCheck className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Student ID</span>
                          <span className="text-slate-700 font-bold text-xs mt-0.5 block">{record.student_id || 'N/A'}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Calendar className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Duration</span>
                          <span className="text-slate-700 font-bold text-xs mt-0.5 block">{record.course_duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {isRunning ? "Commenced on" : "Issued on"}: {new Date(record.issue_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* Performance & Academic Status (Right Panel) */}
              <div className="md:col-span-5 bg-white rounded-3xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-full blur-xl pointer-events-none" />
                
                <div>
                  <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 relative z-10">
                    <Award className="w-5 h-5 text-indigo-600" />
                    <h4 className="font-bold text-slate-800 text-sm tracking-wide uppercase">Academic Summary</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-4 relative z-10 mb-6">
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">Percentage</span>
                      <span className="text-indigo-600 font-black text-xl md:text-2xl">
                        {isRunning ? "Awaited" : `${record.percentage}%`}
                      </span>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">Overall Grade</span>
                      <span className="text-blue-600 font-black text-xl md:text-2xl">
                        {isRunning ? "Ongoing" : record.grade}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 bg-slate-50/60 border border-slate-100 rounded-2xl p-4 relative z-10 text-xs font-semibold text-slate-600">
                    <div className="flex justify-between">
                      <span>Obtained Marks:</span>
                      <span className="text-slate-800 font-bold">{isRunning ? "In Progress" : record.obtained_marks}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-100 pt-2">
                      <span>Total Max Marks:</span>
                      <span className="text-slate-800 font-bold">{isRunning ? "In Progress" : record.total_marks}</span>
                    </div>
                  </div>
                </div>

                {/* Document verification tracking numbers */}
                <div className="mt-8 pt-4 border-t border-slate-100 space-y-2 relative z-10 text-[10px] font-bold text-slate-400">
                  <div className="flex justify-between">
                    <span>ADMISSION NO:</span>
                    <span className="text-slate-600">{record.admission_no || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CERTIFICATE NO:</span>
                    <span className="text-slate-600">{isRunning ? "Not Issued Yet" : (record.certificate_no || 'N/A')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>MARKSHEET NO:</span>
                    <span className="text-slate-600">{isRunning ? "Not Issued Yet" : (record.marksheet_no || 'N/A')}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Action buttons (Download Certificate & Marksheet) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 border border-slate-200/50 rounded-3xl p-5 shadow-inner">
              <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                {record.certificate_url && (
                  <a
                    href={record.certificate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold shadow-sm transition-all duration-300 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 hover:-translate-y-0.5"
                  >
                    <FileCheck2 className="w-4.5 h-4.5" />
                    View Certificate
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                )}
                {record.marksheet_url && (
                  <a
                    href={record.marksheet_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold shadow-sm transition-all duration-300 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 hover:-translate-y-0.5"
                  >
                    <FileSpreadsheet className="w-4.5 h-4.5" />
                    View Marksheet
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                )}
              </div>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-blue-500/10 hover:shadow-blue-500/25 active:scale-95 transition-all duration-300 hover:-translate-y-0.5"
              >
                <RotateCcw className="w-4 h-4" />
                Verify Another
              </button>
            </div>

          </div>
        );
      })()}
    </div>
  );
}
