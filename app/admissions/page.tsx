import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import AdmissionForm from "./AdmissionForm";
import Link from "next/link";
import { Suspense } from "react";
import { GraduationCap, Sparkles, Clock, ShieldCheck } from "lucide-react";

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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/15 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="relative max-w-4xl mx-auto text-center px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            Admissions Open 2026
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold mb-6">
            Secure Your Future
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
            Join Vision IT and start your tech journey today.
          </p>

          <div className="flex justify-center gap-6 text-sm text-slate-300">
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
      <section className="relative max-w-5xl mx-auto px-4 -mt-36">

        {!user ? (
          <div className="bg-white rounded-[2rem] p-12 shadow-xl border border-slate-100 text-center max-w-2xl mx-auto animate-in fade-in duration-500">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 text-blue-600 rounded-full mb-6 text-4xl shadow-inner">
              🔐
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">Login Required</h2>
            <p className="text-slate-600 text-lg mb-8 max-w-md mx-auto">
              Please sign in to your account to apply for our courses. It takes less than a minute!
            </p>
            <Link 
              href={`/login?redirect=${encodeURIComponent(`/admissions${courseId ? `?courseId=${courseId}` : ''}`)}`} 
              className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-10 py-4 rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300 text-lg"
            >
              Login to Apply
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100">
            <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-2">
              <span>📄</span> Application Form
            </h2>

            <Suspense fallback={<FormSkeleton />}>
              <AdmissionForm
                courses={availableCourses || []}
                user={user}
                courseId={courseId}
              />
            </Suspense>
          </div>
        )}

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