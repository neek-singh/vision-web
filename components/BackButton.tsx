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
      className="inline-flex items-center gap-2 text-slate-800 hover:text-blue-600 transition-colors cursor-pointer bg-transparent border-none p-0 focus:outline-none"
    >
      <ArrowLeft className="w-4 h-4 text-slate-700" />
      <span className="text-xs font-normal uppercase tracking-wider">Back to Course</span>
    </button>
  );
}
