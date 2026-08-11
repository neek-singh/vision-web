import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import CourseCard from "@/components/CourseCard";
import OfferSlider from "@/components/OfferSlider";
import HeroSlider from "@/components/HeroSlider";

const GoogleReviews = dynamic(() => import("@/features/reviews/components/GoogleReviews"), { ssr: true });
const FAQSection = dynamic(() => import("@/components/HomeSections").then((mod) => mod.FAQSection), { ssr: true });
const SocialSection = dynamic(() => import("@/components/HomeSections").then((mod) => mod.SocialSection), { ssr: true });

export const revalidate = 3600;

const COURSE_IDS = {
  DCA: "38fdc235-f7b5-4628-9d72-41c9ff2eabd8",
  ADCA: "2fc69f17-e7a0-4bde-b995-8cbda1e2e55b",
  PGDCA: "f9004121-1274-4b57-8179-ccc8365864b9",
};

export default async function Home() {
  return (
    <main className="flex-col w-full bg-gray-50 pb-20 overflow-x-hidden">

      {/* 1. Hero Section */}
      <section className="relative bg-white text-slate-900 rounded-b-[2rem] md:rounded-b-[3rem] lg:rounded-b-[5rem] overflow-hidden pt-28 md:pt-32 pb-20 md:pb-36 px-4 sm:px-6 lg:px-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-b border-slate-100">

        {/* Abstract Background Elements (Enhanced with a subtle tech grid) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/60 via-white to-white pointer-events-none"></div>

        {/* Animated Glow Blobs (Smoother blur and subtle pulse) */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/40 rounded-full blur-[80px] opacity-80 animate-pulse pointer-events-none"></div>
        <div className="absolute top-48 -left-24 w-72 h-72 bg-indigo-400/40 rounded-full blur-[80px] opacity-80 pointer-events-none"></div>

        <div className="container mx-auto max-w-5xl text-center relative z-10">

          {/* Animated Badge */}
          <Link href="/inquiry" className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-blue-50 text-blue-700 font-semibold rounded-full text-sm border border-blue-200/60 shadow-sm transition-transform hover:scale-105 hover:bg-blue-100/70">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <OfferSlider />
          </Link>

          {/* Dynamic Hero Slider (Includes heading, selector tabs, descriptions, and action buttons) */}
          <div className="mt-4 mb-14">
            <HeroSlider />
          </div>

          {/* NEW: Social Proof / Trust Indicators */}
          <div className="pt-8 border-t border-slate-200/60 max-w-lg mx-auto flex flex-col sm:flex-row items-center justify-center gap-5">
            <div className="flex -space-x-3">
              {/* Optimized Social Proof Avatars from Cloudinary */}
              <Image className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" src="https://res.cloudinary.com/ddiooxxks/image/upload/f_auto,q_auto/v1777769106/nita_qjlwlt.jpg" alt="Student Nita" width={40} height={40} priority />
              <Image className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" src="https://res.cloudinary.com/ddiooxxks/image/upload/f_auto,q_auto/v1777769273/ram_tsgmwq.jpg" alt="Student Ram" width={40} height={40} priority />
              <Image className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" src="https://res.cloudinary.com/ddiooxxks/image/upload/f_auto,q_auto/v1777769346/reeta_q5zuwz.jpg" alt="Student Reeta" width={40} height={40} priority />
              <Image className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" src="https://res.cloudinary.com/ddiooxxks/image/upload/f_auto,q_auto/v1777769358/sonu_ls911l.jpg" alt="Student Sonu" width={40} height={40} priority />
              <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-50 flex items-center justify-center text-xs font-bold text-blue-600 shadow-sm z-10">20+</div>
            </div>

            <div className="text-sm text-slate-900 font-medium text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start text-amber-400 mb-0.5 tracking-widest text-base">
                ★★★★★
              </div>
              Trusted by 20+ students
            </div>
          </div>

        </div>
      </section>


      {/* 2. Popular Courses Section — Static */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 relative z-10 overflow-hidden">
        {/* Decorative Aurora Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-blue-400/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="text-center mb-16 relative">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 pb-1">
            Popular Courses
          </h2>
          <p className="text-slate-900 text-sm md:text-base max-w-2xl mx-auto font-medium">
            Master the most in-demand tech skills with our 70% practical training programs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
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
            title="Diploma in Computer Applications"
            badge="Beginner"
            duration="12 Months"
            mode="Offline"
            price="₹13,999"
            imageSrc="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop"
            detailsHref="/courses/dca"
            applyHref="/inquiry?courseId=38fdc235-f7b5-4628-9d72-41c9ff2eabd8"
          />
          <CourseCard
            title="Post Graduate Diploma in Computer Applications"
            badge="Advanced"
            duration="12 Months"
            mode="Offline"
            price="₹16,999"
            imageSrc="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop"
            detailsHref="/courses/pgdca"
            applyHref="/inquiry?courseId=f9004121-1274-4b57-8179-ccc8365864b9"
          />
          <CourseCard
            title="Bachelor of Computer Applications"
            badge="Degree"
            duration="3 Years"
            mode="Offline"
            price="Contact Us"
            imageSrc="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop"
            applyHref="/inquiry?type=university&course=Bachelor of Computer Applications (BCA)"
          />
        </div>

        <div className="text-center mt-16">
          <Link href="/courses" className="inline-flex items-center gap-2 font-semibold text-base text-blue-700 hover:bg-blue-50/80 px-8 py-4 rounded-full transition-all duration-300 group">
            View All Courses
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </section>

      {/* 3. About Us Preview Section */}
      <section className="bg-white border-y border-slate-100 py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#f8fafc,transparent_70%)] pointer-events-none"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Left: Beautiful Graphics/Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50/50 border border-blue-100/50 rounded-2xl p-6 text-left">
                <div className="w-10 h-10 rounded-xl bg-blue-100/80 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h4 className="text-slate-900 font-bold text-sm">Expert Faculty</h4>
                <p className="text-slate-500 text-xs mt-1">Learn from experienced BCA/MCA qualified educators.</p>
              </div>
              <div className="bg-purple-50/50 border border-purple-100/50 rounded-2xl p-6 text-left">
                <div className="w-10 h-10 rounded-xl bg-purple-100/80 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-slate-900 font-bold text-sm">Practical Learning</h4>
                <p className="text-slate-500 text-xs mt-1">90% practical-focused training in real-world software.</p>
              </div>
              <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-2xl p-6 text-left col-span-2">
                <h4 className="text-slate-900 font-bold text-sm flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100/80 flex items-center justify-center shrink-0">
                    <svg className="w-4.5 h-4.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  University-Aligned Exams
                </h4>
                <p className="text-slate-500 text-xs mt-2.5 leading-relaxed">
                  As our courses run in alignment with university guidelines, exams are conducted at the university campus following official schedules.
                </p>
              </div>
            </div>

            {/* Right: Content */}
            <div className="text-left space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 font-semibold rounded-full text-xs border border-blue-200/50">
                Who We Are
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Empowering Students at <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Vision IT</span>
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal">
                Established with a vision to deliver premium, job-oriented computer education. We provide standard diploma and certificate programs alongside university course coaching, guided by qualified industry veterans.
              </p>
              <div className="pt-2">
                <Link href="/about" className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-800 transition-colors group">
                  Learn More About Our Institute
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 5. Gallery Preview Section */}
      <section className="bg-white py-20 md:py-24 relative overflow-hidden border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-left">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 font-semibold rounded-full text-xs border border-emerald-200/50">
                Life at Vision IT
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
                Our Campus Gallery
              </h2>
            </div>
            <Link href="/gallery" className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-blue-800 transition-colors group">
              View Full Gallery
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>

          {/* Clean modern layout preview */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden group shadow-sm bg-slate-100 border border-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=400&auto=format&fit=crop"
                alt="Practical Sessions"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent flex items-end p-4 text-left">
                <span className="text-white text-xs font-bold">Practical Lab Sessions</span>
              </div>
            </div>
            <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden group shadow-sm bg-slate-100 border border-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=400&auto=format&fit=crop"
                alt="Expert Lectures"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent flex items-end p-4 text-left">
                <span className="text-white text-xs font-bold">Expert Lectures</span>
              </div>
            </div>
            <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden group shadow-sm bg-slate-100 border border-slate-100 col-span-2 md:col-span-1">
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=400&auto=format&fit=crop"
                alt="Celebrations & Events"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent flex items-end p-4 text-left">
                <span className="text-white text-xs font-bold">Celebrations & Events</span>
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* Google Reviews Section */}
      <GoogleReviews />

      {/* 4. Contact CTA Section (White Theme) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 relative z-10">

        {/* Outer Wrapper */}
        <div className="p-4 sm:p-6 text-center">

          <div>

            {/* Headline */}
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 tracking-tight">
              Ready to Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Journey?</span>
            </h2>

            {/* Sub-headline */}
            <p className="text-sm md:text-base text-slate-900 max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
              Join twenty plus of successful students. Enrollment for the 2026 batches is closing soon.
            </p>

            {/* Primary Actions */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Button href="/inquiry" size="md" className="w-full sm:w-auto text-sm px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 rounded-full transition-all duration-300 hover:-translate-y-0.5 font-bold flex items-center justify-center border-none">
                Inquire Now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </Button>
              <Button href="/contact" size="md" variant="outline" className="w-full sm:w-auto text-sm px-6 py-3 bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:text-blue-700 rounded-full transition-all duration-300 hover:-translate-y-0.5 font-semibold">
                Contact Advisors
              </Button>
            </div>

            {/* Quick Contact Grid */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 border-t border-slate-100 pt-8 mt-4">

              {/* Phone 1 */}
              <a href="tel:+918103170595" className="flex flex-col items-center p-4 rounded-2xl hover:bg-slate-50 transition-colors group/link">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover/link:bg-blue-100 group-hover/link:scale-110 transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <span className="text-slate-900 font-bold text-base tracking-wide">+91 8103170595</span>
                <span className="text-slate-900 font-medium text-xs mt-1">Call us directly</span>
              </a>

              {/* Phone 2 */}
              <a href="tel:+919301221630" className="flex flex-col items-center p-4 rounded-2xl hover:bg-slate-50 transition-colors group/link">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover/link:bg-blue-100 group-hover/link:scale-110 transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <span className="text-slate-900 font-bold text-base tracking-wide">+91 9301221630</span>
                <span className="text-slate-900 font-medium text-xs mt-1">Call us directly</span>
              </a>

            </div>

          </div>
        </div>
      </section>

      {/* 5. Instagram / Social Section */}
      <SocialSection />

      {/* 6. FAQ Section */}
      <FAQSection />

    </main>
  );
}

