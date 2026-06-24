import { createServerSupabaseClient } from "@/lib/supabase-server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { StatusClient } from "./StatusClient";

export const metadata: Metadata = {
  title: "Payment Status | Vision IT Computer Institute",
  description: "Check the status of your course fee payment.",
};

export const dynamic = "force-dynamic";

export default async function PaymentStatusPage({
  searchParams,
}: {
  searchParams: Promise<{ paymentId?: string; print?: string }>;
}) {
  const { paymentId, print } = await searchParams;

  if (!paymentId) {
    redirect("/dashboard");
  }

  const supabase = await createServerSupabaseClient();

  // Get active session user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch profile to get roll_number (Registration No.) and photo_url (Profile Photo)
  const { data: profile } = await supabase
    .from("profiles")
    .select("roll_number, photo_url")
    .eq("id", user.id)
    .single();

  // Fetch payment details along with all admission fields (JOIN query)
  const { data: payment, error } = await supabase
    .from("admission_payments")
    .select(`
      id,
      amount,
      status,
      transaction_id,
      created_at,
      admissions(
        id,
        user_id,
        student_name,
        email,
        phone,
        father_name,
        mother_name,
        dob,
        gender,
        category,
        address,
        qualification,
        admission_no,
        photo_url,
        created_at,
        courses(title, course_code)
      )
    `)
    .eq("id", paymentId)
    .single();

  if (error || !payment) {
    return notFound();
  }

  const formattedPayment = {
    id: payment.id,
    amount: Number(payment.amount),
    status: payment.status,
    transaction_id: payment.transaction_id,
    created_at: payment.created_at,
    admission: {
      id: (payment.admissions as any)?.id,
      user_id: (payment.admissions as any)?.user_id,
      student_name: (payment.admissions as any)?.student_name,
      email: (payment.admissions as any)?.email,
      phone: (payment.admissions as any)?.phone,
      father_name: (payment.admissions as any)?.father_name,
      mother_name: (payment.admissions as any)?.mother_name,
      dob: (payment.admissions as any)?.dob,
      gender: (payment.admissions as any)?.gender,
      category: (payment.admissions as any)?.category,
      address: (payment.admissions as any)?.address,
      qualification: (payment.admissions as any)?.qualification,
      admission_no: (payment.admissions as any)?.admission_no,
      photo_url: profile?.photo_url || (payment.admissions as any)?.photo_url || null,
      student_id: profile?.roll_number || null,
      created_at: (payment.admissions as any)?.created_at,
      courses: {
        title: (payment.admissions as any)?.courses?.title,
        course_code: (payment.admissions as any)?.courses?.course_code,
      },
    },
  };

  // Authorization check
  if (formattedPayment.admission.user_id !== user.id) {
    return notFound();
  }

  return <StatusClient payment={formattedPayment as any} print={print} />;
}
