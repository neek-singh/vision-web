import { createServerSupabaseClient } from "@/lib/supabase-server";
import { notFound, redirect } from "next/navigation";
import { GatewayClient } from "@/features/admissions/components/GatewayClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SMEPay UPI Gateway Simulator",
  description: "Securely pay your Vision IT course fee.",
};

export const dynamic = "force-dynamic";

export default async function GatewayPage({
  params,
}: {
  params: Promise<{ paymentId: string }>;
}) {
  const { paymentId } = await params;
  const supabase = await createServerSupabaseClient();

  // Get active session user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?redirect=/payment/gateway/${paymentId}`);
  }

  // Fetch payment along with admission details (JOIN query)
  const { data: payment, error } = await supabase
    .from("admission_payments")
    .select(`
      id,
      amount,
      status,
      admissions(
        user_id,
        student_name,
        email,
        courses(title, course_code)
      )
    `)
    .eq("id", paymentId)
    .single();

  if (error || !payment) {
    return notFound();
  }

  // Map nested objects cleanly
  const formattedPayment = {
    id: payment.id,
    amount: Number(payment.amount),
    status: payment.status,
    admission: {
      student_name: (payment.admissions as any)?.student_name,
      email: (payment.admissions as any)?.email,
      user_id: (payment.admissions as any)?.user_id,
      courses: {
        title: (payment.admissions as any)?.courses?.title,
        course_code: (payment.admissions as any)?.courses?.course_code,
      },
    },
  };

  // Authorization check: Make sure this payment belongs to the logged-in user
  if (formattedPayment.admission.user_id !== user.id) {
    return notFound();
  }

  // If payment is already completed or failed, redirect directly to status page
  if (formattedPayment.status !== "pending") {
    redirect(`/payment/status?paymentId=${paymentId}`);
  }

  return <GatewayClient payment={formattedPayment} />;
}
