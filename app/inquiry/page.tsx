import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Metadata } from "next";
import AdmissionFormClientWrapper from "@/features/admissions/components/AdmissionFormClientWrapper";
import { Suspense } from "react";
import BackButton from "@/components/BackButton";

export const metadata: Metadata = {
  title: "Course Application | Vision IT Computer Institute",
  description: "Apply for DCA, ADCA, PGDCA, and Web Development courses at Vision IT Computer Institute Pratappur.",
};

export const revalidate = 0;

async function getSupabase() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => { },
      },
    }
  );
}

export default async function AdmissionsPage({
  searchParams,
}: {
  searchParams: Promise<{ courseId?: string; type?: string; course?: string }>;
}) {
  const params = await searchParams;
  const courseId = params.courseId || "";
  const type = params.type || "";
  const courseName = params.course || "";
  const supabase = await getSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: availableCourses } = await supabase
    .from("courses")
    .select("id, title");

  const isUniversity = type === "university";

  return (
    <main className="w-full bg-[#f8fafc] min-h-screen py-16 px-4 flex flex-col justify-center items-center font-sans">
      {/* Back Button */}
      <div className={`w-full ${isUniversity ? "max-w-6xl" : "max-w-2xl"} mb-4 px-2`}>
        <BackButton />
      </div>

      <div className={`w-full ${
        isUniversity 
          ? "max-w-6xl bg-transparent" 
          : "max-w-2xl bg-white rounded-2xl border border-slate-200/60 shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden"
      }`}>
        <Suspense fallback={<FormSkeleton />}>
          <AdmissionFormClientWrapper
            courses={availableCourses || []}
            user={user}
            courseId={courseId}
            type={type}
            courseName={courseName}
          />
        </Suspense>
      </div>
    </main>
  );
}

function FormSkeleton() {
  return (
    <div className="p-8 animate-pulse space-y-4">
      <div className="h-10 bg-gray-100 rounded w-1/3 mb-6"></div>
      <div className="h-12 bg-gray-100 rounded"></div>
      <div className="h-12 bg-gray-100 rounded"></div>
      <div className="h-12 bg-gray-100 rounded"></div>
    </div>
  );
}