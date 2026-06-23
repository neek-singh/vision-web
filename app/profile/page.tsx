import { createServerSupabaseClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/features/auth/components/ProfileForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile | Vision IT Computer Institute",
  description: "Complete and manage your student profile.",
};

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // ✅ Profile fetch (fetch all columns)
  let { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const isProfileComplete = profile?.is_profile_completed;

  if (!isProfileComplete && user.email) {
    const emailToSearch = user.email.trim().toLowerCase();
    console.log("[Profile Sync] Checking students table for email:", emailToSearch);

    // Check if the student already exists in the institute database (students table)
    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("*")
      .ilike("email", emailToSearch)
      .maybeSingle();

    if (studentError) {
      console.error("[Profile Sync] Supabase error fetching student by email:", studentError);
    }

    if (student) {
      console.log("[Profile Sync] Found matching student record:", student.student_id);

      const serializedAddress = student.address ? JSON.stringify({
        village: student.address,
        post: "",
        district: "",
        state: "Chhattisgarh",
        pin: ""
      }) : null;

      const updatedData = {
        full_name: profile?.full_name || student.name,
        phone: profile?.phone || student.phone,
        father_name: profile?.father_name || student.father_name,
        mother_name: profile?.mother_name || student.mother_name,
        dob: profile?.dob || student.dob,
        gender: profile?.gender || student.gender,
        category: profile?.category || student.category,
        address: profile?.address || serializedAddress,
        qualification: profile?.qualification || student.education,
        photo_url: profile?.photo_url || student.photo_url,
        roll_number: profile?.roll_number || student.student_id,
        is_profile_completed: true,
      };

      if (profile) {
        const { data: newProfile, error: updateError } = await supabase
          .from("profiles")
          .update(updatedData)
          .eq("id", user.id)
          .select()
          .single();
        if (updateError) {
          console.error("[Profile Sync] Failed to update profile:", updateError);
        } else if (newProfile) {
          profile = newProfile;
          console.log("[Profile Sync] Profile successfully updated and completed from student record!");
        }
      } else {
        // If profile row doesn't exist at all, insert it (avoiding 'email' column which doesn't exist)
        const { data: newProfile, error: insertError } = await supabase
          .from("profiles")
          .insert({
            id: user.id,
            ...updatedData
          })
          .select()
          .single();
        if (insertError) {
          console.error("[Profile Sync] Failed to insert profile:", insertError);
        } else if (newProfile) {
          profile = newProfile;
          console.log("[Profile Sync] Profile successfully inserted and completed from student record!");
        }
      }
    } else {
      console.log("[Profile Sync] No matching student found in database.");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 px-4 pt-24 pb-10 md:pt-36 md:pb-16">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            My Profile 👤
          </h1>
          <p className="text-gray-500 text-base font-medium">
            Manage your personal details, residential address, and identity documents
          </p>
        </div>

        <ProfileForm profile={profile as any} userEmail={user.email || ""} />
      </div>
    </main>
  );
}
