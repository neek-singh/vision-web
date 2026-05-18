import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { createPublicSupabaseClient } from "@/lib/supabase-server";
import { unstable_cache } from "next/cache";
import Image from "next/image";

export const revalidate = 3600;

const getCourse = unstable_cache(
  async (id: string) => {
    const supabase = createPublicSupabaseClient();
    const { data, error } = await supabase
      .from("courses")
      .select(`
        *,
        enrollments:enrollments(count)
      `)
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },
  ["course-detail"],
  { revalidate: 3600, tags: ["courses"] }
);

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let course;
  try {
    course = await getCourse(id);
  } catch (error) {
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
    <main className="min-h-screen bg-[#F8FAFC] pb-16">
      {/* Optimized Compact Course Hero Section */}
      <section className="relative bg-white flex flex-col justify-center pt-24 pb-16 overflow-hidden border-b border-slate-100">

        {/* Modern Tech Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/50 via-indigo-50/20 to-transparent blur-3xl rounded-full translate-x-1/3 -translate-y-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/50 blur-3xl rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 max-w-4xl">

              {/* Sleek Back Link */}
              <Link href="/courses" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors mb-4 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Back to all courses
              </Link>

              {/* Enhanced Tags (Glassmorphic) */}
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="px-2.5 py-1 bg-blue-50 border border-blue-100 text-blue-700 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  {course.learning_format || 'Offline Training'}
                </span>
                <span className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-md text-[10px] font-bold shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  {course.rating || '4.8'} Rating
                </span>
                <span className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-md text-[10px] font-bold shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-indigo-500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  {course.enrollments?.[0]?.count || 0}+ Students
                </span>
              </div>

              {/* Title - Reduced size and margin */}
              <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-slate-900 mb-2 leading-tight tracking-tight">
                {course.title}
              </h1>

              {/* Description - Reduced size and margin */}
              <p className="text-sm md:text-base text-slate-800 leading-relaxed max-w-2xl mb-4 font-medium">
                {course.description}
              </p>

              {/* Elevated Highlights - Reduced size and margin */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  "100% Practical Training",
                  "Recognized Certificate",
                  "Job-Oriented Curriculum",
                  "Beginner Friendly"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-slate-800 font-semibold text-xs bg-white/60 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-slate-200 shadow-sm cursor-default hover:border-blue-200 transition-colors">
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>

              {/* Unified CTA & Pricing Card */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 md:p-5 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/30 w-full xl:w-11/12 relative overflow-hidden">

                {/* Subtle background glow for the card */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 blur-2xl rounded-full -z-10" />

                {/* Pricing Section */}
                <div className="flex flex-col min-w-[140px]">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Course Fee</span>
                  {course.discount_fee ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-slate-900">
                        ₹{course.discount_fee}
                      </span>
                      <span className="text-xs text-slate-400 line-through font-semibold">
                        ₹{course.fee}
                      </span>
                    </div>
                  ) : (
                    <span className="text-2xl font-black text-slate-900">
                      ₹{course.fee}
                    </span>
                  )}
                  {course.discount_fee && (
                    <span className="text-[10px] font-bold text-emerald-600 mt-1 bg-emerald-50 inline-block px-1.5 py-0.5 rounded w-max">
                      Limited Time Offer
                    </span>
                  )}
                </div>

                {/* Desktop Divider */}
                <div className="hidden sm:block w-px h-10 bg-slate-100"></div>

                {/* Action Section */}
                <div className="w-full sm:w-auto flex-grow flex sm:justify-end">
                  <Button
                    href={`/admissions?courseId=${course.id}`}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-slate-900 text-white h-11 px-6 rounded-xl text-xs font-bold shadow-md shadow-blue-500/10 transition-all duration-300 group flex items-center justify-center gap-1.5"
                  >
                    Enroll Now
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Button>
                </div>

              </div>

            </div>

            <div className="lg:col-span-5 relative w-full aspect-[16/10] sm:aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3] xl:aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border border-slate-100">
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
      <div className="container mx-auto px-6 lg:px-8 -mt-8 relative z-20 max-w-2xl">

        {/* Glassmorphic Card Wrapper */}
        <div className="bg-white/80 backdrop-blur-2xl rounded-xl p-3 md:p-4 shadow-lg shadow-slate-200/30 border border-white/60 grid grid-cols-2 md:grid-cols-3 gap-y-4 md:gap-y-0 divide-x-0 md:divide-x divide-slate-100">

          {/* Duration */}
          <div className="group text-center px-2 md:px-4">
            <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white group-hover:-rotate-3 transition-all duration-300 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">
              Duration
            </p>
            <p className="text-xs md:text-sm font-bold text-slate-900 leading-tight">
              {course.duration || '3 Months'}
            </p>
          </div>

          {/* Format */}
          <div className="group text-center px-2 md:px-4">
            <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-3 transition-all duration-300 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            </div>
            <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">
              Format
            </p>
            <p className="text-xs md:text-sm font-bold text-slate-900 leading-tight">
              {course.learning_format || 'Offline'}
            </p>
          </div>



          {/* Level */}
          <div className="group text-center px-2 md:px-4">
            <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white group-hover:rotate-3 transition-all duration-300 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
            </div>
            <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">
              Level
            </p>
            <p className="text-xs md:text-sm font-bold text-slate-900 leading-tight">
              {course.course_level || 'Beginner'}
            </p>
          </div>

        </div>
      </div>

      <section className="container mx-auto px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* 1. Key Features */}
          <div className="relative">

            {/* Heading */}
            <h2 className="text-base md:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-sm shadow-blue-200/50 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" /><path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5Z" /><path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z" /></svg>
              </span>
              Program Highlights
            </h2>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">

              {(course.key_features || []).map((feature: string, index: number) => (
                <div
                  key={index}
                  className="flex items-start gap-2.5 py-1"
                >

                  {/* Tiny Subtle Checkmark Icon */}
                  <span className="text-blue-600 font-bold text-sm md:text-base leading-none select-none flex-shrink-0">
                    ✓
                  </span>

                  {/* Content */}
                  <p className="font-semibold text-slate-800 text-xs md:text-sm leading-normal">
                    {feature}
                  </p>

                </div>
              ))}

            </div>

            {/* Bottom CTA Hint */}
            <div className="mt-6 text-xs text-slate-500 font-medium">
              ✔ Designed to make you job-ready with real-world skills
            </div>

          </div>



          {/* 3. Enhanced Tools Covered */}
          {tools && tools.length > 0 && (
            <div className="relative mt-12 md:mt-16">

              {/* Heading */}
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm shadow-sky-500/20 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
                </div>
                <h2 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">
                  Tools
                </h2>
              </div>

              {/* Subtext */}
              <p className="text-slate-800 text-xs md:text-sm mb-6 max-w-2xl font-medium">
                Gain hands-on experience with industry-standard tools and technologies used by professionals worldwide.
              </p>

              {/* Tools Grid */}
              <div className="flex flex-wrap gap-6 md:gap-8 justify-start">

                {tools.map((tool: any, idx: number) => (
                  <div
                    key={idx}
                    className="group flex flex-col items-center gap-1.5 w-16 text-center"
                  >

                    {/* Icon */}
                    <div className="w-10 h-10 flex items-center justify-center text-slate-700 group-hover:scale-110 transition-all duration-300">
                      {tool.image_url ? (
                        <img src={tool.image_url} alt={tool.name} className="w-9 h-9 object-contain" />
                      ) : (
                        <div
                          className="[&>svg]:w-9 [&>svg]:h-9"
                          dangerouslySetInnerHTML={{
                            __html: tool.icon_svg || `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`
                          }}
                        />
                      )}
                    </div>

                    {/* Tool Name */}
                    <span className="font-semibold text-slate-800 text-[11px] leading-tight select-none">
                      {tool.name}
                    </span>

                  </div>
                ))}

              </div>

              {/* Bottom Insight */}
              <p className="mt-6 text-xs text-slate-500 font-medium">
                ✔ Learn tools that are actually used in real-world jobs and projects
              </p>

            </div>
          )}

          {/* 4. Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-base md:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2.5">
                <span className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-sm shadow-purple-200/50 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                </span>
                Projects
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {projects.map((project: any, idx: number) => (
                  <div key={idx} className="group bg-white rounded-xl border border-gray-100 p-2 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative rounded-lg">
                      {project.image_url ? (
                        <Image src={project.image_url} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 33vw" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl bg-gradient-to-br from-blue-50 to-indigo-50">📁</div>
                      )}
                    </div>
                    <div className="p-2 text-center">
                      <h3 className="text-xs md:text-sm font-semibold text-slate-900 line-clamp-1">{project.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Program Trainers */}
          {trainers.length > 0 && (
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-6">Program Trainers</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {trainers.map((trainer: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-xl overflow-hidden shadow-inner shrink-0">
                      {trainer.image_url ? <Image src={trainer.image_url} alt={trainer.name} width={48} height={48} className="object-cover" /> : '👤'}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{trainer.name}</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{trainer.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. FAQs */}
          {faqs.length > 0 && (
            <div className="py-6">
              <div className="text-center mb-6">
                <h2 className="text-base md:text-lg font-semibold text-slate-900 tracking-tight">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-3 max-w-3xl mx-auto">
                {faqs.map((faq: any, idx: number) => (
                  <details
                    key={idx}
                    className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 overflow-hidden cursor-pointer"
                  >
                    {/* Question Header */}
                    <summary className="flex items-center justify-between p-3.5 font-bold text-blue-900 list-none [&::-webkit-details-marker]:hidden select-none">
                      <div className="flex items-center gap-2.5">
                        <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-md bg-blue-50 text-blue-600 font-bold text-[10px]">
                          Q
                        </span>
                        <span className="text-xs md:text-sm font-semibold text-slate-900">{faq.question}</span>
                      </div>

                      {/* Animated Plus / Minus Icon */}
                      <div className="relative flex-shrink-0 ml-3 w-4 h-4 text-blue-500">
                        {/* Plus Icon (Visible when closed) */}
                        <svg
                          className="absolute inset-0 w-4 h-4 opacity-100 group-open:opacity-0 transition-opacity duration-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        {/* Minus Icon (Visible when open) */}
                        <svg
                          className="absolute inset-0 w-4 h-4 opacity-0 group-open:opacity-100 transition-opacity duration-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                        </svg>
                      </div>
                    </summary>

                    {/* Answer Content */}
                    <div className="px-3.5 pb-3.5 pt-1 text-slate-800 text-[11px] md:text-xs leading-relaxed sm:pl-12">
                      <div className="border-l-2 border-blue-100 pl-3 font-medium">
                        {faq.answer}
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="text-center py-12">
        <h2 className="text-base md:text-lg font-semibold text-black mb-2">
          Ready to Start Your Career?
        </h2>

        <p className="text-slate-800 text-xs md:text-sm mb-4 font-medium">
          Join now and become job-ready with practical skills.
        </p>

        <Button href={`/admissions?courseId=${course.id}`} className="px-8 py-3.5 text-xs font-bold rounded-xl border-none">
          Enroll Now 🚀
        </Button>
      </section>
    </main>
  );
}
