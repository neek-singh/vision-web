import { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'About Us | Vision IT Computer Institute in Pratappur',
  description: 'Learn about Vision IT Computer Institute in Pratappur. We offer practical, skill-based education in DCA, ADCA, PGDCA, Web Development, and AI.',
  keywords: 'Computer Institute in Pratappur, DCA ADCA PGDCA courses, Vision IT, Web Development, computer education, practical training',
  openGraph: {
    title: 'About Us | Vision IT Computer Institute in Pratappur',
    description: 'Learn about Vision IT Computer Institute in Pratappur. We offer practical, skill-based education in DCA, ADCA, PGDCA, Web Development, and AI.',
    type: 'website',
  }
};

export const revalidate = 3600;

export default function AboutPage() {
  // Load stats
  const statsFilePath = path.join(process.cwd(), "data", "stats.json");
  let stats = {
    expert_mentors: "10+",
    students_trained: "500+",
    practical_learning: "90%",
    courses_offered: "10+",
  };

  try {
    if (fs.existsSync(statsFilePath)) {
      const fileData = fs.readFileSync(statsFilePath, "utf-8");
      stats = JSON.parse(fileData);
    }
  } catch (e) {
    console.error(e);
  }

  // Load faculty
  const facultyFilePath = path.join(process.cwd(), "data", "faculty.json");
  let faculty: any[] = [];

  try {
    if (fs.existsSync(facultyFilePath)) {
      const facultyData = fs.readFileSync(facultyFilePath, "utf-8");
      faculty = JSON.parse(facultyData);
    }
  } catch (e) {
    console.error(e);
  }

  return (
    <main className="flex-col w-full bg-slate-50 min-h-screen">

      {/* 1. Enhanced Hero Section */}
      <section className="relative bg-white text-slate-900 rounded-b-[3rem] md:rounded-b-[4rem] overflow-hidden pt-32 pb-24 md:pb-36 px-6 lg:px-8 shadow-sm border-b border-slate-200/80">

        {/* NEW: Tech-inspired Dot Pattern Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

        {/* Soft Background Gradients */}
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-50/90 via-white/80 to-transparent pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-48 -left-24 w-[400px] h-[400px] bg-indigo-200/30 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto max-w-5xl text-center relative z-10">

          {/* Enhanced Top Badge: Added backdrop blur and hover effect */}
          <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 bg-white/80 backdrop-blur-sm text-blue-700 font-semibold rounded-full text-sm border border-blue-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 hover:shadow-md transition-shadow cursor-default">
            <div className="p-1 bg-blue-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
            </div>
            Pratappur's Premier Tech Institute
          </div>

          {/* Refined Heading: Better line breaks and a 3-color gradient */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.15] animate-in fade-in slide-in-from-bottom-6 duration-700">
            Shaping Careers at <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 pb-2">
              Vision IT Institute
            </span>
          </h1>

          {/* Expanded Subtitle: Fleshed out the copy slightly for better rhythm */}
          <p className="mt-6 text-lg md:text-xl lg:text-2xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
            Empowering the next generation of tech leaders in Pratappur through industry-oriented, practical education that bridges the gap between learning and doing.
          </p>

          {/* Enhanced CTAs: Added hover transforms (translate-y) and dynamic shadows */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <Button href="/courses" size="lg" className="w-full sm:w-auto text-lg px-8 h-14 bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 rounded-full font-bold transition-all hover:-translate-y-0.5">
              View Our Courses
            </Button>
            <Button href="/contact" size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 h-14 rounded-full font-bold border-2 border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-all hover:-translate-y-0.5">
              Contact Us
            </Button>
          </div>

          {/* NEW: Trust Indicators / Stats Row */}
          <div className="mt-16 pt-8 border-t border-slate-100 max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-black text-slate-800">5+</span>
              <span className="text-sm font-medium text-slate-500 mt-1">Expert Mentors</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-black text-slate-800">10+</span>
              <span className="text-sm font-medium text-slate-500 mt-1">Students Trained</span>
            </div>
            <div className="flex flex-col items-center col-span-2 md:col-span-1">
              <span className="text-3xl md:text-4xl font-black text-slate-800">100%</span>
              <span className="text-sm font-medium text-slate-500 mt-1">Practical Focus</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Enhanced About Institute Section */}
      <section className="relative overflow-hidden bg-slate-50/50 py-24 md:py-32">
        {/* Soft Decorative Backgrounds */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100/50 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-50/60 rounded-full blur-[80px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">

            {/* Left Column: Text Content */}
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3">
                About Our Institute
              </h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-[1.15]">
                Empowering Future <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Tech Professionals</span>
              </h3>

              <div className="w-16 h-1.5 bg-blue-600 rounded-full mb-8" />

              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  <strong className="text-slate-900 font-bold">Vision IT Computer Institute</strong> is a leading center for technology education in Pratappur, dedicated to shaping the next generation of digital professionals. We bridge the gap between traditional learning and real-world industry demands.
                </p>
                <p>
                  Our programs are crafted with a strong focus on <strong className="text-slate-900 font-bold">practical, hands-on training</strong>, ensuring students gain real experience—not just theoretical knowledge. From beginners to advanced learners, we provide structured pathways to build confidence, skills, and career readiness.
                </p>
              </div>

              {/* Enhanced Courses Highlight */}
              <div className="mt-10">
                <p className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide">Popular Career Paths</p>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    "DCA",
                    "ADCA",
                    "PGDCA",
                    "Web Development",
                    "AI Engineering"
                  ].map((course) => (
                    <span
                      key={course}
                      className="px-4 py-2 text-sm font-semibold bg-white border border-slate-200 text-slate-700 rounded-full hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all cursor-default shadow-sm"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">100% Practical</h4>
                <p className="text-slate-600 text-sm leading-relaxed">Focus on lab work and real-world projects over purely theoretical lectures.</p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow sm:mt-8">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Industry Ready</h4>
                <p className="text-slate-600 text-sm leading-relaxed">Curriculum designed to meet the current demands of the modern tech job market.</p>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Expert Mentors</h4>
                <p className="text-slate-600 text-sm leading-relaxed">Learn directly from experienced professionals who guide you every step of the way.</p>
              </div>

              {/* Card 4 */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow sm:mt-8">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Career Growth</h4>
                <p className="text-slate-600 text-sm leading-relaxed">Structured pathways to build your confidence and upgrade your career trajectory.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Enhanced Mission & Vision */}
      <section className="relative bg-white py-24 md:py-32 border-y border-slate-100 overflow-hidden">

        {/* Refined Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-blue-50/50 to-transparent blur-3xl rounded-full -z-10 pointer-events-none" />

        {/* Subtle Dot Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 max-w-6xl relative z-10">

          {/* Section Heading */}
          <div className="text-center mb-16 md:mb-20">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3 block">
              Our Core Purpose
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
              Mission & Vision
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Driving excellence in computer education with a relentless focus on real-world skills, innovation, and student success.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

            {/* Mission Card */}
            <div className="group relative bg-white p-10 md:p-12 rounded-[2.5rem] border border-slate-200 hover:border-blue-200 shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-2 transition-all duration-500 flex flex-col text-left overflow-hidden z-10">

              {/* Decorative Watermark */}
              <div className="absolute -bottom-6 -right-6 text-[12rem] font-black text-slate-50 opacity-50 group-hover:text-blue-50 group-hover:-translate-y-4 group-hover:-translate-x-4 transition-all duration-700 pointer-events-none z-0 leading-none">
                01
              </div>

              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-3 transition-all duration-300 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                </svg>
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tight relative z-10">
                Our Mission
              </h3>

              <p className="text-slate-600 leading-relaxed text-lg relative z-10">
                To deliver <strong className="text-slate-900 font-bold">industry-relevant, skill-based computer education</strong> that is accessible to all. We focus on practical learning, real-world projects, and career-oriented training to ensure every student is job-ready from day one.
              </p>

            </div>

            {/* Vision Card */}
            <div className="group relative bg-white p-10 md:p-12 rounded-[2.5rem] border border-slate-200 hover:border-indigo-200 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-2 transition-all duration-500 flex flex-col text-left overflow-hidden z-10 mt-0 md:mt-8">

              {/* Decorative Watermark */}
              <div className="absolute -bottom-6 -right-6 text-[12rem] font-black text-slate-50 opacity-50 group-hover:text-indigo-50 group-hover:-translate-y-4 group-hover:-translate-x-4 transition-all duration-700 pointer-events-none z-0 leading-none">
                02
              </div>

              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white group-hover:-rotate-3 transition-all duration-300 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" x2="22" y1="12" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tight relative z-10">
                Our Vision
              </h3>

              <p className="text-slate-600 leading-relaxed text-lg relative z-10">
                To become a <strong className="text-slate-900 font-bold">leading hub of digital education</strong>, empowering students with the skills, confidence, and mindset needed to thrive in the global technology landscape and become future innovators.
              </p>

            </div>

          </div>

          {/* Enhanced CTA */}
          <div className="text-center mt-20">
            <a
              href="/courses"
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white text-lg font-bold rounded-full shadow-xl shadow-slate-900/20 hover:bg-blue-600 hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300"
            >
              Start Your Journey Today
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

        </div>
      </section>
      {/* 4. Enhanced Why Choose Us */}
      <section className="relative bg-slate-50/50 py-24 md:py-32 overflow-hidden border-t border-slate-100">

        {/* Soft Background Accents */}
        <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-blue-50/60 to-transparent pointer-events-none" />
        <div className="absolute -left-40 top-40 w-96 h-96 bg-indigo-100/40 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">

          {/* Heading */}
          <div className="text-center mb-16 md:mb-20">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3 block">
              The Vision IT Advantage
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              Why Students Choose Us
            </h2>
            <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Not just courses — we build careers with practical skills, real projects, and industry-focused training designed for the modern tech landscape.
            </p>
          </div>

          {/* Enhanced Stats (Unified Banner Style) */}
          <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm mb-20 max-w-5xl mx-auto overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100">
              {[
                { value: stats.students_trained, label: "Students Trained" },
                { value: stats.expert_mentors, label: "Expert Mentors" },
                { value: stats.practical_learning, label: "Practical Learning" },
                { value: stats.courses_offered, label: "Courses Offered" }
              ].map((stat, i) => (
                <div key={i} className="p-8 text-center group hover:bg-slate-50/50 transition-colors">
                  <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-1 group-hover:scale-105 group-hover:text-blue-600 transition-all duration-300">
                    {stat.value}
                  </h3>
                  <p className="text-slate-500 font-medium text-sm uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">

            {/* Feature 1 */}
            <div className="group relative bg-white border border-slate-200 rounded-[2rem] p-8 text-left shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2 hover:border-blue-200 transition-all duration-500">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:-rotate-3 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="7" r="4" /><path d="M5.5 21a6.5 6.5 0 0 1 13 0" /></svg>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                Industry Experts
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Learn from professionals with real industry experience — not just theoretical trainers reading from a book.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-white border border-slate-200 rounded-[2rem] p-8 text-left shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-2 hover:border-indigo-200 transition-all duration-500 sm:mt-6 lg:mt-12">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-3 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /></svg>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                Project-Based
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Build real websites, apps, and AI projects to create a strong portfolio that impresses employers.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-white border border-slate-200 rounded-[2rem] p-8 text-left shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-2 hover:border-emerald-200 transition-all duration-500">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white group-hover:-rotate-3 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 1v22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                Affordable Fees
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                High-quality training at student-friendly pricing with highly flexible payment options.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group relative bg-white border border-slate-200 rounded-[2rem] p-8 text-left shadow-sm hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-2 hover:border-sky-200 transition-all duration-500 sm:mt-6 lg:mt-12">
              <div className="w-14 h-14 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white group-hover:rotate-3 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="5" /></svg>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
                Career-Focused
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Resume building, interview prep, and personalized job guidance included in every single course.
              </p>
            </div>

          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20">
            <a
              href="/enroll"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-full shadow-xl shadow-blue-600/20 hover:bg-slate-900 hover:shadow-slate-900/20 hover:-translate-y-1 transition-all duration-300 group"
            >
              Enroll Now & Start Your Career
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

        </div>
      </section>

      {/* 6. Enhanced Our Team */}
      <section className="relative bg-white py-24 md:py-32 border-t border-slate-100 overflow-hidden">

        {/* Soft Background Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-blue-50/40 to-transparent blur-3xl rounded-full -z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">

          {/* Heading */}
          <div className="text-center mb-16 md:mb-24">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3 block">
              Our Mentors
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              Meet Our Experts
            </h2>
            <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Learn from passionate mentors who bring real industry experience into the classroom to help you succeed.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

            {faculty.map((member: any, i: number) => {
              const colorMap: Record<string, { from: string; to: string; text: string; glow: string; hoverBorder: string; hoverText: string }> = {
                blue: {
                  from: "from-blue-50/50",
                  to: "to-transparent",
                  text: "text-blue-600",
                  glow: "from-blue-200 to-indigo-100",
                  hoverBorder: "hover:border-blue-200",
                  hoverText: "group-hover:text-blue-600"
                },
                indigo: {
                  from: "from-indigo-50/50",
                  to: "to-transparent",
                  text: "text-indigo-600",
                  glow: "from-indigo-200 to-purple-100",
                  hoverBorder: "hover:border-indigo-200",
                  hoverText: "group-hover:text-indigo-600"
                },
                sky: {
                  from: "from-sky-50/50",
                  to: "to-transparent",
                  text: "text-sky-600",
                  glow: "from-sky-200 to-blue-100",
                  hoverBorder: "hover:border-sky-200",
                  hoverText: "group-hover:text-sky-600"
                }
              };

              const colors = colorMap[member.color as string] || colorMap.blue;
              const staggeredClass = i === 1 ? "lg:mt-12" : i === 2 ? "sm:mt-8 lg:mt-0" : "";

              return (
                <div key={member.id} className={`group relative bg-white rounded-[2rem] p-8 text-center border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-${member.color}-500/10 ${colors.hoverBorder} transition-all duration-500 overflow-hidden flex flex-col h-full ${staggeredClass}`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.from} ${colors.to} opacity-0 group-hover:opacity-100 transition duration-500 -z-10`} />

                  <div className="relative w-28 h-28 mx-auto mb-6">
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${colors.glow} blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500`} />
                    <div className={`relative w-full h-full rounded-full bg-white border-2 border-slate-100 flex items-center justify-center text-3xl font-black ${colors.text} shadow-sm group-hover:scale-105 transition-all duration-300 overflow-hidden`}>
                      {member.image ? (
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        member.initials
                      )}
                    </div>
                  </div>

                  <h4 className={`text-xl font-black text-slate-900 mb-1 ${colors.hoverText} transition-colors`}>
                    {member.name}
                  </h4>
                  <p className={`${colors.text} font-bold mb-4 text-xs tracking-wider uppercase`}>
                    {member.role}
                  </p>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                    {member.bio}
                  </p>

                  <div className="mt-auto pt-6 border-t border-slate-100">
                    <div className="flex flex-wrap justify-center gap-2 text-xs font-semibold mb-4">
                      {member.tags.map((tag: string, idx: number) => (
                        <span key={idx} className="px-3 py-1.5 bg-slate-50 text-slate-600 border border-slate-200 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-center gap-3 text-slate-400">
                      <a href={member.linkedin} className={`hover:${colors.text} transition-colors`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>

          {/* Enhanced CTA */}
          <div className="text-center mt-20">
            <p className="text-slate-500 font-medium mb-6 uppercase tracking-wider text-sm">
              Learn directly from experts committed to your success
            </p>
            <a
              href="/courses"
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white text-lg font-bold rounded-full shadow-xl shadow-slate-900/20 hover:bg-blue-600 hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300 group"
            >
              Join Our Courses
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

        </div>
      </section>

      {/* 7. Call To Action */}
      <section className="container mx-auto px-6 lg:px-8 max-w-5xl pb-24 md:pb-32">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-16 text-center relative overflow-hidden shadow-2xl">
          {/* Dark Mode Gradients for CTA */}
          <div className="absolute -right-24 -top-24 w-72 h-72 bg-blue-600/30 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -left-24 -bottom-24 w-72 h-72 bg-indigo-600/30 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Ready to Transform Your Career?</h2>
            <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Admissions for our upcoming batches are now open. Don't miss your chance to learn from the best computer institute in Pratappur.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button href="/admissions" size="lg" className="w-full sm:w-auto px-10 h-14 shadow-xl shadow-blue-900/50 rounded-full font-bold text-lg">
                Join Now
              </Button>
              <a
                href="https://wa.me/918103170595"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 h-14 bg-white/10 text-white hover:bg-[#25D366] hover:text-white border border-slate-700 hover:border-[#25D366] rounded-full flex items-center justify-center gap-2.5 font-bold shadow-sm transition-all duration-300 backdrop-blur-md active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}