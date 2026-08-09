import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CourseCard from "@/components/CourseCard";

export const metadata: Metadata = {
  title: "Certificate Courses | Vision IT Computer Institute Pratappur",
  description: "Browse our government-recognized short-term computer certificate courses: BCC and Basic Computer training in Pratappur.",
  keywords: "computer certificate courses Pratappur, BCC course, basic computer training",
};

export default async function CertificateCoursesPage() {
  return (
    <main className="flex-col w-full bg-slate-50 min-h-screen overflow-x-hidden">

      {/* Hero Section (Split Two-Column Design) */}
      <section className="relative overflow-hidden bg-[#ebf2fa] py-16 lg:py-20 border-b border-slate-200/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Text & Content */}
            <div className="space-y-6 text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-[1.15] animate-in fade-in slide-in-from-bottom-6 duration-700">
                Explore Our Programs
              </h1>
              <p className="text-sm sm:text-base text-slate-650 leading-relaxed max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 font-normal">
                Empowering students with cutting-edge tech skills. Discover comprehensive courses designed for modern careers, blending theoretical knowledge with practical, hands-on experience in our state-of-the-art facilities.
              </p>
            </div>

            {/* Right Column: Visual Image Asset */}
            <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border border-slate-200/50 shadow-lg bg-white animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              <Image
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop"
                alt="Students in a computer lab classroom"
                fill
                className="object-cover"
                priority
              />
            </div>

          </div>
        </div>
      </section>

      {/* Course Sections */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 relative z-10 -mt-8">
        
        {/* Navigation Tabs */}
        <div className="flex justify-center gap-3 mb-4">
          <Link
            href="/courses"
            className="px-6 py-2.5 text-xs md:text-sm font-semibold rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all duration-300"
          >
            All Courses
          </Link>
          <Link
            href="/courses/certificate"
            className="px-6 py-2.5 text-xs md:text-sm font-semibold rounded-full border transition-all duration-300 bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20"
          >
            Certificate Courses
          </Link>
          <Link
            href="/courses/diploma"
            className="px-6 py-2.5 text-xs md:text-sm font-semibold rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all duration-300"
          >
            Diploma Courses
          </Link>
        </div>
        
        {/* Certificate Courses Section */}
        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
              Certificate Courses
            </h2>
            <p className="text-slate-500 text-xs md:text-sm">
              Short-term specialized certifications to boost your technical skills and industry readiness.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
            <CourseCard
              title="Basic Computer Course"
              badge="Beginner"
              duration="3 Months"
              mode="Offline"
              price="₹2,999"
              imageSrc="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop"
              detailsHref="/courses/bcc"
              applyHref="/inquiry?courseId=197f7c89-e410-4768-8b49-567b4b4e3e9e"
            />
            <CourseCard
              title="Basic Computer for Beginner"
              badge="Beginner"
              duration="3 Months"
              mode="Offline"
              price="₹2,999"
              imageSrc="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop"
              detailsHref="/courses/basic-beginner"
              applyHref="/inquiry?courseId=a100f278-ea6c-4189-b09b-7d4e7cd9d0e7"
            />
          </div>
        </section>

      </div>

      {/* Why Learn With Us Section (Dark Theme) */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden z-10 border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3 tracking-tight">
            Why Learn With Us
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mb-12 font-normal leading-relaxed">
            Experience an academic environment designed for practical success and career growth.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Card 1: Expert Faculty */}
            <div className="bg-slate-800/40 border border-slate-700/40 p-6 rounded-2xl flex flex-col items-center text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
              </div>
              <h3 className="text-lg font-serif font-bold text-white">Expert Faculty</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">
                Learn from industry professionals with years of hands-on experience and academic excellence.
              </p>
            </div>

            {/* Card 2: Modern Labs */}
            <div className="bg-slate-800/40 border border-slate-700/40 p-6 rounded-2xl flex flex-col items-center text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <h3 className="text-lg font-serif font-bold text-white">Modern Labs</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">
                Practice in state-of-the-art computer labs equipped with the latest software and hardware.
              </p>
            </div>

            {/* Card 3: Job Assistance */}
            <div className="bg-slate-800/40 border border-slate-700/40 p-6 rounded-2xl flex flex-col items-center text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <h3 className="text-lg font-serif font-bold text-white">Job Assistance</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">
                Dedicated placement support to help you launch your career immediately after graduation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Start Your Journey Section (Light Blue Box) */}
      <section className="relative py-12 bg-white overflow-hidden z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="bg-[#ebf2fa] rounded-3xl p-8 sm:p-12 text-center border border-slate-200/40 relative overflow-hidden">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-3 tracking-tight">
              Ready to Start Your Journey?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-8 font-normal leading-relaxed">
              Join hundreds of successful alumni. Enroll today and take the first step towards a rewarding career in technology.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/courses"
                className="px-6 py-3 bg-black hover:bg-slate-900 text-white font-bold text-sm rounded-xl transition-colors text-center"
              >
                Browse All Courses
              </Link>
              <Link
                href="/inquiry"
                className="px-6 py-3 bg-white border border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-xl transition-colors text-center"
              >
                Contact Admissions
              </Link>
            </div>
          </div>
        </div>
      </section>



    </main>
  );
}
