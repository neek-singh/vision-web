"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Monitor, School, Wifi, BookOpen, Clock, Globe } from "lucide-react";

/* ─── Icon Components ─── */
const IconRocket = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
);
const IconGlobe = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
);
const IconCheck = () => (
  <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
);
const IconArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
);

const AvatarIcon = ({ gradient, className = "w-14 h-14" }: { gradient: string; className?: string }) => {
  return (
    <div className={`${className} rounded-full bg-gradient-to-tr ${gradient} flex items-center justify-center text-white shadow-inner shrink-0`}>
      <svg className="w-1/2 h-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0z" />
      </svg>
    </div>
  );
};

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
  { name: "Computer Lab", desc: "Equipped with latest hardware and high-speed internet for seamless learning.", icon: <Monitor className="w-5 h-5 text-blue-600" /> },
  { name: "Classrooms", desc: "Comfortable, well-ventilated classrooms designed for focused learning sessions.", icon: <School className="w-5 h-5 text-blue-600" /> },
  { name: "WiFi", desc: "Uninterrupted internet connectivity for research, practice, and online resources.", icon: <Wifi className="w-5 h-5 text-blue-600" /> },
  { name: "Digital Library", desc: "Access to e-books, video tutorials, coding resources, and reference materials.", icon: <BookOpen className="w-5 h-5 text-blue-600" /> },
  { name: "Practice Sessions", desc: "Dedicated extra lab hours for students to practice coding and projects independently.", icon: <Clock className="w-5 h-5 text-blue-600" /> },
  { name: "Vision Learn Portal", desc: "24/7 online portal with recorded lectures, notes, assignments, and progress tracking.", icon: <Globe className="w-5 h-5 text-blue-600" /> },
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

interface AboutDynamicSectionsProps {
  faculty: any[];
}

export default function AboutDynamicSections({ faculty }: AboutDynamicSectionsProps) {
  const [selectedMentor, setSelectedMentor] = useState<any>(null);

  const mentorsList = [
    {
      name: "Miss Geeta",
      role: "DCA Instructor",
      qualification: "ADCA",
      experience: "1 Year Experience",
      specialty: "DCA",
      specialtyColor: "text-blue-600 bg-blue-50 border-blue-200",
      gradient: "from-blue-500 to-indigo-600",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
      bio: "Passionate about programming and software fundamentals. Geeta specializes in guiding DCA and ADCA students through core office automation, logic building, database management, and programming languages.",
      skills: ["C/C++", "Python", "MS Office", "Tally ERP", "Database Management", "Logic Building", "Student Counseling"]
    },
    {
      name: "Mr. Dev Kumar",
      role: "DCA & PGDCA Instructor",
      qualification: "MCA",
      experience: "2 Years Experience",
      specialty: "DCA & PGDCA",
      specialtyColor: "text-purple-600 bg-purple-50 border-purple-200",
      gradient: "from-purple-500 to-pink-600",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
      bio: "A seasoned software developer and academic advisor. Dev coordinates our post-graduate computer application courses, focusing on system architecture, database administration, and software engineering principles.",
      skills: ["Java Development", "C++ Programming", "Software Engineering", "DBMS & SQL", "System Architecture", "Project Mentorship", "Career Coaching"]
    },
    {
      name: "Miss Ruchi",
      role: "Web Development Instructor",
      qualification: "BCA",
      experience: "1 Year Experience",
      specialty: "Web Development",
      specialtyColor: "text-sky-600 bg-sky-50 border-sky-200",
      gradient: "from-sky-500 to-emerald-600",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
      bio: "Specializes in modern front-end frameworks and responsive web design. Ruchi helps MCA and web development students master client-side technologies, creating highly performant and user-centric web applications.",
      skills: ["HTML5 & CSS3", "JavaScript (ES6+)", "React.js & Next.js", "Tailwind CSS", "Git & GitHub", "UI/UX Design", "Responsive Layouts"]
    }
  ];

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          4. MISSION & VISION
      ════════════════════════════════════════════════════════════ */}
      {/* ════════════════════════════════════════════════════════════
          4. PURPOSE & FUTURE
      ════════════════════════════════════════════════════════════ */}
      <section className="relative bg-white py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-slate-100 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Column: Text & Content */}
            <ScrollReveal className="space-y-6 text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                Our Purpose & Future
              </h2>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
                We are committed to excellence in IT education and career transformation, building leaders for the digital age.
              </p>
            </ScrollReveal>

            {/* Right Column: Visual Image Asset */}
            <ScrollReveal className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-slate-200/50 bg-white">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
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
          5. MISSION & VISION
      ════════════════════════════════════════════════════════════ */}
      <section id="mission" className="relative bg-slate-50/50 py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-slate-100 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Mission Card */}
            <ScrollReveal className="bg-white border border-slate-200/80 rounded-3xl p-8 text-left relative overflow-hidden group hover:shadow-md hover:border-slate-300 transition-all duration-300">
              <div className="space-y-4">
                {/* Icon Box */}
                <div className="w-11 h-11 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-all duration-300">
                  <IconRocket />
                </div>
                <h3 className="text-lg font-serif font-bold text-slate-900 tracking-tight">
                  Our Mission
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  To provide unparalleled technical education that fosters excellence and ensures absolute employability. We strive to empower students with cutting-edge skills, robust problem-solving capabilities, and the professional acumen required to thrive in the dynamic IT sector.
                </p>
              </div>
            </ScrollReveal>

            {/* Vision Card */}
            <ScrollReveal className="bg-white border border-slate-200/80 rounded-3xl p-8 text-left relative overflow-hidden group hover:shadow-md hover:border-slate-300 transition-all duration-300">
              <div className="space-y-4">
                {/* Icon Box */}
                <div className="w-11 h-11 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-all duration-300">
                  <IconGlobe />
                </div>
                <h3 className="text-lg font-serif font-bold text-slate-900 tracking-tight">
                  Our Vision
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  To cultivate a globally competitive workforce through a 100% placement-oriented curriculum. We envision a future where every Vision IT graduate is a recognized leader in technology innovation, driving progress across industries worldwide.
                </p>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          6. CORE VALUES
      ════════════════════════════════════════════════════════════ */}
      <section className="relative bg-slate-50 py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-slate-100 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center relative z-10">

          <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
              Core Values
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal max-w-2xl mx-auto">
              The principles that guide our institutional approach and student development.
            </p>
          </ScrollReveal>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Integrity Card */}
            <ScrollReveal className="bg-white border border-slate-200/80 rounded-2xl p-6 text-center group hover:shadow-md hover:border-slate-350 transition-all duration-300">
              <div className="space-y-3">
                {/* Icon (Scales/Gavel) */}
                <div className="text-blue-600 w-8 h-8 mx-auto flex items-center justify-center shrink-0">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
                </div>
                <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                  Integrity
                </h4>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  Maintaining the highest standards of academic honesty and professional ethics in all endeavors.
                </p>
              </div>
            </ScrollReveal>

            {/* Innovation Card */}
            <ScrollReveal className="bg-white border border-slate-200/80 rounded-2xl p-6 text-center group hover:shadow-md hover:border-slate-350 transition-all duration-300">
              <div className="space-y-3">
                {/* Icon (Lightbulb) */}
                <div className="text-blue-600 w-8 h-8 mx-auto flex items-center justify-center shrink-0">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                </div>
                <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                  Innovation
                </h4>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  Embracing new technologies and pedagogical methods to stay ahead of industry curves.
                </p>
              </div>
            </ScrollReveal>

            {/* Impact Card */}
            <ScrollReveal className="bg-white border border-slate-200/80 rounded-2xl p-6 text-center group hover:shadow-md hover:border-slate-350 transition-all duration-300">
              <div className="space-y-3">
                {/* Icon (Growth Arrow) */}
                <div className="text-blue-600 w-8 h-8 mx-auto flex items-center justify-center shrink-0">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                </div>
                <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                  Impact
                </h4>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  Measuring our true success through student career growth and positive societal contribution.
                </p>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          7. WHY CHOOSE US (8 Features)
      ════════════════════════════════════════════════════════════ */}
      <section className="relative bg-slate-50 py-20 md:py-28 overflow-hidden border-t border-slate-100">
        <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-blue-50/60 to-transparent pointer-events-none" />
        <div className="absolute -left-40 top-40 w-96 h-96 bg-indigo-100/40 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
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

          <ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {whyChooseFeatures.map((f, i) => {
                const c = colorStyles[f.color];
                return (
                  <div key={f.title} className={`group relative bg-white border border-slate-200 rounded-2xl p-6 text-left shadow-sm hover:shadow-lg hover:-translate-y-1 hover:${c.border} transition-all duration-400 h-full`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 ${c.bg} ${c.text} rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:${c.badge} group-hover:text-white transition-all duration-300 [&>svg]:w-5 [&>svg]:h-5`}>
                        {f.icon}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 tracking-tight">{f.title}</h4>
                    </div>
                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          8. MEET OUR EXPERT MENTORS
      ════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
              Meet Our Expert Mentors
            </h2>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Learn from industry veterans with decades of experience in software engineering, design, and data science.
            </p>
          </ScrollReveal>

          <ScrollReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentorsList.map((mentor) => (
              <div
                key={mentor.name}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-4"
              >
                {/* Avatar + Name/Role */}
                <div className="flex items-center gap-4">
                  <AvatarIcon gradient={mentor.gradient} className="w-14 h-14" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{mentor.name}</p>
                    <p className="text-xs text-blue-600 font-medium leading-snug mt-0.5">{mentor.role}</p>
                  </div>
                </div>

                {/* Specialty badge */}
                <span className={`self-start text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full border ${mentor.specialtyColor}`}>
                  {mentor.specialty}
                </span>

                {/* Profile Details in Card */}
                <div className="text-xs text-slate-500 space-y-1.5 border-t border-slate-100 pt-3 mt-1 text-left">
                  <div className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{mentor.experience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                    <span className="truncate">{mentor.qualification}</span>
                  </div>
                </div>

                {/* View Profile button */}
                <button
                  onClick={() => setSelectedMentor(mentor)}
                  className="w-full mt-auto text-sm font-semibold text-slate-700 border border-slate-300 rounded-xl py-2 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 cursor-pointer"
                >
                  View Profile
                </button>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          9. INFRASTRUCTURE & FACILITIES
      ════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <ScrollReveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-amber-50 text-amber-700 font-semibold rounded-full text-xs border border-amber-200/60">
              Our Infrastructure
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
              Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Facilities</span>
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
              We invest in creating the best learning environment so you can focus entirely on building your skills.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {facilities.map((f, i) => (
                <div key={f.name} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg hover:-translate-y-1 hover:border-blue-200 transition-all duration-400 flex flex-col justify-between group h-full text-left">
                  <div>
                    {/* Icon Box */}
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 shrink-0 shadow-sm group-hover:scale-105 transition-all duration-300">
                      {f.icon}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 tracking-tight">
                      {f.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          10. FAQ SECTION
      ════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
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

          <ScrollReveal>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details key={faq.q} className="group bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden hover:border-slate-200 transition-colors">
                  <summary className="flex items-center justify-between cursor-pointer px-4 sm:px-6 py-4 text-sm font-semibold text-slate-800 select-none list-none">
                    <span className="pr-4">{faq.q}</span>
                    <svg className="w-5 h-5 text-slate-400 transition-transform duration-300 group-open:rotate-180 shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-4 text-xs md:text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          11. BOTTOM CTA
      ════════════════════════════════════════════════════════════ */}
      <ScrollReveal className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl pb-12 md:pb-16 md:pb-24">
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
              Inquiries Open
            </div>

            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 tracking-tight">
              Ready to Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Career?</span>
            </h2>
            <p className="text-slate-300 text-sm md:text-base mb-8 max-w-lg mx-auto leading-relaxed">
              Inquiries for our upcoming batches are now open. Don&apos;t miss your chance to learn from the best computer institute in Pratappur.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/inquiry"
                className="w-full sm:w-auto px-7 h-12 bg-white text-slate-900 hover:bg-blue-600 hover:text-white shadow-lg rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 group border-none"
              >
                Inquire Now <IconArrow />
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

      {/* Mentor Profile Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 transition-all duration-300 animate-in fade-in">
          {/* Overlay click to close */}
          <div className="absolute inset-0" onClick={() => setSelectedMentor(null)} />

          {/* Modal Content */}
          <div className="relative bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-100 flex flex-col z-10 animate-in fade-in zoom-in-95 duration-200 p-6">

            {/* Close Button in corner */}
            <button
              onClick={() => setSelectedMentor(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-all duration-200 cursor-pointer focus-visible:outline-none z-20"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Avatar container */}
            <div className="mb-4 flex flex-col items-start">
              <AvatarIcon gradient={selectedMentor.gradient} className="w-24 h-24" />
            </div>

            {/* Details Section */}
            <div className="text-left space-y-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 leading-tight">{selectedMentor.name}</h3>
                <p className="text-xs text-blue-600 font-bold tracking-wide uppercase mt-0.5">{selectedMentor.role}</p>
              </div>

              <div className="grid grid-cols-1 gap-2 pt-2 border-t border-slate-100 text-xs text-slate-650">
                <div className="flex items-center gap-2">
                  <svg className="w-4.5 h-4.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                  <span>{selectedMentor.qualification}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4.5 h-4.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{selectedMentor.experience}</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-450 tracking-wider">Biography</span>
                <p className="text-xs sm:text-sm text-slate-550 leading-relaxed font-normal">{selectedMentor.bio}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-450 tracking-wider">Expertise & Skills</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedMentor.skills.map((skill: string) => (
                    <span
                      key={skill}
                      className="text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-50 border border-slate-200/60 text-slate-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
