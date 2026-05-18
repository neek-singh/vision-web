import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Metadata } from "next";
import AdmissionFormClientWrapper from "@/components/AdmissionFormClientWrapper";

export const metadata: Metadata = {
  title: "Online Admission | Vision IT Computer Institute",
  description: "Apply online for DCA, ADCA, PGDCA, and Web Development courses at Vision IT Computer Institute Pratappur.",
  keywords: "computer admission Pratappur, apply online computer course, Vision IT admission",
};
import Link from "next/link";
import { Suspense } from "react";
import { GraduationCap, Sparkles, Clock, ShieldCheck, ArrowLeft } from "lucide-react";

export const revalidate = 0;

// 📝 Type
interface Course {
  id: string;
  title: string;
}

// 🔐 Supabase Server Client
async function getSupabase() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => { }, // handled by middleware
      },
    }
  );
}

export default async function AdmissionsPage({
  searchParams,
}: {
  searchParams: Promise<{ courseId?: string }>;
}) {
  const params = await searchParams;
  const courseId = params.courseId || "";
  const supabase = await getSupabase();

  // ✅ Auth
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 🔥 ✅ FIXED: Fetch courses from DB (NO JSON)
  const { data: availableCourses, error } = await supabase
    .from("courses")
    .select("id, title");

  if (error) {
    console.error("Courses fetch error:", error);
  }

  return (
    <main className="w-full bg-slate-50 min-h-screen pb-32 font-sans">

      {/* 🌌 Hero */}
      <section className="relative bg-[#0a0f1d] text-white pt-32 pb-56 rounded-b-[3rem] sm:rounded-b-[5rem] overflow-hidden">
        {/* 🔙 Back Button */}
        <Link
          href="/"
          className="absolute top-10 left-6 sm:left-10 z-20 flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300">
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          </div>
          <span className="font-bold text-xs uppercase tracking-[0.2em] hidden sm:block">Go Back</span>
        </Link>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/40 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808030_1px,transparent_1px),linear-gradient(to_bottom,#80808030_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="relative max-w-4xl mx-auto text-center px-6">
          <h1 className="text-2xl sm:text-4xl font-semibold mb-6">
            Secure Your Future with Vision IT
          </h1>

          <p className="text-lg text-white max-w-2xl mx-auto mb-10">
            Join Vision IT and start your tech journey today.
          </p>

          <div className="flex justify-center gap-6 text-sm text-white">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-white" />
              Expert Trainers
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-white" />
              Flexible Timing
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-white" />
              Placement Support
            </div>
          </div>
        </div>
      </section>

      {/* 📄 Form Section */}
      <section className="relative max-w-2xl mx-auto px-4 -mt-36">

        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
          <h2 className="text-lg text-slate-900 mb-5 flex items-center gap-2">
            <span>📄</span> Application Form
          </h2>

          <Suspense fallback={<FormSkeleton />}>
            <AdmissionFormClientWrapper
              courses={availableCourses || []}
              user={user}
              courseId={courseId}
            />
          </Suspense>
        </div>

      </section>
    </main>
  );
}

// Skeleton
function FormSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-12 bg-gray-200 rounded"></div>
      <div className="h-12 bg-gray-200 rounded"></div>
      <div className="h-12 bg-gray-200 rounded"></div>
    </div>
  );
}