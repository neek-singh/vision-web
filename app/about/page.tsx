import { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';

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
const IconArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
);
const IconRocket = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
);
const IconGlobe = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
);


/* ─── Data ─── */
const coursePrograms = [
  {
    name: "DCA",
    fullName: "Diploma in Computer Application",
    duration: "6-12 Months",
    desc: "Foundation course covering computer fundamentals, MS Office, internet basics, and introductory programming. Perfect for beginners starting their tech journey.",
    topics: ["Computer Fundamentals", "MS Office Suite", "Internet & Email", "Basic Programming", "Typing & Data Entry"],
    color: "blue",
  },
  {
    name: "ADCA",
    fullName: "Advanced Diploma in Computer Application",
    duration: "12 Months",
    desc: "Comprehensive program building on DCA with advanced concepts in programming, web design, accounting software, and database management.",
    topics: ["Advanced MS Office", "Tally & Accounting", "Web Design (HTML/CSS)", "Database Basics", "C Programming"],
    color: "indigo",
  },
  {
    name: "PGDCA",
    fullName: "Post Graduate Diploma in Computer Application",
    duration: "12 Months",
    desc: "Professional-level program for graduates, covering advanced programming, software engineering principles, and modern development practices.",
    topics: ["C/C++ Programming", "Java Basics", "DBMS & SQL", "Software Engineering", "Project Work"],
    color: "purple",
  },
  {
    name: "Web Development",
    fullName: "Full Stack Web Development",
    duration: "6-12 Months",
    desc: "Industry-focused program teaching modern frontend and backend technologies. Build real websites and web applications from scratch.",
    topics: ["HTML, CSS, JavaScript", "React.js / Next.js", "Node.js & APIs", "Database & Deployment", "Portfolio Projects"],
    color: "emerald",
  },
  {
    name: "AI Engineering",
    fullName: "Artificial Intelligence & Python",
    duration: "6 Months",
    desc: "Cutting-edge program covering Python programming, machine learning fundamentals, and AI tools that are transforming the industry.",
    topics: ["Python Programming", "Data Analysis", "Machine Learning Basics", "AI Tools & ChatGPT", "Capstone Project"],
    color: "amber",
  },
];

const colorStyles: Record<string, { bg: string; text: string; border: string; hoverBg: string; light: string; badge: string }> = {
  blue: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200", hoverBg: "hover:bg-blue-50", light: "bg-blue-50", badge: "bg-blue-600" },
  indigo: { bg: "bg-indigo-100", text: "text-indigo-600", border: "border-indigo-200", hoverBg: "hover:bg-indigo-50", light: "bg-indigo-50", badge: "bg-indigo-600" },
  purple: { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-200", hoverBg: "hover:bg-purple-50", light: "bg-purple-50", badge: "bg-purple-600" },
  emerald: { bg: "bg-emerald-100", text: "text-emerald-600", border: "border-emerald-200", hoverBg: "hover:bg-emerald-50", light: "bg-emerald-50", badge: "bg-emerald-600" },
  amber: { bg: "bg-amber-100", text: "text-amber-600", border: "border-amber-200", hoverBg: "hover:bg-amber-50", light: "bg-amber-50", badge: "bg-amber-600" },
  pink: { bg: "bg-pink-100", text: "text-pink-600", border: "border-pink-200", hoverBg: "hover:bg-pink-50", light: "bg-pink-50", badge: "bg-pink-600" },
  sky: { bg: "bg-sky-100", text: "text-sky-600", border: "border-sky-200", hoverBg: "hover:bg-sky-50", light: "bg-sky-50", badge: "bg-sky-600" },
};

const whyChooseFeatures = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="7" r="4" /><path d="M5.5 21a6.5 6.5 0 0 1 13 0" /></svg>,
    title: "Industry Expert Mentors",
    desc: "Learn from professionals with real industry experience — not just theoretical trainers reading from a book.",
    color: "blue",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /></svg>,
    title: "Project-Based Learning",
    desc: "Build real websites, apps, and AI projects to create a strong portfolio that impresses employers.",
    color: "indigo",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12" /><path d="M6 8h12" /><path d="m6 13 8.5 8" /><path d="M6 13h3a4 4 0 0 0 0-8" /></svg>,
    title: "Affordable Fees",
    desc: "High-quality training at student-friendly pricing with highly flexible payment options for all.",
    color: "emerald",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="5" /></svg>,
    title: "Career-Focused Training",
    desc: "Resume building, interview prep, and personalized job guidance included in every single course.",
    color: "sky",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    title: "Vision Learn LMS Portal",
    desc: "Our custom-built Learning Management System for 24/7 access to video lectures, notes, and assignments.",
    color: "purple",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 10 3 12 0v-5" /></svg>,
    title: "Government Recognized",
    desc: "All our diploma and certificate programs are recognized, giving your qualification real credibility.",
    color: "amber",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
    title: "Small Batch Sizes",
    desc: "Limited students per batch ensures personalized attention, doubt clearing, and hands-on practice time.",
    color: "pink",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    title: "Certificate & Support",
    desc: "Receive verified certificates upon completion with ongoing support even after course completion.",
    color: "blue",
  },
];

const methodologySteps = [
  { step: "01", title: "Theory Foundation", desc: "Clear conceptual understanding through interactive classroom sessions and visual learning.", icon: "📖" },
  { step: "02", title: "Live Demonstration", desc: "Instructor demonstrates real-world implementation of concepts with live coding sessions.", icon: "💻" },
  { step: "03", title: "Hands-On Practice", desc: "Students practice independently on computers with dedicated lab time and guidance.", icon: "⌨️" },
  { step: "04", title: "Project Building", desc: "Apply skills to real projects — websites, apps, and software — for portfolio building.", icon: "🚀" },
  { step: "05", title: "Assessment & Review", desc: "Regular quizzes, assignments, and project reviews to track progress and fill gaps.", icon: "✅" },
  { step: "06", title: "Certification", desc: "Complete all modules, pass final assessment, and receive your verified digital certificate.", icon: "🎓" },
];

const facilities = [
  { name: "Modern Computer Lab", desc: "Equipped with latest hardware and high-speed internet for seamless learning.", icon: "🖥️" },
  { name: "AC Classrooms", desc: "Comfortable, well-ventilated classrooms designed for focused learning sessions.", icon: "❄️" },
  { name: "High-Speed WiFi", desc: "Uninterrupted internet connectivity for research, practice, and online resources.", icon: "📶" },
  { name: "Digital Library", desc: "Access to e-books, video tutorials, coding resources, and reference materials.", icon: "📚" },
  { name: "Practice Sessions", desc: "Dedicated extra lab hours for students to practice coding and projects independently.", icon: "⏰" },
  { name: "Vision Learn Portal", desc: "24/7 online portal with recorded lectures, notes, assignments, and progress tracking.", icon: "🌐" },
];

const faqs = [
  {
    q: "What courses does Vision IT Computer Institute offer?",
    a: "We offer DCA (Diploma in Computer Application), ADCA (Advanced Diploma), PGDCA (Post Graduate Diploma), Full Stack Web Development, AI & Python Engineering, and basic computer literacy courses.",
  },
  {
    q: "Are the certificates government recognized?",
    a: "Yes, all our diploma programs (DCA, ADCA, PGDCA) are government recognized and widely accepted by employers across India.",
  },
  {
    q: "What is the admission process?",
    a: "Simply visit our institute in Pratappur, fill out the enrollment form, choose your preferred course and batch timing. You can also apply online through our admissions page or contact us via WhatsApp.",
  },
  {
    q: "Do you provide job placement assistance?",
    a: "Yes! We provide resume building workshops, mock interviews, and personalized career guidance. Our goal is to make every student job-ready by the time they complete their course.",
  },
  {
    q: "Can I access study materials online?",
    a: "Absolutely. Through our Vision Learn portal (learn.visionitinstitute.com), enrolled students get 24/7 access to recorded lectures, PDF notes, assignments, and progress tracking.",
  },
  {
    q: "What are the batch timings?",
    a: "We offer flexible batch timings — morning, afternoon, and evening batches to suit students, working professionals, and homemakers. Check our courses page for current batch schedules.",
  },
  {
    q: "Is there any age limit for enrollment?",
    a: "No age limit! We welcome students of all ages — from school students to working professionals and homemakers looking to learn computer skills.",
  },
  {
    q: "What makes Vision IT different from other institutes?",
    a: "Our 90% practical-focused approach, project-based curriculum, small batch sizes, expert mentors with real industry experience, Vision Learn LMS portal, and affordable fees set us apart from traditional computer training centers.",
  },
];


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
    <main className="flex-col w-full bg-slate-50 min-h-screen">

      {/* ════════════════════════════════════════════════════════════
          1. HERO SECTION
      ════════════════════════════════════════════════════════════ */}
      <section className="relative bg-white text-slate-900 rounded-b-[3rem] md:rounded-b-[4rem] overflow-hidden pt-32 pb-24 md:pb-36 px-6 lg:px-8 shadow-sm border-b border-slate-200/80">
        {/* Tech Dot Pattern Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-50 pointer-events-none" />

        {/* Soft Background Gradients */}
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-50/95 via-white/90 to-transparent pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-blue-200/70 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-48 -left-24 w-[400px] h-[400px] bg-indigo-200/60 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-purple-200/30 rounded-full blur-[80px] pointer-events-none" />

        <div className="container mx-auto max-w-5xl text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 bg-blue-50 text-blue-700 font-semibold rounded-full text-xs border border-blue-200/60 shadow-sm cursor-default animate-in fade-in duration-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            Pratappur&apos;s Leading Computer Institute
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4 leading-[1.15] animate-in fade-in slide-in-from-bottom-6 duration-700">
            Shaping Careers at{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Vision IT Institute
            </span>
          </h1>

          <p className="mt-4 text-sm md:text-base text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
            Empowering the next generation of tech leaders through <strong className="text-slate-800">industry-oriented, practical education</strong> that bridges the gap between learning and doing — since our founding in Pratappur.
          </p>

          {/* Enhanced CTAs */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <Button href="/courses" className="w-full sm:w-auto text-sm px-7 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25 rounded-full font-semibold transition-all hover:-translate-y-0.5">
              View Our Courses
            </Button>
            <Button href="/contact" variant="outline" className="w-full sm:w-auto text-sm px-7 h-12 rounded-full font-semibold border border-slate-200 bg-white hover:!border-slate-900 hover:!bg-slate-900 hover:!text-white transition-all hover:-translate-y-0.5">
              Contact Us
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <IconCheck />
              Govt. Recognized
            </span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span className="flex items-center gap-1.5">
              <IconCheck />
              90% Practical
            </span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span className="flex items-center gap-1.5">
              <IconCheck />
              Expert Mentors
            </span>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          2. ABOUT INSTITUTE (Who We Are)
      ════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-slate-50/80 py-20 md:py-28">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100/70 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-50/80 rounded-full blur-[80px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-start">

            {/* Left Column: Text Content */}
            <ScrollReveal className="max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-blue-50 text-blue-700 font-semibold rounded-full text-xs border border-blue-200/60">
                Who We Are
              </div>

              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-2 tracking-tight leading-[1.15]">
                Empowering Future{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Tech Professionals
                </span>
              </h2>

              <div className="space-y-4 text-sm md:text-base text-slate-600 leading-relaxed mt-4">
                <p>
                  <strong className="text-slate-800">Vision IT Computer Institute</strong> is a leading center for technology education in Pratappur, dedicated to shaping the next generation of digital professionals. We bridge the gap between traditional learning and real-world industry demands.
                </p>
                <p>
                  Our programs are crafted with a strong focus on <strong className="text-slate-800">practical, hands-on training</strong>, ensuring students gain real experience — not just theoretical knowledge. From beginners to advanced learners, we provide structured pathways to build confidence, skills, and career readiness.
                </p>
                <p>
                  Whether you want to learn basic computer skills, become a web developer, or explore artificial intelligence — Vision IT has a <strong className="text-slate-800">structured, affordable, and career-focused program</strong> designed just for you.
                </p>
              </div>

              {/* Career Paths */}
              <div className="mt-8">
                <p className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">Popular Career Paths</p>
                <div className="flex flex-wrap gap-2.5">
                  {["DCA", "ADCA", "PGDCA", "Web Development", "AI Engineering"].map((course) => (
                    <span key={course} className="px-4 py-2 text-sm font-semibold bg-white border border-slate-200 text-slate-700 rounded-full hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all cursor-default shadow-sm">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Right Column: Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <IconFlask />, title: "100% Practical", desc: "Focus on lab work and real-world projects over purely theoretical lectures.", color: "blue" },
                { icon: <IconBriefcase />, title: "Industry Ready", desc: "Curriculum designed to meet the current demands of the modern tech job market.", color: "indigo" },
                { icon: <IconUsers />, title: "Expert Mentors", desc: "Learn directly from experienced professionals who guide you every step of the way.", color: "purple" },
                { icon: <IconTrend />, title: "Career Growth", desc: "Structured pathways to build your confidence and upgrade your career trajectory.", color: "emerald" },
              ].map((card, i) => {
                const c = colorStyles[card.color];
                return (
                  <ScrollReveal key={card.title} delay={i * 100} className={`h-full ${i % 2 === 1 ? "sm:mt-4" : ""}`}>
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 h-full">
                      <div className="flex items-center gap-3 mb-2.5">
                        <div className={`w-9 h-9 ${c.bg} ${c.text} rounded-lg flex items-center justify-center shrink-0 [&>svg]:w-5 [&>svg]:h-5`}>
                          {card.icon}
                        </div>
                        <h4 className="text-sm font-semibold text-slate-900 leading-tight">{card.title}</h4>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">{card.desc}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          3. STATS BANNER
      ════════════════════════════════════════════════════════════ */}
      <section className="bg-white border-y border-slate-100 py-8">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: stats.students_trained, label: "Students Trained" },
              { value: stats.expert_mentors, label: "Expert Mentors" },
              { value: stats.practical_learning, label: "Practical Learning" },
              { value: stats.courses_offered, label: "Courses Offered" },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 100}>
                <div className="text-center group">
                  <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 font-semibold mt-1 uppercase tracking-wide">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          4. MISSION & VISION
      ════════════════════════════════════════════════════════════ */}
      <section className="relative bg-white py-20 md:py-28 border-b border-slate-100 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-blue-50/80 to-transparent blur-3xl rounded-full -z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-50 pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 max-w-6xl relative z-10">
          <ScrollReveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-indigo-50 text-indigo-700 font-semibold rounded-full text-xs border border-indigo-200/60">
              Our Purpose
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
              Mission & Vision
            </h2>
            <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Driving excellence in computer education with a relentless focus on real-world skills, innovation, and student success.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission Card */}
            <ScrollReveal className="h-full">
              <div className="group relative bg-white p-6 md:p-8 rounded-3xl border border-slate-200 hover:border-blue-200 shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-2 transition-all duration-500 flex flex-col text-left overflow-hidden z-10 h-full">
                <div className="absolute -bottom-6 -right-6 text-[12rem] font-black text-slate-50 opacity-50 group-hover:text-blue-50 group-hover:-translate-y-4 group-hover:-translate-x-4 transition-all duration-700 pointer-events-none z-0 leading-none">01</div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                <div className="flex items-center gap-3.5 mb-4 relative z-10">
                  <div className="w-11 h-11 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-3 transition-all duration-300">
                    <IconRocket />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">Our Mission</h3>
                </div>

                <p className="text-slate-600 leading-relaxed text-sm md:text-base relative z-10 mb-4">
                  To deliver <strong className="text-slate-800">industry-relevant, skill-based computer education</strong> that is accessible to all. We focus on practical learning, real-world projects, and career-oriented training to ensure every student is job-ready from day one.
                </p>

                <ul className="space-y-2 relative z-10">
                  {["Practical-first teaching approach", "Affordable & accessible education", "Real-world project experience", "Career readiness from day one"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-slate-600">
                      <IconCheck /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Vision Card */}
            <ScrollReveal delay={200} className="h-full md:mt-8">
              <div className="group relative bg-white p-6 md:p-8 rounded-3xl border border-slate-200 hover:border-indigo-200 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-2 transition-all duration-500 flex flex-col text-left overflow-hidden z-10 h-full">
                <div className="absolute -bottom-6 -right-6 text-[12rem] font-black text-slate-50 opacity-50 group-hover:text-indigo-50 group-hover:-translate-y-4 group-hover:-translate-x-4 transition-all duration-700 pointer-events-none z-0 leading-none">02</div>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                <div className="flex items-center gap-3.5 mb-4 relative z-10">
                  <div className="w-11 h-11 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white group-hover:-rotate-3 transition-all duration-300">
                    <IconGlobe />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">Our Vision</h3>
                </div>

                <p className="text-slate-600 leading-relaxed text-sm md:text-base relative z-10 mb-4">
                  To become a <strong className="text-slate-800">leading hub of digital education</strong>, empowering students with the skills, confidence, and mindset needed to thrive in the global technology landscape and become future innovators.
                </p>

                <ul className="space-y-2 relative z-10">
                  {["Digital education leadership", "Global technology skills", "Innovation-driven mindset", "Empowering future leaders"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-slate-600">
                      <IconCheck /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          5. COURSE PROGRAMS EXPLAINED
      ════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-200/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-200/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 max-w-6xl relative z-10">
          <ScrollReveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-purple-50 text-purple-700 font-semibold rounded-full text-xs border border-purple-200/60">
              What We Offer
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
              Our Course <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Programs Explained</span>
            </h2>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Each program is carefully designed with industry standards in mind. Choose the right path for your career goals.
            </p>
          </ScrollReveal>

          <div className="space-y-5">
            {coursePrograms.map((course, i) => {
              const c = colorStyles[course.color];
              return (
                <ScrollReveal key={course.name} delay={i * 100}>
                  <div className={`bg-white rounded-2xl border border-slate-200/80 shadow-sm ${c.hoverBg} hover:shadow-md transition-all duration-300 overflow-hidden group`}>
                    <div className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                        {/* Course badge & name */}
                        <div className="shrink-0">
                          <div className={`inline-flex items-center gap-2 px-3 py-1.5 ${c.badge} text-white rounded-lg text-xs font-bold shadow-sm`}>
                            {course.name}
                          </div>
                          <p className="text-[10px] text-slate-400 font-semibold mt-2 uppercase tracking-wider">{course.duration}</p>
                        </div>

                        {/* Details */}
                        <div className="flex-grow">
                          <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2">{course.fullName}</h3>
                          <p className="text-sm text-slate-500 leading-relaxed mb-4">{course.desc}</p>

                          {/* Topics */}
                          <div className="flex flex-wrap gap-2">
                            {course.topics.map((topic) => (
                              <span key={topic} className={`px-3 py-1 ${c.light} ${c.text} text-xs font-semibold rounded-full border ${c.border}`}>
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal className="text-center mt-8" delay={150}>
            <Button href="/courses" className="px-7 h-11 bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5 hover:shadow-xl inline-flex items-center gap-2 group border-none">
              Explore All Courses <IconArrow />
            </Button>
          </ScrollReveal>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          6. LEARNING METHODOLOGY
      ════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 max-w-5xl relative z-10">
          <ScrollReveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-emerald-50 text-emerald-700 font-semibold rounded-full text-xs border border-emerald-200/60">
              How We Teach
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
              Our Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">Methodology</span>
            </h2>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
              We follow a proven 6-step methodology that ensures deep understanding and practical mastery of every concept.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {methodologySteps.map((s, i) => (
              <ScrollReveal key={s.step} delay={(i % 3) * 100} className="h-full">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-xs shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                      {s.step}
                    </div>
                    <span className="text-xl">{s.icon}</span>
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          7. WHY CHOOSE US (8 Features)
      ════════════════════════════════════════════════════════════ */}
      <section className="relative bg-slate-50 py-20 md:py-28 overflow-hidden border-t border-slate-100">
        <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-blue-50/60 to-transparent pointer-events-none" />
        <div className="absolute -left-40 top-40 w-96 h-96 bg-indigo-100/40 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
          <ScrollReveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-sky-50 text-sky-700 font-semibold rounded-full text-xs border border-sky-200/60">
              Why Us?
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
              Why Students <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Choose Us</span>
            </h2>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Not just courses — we build careers with practical skills, real projects, and industry-focused training.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyChooseFeatures.map((f, i) => {
              const c = colorStyles[f.color];
              return (
                <ScrollReveal key={f.title} delay={(i % 4) * 100} className="h-full">
                  <div className={`group relative bg-white border border-slate-200 rounded-2xl p-6 text-left shadow-sm hover:shadow-lg hover:-translate-y-1 hover:${c.border} transition-all duration-400 h-full`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 ${c.bg} ${c.text} rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:${c.badge} group-hover:text-white transition-all duration-300 [&>svg]:w-5 [&>svg]:h-5`}>
                        {f.icon}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 tracking-tight">{f.title}</h4>
                    </div>
                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          8. INFRASTRUCTURE & FACILITIES
      ════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <ScrollReveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-amber-50 text-amber-700 font-semibold rounded-full text-xs border border-amber-200/60">
              Our Infrastructure
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
              World-Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Facilities</span>
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
              We invest in creating the best learning environment so you can focus entirely on building your skills.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {facilities.map((f, i) => (
              <ScrollReveal key={f.name} delay={(i % 3) * 100} className="h-full">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group h-full">
                  <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
                  <h3 className="text-sm md:text-base font-semibold text-slate-900 mb-2">{f.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          9. OUR TEAM
      ════════════════════════════════════════════════════════════ */}
      <section className="relative bg-slate-50 py-20 md:py-28 border-t border-slate-100 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-blue-50/70 to-transparent blur-3xl rounded-full -z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-50 pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
          <ScrollReveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-purple-50 text-purple-700 font-semibold rounded-full text-xs border border-purple-200/60">
              Our Mentors
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
              Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Expert Team</span>
            </h2>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Learn from passionate mentors who bring real industry experience into the classroom to help you succeed.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {faculty.map((member: any, i: number) => {
              const teamColorMap: Record<string, { from: string; to: string; text: string; glow: string; hoverBorder: string; hoverText: string }> = {
                blue: { from: "from-blue-50/50", to: "to-transparent", text: "text-blue-600", glow: "from-blue-200 to-indigo-100", hoverBorder: "hover:border-blue-200", hoverText: "group-hover:text-blue-600" },
                indigo: { from: "from-indigo-50/50", to: "to-transparent", text: "text-indigo-600", glow: "from-indigo-200 to-purple-100", hoverBorder: "hover:border-indigo-200", hoverText: "group-hover:text-indigo-600" },
                sky: { from: "from-sky-50/50", to: "to-transparent", text: "text-sky-600", glow: "from-sky-200 to-blue-100", hoverBorder: "hover:border-sky-200", hoverText: "group-hover:text-sky-600" },
                pink: { from: "from-pink-50/50", to: "to-transparent", text: "text-pink-600", glow: "from-pink-200 to-rose-100", hoverBorder: "hover:border-pink-200", hoverText: "group-hover:text-pink-600" },
              };

              const colors = teamColorMap[member.color as string] || teamColorMap.blue;

              return (
                <ScrollReveal key={member.id} delay={(i % 3) * 100} className="h-full">
                  <div className={`group relative bg-white rounded-3xl p-6 text-center border border-slate-200 shadow-sm hover:shadow-xl ${colors.hoverBorder} transition-all duration-500 overflow-hidden flex flex-col h-full`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.from} ${colors.to} opacity-0 group-hover:opacity-100 transition duration-500 -z-10`} />

                    <div className="relative w-20 h-20 mx-auto mb-4">
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${colors.glow} blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500`} />
                      <div className={`relative w-full h-full rounded-full bg-white border-2 border-slate-100 flex items-center justify-center text-2xl font-black ${colors.text} shadow-sm group-hover:scale-105 transition-all duration-300 overflow-hidden`}>
                        {member.image ? (
                          <Image src={member.image} alt={member.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                        ) : (
                          member.initials
                        )}
                      </div>
                    </div>

                    <h4 className={`text-base md:text-lg font-semibold text-slate-900 mb-1 ${colors.hoverText} transition-colors`}>
                      {member.name}
                    </h4>
                    <p className="font-semibold mb-2 text-slate-500 text-xs tracking-wider uppercase">
                      {member.role}
                    </p>

                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-4 flex-grow">
                      {member.bio}
                    </p>

                    <div className="mt-auto pt-4 border-t border-slate-100">
                      <div className="flex flex-wrap justify-center gap-2 text-[11px] font-semibold mb-3">
                        {member.tags.map((tag: string, idx: number) => (
                          <span key={idx} className="px-2.5 py-1 bg-slate-50 text-slate-600 border border-slate-200 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-center gap-3 text-slate-400">
                        <a href={member.instagram} className={`hover:${colors.text} transition-colors`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          10. FAQ SECTION
      ════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
          <ScrollReveal className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-amber-50 text-amber-700 font-semibold rounded-full text-xs border border-amber-200/60">
              Got Questions?
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-3">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Questions</span>
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
              Everything you need to know about Vision IT Computer Institute and our programs.
            </p>
          </ScrollReveal>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <ScrollReveal key={faq.q} delay={(i % 4) * 50}>
                <details className="group bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden hover:border-slate-200 transition-colors">
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-sm font-semibold text-slate-800 select-none list-none">
                    <span>{faq.q}</span>
                    <svg className="w-5 h-5 text-slate-400 transition-transform duration-300 group-open:rotate-180 shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-4 text-xs md:text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          11. BOTTOM CTA
      ════════════════════════════════════════════════════════════ */}
      <ScrollReveal className="container mx-auto px-6 lg:px-8 max-w-4xl pb-16 md:pb-24">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -right-24 -top-24 w-72 h-72 bg-blue-600/30 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -left-24 -bottom-24 w-72 h-72 bg-indigo-600/30 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-white/10 text-blue-300 font-semibold rounded-full text-xs border border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Admissions Open
            </div>

            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 tracking-tight">
              Ready to Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Career?</span>
            </h2>
            <p className="text-slate-300 text-sm md:text-base mb-8 max-w-lg mx-auto leading-relaxed">
              Admissions for our upcoming batches are now open. Don&apos;t miss your chance to learn from the best computer institute in Pratappur.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/admissions"
                className="w-full sm:w-auto px-7 h-12 bg-white text-slate-900 hover:bg-blue-600 hover:text-white shadow-lg rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 group border-none"
              >
                Join Now <IconArrow />
              </Link>
              <a
                href="https://wa.me/918103170595"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 h-12 bg-white/10 text-white hover:bg-[#25D366] hover:text-white border border-slate-700 hover:border-[#25D366] rounded-full flex items-center justify-center gap-2 font-semibold text-sm shadow-sm transition-all duration-300 backdrop-blur-md active:scale-[0.98] outline-none"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            <p className="text-xs text-slate-400 mt-6">
              Or explore our{" "}
              <Link href="/learn" className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors">
                Vision Learn Portal
              </Link>{" "}
              for online learning
            </p>
          </div>
        </div>
      </ScrollReveal>

    </main>
  );
}