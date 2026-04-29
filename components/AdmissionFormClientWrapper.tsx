"use client";

import dynamic from "next/dynamic";

const AdmissionForm = dynamic(() => import("@/app/admissions/AdmissionForm"), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse space-y-4">
      <div className="h-12 bg-gray-200 rounded"></div>
      <div className="h-12 bg-gray-200 rounded"></div>
      <div className="h-12 bg-gray-200 rounded"></div>
    </div>
  ),
});

export default function AdmissionFormClientWrapper({
  courses,
  user,
  courseId,
}: {
  courses: any[];
  user?: any;
  courseId: string;
}) {
  return <AdmissionForm courses={courses} user={user} courseId={courseId} />;
}
