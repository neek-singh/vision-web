"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  ShieldCheck, 
  Building, 
  Compass, 
  ChevronDown, 
  CheckCircle2, 
  ArrowRight,
  MapPin,
  Mail,
  Phone
} from "lucide-react";

export default function JDUAboutPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "faculties" | "advantage" | "admission">("overview");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const stats = [
    { label: "Recognized Status", value: "UGC Approved", icon: ShieldCheck, color: "text-emerald-600 bg-emerald-50" },
    { label: "Total Courses", value: "41+ Programs", icon: BookOpen, color: "text-blue-600 bg-blue-50" },
    { label: "Academic Streams", value: "6 Departments", icon: Building, color: "text-violet-600 bg-violet-50" },
    { label: "Scholarships", value: "100% Scholarship Support", icon: Award, color: "text-amber-600 bg-amber-50" },
  ];

  const departments = [
    {
      name: "Arts & Humanities",
      desc: "Comprehensive study of literature, history, and social sciences to foster critical thinking.",
      courses: ["Bachelor of Arts (BA)", "Master of Arts (MA)", "Bachelor of Library Science (B.Lib)", "Master of Library Science (M.Lib)"],
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=500&auto=format&fit=crop",
      color: "from-violet-500 to-purple-600"
    },
    {
      name: "Science & Technology",
      desc: "Hands-on research and practical training across physics, chemistry, biology, and computer applications.",
      courses: ["B.Sc General", "B.Sc Biotechnology", "B.Sc Forensic Science", "B.Sc Data Science", "B.Sc Microbiology", "B.Sc Bioinformatics", "M.Sc Physics/Chemistry/Maths", "M.Sc Microbiology/Botany/Zoology"],
      image: "https://images.unsplash.com/photo-1532094349884-543559cf2c67?q=80&w=500&auto=format&fit=crop",
      color: "from-emerald-500 to-teal-600"
    },
    {
      name: "Engineering & IT",
      desc: "Cutting-edge curriculum focusing on software development, computing applications, and system design.",
      courses: ["Bachelor of Computer Applications (BCA)", "Master of Computer Applications (MCA)", "B.Tech Computer Science Engineering", "B.Tech Information Technology"],
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=500&auto=format&fit=crop",
      color: "from-blue-500 to-indigo-600"
    },
    {
      name: "Management & Commerce",
      desc: "Developing leaders of tomorrow with essential business skills, marketing strategies, and trade knowledge.",
      courses: ["Bachelor of Business Administration (BBA)", "Master of Business Administration (MBA)", "Bachelor of Commerce (B.Com)", "Master of Commerce (M.Com)", "BHMCT (Hotel Management)", "MTTM (Tourism)"],
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=500&auto=format&fit=crop",
      color: "from-indigo-500 to-sky-600"
    },
    {
      name: "Law & Legal Studies",
      desc: "Rigorous legal training focusing on constitutional law, corporate jurisprudence, and judiciary exams preparation.",
      courses: ["Bachelor of Laws (LLB)", "Master of Laws (LLM)", "Integrated BA LLB (5 Years)", "Integrated B.Com LLB (5 Years)"],
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=500&auto=format&fit=crop",
      color: "from-purple-500 to-pink-600"
    },
    {
      name: "Pharmacy & Vocational",
      desc: "Practical medical courses and professional diplomas focusing on healthcare and technical skills.",
      courses: ["Diploma in Pharmacy (D.Pharm)", "Bachelor of Pharmacy (B.Pharm)", "PGDCA", "Diploma in Computer Applications (DCA)", "Fire Service & Operations", "Rural Development"],
      image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=500&auto=format&fit=crop",
      color: "from-rose-500 to-orange-600"
    }
  ];

  const faqs = [
    {
      q: "Is Jagrani Devi University (JDU) recognized by the UGC?",
      a: "Yes, Jagrani Devi University is a fully recognized university established under government regulations and approved by the University Grants Commission (UGC), making its degrees valid for all state and central government job applications, higher studies, and exams."
    },
    {
      q: "What is the benefit of pursuing a JDU degree through Vision IT?",
      a: "By enrolling via Vision IT, students get the benefit of formal university graduation guidance and subject counseling. We assist with the admissions process, documentation, syllabus guides, and competitive exam preparation to help you succeed in your university studies."
    },
    {
      q: "What are the private and regular modes of study?",
      a: "JDU offers courses in both 'Regular' and 'Private' modes. Private mode provides flexible non-collegiate options ideal for students pursuing competitive exams or working professionals, while Regular mode follows standard university enrollment and attendance guidelines."
    },
    {
      q: "How are examinations conducted?",
      a: "Examinations are conducted strictly according to the guidelines of the university, and all examinations will be held at the university campus or university-designated centers. Vision IT acts as a supporting unit to facilitate registration, coordinate schedules, and help download admit cards."
    },
    {
      q: "Are study materials and syllabus guides provided?",
      a: "Yes! Complete academic syllabus details, reference guides, and counseling support are provided to students to help them prepare thoroughly for their academic examinations."
    }
  ];

  return (
    <main className="flex-col w-full bg-slate-50 min-h-screen overflow-x-hidden pt-20">
      
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-900 via-indigo-950 to-slate-900 py-20 lg:py-28 text-white border-b border-indigo-950">
        {/* Decorative lights */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-indigo-200/60 mb-6">
            <Link href="/courses" className="hover:text-white transition-colors font-medium">Courses</Link>
            <ChevronDown className="w-3 h-3 -rotate-90" />
            <Link href="/courses/university" className="hover:text-white transition-colors font-medium">University Courses</Link>
            <ChevronDown className="w-3 h-3 -rotate-90" />
            <span className="text-white font-semibold">About University</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Text content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-xs font-bold text-indigo-300 uppercase tracking-wider">
                <Award className="w-3.5 h-3.5 text-indigo-400" />
                UGC Approved & Government Recognized
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight leading-tight">
                Jagrani Devi <br />
                <span className="bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent">
                  University
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-indigo-100/80 leading-relaxed font-normal max-w-2xl">
                A pioneer in delivering comprehensive higher education. In collaboration with Vision IT Computer Institute, we provide nationally recognized undergraduate, postgraduate, and diploma degrees designed to empower careers with both academic knowledge and practical skills.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/inquiry?type=university"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-violet-600/30 hover:-translate-y-0.5 active:translate-y-0"
                >
                  Apply Online
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/courses/university"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm rounded-xl transition-all"
                >
                  Explore Course Catalog
                </Link>
              </div>
            </div>

            {/* Right Col: Interactive Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-800">
                <Image
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop"
                  alt="University Academic Building"
                  fill
                  className="object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                
                {/* Floating overlay badge */}
                <div className="absolute bottom-6 left-6 bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-white">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Academics</p>
                    <p className="text-sm font-bold text-white">Academic Excellence Partner</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats Strip ─── */}
      <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-4 p-2 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                <p className="text-base font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Navigation Tabs for Details ─── */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          {/* Tab Selector */}
          <div className="flex flex-wrap justify-center border-b border-slate-200 gap-1 sm:gap-2 mb-12">
            {[
              { id: "overview", label: "University Overview", icon: Compass },
              { id: "faculties", label: "Academic Departments", icon: BookOpen },
              { id: "advantage", label: "Vision IT Partnership", icon: Award },
              { id: "admission", label: "Admission & Criteria", icon: GraduationCap },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-5 py-3 border-b-2 font-semibold text-sm transition-all cursor-pointer whitespace-nowrap ${
                    isActive 
                      ? "border-violet-600 text-violet-650" 
                      : "border-transparent text-slate-500 hover:text-slate-950 hover:border-slate-350"
                  }`}
                >
                  <tab.icon className={`w-4.5 h-4.5 ${isActive ? "text-violet-600" : "text-slate-400"}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Contents */}
          <div className="min-h-[400px]">
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start animate-in fade-in duration-300">
                <div className="lg:col-span-7 space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950">
                    A Recognized Hub for Modern & Flexible Education
                  </h2>
                  <p className="text-slate-655 leading-relaxed text-sm sm:text-base">
                    Jagrani Devi University (JDU) was founded with the vision to deliver high-quality, student-centric academic pathways. As an institution of repute, JDU provides accessible education to thousands of students, enabling them to fulfill their career goals.
                  </p>
                  <p className="text-slate-655 leading-relaxed text-sm sm:text-base">
                    The university is fully compliant with UGC guidelines and offers various undergraduate and postgraduate degrees. Under the collaboration model, students at Vision IT get local support for all operations, making it extremely convenient to balance classes and professional preparation.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">UGC Approved Degree</h4>
                        <p className="text-xs text-slate-500 mt-1">Valid across government organizations & UPSC/SSC exams.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Flexible Modes of Study</h4>
                        <p className="text-xs text-slate-500 mt-1">Choice of Regular or Private modes to suit your schedule.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Co-Ed Campus Support</h4>
                        <p className="text-xs text-slate-500 mt-1">Welcoming academic atmosphere catering to all streams.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">University-Held Exams</h4>
                        <p className="text-xs text-slate-500 mt-1">Exams are conducted at the university or official centers according to university guidelines.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-950 mb-6">University Overview</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Institution Type</span>
                      <span className="text-slate-900 font-bold">State Private University</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Recognition</span>
                      <span className="text-slate-900 font-bold">UGC Approved</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Study Mode</span>
                      <span className="text-slate-900 font-bold">Regular / Private</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Affiliation Support</span>
                      <span className="text-slate-900 font-bold">Vision IT Institute, Pratappur</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-slate-500 font-medium">Eligible Regions</span>
                      <span className="text-slate-900 font-bold">All-India Status</span>
                    </div>
                  </div>

                  <div className="mt-8 bg-indigo-50 rounded-2xl p-4 border border-indigo-100 flex gap-3 items-start">
                    <Building className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-indigo-900">Official Facilitator Cell</h4>
                      <p className="text-xs text-indigo-700 mt-1 leading-relaxed">
                        Vision IT acts as the official academic facilitator for admissions, student counseling, and documents verification for JDU programs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "faculties" && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950 mb-3">
                    Academic Streams & Departments
                  </h2>
                  <p className="text-sm text-slate-550 leading-relaxed">
                    Explore undergraduate, postgraduate, and professional courses available at Jagrani Devi University across various departments.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {departments.map((dept, idx) => (
                    <div key={idx} className="bg-white rounded-3xl border border-slate-150 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
                      <div className="relative h-40 w-full overflow-hidden">
                        <Image
                          src={dept.image}
                          alt={dept.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-r ${dept.color} opacity-40`} />
                        <div className="absolute inset-0 bg-slate-950/20" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-base font-bold text-white tracking-tight drop-shadow-md">
                            {dept.name}
                          </h3>
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {dept.desc}
                        </p>
                        <div className="border-t border-slate-100 pt-3">
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Featured Courses</p>
                          <div className="flex flex-wrap gap-1.5">
                            {dept.courses.map((c, i) => (
                              <span key={i} className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 rounded-md text-[10px] font-semibold">
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center pt-8">
                  <Link
                    href="/courses/university"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-violet-650 hover:text-violet-500"
                  >
                    View All 41 University Courses
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            {activeTab === "advantage" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-in fade-in duration-300">
                <div className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950">
                    Academic Guidance & Support Advantage
                  </h2>
                  <p className="text-slate-655 leading-relaxed text-sm sm:text-base">
                    Enrolling in a formal degree program (like BA, BCA, B.Com, or B.Sc) from Jagrani Devi University through Vision IT ensures you receive comprehensive guidance and counselor support throughout your academic journey.
                  </p>
                  
                  <div className="space-y-4 pt-2">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center shrink-0 font-bold text-sm">1</div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Expert Academic Counseling</h4>
                        <p className="text-xs text-slate-500 mt-1">Our counselors help you choose the right stream and coordinate your study plans according to the university guidelines.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center shrink-0 font-bold text-sm">2</div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Syllabus & Material Guidance</h4>
                        <p className="text-xs text-slate-500 mt-1">We assist you in obtaining the latest university syllabus, recommend proper study materials, and guide you through exam patterns.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center shrink-0 font-bold text-sm">3</div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Official Coordination Desk</h4>
                        <p className="text-xs text-slate-500 mt-1">Never worry about important dates. We assist with registration coordination, documents upload, and download of university notifications.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-[#121829] rounded-3xl p-8 text-white space-y-6 relative overflow-hidden border border-slate-800 shadow-xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
                    
                    <h3 className="text-xl font-bold tracking-tight text-white">Why Study Through Vision IT?</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 py-2.5 border-b border-slate-800">
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                        <span className="text-slate-300 text-xs sm:text-sm font-medium">UGC Recognized Degree (JDU)</span>
                      </div>
                      <div className="flex items-center gap-3 py-2.5 border-b border-slate-800">
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                        <span className="text-slate-300 text-xs sm:text-sm font-medium">Official Admission & Documents Support</span>
                      </div>
                      <div className="flex items-center gap-3 py-2.5 border-b border-slate-800">
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                        <span className="text-slate-300 text-xs sm:text-sm font-medium">Academic & Study Syllabus Counseling</span>
                      </div>
                      <div className="flex items-center gap-3 py-2.5 border-b border-slate-800">
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                        <span className="text-slate-300 text-xs sm:text-sm font-medium">100% Scholarship Offers & Schemes for Eligible Candidates</span>
                      </div>
                      <div className="flex items-center gap-3 py-2.5">
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                        <span className="text-slate-300 text-xs sm:text-sm font-medium">Transparent & Simple Fees Processing</span>
                      </div>
                    </div>

                    <Link
                      href="/inquiry?type=university"
                      className="block text-center w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all"
                    >
                      Apply Now for the Current Session
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "admission" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start animate-in fade-in duration-300">
                <div className="lg:col-span-7 space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950">
                    Admission Guidelines & Eligibility
                  </h2>
                  <p className="text-slate-655 leading-relaxed text-sm sm:text-base">
                    Admissions are open for the current academic session for all streams. Our academic counselor assists students in verifying their eligibility and selecting the right program according to their career aspirations.
                  </p>

                  <div className="space-y-4">
                    <h3 className="font-bold text-slate-900 text-base">Key Admission Requirements:</h3>
                    
                    <div className="bg-white border border-slate-100 rounded-2xl p-4 flex gap-3 items-start shadow-sm">
                      <div className="w-6 h-6 rounded-full bg-violet-100 text-violet-650 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">UG</div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Undergraduate Programs (BA, BCA, B.Sc, B.Com, B.Pharm)</h4>
                        <p className="text-xs text-slate-500 mt-1">Candidates must have completed Higher Secondary (10+2) from a recognized board (CBSE, state board, or equivalent) in the relevant stream.</p>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-100 rounded-2xl p-4 flex gap-3 items-start shadow-sm">
                      <div className="w-6 h-6 rounded-full bg-violet-100 text-violet-650 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">PG</div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Postgraduate Programs (MA, M.Sc, MCA, MBA, M.Com, LLM)</h4>
                        <p className="text-xs text-slate-500 mt-1">Candidates must have a valid Bachelor&apos;s degree in the matching stream from a recognized university.</p>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-100 rounded-2xl p-4 flex gap-3 items-start shadow-sm">
                      <div className="w-6 h-6 rounded-full bg-violet-100 text-violet-650 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">Dip</div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Diploma & Vocational Programs (DCA, PGDCA, D.Pharm)</h4>
                        <p className="text-xs text-slate-500 mt-1">Varies between 10th pass, 12th pass, or graduation depending on the specific program. Check details with counselor.</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100 rounded-2xl p-4 flex gap-3 items-start shadow-sm">
                      <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">Sch</div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">100% Scholarship Facility</h4>
                        <p className="text-xs text-slate-500 mt-1">JDU offers up to 100% scholarship opportunities for eligible students based on merit, academic records, or reservation criteria. Consult with our counselor cell desk to check your qualification status.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-950 mb-4">Required Documents</h3>
                  <p className="text-xs text-slate-500 mb-6">Keep photocopies and original documents ready during the counseling and admission session:</p>
                  
                  <ul className="space-y-3.5 text-xs text-slate-700 font-medium">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>10th Marksheet & Certificate</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>12th Marksheet & Certificate</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Graduation Marksheets (for PG courses)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Recent Passport Size Photographs (4 Copies)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Identity Proof (Aadhaar Card, Voter ID, etc.)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Transfer (TC) / Migration Certificate</span>
                    </li>
                  </ul>

                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <Link
                      href="/inquiry?type=university"
                      className="block text-center w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all"
                    >
                      Fill Inquiry Form
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ─── FAQs Section ─── */}
      <section className="bg-white py-16 lg:py-24 border-t border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Have questions about Jagrani Devi University degrees and examinations? Here are answers to common queries.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm transition-all duration-350">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left p-5 font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-violet-600" : ""}`} />
                  </button>
                  <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-96 border-t border-slate-100" : "max-h-0"}`}>
                    <p className="p-5 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/50">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Contact & Location details specifically for JDU cell ─── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="bg-white rounded-3xl border border-slate-200/60 p-8 sm:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center">
                  <Building className="w-6 h-6" />
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950">
                  University Admission Coordinating Cell
                </h2>
                
                <p className="text-slate-650 text-sm leading-relaxed">
                  For physical forms submission, document verification, enrollment fees submission, and academic counseling, visit our university coordination desk at Vision IT Computer Institute.
                </p>

                <div className="space-y-4 text-slate-700 text-xs sm:text-sm pt-2">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-violet-600 shrink-0" />
                    <span>Vision IT Computer Institute, Kadampara Chowk, Pratappur, Surajpur (C.G.) - 497223</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-violet-600 shrink-0" />
                    <span>+91 81031 70595</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-violet-600 shrink-0" />
                    <span>visionitpratappur@gmail.com</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 text-center bg-slate-50 rounded-3xl p-8 border border-slate-200/50">
                <GraduationCap className="w-16 h-16 text-violet-600 mx-auto mb-4" />
                
                <h3 className="text-lg font-bold text-slate-900 mb-2">Ready to Enroll?</h3>
                
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 max-w-md mx-auto">
                  Submit an inquiry with your preferred course and details. Our counseling team will contact you within 24 hours to guide you through document verification and admission.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <Link
                    href="/inquiry?type=university"
                    className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all text-center"
                  >
                    Start Admission Process
                  </Link>
                  <Link
                    href="/contact"
                    className="px-6 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold text-xs sm:text-sm rounded-xl transition-all text-center"
                  >
                    Contact Admission Desk
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
