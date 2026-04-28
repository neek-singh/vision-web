"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function NotFound() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Trigger mount animations
    setIsMounted(true);
    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Exact coordinates for the spotlight
          setMousePos({ x: e.clientX, y: e.clientY });

          // Normalized coordinates for the parallax effect
          setParallax({
            x: (e.clientX / window.innerWidth) * 30 - 15,
            y: (e.clientY / window.innerHeight) * 30 - 15,
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    // Disable on touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950 px-6 overflow-hidden selection:bg-blue-500/30">

      {/* Interactive Mouse Spotlight */}
      {isMounted && (
        <div
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37, 99, 235, 0.05), transparent 40%)`,
          }}
        />
      )}

      {/* Soft Gradient Background Blobs */}
      <div
        className="absolute w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${parallax.x * -2}px, ${parallax.y * -2}px)`,
          top: "15%",
          left: "20%",
        }}
      />

      <div
        className="absolute w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[90px] transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${parallax.x * 2}px, ${parallax.y * 2}px)`,
          bottom: "10%",
          right: "15%",
        }}
      />

      {/* Animated Grid Overlay with Fade Mask */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:40px_40px] opacity-20 [mask-image:linear-gradient(to_bottom,white,transparent_85%)]" />

      <div className="relative z-30 text-center max-w-xl mx-auto flex flex-col items-center">

        {/* 404 Title */}
        <div
          className="transition-transform duration-500 ease-out"
          style={{
            transform: `translate(${parallax.x}px, ${parallax.y}px)`,
          }}
        >
          <h1 className="text-[8rem] md:text-[13rem] font-extrabold tracking-tighter bg-gradient-to-br from-white via-slate-200 to-slate-800 bg-clip-text text-transparent drop-shadow-2xl select-none">
            404
          </h1>
        </div>

        {/* Message */}
        <div className={`mt-2 space-y-4 transition-all duration-1000 transform ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Page not found
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed max-w-md mx-auto">
            The page you're looking for doesn't exist, has been moved, or is currently lost in deep space.
          </p>
        </div>

        {/* Actions */}
        <div className={`mt-10 flex flex-col sm:flex-row gap-5 justify-center w-full max-w-sm sm:max-w-none transition-all duration-1000 delay-150 transform ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>

          <Link
            href="/"
            className="group relative px-8 py-3.5 bg-blue-600 text-white font-medium rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Home
            </span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          <Link
            href="/courses"
            className="group px-8 py-3.5 bg-white/5 text-slate-300 border border-slate-700/50 hover:bg-white/10 hover:text-white hover:border-slate-500 rounded-full transition-all duration-300 backdrop-blur-md hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <span className="flex items-center justify-center gap-2">
              View Courses
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </Link>

        </div>

        {/* Footer */}
        <div className={`mt-20 flex items-center gap-4 transition-all duration-1000 delay-300 transform ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
          <div className="h-px w-12 bg-slate-800" />
          <p className="text-xs text-slate-500 font-mono tracking-widest uppercase flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            System Error 404
          </p>
          <div className="h-px w-12 bg-slate-800" />
        </div>

      </div>
    </main>
  );
}