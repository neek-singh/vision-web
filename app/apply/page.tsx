import { createServerSupabaseClient } from "@/lib/supabase-server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import ApplyFormClient from "./ApplyFormClient";

export const metadata: Metadata = {
  title: "Apply for Admission | Vision IT Computer Institute",
  description: "Apply for admission at Vision IT Computer Institute, Pratappur.",
};

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ courseId?: string }>;
}

export default async function ApplyPage({ searchParams }: Props) {
  const { courseId } = await searchParams;

  const supabase = await createServerSupabaseClient();

  // Auth
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?redirect=/apply${courseId ? `?courseId=${courseId}` : ""}`);
  }

  // Profile (only if logged in)
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || !profile.is_profile_completed) {
    redirect(`/admissions/apply${courseId ? `?courseId=${courseId}` : ""}`);
  }

  // Course details
  let course: Record<string, any> | null = null;
  if (courseId) {
    const { data } = await supabase
      .from("courses")
      .select("id, title, fee, discount_fee, course_code")
      .eq("id", courseId)
      .maybeSingle();
    course = data;
  }

  return (
    <ApplyFormClient
      profile={profile}
      userEmail={user?.email ?? ""}
      course={course}
      rollNumber={profile?.roll_number ?? ""}
    />
  );
}
