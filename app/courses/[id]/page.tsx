import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { createPublicSupabaseClient } from "@/lib/supabase-server";
import Image from "next/image";
import { Metadata } from "next";
import { ToolsList } from "@/features/courses/components/ToolsList";
import { ProjectsList } from "@/features/courses/components/ProjectsList";
import { SkillsList } from "@/features/courses/components/SkillsList";
import { HighlightsList } from "@/features/courses/components/HighlightsList";
import { FaqList } from "@/features/courses/components/FaqList";

export const dynamic = "force-dynamic";

async function getCourse(id: string) {
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
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  try {
    const course = await getCourse(id);
    if (!course) {
      return { title: "Course Not Found" };
    }
    return {
      title: `${course.title} | Vision IT Computer Institute`,
      description: course.description || `Enroll in ${course.title} at Vision IT Computer Institute in Pratappur.`,
    };
  } catch (error) {
    return { title: "Course Details | Vision IT Computer Institute" };
  }
}



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
  const skillsDeveloped = Array.isArray(course.skills_developed) ? course.skills_developed : [];


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
                {/* Category */}
                {course.category && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-md text-xs font-bold shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-amber-500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" /><path d="M6 6h10M6 10h10" /></svg>
                    {course.category}
                  </span>
                )}

                {/* Rating */}
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-md text-xs font-bold shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  {course.rating ?? 0} Rating
                </span>

                {/* Duration */}
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-md text-xs font-bold shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-blue-500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  {course.duration || '3 Months'}
                </span>

                {/* Level */}
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-md text-xs font-bold shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-emerald-500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
                  {course.course_level || 'Beginner'}
                </span>

                {/* Mode (Offline / Online) */}
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-md text-xs font-bold shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-violet-500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                  {course.learning_format || 'Offline / Online'}
                </span>

                {/* Students */}
                {(course.enrollments?.[0]?.count ?? 0) > 0 && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-md text-xs font-bold shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-indigo-500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    {course.enrollments?.[0]?.count}  already enrolled
                  </span>
                )}
              </div>

              {/* Title - Reduced size and margin */}
              <h1 className="text-sm md:text-base lg:text-lg font-semibold text-slate-900 mb-2 leading-tight tracking-tight">
                {course.title}
              </h1>

              {/* Description - Reduced size and margin */}
              <p className="text-sm md:text-base text-slate-800 leading-relaxed max-w-2xl mb-4 font-medium">
                {course.description}
              </p>

              {/* Elevated Highlights - Reduced size and margin */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  "Practical Learning",
                  "Verified Certificate",
                  "Latest Curriculum",
                  "Easy to Learn"
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
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Course Fee</span>
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
                    <span className="text-[9px] font-bold text-emerald-600 mt-1 bg-emerald-50 inline-block px-1.5 py-0.5 rounded w-max">
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
                    Apply Now
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

            <HighlightsList highlights={course.key_features || []} />

            {/* Bottom CTA Hint */}
            <div className="mt-6 text-xs md:text-sm text-slate-500 font-medium">
              ✔ Designed to make you job-ready with real-world skills
            </div>

          </div>

          {/* 2. Who is this program for? */}
          {course.target_audience && (
            <div className="relative mt-12 md:mt-16">
              <h2 className="text-base md:text-lg font-bold text-slate-900 mb-3 flex items-center gap-2.5">
                <span className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm shadow-indigo-200/50 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </span>
                Who is this program for?
              </h2>
              <p className="text-xs md:text-sm text-slate-900 leading-relaxed font-semibold mt-3">
                This program is designed for: <span className="text-slate-900 font-medium">{course.target_audience}</span>.
              </p>
            </div>
          )}

          {/* 3. Essential Skills You Develop */}
          {skillsDeveloped.length > 0 && (
            <div className="relative mt-12 md:mt-16">
              <h2 className="text-base md:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2.5">
                <span className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-sm shadow-blue-200/50 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </span>
                Essential Skills You Develop
              </h2>
              <SkillsList skills={skillsDeveloped} />
            </div>
          )}

          {/* 4. Course Curriculum */}
          {curriculum.length > 0 && (
            <div className="relative mt-12 md:mt-16">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-sm shadow-blue-200/50 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                    <path d="M6 6h10M6 10h10" />
                  </svg>
                </div>
                <h2 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">
                  Course Curriculum
                </h2>
              </div>

              <div className="max-w-4xl mx-auto divide-y divide-slate-100">
                {curriculum.map((module: any, idx: number) => {
                  let displayTitle = module.module_title;
                  let displaySubtitle = `Module ${idx + 1}`;

                  if (module.module_title.includes(":")) {
                    const parts = module.module_title.split(":");
                    displaySubtitle = parts[0].trim();
                    displayTitle = parts.slice(1).join(":").trim();
                  }

                  return (
                    <details
                      key={idx}
                      className="group transition-all duration-300 overflow-hidden cursor-pointer"
                    >
                      <summary className="flex items-center justify-between py-5 px-2 font-bold text-slate-900 list-none [&::-webkit-details-marker]:hidden select-none hover:bg-slate-50/60 rounded-xl transition-colors duration-250">
                        <div className="flex flex-col gap-1 text-left">
                          <h3 className="text-sm md:text-base font-semibold text-slate-900 tracking-tight">
                            {displayTitle}
                          </h3>
                          <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
                            {displaySubtitle}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-blue-600 shrink-0">
                          <div className={`flex items-center gap-1.5 transition-opacity duration-200 ${idx === 0
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                            }`}>
                            <span className="text-xs md:text-sm font-semibold hidden sm:inline group-open:hidden">
                              Module details
                            </span>
                            <span className="text-xs md:text-sm font-semibold hidden group-open:sm:inline">
                              Hide details
                            </span>
                          </div>
                          <svg
                            className="w-4 h-4 text-blue-600 transition-transform group-open:rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </summary>

                      {module.topics && module.topics.length > 0 && (
                        <div className="px-4 pb-6 pt-2 text-slate-600 text-xs md:text-sm bg-slate-50/20 rounded-xl mb-4 border border-slate-100/50">
                          <div className="flex flex-col gap-2 mt-2">
                            {module.topics.map((topic: string, tIdx: number) => (
                              <div
                                key={tIdx}
                                className="flex items-center gap-3 py-2.5 px-3 hover:bg-blue-50/40 rounded-xl border border-transparent hover:border-blue-100/30 transition-all duration-200 group/item"
                              >
                                <div className="w-5 h-5 rounded-full bg-blue-50/80 text-blue-600 flex items-center justify-center shrink-0 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all duration-200 shadow-sm">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                </div>
                                <span className="font-semibold text-black text-xs md:text-sm transition-colors duration-200">
                                  {topic}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </details>
                  );
                })}
              </div>
            </div>
          )}



          {/* 3. Enhanced Tools Covered */}
          {tools && tools.length > 0 && (
            <div className="relative mt-12 md:mt-16">

              {/* Heading */}
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm shadow-sky-500/20 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
                </div>
                <h2 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">
                  Tools you'll learn
                </h2>
              </div>

              {/* Subtext */}
              <p className="text-slate-800 text-xs md:text-sm mb-6 max-w-2xl font-medium">
                Gain hands-on experience with industry-standard tools and technologies used by professionals worldwide.
              </p>

              {/* Tools Badges */}
              <ToolsList tools={tools} />

              {/* Bottom Insight */}
              <p className="mt-6 text-xs md:text-sm text-slate-500 font-medium">
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
              <ProjectsList projects={projects} />
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

              <FaqList faqs={faqs} />
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
          Apply Now 🚀
        </Button>
      </section>
    </main>
  );
}
