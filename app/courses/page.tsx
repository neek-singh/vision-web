import type { Metadata } from "next";
import Link from "next/link";
import CourseCard from "@/components/CourseCard";
import { CheckCircle2, PhoneCall, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Computer Courses in Pratappur | Vision IT Computer Institute",
  description: "Computer courses at Vision IT, Pratappur: BCC (3 months), DCA, ADCA, PGDCA (12 months), Tally Prime with GST (3 months), and School Tuition (Class 6-11). Offline classes, 70% practical.",
};

export default function CoursesPage() {
  const courses = [
    {
      title: "Basic Computer Course (BCC)",
      badge: "3 Months • Beginner",
      duration: "3 Months",
      mode: "Offline Lab",
      price: "₹2,999",
      eligibility: "Minimum 8th Pass",
      imageSrc: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
      detailsHref: "/courses/bcc",
      applyHref: "/inquiry?courseId=197f7c89-e410-4768-8b49-567b4b4e3e9e",
      description: "Computer fundamentals, Windows, English/Hindi typing, MS Word, Excel, PowerPoint, internet and basic AI tools."
    },
    {
      title: "Diploma in Computer Applications (DCA)",
      badge: "12 Months • Diploma",
      duration: "12 Months",
      mode: "Offline Lab",
      price: "₹13,999",
      eligibility: "Minimum 12th Pass",
      imageSrc: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop",
      detailsHref: "/courses/dca",
      applyHref: "/inquiry?courseId=38fdc235-f7b5-4628-9d72-41c9ff2eabd8",
      description: "MS Office, C language programming, DBMS database, HTML/CSS web page, Tally Prime accounting, GST billing, and internet safety."
    },
    {
      title: "Advanced Diploma in Computer Applications (ADCA)",
      badge: "12 Months • Advanced Diploma",
      duration: "12 Months",
      mode: "Offline Lab",
      price: "₹14,999",
      eligibility: "Minimum 10th / 12th Pass",
      imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
      detailsHref: "/courses/adca",
      applyHref: "/inquiry?courseId=2fc69f17-e7a0-4bde-b995-8cbda1e2e55b",
      description: "Advanced MS Office, DTP (Photoshop, CorelDRAW, PageMaker), C/C++ basics, web static pages, Tally Prime with GST, and typing."
    },
    {
      title: "Post Graduate Diploma in Computer Applications (PGDCA)",
      badge: "12 Months • Post Graduate",
      duration: "12 Months",
      mode: "Offline Lab",
      price: "₹16,999",
      eligibility: "Graduation (Any Stream)",
      imageSrc: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
      detailsHref: "/courses/pgdca",
      applyHref: "/inquiry?courseId=f9004121-1274-4b57-8179-ccc8365864b9",
      description: "Advanced computing, C++ object oriented programming, database architecture, HTML/CSS web design, Tally Prime, and cybersecurity basics."
    },
    {
      title: "Tally Prime with GST",
      badge: "3 Months • Accounting",
      duration: "3 Months",
      mode: "Offline Lab",
      price: "₹4,499",
      eligibility: "10th / 12th Pass",
      imageSrc: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop",
      detailsHref: "/courses/tally",
      applyHref: "/inquiry?courseId=tally-prime-gst",
      description: "Hands-on accounting in Tally Prime, company setup, ledger creation, day-to-day vouchers, inventory management, and GST tax invoice billing."
    },
    {
      title: "School Computer Tuition (Class 6th – 11th)",
      badge: "Monthly Batch • School",
      duration: "Monthly Batches",
      mode: "Offline Lab",
      price: "₹599 / mo",
      eligibility: "Class 6th to 11th Students",
      imageSrc: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop",
      detailsHref: "/courses/school-tuition",
      applyHref: "/inquiry?courseId=school-tuition",
      description: "School syllabus support, typing skills, MS Office, homework guidance, computer basics, and practical lab training."
    },
  ];

  return (
    <main className="w-full bg-[#f8fafd] min-h-screen pb-20">
      {/* Header Banner */}
      <section className="bg-white border-b border-slate-200/80 pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 font-semibold rounded-full text-xs mb-4 border border-blue-200/50">
            Offline Training • Pratappur
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Computer Courses in Pratappur
          </h1>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Practical, career-focused computer courses and school batches. Every program is taught offline with direct hands-on practice in our computer lab.
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, idx) => (
            <CourseCard
              key={idx}
              title={course.title}
              badge={course.badge}
              duration={course.duration}
              mode={course.mode}
              price={course.price}
              imageSrc={course.imageSrc}
              detailsHref={course.detailsHref}
              applyHref={course.applyHref}
            />
          ))}
        </div>

        {/* Guidance Box: Which Course Should You Choose? */}
        <div className="mt-12 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Which Course Should You Choose?
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                If you are completely new to computers, start with <strong>BCC</strong> (3 months). For school students (Class 6th–11th), our <strong>School Tuition</strong> batch covers typing, MS Office, and academic curriculum. For career accounting, join <strong>Tally Prime with GST</strong> (3 months). After completing 12th, <strong>DCA</strong> or <strong>ADCA</strong> (12 months) is recommended. For college graduates, <strong>PGDCA</strong> (12 months) provides an advanced professional qualification.
              </p>
              <div className="pt-2 text-xs sm:text-sm text-slate-500 font-medium">
                Fees include Admission, Tuition, and Exam fees. For flexible installment options, please call:{" "}
                <a href="tel:+918103170595" className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1">
                  <PhoneCall className="w-3.5 h-3.5" /> +91 81031 70595
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Drishti Certificate Disclaimer */}
        <div className="mt-8 text-center text-xs text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
          <p>
            ℹ️ Certificate is issued by Drishti Computer Education. Please check with the employer or institution where you plan to use it.
          </p>
        </div>
      </section>
    </main>
  );
}
