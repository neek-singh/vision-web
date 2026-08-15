"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";

interface Slide {
  course: string;
  description: string;
  detailsHref: string;
  applyHref: string;
  detailsLabel: string;
  applyLabel: string;
}

const SLIDES: Slide[] = [
  {
    course: "Overview",
    description: "Computer training to transform beginners into highly sought-after tech professionals.",
    detailsHref: "/courses",
    applyHref: "/inquiry",
    detailsLabel: "Explore Courses",
    applyLabel: "Apply Now",
  },
  {
    course: "DCA",
    description: "12-month professional diploma covering MS Office, Web Development, C++ Programming, Tally, and Cyber Security.",
    detailsHref: "/courses/dca",
    applyHref: "/inquiry?courseId=38fdc235-f7b5-4628-9d72-41c9ff2eabd8",
    detailsLabel: "Details",
    applyLabel: "Apply",
  },
  {
    course: "PGDCA",
    description: "12-month advanced postgraduate program covering C++, DBMS, SQL, Web Publishing, and AI automation.",
    detailsHref: "/courses/pgdca",
    applyHref: "/inquiry?courseId=f9004121-1274-4b57-8179-ccc8365864b9",
    detailsLabel: "Details",
    applyLabel: "Apply",
  },
  {
    course: "BCA",
    description: "3-year university degree program. Develop core software engineering skills, database concepts, and coding practices.",
    detailsHref: "/courses/bca",
    applyHref: "/inquiry?type=university&course=Bachelor of Computer Applications (BCA)",
    detailsLabel: "Details",
    applyLabel: "Apply",
  },
  {
    course: "DFSO",
    description: "1-year university diploma. Master fire safety engineering, industrial rescue operations, emergency relief, and hazard control.",
    detailsHref: "/courses/dfso",
    applyHref: "/inquiry?type=university&course=Diploma in Fire Service & Operations (DFSO)",
    detailsLabel: "Details",
    applyLabel: "Apply",
  },
  {
    course: "PGDRD",
    description: "1-year post-graduate program covering rural economy, agricultural policies, social welfare systems, and development execution.",
    detailsHref: "/courses/pgdrd",
    applyHref: "/inquiry?type=university&course=PG Diploma in Rural Development (PGDRD)",
    detailsLabel: "Details",
    applyLabel: "Apply",
  },
  {
    course: "DSPS",
    description: "1-year university diploma covering solar photovoltaic installation, operations, green energy principles, and power grid systems.",
    detailsHref: "/courses/dsps",
    applyHref: "/inquiry?type=university&course=Diploma in Solar Power System (DSPS)",
    detailsLabel: "Details",
    applyLabel: "Apply",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % SLIDES.length);
        setFade(true);
      }, 400);
    }, 6000); // 6 seconds per slide

    return () => clearInterval(interval);
  }, []);

  const handleSelect = (idx: number) => {
    if (idx === index) return;
    setFade(false);
    setTimeout(() => {
      setIndex(idx);
      setFade(true);
    }, 400);
  };

  const current = SLIDES[index];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      {/* Dynamic Headline with Gradient Text */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-8 leading-[1.2] text-center min-h-[3rem] sm:min-h-[3.5rem] md:min-h-[4rem] flex items-center justify-center">
        <span
          className={`inline-block transition-all duration-300 ${
            fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1.5"
          }`}
        >
          {current.course === "Overview" ? (
            <>
              Vision{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">
                IT
              </span>{" "}
              Computer Institute
            </>
          ) : (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 uppercase">
              {current.course}
            </span>
          )}
        </span>
      </h1>


      {/* Course Slide Heading / Description */}
      <div className="min-h-[5.5rem] sm:min-h-[4.5rem] md:min-h-[3.5rem] flex items-center justify-center mb-8 px-4 text-center">
        <p
          className={`text-base md:text-lg text-slate-800 leading-relaxed font-medium transition-all duration-300 ${
            fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
          }`}
        >
          {current.description}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto">
        <Button
          href={current.detailsHref}
          size="lg"
          variant="outline"
          className="w-full sm:w-auto text-base px-6 py-2.5 rounded-full bg-white shadow-sm border-slate-200 text-slate-700 hover:text-blue-700 hover:bg-blue-50/50 hover:border-blue-200 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center font-semibold group"
        >
          {current.detailsLabel}
          {current.course === "Overview" && (
            <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          )}
        </Button>
        <Button
          href={current.applyHref}
          size="lg"
          className="w-full sm:w-auto text-base px-6 py-2.5 shadow-lg shadow-blue-500/25 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30 flex items-center justify-center font-bold text-white bg-blue-600 hover:bg-blue-700"
        >
          {current.applyLabel}
        </Button>
      </div>
    </div>
  );
}
