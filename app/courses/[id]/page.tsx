import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { createPublicSupabaseClient } from "@/lib/supabase-server";
import Image from "next/image";

export const revalidate = 60;

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabase = createPublicSupabaseClient();
  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !course) {
    console.error("Error fetching course detail from DB:", error);
    return notFound();
  }

  if (!course) {
    return notFound();
  }

  const curriculum = Array.isArray(course.curriculum) ? course.curriculum : [];
  const tools = Array.isArray(course.tools_covered) ? course.tools_covered : [];
  const projects = Array.isArray(course.projects) ? course.projects : [];
  const faqs = Array.isArray(course.faqs) ? course.faqs : [];
  const trainers = Array.isArray(course.trainers) ? course.trainers : [];

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Optimized Single-Screen Course Hero Section */}
      <section className="relative bg-white min-h-[100dvh] flex flex-col justify-center pt-20 pb-32 overflow-hidden border-b border-slate-100">

        {/* Modern Tech Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/50 via-indigo-50/20 to-transparent blur-3xl rounded-full translate-x-1/3 -translate-y-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/50 blur-3xl rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 max-w-4xl">

              {/* Sleek Back Link */}
              <Link href="/courses" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors mb-6 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Back to all courses
              </Link>

              {/* Enhanced Tags (Glassmorphic) */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1.5 bg-blue-50 border border-blue-100 text-blue-700 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm">
                  {course.learning_format || 'Offline Training'}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-bold shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  {course.rating || '4.8'} Rating
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-bold shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-indigo-500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  {course.enrolled_count || '120'}+ Students
                </span>
              </div>

              {/* Title - Reduced margin */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 leading-[1.15] tracking-tight">
                {course.title}
              </h1>

              {/* Description - Reduced margin */}
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mb-6">
                {course.description}
              </p>

              {/* Elevated Highlights - Reduced margin */}
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  "100% Practical Training",
                  "Recognized Certificate",
                  "Job-Oriented Curriculum",
                  "Beginner Friendly"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-slate-700 font-semibold text-sm bg-white/60 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm cursor-default hover:border-blue-200 transition-colors">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>

              {/* Unified CTA & Pricing Card */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-white p-5 md:p-6 rounded-[2rem] border border-slate-100 shadow-2xl shadow-slate-200/40 w-full xl:w-11/12 relative overflow-hidden">

                {/* Subtle background glow for the card */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 blur-2xl rounded-full -z-10" />

                {/* Pricing Section */}
                <div className="flex flex-col min-w-[140px]">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Course Fee</span>
                  {course.discount_fee ? (
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-black text-slate-900">
                        ₹{course.discount_fee}
                      </span>
                      <span className="text-base text-slate-400 line-through font-semibold">
                        ₹{course.fee}
                      </span>
                    </div>
                  ) : (
                    <span className="text-3xl font-black text-slate-900">
                      ₹{course.fee}
                    </span>
                  )}
                  {course.discount_fee && (
                    <span className="text-xs font-bold text-emerald-600 mt-1.5 bg-emerald-50 inline-block px-2 py-1 rounded w-max">
                      Limited Time Offer
                    </span>
                  )}
                </div>

                {/* Desktop Divider */}
                <div className="hidden sm:block w-px h-12 bg-slate-100"></div>

                {/* Action Section */}
                <div className="w-full sm:w-auto flex-grow flex sm:justify-end">
                  {course.admission_closes && new Date(course.admission_closes) < new Date(new Date().setHours(0, 0, 0, 0)) ? (
                    <div className="flex items-center gap-3 w-full sm:w-auto bg-red-50 text-red-700 p-3 rounded-2xl border border-red-100">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                      </div>
                      <div>
                        <p className="font-bold text-base leading-tight">Admissions Closed</p>
                        <p className="text-xs opacity-90 mt-0.5">
                          Last date: {new Date(course.admission_closes).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <Button
                      href={`/admissions?courseId=${course.id}`}
                      size="lg"
                      className="w-full sm:w-auto bg-blue-600 hover:bg-slate-900 text-white h-14 px-8 rounded-2xl text-base font-bold shadow-xl shadow-blue-500/20 hover:shadow-slate-900/20 transition-all duration-300 group flex items-center justify-center gap-2"
                    >
                      Enroll Now
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Button>
                  )}
                </div>

              </div>

            </div>

            <div className="lg:col-span-5 relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
              {course.image_url ? (
                <Image
                  src={course.image_url}
                  alt={course.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center font-medium text-slate-400">
                  No Image Available
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Stats Bar (Overlaps Hero Section) */}
      <div className="container mx-auto px-6 lg:px-8 -mt-16 relative z-20 max-w-5xl">

        {/* Glassmorphic Card Wrapper */}
        <div className="bg-white/80 backdrop-blur-2xl rounded-[2rem] p-6 md:p-8 shadow-2xl shadow-slate-200/50 border border-white/60 grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-0 divide-x-0 md:divide-x divide-slate-100">

          {/* Duration */}
          <div className="group text-center px-2 md:px-4">
            <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:-rotate-3 transition-all duration-300 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              Duration
            </p>
            <p className="text-lg md:text-xl font-black text-slate-900 leading-tight">
              {course.duration || '3 Months'}
            </p>
          </div>

          {/* Format */}
          <div className="group text-center px-2 md:px-4">
            <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-3 transition-all duration-300 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              Format
            </p>
            <p className="text-lg md:text-xl font-black text-slate-900 leading-tight">
              {course.learning_format || 'Offline'}
            </p>
          </div>

          {/* Batch Closes */}
          <div className="group text-center px-2 md:px-4 flex flex-col items-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white group-hover:-rotate-3 transition-all duration-300 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5"></path><polyline points="16 2 16 6 22 6"></polyline><path d="M12 14v-4"></path><path d="M12 18h.01"></path></svg>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              Batch Closes
            </p>
            <p className="text-lg md:text-xl font-black text-slate-900 leading-tight">
              {course.admission_closes
                ? new Date(course.admission_closes).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                })
                : 'Closing Soon'}
            </p>
            <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 border border-red-100">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-[10px] text-red-600 font-bold uppercase tracking-wider">
                Limited Seats
              </span>
            </div>
          </div>

          {/* Level */}
          <div className="group text-center px-2 md:px-4">
            <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white group-hover:rotate-3 transition-all duration-300 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              Level
            </p>
            <p className="text-lg md:text-xl font-black text-slate-900 leading-tight">
              Beginner <span className="text-slate-400 font-medium mx-0.5">→</span> Pro
            </p>
          </div>

        </div>
      </div>

      <section className="container mx-auto px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-20">

            {/* 1. Key Features */}
            <div className="relative">

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-10 flex items-center gap-4">
                <span className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shadow-blue-200">
                  🚀
                </span>
                Program Highlights
              </h2>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {(course.key_features || []).map((feature: string, index: number) => (
                  <div
                    key={index}
                    className="group relative bg-white p-6 rounded-2xl border border-gray-100 flex items-start gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >

                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-5 transition duration-500" />

                    {/* Icon */}
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 font-bold group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      ✓
                    </div>

                    {/* Content */}
                    <div>
                      <p className="font-semibold text-slate-800 leading-relaxed">
                        {feature}
                      </p>
                    </div>

                  </div>
                ))}

              </div>

              {/* Bottom CTA Hint */}
              <div className="mt-10 text-sm text-slate-500 font-medium">
                ✔ Designed to make you job-ready with real-world skills
              </div>

            </div>

            {/* 2. Enhanced Curriculum */}
            {curriculum && curriculum.length > 0 && (
              <div className="relative">

                {/* Heading */}
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                    </svg>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                    Course Curriculum
                  </h2>
                </div>

                {/* Modules Accordion */}
                <div className="space-y-4">
                  {curriculum.map((module: any, idx: number) => (
                    <details
                      key={idx}
                      className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300 overflow-hidden"
                      // Adding 'open' to the first item by default is often good UX for course pages
                      open={idx === 0}
                    >

                      {/* Module Header */}
                      {/* Note: [&::-webkit-details-marker]:hidden removes the ugly default browser arrow */}
                      <summary className="cursor-pointer list-none p-6 flex justify-between items-center bg-white group-open:bg-slate-50/50 transition-colors select-none [&::-webkit-details-marker]:hidden">

                        <div className="flex items-center gap-5">
                          {/* Refined Step Number */}
                          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center font-black text-lg group-open:bg-indigo-600 group-open:text-white transition-colors duration-300 shadow-sm flex-shrink-0">
                            {idx + 1}
                          </div>

                          <div>
                            <h3 className="text-lg font-bold text-slate-900 group-open:text-indigo-600 transition-colors">
                              {module.module_title}
                            </h3>
                            <p className="text-sm font-medium text-slate-500 mt-0.5">
                              {module.topics?.length || 0} Topics Included
                            </p>
                          </div>
                        </div>

                        {/* Custom Animated Chevron */}
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center group-open:rotate-180 group-open:bg-indigo-100 group-open:text-indigo-600 transition-all duration-300 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </div>

                      </summary>

                      {/* Topics Grid */}
                      <div className="p-6 pt-2 bg-slate-50/50 border-t border-slate-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {(module.topics || []).map((topic: string, tidx: number) => (
                            <div
                              key={tidx}
                              className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all group/topic cursor-default"
                            >
                              {/* Subtle checkmark bullet */}
                              <div className="mt-0.5 w-5 h-5 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center flex-shrink-0 group-hover/topic:bg-indigo-500 group-hover/topic:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              </div>
                              <span className="text-slate-700 text-sm font-medium leading-relaxed group-hover/topic:text-slate-900 transition-colors">
                                {topic}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </details>
                  ))}
                </div>

                {/* Standardized Bottom Trust Badge */}
                <div className="mt-8 inline-flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl shadow-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600"></span>
                  </span>
                  <span className="text-sm text-slate-700 font-medium">
                    Step-by-step curriculum designed to take you from beginner to job-ready
                  </span>
                </div>

              </div>
            )}

            {/* 3. Enhanced Tools Covered */}
            {tools && tools.length > 0 && (
              <div className="relative mt-16 md:mt-24">

                {/* Heading */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sky-500/30">
                    🛠️
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                    Tools You'll Master
                  </h2>
                </div>

                {/* Subtext (IMPORTANT ADDITION) */}
                <p className="text-slate-600 mb-10 max-w-2xl">
                  Gain hands-on experience with industry-standard tools and technologies used by professionals worldwide.
                </p>

                {/* Tools Grid */}
                <div className="flex flex-wrap gap-4 md:gap-5">

                  {tools.map((tool: any, idx: number) => (
                    <div
                      key={idx}
                      className="group relative bg-white px-6 py-5 rounded-2xl border border-slate-200 flex flex-col items-center gap-3 min-w-[130px] flex-grow sm:flex-grow-0 shadow-sm hover:shadow-2xl hover:shadow-sky-500/10 hover:border-sky-300 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
                    >

                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-sky-50/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                      {/* Icon */}
                      <div
                        className="w-12 h-12 flex items-center justify-center text-slate-600 group-hover:scale-110 group-hover:text-sky-600 transition-all duration-300 relative z-10 [&>svg]:w-10 [&>svg]:h-10"
                        dangerouslySetInnerHTML={{
                          __html: tool.icon_svg || `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`
                        }}
                      />

                      {/* Tool Name */}
                      <span className="font-semibold text-slate-700 text-sm group-hover:text-slate-900 relative z-10 text-center">
                        {tool.name}
                      </span>

                    </div>
                  ))}

                </div>

                {/* Bottom Insight */}
                <p className="mt-8 text-sm text-slate-500 font-medium">
                  ✔ Learn tools that are actually used in real-world jobs and projects
                </p>

              </div>
            )}

            {/* 4. Projects */}
            {projects.length > 0 && (
              <div>
                <h2 className="text-3xl font-black text-blue-950 mb-8 flex items-center gap-4">
                  <span className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shadow-purple-200">💻</span>
                  Real-World Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((project: any, idx: number) => (
                    <div key={idx} className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm group">
                      <div className="aspect-video bg-gray-100 overflow-hidden relative">
                        {project.image_url ? (
                          <Image src={project.image_url} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 50vw" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-blue-50 to-indigo-50">📁</div>
                        )}
                      </div>
                      <div className="p-8">
                        <h3 className="text-xl font-black text-blue-950 mb-3">{project.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. FAQs */}
            {faqs.length > 0 && (
              <div className="py-8">
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 tracking-tight">
                    Frequently Asked Questions
                  </h2>
                </div>

                <div className="space-y-4 max-w-4xl mx-auto">
                  {faqs.map((faq: any, idx: number) => (
                    <details
                      key={idx}
                      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 overflow-hidden cursor-pointer"
                    >
                      {/* Question Header */}
                      <summary className="flex items-center justify-between p-6 font-bold text-blue-900 list-none [&::-webkit-details-marker]:hidden select-none">
                        <div className="flex items-center gap-4">
                          <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 font-black text-sm">
                            Q
                          </span>
                          <span className="text-base md:text-lg">{faq.question}</span>
                        </div>

                        {/* Animated Plus / Minus Icon */}
                        <div className="relative flex-shrink-0 ml-4 w-6 h-6 text-blue-500">
                          {/* Plus Icon (Visible when closed) */}
                          <svg
                            className="absolute inset-0 w-6 h-6 opacity-100 group-open:opacity-0 transition-opacity duration-200"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                          {/* Minus Icon (Visible when open) */}
                          <svg
                            className="absolute inset-0 w-6 h-6 opacity-0 group-open:opacity-100 transition-opacity duration-200"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                          </svg>
                        </div>
                      </summary>

                      {/* Answer Content */}
                      <div className="px-6 pb-6 pt-2 text-gray-600 text-sm md:text-base leading-relaxed sm:pl-[4.5rem]">
                        <div className="border-l-2 border-blue-100 pl-4">
                          {faq.answer}
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-10">
            {/* Career Ops */}
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 relative overflow-hidden">
              {/* Subtle Decorative Glow for light mode */}
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-10"></div>

              <h3 className="text-2xl font-black text-blue-950 mb-8 relative z-10">
                Career Outcomes
              </h3>

              <div className="space-y-6 relative z-10">
                {(course.career_opportunities || []).map((op: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-4 group cursor-default">
                    {/* Web Icon Container with Hover Effect */}
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-md group-hover:-translate-y-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                      </svg>
                    </div>

                    {/* Outcome Text */}
                    <span className="font-bold text-gray-700 transition-colors duration-300 group-hover:text-blue-900">
                      {op}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trainers */}
            {trainers.length > 0 && (
              <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                <h3 className="text-2xl font-black text-blue-950 mb-8">Program Trainers</h3>
                <div className="space-y-8">
                  {trainers.map((trainer: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl overflow-hidden">
                        {trainer.image_url ? <Image src={trainer.image_url} alt={trainer.name} width={64} height={64} className="object-cover" /> : '👤'}
                      </div>
                      <div>
                        <p className="font-black text-blue-950">{trainer.name}</p>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{trainer.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Who is this for */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-10 rounded-[3rem] border border-indigo-100">
              <h3 className="text-xl font-black text-blue-950 mb-4">Who is this for?</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {course.target_audience || 'Anyone looking to start their career in technology or upgrade their existing skills.'}
              </p>
              <div className="space-y-3">
                {(course.skills_developed || []).slice(0, 4).map((skill: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-bold text-blue-800">
                    <span className="text-blue-500">✨</span> {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center py-20">
        <h2 className="text-3xl font-black mb-4">
          Ready to Start Your Career?
        </h2>

        <p className="text-gray-600 mb-6">
          Join now and become job-ready with practical skills.
        </p>

        <Button href={`/admissions?courseId=${course.id}`} className="px-10 py-6 text-lg font-bold border-none">
          Enroll Now 🚀
        </Button>
      </section>
    </main>
  );
}
