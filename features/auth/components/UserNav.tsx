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

    const fetchUserAndProfile = async (sessionUser?: User | null) => {
      try {
        let currentUser: User | null = null;
        
        // If no user provided from session, fetch it
        if (sessionUser === undefined) {
          const { data: { user } } = await supabase.auth.getUser();
          currentUser = user;
        } else {
          currentUser = sessionUser;
        }

        if (isMounted) setUser(currentUser);

        if (currentUser) {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("role, full_name, avatar_url, photo_url")
            .eq("id", currentUser.id)
            .single();
          
          console.log("UserNav fetched profileData:", profileData);
          
          if (isMounted) {
            setProfile({
              role: profileData?.role || 'student',
              full_name: profileData?.full_name || currentUser.user_metadata?.full_name || currentUser.user_metadata?.name || "Student",
              avatar_url: profileData?.photo_url || profileData?.avatar_url || currentUser.user_metadata?.avatar_url || null
            });
          }
        } else {
          if (isMounted) setProfile(null);
        }
      } catch (err) {
        console.error("UserNav fetch error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    // onAuthStateChange handles initial session and updates
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        if (isMounted) {
          if (event === 'SIGNED_IN' || event === 'USER_UPDATED' || event === 'INITIAL_SESSION') {
            fetchUserAndProfile(session?.user ?? null);
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
            setProfile(null);
            setLoading(false);
          }
        }
      }
    );

    // Listen to custom local profile-updated event
    const handleProfileUpdate = () => {
      console.log("UserNav received profile-updated event, fetching new details...");
      fetchUserAndProfile();
    };
    window.addEventListener("profile-updated", handleProfileUpdate);

    return () => {
      isMounted = false;
      subscription.unsubscribe();
      window.removeEventListener("profile-updated", handleProfileUpdate);
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
        className="hidden md:inline-flex items-center justify-center h-10 px-6 rounded-full text-sm font-semibold text-white bg-blue-600 shadow-sm hover:bg-blue-500 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 whitespace-nowrap"
      >
        Get Started
      </Link>
    );
  }

  return <UserNavClient user={user} profile={profile} />;
}
