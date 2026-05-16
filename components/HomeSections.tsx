"use client";

import { Button } from "@/components/ui/Button";

export function FAQSection() {
  return (
    <section className="container mx-auto px-6 lg:px-8 py-24 max-w-4xl">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-blue-950 mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Got questions? We&apos;ve got answers. Find everything you need to know about our courses and admissions.
        </p>
      </div>
      <div className="space-y-4">
        {[
          { q: "What courses do you offer at Vision IT?", a: "We offer DCA, ADCA, PGDCA, Full Stack Web Development, UI/UX Design, Data Science & AI, and more. Each course is industry-ready and practically focused." },
          { q: "What are the fees and duration of courses?", a: "Courses range from 3 to 12 months. Fees are highly affordable with flexible installment options. Contact us for the latest fee structure." },
          { q: "Do I get a certificate after completing the course?", a: "Yes! All students receive a government-recognized certificate upon successful completion, which is highly valued by employers." },
          { q: "Is job placement support available?", a: "Yes. We provide resume building, mock interviews, and industry connections to help students land their first tech job." },
          { q: "How do I enroll in a course?", a: "Click the Apply Now button, visit our institute in Pratappur, or reach us on WhatsApp for instant assistance." },
          { q: "What is the batch schedule like?", a: "We offer both morning and evening batches. New batches start every month. Reach out to know the upcoming batch dates." },
        ].map(({ q, a }, i) => (
          <details key={i} className="group bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <summary className="flex items-center justify-between px-7 py-5 cursor-pointer list-none select-none font-semibold text-blue-950 text-lg hover:bg-blue-50/50 transition-colors">
              <span>{q}</span>
              <span className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0 ml-4 group-open:rotate-45 transition-transform duration-300 text-xl font-light">+</span>
            </summary>
            <div className="px-7 pb-6 pt-3 text-gray-600 leading-relaxed border-t border-gray-50">{a}</div>
          </details>
        ))}
      </div>
      <div className="text-center mt-10">
        <Button href="/contact" variant="outline" className="rounded-full px-8 py-4">
          Have More Questions? Contact Us →
        </Button>
      </div>
    </section>
  );
}

export function SocialSection() {
  return (
    <section className="relative py-24 overflow-hidden z-10 border-y border-slate-100 bg-slate-50/50">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-400/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-indigo-400/5 blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 bg-white/60 backdrop-blur-md text-pink-600 font-bold rounded-full text-sm border border-pink-100 shadow-[0_2px_10px_rgb(236,72,153,0.1)] transition-transform hover:scale-105 cursor-default">
          <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          Follow Us on Instagram
        </div>

        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5 tracking-tight">
          Stay Connected with <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent inline-block pb-1">
            @visionitinstitute
          </span>
        </h2>

        <p className="text-slate-600 text-lg mb-12 max-w-xl mx-auto font-medium">
          Follow us for daily coding tips, student success stories, course updates, and behind-the-scenes campus life in Pratappur.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto mb-14">
          {[
            { emoji: "💻", label: "Coding Class" },
            { emoji: "🎓", label: "Graduation" },
            { emoji: "🏆", label: "Achievement" },
            { emoji: "👨‍💻", label: "Workshop" },
            { emoji: "📊", label: "Data Science" },
            { emoji: "🚀", label: "Placement" },
          ].map(({ emoji, label }, i) => (
            <a
              key={i}
              href="https://instagram.com/visionitinstitute"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square bg-white/70 backdrop-blur-xl rounded-[2rem] flex flex-col items-center justify-center border border-white/80 shadow-[0_4px_15px_rgb(0,0,0,0.02)] hover:-translate-y-2 hover:shadow-[0_15px_30px_-5px_rgba(236,72,153,0.2)] hover:border-pink-200/50 transition-all duration-300 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 text-pink-500">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
              </div>
              <span className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300 relative z-10">{emoji}</span>
              <span className="text-xs text-slate-600 font-bold tracking-wide relative z-10">{label}</span>
            </a>
          ))}
        </div>

        <a
          href="https://www.instagram.com/visionitinstitute"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold rounded-full shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/40 hover:-translate-y-1 transition-all duration-300 text-lg group"
        >
          <svg className="w-6 h-6 transition-transform group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          Follow @visionitinstitute
        </a>
      </div>
    </section>
  );
}
