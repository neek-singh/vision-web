"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function initiatePayment(admissionId: string, amount: number) {
  try {
    const supabase = await createServerSupabaseClient();

    // Check if there is an active session
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: "Unauthorized access" };
    }

    // Check if payment already completed
    const { data: existingPayment } = await supabase
      .from("admission_payments")
      .select("id")
      .eq("admission_id", admissionId)
      .eq("status", "completed")
      .maybeSingle();

    if (existingPayment) {
      return { error: "Payment already completed for this admission" };
    }

    // Insert pending payment
    const { data: payment, error } = await supabase
      .from("admission_payments")
      .insert({
        admission_id: admissionId,
        amount,
        status: "pending",
        payment_method: "SMEPay",
      })
      .select()
      .single();

    if (error) {
      console.error("Initiating payment failed:", error);
      return { error: error.message };
    }

    return { success: true, redirectUrl: `/payment/gateway/${payment.id}` };
  } catch (e: any) {
    console.error("Payment initiation error:", e);
    return { error: e.message || "Failed to initiate payment" };
  }
}

export async function processPaymentSimulation(paymentId: string, success: boolean) {
  try {
    const supabase = await createServerSupabaseClient();

    const status = success ? "completed" : "failed";
    const transactionId = success ? `TXN-${Math.random().toString(36).substring(2, 11).toUpperCase()}` : null;

    const { data: payment, error } = await supabase
      .from("admission_payments")
      .update({
        status,
        transaction_id: transactionId,
      })
      .eq("id", paymentId)
      .select()
      .single();

    if (error) {
      console.error("Updating payment failed:", error);
      return { error: error.message };
    }

    revalidatePath("/dashboard");
    return { success: true, payment };
  } catch (e: any) {
    console.error("Payment simulation error:", e);
    return { error: e.message || "Failed to complete payment simulation" };
  }
}
