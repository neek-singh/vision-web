"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { User, LogOut, LayoutDashboard, ShieldCheck } from "lucide-react";

type Profile = {
  full_name: string | null;
  role: string;
  avatar_url?: string | null;
};

export function UserNavClient({ user, profile }: { user: any; profile: Profile | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const avatarUrl = profile?.avatar_url;
  const displayName = profile?.full_name || user?.user_metadata?.full_name || "Student";
  const initials = displayName[0]?.toUpperCase() || "S";

  // Show photo if URL exists and no load error
  const showPhoto = !!avatarUrl && !imgError;

  return (
    <div className="relative">
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-sm flex items-center justify-center text-white font-semibold text-sm transition-all duration-300 hover:shadow-md hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 select-none overflow-hidden"
      >
        {showPhoto ? (
          // Use <img> (not Next Image) to support base64 data URLs
          <img
            src={avatarUrl!}
            alt={displayName}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : profile?.full_name ? (
          initials
        ) : (
          <User className="w-5 h-5" />
        )}
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

            {/* User Info with Avatar */}
            <div className="px-3 py-3 mb-1 border-b border-slate-100 flex items-center gap-3">
              {/* Mini avatar in dropdown */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shrink-0 overflow-hidden">
                {showPhoto ? (
                  <img
                    src={avatarUrl!}
                    alt={displayName}
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  initials
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">
                  {displayName}
                </p>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  {user.email}
                </p>
                {profile?.role === "admin" && (
                  <span className="inline-flex items-center px-2 py-0.5 mt-1 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase rounded-full tracking-wider">
                    Admin
                  </span>
                )}
              </div>
            </div>

            {/* Links */}
            <div className="space-y-0.5">
              {profile?.role === "admin" ? (
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 w-full px-3 py-2 text-sm font-medium text-slate-700 rounded-lg transition-colors hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:outline-none"
                >
                  <ShieldCheck className="w-4 h-4 opacity-70" />
                  Admin Panel
                </Link>
              ) : (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-sm font-medium text-slate-700 rounded-lg transition-colors hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:outline-none"
                  >
                    <User className="w-4 h-4 opacity-70" />
                    My Profile
                  </Link>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-sm font-medium text-slate-700 rounded-lg transition-colors hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:outline-none"
                  >
                    <LayoutDashboard className="w-4 h-4 opacity-70" />
                    My Dashboard
                  </Link>
                </>
              )}

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2.5 w-full px-3 py-2 text-sm font-medium text-red-600 rounded-lg transition-colors hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:outline-none"
              >
                <LogOut className="w-4 h-4 opacity-70" />
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
