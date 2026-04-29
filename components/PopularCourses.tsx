import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Link from "next/link";
import { createPublicSupabaseClient } from "@/lib/supabase-server";
import Image from "next/image";

export default async function PopularCourses() {
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

  return (
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
  );
}

export function PopularCoursesSkeleton() {
  return (
    <section className="container mx-auto px-6 lg:px-8 pt-24 relative z-10">
      <div className="text-center mb-16">
        <div className="h-12 bg-slate-200 rounded-full w-64 mx-auto mb-4 animate-pulse"></div>
        <div className="h-6 bg-slate-200 rounded-full w-96 mx-auto animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-96 bg-slate-100 rounded-[2rem] animate-pulse"></div>
        ))}
      </div>
    </section>
  );
}
