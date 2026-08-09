"use client";

import dynamic from "next/dynamic";

const AdmissionForm = dynamic(() => import("@/features/admissions/components/AdmissionForm"), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse space-y-4">
      <div className="h-12 bg-gray-200 rounded"></div>
      <div className="h-12 bg-gray-200 rounded"></div>
      <div className="h-12 bg-gray-200 rounded"></div>
    </div>
  ),
});

const UniversityInquiryForm = dynamic(() => import("@/features/admissions/components/UniversityInquiryForm"), {
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
  type = "",
  courseName = "",
}: {
  courses: any[];
  user?: any;
  courseId: string;
  type?: string;
  courseName?: string;
}) {
  if (type === "university") {
    return <UniversityInquiryForm courses={courses} user={user} courseName={courseName} />;
  }
  return <AdmissionForm courses={courses} user={user} courseId={courseId} />;
}
