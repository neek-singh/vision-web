"use client";

import dynamic from "next/dynamic";

const CoursesList = dynamic(() => import("@/features/courses/components/CoursesList"), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-slate-200/60 flex flex-col overflow-hidden shadow-sm h-[324px]"
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
  ),
});

export default function CoursesListClientWrapper({ 
  initialCourses,
  isLoggedIn
}: { 
  initialCourses: any[];
  isLoggedIn: boolean;
}) {
  return <CoursesList initialCourses={initialCourses} isLoggedIn={isLoggedIn} />;
}
