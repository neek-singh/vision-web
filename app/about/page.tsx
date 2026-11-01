import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  Laptop,
  BookOpen,
  ShieldCheck,
  Wifi,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Vision IT Computer Institute, Pratappur",
  description:
    "Vision IT is a computer institute in Pratappur, Surajpur (C.G.), running since 2025 as a franchise branch of Drishti Computer Education.",
};

export const revalidate = 3600;

export default function AboutPage() {
  const steps = [
    {
      num: "01",
      title: "Start from Basics",
      desc: "Computer fundamentals, mouse and keyboard handling, Hindi/English typing, and Windows operating system basics.",
    },
    {
      num: "02",
      title: "70% Practical Training",
      desc: "Hands-on practice in the computer lab alongside every topic, focusing on practical skills rather than rote learning.",
    },
    {
      num: "03",
      title: "Practical Projects",
      desc: "Hands-on projects toward course completion (such as digital resume design, Excel calculation sheets, and Tally vouchers).",
    },
    {
      num: "04",
      title: "Exam & Certification",
      desc: "Course assessment examination upon completion, followed by certification issued by Drishti Computer Education.",
    },
  ];

  const facilities = [
    {
      title: "Computer Lab",
      desc: "Equipped for daily offline practical practice with hands-on training support.",
      icon: Laptop,
    },
    {
      title: "Classroom",
      desc: "Face-to-face classroom learning with step-by-step instruction explained in Hindi.",
      icon: Users,
    },
    {
      title: "High-Speed Wi-Fi",
      desc: "Wi-Fi connectivity available in the lab to practice internet browsing, online tools, and digital resources.",
      icon: Wifi,
    },
    {
      title: "PDF Study Material",
      desc: "Comprehensive study notes, reference guides, and practical assignments provided in digital PDF format.",
      icon: BookOpen,
    },
  ];

  return (
    <main className="w-full bg-[#f8fafd] min-h-screen text-slate-800 pb-24">
      {/* 1. Hero Section */}
      <section className="bg-white border-b border-slate-200/80 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 font-semibold rounded-full text-xs border border-blue-200/50">
            Since 2025 • Pratappur, Surajpur
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            About Vision IT Computer Institute
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Running since 2025 as an authorized franchise branch of Drishti Computer Education (Branch Code: DCE/25/041) in Pratappur, Surajpur (C.G.).
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* 2. Our Story */}
        <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">Our Story</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Bringing Practical Computer Education to Local Students
          </h2>
          <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
            <p>
              Vision IT Computer Institute started in <strong>2025 in Pratappur, Surajpur (Chhattisgarh)</strong>. We are an authorized franchise partner of Drishti Computer Education (Branch Code: <strong>DCE/25/041</strong>).
            </p>
            <p>
              Our mission is clear and focused: to help students from Pratappur and nearby rural and semi-urban areas build essential computer skills through simple explanations in Hindi, 70% practical lab practice, and affordable course fees.
            </p>
          </div>
        </section>

        {/* 3. Our Mission */}
        <section className="bg-blue-600 text-white p-6 sm:p-10 rounded-3xl shadow-sm space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200">Our Mission</span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Simple, Affordable, and Practical Learning
          </h2>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-2xl">
            To make computer education accessible and affordable so that every student can acquire real practical skills locally and build a confident foundation for future opportunities.
          </p>
        </section>

        {/* 4. How We Teach */}
        <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">Our Approach</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How We Teach
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {steps.map((st, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="text-xs font-bold text-blue-600 font-mono bg-blue-50 px-2.5 py-1 rounded-md">
                  Step {st.num}
                </span>
                <h3 className="text-base font-bold text-slate-900">{st.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Director Profile */}
        <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-slate-200 shadow-sm shrink-0 bg-slate-100">
              <Image
                src="https://res.cloudinary.com/ddiooxxks/image/upload/v1777769651/ishwar_cdiam4.jpg"
                alt="Ishwar Singh, Director"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">Institute Leadership</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Ishwar Singh</h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-500">Director, Vision IT Computer Institute</p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                4+ years of professional experience in Teaching and IT. Dedicated to guiding students in Pratappur from basic digital literacy to diploma and certificate skills with personalized, hands-on attention.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Facilities */}
        <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">Infrastructure</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Institute Facilities
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {facilities.map((fac, idx) => {
              const Icon = fac.icon;
              return (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{fac.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{fac.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 7. Registration & Franchise Disclosure */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-100 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1.5 leading-relaxed">
          <p className="font-bold text-slate-900 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            Official Registration & Affiliation Details:
          </p>
          <p>
            <strong>Franchise Branch Code:</strong> DCE/25/041 (Franchise partner of Drishti Computer Education)
          </p>
          <p>
            <strong>Business Registration:</strong> Udyam (MSME), UDYAM-CG-27-0012250
          </p>
          <p className="text-xs text-slate-500 pt-1">
            *Certificates are issued by Drishti Computer Education. Please verify with your prospective employer or academic institution where you plan to use it.
          </p>
        </div>

        {/* 8. Call to Action */}
        <div className="text-center space-y-4 pt-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/courses"
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-full shadow-sm transition-all"
            >
              Explore Courses
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-full transition-all"
            >
              Contact Institute
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
