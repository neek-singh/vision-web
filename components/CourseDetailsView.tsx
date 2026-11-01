"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Share2,
  Clock,
  Award,
  Globe,
  MapPin,
  Check,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Laptop,
  Users,
  Briefcase,
  BookOpen,
  BarChart3,
  GraduationCap,
  Info,
  PhoneCall,
} from "lucide-react";

export interface CourseData {
  courseId: string;
  title: string;
  badge: string;
  duration: string;
  level: string;
  mode: string;
  language: string;
  eligibility: string;
  about: string;
  fee: {
    total: string;
    admission: string;
    tuition: string;
    exam: string;
  };
  skills: string[];
  curriculum: {
    title: string;
    desc: string;
    topics: string[];
  }[];
  projects: {
    title: string;
    desc: string;
  }[];
  careers: string[];
}

export default function CourseDetailsView({ course }: { course: CourseData }) {
  const [expandedModules, setExpandedModules] = useState<number[]>([0, 1, 2, 3, 4, 5]);
  const [copied, setCopied] = useState(false);

  const isSchoolTuition = course.courseId === "school-tuition";

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${course.title} | Vision IT`,
          text: `Check out ${course.title} at Vision IT Computer Institute, Pratappur.`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (_) {}
    }
  };

  const toggleModule = (index: number) => {
    setExpandedModules((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const stats = [
    { label: "DURATION", value: course.duration, icon: Clock },
    { label: "LEVEL", value: course.level, icon: BarChart3 },
    { label: "ELIGIBILITY", value: course.eligibility, icon: GraduationCap },
    { label: "LANGUAGE", value: course.language, icon: Globe },
    { label: "MODE", value: course.mode, icon: MapPin },
  ];

  const highlights = [
    {
      title: "Offline Classroom",
      desc: "In-person learning with personal attention and direct guidance from teachers.",
      icon: Users,
    },
    {
      title: "70% Practical Training",
      desc: "Dedicated daily hands-on practice in our computer lab on every module.",
      icon: Laptop,
    },
    ...(isSchoolTuition
      ? [
          {
            title: "School Curriculum Support",
            desc: "Concept clarity and syllabus alignment with middle and high school curriculum.",
            icon: BookOpen,
          },
          {
            title: "Daily Lab Practice",
            desc: "Dedicated computer hands-on practice, typing accuracy, and practical skills.",
            icon: Laptop,
          },
        ]
      : [
          {
            title: "Resume & Interview Prep",
            desc: "Guidance on resume building, interview practice, and workplace readiness.",
            icon: Briefcase,
          },
          {
            title: "Certificate by Drishti",
            desc: "Course completion certificate issued by Drishti Computer Education.",
            icon: ShieldCheck,
          },
        ]),
  ];

  return (
    <main className="w-full bg-[#f8fafd] min-h-screen text-slate-800 pb-28">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 px-4 py-3.5 sm:px-8 lg:px-12 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/courses"
            className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-semibold text-sm sm:text-base">All Courses</span>
          </Link>
          <div className="relative">
            <button
              onClick={handleShare}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-all cursor-pointer flex items-center justify-center"
              title="Share Course"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {copied && (
              <span className="absolute right-0 top-full mt-1.5 bg-slate-900 text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap shadow-md animate-in fade-in duration-200 z-50">
                Link copied!
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Card */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 text-[11px] font-normal rounded-full bg-blue-50 text-blue-700 uppercase tracking-wider border border-blue-200/50">
                {course.badge}
              </span>
              <span className="px-3 py-1 text-[11px] font-normal rounded-full bg-slate-100 text-slate-950 border border-slate-200">
                Eligibility: {course.eligibility}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal text-slate-950 tracking-tight leading-tight">
              {course.title}
            </h1>

            <p className="text-slate-950 text-sm sm:text-base leading-relaxed font-normal">
              {course.about}
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-4 border-t border-slate-100">
              {stats.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div key={idx} className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <div className="flex items-center gap-1.5 text-slate-700 mb-1">
                      <Icon className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-normal tracking-wider">{s.label}</span>
                    </div>
                    <div className="text-xs sm:text-sm font-normal text-slate-950">{s.value}</div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Highlights */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
            <h2 className="text-lg sm:text-xl font-normal text-slate-950 tracking-tight">
              Course Highlights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((h, idx) => {
                const Icon = h.icon;
                return (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-normal text-slate-950">{h.title}</h3>
                      <p className="text-xs text-slate-950 mt-1 leading-relaxed font-normal">{h.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Skills */}
          {course.skills.length > 0 && (
            <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
              <h2 className="text-lg sm:text-xl font-normal text-slate-950 tracking-tight">
                Skills You Will Learn
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-950 font-normal">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Curriculum */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-normal text-slate-950 tracking-tight">
                Curriculum Modules
              </h2>
              <span className="text-xs text-slate-700 font-normal">
                {course.curriculum.length} Modules
              </span>
            </div>

            <div className="space-y-3">
              {course.curriculum.map((mod, idx) => {
                const isOpen = expandedModules.includes(idx);
                return (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm"
                  >
                    <button
                      onClick={() => toggleModule(idx)}
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-normal text-slate-950 hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-sm sm:text-base">{mod.title}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-700" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-700" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="border-t border-slate-100 p-5 bg-slate-50/50 space-y-3">
                        <p className="text-xs sm:text-sm text-slate-950 leading-relaxed font-normal">
                          {mod.desc}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {mod.topics.map((t, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-xs bg-white border border-slate-300 px-3 py-1 rounded-full text-slate-950 font-normal"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Projects */}
          {course.projects.length > 0 && (
            <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
              <h2 className="text-lg sm:text-xl font-normal text-slate-950 tracking-tight">
                Practical Projects
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {course.projects.map((proj, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <h3 className="text-sm font-normal text-slate-950">{proj.title}</h3>
                    <p className="text-xs text-slate-950 leading-relaxed font-normal">{proj.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Where These Skills Help */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
            <h2 className="text-lg sm:text-xl font-normal text-slate-950 tracking-tight">
              Where These Skills Help
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {course.careers.map((c, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center font-normal text-xs sm:text-sm text-slate-950"
                >
                  {c}
                </div>
              ))}
            </div>
          </section>

          {/* Drishti Certificate Disclaimer (Omit for School Tuition until confirmed) */}
          {!isSchoolTuition && (
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-950 leading-relaxed font-normal italic">
              *Note: Certificate is issued by Drishti Computer Education. Vision IT is an authorized franchise partner (Branch Code DCE/25/041). Please check with the employer or institution where you plan to use it.
            </div>
          )}
        </div>

        {/* Right Sticky Sidebar (Fees & Enrolment) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm sticky top-24 space-y-6">
            <div>
              <span className="text-[10px] font-normal uppercase tracking-wider text-slate-700">
                {isSchoolTuition ? "Monthly Tuition Fee" : "Total Course Fee"}
              </span>
              <div className="text-3xl font-normal text-slate-950 mt-1">
                {course.fee.total}
              </div>
              <p className="text-xs text-slate-600 mt-1 italic font-normal">
                {isSchoolTuition
                  ? "*Note: Monthly recurring fee, pay month-by-month"
                  : "*Note: Includes Admission, Tuition & Exam fees"}
              </p>
            </div>

            {/* Fee Breakdown */}
            <div className="space-y-2 pt-4 border-t border-slate-100 text-xs sm:text-sm">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-950 font-normal">Admission Fee</span>
                <span className="font-normal text-slate-950">{course.fee.admission}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-950 font-normal">Tuition Fee</span>
                <span className="font-normal text-slate-950">{course.fee.tuition}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-950 font-normal">Exam Fee</span>
                <span className="font-normal text-slate-950">{course.fee.exam}</span>
              </div>
            </div>

            {/* Installment Note (Omit for School Tuition) */}
            {!isSchoolTuition && (
              <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl text-xs text-blue-950 font-normal italic">
                *Note: Installment Option Available — For fee details and flexible installment plans, please call:{" "}
                <a href="tel:+918103170595" className="not-italic text-blue-700 underline block mt-1">
                  +91 81031 70595
                </a>
              </div>
            )}

            {/* Inclusions */}
            <div className="space-y-3 pt-2">
              <h4 className="text-[10px] font-normal uppercase tracking-wider text-slate-700">Course Includes</h4>
              <ul className="space-y-2 text-xs font-normal text-slate-950">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Classroom sessions</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Hands-on lab practice</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Study material</span>
                </li>
                {!isSchoolTuition && (
                  <>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Resume & interview preparation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Certificate by Drishti Computer Education</span>
                    </li>
                  </>
                )}
                {isSchoolTuition && (
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>School curriculum syllabus coverage</span>
                  </li>
                )}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="space-y-2 pt-2">
              <Link
                href={`/inquiry?courseId=${course.courseId}`}
                className="w-full block text-center py-3.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-normal text-sm rounded-2xl shadow-sm transition-all"
              >
                Apply Now
              </Link>
              <a
                href="tel:+918103170595"
                className="w-full flex items-center justify-center gap-1.5 py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-950 font-normal text-xs rounded-2xl border border-slate-300 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" /> Call: 8103170595
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Viewport bottom bar */}
      <div className="fixed bottom-0 inset-x-0 bg-slate-950 text-white py-3 border-t border-slate-800 z-50 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-center sm:text-left">
            <div className="text-xs sm:text-sm font-normal text-white">
              {course.title} — {course.fee.total}
            </div>
            <p className="text-[11px] text-slate-300 font-normal">
              To book your seat, click Apply Now or call +91 81031 70595.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:+918103170595"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-normal text-xs rounded-xl"
            >
              Call 8103170595
            </a>
            <Link
              href={`/inquiry?courseId=${course.courseId}`}
              className="bg-blue-600 hover:bg-blue-500 text-white font-normal text-xs px-5 py-2 rounded-xl transition-colors"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

