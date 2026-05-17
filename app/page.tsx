import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Suspense } from "react";
import Image from "next/image";
import PopularCourses, { PopularCoursesSkeleton } from "@/components/PopularCourses";
import UpcomingBatches, { UpcomingBatchesSkeleton } from "@/components/UpcomingBatches";
import { FAQSection, SocialSection } from "@/components/HomeSections";

export const revalidate = 3600;

export default async function Home() {
  return (
    <main className="flex-col w-full bg-gray-50 pb-20">

      {/* 1. Hero Section */}
      <section className="relative bg-white text-slate-900 rounded-b-[3rem] lg:rounded-b-[5rem] overflow-hidden pt-32 pb-36 px-6 lg:px-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-b border-slate-100">

        {/* Abstract Background Elements (Enhanced with a subtle tech grid) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/60 via-white to-white pointer-events-none"></div>

        {/* Animated Glow Blobs (Smoother blur and subtle pulse) */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/40 rounded-full blur-[80px] opacity-80 animate-pulse pointer-events-none"></div>
        <div className="absolute top-48 -left-24 w-72 h-72 bg-indigo-400/40 rounded-full blur-[80px] opacity-80 pointer-events-none"></div>

        <div className="container mx-auto max-w-5xl text-center relative z-10">

          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-blue-50 text-blue-700 font-semibold rounded-full text-sm border border-blue-200/60 shadow-sm transition-transform hover:scale-105 cursor-default">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            Admissions Open for 2026 Batches
          </div>

          {/* Headline with Gradient Text */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 leading-[1.2]">
            Vision <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">IT</span> Computer Institute Pratappur
          </h1>

          {/* Refined Sub-headline */}
          <p className="mt-4 text-base md:text-lg text-slate-900 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Computer training to transform beginners into highly sought-after tech professionals.
          </p>

          {/* Enhanced CTAs */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-14">
            <Button href="/courses" size="lg" className="w-full sm:w-auto text-base px-4 py-2 shadow-lg shadow-blue-500/25 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30 flex items-center justify-center">
              Explore Courses
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Button>
            <Button href="/admissions" size="lg" variant="outline" className="w-full sm:w-auto text-base px-4 py-2 rounded-full bg-white shadow-sm border-slate-200 text-slate-700 hover:text-blue-700 hover:bg-blue-50/50 hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
              Apply Now
            </Button>
          </div>

          {/* NEW: Social Proof / Trust Indicators */}
          <div className="pt-8 border-t border-slate-200/60 max-w-lg mx-auto flex flex-col sm:flex-row items-center justify-center gap-5">
            <div className="flex -space-x-3">
              {/* Optimized Social Proof Avatars from Cloudinary */}
              <Image className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" src="https://res.cloudinary.com/ddiooxxks/image/upload/f_auto,q_auto/v1777769106/nita_qjlwlt.jpg" alt="Student Nita" width={40} height={40} priority />
              <Image className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" src="https://res.cloudinary.com/ddiooxxks/image/upload/f_auto,q_auto/v1777769273/ram_tsgmwq.jpg" alt="Student Ram" width={40} height={40} priority />
              <Image className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" src="https://res.cloudinary.com/ddiooxxks/image/upload/f_auto,q_auto/v1777769346/reeta_q5zuwz.jpg" alt="Student Reeta" width={40} height={40} priority />
              <Image className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" src="https://res.cloudinary.com/ddiooxxks/image/upload/f_auto,q_auto/v1777769358/sonu_ls911l.jpg" alt="Student Sonu" width={40} height={40} priority />
              <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-50 flex items-center justify-center text-xs font-bold text-blue-600 shadow-sm z-10">15+</div>
            </div>

            <div className="text-sm text-slate-900 font-medium text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start text-amber-400 mb-0.5 tracking-widest text-base">
                ★★★★★
              </div>
              Trusted by 15+ students
            </div>
          </div>

        </div>
      </section>


      {/* 2. Popular Courses Section */}
      <Suspense fallback={<PopularCoursesSkeleton />}>
        <PopularCourses />
      </Suspense>
      {/* Upcoming Batches Section */}
      <Suspense fallback={<UpcomingBatchesSkeleton />}>
        <UpcomingBatches />
      </Suspense>

      {/* 4. Contact CTA Section (White Theme) */}
      < section className="container mx-auto px-6 lg:px-8 py-24 relative z-10" >

        {/* Outer Wrapper with Premium Light Shadow */}
        < div className="bg-white rounded-[3rem] lg:rounded-[4rem] p-10 md:p-16 lg:p-20 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden group" >

          {/* Light Animated Aurora/Glow Backgrounds */}
          <div className="absolute -right-32 -top-32 w-[30rem] h-[30rem] bg-blue-300/60 rounded-full blur-[100px] pointer-events-none group-hover:bg-blue-400/60 transition-colors duration-700"></div>
          <div className="absolute -left-32 -bottom-32 w-[30rem] h-[30rem] bg-indigo-300/60 rounded-full blur-[100px] pointer-events-none group-hover:bg-indigo-400/60 transition-colors duration-700"></div>

          <div className="relative z-10">

            {/* Headline */}
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 tracking-tight">
              Ready to Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Journey?</span>
            </h2>

            {/* Sub-headline */}
            <p className="text-sm md:text-base text-slate-900 max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
              Join hundreds of successful students. Enrollment for the 2026 batches is closing soon.
            </p>

            {/* Primary Actions */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Button href="/admissions" size="md" className="w-full sm:w-auto text-sm px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 rounded-full transition-all duration-300 hover:-translate-y-0.5 font-bold flex items-center justify-center border-none">
                Enroll Now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </Button>
              <Button href="/contact" size="md" variant="outline" className="w-full sm:w-auto text-sm px-6 py-3 bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:text-blue-700 rounded-full transition-all duration-300 hover:-translate-y-0.5 font-semibold">
                Contact Advisors
              </Button>
            </div>

            {/* Quick Contact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto border-t border-slate-100 pt-10 mt-4">

              {/* Phone */}
              <a href="tel:+918103170595" className="flex flex-col items-center p-4 rounded-2xl hover:bg-slate-50 transition-colors group/link">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover/link:bg-blue-100 group-hover/link:scale-110 transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <span className="text-slate-900 font-bold text-base tracking-wide">+91 8103170595</span>
                <span className="text-slate-900 font-medium text-xs mt-1">Call us directly</span>
              </a>

              {/* Location */}
              <div className="flex flex-col items-center p-4 rounded-2xl hover:bg-slate-50 transition-colors group/link cursor-default">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover/link:bg-indigo-100 group-hover/link:scale-110 transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <span className="text-slate-900 font-bold text-base text-center">Kadampara Chowk</span>
                <span className="text-slate-900 font-medium text-xs text-center mt-1">Pratappur, Surajpur 497223</span>
              </div>

              {/* Instagram */}
              <a href="https://instagram.com/visionitinstitute" target="_blank" rel="noreferrer" className="flex flex-col items-center p-4 rounded-2xl hover:bg-slate-50 transition-colors group/link">
                <div className="w-14 h-14 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center mb-4 group-hover/link:bg-pink-100 group-hover/link:scale-110 transition-all">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </div>
                <span className="text-slate-900 font-bold text-base">@visionitinstitute</span>
                <span className="text-slate-900 font-medium text-xs mt-1">Follow for updates</span>
              </a>

            </div>
          </div>
        </div >
      </section >

      {/* 5. FAQ Section */}
      <FAQSection />

      {/* 6. Instagram / Social Section */}
      <SocialSection />

    </main >
  );
}

