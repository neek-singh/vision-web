import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  Laptop,
  ShieldCheck,
  HelpCircle,
  PhoneCall,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Vision IT Computer Institute, Pratappur",
  description:
    "Vision IT is a computer institute in Pratappur, Surajpur (C.G.), running since 2025 as a franchise branch of Drishti Computer Education.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Vision IT Computer Institute, Pratappur",
    description:
      "Vision IT is a computer institute in Pratappur, Surajpur (C.G.), running since 2025 as a franchise branch of Drishti Computer Education.",
    url: "https://www.visionitinstitute.com/about",
    type: "website",
  },
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
      desc: "Hands-on practice in the computer lab alongside every topic, focusing on real practice rather than theory memorization.",
    },
    {
      num: "03",
      title: "Practical Projects",
      desc: "Course projects including document design, Excel calculation sheets, and Tally accounting vouchers.",
    },
    {
      num: "04",
      title: "Exam & Certification",
      desc: "Course completion assessment, followed by certification issued by Drishti Computer Education.",
    },
  ];

  const facilities = [
    {
      title: "Computer Lab",
      desc: "Equipped for daily offline practical sessions with individual PC allocation during lab hours.",
      icon: Laptop,
    },
    {
      title: "Classroom",
      desc: "Comfortable classroom environment with step-by-step concepts explained simply in Hindi.",
      icon: Users,
    },
  ];

  const faqs = [
    {
      q: "Which courses are available at Vision IT?",
      a: "We offer BCC (3 months), DCA (12 months), ADCA (12 months), PGDCA (12 months), Tally Prime with GST (3 months), and School Computer Tuition for Class 6th to 11th. All classes are offline with 70% practical lab training.",
    },
    {
      q: "What are the fees? Can I pay in installments?",
      a: "BCC is ₹2,999, DCA is ₹13,999, ADCA is ₹14,999, PGDCA is ₹16,999, Tally Prime with GST is ₹4,499, and School Tuition is ₹599/month. Fees include admission, tuition, and exam fees. Installment options are available—call +91 81031 70595 for details.",
    },
    {
      q: "Who issues the certificate?",
      a: "Certificates are issued by Drishti Computer Education. Vision IT is an authorized franchise branch (Branch Code: DCE/25/041). Please check with the employer or institution where you plan to use it to ensure it fits your requirements.",
    },
    {
      q: "Do you provide job placement?",
      a: "We do not make false guarantees of 100% placement. We provide honest support with resume building, interview preparation, and practical job readiness.",
    },
    {
      q: "What are the class and batch timings?",
      a: "The institute is open Monday to Saturday, 8:00 AM to 6:00 PM. We run four daily 2-hour batches: 9:00 AM – 11:00 AM, 11:00 AM – 1:00 PM, 2:00 PM – 4:00 PM, and 4:00 PM – 6:00 PM.",
    },
  ];

  return (
    <main className="w-full bg-[#f8fafd] min-h-screen text-slate-950 pb-24 font-normal">
      {/* 1. Hero Section */}
      <section className="bg-white border-b border-slate-200/80 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 font-normal rounded-full text-xs border border-blue-200/50">
            Since 2025 • Pratappur, Surajpur
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-slate-950 tracking-tight leading-tight">
            About Vision IT Computer Institute
          </h1>
          <p className="text-slate-950 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Running since 2025 as an authorized franchise branch of Drishti Computer Education (Branch Code: DCE/25/041) in Pratappur, Surajpur (C.G.).
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* 2. Our Story */}
        <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <span className="text-[11px] font-normal uppercase tracking-wider text-blue-700">Our Story</span>
          <h2 className="text-2xl sm:text-3xl font-normal text-slate-950 tracking-tight">
            Bringing Practical Computer Education to Local Students
          </h2>
          <div className="space-y-4 text-slate-950 text-sm sm:text-base leading-relaxed font-normal">
            <p>
              Vision IT Computer Institute started in 2025 in Pratappur, Surajpur (Chhattisgarh). We are an authorized franchise partner of Drishti Computer Education (Branch Code: DCE/25/041).
            </p>
            <p>
              Our goal is simple: to help students from Pratappur and nearby areas build essential digital and computer skills with easy explanations in Hindi, 70% practical lab practice, and transparent fees.
            </p>
          </div>
        </section>

        {/* 3. Our Mission */}
        <section className="bg-blue-600 text-white p-6 sm:p-10 rounded-3xl shadow-sm space-y-3">
          <span className="text-[11px] font-normal uppercase tracking-wider text-blue-100">Our Mission</span>
          <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-white">
            Simple, Affordable, and Practical Learning
          </h2>
          <p className="text-white text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
            To make computer learning simple and affordable so that local students can gain real computer skills and build a solid foundation right in their own town.
          </p>
        </section>

        {/* 4. How We Teach */}
        <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-normal uppercase tracking-wider text-blue-700">Our Approach</span>
            <h2 className="text-2xl sm:text-3xl font-normal text-slate-950 tracking-tight">
              How We Teach
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {steps.map((st, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-normal text-blue-700 font-mono bg-blue-50 px-2.5 py-1 rounded-md">
                  Step {st.num}
                </span>
                <h3 className="text-base font-normal text-slate-950">{st.title}</h3>
                <p className="text-xs sm:text-sm text-slate-950 leading-relaxed font-normal">{st.desc}</p>
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
              <span className="text-[11px] font-normal uppercase tracking-wider text-blue-700">Institute Leadership</span>
              <h2 className="text-xl sm:text-2xl font-normal text-slate-950">Ishwar Singh</h2>
              <p className="text-xs sm:text-sm font-normal text-slate-700">Director, Vision IT Computer Institute</p>
              <p className="text-xs sm:text-sm text-slate-950 leading-relaxed pt-2 font-normal">
                4+ years of professional experience in Teaching and IT. Dedicated to guiding students in Pratappur with personalized attention and hands-on computer lab training.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Facilities */}
        <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-normal uppercase tracking-wider text-blue-700">Infrastructure</span>
            <h2 className="text-2xl sm:text-3xl font-normal text-slate-950 tracking-tight">
              Institute Facilities
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {facilities.map((fac, idx) => {
              const Icon = fac.icon;
              return (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-normal text-slate-950">{fac.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-950 leading-relaxed font-normal">{fac.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 7. Registration & Franchise Disclosure */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-100 border border-slate-200 text-xs sm:text-sm text-slate-950 space-y-1.5 leading-relaxed font-normal">
          <p className="font-normal text-slate-950 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            Official Registration & Affiliation Details:
          </p>
          <p>
            Franchise Branch Code: DCE/25/041 (Franchise partner of Drishti Computer Education)
          </p>
          <p>
            Business Registration: Udyam (MSME), UDYAM-CG-27-0012250
          </p>
          <p className="text-xs text-slate-500 pt-1 italic font-normal">
            *Note: Certificates are issued by Drishti Computer Education. Please verify with your prospective employer or academic institution where you plan to use it.
          </p>
        </div>

        {/* 8. Frequently Asked Questions */}
        <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-normal uppercase tracking-wider text-blue-700">Questions & Answers</span>
              <h2 className="text-xl sm:text-2xl font-normal text-slate-950 tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {faqs.map(({ q, a }, idx) => (
              <details key={idx} className="group bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none select-none font-normal text-slate-950 text-sm sm:text-base hover:bg-blue-50/50 transition-colors">
                  <span className="pr-4">{q}</span>
                  <span className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-blue-600 flex-shrink-0 ml-2 group-open:rotate-45 transition-transform duration-300 text-base font-light">+</span>
                </summary>
                <div className="px-5 pb-4 pt-2 text-slate-950 font-normal text-xs sm:text-sm leading-relaxed border-t border-slate-200/60 bg-white">
                  {a}
                </div>
              </details>
            ))}
          </div>

          <div className="pt-2 text-center text-xs sm:text-sm text-slate-600 font-normal">
            Have more questions? Call us directly:{" "}
            <a href="tel:+918103170595" className="text-blue-700 hover:underline inline-flex items-center gap-1 font-normal">
              <PhoneCall className="w-3.5 h-3.5" /> +91 81031 70595
            </a>
          </div>
        </section>

        {/* 9. Call to Action */}
        <div className="text-center space-y-4 pt-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/courses"
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-normal text-sm rounded-full shadow-sm transition-all"
            >
              Explore Courses
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-950 font-normal text-sm rounded-full transition-all"
            >
              Contact Institute
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
