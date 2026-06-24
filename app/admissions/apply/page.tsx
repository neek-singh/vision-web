import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { GraduationCap, Clock, ShieldCheck, ArrowLeft, FileText } from "lucide-react";
import ApplyForm from "@/features/admissions/components/ApplyForm";

export const metadata: Metadata = {
  title: "Apply for Admission | Vision IT Computer Institute",
  description: "Submit your formal admission application for DCA, ADCA, PGDCA, and Web Development courses at Vision IT Computer Institute Pratappur.",
  keywords: "admission apply Pratappur, computer course admission, Vision IT apply",
};

export const revalidate = 0;

interface Course {
  id: string;
  title: string;
}

async function getSupabase() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  );
}

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ courseId?: string }>;
}) {
  const params = await searchParams;
  const courseId = params.courseId || "";
  const supabase = await getSupabase();

  // 🔐 Auth required — redirect to login if not signed in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?redirect=/admissions/apply${courseId ? `?courseId=${courseId}` : ""}`);
  }

  // Fetch courses
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
        {/* Back Button */}
        <Link
          href="/courses"
          className="absolute top-10 left-6 sm:left-10 z-20 flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300">
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          </div>
          <span className="font-bold text-xs uppercase tracking-[0.2em] hidden sm:block">Back to Courses</span>
        </Link>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/30 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808030_1px,transparent_1px),linear-gradient(to_bottom,#80808030_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="relative max-w-4xl mx-auto text-center px-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-300 mb-6">
            <FileText className="w-3.5 h-3.5" />
            Formal Admission Application
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold mb-6">
            Apply for Admission at Vision IT
          </h1>

          <p className="text-base text-slate-300 max-w-2xl mx-auto mb-10">
            Fill in your details below to formally apply. Our admissions team will review your application and get back to you within 24–48 hours.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-white">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-400" />
              Expert Trainers
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              Flexible Timing
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              Placement Support
            </div>
          </div>
        </div>
      </section>

      {/* 📄 Form Section */}
      <section className="relative max-w-2xl mx-auto px-4 -mt-36">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>📝</span> Admission Application Form
            </h2>
            <p className="text-xs text-slate-500 mt-1">Fields marked with * are required</p>
          </div>

          <Suspense fallback={<FormSkeleton />}>
            <ApplyForm
              courses={availableCourses || []}
              user={user}
              courseId={courseId}
            />
          </Suspense>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <p className="text-sm font-semibold text-blue-900 mb-2">📋 What happens next?</p>
          <ol className="text-xs text-blue-700 space-y-1.5 list-decimal list-inside font-medium">
            <li>Our team reviews your application (24–48 hours)</li>
            <li>You'll be contacted for document verification</li>
            <li>Fee payment & enrollment confirmation</li>
            <li>Batch allotment & course commencement</li>
          </ol>
        </div>

        {/* Inquiry Link */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Have a question first?{" "}
          <Link href={`/admissions${courseId ? `?courseId=${courseId}` : ""}`} className="text-blue-600 font-semibold hover:underline">
            Send an Inquiry instead
          </Link>
        </p>
      </section>
    </main>
  );
}

function FormSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-10 bg-gray-200 rounded-xl"></div>
      <div className="h-10 bg-gray-200 rounded-xl"></div>
      <div className="h-10 bg-gray-200 rounded-xl"></div>
      <div className="h-10 bg-gray-200 rounded-xl"></div>
    </div>
  );
}
