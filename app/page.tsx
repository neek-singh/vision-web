import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import CourseCard from "@/components/CourseCard";
import OfferSlider from "@/components/OfferSlider";
import fs from "fs";
import path from "path";

const GoogleReviews = dynamic(() => import("@/features/reviews/components/GoogleReviews"), { ssr: true });
const FAQSection = dynamic(() => import("@/components/HomeSections").then((mod) => mod.FAQSection), { ssr: true });
const SocialSection = dynamic(() => import("@/components/HomeSections").then((mod) => mod.SocialSection), { ssr: true });

export const revalidate = 3600;

export const metadata: Metadata = {
  title: {
    absolute: "Computer Institute in Pratappur | Vision IT",
  },
  description: "Vision IT Computer Institute, Pratappur (Surajpur). Offline BCC, DCA, ADCA and PGDCA courses with 70% practical lab training. Call 8103170595.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Computer Institute in Pratappur | Vision IT",
    description: "Vision IT Computer Institute, Pratappur (Surajpur). Offline BCC, DCA, ADCA and PGDCA courses with 70% practical lab training. Call 8103170595.",
    url: "https://www.visionitinstitute.com",
    type: "website",
  },
};

async function getBlogs() {
  const blogsFilePath = path.join(process.cwd(), "features", "blog", "data", "blogs.json");
  try {
    if (fs.existsSync(blogsFilePath)) {
      const fileData = fs.readFileSync(blogsFilePath, "utf-8");
      return JSON.parse(fileData);
    }
  } catch (e) {
    console.error("Error loading blogs for home:", e);
  }
  return [];
}

export default async function Home() {
  const blogsList = await getBlogs();
  const latestBlogs = [...blogsList]
    .filter((blog: any) => blog.is_published !== false)
    .sort((a: any, b: any) => {
      const dateA = new Date(a.published_at || a.created_at || 0).getTime();
      const dateB = new Date(b.published_at || b.created_at || 0).getTime();
      return dateB - dateA;
    })
    .slice(0, 3);

  const educationalOrganizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": "https://www.visionitinstitute.com/#organization",
    "name": "Vision IT Computer Institute",
    "url": "https://www.visionitinstitute.com",
    "telephone": "+918103170595",
    "email": "info@visionitinstitute.com",
    "foundingDate": "2025",
    "openingHours": "Mo-Sa 08:00-18:00",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Shubham Gift Gallery, 2nd Floor, Kadampara Chowk",
      "addressLocality": "Pratappur",
      "addressRegion": "Chhattisgarh",
      "postalCode": "497223",
      "addressCountry": "IN",
    },
    "sameAs": [
      "https://facebook.com/visionitinstitute",
      "https://instagram.com/visionitinstitute",
    ],
  };

  const faqPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Which courses are available at Vision IT?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "BCC (3 months), DCA (12 months), ADCA (12 months), PGDCA (12 months), Tally Prime with GST (3 months), and School Students Computer Tuition (Class 6th–11th). All courses are conducted offline with hands-on computer lab training.",
        },
      },
      {
        "@type": "Question",
        "name": "What are the fees? Can I pay in installments?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "BCC is ₹2,999, DCA is ₹13,999, ADCA is ₹14,999, PGDCA is ₹16,999, Tally Prime with GST is ₹4,499, and School Computer Tuition is ₹599/month. Diploma fees include admission, tuition, and exam fees with flexible installment options available.",
        },
      },
      {
        "@type": "Question",
        "name": "Who issues the certificate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Certificates are issued by Drishti Computer Education. Vision IT is an authorized franchise branch (Branch Code: DCE/25/041). Please verify with your prospective employer or academic institution where you plan to use it.",
        },
      },
      {
        "@type": "Question",
        "name": "Do you provide job placement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We do not make false guarantees of 100% placement. We actively assist students with resume building, interview preparation, and practical job readiness.",
        },
      },
      {
        "@type": "Question",
        "name": "What are the class and batch timings?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Daily offline classes run Monday to Saturday across 4 batches: 9:00 AM – 11:00 AM, 11:00 AM – 1:00 PM, 2:00 PM – 4:00 PM, and 4:00 PM – 6:00 PM. Students can choose any batch that fits their schedule.",
        },
      },
    ],
  };

  return (
    <main className="flex-col w-full bg-gray-50 pb-20 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOrganizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />

      {/* 1. Hero Section */}
      <section className="relative bg-white text-slate-900 rounded-b-[2rem] md:rounded-b-[3rem] lg:rounded-b-[5rem] overflow-hidden pt-28 md:pt-36 pb-20 md:pb-28 px-4 sm:px-6 lg:px-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-b border-slate-100">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/60 via-white to-white pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/30 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute top-48 -left-24 w-72 h-72 bg-indigo-400/30 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          {/* Animated Announcement Badge */}
          <Link href="/inquiry" className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-blue-50 text-blue-700 font-semibold rounded-full text-xs sm:text-sm border border-blue-200/60 shadow-sm transition-transform hover:scale-105 hover:bg-blue-100/70">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            <OfferSlider />
          </Link>

          {/* H1 Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-950 tracking-tight leading-tight mb-6">
            Computer Institute in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Pratappur, Surajpur</span>
          </h1>

          {/* Subheading */}
          <p className="text-slate-950 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-normal leading-relaxed mb-8">
            Learn computers in our offline lab: BCC, DCA, ADCA, PGDCA, Tally Prime with GST, and School Tuition. 70% practical training, taught in Hindi.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
            <Link
              href="/inquiry"
              className="px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-normal text-sm sm:text-base rounded-full shadow-lg shadow-blue-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Apply Now
            </Link>
            <a
              href="tel:+918103170595"
              className="px-7 py-3.5 bg-slate-950 hover:bg-black text-white font-normal text-sm sm:text-base rounded-full shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              Call 8103170595
            </a>
            <a
              href="https://wa.me/918103170595"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 bg-white border border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 text-slate-950 hover:text-emerald-700 font-normal text-sm sm:text-base rounded-full shadow-sm hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-2"
            >
              WhatsApp
            </a>
          </div>

          {/* Trust Strip */}
          <div className="pt-6 border-t border-slate-200/70 max-w-3xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs sm:text-sm font-normal text-slate-950">
              <div className="flex items-center justify-center gap-1.5 py-1">
                <span className="text-blue-600">✓</span> Since 2025
              </div>
              <div className="flex items-center justify-center gap-1.5 py-1">
                <span className="text-blue-600">✓</span> Offline classroom & lab
              </div>
              <div className="flex items-center justify-center gap-1.5 py-1">
                <span className="text-blue-600">✓</span> 70% practical
              </div>
              <div className="flex items-center justify-center gap-1.5 py-1">
                <span className="text-blue-600">✓</span> Installment option
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Popular Courses Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 relative z-10 overflow-hidden">
        <div className="text-center mb-12 relative">
          <h2 className="text-2xl md:text-3xl font-normal text-slate-950 mb-3 tracking-tight">
            Popular Courses
          </h2>
          <p className="text-slate-950 text-sm md:text-base max-w-2xl mx-auto font-normal">
            Learn computers in our offline lab with 70% practical training.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
          <CourseCard
            title="Basic Computer Course (BCC)"
            badge="Beginner"
            duration="3 Months"
            mode="Offline"
            price="₹2,999"
            imageSrc="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop"
            detailsHref="/courses/bcc"
            applyHref="/inquiry?courseId=197f7c89-e410-4768-8b49-567b4b4e3e9e"
          />
          <CourseCard
            title="Diploma in Computer Applications (DCA)"
            badge="Diploma"
            duration="12 Months"
            mode="Offline"
            price="₹13,999"
            imageSrc="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop"
            detailsHref="/courses/dca"
            applyHref="/inquiry?courseId=38fdc235-f7b5-4628-9d72-41c9ff2eabd8"
          />
          <CourseCard
            title="Advanced Diploma in Computer Applications (ADCA)"
            badge="Advanced Diploma"
            duration="12 Months"
            mode="Offline"
            price="₹14,999"
            imageSrc="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop"
            detailsHref="/courses/adca"
            applyHref="/inquiry?courseId=2fc69f17-e7a0-4bde-b995-8cbda1e2e55b"
          />
          <CourseCard
            title="Post Graduate Diploma in Computer Applications (PGDCA)"
            badge="Post Graduate"
            duration="12 Months"
            mode="Offline"
            price="₹16,999"
            imageSrc="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop"
            detailsHref="/courses/pgdca"
            applyHref="/inquiry?courseId=f9004121-1274-4b57-8179-ccc8365864b9"
          />
          <CourseCard
            title="Tally Prime with GST"
            badge="Accounting"
            duration="3 Months"
            mode="Offline"
            price="₹4,499"
            imageSrc="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop"
            detailsHref="/courses/tally"
            applyHref="/inquiry?courseId=tally-prime-gst"
          />
          <CourseCard
            title="School Computer Tuition (Class 6th – 11th)"
            badge="School Batch"
            duration="Monthly"
            mode="Offline"
            price="₹599 / mo"
            imageSrc="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop"
            detailsHref="/courses/school-tuition"
            applyHref="/inquiry?courseId=school-tuition"
          />
        </div>

        <p className="text-center text-xs sm:text-sm text-slate-500 font-normal italic mt-6">
          *Note: Fees include Admission, Tuition, and Exam fees. Installment options are available; please call for details.
        </p>

        <div className="text-center mt-8">
          <Link href="/courses" className="inline-flex items-center gap-2 font-normal text-sm text-blue-700 hover:text-blue-800 transition-colors group">
            View All Courses
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </section>

      {/* 3. Why Vision IT Section */}
      <section className="bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-y border-slate-100 relative overflow-hidden z-10 mt-16">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 font-normal rounded-full text-xs border border-blue-200/50 mb-3">
              Why Choose Us
            </span>
            <h2 className="text-2xl md:text-3xl font-normal text-slate-950 tracking-tight">
              Why Vision IT
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/60">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-normal text-sm mb-4">
                01
              </div>
              <h3 className="text-base font-normal text-slate-950 mb-1">Offline Classes</h3>
              <p className="text-xs sm:text-sm text-slate-950 leading-relaxed font-normal">
                Learn directly from teachers in the classroom with personalized attention and dedicated support.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/60">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-normal text-sm mb-4">
                02
              </div>
              <h3 className="text-base font-normal text-slate-950 mb-1">70% Practical Training</h3>
              <p className="text-xs sm:text-sm text-slate-950 leading-relaxed font-normal">
                Extensive hands-on computer lab sessions to build solid practical proficiency on every tool and software.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/60">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-normal text-sm mb-4">
                03
              </div>
              <h3 className="text-base font-normal text-slate-950 mb-1">Taught in Simple Hindi</h3>
              <p className="text-xs sm:text-sm text-slate-950 leading-relaxed font-normal">
                All computer concepts and practical modules are clearly explained in Hindi so every student learns comfortably.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/60">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-normal text-sm mb-4">
                04
              </div>
              <h3 className="text-base font-normal text-slate-950 mb-1">Transparent Fees & Installments</h3>
              <p className="text-xs sm:text-sm text-slate-950 leading-relaxed font-normal">
                Complete fee breakups are clearly stated on every course page, with flexible installment options.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/60">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-normal text-sm mb-4">
                05
              </div>
              <h3 className="text-base font-normal text-slate-950 mb-1">Authorized Certificate</h3>
              <p className="text-xs sm:text-sm text-slate-950 leading-relaxed font-normal">
                Complete your training and receive an authorized certificate issued by Drishti Computer Education (Vision IT is a franchise branch).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. About Snippet */}
      <section className="bg-slate-50 border-b border-slate-100 py-16 md:py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-white text-blue-700 font-normal rounded-full text-xs border border-blue-200/50 mb-4 shadow-sm">
            About Vision IT
          </span>
          <h2 className="text-2xl md:text-3xl font-normal text-slate-950 tracking-tight mb-4">
            Computer Training in Pratappur
          </h2>
          <p className="text-slate-950 text-sm md:text-base leading-relaxed font-normal max-w-2xl mx-auto mb-6">
            Vision IT Computer Institute was established in 2025 in Pratappur, Surajpur (C.G.). We operate as an authorized franchise branch of Drishti Computer Education. Our mission is simple: providing local students with authentic, practical computer training.
          </p>
          <Link href="/about" className="inline-flex items-center gap-1.5 text-sm font-normal text-blue-700 hover:text-blue-800 transition-colors">
            Read More About Us →
          </Link>
        </div>
      </section>

      {/* 5. Latest Blogs Section */}
      {latestBlogs.length > 0 && (
        <section className="bg-white py-16 md:py-20 relative overflow-hidden border-b border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 font-normal rounded-full text-xs border border-blue-200/50">
                📚 Articles & Updates
              </span>
              <h2 className="text-2xl md:text-3xl font-normal text-slate-950 mt-3 tracking-tight">
                Latest from Our Blog
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {latestBlogs.map((blog: any) => (
                <Link href={`/blog/${blog.slug}`} key={blog.id} className="block group h-full">
                  <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-5 hover:bg-white hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group flex flex-col justify-between h-full">
                    <div>
                      {blog.image_url && (
                        <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-5 bg-slate-100 border border-slate-100">
                          <Image
                            src={blog.image_url}
                            alt={blog.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] uppercase font-normal text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
                          {blog.category}
                        </span>
                        <span className="text-[10px] text-slate-700 font-normal">
                          {blog.published_at || blog.created_at
                            ? new Date(blog.published_at || blog.created_at).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })
                            : "Recent"}
                        </span>
                      </div>

                      <h3 className="text-base font-normal text-slate-950 leading-snug group-hover:text-blue-700 transition-colors mb-2 line-clamp-2">
                        {blog.title}
                      </h3>
                      
                      <p className="text-slate-950 text-xs sm:text-sm leading-relaxed font-normal mb-4 line-clamp-3">
                        {blog.excerpt || "Read this article to learn more."}
                      </p>
                    </div>

                    <div className="text-blue-700 font-normal text-xs inline-flex items-center gap-1 mt-auto">
                      Read Article
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/blog" className="inline-flex items-center gap-2 font-normal text-sm text-blue-700 hover:text-blue-800 transition-colors">
                Explore All Articles →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 6. Google Reviews Section */}
      <GoogleReviews />

      {/* 7. Contact CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="p-6 sm:p-10 text-center max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200/80 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-normal text-slate-950 mb-3 tracking-tight">
            Ready to Learn Computers in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Pratappur?</span>
          </h2>

          <p className="text-sm md:text-base text-slate-950 max-w-xl mx-auto mb-8 font-normal leading-relaxed">
            Admissions open for BCC, DCA, ADCA, PGDCA, Tally Prime with GST, and School Computer Tuition. Visit our lab or call directly to book your seat.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button href="/inquiry" size="md" className="w-full sm:w-auto text-sm px-7 py-3 bg-blue-600 hover:bg-blue-500 text-white shadow-md rounded-full font-normal flex items-center justify-center border-none">
              Apply Now
            </Button>
            <Button href="/contact" size="md" variant="outline" className="w-full sm:w-auto text-sm px-7 py-3 bg-white text-slate-950 border-slate-300 hover:bg-slate-50 hover:text-blue-700 rounded-full font-normal">
              Visit Institute
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 border-t border-slate-100 pt-6">
            <a href="tel:+918103170595" className="flex items-center justify-center gap-2 text-slate-950 hover:text-blue-700 font-normal text-sm">
              <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center">📞</span>
              +91 81031 70595
            </a>
            <a href="tel:+919301221630" className="flex items-center justify-center gap-2 text-slate-950 hover:text-blue-700 font-normal text-sm">
              <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center">📞</span>
              +91 93012 21630
            </a>
          </div>
        </div>
      </section>

      {/* 8. Instagram / Social Section */}
      <SocialSection />

      {/* 9. FAQ Section */}
      <FAQSection />

    </main>
  );
}
