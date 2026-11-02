import { Button } from "@/components/ui/Button";
import Image from "next/image";

const INSTAGRAM_POSTS = [
  {
    id: "1",
    url: "https://www.instagram.com/visionitinstitute/p/DdNWuSSoEc0/",
    image: "/instagram/ig-post-1.jpg",
    title: "Elevate your mindset with Vision IT",
  },
  {
    id: "2",
    url: "https://www.instagram.com/visionitinstitute/p/DdWCllIoHDb/",
    image: "/instagram/ig-post-2.jpg",
    title: "Tech & AI Learning at Vision IT",
  },
  {
    id: "3",
    url: "https://www.instagram.com/visionitinstitute/p/DeYh6k3CSwQ/",
    image: "/instagram/ig-post-3.jpg",
    title: "CSS box-sizing practical lab",
  },
  {
    id: "4",
    url: "https://www.instagram.com/visionitinstitute/p/DejFRQQCR27/",
    image: "/instagram/ig-post-4.jpg",
    title: "Portfolio Development & Web Skills",
  },
];

export function FAQSection() {
  const faqs = [
    {
      q: "Which courses are available at Vision IT?",
      a: "BCC (3 months), DCA (12 months), ADCA (12 months), MDCA (16 months), PGDCA (12 months), Tally Prime with GST (3 months), and School Students Computer Tuition (Class 6th–11th). All courses are conducted offline with hands-on computer lab training.",
    },
    {
      q: "What are the fees? Can I pay in installments?",
      a: "BCC is ₹2,999, DCA is ₹13,999, ADCA is ₹14,999, MDCA is ₹15,999, PGDCA is ₹16,999, Tally Prime with GST is ₹4,499, and School Computer Tuition is ₹599/month. Diploma fees include admission, tuition, and exam fees with flexible installment options available.",
    },
    {
      q: "Who issues the certificate?",
      a: "Certificates are issued by Drishti Computer Education. Vision IT is an authorized franchise branch (Branch Code: DCE/25/041). Please verify with your prospective employer or academic institution where you plan to use it.",
    },
    {
      q: "Do you provide job placement?",
      a: "We do not make false guarantees of 100% placement. We actively assist students with resume building, interview preparation, and practical job readiness.",
    },
    {
      q: "What are the class and batch timings?",
      a: "Daily offline classes run Monday to Saturday across 4 batches: 9:00 AM – 11:00 AM, 11:00 AM – 1:00 PM, 2:00 PM – 4:00 PM, and 4:00 PM – 6:00 PM. Students can choose any batch that fits their schedule.",
    },
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-4xl">
      <div className="text-center mb-14">
        <h2 className="text-xl md:text-2xl font-normal text-slate-950 mb-3 tracking-tight">Frequently Asked Questions</h2>
        <p className="text-slate-950 font-normal text-sm md:text-base max-w-2xl mx-auto">
          Got questions? Here are honest, clear answers about our courses and admissions.
        </p>
      </div>
      <div className="space-y-4">
        {faqs.map(({ q, a }, i) => (
          <details key={i} className="group bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <summary className="flex items-center justify-between px-4 sm:px-6 py-4 cursor-pointer list-none select-none font-normal text-slate-950 text-sm md:text-base hover:bg-blue-50/50 transition-colors">
              <span className="pr-4">{q}</span>
              <span className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0 ml-4 group-open:rotate-45 transition-transform duration-300 text-lg font-light">+</span>
            </summary>
            <div className="px-6 pb-5 pt-3 text-slate-950 font-normal text-xs md:text-sm leading-relaxed border-t border-gray-100">{a}</div>
          </details>
        ))}
      </div>
      <div className="text-center mt-10">
        <Button href="/contact" variant="outline" className="rounded-full px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-normal border-slate-300 text-slate-950 hover:text-blue-700">
          Have More Questions? Contact Us →
        </Button>
      </div>
    </section>
  );
}

export function SocialSection() {
  return (
    <section className="relative py-24 overflow-hidden z-10 border-y border-slate-200 bg-slate-50/50">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-400/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-indigo-400/5 blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

        <h2 className="text-xl md:text-2xl font-normal text-slate-950 mb-4 tracking-tight">
          Stay Connected with <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent inline-block pb-1">
            @visionitinstitute
          </span>
        </h2>

        <p className="text-slate-950 text-sm md:text-base mb-10 max-w-xl mx-auto font-normal">
          Follow us for daily coding tips, student success stories, course updates, and behind-the-scenes campus life in Pratappur.
        </p>

        {/* 📸 Instagram Posts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-10">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 aspect-square flex flex-col justify-end"
              aria-label={`View Instagram post: ${post.title}`}
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Mini corner badge */}
              <div className="absolute top-2.5 right-2.5 bg-slate-950/60 backdrop-blur-md rounded-full p-1.5 text-white shadow-sm pointer-events-none group-hover:scale-110 transition-transform">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>

              {/* Hover overlay with post info */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                <span className="text-[11px] font-medium text-pink-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Instagram Post
                </span>
                <p className="text-white text-xs font-medium line-clamp-2">
                  {post.title}
                </p>
                <span className="text-[11px] text-pink-200 mt-1.5 inline-flex items-center gap-1 font-normal">
                  View on Instagram →
                </span>
              </div>
            </a>
          ))}
        </div>

        <a
          href="https://www.instagram.com/visionitinstitute"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 mb-6 px-5 py-2 bg-white text-pink-600 font-normal rounded-full border border-pink-200 hover:shadow-xl hover:shadow-pink-500/40 hover:-translate-y-1 transition-all duration-300 text-base group"
        >
          <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          Follow Us on Instagram
        </a>
      </div>
    </section>
  );
}


