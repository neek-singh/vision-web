import { createPublicSupabaseClient } from "@/lib/supabase-server";
import { Metadata } from "next";
import CoursesListClientWrapper from "@/components/CoursesListClientWrapper";

export const metadata: Metadata = {
  title: "Our Courses | Vision IT Computer Institute Pratappur",
  description: "Browse our government-recognized computer courses: DCA, ADCA, PGDCA, Web Development, and basic computer training.",
  keywords: "computer courses Pratappur, DCA course, PGDCA course, ADCA course, learn web development",
};

export const revalidate = 60;

export default async function CoursesPage() {
  const supabase = createPublicSupabaseClient();
  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching courses from DB:", error);
  }

  const displayCourses = courses || [];

  return (
    <main className="flex-col w-full bg-slate-50 min-h-screen">

      {/* Hero Section (Enhanced Gradient & Spacing) */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200 py-20 lg:py-32">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-blue-50 to-white pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-32 -left-24 w-72 h-72 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative container mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-blue-50 text-blue-700 font-semibold rounded-full text-sm border border-blue-200/60 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
            Programs For All Skill Levels
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Courses</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
            Find the perfect program to launch or advance your career in tech. All our courses include hands-on projects, expert mentorship, and career placement support.
          </p>
        </div>
      </section>

      {/* Courses List Component */}
      <section className="relative container mx-auto px-6 lg:px-8 -mt-8 z-10 pb-24">
        <CoursesListClientWrapper initialCourses={displayCourses} />
      </section>

      {/* Why Learn With Vision IT Section */}
      <section className="relative py-24 md:py-32 bg-slate-50/50 border-t border-slate-100 overflow-hidden z-10">

        {/* Ambient Background Elements */}
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-indigo-100/40 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-blue-50 text-blue-700 font-bold rounded-full text-sm border border-blue-100 shadow-sm uppercase tracking-wider">
              The Vision IT Advantage
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              Why Learn With <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Vision IT?</span>
            </h2>
            <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              We go beyond traditional textbook teaching to ensure you are truly industry-ready from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {[
              {
                title: "100% Practical Training",
                desc: "Ditch the heavy theory. Learn by doing in our advanced labs. We focus entirely on hands-on keyboard time so you master the skills.",
                color: "blue",
                bg: "bg-blue-50",
                text: "text-blue-600",
                groupHoverBg: "group-hover:bg-blue-600",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" /></svg>
              },
              {
                title: "Govt. Recognized Certificate",
                desc: "Add immediate value to your resume. Every successful graduate receives a government-recognized certification to build employer trust.",
                color: "indigo",
                bg: "bg-indigo-50",
                text: "text-indigo-600",
                groupHoverBg: "group-hover:bg-indigo-600",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>
              },
              {
                title: "Industry Expert Mentors",
                desc: "Learn directly from professionals who are up-to-date with the latest tech trends and know exactly what companies are looking for.",
                color: "violet",
                bg: "bg-violet-50",
                text: "text-violet-600",
                groupHoverBg: "group-hover:bg-violet-600",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
              },
              {
                title: "Real-World Projects",
                desc: "Don't just write code, build applications. Create a strong portfolio by working on real-world projects like management systems and SPAs.",
                color: "sky",
                bg: "bg-sky-50",
                text: "text-sky-600",
                groupHoverBg: "group-hover:bg-sky-600",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 13.29-3.33-10a1.2 1.2 0 0 0-1.41-.85l-7.25 1.51" /><path d="M17.16 5.86 6.8 3a1.2 1.2 0 0 0-1.41.85L2 13.29" /><path d="m5 10 9-3" /><path d="M2 14h20v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6Z" /></svg>
              },
              {
                title: "Placement Assistance",
                desc: "We support your career journey from day one with resume building, mock interviews, and direct connections to tech recruiters.",
                color: "emerald",
                bg: "bg-emerald-50",
                text: "text-emerald-600",
                groupHoverBg: "group-hover:bg-emerald-600",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
              },
              {
                title: "Modern Smart Labs",
                desc: "Experience high-speed learning in our comfortable, fully-equipped computer labs located conveniently in Pratappur.",
                color: "amber",
                bg: "bg-amber-50",
                text: "text-amber-600",
                groupHoverBg: "group-hover:bg-amber-600",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" /></svg>
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-2 hover:border-blue-100 transition-all duration-300 relative overflow-hidden"
              >
                {/* Subtle Hover Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

                <div className={`w-14 h-14 ${feature.bg} ${feature.text} rounded-2xl flex items-center justify-center mb-6 ${feature.groupHoverBg} group-hover:text-white transition-all duration-500 group-hover:scale-110 shadow-sm`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section (Clean Light Theme & Compact) */}
      <section className="relative py-16 lg:py-20 bg-white overflow-hidden z-10 border-t border-slate-100">

        {/* Subtle Top Glow (Reduced size so it doesn't stretch the page) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-48 bg-blue-50/80 blur-[80px] pointer-events-none rounded-full"></div>

        <div className="container mx-auto px-6 lg:px-8 max-w-4xl relative z-10">

          <div className="text-center mb-10 relative">
            <h2 className="text-3xl md:text-4xl font-black mb-3 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 pb-1">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-base md:text-lg font-medium">
              Everything you need to know about our courses, admissions, and campus.
            </p>
          </div>

          {/* Reduced gap between questions using space-y-3 */}
          <div className="space-y-3 max-w-3xl mx-auto">
            {[
              {
                q: "What courses do you specialize in?",
                a: "We offer specialized training in Full Stack Web Development (featuring modern tech like Tailwind CSS and Firebase), alongside core professional courses including PGDCA, DCA, ADCA, and BCC."
              },
              {
                q: "Do I need prior computer experience?",
                a: "Not at all! Our courses are designed for complete beginners. We focus heavily on 100% practical training, meaning you learn by actually doing, building your skills step-by-step from scratch."
              },
              {
                q: "Where are the classes held?",
                a: "We provide hands-on, physical classes at our campus located at Kadampara Chowk, Pratappur. This ensures you get direct, in-person mentorship and extensive access to our computer labs."
              },
              {
                q: "Do you provide recognized certificates?",
                a: "Yes! Upon successful completion of your course and practical exams, you will receive a Government Recognized Certificate, adding significant value and trust to your professional resume."
              },
              {
                q: "How does the online admission portal work?",
                a: "To ensure a secure and organized process, our online admission form is strictly accessible only after you log in. Once logged in, you can easily submit your details to the institute."
              },
              {
                q: "How can I contact the institute directly?",
                a: "You can reach out to our admission advisors anytime at +91 8103170595 for upcoming batch details, fee structures, or specific career guidance."
              }
            ].map((faq, index) => (
              <details
                key={index}
                // Reduced padding to p-5 md:p-6 for a tighter layout
                className="group bg-white open:bg-slate-50/50 p-5 md:p-6 rounded-[1.5rem] border border-slate-200 hover:border-blue-200 open:border-blue-300 open:shadow-[0_4px_20px_-5px_rgba(59,130,246,0.1)] transition-all duration-300 cursor-pointer"
              >
                <summary className="flex justify-between items-center font-bold list-none text-slate-800 text-base md:text-lg outline-none">
                  <span className="group-hover:text-blue-600 group-open:text-blue-700 transition-colors pr-6 tracking-wide">
                    {faq.q}
                  </span>

                  {/* Light Theme Animated Chevron */}
                  <span className="relative flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-50 border border-slate-100 group-hover:border-blue-200 group-open:bg-blue-50 group-open:border-blue-200 group-open:text-blue-600 transition-all duration-300 text-slate-400 flex-shrink-0 group-open:rotate-180">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="m6 9 6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>

                <div className="mt-4 pt-4 border-t border-slate-100 overflow-hidden">
                  <p className="text-slate-600 leading-relaxed font-medium transform transition-all duration-500 origin-top animate-in fade-in slide-in-from-top-2">
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>

          {/* Bottom CTA with tighter top margin */}
          <div className="text-center mt-8">
            <a href="tel:+918103170595" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition-colors duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Call +91 8103170595 for quick answers
            </a>
          </div>

        </div>
      </section>

    </main>
  );
}