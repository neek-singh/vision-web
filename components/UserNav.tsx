import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { UserNavClient } from "./UserNavClient";

type Profile = {
  full_name: string | null;
  role: string;
};

export async function UserNav() {
  const supabase = await createServerSupabaseClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Link
        href="/signup"
        className="inline-flex items-center justify-center h-10 px-6 rounded-full text-sm font-semibold text-white bg-blue-600 shadow-sm hover:bg-blue-500 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 whitespace-nowrap"
      >
        Get Started
      </Link>
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single();

  return <UserNavClient user={user} profile={profile} />;
}