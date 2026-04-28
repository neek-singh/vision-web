"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Profile = {
  full_name: string | null;
  role: string;
};

export function UserNav() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // 🔐 Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      if (user) {
        fetchProfile(user.id);
      }
    };

    loadUser();

    // 🔄 Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        fetchProfile(currentUser.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // 📦 Fetch profile
  async function fetchProfile(userId: string) {
    const { data, error } = await supabase
      .from("profiles")
      .select("role, full_name")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Profile error:", error);
      return;
    }

    setProfile(data);
  }

  // 🔓 Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  // ❌ Not logged in
  if (!user) {
    return (
      <Link
        href="/signup"
        className="inline-flex items-center justify-center h-9 px-5 rounded-full text-sm font-semibold text-white bg-blue-600 shadow-sm hover:bg-blue-500 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        Get Started
      </Link>
    );
  }

  return (
    <div className="relative">
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-sm flex items-center justify-center text-white font-semibold text-sm transition-all duration-300 hover:shadow-md hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 select-none"
      >
        {profile?.full_name?.[0]?.toUpperCase() ||
          user.email?.[0]?.toUpperCase() ||
          "U"}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/80 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">

            {/* User Info */}
            <div className="px-3 py-2.5 mb-1 border-b border-slate-100">
              <p className="text-sm font-semibold text-slate-900 truncate">
                {profile?.full_name || "User"}
              </p>
              <p className="text-xs text-slate-500 truncate mt-0.5">
                {user.email}
              </p>

              {profile?.role === "admin" && (
                <span className="inline-flex items-center px-2 py-0.5 mt-2 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase rounded-full tracking-wider">
                  Admin
                </span>
              )}
            </div>

            {/* Links */}
            <div className="space-y-0.5">
              {profile?.role === "admin" ? (
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 w-full px-3 py-2 text-sm font-medium text-slate-700 rounded-lg transition-colors hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="3" x2="21" y1="9" y2="9" /><path d="m9 16 3-3 3 3" />
                  </svg>
                  Admin Panel
                </Link>
              ) : (
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 w-full px-3 py-2 text-sm font-medium text-slate-700 rounded-lg transition-colors hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                    <rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" />
                  </svg>
                  My Dashboard
                </Link>
              )}

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2.5 w-full px-3 py-2 text-sm font-medium text-red-600 rounded-lg transition-colors hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}