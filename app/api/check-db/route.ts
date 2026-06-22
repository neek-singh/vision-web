import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    
    // Fetch a single record to inspect keys
    const { data: record, error: recordError } = await supabase
      .from("admissions")
      .select("*")
      .limit(1)
      .maybeSingle();

    // Also run a test query to see if mother_name or category/cast columns exist
    const { error: testError } = await supabase
      .from("admissions")
      .select("mother_name, category")
      .limit(1);

    const { error: castTestError } = await supabase
      .from("admissions")
      .select("cast")
      .limit(1);

    return NextResponse.json({
      recordColumns: record ? Object.keys(record) : null,
      hasRecord: !!record,
      testMotherNameAndCategoryError: testError ? testError.message : "Success (Columns exist)",
      testCastError: castTestError ? castTestError.message : "Success (Column exists)",
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message });
  }
}
