"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Share2,
  Clock,
  Award,
  Globe,
  MapPin,
  Check,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Users,
  Briefcase,
  Info,
  BookOpen,
  BarChart3,
  GraduationCap,
  Sun,
  Activity,
  Zap,
  BatteryCharging,
  Cpu,
  TrendingUp,
  FileText,
  Building2,
} from "lucide-react";

export default function DspsCourseDetailsPage() {
  const [expandedModule, setExpandedModule] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "DSPS Course Details | Vision IT",
          text: "Check out the DSPS (Diploma in Solar Power System) course at Vision IT Computer Institute, affiliated with Jagrani Devi University.",
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
    { label: "DURATION", value: "1 Year", icon: Clock },
    { label: "LEVEL", value: "Diploma", icon: BarChart3 },
    { label: "AFFILIATION", value: "JDU Univ.", icon: Award },
    { label: "LANGUAGE", value: "Hindi & English", icon: Globe },
    { label: "MODE", value: "Regular", icon: MapPin },
  ];

  const highlights = [
    { title: "UGC Approved Diploma", desc: "Nationally recognized Diploma valid for government solar projects, PSU tenders, and private green energy sector jobs.", icon: ShieldCheck },
    { title: "JDU Affiliated", desc: "Affiliated with Jagrani Devi University (JDU) — a recognized state university offering quality higher education.", icon: GraduationCap },
    { title: "Hands-on Lab Training", desc: "Practical training on real solar panels, charge controllers, inverters, solar batteries, and netting meters.", icon: Sun },
    { title: "Booming Green Tech Career", desc: "Immense career potential with India's aggressive push towards 500GW renewable energy capacity by 2030.", icon: Briefcase },
  ];

  const skills = [
    "Solar Radiation Physics & PV Basics",
    "PV Module Wiring & Array Mounting Layouts",
    "Solar Inverter, Battery & Charge Controller Calibration",
    "Electrical Load Sizing & Cabling Calculations",
    "Off-Grid, Grid-Tied & Hybrid System Designing",
    "Electrical Safety, Grounding & Earthing Layouts",
    "Solar Water Pump Installation & Calibration",
    "Solar PV Performance Auditing & Troubleshooting",
    "Net Metering & Utility Grid Synchronization Protocols",
    "Solar Project Cost Estimation, BOQ & Financial Sizing",
  ];

  const curriculum = [
    {
      title: "Sem 1 — Solar Energy Fundamentals & Systems",
      desc: "Learn solar energy principles, study photovoltaic cell physics, explore different PV components like batteries, inverters, and charge controllers.",
      bullets: [
        "Photovoltaic Principles & Solar Radiation",
        "Batteries, Inverters & Charge Controllers",
        "Load Sizing & System Design Calculations",
        "Off-Grid & On-Grid PV System Topologies",
        "etc."
      ]
    },
    {
      title: "Sem 2 — Installation, Sizing, Net Metering & Maintenance",
      desc: "Master hands-on panel mounting, electrical safety cabling, net metering interconnection protocols, troubleshooting, and project costing.",
      bullets: [
        "Solar PV Installation & Grounding Procedures",
        "Net Metering & Utility Interconnection",
        "Operation, Maintenance & Troubleshooting",
        "Solar Project Costing & Financial Sizing",
        "etc."
      ]
    },
  ];

  const careerJobs = [
    { name: "Solar PV Installer", icon: Zap },
    { name: "Solar Plant Technician", icon: BatteryCharging },
    { name: "Solar Design Engineer", icon: Cpu },
    { name: "Solar Sales Consultant", icon: Briefcase },
    { name: "Solar Microgrid Operator", icon: Building2 },
    { name: "Maintenance Engineer", icon: Activity },
    { name: "Safety Inspector", icon: ShieldCheck },
    { name: "Solar Entrepreneur", icon: TrendingUp },
  ];

  const projects = [
    {
      title: "Rooftop Off-Grid Sizing Plan",
      desc: "Design a complete off-grid solar system size for a typical residential building, including panel sizing, battery bank, and charge controller specs."
    },
    {
      title: "10kW On-Grid Plant Engineering",
      desc: "Prepare a detailed engineering blueprint, Single Line Diagram (SLD), and structural layout design for a 10kW grid-connected rooftop solar plant."
    },
    {
      title: "Solar Water Pumping Survey",
      desc: "Perform a structural site survey and design a solar-powered water pumping system setup suitable for irrigation in rural fields."
    }
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offsetTop = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <main className="w-full bg-[#f8fafd] min-h-screen text-slate-800 pb-24">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 px-4 py-3.5 sm:px-8 lg:px-12 xl:px-16 shadow-sm">
        <div className="max-w-full flex items-center justify-between">
          <Link
            href="/courses/university"
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
              <span className="absolute right-0 top-full mt-1.5 bg-slate-900 text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap shadow-md z-50">
                Link copied!
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="w-full max-w-none px-4 sm:px-8 lg:px-12 xl:px-16 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Content Column */}
        <div className="lg:col-span-2 space-y-8">

          {/* Hero Banner */}
          <div className="w-full rounded-3xl border border-slate-100 shadow-[0_4px_12px_rgba(0,0,0,0.03)] relative overflow-hidden bg-gradient-to-br from-amber-900 via-yellow-950 to-orange-950 flex flex-col justify-end min-h-[220px] sm:min-h-[280px] p-6 sm:p-8">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:28px_28px]"></div>
            <div className="absolute top-8 right-8 w-40 h-40 bg-yellow-500/15 rounded-full blur-[60px]"></div>
            <div className="absolute bottom-4 left-8 w-32 h-32 bg-amber-500/15 rounded-full blur-[60px]"></div>

            <span className="relative z-10 inline-flex items-center gap-1.5 bg-amber-500/15 text-amber-300 border border-amber-500/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 self-start">
              ☀️ JDU University Affiliated
            </span>

            <div className="relative z-10 space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                Diploma in Solar Power System
              </h1>
              <p className="text-amber-200/80 text-sm sm:text-base font-medium">DSPS — 1 Year Diploma Program</p>
            </div>
          </div>

          {/* Stat Badges */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {stats.map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex flex-col items-center text-center justify-center space-y-2 hover:shadow-md transition-all duration-300">
                  <StatIcon className="w-6 h-6 text-black stroke-[1.8] flex-shrink-0" />
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">{stat.label}</span>
                  <span className="text-base sm:text-lg font-serif font-semibold text-slate-900 leading-none">{stat.value}</span>
                </div>
              );
            })}
          </div>

          {/* About */}
          <section id="about" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)] space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">About the Course</h2>
            <p className="text-black text-sm sm:text-base leading-relaxed font-normal">
              The Diploma in Solar Power System (DSPS) is a professional 1-year UGC-approved diploma course offered at Vision IT Computer Institute in affiliation with Jagrani Devi University (JDU). This course is designed to train electrical, mechanical, and general stream graduates in the principles of solar energy systems, PV module mounting engineering, load sizing calculations, electrical safety wiring, net metering interconnection, troubleshooting, and solar plant commissioning. The program prepares students directly for engineering, installation, and operation and maintenance (O&M) jobs in the rapidly growing solar energy sector.
            </p>
          </section>

          {/* Eligibility */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)] space-y-3">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">Eligibility Criteria</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              Minimum 12th pass (any stream) from a recognized board. Candidates with Science or Technical vocational backgrounds are preferred, but candidates from Arts or Commerce streams are also eligible.
            </p>
          </section>

          {/* Highlights */}
          <section id="highlights-sec" className="space-y-5">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">Course Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {highlights.map((item, idx) => {
                const HighlightIcon = item.icon;
                return (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex items-start gap-3 hover:shadow-md transition-all duration-300">
                    <HighlightIcon className="w-5 h-5 text-amber-650 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-black mb-1">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-normal">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* What You'll Learn */}
          <section id="learn-sec" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)] space-y-6">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">What You&apos;ll Learn</h2>
            <div className="space-y-3">
              <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Skills You Will Master</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {skills.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="text-black text-sm sm:text-base leading-snug font-normal">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Curriculum */}
          <section id="curriculum" className="space-y-5">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">Curriculum (2 Semesters)</h2>
            <div className="space-y-3">
              {curriculum.map((mod, idx) => {
                const isOpen = expandedModule === idx;
                return (
                  <div key={idx} className="border border-slate-200/60 rounded-2xl overflow-hidden bg-white shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                    <button
                      onClick={() => toggleModule(idx)}
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-semibold text-slate-800 hover:bg-slate-50 transition-all duration-200 cursor-pointer"
                    >
                      <span className="text-sm sm:text-base">{mod.title}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                    {isOpen && (
                      <div className="border-t border-slate-100 p-5 bg-[#fafcfd]/50 space-y-4 animate-in fade-in duration-200">
                        <p className="text-black text-sm sm:text-base leading-relaxed font-normal">{mod.desc}</p>
                        <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-slate-950 font-normal">
                          {mod.bullets.map((bullet, bIdx) => <li key={bIdx}>{bullet}</li>)}
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
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">Career Opportunities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {careerJobs.map((job, idx) => {
                const JobIcon = job.icon;
                return (
                  <div key={idx} className="bg-[#f8fafd]/50 p-5 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center space-y-3 hover:shadow-md transition-all duration-300">
                    <div className="w-8 h-8 text-black flex items-center justify-center flex-shrink-0">
                      <JobIcon className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    <span className="text-slate-950 text-xs sm:text-sm font-semibold leading-snug">{job.name}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Projects */}
          <section id="projects-sec" className="space-y-5">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">Practical & Field Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((proj, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)] space-y-2 flex flex-col hover:shadow-md transition-all duration-300">
                  <h3 className="font-semibold text-slate-900 text-sm sm:text-base leading-snug">{proj.title}</h3>
                  <p className="text-slate-900 text-xs sm:text-sm leading-relaxed font-normal">{proj.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Fees */}
          <section id="fees-sec" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)] space-y-5">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight mb-1">Course Fees</h2>
              <p className="text-slate-500 text-sm font-normal">Simple, transparent pricing. Invest in your professional career today.</p>
            </div>
            <div className="bg-amber-50/20 border border-amber-100 p-5 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-slate-900">Contact for Fee Details</span>
                <span className="bg-amber-650 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">1 YEAR</span>
              </div>
              <div className="space-y-3 pt-3 border-t border-slate-100/60 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span>Admission Fee</span>
                  <span className="text-slate-800 font-medium">As per JDU norms</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span>Tuition & Lab Training Fee</span>
                  <span className="text-slate-800 font-medium">Contact Institute</span>
                </div>
                <div className="flex items-center justify-between pb-2">
                  <span>Exam & Assessment Fee</span>
                  <span className="text-slate-800 font-medium">As per University</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                  <span className="text-slate-950 font-bold">Duration</span>
                  <span className="text-slate-950 font-bold">1 Year (2 Semesters)</span>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Sticky Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-[0_4px_16px_rgba(0,0,0,0.02)] sticky top-24 space-y-6">

            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">1-Year University Diploma</p>
              <p className="text-2xl font-serif font-semibold text-[#0f172a] leading-tight">DSPS Program</p>
              <p className="text-sm text-slate-500 font-normal">Affiliated with Jagrani Devi University</p>
            </div>

            <div className="space-y-3">
              <Link
                href="/inquiry?type=university"
                className="w-full bg-black hover:bg-slate-900 text-white font-semibold py-3.5 px-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 text-center block text-sm cursor-pointer"
              >
                Apply Now
              </Link>
              <Link
                href="/contact"
                className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold py-3.5 px-4 rounded-2xl border border-slate-200 transition-all duration-200 text-center block text-sm cursor-pointer"
              >
                Ask a Question
              </Link>
            </div>

            <hr className="border-slate-100" />

            <div className="space-y-4">
              <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">PROGRAM INCLUDES</h4>
              <ul className="space-y-3.5 text-sm font-medium text-slate-950">
                <li className="flex items-start gap-3 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100 italic">
                  <Info className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                  <span>JDU Diploma Certificate, valid for Public & Private solar energy projects</span>
                </li>
                <li className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-slate-500" />
                  <span>Classroom-based instruction & Lab Training</span>
                </li>
                <li className="flex items-center gap-3">
                  <Sun className="w-4 h-4 text-slate-500" />
                  <span>Hands-on solar installation & design projects</span>
                </li>
                <li className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-slate-500" />
                  <span>Study materials & exam prep guides</span>
                </li>
                <li className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-slate-500" />
                  <span>UGC-approved JDU University Diploma</span>
                </li>
                <li className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4 text-slate-500" />
                  <span>Full placement guidance & industrial connections</span>
                </li>
              </ul>
            </div>

            <hr className="border-slate-100" />

            <div className="flex flex-col gap-2.5 pt-1 text-xs font-semibold text-slate-500">
              <button onClick={() => scrollToSection("about")} className="text-left hover:text-slate-900 transition-colors cursor-pointer w-fit">Overview</button>
              <button onClick={() => scrollToSection("highlights-sec")} className="text-left hover:text-slate-900 transition-colors cursor-pointer w-fit">Highlights</button>
              <button onClick={() => scrollToSection("curriculum")} className="text-left hover:text-slate-900 transition-colors cursor-pointer w-fit">Curriculum</button>
              <button onClick={() => scrollToSection("careers")} className="text-left hover:text-slate-900 transition-colors cursor-pointer w-fit">Careers</button>
            </div>

          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 inset-x-0 bg-black text-white py-4 border-t border-slate-800 z-50 shadow-lg px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-full flex flex-col sm:flex-row justify-between items-center gap-3.5">
          <div className="text-center sm:text-left space-y-0.5">
            <h4 className="text-sm font-semibold text-white leading-none">Start Your Solar Energy Career</h4>
            <p className="text-slate-400 text-[10px] sm:text-[11px] font-medium leading-none">1-year UGC-approved diploma. JDU University affiliated.</p>
          </div>
          <Link
            href="/inquiry?type=university"
            className="bg-white hover:bg-slate-100 text-black font-semibold text-xs px-6 py-2.5 rounded-xl transition-colors shadow-sm cursor-pointer"
          >
            Apply Now for DSPS
          </Link>
        </div>
      </div>
    </main>
  );
}
