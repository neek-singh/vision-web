import { createServerSupabaseClient } from "@/lib/supabase-server";
import { notFound, redirect } from "next/navigation";
import { CheckoutClient } from "@/features/admissions/components/CheckoutClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Checkout | Vision IT Computer Institute",
  description: "Complete your admission payment securely using SMEPay.",
};

export const dynamic = "force-dynamic";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ admissionId: string }>;
}) {
  const { admissionId } = await params;
  const supabase = await createServerSupabaseClient();

  // Get active session user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?redirect=/checkout/${admissionId}`);
  }

  // Fetch admission details along with courses (JOIN query)
  const { data: admission, error } = await supabase
    .from("admissions")
    .select(`
      id,
      student_name,
      email,
      phone,
      status,
      user_id,
      courses(id, title, course_code, fee, discount_fee)
    `)
    .eq("id", admissionId)
    .single();

  if (error || !admission) {
    return notFound();
  }

  // Authorization check: Make sure this admission belongs to the logged-in user
  if (admission.user_id !== user.id) {
    return notFound();
  }

  // Check if admission is approved
  if (admission.status !== "approved") {
    redirect("/dashboard");
  }

  // Check if payment already completed
  const { data: payment } = await supabase
    .from("admission_payments")
    .select("id")
    .eq("admission_id", admissionId)
    .eq("status", "completed")
    .maybeSingle();

  if (payment) {
    redirect("/dashboard");
  }

  // Clean data structure to match expected props (avoiding Supabase array type issues for courses)
  const formattedAdmission = {
    id: admission.id,
    student_name: admission.student_name,
    email: admission.email,
    phone: admission.phone,
    status: admission.status,
    courses: Array.isArray(admission.courses) ? admission.courses[0] : admission.courses,
  };

  if (!formattedAdmission.courses) {
    return notFound();
  }

  return <CheckoutClient admission={formattedAdmission} />;
}
