"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CourseCard from "@/components/CourseCard";

type UniFilter = "all" | "arts" | "science_ug" | "science_pg" | "eng_tech" | "mgmt_prof" | "law" | "diploma" | "pharmacy";

const artsCourses = [
  {
    title: "Bachelor of Arts (BA)",
    badge: "Undergraduate",
    duration: "3 Years",
    mode: "Regular / Private",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
  {
    title: "Master of Arts (MA)",
    badge: "Postgraduate",
    duration: "2 Years",
    mode: "Regular / Private",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
  {
    title: "Bachelor of Library Science (B.Lib)",
    badge: "Undergraduate",
    duration: "1 Year",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
  {
    title: "Master of Library Science (M.Lib)",
    badge: "Postgraduate",
    duration: "1 Year",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
];

const scienceUgCourses = [
  {
    title: "Bachelor of Science (B.Sc General)",
    badge: "Undergraduate",
    duration: "3 Years",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1532094349884-543559cf2c67?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
  {
    title: "B.Sc Biotechnology",
    badge: "Undergraduate",
    duration: "3 Years",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
  {
    title: "B.Sc Forensic Science",
    badge: "Undergraduate",
    duration: "3 Years",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1582719471384-894fbb16e174?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
  {
    title: "B.Sc Data Science",
    badge: "Undergraduate",
    duration: "3 Years",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
  {
    title: "B.Sc Bioinformatics",
    badge: "Undergraduate",
    duration: "3 Years",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
  {
    title: "B.Sc Cell Culture",
    badge: "Undergraduate",
    duration: "3 Years",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1576086212577-94d0799786a1?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
  {
    title: "B.Sc Forestry",
    badge: "Undergraduate",
    duration: "4 Years",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
  {
    title: "B.Sc Dietetics",
    badge: "Undergraduate",
    duration: "3 Years",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
  {
    title: "B.Sc Nutrition",
    badge: "Undergraduate",
    duration: "3 Years",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
  {
    title: "B.Sc Microbiology",
    badge: "Undergraduate",
    duration: "3 Years",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1578913683538-4108b2c24c43?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
];

const sciencePgCourses = [
  {
    title: "M.Sc Physics",
    badge: "Postgraduate",
    duration: "2 Years",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
  {
    title: "M.Sc Chemistry",
    badge: "Postgraduate",
    duration: "2 Years",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
  {
    title: "M.Sc Mathematics",
    badge: "Postgraduate",
    duration: "2 Years",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
  {
    title: "M.Sc Zoology",
    badge: "Postgraduate",
    duration: "2 Years",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1535268647977-a403b69fc756?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
  {
    title: "M.Sc Botany",
    badge: "Postgraduate",
    duration: "2 Years",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
  {
    title: "M.Sc Microbiology",
    badge: "Postgraduate",
    duration: "2 Years",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
];

const engineeringTechCourses = [
  {
    title: "Bachelor of Computer Applications (BCA)",
    badge: "Undergraduate",
    duration: "3 Years",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
    detailsHref: "/courses/bca",
    applyHref: "/inquiry?type=university",
  },
  {
    title: "Master of Computer Applications (MCA)",
    badge: "Postgraduate",
    duration: "2 Years",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
  {
    title: "B.Tech Computer Science Engineering",
    badge: "Undergraduate",
    duration: "4 Years",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
  {
    title: "B.Tech Information Technology",
    badge: "Undergraduate",
    duration: "4 Years",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
];

const managementProfCourses = [
  {
    title: "Bachelor of Business Administration (BBA)",
    badge: "Undergraduate",
    duration: "3 Years",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
  {
    title: "Master of Business Administration (MBA)",
    badge: "Postgraduate",
    duration: "2 Years",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
  {
    title: "Bachelor of Commerce (B.Com)",
    badge: "Undergraduate",
    duration: "3 Years",
    mode: "Regular / Private",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
  {
    title: "Master of Commerce (M.Com)",
    badge: "Postgraduate",
    duration: "2 Years",
    mode: "Regular / Private",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
  {
    title: "Bachelor of Hotel Management & Catering Technology (BHMCT)",
    badge: "Undergraduate",
    duration: "4 Years",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
  {
    title: "Master of Tourism & Travel Management (MTTM)",
    badge: "Postgraduate",
    duration: "2 Years",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
];

const lawCourses = [
  {
    title: "Bachelor of Laws (LLB)",
    badge: "Undergraduate",
    duration: "3 Years",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
  {
    title: "Master of Laws (LLM)",
    badge: "Postgraduate",
    duration: "2 Years",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1453733190148-c44698c26588?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
  {
    title: "BA LLB (Integrated)",
    badge: "Integrated Degree",
    duration: "5 Years",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
  {
    title: "B.Com LLB (Integrated)",
    badge: "Integrated Degree",
    duration: "5 Years",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
];

const diplomaCoursesList = [
  {
    title: "Post Graduate Diploma in Computer Applications (PGDCA)",
    badge: "PG Diploma",
    duration: "1 Year",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop",
    detailsHref: "/courses/pgdca",
    applyHref: "/inquiry?type=university",
  },
  {
    title: "Diploma in Computer Applications (DCA)",
    badge: "Diploma",
    duration: "1 Year",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=600&auto=format&fit=crop",
    detailsHref: "/courses/dca",
    applyHref: "/inquiry?type=university",
  },
  {
    title: "Diploma in Solar Power System (DSPS)",
    badge: "Diploma",
    duration: "1 Year",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600&auto=format&fit=crop",
    detailsHref: "/courses/dsps",
    applyHref: "/inquiry?type=university",
  },
  {
    title: "Diploma in Fire Service & Operations (DFSO)",
    badge: "Diploma",
    duration: "1 Year",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=600&auto=format&fit=crop",
    detailsHref: "/courses/dfso",
    applyHref: "/inquiry?type=university",
  },
  {
    title: "PG Diploma in Rural Development (PGDRD)",
    badge: "PG Diploma",
    duration: "1 Year",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=600&auto=format&fit=crop",
    detailsHref: "/courses/pgdrd",
    applyHref: "/inquiry?type=university",
  },
];

const pharmacyCourses = [
  {
    title: "Diploma in Pharmacy (D.Pharm)",
    badge: "Diploma",
    duration: "2 Years",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
  {
    title: "Bachelor of Pharmacy (B.Pharm)",
    badge: "Undergraduate",
    duration: "4 Years",
    mode: "Regular",
    price: "Enquire",
    imageSrc: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=600&auto=format&fit=crop",
    applyHref: "/inquiry",
  },
];

const UNI_FILTERS: { id: UniFilter; label: string; count: number; icon: React.ReactNode }[] = [
  {
    id: "all",
    label: "All University",
    count: 41,
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: "arts",
    label: "Arts Department",
    count: 4,
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: "science_ug",
    label: "Science UG",
    count: 10,
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    id: "science_pg",
    label: "Science PG",
    count: 6,
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    id: "eng_tech",
    label: "Engineering & Tech",
    count: 4,
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: "mgmt_prof",
    label: "Management & Professional",
    count: 6,
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "law",
    label: "Law Department",
    count: 4,
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    id: "diploma",
    label: "Diploma",
    count: 5,
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: "pharmacy",
    label: "Pharmacy",
    count: 2,
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
];

export default function UniversityCoursesPage() {
  const [activeFilter, setActiveFilter] = useState<UniFilter>("all");

  const showArts = activeFilter === "all" || activeFilter === "arts";
  const showScienceUg = activeFilter === "all" || activeFilter === "science_ug";
  const showSciencePg = activeFilter === "all" || activeFilter === "science_pg";
  const showEngTech = activeFilter === "all" || activeFilter === "eng_tech";
  const showMgmtProf = activeFilter === "all" || activeFilter === "mgmt_prof";
  const showLaw = activeFilter === "all" || activeFilter === "law";
  const showDiploma = activeFilter === "all" || activeFilter === "diploma";
  const showPharmacy = activeFilter === "all" || activeFilter === "pharmacy";

  return (
    <main className="flex-col w-full bg-slate-50 min-h-screen overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 py-16 lg:py-20 border-b border-violet-100/60">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-12 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-8">
            <Link href="/courses" className="hover:text-violet-600 transition-colors font-medium">Courses</Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-violet-700 font-semibold">University Courses</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left: Text */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-100 border border-violet-200 rounded-full text-xs font-bold text-violet-700 uppercase tracking-wider">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Jagrani Devi University Affiliated
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-[1.15]">
                University Degree<br />
                <span className="text-violet-600">Programs</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-655 leading-relaxed max-w-xl font-normal">
                Pursue nationally recognized university degree programs from <strong>Jagrani Devi University</strong> alongside our computer training. Build a complete academic profile with traditional arts, commerce, and science degrees alongside modern tech qualifications.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/inquiry?type=university"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm rounded-xl transition-all shadow-sm shadow-violet-500/25 hover:-translate-y-0.5"
                >
                  Apply Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/courses/university/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 hover:border-violet-300 hover:bg-violet-50 text-slate-700 font-semibold text-sm rounded-xl transition-all hover:-translate-y-0.5"
                >
                  About University
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 hover:border-violet-300 hover:bg-violet-50 text-slate-700 font-semibold text-sm rounded-xl transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border border-violet-100 shadow-xl bg-white">
              <Image
                src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop"
                alt="University campus and degree programs"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay badge */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-white/60">
                <p className="text-xs text-slate-500 font-medium">Courses Available</p>
                <p className="text-2xl font-black text-slate-900">41</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Sidebar + Courses */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

          {/* ── Mobile: compact pill strip (university filters only) ── */}
          <div className="flex lg:hidden flex-row gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {UNI_FILTERS.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                    isActive
                      ? "bg-violet-600 border-violet-600 text-white shadow-sm shadow-violet-500/20"
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
          </div>

          {/* ── Desktop: sticky sidebar (university filters only) ── */}
          <aside className="hidden lg:block w-56 xl:w-64 shrink-0 sticky top-24">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 bg-violet-50/60">
                <p className="text-[11px] font-semibold text-violet-400 uppercase tracking-widest">
                  University Programs
                </p>
              </div>
              <nav className="p-3 flex flex-col gap-1.5">
                {UNI_FILTERS.map((filter) => {
                  const isActive = activeFilter === filter.id;
                  return (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`flex items-center justify-between gap-2 w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                        isActive
                          ? "bg-violet-600 text-white shadow-md shadow-violet-500/25"
                          : "text-slate-600 hover:bg-violet-50 hover:text-violet-900"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className={isActive ? "text-violet-200" : "text-slate-400 group-hover:text-violet-500"}>
                          {filter.icon}
                        </span>
                        {filter.label}
                      </span>
                      <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${
                        isActive ? "bg-white/20 text-white" : "bg-violet-100 text-violet-600"
                      }`}>
                        {filter.count}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Info card */}
            <div className="mt-4 bg-violet-50 border border-violet-100 rounded-2xl p-4">
              <p className="text-xs font-semibold text-violet-800 mb-1">Need guidance?</p>
              <p className="text-xs text-violet-600 leading-relaxed mb-3">
                Our counsellors will help you choose the right university program.
              </p>
              <Link
                href="/contact"
                className="block text-center text-xs font-semibold px-3 py-2 bg-violet-600 text-white rounded-xl hover:bg-violet-500 transition-colors"
              >
                Talk to a counsellor
              </Link>
            </div>
          </aside>

          {/* ── Right: Course Sections ── */}
          <div className="flex-1 min-w-0 space-y-8">

            {/* Arts Department */}
            {showArts && (
              <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-10 h-10 shrink-0 bg-violet-100 text-violet-600 rounded-2xl flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
                      Arts Department
                    </h2>
                    <p className="text-slate-500 text-xs md:text-sm">
                      Undergraduate and Postgraduate Arts & Library Science programs.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {artsCourses.map((course) => (
                    <CourseCard 
                      key={course.title} 
                      {...course} 
                      applyHref={`/inquiry?type=university&course=${encodeURIComponent(course.title)}`}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Science UG */}
            {showScienceUg && (
              <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-10 h-10 shrink-0 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
                      Science UG
                    </h2>
                    <p className="text-slate-500 text-xs md:text-sm">
                      Specialized B.Sc degrees for careers in science and technology.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {scienceUgCourses.map((course) => (
                    <CourseCard 
                      key={course.title} 
                      {...course} 
                      applyHref={`/inquiry?type=university&course=${encodeURIComponent(course.title)}`}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Science PG */}
            {showSciencePg && (
              <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-10 h-10 shrink-0 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
                      Science PG
                    </h2>
                    <p className="text-slate-500 text-xs md:text-sm">
                      Specialized M.Sc degrees for advanced research and careers in science.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sciencePgCourses.map((course) => (
                    <CourseCard 
                      key={course.title} 
                      {...course} 
                      applyHref={`/inquiry?type=university&course=${encodeURIComponent(course.title)}`}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Engineering & Technology */}
            {showEngTech && (
              <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-10 h-10 shrink-0 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
                      Engineering & Technology
                    </h2>
                    <p className="text-slate-500 text-xs md:text-sm">
                      Industry-oriented tech degrees including BCA, MCA, and B.Tech.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {engineeringTechCourses.map((course) => (
                    <CourseCard 
                      key={course.title} 
                      {...course} 
                      applyHref={`/inquiry?type=university&course=${encodeURIComponent(course.title)}`}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Management & Professional */}
            {showMgmtProf && (
              <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-10 h-10 shrink-0 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
                      Management & Professional
                    </h2>
                    <p className="text-slate-500 text-xs md:text-sm">
                      Career-focused business, hospitality, and tourism management degrees.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {managementProfCourses.map((course) => (
                    <CourseCard 
                      key={course.title} 
                      {...course} 
                      applyHref={`/inquiry?type=university&course=${encodeURIComponent(course.title)}`}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Law Department */}
            {showLaw && (
              <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-10 h-10 shrink-0 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
                      Law Department
                    </h2>
                    <p className="text-slate-500 text-xs md:text-sm">
                      Government recognized LLB, LLM, and integrated law degrees.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {lawCourses.map((course) => (
                    <CourseCard 
                      key={course.title} 
                      {...course} 
                      applyHref={`/inquiry?type=university&course=${encodeURIComponent(course.title)}`}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Diploma */}
            {showDiploma && (
              <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-10 h-10 shrink-0 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
                      Diploma Programs
                    </h2>
                    <p className="text-slate-500 text-xs md:text-sm">
                      Specialized PG Diploma, fire safety, rural development and vocational courses.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {diplomaCoursesList.map((course) => (
                    <CourseCard 
                      key={course.title} 
                      {...course} 
                      applyHref={`/inquiry?type=university&course=${encodeURIComponent(course.title)}`}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Pharmacy */}
            {showPharmacy && (
              <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-10 h-10 shrink-0 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
                      Pharmacy Department
                    </h2>
                    <p className="text-slate-500 text-xs md:text-sm">
                      D.Pharm and B.Pharm courses for pharmaceutical careers.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pharmacyCourses.map((course) => (
                    <CourseCard 
                      key={course.title} 
                      {...course} 
                      applyHref={`/inquiry?type=university&course=${encodeURIComponent(course.title)}`}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Info Guidance Banner */}
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-8 text-white">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <h3 className="text-lg font-bold mb-1">Not sure which program to choose?</h3>
                  <p className="text-violet-200 text-sm">
                    Talk to our counsellors and get personalized guidance on university admissions.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-white text-violet-700 font-bold text-sm rounded-xl hover:bg-violet-50 transition-colors shadow-sm"
                >
                  Get Guidance
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="relative py-12 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="bg-[#ebf2fa] rounded-3xl p-8 sm:p-12 text-center border border-slate-200/40">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-3 tracking-tight">
              Ready to Start Your University Journey?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-8 font-normal leading-relaxed">
              Fill in the inquiry form and our team will reach out with complete admission details, fees, and eligibility criteria.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/inquiry?type=university"
                className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm rounded-xl transition-colors text-center shadow-sm"
              >
                Apply Now
              </Link>
              <Link
                href="/courses"
                className="px-6 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-xl transition-colors text-center"
              >
                Browse All Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
