import { createServerSupabaseClient } from "@/lib/supabase-server";
import { notFound, redirect } from "next/navigation";
import { AdmissionPipelineClient } from "@/features/admissions/components/AdmissionPipelineClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admission Process | Vision IT Computer Institute",
  description: "Complete your admission pipeline steps.",
};

export const dynamic = "force-dynamic";

export default async function AdmissionPipelinePage({
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
    redirect(`/login?redirect=/admissions/pipeline/${admissionId}`);
  }

  // Fetch admission details along with courses (JOIN query)
  const { data: admission, error } = await supabase
    .from("admissions")
    .select(`
      *,
      courses(id, title, course_code, fee, discount_fee),
      students(student_id)
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

  // Check if admission is approved by admin
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

  const formattedAdmission = {
    id: admission.id,
    student_name: admission.student_name,
    email: admission.email,
    phone: admission.phone,
    status: admission.status,
    father_name: admission.father_name,
    mother_name: admission.mother_name,
    dob: admission.dob,
    gender: admission.gender,
    category: admission.category,
    address: admission.address,
    qualification: admission.qualification,
    photo_url: admission.photo_url,
    signature_url: admission.signature_url,
    identity_proof_url: admission.identity_proof_url,
    flow_step: admission.flow_step,
    document_verified: admission.document_verified,
    completed_payment: !!payment,
    courses: Array.isArray(admission.courses) ? admission.courses[0] : admission.courses,
    students: Array.isArray(admission.students) ? admission.students : [admission.students],
  };

  if (!formattedAdmission.courses) {
    return notFound();
  }

  return <AdmissionPipelineClient admission={formattedAdmission as any} />;
}
