import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import CourseCard from "@/components/CourseCard";
import OfferSlider from "@/components/OfferSlider";
import HeroSlider from "@/components/HeroSlider";
import fs from "fs";
import path from "path";

const GoogleReviews = dynamic(() => import("@/features/reviews/components/GoogleReviews"), { ssr: true });
const FAQSection = dynamic(() => import("@/components/HomeSections").then((mod) => mod.FAQSection), { ssr: true });
const SocialSection = dynamic(() => import("@/components/HomeSections").then((mod) => mod.SocialSection), { ssr: true });

export const revalidate = 3600;

async function getBlogs() {
  const blogsFilePath = path.join(process.cwd(), "features", "blog", "data", "blogs.json");
  try {
    if (fs.existsSync(blogsFilePath)) {
      const fileData = fs.readFileSync(blogsFilePath, "utf-8");
      return JSON.parse(fileData);
    }
  } catch (e) {
    console.error("Error loading blogs for home:", e);
  }
  return [];
}

const COURSE_IDS = {
  DCA: "38fdc235-f7b5-4628-9d72-41c9ff2eabd8",
  ADCA: "2fc69f17-e7a0-4bde-b995-8cbda1e2e55b",
  PGDCA: "f9004121-1274-4b57-8179-ccc8365864b9",
};

export default async function Home() {
  const blogsList = await getBlogs();
  const latestBlogs = [...blogsList]
    .filter((blog: any) => blog.is_published !== false)
    .sort((a: any, b: any) => {
      const dateA = new Date(a.published_at || a.created_at || 0).getTime();
      const dateB = new Date(b.published_at || b.created_at || 0).getTime();
      return dateB - dateA;
    })
    .slice(0, 3);

  return (
    <main className="flex-col w-full bg-gray-50 pb-20 overflow-x-hidden">

      {/* 1. Hero Section */}
      <section className="relative bg-white text-slate-900 rounded-b-[2rem] md:rounded-b-[3rem] lg:rounded-b-[5rem] overflow-hidden pt-28 md:pt-32 pb-20 md:pb-36 px-4 sm:px-6 lg:px-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-b border-slate-100">

        {/* Abstract Background Elements (Enhanced with a subtle tech grid) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/60 via-white to-white pointer-events-none"></div>

        {/* Animated Glow Blobs (Smoother blur and subtle pulse) */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/40 rounded-full blur-[80px] opacity-80 animate-pulse pointer-events-none"></div>
        <div className="absolute top-48 -left-24 w-72 h-72 bg-indigo-400/40 rounded-full blur-[80px] opacity-80 pointer-events-none"></div>

        <div className="container mx-auto max-w-5xl text-center relative z-10">

          {/* Animated Badge */}
          <Link href="/inquiry" className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-blue-50 text-blue-700 font-semibold rounded-full text-sm border border-blue-200/60 shadow-sm transition-transform hover:scale-105 hover:bg-blue-100/70">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <OfferSlider />
          </Link>

          {/* Dynamic Hero Slider (Includes heading, selector tabs, descriptions, and action buttons) */}
          <div className="mt-4 mb-14">
            <HeroSlider />
          </div>

          {/* NEW: Social Proof / Trust Indicators */}
          <div className="pt-8 border-t border-slate-200/60 max-w-lg mx-auto flex flex-col sm:flex-row items-center justify-center gap-5">
            <div className="flex -space-x-3">
              {/* Optimized Social Proof Avatars from Cloudinary */}
              <Image className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" src="https://res.cloudinary.com/ddiooxxks/image/upload/f_auto,q_auto/v1777769106/nita_qjlwlt.jpg" alt="Student Nita" width={40} height={40} priority />
              <Image className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" src="https://res.cloudinary.com/ddiooxxks/image/upload/f_auto,q_auto/v1777769273/ram_tsgmwq.jpg" alt="Student Ram" width={40} height={40} priority />
              <Image className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" src="https://res.cloudinary.com/ddiooxxks/image/upload/f_auto,q_auto/v1777769346/reeta_q5zuwz.jpg" alt="Student Reeta" width={40} height={40} priority />
              <Image className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" src="https://res.cloudinary.com/ddiooxxks/image/upload/f_auto,q_auto/v1777769358/sonu_ls911l.jpg" alt="Student Sonu" width={40} height={40} priority />
              <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-50 flex items-center justify-center text-xs font-bold text-blue-600 shadow-sm z-10">20+</div>
            </div>

            <div className="text-sm text-slate-900 font-medium text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start text-amber-400 mb-0.5 tracking-widest text-base">
                ★★★★★
              </div>
              Trusted by 20+ students
            </div>
          </div>

        </div>
      </section>


      {/* 2. Popular Courses Section — Static */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 relative z-10 overflow-hidden">
        {/* Decorative Aurora Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-blue-400/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="text-center mb-16 relative">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 pb-1">
            Popular Courses
          </h2>
          <p className="text-slate-900 text-sm md:text-base max-w-2xl mx-auto font-medium">
            Master the most in-demand tech skills with our 70% practical training programs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          <CourseCard
            title="Basic Computer Course"
            badge="Beginner"
            duration="3 Months"
            mode="Offline"
            price="₹2,999"
            imageSrc="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop"
            detailsHref="/courses/bcc"
            applyHref="/inquiry?courseId=197f7c89-e410-4768-8b49-567b4b4e3e9e"
          />
          <CourseCard
            title="Diploma in Computer Applications"
            badge="Beginner"
            duration="12 Months"
            mode="Offline"
            price="₹13,999"
            imageSrc="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop"
            detailsHref="/courses/dca"
            applyHref="/inquiry?courseId=38fdc235-f7b5-4628-9d72-41c9ff2eabd8"
          />
          <CourseCard
            title="Post Graduate Diploma in Computer Applications"
            badge="Advanced"
            duration="12 Months"
            mode="Offline"
            price="₹16,999"
            imageSrc="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop"
            detailsHref="/courses/pgdca"
            applyHref="/inquiry?courseId=f9004121-1274-4b57-8179-ccc8365864b9"
          />
          <CourseCard
            title="Bachelor of Computer Applications"
            badge="Degree"
            duration="3 Years"
            mode="Offline"
            price="Contact Us"
            imageSrc="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop"
            detailsHref="/courses/bca"
            applyHref="/inquiry?type=university&course=Bachelor of Computer Applications (BCA)"
          />
        </div>

        <div className="text-center mt-16">
          <Link href="/courses" className="inline-flex items-center gap-2 font-semibold text-base text-blue-700 hover:bg-blue-50/80 px-8 py-4 rounded-full transition-all duration-300 group">
            View All Courses
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </section>

      {/* 2.4. Institute Programs Section (Light Theme) */}
      <section className="bg-white py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-y border-slate-100 relative overflow-hidden z-10">
        {/* Decorative Glow Blobs */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-100/30 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-indigo-100/30 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10 text-center">
          
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 tracking-tight mb-4">
            Vision IT Computer Programs
          </h2>
          <p className="text-slate-655 text-sm md:text-base max-w-2xl mx-auto mb-16 leading-relaxed font-normal">
            Equip yourself with industry-ready skills through our standard certificate and diploma programs featuring a 70% practical-focused training approach.
          </p>

          {/* Department Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left mb-16">
            
            {/* Card 1: Professional Diplomas */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 hover:bg-white hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">Professional Diplomas</h3>
                <p className="text-slate-505 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
                  Standard 12-month programs for comprehensive computer application skills and project training.
                </p>
              </div>
              <ul className="space-y-2 border-t border-slate-200/50 pt-4">
                <li className="text-xs text-slate-700 flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> DCA (12 Months)
                </li>
                <li className="text-xs text-slate-700 flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> ADCA (12 Months)
                </li>
                <li className="text-xs text-slate-700 flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> PGDCA (Post Graduate)
                </li>
              </ul>
            </div>

            {/* Card 2: Core Certificates */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 hover:bg-white hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">Core Certificates</h3>
                <p className="text-slate-550 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
                  Short-term programs targeting basic digital literacy, typing proficiency, and office tools.
                </p>
              </div>
              <ul className="space-y-2 border-t border-slate-200/50 pt-4">
                <li className="text-xs text-slate-700 flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> BCC (Basic Computer Course)
                </li>
                <li className="text-xs text-slate-700 flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Basic Computer for Beginner
                </li>
                <li className="text-xs text-slate-700 flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Typing Course (Hindi/English)
                </li>
              </ul>
            </div>

            {/* Card 3: Industry Skills */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 hover:bg-white hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">Industry Skills</h3>
                <p className="text-slate-550 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
                  Gain specialized expertise in computer accounting, graphic design, and document publishing.
                </p>
              </div>
              <ul className="space-y-2 border-t border-slate-200/50 pt-4">
                <li className="text-xs text-slate-700 flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Tally Prime & Accounting
                </li>
                <li className="text-xs text-slate-700 flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> DTP (Desktop Publishing)
                </li>
                <li className="text-xs text-slate-700 flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Photoshop & Design
                </li>
              </ul>
            </div>

            {/* Card 4: Code & Tech AI */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 hover:bg-white hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-605 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">Advanced Coding & AI</h3>
                <p className="text-slate-550 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
                  Master modern programming logic, web development, and AI tools for digital careers.
                </p>
              </div>
              <ul className="space-y-2 border-t border-slate-200/50 pt-4">
                <li className="text-xs text-slate-700 flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Web Development (HTML/CSS/JS)
                </li>
                <li className="text-xs text-slate-700 flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Python Programming
                </li>
                <li className="text-xs text-slate-700 flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> AI Tools & Prompts Training
                </li>
              </ul>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/courses"
              className="px-8 py-4 bg-black hover:bg-slate-900 text-white font-bold text-sm rounded-full transition-all duration-300 text-center shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Browse Institute Courses
            </Link>
            <Link
              href="/inquiry"
              className="px-8 py-4 bg-white border border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-full transition-all duration-300 text-center hover:-translate-y-0.5"
            >
              Admission Inquiry
            </Link>
          </div>
        </div>
      </section>

      {/* 2.5. University Programs Section */}
      <section className="bg-white py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-y border-slate-100 relative overflow-hidden z-10">
        {/* Decorative Glow Blobs */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-100/30 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-indigo-100/30 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10 text-center">
          
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 tracking-tight mb-4">
            Jagrani Devi University (JDU) Programs
          </h2>
          <p className="text-slate-650 text-sm md:text-base max-w-2xl mx-auto mb-16 leading-relaxed font-normal">
            Pursue UGC-approved degrees, professional management courses, and specialized technical qualifications with flexible Regular & Private modes of study.
          </p>

          {/* Department Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left mb-16">
            
            {/* Card 1: Computer & Tech */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 hover:bg-white hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">Computer & IT</h3>
                <p className="text-slate-505 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
                  Premium degrees preparing you for modern tech roles and software development careers.
                </p>
              </div>
              <ul className="space-y-2 border-t border-slate-200/50 pt-4 mb-5">
                <li className="text-xs text-slate-700 flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> BCA (3 Years)
                </li>
                <li className="text-xs text-slate-700 flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> MCA (2 Years)
                </li>
                <li className="text-xs text-slate-700 flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> B.Sc Computer Science
                </li>
              </ul>
              <Link
                href="/courses/bca"
                className="w-full block text-center text-xs font-bold text-blue-700 border border-blue-200 hover:border-blue-500 hover:bg-blue-50 bg-white py-2.5 rounded-xl transition-all duration-200"
              >
                View BCA Details →
              </Link>
            </div>

            {/* Card 2: Arts & Library */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 hover:bg-white hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-650 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">Arts & Humanities</h3>
                <p className="text-slate-550 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
                  Diverse liberal arts and professional library programs with flexible learning.
                </p>
              </div>
              <ul className="space-y-2 border-t border-slate-200/50 pt-4 mb-5">
                <li className="text-xs text-slate-700 flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> BA & MA (Sociology, History, etc.)
                </li>
                <li className="text-xs text-slate-700 flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> B.Lib & M.Lib (1 Year)
                </li>
              </ul>
              <Link
                href="/courses/university"
                className="w-full block text-center text-xs font-bold text-indigo-700 border border-indigo-200 hover:border-indigo-500 hover:bg-indigo-50 bg-white py-2.5 rounded-xl transition-all duration-200"
              >
                Explore Courses →
              </Link>
            </div>

            {/* Card 3: Management & Commerce */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 hover:bg-white hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">Management</h3>
                <p className="text-slate-550 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
                  Equip yourself with administrative and leadership skills for modern organizations.
                </p>
              </div>
              <ul className="space-y-2 border-t border-slate-200/50 pt-4 mb-5">
                <li className="text-xs text-slate-700 flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> MBA & BBA Degrees
                </li>
                <li className="text-xs text-slate-700 flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> B.Com & M.Com Degrees
                </li>
                <li className="text-xs text-slate-700 flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Hotel Management (BHMCT)
                </li>
              </ul>
              <Link
                href="/courses/university"
                className="w-full block text-center text-xs font-bold text-emerald-700 border border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50 bg-white py-2.5 rounded-xl transition-all duration-200"
              >
                Explore Courses →
              </Link>
            </div>

            {/* Card 4: Law & Pharmacy */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 hover:bg-white hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-605 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">Law & Pharmacy</h3>
                <p className="text-slate-550 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
                  Professional legal and healthcare studies aligned with statutory regulations.
                </p>
              </div>
              <ul className="space-y-2 border-t border-slate-200/50 pt-4 mb-5">
                <li className="text-xs text-slate-700 flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> LLB (3 Years) & LLM
                </li>
                <li className="text-xs text-slate-700 flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> BA LLB & B.Com LLB
                </li>
                <li className="text-xs text-slate-700 flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> D.Pharm (Pharmacy)
                </li>
              </ul>
              <Link
                href="/courses/university"
                className="w-full block text-center text-xs font-bold text-amber-700 border border-amber-200 hover:border-amber-500 hover:bg-amber-50 bg-white py-2.5 rounded-xl transition-all duration-200"
              >
                Explore Courses →
              </Link>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/courses/university"
              className="px-8 py-4 bg-black hover:bg-slate-900 text-white font-bold text-sm rounded-full transition-all duration-300 text-center shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Explore University Courses
            </Link>
            <Link
              href="/inquiry?type=university"
              className="px-8 py-4 bg-white border border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-full transition-all duration-300 text-center hover:-translate-y-0.5"
            >
              Admission Inquiry
            </Link>
          </div>
        </div>
      </section>

      {/* 3. About Us Preview Section */}
      <section className="bg-white border-y border-slate-100 py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#f8fafc,transparent_70%)] pointer-events-none"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Left: Beautiful Graphics/Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50/50 border border-blue-100/50 rounded-2xl p-6 text-left">
                <div className="w-10 h-10 rounded-xl bg-blue-100/80 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h4 className="text-slate-900 font-bold text-sm">Expert Faculty</h4>
                <p className="text-slate-500 text-xs mt-1">Learn from experienced BCA/MCA qualified educators.</p>
              </div>
              <div className="bg-purple-50/50 border border-purple-100/50 rounded-2xl p-6 text-left">
                <div className="w-10 h-10 rounded-xl bg-purple-100/80 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-slate-900 font-bold text-sm">Practical Learning</h4>
                <p className="text-slate-500 text-xs mt-1">90% practical-focused training in real-world software.</p>
              </div>
              <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-2xl p-6 text-left col-span-2">
                <h4 className="text-slate-900 font-bold text-sm flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100/80 flex items-center justify-center shrink-0">
                    <svg className="w-4.5 h-4.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  University-Aligned Exams
                </h4>
                <p className="text-slate-500 text-xs mt-2.5 leading-relaxed">
                  As our courses run in alignment with university guidelines, exams are conducted at the university campus following official schedules.
                </p>
              </div>
            </div>

            {/* Right: Content */}
            <div className="text-left space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 font-semibold rounded-full text-xs border border-blue-200/50">
                Who We Are
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Empowering Students at <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Vision IT</span>
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal">
                Established with a vision to deliver premium, job-oriented computer education. We provide standard diploma and certificate programs alongside university course coaching, guided by qualified industry veterans.
              </p>
              <div className="pt-2">
                <Link href="/about" className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-800 transition-colors group">
                  Learn More About Our Institute
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 5. Gallery Preview Section */}
      <section className="bg-white py-20 md:py-24 relative overflow-hidden border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-left">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 font-semibold rounded-full text-xs border border-emerald-200/50">
                Life at Vision IT
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
                Our Campus Gallery
              </h2>
            </div>
            <Link href="/gallery" className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-blue-800 transition-colors group">
              View Full Gallery
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>

          {/* Clean modern layout preview */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden group shadow-sm bg-slate-100 border border-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=400&auto=format&fit=crop"
                alt="Practical Sessions"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent flex items-end p-4 text-left">
                <span className="text-white text-xs font-bold">Practical Lab Sessions</span>
              </div>
            </div>
            <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden group shadow-sm bg-slate-100 border border-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=400&auto=format&fit=crop"
                alt="Expert Lectures"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent flex items-end p-4 text-left">
                <span className="text-white text-xs font-bold">Expert Lectures</span>
              </div>
            </div>
            <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden group shadow-sm bg-slate-100 border border-slate-100 col-span-2 md:col-span-1">
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=400&auto=format&fit=crop"
                alt="Celebrations & Events"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent flex items-end p-4 text-left">
                <span className="text-white text-xs font-bold">Celebrations & Events</span>
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* 5.5 Latest Blogs Section */}
      {latestBlogs.length > 0 && (
        <section className="bg-slate-50 py-20 md:py-24 relative overflow-hidden border-b border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 font-semibold rounded-full text-xs border border-blue-200/50">
                📚 Insights & Updates
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
                Latest from Our Blog
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm max-w-2xl mx-auto mt-2 font-normal leading-relaxed">
                Stay updated with the latest computer technology trends, programming tutorials, career tips, and official announcements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {latestBlogs.map((blog: any) => (
                <Link href={`/blog/${blog.slug}`} key={blog.id} className="block group h-full">
                  <div className="bg-white border border-slate-200/60 rounded-3xl p-5 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group flex flex-col justify-between h-full">
                    <div>
                      {blog.image_url && (
                        <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-5 bg-slate-100 border border-slate-100">
                          <Image
                            src={blog.image_url}
                            alt={blog.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                          {blog.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {blog.published_at || blog.created_at
                            ? new Date(blog.published_at || blog.created_at).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })
                            : "Recent"}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                        {blog.title}
                      </h3>
                      
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal mb-4 line-clamp-3">
                        {blog.excerpt || "Read this article to learn more."}
                      </p>
                    </div>

                    <div className="text-blue-600 font-bold text-xs inline-flex items-center gap-1 mt-auto">
                      Read Article
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/blog" className="inline-flex items-center gap-2 font-semibold text-base text-blue-700 hover:bg-blue-50/80 px-8 py-4 rounded-full transition-all duration-300 group">
                Explore All Articles
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </section>
      )}




      {/* Google Reviews Section */}
      <GoogleReviews />

      {/* 4. Contact CTA Section (White Theme) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 relative z-10">

        {/* Outer Wrapper */}
        <div className="p-4 sm:p-6 text-center">

          <div>

            {/* Headline */}
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 tracking-tight">
              Ready to Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Journey?</span>
            </h2>

            {/* Sub-headline */}
            <p className="text-sm md:text-base text-slate-900 max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
              Join twenty plus of successful students. Enrollment for the 2026 batches is closing soon.
            </p>

            {/* Primary Actions */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Button href="/inquiry" size="md" className="w-full sm:w-auto text-sm px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 rounded-full transition-all duration-300 hover:-translate-y-0.5 font-bold flex items-center justify-center border-none">
                Inquire Now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </Button>
              <Button href="/contact" size="md" variant="outline" className="w-full sm:w-auto text-sm px-6 py-3 bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:text-blue-700 rounded-full transition-all duration-300 hover:-translate-y-0.5 font-semibold">
                Contact Advisors
              </Button>
            </div>

            {/* Quick Contact Grid */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 border-t border-slate-100 pt-8 mt-4">

              {/* Phone 1 */}
              <a href="tel:+918103170595" className="flex flex-col items-center p-4 rounded-2xl hover:bg-slate-50 transition-colors group/link">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover/link:bg-blue-100 group-hover/link:scale-110 transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <span className="text-slate-900 font-bold text-base tracking-wide">+91 8103170595</span>
                <span className="text-slate-900 font-medium text-xs mt-1">Call us directly</span>
              </a>

              {/* Phone 2 */}
              <a href="tel:+919301221630" className="flex flex-col items-center p-4 rounded-2xl hover:bg-slate-50 transition-colors group/link">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover/link:bg-blue-100 group-hover/link:scale-110 transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <span className="text-slate-900 font-bold text-base tracking-wide">+91 9301221630</span>
                <span className="text-slate-900 font-medium text-xs mt-1">Call us directly</span>
              </a>

            </div>

          </div>
        </div>
      </section>

      {/* 5. Instagram / Social Section */}
      <SocialSection />

      {/* 6. FAQ Section */}
      <FAQSection />

    </main>
  );
}

