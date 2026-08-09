"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import CourseCard from "@/components/CourseCard";

type FilterType = "all" | "certificate" | "diploma" | "office" | "webdev" | "programming" | "ai" | "cloud" | "security";

const certificateCourses = [
  {
    title: "Basic Computer Course",
    badge: "Beginner",
    duration: "3 Months",
    mode: "Offline",
    price: "₹2,999",
    imageSrc: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
    detailsHref: "/courses/bcc",
    applyHref: "/inquiry?courseId=197f7c89-e410-4768-8b49-567b4b4e3e9e",
  },
  {
    title: "Basic Computer for Beginner",
    badge: "Beginner",
    duration: "3 Months",
    mode: "Offline",
    price: "₹2,999",
    imageSrc: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
    detailsHref: "/courses/basic-beginner",
    applyHref: "/inquiry?courseId=a100f278-ea6c-4189-b09b-7d4e7cd9d0e7",
  },
];

const diplomaCourses = [
  {
    title: "Diploma in Computer Applications",
    badge: "Beginner",
    duration: "12 Months",
    mode: "Offline",
    price: "₹13,999",
    imageSrc: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop",
    detailsHref: "/courses/dca",
    applyHref: "/inquiry?courseId=38fdc235-f7b5-4628-9d72-41c9ff2eabd8",
  },
  {
    title: "Advanced Diploma in Computer Applications",
    badge: "Intermediate",
    duration: "12 Months",
    mode: "Offline",
    price: "₹14,999",
    imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
    detailsHref: "/courses/adca",
    applyHref: "/inquiry?courseId=5f89be9d-d8de-48a3-a7be-7108991cc033",
  },
  {
    title: "Post Graduate Diploma in Computer Applications",
    badge: "Advanced",
    duration: "12 Months",
    mode: "Offline",
    price: "₹16,999",
    imageSrc: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
    detailsHref: "/courses/pgdca",
    applyHref: "/inquiry?courseId=f9004121-1274-4b57-8179-ccc8365864b9",
  },
];

type SkillCourse = {
  title: string;
  badge: string;
  mode: string;
  imageSrc: string;
  applyHref: string;
};

type SkillCategory = {
  id: string;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: ReactNode;
  courses: SkillCourse[];
};

const skillCategories: SkillCategory[] = [
  {
    id: "office",
    label: "Office & Productivity",
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    courses: [
      { title: "MS Office", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "Microsoft 365", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "Google Workspace", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "Excel", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "Data Entry", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
    ],
  },
  {
    id: "webdev",
    label: "Web Development",
    color: "text-violet-700",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-100",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    courses: [
      { title: "HTML", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "CSS", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "HTML & CSS", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "Tailwind CSS", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "JavaScript", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "ReactJS", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "Next.js", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "Node.js", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "Web Development", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "Web Analytics", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "Game Development", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
    ],
  },
  {
    id: "programming",
    label: "Programming & DSA",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-100",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    courses: [
      { title: "C Programming", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "C++", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "Java", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "Python", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "Kotlin", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "Dart", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "Programming (C++, Python, Java)", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "DSA (Data Structures & Algorithms)", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "SQL", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "MySQL", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
    ],
  },
  {
    id: "ai",
    label: "AI & Data Science",
    color: "text-orange-700",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-100",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    courses: [
      { title: "Artificial Intelligence (AI)", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "Generative AI", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "AI Tools (ChatGPT, Gemini, Claude)", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "AI Agents", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "Prompt Engineering", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "Machine Learning (ML)", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "Data Science", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "Data Analytics", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "Data Visualization", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    color: "text-sky-700",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-100",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    courses: [
      { title: "Cloud Computing", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "AWS (Amazon Web Services)", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "DevOps", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
    ],
  },
  {
    id: "security",
    label: "Cyber Security",
    color: "text-rose-700",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-100",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    courses: [
      { title: "Cyber Security", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
      { title: "Ethical Hacking", badge: "Skill", mode: "Offline", imageSrc: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400&auto=format&fit=crop", applyHref: "/inquiry" },
    ],
  },
];

const FILTERS: { id: FilterType; label: string; count: number; icon: ReactNode }[] = [
  {
    id: "all",
    label: "All Courses",
    count: 45,
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
  },
  {
    id: "certificate",
    label: "Certificate",
    count: 2,
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    id: "diploma",
    label: "Diploma",
    count: 3,
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    id: "office",
    label: "Office & Productivity",
    count: 5,
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: "webdev",
    label: "Web Development",
    count: 11,
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: "programming",
    label: "Programming & DSA",
    count: 10,
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "ai",
    label: "AI & Data Science",
    count: 9,
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    count: 3,
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    id: "security",
    label: "Cyber Security",
    count: 2,
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

// University filter is a navigation link (separate page)
const UNIVERSITY_LINK = {
  href: "/courses/university",
  label: "University",
  count: 41,
  icon: (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
};

export default function CoursesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const showCertificate = activeFilter === "all" || activeFilter === "certificate";
  const showDiploma = activeFilter === "all" || activeFilter === "diploma";
  const showSkills = activeFilter === "all" || ["office", "webdev", "programming", "ai", "cloud", "security"].includes(activeFilter);

  return (
    <main className="flex-col w-full bg-slate-50 min-h-screen overflow-x-hidden">

      {/* Hero Section (Split Two-Column Design) */}
      <section className="relative overflow-hidden bg-[#ebf2fa] py-16 lg:py-20 border-b border-slate-200/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Text & Content */}
            <div className="space-y-6 text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-[1.15] animate-in fade-in slide-in-from-bottom-6 duration-700">
                Explore Our Institute Courses
              </h1>
              <p className="text-sm sm:text-base text-slate-650 leading-relaxed max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 font-normal">
                Empowering students with cutting-edge tech skills. Discover comprehensive courses designed for modern careers, blending theoretical knowledge with practical, hands-on experience in our state-of-the-art facilities.
              </p>
            </div>

            {/* Right Column: Visual Image Asset */}
            <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border border-slate-200/50 shadow-lg bg-white animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              <Image
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop"
                alt="Students in a computer lab classroom"
                fill
                className="object-cover"
                priority
              />
            </div>

          </div>
        </div>
      </section>

      {/* Main Content: Sidebar + Courses */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

          {/* ── Mobile: compact pill strip ── */}
          <div className="flex lg:hidden flex-row gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 border-blue-600 text-white shadow-sm shadow-blue-500/20"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {filter.label}
                  <span className={`text-[10px] font-bold px-1 py-0.5 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                  }`}>
                    {filter.count}
                  </span>
                </button>
              );
            })}
            {/* University — separate page link */}
            <Link
              href={UNIVERSITY_LINK.href}
              className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border bg-white border-slate-200 text-slate-600 hover:bg-violet-50 hover:border-violet-300 hover:text-violet-700 transition-all duration-200"
            >
              {UNIVERSITY_LINK.label}
              <span className="text-[10px] font-bold px-1 py-0.5 rounded-full bg-slate-100 text-slate-500">
                {UNIVERSITY_LINK.count}
              </span>
            </Link>
          </div>

          {/* ── Desktop: full sticky sidebar ── */}
          <aside className="hidden lg:block w-56 xl:w-64 shrink-0 sticky top-24">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              {/* Sidebar Header */}
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/60">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                  Filter By
                </p>
              </div>

              {/* Filter Buttons */}
              <nav className="p-3 flex flex-col gap-2">
                {FILTERS.map((filter) => {
                  const isActive = activeFilter === filter.id;
                  return (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`flex items-center justify-between gap-2 w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                        isActive
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className={isActive ? "text-blue-200" : "text-slate-400 group-hover:text-slate-600"}>
                          {filter.icon}
                        </span>
                        {filter.label}
                      </span>
                      <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${
                        isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                      }`}>
                        {filter.count}
                      </span>
                    </button>
                  );
                })}

                {/* Divider */}
                <div className="my-1 border-t border-slate-100" />

                {/* University — navigates to a separate page */}
                <Link
                  href={UNIVERSITY_LINK.href}
                  className="flex items-center justify-between gap-2 w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-violet-700 hover:bg-violet-50 transition-all duration-200 group"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-violet-400 group-hover:text-violet-600">
                      {UNIVERSITY_LINK.icon}
                    </span>
                    {UNIVERSITY_LINK.label}
                  </span>
                  <span className="text-[11px] font-bold px-1.5 py-0.5 rounded-full bg-violet-100 text-violet-600">
                    {UNIVERSITY_LINK.count}
                  </span>
                </Link>
              </nav>
            </div>
          </aside>

          {/* ── Right: Course Sections ── */}
          <div className="flex-1 min-w-0 space-y-8">

            {/* Certificate Courses */}
            {showCertificate && (
              <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="mb-8">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                    Certificate Courses
                  </h2>
                  <p className="text-slate-500 text-xs md:text-sm">
                    Short-term specialized certifications to boost your technical skills and industry readiness.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
                  {certificateCourses.map((course) => (
                    <CourseCard key={course.title} {...course} />
                  ))}
                </div>
              </section>
            )}

            {/* Diploma Courses */}
            {showDiploma && (
              <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="mb-8">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                    Diploma Courses
                  </h2>
                  <p className="text-slate-500 text-xs md:text-sm">
                    Long-term government-recognized professional diplomas covering comprehensive IT applications.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {diplomaCourses.map((course) => (
                    <CourseCard key={course.title} {...course} />
                  ))}
                </div>
              </section>
            )}

            {/* Skill Courses — Categorized */}
            {showSkills && (
              <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="mb-8">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                    Skill &amp; Short Term Courses
                  </h2>
                  <p className="text-slate-500 text-xs md:text-sm">
                    Modular hands-on programs across 6 domains — pick a category and start learning today.
                  </p>
                </div>

                <div className="space-y-10">
                  {skillCategories
                    .filter((cat) => activeFilter === "all" || activeFilter === cat.id)
                    .map((category) => (
                      <div key={category.id}>
                      {/* Category Header */}
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl ${category.bgColor} ${category.borderColor} border mb-4`}>
                        <span className={category.color}>{category.icon}</span>
                        <span className={`text-sm font-bold ${category.color}`}>{category.label}</span>
                        <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${category.bgColor} ${category.color} border ${category.borderColor}`}>
                          {category.courses.length}
                        </span>
                      </div>

                      {/* Courses Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {category.courses.map((course) => (
                          <CourseCard key={`${category.id}-${course.title}`} {...course} />
                        ))}
                      </div>

                      {/* Divider between categories */}
                      <div className="border-b border-slate-100 mt-8" />
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>
        </div>
      </div>

      {/* Why Learn With Us Section (Dark Theme) */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden z-10 border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3 tracking-tight">
            Why Learn With Us
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mb-12 font-normal leading-relaxed">
            Experience an academic environment designed for practical success and career growth.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Card 1: Expert Faculty */}
            <div className="bg-slate-800/40 border border-slate-700/40 p-6 rounded-2xl flex flex-col items-center text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
              </div>
              <h3 className="text-lg font-serif font-bold text-white">Expert Faculty</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">
                Learn from industry professionals with years of hands-on experience and academic excellence.
              </p>
            </div>

            {/* Card 2: Modern Labs */}
            <div className="bg-slate-800/40 border border-slate-700/40 p-6 rounded-2xl flex flex-col items-center text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <h3 className="text-lg font-serif font-bold text-white">Modern Labs</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">
                Practice in state-of-the-art computer labs equipped with the latest software and hardware.
              </p>
            </div>

            {/* Card 3: Job Assistance */}
            <div className="bg-slate-800/40 border border-slate-700/40 p-6 rounded-2xl flex flex-col items-center text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <h3 className="text-lg font-serif font-bold text-white">Job Assistance</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">
                Dedicated placement support to help you launch your career immediately after graduation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Start Your Journey Section (Light Blue Box) */}
      <section className="relative py-12 bg-white overflow-hidden z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="bg-[#ebf2fa] rounded-3xl p-8 sm:p-12 text-center border border-slate-200/40 relative overflow-hidden">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-3 tracking-tight">
              Ready to Start Your Journey?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-8 font-normal leading-relaxed">
              Join hundreds of successful alumni. Enroll today and take the first step towards a rewarding career in technology.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/courses"
                className="px-6 py-3 bg-black hover:bg-slate-900 text-white font-bold text-sm rounded-xl transition-colors text-center"
              >
                Browse All Courses
              </Link>
              <Link
                href="/inquiry"
                className="px-6 py-3 bg-white border border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-xl transition-colors text-center"
              >
                Contact Admissions
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}