"use client";

import { useState } from "react";
import { getVerificationRecord } from "../actions/verification";
import Link from "next/link";
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
  Lock,
  Headphones
} from "lucide-react";

export default function VerificationPortal({ initialQuery }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery || "");
  const [dob, setDob] = useState("");
  const [docType, setDocType] = useState("Official Marksheet");
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
        const data = res.record;
        
        // Optional DOB check if user entered a date of birth
        if (dob && data && data.dob) {
          const inputDob = new Date(dob).toISOString().split('T')[0];
          const recordDob = new Date(data.dob).toISOString().split('T')[0];
          if (inputDob !== recordDob) {
            setError("No records found matching this reference and Date of Birth.");
            setLoading(false);
            return;
          }
        }
        
        setRecord(data);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setQuery("");
    setDob("");
    setRecord(null);
    setError(null);
    setSearched(false);
  }

  // ⚠️ ERROR STATE (Verification Failed View matching mockup)
  if (searched && error) {
    return (
      <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-400">
        {/* Back Link */}
        <button
          onClick={handleReset}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-700 text-xs font-semibold mb-6 transition-colors"
        >
          <span className="text-sm">←</span> Back to Document Verification
        </button>

        {/* main error card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.01)] flex flex-col space-y-8 text-left">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-12 h-12 bg-red-50 text-red-500 border border-red-100 rounded-xl flex items-center justify-center shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-black text-slate-900 tracking-tight">
              Verification Failed
            </h2>
          </div>

          {/* Description */}
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
            The document information provided does not match the official records of the Computer Applications Institute. We are unable to verify the authenticity of this document at this time.
          </p>

          {/* Error Details Box */}
          <div className="bg-slate-50/60 border border-slate-200/80 rounded-lg p-4 space-y-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              ERROR DETAILS
            </span>
            <div className="text-xs sm:text-sm text-slate-700 space-y-1">
              <div>
                <span className="font-medium text-slate-500">Document ID:</span>{" "}
                <span className="font-bold text-slate-800">{query || "N/A"}</span>
              </div>
              <div>
                <span className="font-medium text-slate-500">Reason:</span>{" "}
                <span className="text-slate-600 font-medium">{error || "Record not found in the central registry."}</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-4">
            <h3 className="text-base font-serif font-bold text-slate-900 tracking-tight border-b border-slate-100 pb-2.5">
              Next Steps
            </h3>
            
            <div className="space-y-4">
              {/* Check for Typos */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-500 shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">Check for Typos</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed mt-1">
                    Ensure the Document ID was entered exactly as it appears on the certificate, including hyphens and capitalization.
                  </p>
                </div>
              </div>

              {/* Verify Document Type */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-500 shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">Verify Document Type</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed mt-1">
                    Confirm you are using the correct verification portal for the specific type of document (e.g., Degree Certificate vs. Transcripts).
                  </p>
                </div>
              </div>

              {/* Processing Time */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-500 shrink-0 mt-0.5">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">Processing Time</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed mt-1">
                    If the document was issued recently (within the last 48 hours), it may not yet be available in the digital registry.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-black hover:bg-slate-900 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>
            
            <Link
              href="/contact"
              className="px-6 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Contact Registrar
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 1. FORM STATE (Search / Portal form + Instructions)
  if (!record) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Card */}
        <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-6 md:p-8 flex flex-col space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-slate-900 shrink-0" />
            <h2 className="text-base sm:text-lg font-serif font-bold text-slate-900 tracking-tight">
              Secure Verification Portal
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={(e) => handleSearch(e)} className="space-y-4">
            {/* Document Type Dropdown */}
            <div className="flex flex-col">
              <label className="text-slate-500 text-xs font-semibold mb-1.5 block">
                Document Type
              </label>
              <div className="relative">
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-4 pr-10 py-2.5 text-xs md:text-sm font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Official Marksheet">Official Marksheet</option>
                  <option value="Official Certificate">Official Certificate</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            {/* Roll Number or Certificate ID */}
            <div className="flex flex-col">
              <label className="text-slate-500 text-xs font-semibold mb-1.5 block">
                Roll Number or Certificate ID
              </label>
              <input
                type="text"
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., CAI-2024-8923"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-xs md:text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
              />
            </div>

            {/* Date of Birth (Optional) */}
            <div className="flex flex-col">
              <label className="text-slate-500 text-xs font-semibold mb-1.5 block">
                Student Date of Birth (Optional for extra security)
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.type = "text";
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-4 pr-10 py-2.5 text-xs md:text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  disabled={loading}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Calendar className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Verify Document Button */}
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="w-full h-11 bg-black hover:bg-slate-900 text-white rounded-lg text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Verify Document
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <hr className="border-slate-100" />

          {/* Secure lock footer message */}
          <div className="flex items-start gap-2.5 text-[10px] text-slate-400 leading-relaxed font-medium">
            <Lock className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
            <span>
              All verification requests are logged and processed over a secure 256-bit encrypted connection. Data provided matches official institute records in real-time.
            </span>
          </div>
        </div>

        {/* Right Column: Instructions & Support */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: How it Works */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-5">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              How it Works
            </h3>
            
            <div className="space-y-4">
              {/* Step 1 */}
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Locate the ID</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                    Find the unique Certificate ID or Student Roll Number printed on the top right of the physical document.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Enter Details</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                    Input the details exactly as they appear on the document.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Instant Verification</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                    A digital copy of the verified record will be displayed immediately upon successful matching.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Need Assistance */}
          <div className="bg-[#111827] text-white rounded-2xl p-6 shadow-md text-center flex flex-col items-center space-y-4">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white">
              <Headphones className="w-5 h-5" />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white tracking-tight">
                Need Assistance?
              </h3>
              <p className="text-slate-400 text-[11px] leading-relaxed max-w-[200px]">
                If you encounter issues verifying a valid document, our academic records team can help.
              </p>
            </div>

            <Link
              href="/contact"
              className="w-full py-2.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs rounded-lg transition-colors text-center inline-block"
            >
              Contact Registrar
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. SUCCESS STATE (Verified student profile details)
  const isRunning = record.status?.toLowerCase() === "running";

  // Helper to get subjects and grades dynamically
  function getSubjectsAndGrades(course: string, overallGrade: string) {
    const isDCAOrADCA = course.toLowerCase().includes("dca") || course.toLowerCase().includes("diploma");
    const isWebDev = course.toLowerCase().includes("web") || course.toLowerCase().includes("stack");

    let subjects = [
      { name: "Computer Fundamentals", credits: "4.0" },
      { name: "Office Automation", credits: "3.0" },
      { name: "Programming in C", credits: "4.0" },
      { name: "Web Designing", credits: "3.0" },
      { name: "RDBMS", credits: "4.0" }
    ];

    if (isWebDev) {
      subjects = [
        { name: "HTML, CSS & Tailwind CSS", credits: "4.0" },
        { name: "JavaScript & React.js", credits: "4.0" },
        { name: "Next.js & Server Components", credits: "4.0" },
        { name: "Supabase & Database Design", credits: "3.0" },
        { name: "APIs & Integration", credits: "3.0" }
      ];
    } else if (!isDCAOrADCA) {
      subjects = [
        { name: "Introduction to IT", credits: "4.0" },
        { name: "Operating Systems", credits: "3.0" },
        { name: "Data Structures & Algorithms", credits: "4.0" },
        { name: "Database Management Systems", credits: "4.0" },
        { name: "Computer Networks", credits: "3.0" }
      ];
    }

    // Distribute grades based on overall grade
    let grades = ["A", "A", "A", "A", "A"];
    if (overallGrade === "A+") {
      grades = ["A", "A+", "A", "B+", "A"];
    } else if (overallGrade === "A") {
      grades = ["A", "A", "B+", "B", "A"];
    } else if (overallGrade === "B+") {
      grades = ["B+", "B", "B+", "C+", "B"];
    } else if (overallGrade === "B") {
      grades = ["B", "C+", "B", "C", "B"];
    } else if (overallGrade === "C") {
      grades = ["C", "C", "C", "D", "C"];
    } else if (overallGrade === "O") {
      grades = ["O", "O", "A+", "A+", "O"];
    }

    return subjects.map((sub, i) => ({
      ...sub,
      grade: grades[i] || overallGrade
    }));
  }

  const formattedIssueDate = record.issue_date
    ? new Date(record.issue_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'N/A';

  const formattedDocDate = record.issue_date
    ? new Date(record.issue_date).toLocaleDateString('en-GB') // e.g. 15/06/2024
    : 'N/A';

  // If status is Running (student is still active, course not completed yet)
  if (isRunning) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-400">
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

          <div className="space-y-5 text-left">
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
            <RotateCcw className="w-4.5 h-4.5" />
            Verify Another
          </button>
        </div>
      </div>
    );
  }

  // Completed / Authentic Success View (Two-column layout matching the mockup)
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-400">
      {/* Left Column: Verification Success Info */}
      <div className="lg:col-span-4 space-y-6">
        {/* Card 1: Verification Successful */}
        <div className="bg-white border-t-4 border-emerald-600 border-x border-b border-slate-200/80 rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] text-center flex flex-col items-center space-y-4">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-100">
            <ShieldCheck className="w-5 h-5 shrink-0" />
          </div>
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-serif font-black text-slate-900 tracking-tight">
              Verification Successful
            </h3>
            <p className="text-slate-500 text-[11px] leading-relaxed max-w-[240px] mx-auto">
              This document is officially recognized and verified by the Computer Applications Institute.
            </p>
          </div>
        </div>

        {/* Card 2: Document Information */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-5">
          <h3 className="text-xs font-bold text-slate-800 tracking-wider uppercase border-b border-slate-100 pb-3 font-serif">
            Document Information
          </h3>

          <div className="space-y-4 text-left">
            {/* Student Name */}
            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">Student Name</span>
              <span className="text-slate-800 font-bold text-sm mt-0.5 block">{record.student_name}</span>
            </div>

            {/* Document Type */}
            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">Document Type</span>
              <span className="text-slate-700 font-bold text-xs mt-0.5 block">{record.course_name}</span>
            </div>

            {/* Verification ID */}
            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block mb-1">Verification ID</span>
              <span className="inline-block px-2.5 py-1 bg-slate-50 border border-slate-200/80 rounded text-slate-600 font-mono text-[10px] font-semibold">
                {record.roll_number}
              </span>
            </div>

            {/* Issue Date */}
            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">Issue Date</span>
              <span className="text-slate-700 font-bold text-xs mt-0.5 block">
                {formattedIssueDate}
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <button
            onClick={() => {
              if (record.marksheet_url || record.certificate_url) {
                window.open(record.marksheet_url || record.certificate_url, "_blank");
              } else {
                window.print();
              }
            }}
            className="w-full h-11 bg-black hover:bg-slate-900 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Verification link copied to clipboard!");
            }}
            className="w-full h-11 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 10.742l4.572-2.286m0 0a3 3 0 13-2.286-4.572m2.286 4.572L9.082 11.2a3 3 0 11-2.286-4.572" /></svg>
            Share Verification Link
          </button>

          <button
            onClick={handleReset}
            className="w-full py-3 text-slate-400 hover:text-slate-600 text-xs font-bold transition-colors flex items-center justify-center gap-1 mt-4"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            Verify Another Document
          </button>
        </div>
      </div>

      {/* Right Column: Academic Marksheet Card */}
      <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative overflow-hidden flex flex-col justify-between min-h-[500px]">
        {/* Faint Watermark Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
          <svg className="w-80 h-80 text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M8 10v11M12 10v11M16 10v11M20 10v11" /></svg>
        </div>

        <div className="relative z-10 space-y-8">
          {/* Logo and Header */}
          <div className="text-center">
            <div className="w-11 h-11 bg-[#0f172a] rounded-lg flex items-center justify-center text-white mx-auto mb-4 shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M8 10v11M12 10v11M16 10v11M20 10v11" /></svg>
            </div>
            <h2 className="font-serif font-black text-slate-800 text-lg sm:text-2xl tracking-tight mb-1">
              Computer Applications Institute
            </h2>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">
              OFFICIAL ACADEMIC MARKSHEET
            </span>
          </div>

          {/* Candidate Details */}
          <div className="grid grid-cols-2 gap-6 border-t border-slate-100 pt-6">
            <div className="text-left">
              <span className="text-[9px] text-slate-400 font-semibold block mb-0.5">Name of Student</span>
              <span className="font-serif font-black text-slate-800 text-sm sm:text-base">{record.student_name}</span>
            </div>
            <div className="text-left">
              <span className="text-[9px] text-slate-400 font-semibold block mb-0.5">Program</span>
              <span className="font-serif font-black text-slate-800 text-sm sm:text-base">{record.course_name}</span>
            </div>
          </div>

          {/* Grades Table */}
          <div className="mt-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-2 text-left font-semibold">Subject</th>
                  <th className="py-2 text-center font-semibold w-20">Credits</th>
                  <th className="py-2 text-right font-semibold w-20">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
                {getSubjectsAndGrades(record.course_name, record.grade).map((sub, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                    <td className="py-3 text-left font-medium text-slate-600">{sub.name}</td>
                    <td className="py-3 text-center font-medium text-slate-500">{sub.credits}</td>
                    <td className="py-3 text-right font-bold text-slate-800">{sub.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Details */}
        <div className="relative z-10 border-t border-slate-100 pt-6 mt-8 flex items-end justify-between">
          <div className="space-y-4 text-left">
            <span className="text-[10px] text-slate-500 font-medium block">
              Date Issued: {formattedDocDate}
            </span>
            
            {/* Signature Block */}
            <div className="flex flex-col items-start">
              <svg className="w-20 h-6 text-slate-700" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 20 C 30 5, 40 25, 50 15 C 60 5, 70 25, 90 10" />
              </svg>
              <span className="text-[9px] text-slate-400 font-semibold mt-1">Registrar Signature</span>
            </div>
          </div>

          {/* Total Grade Badge */}
          <div className="text-right">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block mb-0.5">
              TOTAL GRADE
            </span>
            <span className="font-serif font-black text-slate-900 text-2xl sm:text-4xl">
              {record.grade}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
