"use client";

import dynamic from "next/dynamic";

const CoursesList = dynamic(() => import("@/app/courses/CoursesList"), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-96 bg-slate-200 rounded-[2rem] animate-pulse" />
      ))}
    </div>
  ),
});

export default function CoursesListClientWrapper({ initialCourses }: { initialCourses: any[] }) {
  return <CoursesList initialCourses={initialCourses} />;
}
