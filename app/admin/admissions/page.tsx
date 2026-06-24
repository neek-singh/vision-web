import { createServerSupabaseClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { AdminAdmissionsClient } from "@/features/admin/components/AdminAdmissionsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Admissions Panel | Vision IT Computer Institute",
  description: "Review and approve/reject course admissions.",
};

export const dynamic = "force-dynamic";

export default async function AdminAdmissionsPage() {
  const supabase = await createServerSupabaseClient();

  // Get active session user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/admin/admissions");
  }

  // Fetch user profile role to verify they are an admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/unauthorized");
  }

  // Fetch all admissions requests joined with courses (JOIN query)
  const { data: admissions, error } = await supabase
    .from("admissions")
    .select(`
      id,
      student_name,
      email,
      phone,
      status,
      created_at,
      father_name,
      dob,
      gender,
      address,
      qualification,
      photo_url,
      signature_url,
      identity_proof_url,
      flow_step,
      document_verified,
      message,
      courses(title, course_code)
    `)
    .order("created_at", { ascending: false });

  if (error || !admissions) {
    console.error("Failed to fetch admissions for admin:", error);
    return (
      <main className="min-h-screen pt-28 px-6 text-center text-slate-700">
        Failed to load admissions. Please contact support.
      </main>
    );
  }

  // Clean data structure to avoid array wrapper format of Supabase for joined fields
  const formattedAdmissions = admissions.map((item: any) => ({
    id: item.id,
    student_name: item.student_name,
    email: item.email,
    phone: item.phone,
    status: item.status,
    created_at: item.created_at,
    father_name: item.father_name,
    dob: item.dob,
    gender: item.gender,
    address: item.address,
    qualification: item.qualification,
    photo_url: item.photo_url,
    signature_url: item.signature_url,
    identity_proof_url: item.identity_proof_url,
    flow_step: item.flow_step,
    document_verified: item.document_verified,
    message: item.message,
    courses: Array.isArray(item.courses) ? item.courses[0] : item.courses,
  }));

  return <AdminAdmissionsClient initialAdmissions={formattedAdmissions as any} />;
}
