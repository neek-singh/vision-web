import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Link from "next/link";
import { createPublicSupabaseClient } from "@/lib/supabase-server";
import Image from "next/image";

async function getPopularCourses() {
  const supabase = createPublicSupabaseClient();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .in("id", [
      "38fdc235-f7b5-4628-9d72-41c9ff2eabd8", // DCA
      "f9004121-1274-4b57-8179-ccc8365864b9", // PGDCA
      "1125b5a2-a20e-48a4-8ef3-3496ec955d17", // AI
      "197f7c89-e410-4768-8b49-567b4b4e3e9e"  // BCC
    ]);

  if (error) throw error;
  
  const desiredOrder = [
    "38fdc235-f7b5-4628-9d72-41c9ff2eabd8", // DCA
    "f9004121-1274-4b57-8179-ccc8365864b9", // PGDCA
    "1125b5a2-a20e-48a4-8ef3-3496ec955d17", // AI
    "197f7c89-e410-4768-8b49-567b4b4e3e9e"  // BCC
  ];

  const sortedData = (data || []).sort(
    (a, b) => desiredOrder.indexOf(a.id) - desiredOrder.indexOf(b.id)
  );

  return sortedData;
}

export default async function PopularCourses() {
  let displayCourses = [];
  try {
    displayCourses = await getPopularCourses();
  } catch (error) {
    console.error("Error fetching courses for home:", error);
  }

  return (
    <section className="container mx-auto px-6 lg:px-8 pt-24 relative z-10">
      {/* Decorative Aurora Glow behind heading */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-blue-400/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="text-center mb-16 relative">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 pb-1">
          Popular Courses
        </h2>
        <p className="text-slate-900 text-sm md:text-base max-w-2xl mx-auto font-medium">
          Master the most in-demand tech skills with our 100% practical training programs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
        {displayCourses.map((course: any) => (
          <Card
            key={course.id}
            className="relative group overflow-hidden bg-white/70 backdrop-blur-xl border border-white/80 hover:border-blue-300/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.25)] transition-all duration-500 flex flex-col h-full rounded-2xl"
          >
            {course.image_url && (
              <div className="relative w-full h-36 overflow-hidden">
                <Image
                  src={course.image_url}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Floating Course Level Badge */}
                <span className="absolute top-2.5 left-2.5 bg-emerald-100/90 backdrop-blur-md text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded shadow-sm border border-emerald-200/50 uppercase tracking-wide">
                  {course.course_level || 'Beginner'}
                </span>
              </div>
            )}

            <CardHeader className="bg-gradient-to-b from-blue-50/40 to-transparent pt-5 pb-3 border-b border-slate-100/50">
              <CardTitle className="text-sm md:text-base font-semibold text-black group-hover:text-blue-700 transition-colors duration-300">
                {course.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col flex-grow pt-4">
              <div className="flex flex-wrap items-center gap-3.5 mb-4">
                {/* Duration Tag */}
                <span className="font-semibold text-slate-600 text-[11px] uppercase tracking-wide flex items-center gap-1">
                  ⏱ {course.duration}
                </span>
              </div>

              <div className="flex gap-2 mt-auto border-t border-slate-100/80 pt-3">
                <Button
                  href={`/courses/${course.id}`}
                  variant="outline"
                  size="sm"
                  className="rounded-lg flex-1 font-semibold text-slate-700 border-slate-200 bg-white/50 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all duration-300 py-1.5 text-[11px] md:text-xs"
                >
                  Details
                </Button>
                <Button
                  href={`/inquire?courseId=${course.id}`}
                  variant="outline"
                  size="sm"
                  className="rounded-lg flex-1 font-semibold text-slate-700 border-slate-200 bg-white/50 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all duration-300 py-1.5 text-[11px] md:text-xs"
                >
                  Inquire
                </Button>
                <Button
                  href={`/apply?courseId=${course.id}`}
                  variant="primary"
                  size="sm"
                  className="rounded-lg flex-1 font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300 border-none py-1.5 text-[11px] md:text-xs"
                >
                  Apply
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
        <Button href="/courses" variant="ghost" className="font-semibold text-base text-blue-700 hover:bg-blue-50/80 px-8 py-4 rounded-full transition-all duration-300 group flex items-center justify-center mx-auto w-max">
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
      {/* Decorative Aurora Glow behind heading */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-blue-400/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="text-center mb-16 relative">
        <div className="h-8 shimmer rounded-full w-48 mx-auto mb-4"></div>
        <div className="h-4 shimmer rounded-full w-80 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white/70 backdrop-blur-xl border border-slate-200/60 flex flex-col overflow-hidden shadow-sm h-[324px] rounded-2xl"
          >
            {/* Image Placeholder */}
            <div className="w-full h-36 shimmer relative">
              {/* Level Badge Placeholder */}
              <div className="absolute top-2.5 left-2.5 bg-white/40 w-16 h-4 rounded shadow-sm"></div>
            </div>

            {/* Header Placeholder */}
            <div className="pt-5 pb-3 px-4 border-b border-slate-100/80 bg-gradient-to-b from-blue-50/20 to-transparent space-y-2">
              <div className="h-4.5 shimmer rounded w-3/4"></div>
              <div className="h-3 shimmer rounded w-1/2"></div>
            </div>

            {/* Content Placeholder */}
            <div className="flex flex-col flex-grow p-4">
              {/* Metadata Tags Placeholder */}
              <div className="flex flex-wrap items-center gap-3.5 mb-4">
                {/* Duration Tag Placeholder */}
                <div className="h-3.5 shimmer rounded-full w-14"></div>
              </div>

              {/* Buttons Placeholder */}
              <div className="flex gap-2.5 mt-auto border-t border-slate-100/80 pt-3">
                <div className="h-8 shimmer rounded-lg flex-1"></div>
                <div className="h-8 shimmer rounded-lg flex-1"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
