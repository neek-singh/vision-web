"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Share2,
  Star,
  Clock,
  Award,
  Globe,
  MapPin,
  Check,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Infinity as InfinityIcon,
  Laptop,
  Users,
  Briefcase,
  Keyboard,
  LifeBuoy,
  Wallet,
  Paintbrush,
  Info,
  BookOpen,
  BarChart3
} from "lucide-react";

export default function BasicBeginnerCourseDetailsPage() {
  const [expandedModule, setExpandedModule] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Basic Computer for Beginner Details | Vision IT",
          text: "Check out this Basic Computer for Beginner details at Vision IT Computer Institute.",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        try {
          await navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (_) {}
      }
    }
  };

  const toggleModule = (index: number) => {
    setExpandedModule(expandedModule === index ? null : index);
  };

  const stats = [
    { label: "DURATION", value: "3 Months", icon: Clock },
    { label: "LEVEL", value: "Absolute Beginner", icon: BarChart3 },
    { label: "CERTIFICATION", value: "Certificate", icon: Award },
    { label: "LANGUAGE", value: "Hindi & English", icon: Globe },
    { label: "MODE", value: "Offline", icon: MapPin },
  ];

  const highlights = [
    { title: "Govt. Recognized", desc: "Valid certificate accepted for government jobs and higher studies.", icon: ShieldCheck },
    { title: "70% Practical", desc: "Hands-on learning with real-world examples and lab sessions.", icon: Laptop },
    { title: "Face-to-Face Mentorship", desc: "Direct interaction with instructors in a physical classroom environment.", icon: Users },
    { title: "Placement Assistance", desc: "Resume building and interview preparation support.", icon: Briefcase }
  ];

  const skills = [
    "Switching On & Off Desktop Computers",
    "Proper Mouse Clicks & Keyboard Control",
    "Navigating Desktop & Windows Interface",
    "Creating, Naming & Managing Folders",
    "Using MS Paint for Mouse Coordinates",
    "Writing Simple Letters in MS Word",
    "Opening Web Browsers (Chrome)",
    "Searching Useful Info on Google",
    "Using YouTube for Educational Videos",
    "Creating personal Gmail Accounts",
    "Safe Web Surfing & Ad Awareness",
    "Daily Computer Handling Confidence"
  ];

  const curriculum = [
    {
      title: "Module 1: Computer Basics",
      desc: "Introducing basic physical parts of computer units, mouse/keyboard practice, and safe startup/shutdown procedures.",
      bullets: [
        "How to Start & Shut Down",
        "Using Mouse & Keyboard",
        "Understanding Monitor, CPU & UPS",
        "etc."
      ]
    },
    {
      title: "Module 2: Windows Interface",
      desc: "Getting comfortable with desktop wallpapers, shortcuts, folder trees, and local painting/notes software.",
      bullets: [
        "Understanding Desktop & Icons",
        "Creating Files & Folders",
        "Using Notepad & MS Paint",
        "etc."
      ]
    },
    {
      title: "Module 3: MS Word & Typing",
      desc: "Mastering standard typing layouts, writing text paragraphs, basic formatting, and local document exports.",
      bullets: [
        "Basic Typing Practice",
        "Writing & Saving Documents",
        "Simple Text Formatting",
        "etc."
      ]
    },
    {
      title: "Module 4: Internet & Search",
      desc: "Browsing standard web portals, performing searches, playing video lessons, and online web security basics.",
      bullets: [
        "Opening Web Browsers",
        "Searching on Google & YouTube",
        "Basic Internet Safety",
        "etc."
      ]
    },
    {
      title: "Module 5: Email & Useful Sites",
      desc: "Handling personal communication channels, mail operations, and accessing online resources.",
      bullets: [
        "Creating a Gmail Account",
        "Sending & Reading Emails",
        "Filling Online Forms",
        "etc."
      ]
    },
    {
      title: "Module 6: AI Tools & Smart Work",
      desc: "Introducing conversational AI platforms, voice search helpers, and digital assistants for everyday productivity.",
      bullets: [
        "What is AI?",
        "Asking Questions to ChatGPT",
        "Voice Search & Smart Assistants",
        "etc."
      ]
    }
  ];

  const careerJobs = [
    { name: "Office Assistant", icon: Briefcase },
    { name: "Data Entry Clerk", icon: Keyboard },
    { name: "Front Desk Executive", icon: Users },
    { name: "Freelance Assistant", icon: Globe },
  ];

  const projects = [
    {
      title: "Digital Hand Drawing",
      desc: "Create a complete customized digital drawing in MS Paint using multiple brushes and coordinate shapes."
    },
    {
      title: "First Personal Bio-data",
      desc: "Write, structure, and save a clean personal introduction letter in MS Word with basic styling."
    },
    {
      title: "Personal Email Mailer",
      desc: "Create a personal Gmail account and compose a structured email message with an attachment."
    }
  ];

  const reviews = [
    {
      name: "Kamlesh Kanshi",
      avatarColor: "bg-emerald-600",
      rating: 5,
      date: "2 weeks ago",
      comment: "vision IT is very good, the teachers here are very well behaved. Must visit Vision IT"
    },
    {
      name: "Neek Singh",
      avatarColor: "bg-emerald-800",
      rating: 5,
      date: "2 days ago",
      comment: "Mai yha pahli baar aur mujhe bahut achha lga 🥰, abhi me ms excel, ms Word, ms PowerPoint sikh rha hu."
    },
    {
      name: "Amar Kumar",
      avatarColor: "bg-blue-600",
      rating: 5,
      date: "1 hour ago",
      comment: "Vision it computer center is very good computer center.yha computer ki puri jankari ke sath padhate sikhate hai . Mujhe vision it computer center bahut hi acchha laga 😇"
    }
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offsetTop = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <main className="w-full bg-[#f8fafd] min-h-screen text-slate-800 pb-24">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 px-4 py-3.5 sm:px-8 lg:px-12 xl:px-16 shadow-sm">
        <div className="max-w-full flex items-center justify-between">
          <Link
            href="/courses"
            className="flex items-center gap-2 text-slate-800 hover:text-slate-950 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-semibold text-sm sm:text-base">Course Details</span>
          </Link>
          <div className="relative">
            <button
              onClick={handleShare}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-all cursor-pointer flex items-center justify-center"
              title="Share Course"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {copied && (
              <span className="absolute right-0 top-full mt-1.5 bg-slate-900 text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap shadow-md animate-in fade-in slide-in-from-top-1 duration-200 z-50">
                Link copied!
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="w-full max-w-none px-4 sm:px-8 lg:px-12 xl:px-16 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side Content Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main Image */}
          <div className="aspect-[16/9] w-full rounded-3xl border border-slate-100 shadow-[0_4px_12px_rgba(0,0,0,0.03)] relative overflow-hidden bg-white">
            <Image
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop"
              alt="Basic Computer for Beginner"
              fill
              className="object-cover"
              priority
            />
            {/* Govt Recognized Badge */}
            <span className="absolute bottom-4 left-4 bg-emerald-500 text-white text-[9px] sm:text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md border border-emerald-400/30">
              🎓 Govt. Recognized
            </span>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight leading-tight">
              Basic Computer for Beginner
            </h1>
          </div>

          {/* Stat Badges Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {stats.map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex flex-col items-center text-center justify-center space-y-2 hover:shadow-md transition-all duration-300"
                >
                  <StatIcon className="w-6 h-6 text-black stroke-[1.8] flex-shrink-0" />
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    {stat.label}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-slate-900 leading-none">
                    {stat.value}
                  </span>
                </div>
              );
            })}
          </div>

          {/* About the Course Card */}
          <section id="about" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)] space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">
              About the Course
            </h2>
            <p className="text-black text-sm sm:text-base leading-relaxed font-normal">
              The Basic Computer for Beginner course is a 3-month offline program designed specifically for absolute beginners who have never touched a computer. We guide you step-by-step from switching on the computer to basic internet browsing, writing documents, and digital safety.
            </p>
          </section>

          {/* Eligibility Section */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)] space-y-3">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">
              Eligibility Criteria
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              Open for all absolute beginners of any age group (minimum 5th standard or above). No prior education, computer knowledge, or technical skills are required.
            </p>
          </section>

          {/* Course Highlights */}
          <section id="highlights-sec" className="space-y-5">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">
              Course Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {highlights.map((item, idx) => {
                const HighlightIcon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex items-start gap-3 hover:shadow-md transition-all duration-300"
                  >
                    <HighlightIcon className="w-5 h-5 text-emerald-650 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-black mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* What You'll Learn Card */}
          <section id="learn-sec" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)] space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">
                What You'll Learn
              </h2>
              
              <div className="space-y-3">
                <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                  Skills You Will Master
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {skills.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-black text-sm sm:text-base leading-snug font-normal">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Curriculum Section */}
          <section id="curriculum" className="space-y-5">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">
              Curriculum
            </h2>
            <div className="space-y-3">
              {curriculum.map((mod, idx) => {
                const isOpen = expandedModule === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200/60 rounded-2xl overflow-hidden bg-white shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                  >
                    <button
                      onClick={() => toggleModule(idx)}
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-semibold text-slate-800 hover:bg-slate-50 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base">{mod.title}</span>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="border-t border-slate-100 p-5 bg-[#fafcfd]/50 space-y-4 animate-in fade-in duration-200">
                        <p className="text-black text-sm sm:text-base leading-relaxed font-normal">
                          {mod.desc}
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-slate-950 font-normal">
                          {mod.bullets.map((bullet, bIdx) => (
                            <li key={bIdx}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Career Opportunities */}
          <section id="careers" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)] space-y-6">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">
              Career Opportunities
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {careerJobs.map((job, idx) => {
                const JobIcon = job.icon;
                return (
                  <div
                    key={idx}
                    className="bg-[#f8fafd]/50 p-5 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center space-y-3 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-8 h-8 text-black flex items-center justify-center flex-shrink-0">
                      <JobIcon className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    <span className="text-slate-955 text-xs sm:text-sm font-semibold leading-snug">
                      {job.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Hands-on Projects */}
          <section id="projects-sec" className="space-y-5">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">
              Hands-on Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)] space-y-2 flex flex-col hover:shadow-md transition-all duration-300"
                >
                  <h3 className="font-semibold text-slate-955 text-sm sm:text-base leading-snug">
                    {proj.title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
                    {proj.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Course Fees Card */}
          <section id="fees-sec" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)] space-y-5">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight mb-1">
                Course Fees
              </h2>
              <p className="text-slate-500 text-sm font-normal">
                Simple, transparent pricing. Invest in your career today.
              </p>
            </div>

            <div className="bg-blue-50/20 border border-blue-100 p-5 rounded-2xl space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-slate-400 font-semibold line-through">
                    ₹4,999
                  </span>
                  <span className="text-xl font-bold text-slate-900">
                    ₹2,999
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    /total
                  </span>
                </div>
                <span className="bg-black text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                  SAVE 40%
                </span>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100/60 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span>Admission Fee</span>
                  <span className="text-slate-800 font-medium">₹500</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span>Tuition Fee</span>
                  <span className="text-slate-800 font-medium">₹2,000</span>
                </div>
                <div className="flex items-center justify-between pb-2">
                  <span>Exam Fee</span>
                  <span className="text-slate-800 font-medium">₹499</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                  <span className="text-slate-955 font-bold">Total Course Fee</span>
                  <span className="text-slate-955 font-bold">₹2,999</span>
                </div>
              </div>
            </div>
          </section>

          {/* Student Reviews */}
          <section id="reviews" className="space-y-5">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">
              Student Reviews
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map((rev, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)] space-y-3.5 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full ${rev.avatarColor} text-white font-extrabold flex items-center justify-center text-sm shadow-inner flex-shrink-0`}>
                      {rev.name[0]}
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-slate-955 leading-tight">
                        {rev.name}
                      </h4>
                      <div className="flex text-amber-400 mt-0.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-950 leading-relaxed font-normal italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Side Sticky Sidebar Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-[0_4px_16px_rgba(0,0,0,0.02)] sticky top-24 space-y-6">
            
            {/* Price Detail */}
            <div className="flex items-baseline gap-2.5">
              <span className="text-xs text-slate-400 font-semibold line-through block leading-none">
                ₹4,999
              </span>
              <span className="text-3xl font-bold text-[#0f172a] block leading-none">
                ₹2,999
              </span>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Link
                href="/inquiry?courseId=a100f278-ea6c-4189-b09b-7d4e7cd9d0e7"
                className="w-full bg-black hover:bg-slate-900 text-white font-semibold py-3.5 px-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 text-center block text-sm cursor-pointer"
              >
                Apply Now
              </Link>
            </div>

            <hr className="border-slate-100" />

            {/* Inclusions */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                COURSE INCLUDES
              </h4>
              <ul className="space-y-3.5 text-sm font-medium text-slate-950">
                <li className="flex items-start gap-3 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100 text-slate-950 italic">
                  <Info className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                  <span>Includes Admission, Tuition, and Exam fees</span>
                </li>
                <li className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-slate-500" />
                  <span>Classroom-based sessions</span>
                </li>
                <li className="flex items-center gap-3">
                  <Laptop className="w-4 h-4 text-slate-500" />
                  <span>Hands-on Lab access</span>
                </li>
                <li className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-slate-500" />
                  <span>Physical Study Material</span>
                </li>
                <li className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-slate-500" />
                  <span>Certificate of completion</span>
                </li>
                <li className="flex items-center gap-3">
                  <InfinityIcon className="w-4 h-4 text-slate-500" />
                  <span>Full lifetime access</span>
                </li>
              </ul>
            </div>

            <hr className="border-slate-100" />

            {/* Quick Links Nav */}
            <div className="flex flex-col gap-2.5 pt-1 text-xs font-semibold text-slate-500">
              <button
                onClick={() => scrollToSection("about")}
                className="text-left hover:text-slate-900 transition-colors cursor-pointer w-fit"
              >
                Overview
              </button>
              <button
                onClick={() => scrollToSection("highlights-sec")}
                className="text-left hover:text-slate-900 transition-colors cursor-pointer w-fit"
              >
                Highlights
              </button>
              <button
                onClick={() => scrollToSection("curriculum")}
                className="text-left hover:text-slate-900 transition-colors cursor-pointer w-fit"
              >
                Curriculum
              </button>
              <button
                onClick={() => scrollToSection("reviews")}
                className="text-left hover:text-slate-900 transition-colors cursor-pointer w-fit"
              >
                Reviews
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Viewport bottom black CTA Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-black text-white py-4 border-t border-slate-800 z-50 shadow-lg px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-full flex flex-col sm:flex-row justify-between items-center gap-3.5">
          <div className="text-center sm:text-left space-y-0.5">
            <h4 className="text-sm font-semibold text-white leading-none">
              Start Your Tech Journey
            </h4>
            <p className="text-slate-400 text-[10px] sm:text-[11px] font-medium leading-none">
              Apply now and get immediate access to all course tutorials.
            </p>
          </div>
          <Link
            href="/inquiry?courseId=a100f278-ea6c-4189-b09b-7d4e7cd9d0e7"
            className="bg-white hover:bg-slate-100 text-black font-semibold text-xs px-6 py-2.5 rounded-xl transition-colors shadow-sm cursor-pointer"
          >
            Apply Now for ₹2,999
          </Link>
        </div>
      </div>
    </main>
  );
}
