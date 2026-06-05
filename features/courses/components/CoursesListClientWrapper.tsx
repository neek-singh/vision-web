"use client";

import dynamic from "next/dynamic";

const CoursesList = dynamic(() => import("@/features/courses/components/CoursesList"), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-slate-200 flex flex-col overflow-hidden animate-pulse shadow-sm h-[324px]"
        >
          {/* Image Placeholder */}
          <div className="w-full h-36 bg-slate-200 relative">
            {/* Level Badge Placeholder */}
            <div className="absolute top-2.5 left-2.5 bg-slate-300/80 w-16 h-4 rounded shadow-sm"></div>
          </div>

          {/* Header Placeholder */}
          <div className="pt-5 pb-3 px-4 border-b border-slate-100 bg-gradient-to-b from-blue-50/20 to-transparent">
            <div className="h-4 bg-slate-200 rounded w-3/4 mb-1.5"></div>
            <div className="h-3 bg-slate-200 rounded w-1/2"></div>
          </div>

          {/* Content Placeholder */}
          <div className="flex flex-col flex-grow p-4">
            {/* Metadata Tags Placeholder */}
            <div className="flex flex-wrap items-center gap-3.5 mb-4">
              {/* Duration Tag Placeholder */}
              <div className="h-3.5 bg-slate-200 rounded-full w-14"></div>
              {/* Fee Tag Placeholder */}
              <div className="h-3.5 bg-slate-200 rounded-full w-12"></div>
            </div>

            {/* Buttons Placeholder */}
            <div className="flex gap-2.5 mt-auto border-t border-slate-100/80 pt-3">
              <div className="h-8 bg-slate-200 rounded-lg flex-1"></div>
              <div className="h-8 bg-slate-200 rounded-lg flex-1"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
});

export default function CoursesListClientWrapper({ initialCourses }: { initialCourses: any[] }) {
  return <CoursesList initialCourses={initialCourses} />;
}
