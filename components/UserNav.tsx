"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { UserNavClient } from "./UserNavClient";
import type { User, AuthChangeEvent, Session } from "@supabase/supabase-js";

export function UserNav() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let fetching = false;

    const getUser = async () => {
      if (fetching) return;
      fetching = true;

      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (isMounted) {
          if (error) {
            console.error("Error fetching user:", error);
            setUser(null);
          } else {
            setUser(user);
            if (user) {
              const { data: profile } = await supabase
                .from("profiles")
                .select("role, full_name")
                .eq("id", user.id)
                .single();
              if (isMounted) setProfile(profile);
            }
          }
        }
      } catch (err) {
        console.error("Unexpected error in getUser:", err);
      } finally {
        if (isMounted) setLoading(false);
        fetching = false;
      }
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        if (!isMounted) return;

        if (session?.user) {
          setUser(session.user);
          const { data: profile } = await supabase
            .from("profiles")
            .select("role, full_name")
            .eq("id", session.user.id)
            .single();
          if (isMounted) {
            setProfile(profile);
            setLoading(false);
          }
        } else {
          setUser(null);
          setProfile(null);
          setLoading(false);
        }
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="w-10 h-10 rounded-full bg-slate-100 animate-pulse flex items-center justify-center text-xs text-slate-400">
        ...
      </div>
    );
  }

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

  return <UserNavClient user={user} profile={profile} />;
}