"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push("/");
        }
      }}
      className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer bg-transparent border-none p-0 focus:outline-none"
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="text-xs font-semibold uppercase tracking-wider">Back to Course</span>
    </button>
  );
}
