import { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import fs from 'fs';
import path from 'path';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const AboutDynamicSections = dynamic(() => import('@/features/about/components/AboutDynamicSections'), {
  loading: () => <div className="h-96 bg-slate-50 animate-pulse rounded-3xl max-w-4xl mx-auto my-12" />
});

export const metadata: Metadata = {
  title: 'About Vision IT Computer Institute | Computer Institute Pratappur',
  description: 'Vision IT Computer Institute is the leading computer institute pratappur, Chhattisgarh. Learn about our government-recognized computer education programs, expert faculty, and 70% practical training approach.',
  keywords: [
    'about vision it computer institute',
    'computer institute pratappur',
    'vision it computer center pratappur',
    'best computer institute pratappur',
    'computer education pratappur',
    'IT training center pratappur',
    'government recognized computer institute chhattisgarh'
  ],
  alternates: {
    canonical: 'https://visionitinstitute.com/about',
  },
  openGraph: {
    title: 'About Vision IT Computer Institute | Computer Institute Pratappur',
    description: 'Vision IT Computer Institute is the leading computer institute pratappur, Chhattisgarh — offering government-recognized DCA, ADCA, PGDCA, and BCC courses with expert faculty and 70% practical training.',
    url: 'https://visionitinstitute.com/about',
    siteName: 'Vision IT Computer Institute',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Vision IT Computer Institute | Computer Institute Pratappur',
    description: 'Vision IT Computer Institute is the leading computer institute pratappur offering government-recognized computer courses with practical offline training.',
  },
};

export const revalidate = 3600;

/* ─── Icon Components ─── */
const IconFlask = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
);
const IconBriefcase = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);
const IconUsers = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
);
const IconTrend = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
);
const IconCheck = () => (
  <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
);

const colorStyles: Record<string, { bg: string; text: string; border: string; hoverBg: string; light: string; badge: string }> = {
  blue: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200", hoverBg: "hover:bg-blue-50", light: "bg-blue-50", badge: "bg-blue-600" },
  indigo: { bg: "bg-indigo-100", text: "text-indigo-600", border: "border-indigo-200", hoverBg: "hover:bg-indigo-50", light: "bg-indigo-50", badge: "bg-indigo-600" },
  purple: { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-200", hoverBg: "hover:bg-purple-50", light: "bg-purple-50", badge: "bg-purple-600" },
  emerald: { bg: "bg-emerald-100", text: "text-emerald-600", border: "border-emerald-200", hoverBg: "hover:bg-emerald-50", light: "bg-emerald-50", badge: "bg-emerald-600" },
  amber: { bg: "bg-amber-100", text: "text-amber-600", border: "border-amber-200", hoverBg: "hover:bg-amber-50", light: "bg-amber-50", badge: "bg-amber-600" },
  pink: { bg: "bg-pink-100", text: "text-pink-600", border: "border-pink-200", hoverBg: "hover:bg-pink-50", light: "bg-pink-50", badge: "bg-pink-600" },
  sky: { bg: "bg-sky-100", text: "text-sky-600", border: "border-sky-200", hoverBg: "hover:bg-sky-50", light: "bg-sky-50", badge: "bg-sky-600" },
};




export default function AboutPage() {
  // Load stats
  const statsFilePath = path.join(process.cwd(), "features", "admin", "data", "stats.json");
  let stats = {
    expert_mentors: "10+",
    students_trained: "15+",
    practical_learning: "90%",
    courses_offered: "45+",
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
  const facultyFilePath = path.join(process.cwd(), "features", "courses", "data", "faculty.json");
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
    <main className="flex-col w-full bg-slate-50 min-h-screen overflow-x-hidden">

      {/* ════════════════════════════════════════════════════════════
          1. HERO SECTION
      ════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[450px] md:min-h-[500px] flex items-center justify-center bg-slate-900 overflow-hidden py-16 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-950">
        {/* Background Image asset */}
        <Image
          src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1200&auto=format&fit=crop"
          alt="Students working in computer lab classroom"
          fill
          className="object-cover pointer-events-none"
          priority
        />
        {/* Dark opacity overlay to ensure white text legibility */}
        <div className="absolute inset-0 bg-slate-950/70 z-10 pointer-events-none" />

        <div className="relative z-20 container mx-auto px-4 text-center max-w-4xl text-white space-y-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700">
            Shaping Careers at <br />
            Vision IT Institute
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
            Empowering the next generation of tech leaders through industry-oriented, practical education that bridges the gap between learning and doing — since our founding in Pratappur.
          </p>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          2. ABOUT INSTITUTE (Pioneers in IT Education)
      ════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Column: Text Content */}
            <ScrollReveal className="space-y-6 text-left">
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                Pioneers in IT Education, <br />
                Bridging the Gap.
              </h2>

              <p className="text-sm sm:text-base text-slate-550 leading-relaxed font-normal">
                For over two decades, Vision IT Computer Institute has been transforming aspiring tech enthusiasts into industry-ready professionals. We don&apos;t just teach code; we simulate real-world environments to ensure our graduates are day-one ready.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button href="#mission" className="px-6 h-11 bg-black hover:bg-slate-900 text-white rounded-lg font-semibold text-xs sm:text-sm transition-all hover:-translate-y-0.5 border-none shadow-sm cursor-pointer">
                  Explore Our Mission
                </Button>
              </div>
            </ScrollReveal>

            {/* Right Column: Visual Image Asset & Floating Card */}
            <ScrollReveal className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-slate-200/50 bg-white">
              <Image
                src="https://images.unsplash.com/photo-1531498860502-7c67cf02f69e?q=80&w=800&auto=format&fit=crop"
                alt="Students studying and collaborating"
                fill
                className="object-cover"
                priority
              />
            </ScrollReveal>

          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          3. OUR PEDAGOGICAL FRAMEWORK
      ════════════════════════════════════════════════════════════ */}
      <section className="relative bg-slate-50 py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-slate-100 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          
          <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
              Our Pedagogical Framework
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-500 leading-relaxed font-normal max-w-2xl mx-auto">
              Built on a foundation of rigorous academics and practical application, our approach ensures you are prepared for the demands of the modern tech industry.
            </p>
          </ScrollReveal>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            {/* 1. Industry Simulation Labs (Top-Left, occupies 2/3) */}
            <ScrollReveal className="md:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group hover:shadow-md hover:border-slate-300 transition-all duration-300">
              <div className="space-y-4 relative z-10 max-w-xl">
                {/* Icon Box */}
                <div className="w-10 h-10 bg-slate-50 border border-slate-100 text-slate-800 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900 tracking-tight">
                  Industry Simulation Labs
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  We replicate corporate IT environments, allowing students to navigate complex workflows, deadlines, and collaborative tools used by top tech firms.
                </p>
              </div>
              
              {/* Subtle building watermark SVG in the bottom right corner */}
              <div className="absolute bottom-0 right-0 w-36 h-36 opacity-[0.03] text-slate-900 pointer-events-none group-hover:scale-105 transition-transform duration-500 transform translate-x-4 translate-y-4">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
            </ScrollReveal>

            {/* 2. Project-Based Learning (Top-Right, occupies 1/3) */}
            <ScrollReveal className="bg-[#0f172a] text-white rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all duration-300">
              <div className="space-y-4">
                {/* Icon Box */}
                <div className="w-10 h-10 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-white tracking-tight">
                  Project-Based Learning
                </h3>
                <p className="text-xs sm:text-sm text-slate-350 leading-relaxed font-normal">
                  Move beyond theory. Build a portfolio of real-world applications that solve genuine business problems.
                </p>
              </div>
            </ScrollReveal>

            {/* 3. 100% Placement Focus (Bottom-Left, occupies 1/3) */}
            <ScrollReveal className="bg-white border border-slate-200/80 rounded-3xl p-8 flex flex-col items-center justify-center text-center group hover:shadow-md hover:border-slate-300 transition-all duration-300">
              <span className="text-4xl sm:text-5xl font-serif font-black text-slate-900 tracking-tight leading-none mb-2">
                100%
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                Placement Focus
              </h4>
              <p className="text-xs text-slate-500 font-normal leading-relaxed">
                Dedicated career services and strong industry partnerships.
              </p>
            </ScrollReveal>

            {/* 4. Guided by Ishwar Singh (Bottom-Right, occupies 2/3) */}
            <ScrollReveal className="md:col-span-2 bg-blue-50/70 border border-blue-100/80 rounded-3xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 relative overflow-hidden group hover:shadow-md transition-all duration-300">
              {/* Profile Image */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-slate-200 shadow-sm shrink-0 bg-white">
                <Image
                  src="https://res.cloudinary.com/ddiooxxks/image/upload/v1777769651/ishwar_cdiam4.jpg"
                  alt="Ishwar Singh Profile Picture"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="space-y-2 text-left">
                <span className="text-[10px] text-blue-600 font-extrabold uppercase tracking-widest block">
                  Visionary Leadership
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900 tracking-tight">
                  Guided by Ishwar Singh
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Under the strategic direction of Ishwar Singh, the institute continuously adapts its curriculum to outpace the rapid evolution of technology, ensuring our students are always ahead of the curve.
                </p>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          3A. THE LEARNING JOURNEY
      ════════════════════════════════════════════════════════════ */}
      <section className="relative bg-white py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-slate-100 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
              The Learning Journey
            </h2>
          </ScrollReveal>

          {/* Timeline steps */}
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 items-start">
            {/* Horizontal line */}
            <div className="absolute top-4 left-[12.5%] right-[12.5%] border-t-2 border-slate-100 z-0 hidden md:block" />

            {/* Step 1 */}
            <ScrollReveal className="text-center space-y-4 relative z-10">
              <div className="bg-slate-900 text-white font-serif font-bold w-8 h-8 rounded flex items-center justify-center mx-auto shadow-md">
                1
              </div>
              <div className="space-y-1">
                <h4 className="text-[10px] font-extrabold text-slate-900 uppercase tracking-widest">
                  Conceptual Mastery
                </h4>
                <p className="text-xs text-slate-500 max-w-[180px] mx-auto leading-relaxed">
                  Deep dive into core syntax and logic.
                </p>
              </div>
            </ScrollReveal>

            {/* Step 2 */}
            <ScrollReveal delay={150} className="text-center space-y-4 relative z-10">
              <div className="bg-slate-900 text-white font-serif font-bold w-8 h-8 rounded flex items-center justify-center mx-auto shadow-md">
                2
              </div>
              <div className="space-y-1">
                <h4 className="text-[10px] font-extrabold text-slate-900 uppercase tracking-widest">
                  Architecture Design
                </h4>
                <p className="text-xs text-slate-500 max-w-[180px] mx-auto leading-relaxed">
                  Learning to structure scalable applications.
                </p>
              </div>
            </ScrollReveal>

            {/* Step 3 */}
            <ScrollReveal delay={300} className="text-center space-y-4 relative z-10">
              <div className="bg-slate-900 text-white font-serif font-bold w-8 h-8 rounded flex items-center justify-center mx-auto shadow-md">
                3
              </div>
              <div className="space-y-1">
                <h4 className="text-[10px] font-extrabold text-slate-900 uppercase tracking-widest">
                  Live Development
                </h4>
                <p className="text-xs text-slate-500 max-w-[180px] mx-auto leading-relaxed">
                  Building end-to-end solutions under mentorship.
                </p>
              </div>
            </ScrollReveal>

            {/* Step 4 */}
            <ScrollReveal delay={450} className="text-center space-y-4 relative z-10">
              <div className="bg-slate-900 text-white font-serif font-bold w-8 h-8 rounded flex items-center justify-center mx-auto shadow-md">
                4
              </div>
              <div className="space-y-1">
                <h4 className="text-[10px] font-extrabold text-slate-900 uppercase tracking-widest">
                  Industry Deployment
                </h4>
                <p className="text-xs text-slate-500 max-w-[180px] mx-auto leading-relaxed">
                  Final project presentation and placement drives.
                </p>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          3B. THEORY VS PRACTICE
      ════════════════════════════════════════════════════════════ */}
      <section className="relative bg-blue-50/50 py-20 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-100 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column */}
            <ScrollReveal className="space-y-4 text-left max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                Theory vs Practice
              </h2>
              <p className="text-sm sm:text-base text-slate-550 leading-relaxed font-normal">
                Our curriculum is deliberately skewed towards hands-on application. While foundational theory is essential, we believe mastery is achieved through doing.
              </p>
            </ScrollReveal>

            {/* Right Column */}
            <ScrollReveal className="w-full">
              <div className="bg-white border border-slate-200/60 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
                {/* Progress 1: Practical Application */}
                <div className="space-y-2 text-left">
                  <div className="flex justify-between text-xs sm:text-sm font-semibold text-slate-800">
                    <span>Practical Application</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full h-3 bg-blue-50 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-900 rounded-full w-[75%] transition-all duration-1000" />
                  </div>
                </div>

                {/* Progress 2: Theoretical Concepts */}
                <div className="space-y-2 text-left">
                  <div className="flex justify-between text-xs sm:text-sm font-semibold text-slate-500">
                    <span>Theoretical Concepts</span>
                    <span>25%</span>
                  </div>
                  <div className="w-full h-3 bg-blue-50 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-300 rounded-full w-[25%] transition-all duration-1000" />
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>


      <AboutDynamicSections faculty={faculty} />

    </main>
  );
}