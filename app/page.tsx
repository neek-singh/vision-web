import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Link from "next/link";
import { createPublicSupabaseClient } from "@/lib/supabase-server";
import Image from "next/image";
import fs from "fs";
import path from "path";

export const revalidate = 60;

export default async function Home() {
  const today = new Date().toISOString().split('T')[0];

  const supabase = createPublicSupabaseClient();
  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Error fetching courses for home:", error);
  }

  const displayCourses = courses || [];

  const batchesFilePath = path.join(process.cwd(), "data", "batches.json");
  let displayBatches: any[] = [];

  try {
    if (fs.existsSync(batchesFilePath)) {
      const fileData = fs.readFileSync(batchesFilePath, "utf-8");
      displayBatches = JSON.parse(fileData);
    }
  } catch (e) {
    console.error("Home batches error:", e);
  }

  return (
    <main className="flex-col w-full bg-gray-50 pb-20">

      {/* 1. Hero Section */}
      <section className="relative bg-white text-slate-900 rounded-b-[3rem] lg:rounded-b-[5rem] overflow-hidden pt-32 pb-36 px-6 lg:px-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-b border-slate-100">

        {/* Abstract Background Elements (Enhanced with a subtle tech grid) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/80 via-white to-white pointer-events-none"></div>

        {/* Animated Glow Blobs (Smoother blur and subtle pulse) */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/20 rounded-full blur-[80px] opacity-60 animate-pulse pointer-events-none"></div>
        <div className="absolute top-48 -left-24 w-72 h-72 bg-indigo-400/20 rounded-full blur-[80px] opacity-60 pointer-events-none"></div>

        <div className="container mx-auto max-w-5xl text-center relative z-10">

          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-blue-50 text-blue-700 font-semibold rounded-full text-sm border border-blue-200/60 shadow-sm transition-transform hover:scale-105 cursor-default">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            Admissions Open for 2026 Batches
          </div>

          {/* Headline with Gradient Text */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.15]">
            Vision <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">IT</span> <br className="hidden md:block" /> Computer Institute Pratappur
          </h1>

          {/* Refined Sub-headline */}
          <p className="mt-4 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Computer training to transform beginners into highly sought-after tech professionals.
          </p>

          {/* Enhanced CTAs */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-14">
            <Button href="/courses" size="lg" className="w-full sm:w-auto text-lg px-8 py-6 shadow-lg shadow-blue-500/25 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30 flex items-center justify-center">
              Explore Courses
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Button>
            <Button href="/admissions" size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 rounded-full bg-white shadow-sm border-slate-200 text-slate-700 hover:text-blue-700 hover:bg-blue-50/50 hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
              Apply Now
            </Button>
          </div>

          {/* NEW: Social Proof / Trust Indicators */}
          <div className="pt-8 border-t border-slate-200/60 max-w-lg mx-auto flex flex-col sm:flex-row items-center justify-center gap-5">
            <div className="flex -space-x-3">
              {/* Replace these URLs with actual avatar assets if you have them */}
              <Image className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" src="/social proof/nita.jpg" alt="Student Nita" width={40} height={40} />
              <Image className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" src="/social proof/ram.jpg" alt="Student Ram" width={40} height={40} />
              <Image className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" src="/social proof/reeta.jpg" alt="Student Reeta" width={40} height={40} />
              <Image className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" src="/social proof/sonu.jpg" alt="Student Sonu" width={40} height={40} />
              <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-50 flex items-center justify-center text-xs font-bold text-blue-600 shadow-sm z-10">15+</div>
            </div>
            <div className="text-sm text-slate-600 font-medium text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start text-amber-400 mb-0.5 tracking-widest text-base">
                ★★★★★
              </div>
              Trusted by 15+ students
            </div>
          </div>

        </div>
      </section>


      {/* 2. Popular Courses Section */}
      <section className="container mx-auto px-6 lg:px-8 pt-24 relative z-10">

        {/* Decorative Aurora Glow behind heading */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-blue-400/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="text-center mb-16 relative">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 mb-4 pb-1">
            Popular Courses
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">
            Master the most in-demand tech skills with our 100% practical training programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {displayCourses.map((course) => (
            <Card
              key={course.id}
              className="relative group overflow-hidden bg-white/70 backdrop-blur-xl border border-white/80 hover:border-blue-300/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.25)] transition-all duration-500 flex flex-col h-full rounded-[2rem]"
            >
              {course.image_url && (
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={course.image_url}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}
              {/* Glossy Neon Top Highlight on Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <CardHeader className="bg-gradient-to-b from-blue-50/40 to-transparent pt-8 pb-4 border-b border-slate-100/50">
                <CardTitle className="text-2xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-300">
                  {course.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col flex-grow pt-5">
                <p className="text-slate-600 mb-6 flex-grow line-clamp-3 leading-relaxed">
                  {course.description}
                </p>

                {/* Enhanced Course Meta Tags */}
                <div className="flex flex-wrap gap-2.5 mb-8">
                  <span className="font-bold text-blue-700 bg-blue-100/50 border border-blue-200/50 px-3 py-1.5 rounded-xl text-[11px] uppercase tracking-wide flex items-center gap-1.5">
                    ⏱ {course.duration}
                  </span>
                  {course.discount_fee ? (
                    <>
                      <span className="font-bold text-emerald-700 bg-emerald-100/50 border border-emerald-200/50 px-3 py-1.5 rounded-xl text-[11px] uppercase tracking-wide flex items-center gap-1.5">
                        ₹{course.discount_fee}
                      </span>
                      <span className="font-bold text-slate-400 line-through text-[11px] flex items-center">
                        ₹{course.fee}
                      </span>
                    </>
                  ) : course.fee ? (
                    <span className="font-bold text-emerald-700 bg-emerald-100/50 border border-emerald-200/50 px-3 py-1.5 rounded-xl text-[11px] uppercase tracking-wide flex items-center gap-1.5">
                      ₹{course.fee}
                    </span>
                  ) : null}
                </div>

                <div className="flex gap-3 mt-auto border-t border-slate-100/80 pt-6">
                  <Button
                    href={`/courses/${course.id}`}
                    variant="outline"
                    size="sm"
                    className="rounded-2xl flex-1 font-semibold text-slate-700 border-slate-200 bg-white/50 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all duration-300"
                  >
                    Details
                  </Button>
                  <Button
                    href={`/admissions?courseId=${course.id}`}
                    variant="primary"
                    size="sm"
                    className="rounded-2xl flex-1 font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300 border-none"
                  >
                    Enroll Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Empty State Design Upgrade */}
          {displayCourses.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-24 px-4 bg-white/40 backdrop-blur-md rounded-[2rem] border border-slate-200 border-dashed">
              <div className="w-16 h-16 bg-blue-50 text-blue-400 rounded-full flex items-center justify-center mb-4 shadow-inner">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              </div>
              <p className="text-slate-500 text-lg font-medium text-center">
                New batches forming soon. Please check back later.
              </p>
            </div>
          )}
        </div>

        <div className="text-center mt-16">
          <Button href="/courses" variant="ghost" className="font-semibold text-lg text-blue-700 hover:bg-blue-50/80 px-8 py-4 rounded-full transition-all duration-300 group flex items-center justify-center mx-auto w-max">
            View All Courses
            <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Button>
        </div>
      </section>
      {/* Upcoming Batches Section */}
      <section className="container mx-auto px-6 lg:px-8 py-24 max-w-7xl relative z-10">
        {/* Optional: Subtle top radial gradient to separate sections */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {/* Header */}
        <div className="text-center mb-16 relative">
          <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase mb-5 border border-blue-100">
            Admissions Open
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-5">
            Upcoming Batches
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Choose a schedule that fits your routine and start your career transformation today.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {displayBatches.map((batch, idx) => (
            <Card
              key={idx}
              className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl border border-slate-200 hover:border-blue-200 transition-all duration-300 hover:-translate-y-1.5 flex flex-col overflow-hidden"
            >
              {/* Subtle hover background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Top Header Row */}
              <div className="relative flex justify-between items-center mb-6">
                <span className="px-4 py-1.5 bg-slate-100 text-slate-700 font-bold rounded-lg text-xs uppercase tracking-wider group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                  {batch.type}
                </span>
                <span className="flex items-center gap-1.5 text-red-600 text-xs font-bold bg-red-50 border border-red-100 px-3 py-1.5 rounded-lg shadow-sm">
                  <span className="relative flex h-2 w-2 mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                  </span>
                  {batch.seats} Left
                </span>
              </div>

              {/* Course Title */}
              <h3 className="relative text-2xl font-bold text-slate-900 mb-6 leading-snug">
                {batch.course}
              </h3>

              {/* Details List */}
              <div className="relative space-y-4 mb-10">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">Starts</p>
                    <p className="text-slate-900 font-bold">{batch.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">Time</p>
                    <p className="text-slate-900 font-bold">{batch.time}</p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Button
                href="/admissions"
                className="relative mt-auto w-full rounded-2xl bg-slate-900 hover:bg-blue-600 text-white py-3.5 font-semibold transition-all duration-300 flex items-center justify-center gap-2 border-none group/btn"
              >
                Book Your Seat
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Button>
            </Card>
          ))}
        </div>
      </section>
      {/* 3. Student Success Stories Section */}
      {/* <section className="container mx-auto px-6 lg:px-8 pt-32 pb-24 relative z-10"> */}

      {/* Subtle Background Glow */}
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-blue-300/10 blur-[120px] rounded-full pointer-events-none"></div> */}

      {/* <div className="text-center mb-20 relative">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 mb-4 pb-1">
            Student Success Stories
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">
            Hear from our graduates who transformed their careers with our practical training.
          </p>
        </div> */}

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto relative"> */}

      {/* Testimonial 1 */}
      {/* <div className="group bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 hover:border-blue-200/60 hover:shadow-[0_0_40px_-15px_rgba(59,130,246,0.3)] transition-all duration-500 relative mt-8 hover:-translate-y-2 flex flex-col"> */}
      {/* Decorative Quote Icon */}
      {/* <svg className="absolute top-8 right-8 w-12 h-12 text-blue-100/50 transform -scale-x-100" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>

          <div className="absolute -top-6 left-8 bg-gradient-to-br from-blue-50 to-blue-100 border border-white rounded-2xl p-3.5 text-2xl shadow-sm rotate-3 group-hover:rotate-0 transition-transform duration-300">👨‍💻</div>

          <div className="flex gap-1 text-amber-400 text-sm mb-4 pt-4">★★★★★</div>
          <p className="text-slate-700 leading-relaxed mb-8 flex-grow relative z-10">
            "The Full Stack curriculum is incredibly up-to-date. I landed a Junior Developer role just two weeks after completing the course!"
          </p> */}

      {/* <div className="flex items-center gap-4 mt-auto border-t border-slate-200/60 pt-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-200 to-blue-300 border-2 border-white rounded-full flex items-center justify-center font-bold text-blue-900 shadow-sm">R</div>
            <div>
              <h4 className="font-bold text-slate-900">Rahul Sharma</h4>
              <p className="text-sm font-medium text-blue-600">Web Developer</p>
            </div>
          </div> */}
      {/* </div> */}

      {/* Testimonial 2 (Center Highlight) */}
      {/* <div className="group bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 p-8 rounded-[2rem] shadow-2xl shadow-blue-900/30 relative mt-8 transform md:-translate-y-6 hover:-translate-y-8 transition-all duration-500 border border-blue-800/50 flex flex-col"> */}
      {/* Decorative Aurora inside card */}
      {/* <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-500/20 to-transparent rounded-t-[2rem] pointer-events-none"></div>
          <svg className="absolute top-8 right-8 w-12 h-12 text-white/5 transform -scale-x-100" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>

          <div className="absolute -top-6 left-8 bg-gradient-to-br from-blue-500 to-indigo-600 border border-blue-400/30 rounded-2xl p-3.5 text-2xl shadow-lg shadow-blue-500/30 -rotate-3 group-hover:rotate-0 transition-transform duration-300">👩‍💻</div>

          <div className="flex gap-1 text-amber-400 text-sm mb-4 pt-4">★★★★★</div>
          <p className="text-blue-50 leading-relaxed mb-8 flex-grow relative z-10 text-lg">
            "The personalized mentorship and hands-on projects gave me the exact skills companies are looking for. Best decision ever."
          </p> */}

      {/* <div className="flex items-center gap-4 mt-auto border-t border-blue-800/60 pt-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 border-2 border-blue-400/50 rounded-full flex items-center justify-center font-bold text-white shadow-sm">P</div>
          <div>
            <h4 className="font-bold text-white">Priya Patel</h4>
            <p className="text-sm font-medium text-blue-300">Data Analyst</p>
          </div>
        </div>
      </div> */}

      {/* Testimonial 3 */}
      {/* <div className="group bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 hover:border-blue-200/60 hover:shadow-[0_0_40px_-15px_rgba(59,130,246,0.3)] transition-all duration-500 relative mt-8 hover:-translate-y-2 flex flex-col">
          <svg className="absolute top-8 right-8 w-12 h-12 text-blue-100/50 transform -scale-x-100" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>

          <div className="absolute -top-6 left-8 bg-gradient-to-br from-blue-50 to-blue-100 border border-white rounded-2xl p-3.5 text-2xl shadow-sm rotate-3 group-hover:rotate-0 transition-transform duration-300">🎨</div>

          <div className="flex gap-1 text-amber-400 text-sm mb-4 pt-4">★★★★★</div>
          <p className="text-slate-700 leading-relaxed mb-8 flex-grow relative z-10">
            "I went from zero design knowledge to creating professional prototypes. The UI/UX instructors are top-notch."
          </p>

          <div className="flex items-center gap-4 mt-auto border-t border-slate-200/60 pt-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-200 to-blue-300 border-2 border-white rounded-full flex items-center justify-center font-bold text-blue-900 shadow-sm">A</div>
            <div>
              <h4 className="font-bold text-slate-900">Amit Kumar</h4>
              <p className="text-sm font-medium text-blue-600">Product Designer</p>
            </div>
          </div>
        </div> */}

      {/* </div > */}
      {/* </section > */}

      {/* 4. Contact CTA Section (White Theme) */}
      < section className="container mx-auto px-6 lg:px-8 py-24 relative z-10" >

        {/* Outer Wrapper with Premium Light Shadow */}
        < div className="bg-white rounded-[3rem] lg:rounded-[4rem] p-10 md:p-16 lg:p-20 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden group" >

          {/* Light Animated Aurora/Glow Backgrounds */}
          < div className="absolute -right-32 -top-32 w-[30rem] h-[30rem] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none group-hover:bg-blue-200/50 transition-colors duration-700" ></div >
          <div className="absolute -left-32 -bottom-32 w-[30rem] h-[30rem] bg-indigo-100/50 rounded-full blur-[100px] pointer-events-none group-hover:bg-indigo-200/50 transition-colors duration-700"></div>

          <div className="relative z-10">

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight">
              Ready to Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Journey?</span>
            </h2>

            {/* Sub-headline */}
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
              Join hundreds of successful students. Enrollment for the 2026 batches is closing soon.
            </p>

            {/* Primary Actions */}
            <div className="flex flex-col sm:flex-row justify-center gap-5 mb-16">
              <Button href="/admissions" size="lg" className="w-full sm:w-auto text-lg px-10 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 rounded-full transition-all duration-300 hover:-translate-y-1 font-bold flex items-center justify-center border-none">
                Enroll Now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </Button>
              <Button href="/contact" size="lg" variant="outline" className="w-full sm:w-auto text-lg px-10 py-6 bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:text-blue-700 rounded-full transition-all duration-300 hover:-translate-y-1 font-semibold">
                Contact Advisors
              </Button>
            </div>

            {/* Quick Contact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto border-t border-slate-100 pt-10 mt-4">

              {/* Phone */}
              <a href="tel:+918103170595" className="flex flex-col items-center p-4 rounded-2xl hover:bg-slate-50 transition-colors group/link">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover/link:bg-blue-100 group-hover/link:scale-110 transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <span className="text-slate-900 font-semibold text-lg tracking-wide">+91 8103170595</span>
                <span className="text-slate-500 text-sm mt-1">Call us directly</span>
              </a>

              {/* Location */}
              <div className="flex flex-col items-center p-4 rounded-2xl hover:bg-slate-50 transition-colors group/link cursor-default">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover/link:bg-indigo-100 group-hover/link:scale-110 transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <span className="text-slate-900 font-semibold text-center">Kadampara Chowk</span>
                <span className="text-slate-500 text-sm text-center mt-1">Pratappur, Surajpur 497223</span>
              </div>

              {/* Instagram */}
              <a href="https://instagram.com/visionitinstitute" target="_blank" rel="noreferrer" className="flex flex-col items-center p-4 rounded-2xl hover:bg-slate-50 transition-colors group/link">
                <div className="w-14 h-14 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center mb-4 group-hover/link:bg-pink-100 group-hover/link:scale-110 transition-all">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </div>
                <span className="text-slate-900 font-semibold">@visionitinstitute</span>
                <span className="text-slate-500 text-sm mt-1">Follow for updates</span>
              </a>

            </div>
          </div>
        </div >
      </section >

      {/* 5. FAQ Section */}
      < section className="container mx-auto px-6 lg:px-8 py-24 max-w-4xl" >
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-blue-950 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Got questions? We&apos;ve got answers. Find everything you need to know about our courses and admissions.
          </p>
        </div>
        <div className="space-y-4">
          {[
            { q: "What courses do you offer at Vision IT?", a: "We offer DCA, ADCA, PGDCA, Full Stack Web Development, UI/UX Design, Data Science & AI, and more. Each course is industry-ready and practically focused." },
            { q: "What are the fees and duration of courses?", a: "Courses range from 3 to 12 months. Fees are highly affordable with flexible installment options. Contact us for the latest fee structure." },
            { q: "Do I get a certificate after completing the course?", a: "Yes! All students receive a government-recognized certificate upon successful completion, which is highly valued by employers." },
            { q: "Is job placement support available?", a: "Yes. We provide resume building, mock interviews, and industry connections to help students land their first tech job." },
            { q: "How do I enroll in a course?", a: "Click the Apply Now button, visit our institute in Pratappur, or reach us on WhatsApp for instant assistance." },
            { q: "What is the batch schedule like?", a: "We offer both morning and evening batches. New batches start every month. Reach out to know the upcoming batch dates." },
          ].map(({ q, a }, i) => (
            <details key={i} className="group bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              <summary className="flex items-center justify-between px-7 py-5 cursor-pointer list-none select-none font-semibold text-blue-950 text-lg hover:bg-blue-50/50 transition-colors">
                <span>{q}</span>
                <span className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0 ml-4 group-open:rotate-45 transition-transform duration-300 text-xl font-light">+</span>
              </summary>
              <div className="px-7 pb-6 pt-3 text-gray-600 leading-relaxed border-t border-gray-50">{a}</div>
            </details>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button href="/contact" variant="outline" className="rounded-full px-8 py-4">
            Have More Questions? Contact Us →
          </Button>
        </div>
      </section >

      {/* 6. Instagram / Social Section */}
      < section className="relative py-24 overflow-hidden z-10 border-y border-slate-100 bg-slate-50/50" >

        {/* Instagram-style Ambient Glow Background */}
        < div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-400/10 rounded-full blur-[100px] pointer-events-none" ></div >
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-indigo-400/5 blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">

          {/* Glassy Pill Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 bg-white/60 backdrop-blur-md text-pink-600 font-bold rounded-full text-sm border border-pink-100 shadow-[0_2px_10px_rgb(236,72,153,0.1)] transition-transform hover:scale-105 cursor-default">
            <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Follow Us on Instagram
          </div>

          {/* Gradient Headline */}
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5 tracking-tight">
            Stay Connected with <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent inline-block pb-1">
              @visionitinstitute
            </span>
          </h2>

          <p className="text-slate-600 text-lg mb-12 max-w-xl mx-auto font-medium">
            Follow us for daily coding tips, student success stories, course updates, and behind-the-scenes campus life in Pratappur.
          </p>

          {/* "Mock Posts" Glass Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto mb-14">
            {[
              { emoji: "💻", label: "Coding Class" },
              { emoji: "🎓", label: "Graduation" },
              { emoji: "🏆", label: "Achievement" },
              { emoji: "👨‍💻", label: "Workshop" },
              { emoji: "📊", label: "Data Science" },
              { emoji: "🚀", label: "Placement" },
            ].map(({ emoji, label }, i) => (
              <a
                key={i}
                href="https://instagram.com/visionitinstitute"
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square bg-white/70 backdrop-blur-xl rounded-[2rem] flex flex-col items-center justify-center border border-white/80 shadow-[0_4px_15px_rgb(0,0,0,0.02)] hover:-translate-y-2 hover:shadow-[0_15px_30px_-5px_rgba(236,72,153,0.2)] hover:border-pink-200/50 transition-all duration-300 group overflow-hidden"
              >
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Hover Heart Icon */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 text-pink-500">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                </div>

                <span className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300 relative z-10">{emoji}</span>
                <span className="text-xs text-slate-600 font-bold tracking-wide relative z-10">{label}</span>
              </a>
            ))}
          </div>

          {/* Premium Glossy CTA Button */}
          <a
            href="https://www.instagram.com/visionitinstitute"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold rounded-full shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/40 hover:-translate-y-1 transition-all duration-300 text-lg group"
          >
            <svg className="w-6 h-6 transition-transform group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Follow @visionitinstitute
          </a>

        </div>
      </section >

    </main >
  );
}
