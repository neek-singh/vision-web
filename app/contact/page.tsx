import { Metadata } from "next";
import ContactForm from "./ContactForm";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact Us | Vision IT Computer Institute Pratappur",
  description:
    "Contact Vision IT Computer Institute — the best computer institute in Pratappur. Enquire about DCA, ADCA, PGDCA, Web Development & AI courses.",
  keywords:
    "Contact computer institute Pratappur, Vision IT contact, DCA ADCA PGDCA admission enquiry",
  openGraph: {
    title: "Contact Vision IT Computer Institute",
    description:
      "Get in touch with Vision IT Computer Institute in Pratappur for admissions, course details, and enquiries.",
    type: "website",
  },
};

const WHATSAPP_NUMBER = "918103170595"; 
const PHONE_NUMBER = "+91 81031 70595"; 
const EMAIL = "visionitpratappur@gmail.com"; 
const ADDRESS = "Vision IT Computer Institute, kadampara chowk, Pratappur, Surajpur(C.G.) - 497223";

// 🔹 Upgraded InfoCard with ReactNode for SVG icons
function InfoCard({
  icon,
  title,
  value,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="group flex items-start gap-5 p-6 bg-white rounded-2xl shadow-sm border border-slate-200/60 hover:shadow-lg hover:-translate-y-1 hover:border-blue-200 transition-all duration-300">
      <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">{title}</p>
        <p className="text-slate-800 font-medium leading-relaxed">{value}</p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl">
      {content}
    </a>
  ) : (
    content
  );
}

export default function ContactPage() {
  return (
    <main className="flex-col w-full bg-slate-50 min-h-screen pb-24 md:pb-32">

      {/* Hero Section */}
      <section className="relative bg-white text-slate-900 rounded-b-[3rem] md:rounded-b-[4rem] overflow-hidden pt-32 pb-24 md:pb-32 px-6 lg:px-8 border-b border-slate-200/80 shadow-sm">
        {/* Soft Background Gradients */}
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-50/80 via-white to-white pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute top-48 -left-32 w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-[80px] pointer-events-none" />

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 bg-blue-50 text-blue-700 font-semibold rounded-full text-sm border border-blue-200/60 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            We're Here to Help
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Touch</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
            Have questions about our courses? Want to enroll? We'd love to hear from you. Reach out and we'll respond promptly.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-6 lg:px-8 max-w-7xl py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Left: Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Contact Information</h2>
              <p className="text-slate-500 text-base leading-relaxed">
                Reach us via phone, email, or visit us directly at our institute in Pratappur.
              </p>
            </div>

            <div className="space-y-4">
              <InfoCard
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>}
                title="Phone"
                value={PHONE_NUMBER}
                href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
              />
              <InfoCard
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>}
                title="Email"
                value={EMAIL}
                href={`mailto:${EMAIL}`}
              />
              <InfoCard
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>}
                title="Address"
                value={ADDRESS}
              />
              <InfoCard
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>}
                title="Working Hours"
                value="Mon – Sat: 8:00 AM – 6:00 PM"
              />
              <InfoCard
                icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>}
                title="Instagram"
                value="@visionitinstitute"
                href="https://instagram.com/visionitinstitute"
              />
              <InfoCard
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>}
                title="Facebook"
                value="@visionitinstitute"
                href="https://facebook.com/visionitinstitute"
              />
            </div>

            {/* Quick Action Buttons */}
            <div className="space-y-3 pt-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                Chat on WhatsApp
              </a>
              <a
                href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                className="flex items-center justify-center gap-2.5 w-full py-4 bg-white text-slate-700 hover:text-blue-700 hover:bg-slate-50 font-bold rounded-2xl shadow-sm border border-slate-200 hover:border-blue-200 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                Call Us Now
              </a>
            </div>
          </div>

          {/* Right: Form Area */}
          <div className="lg:col-span-3 bg-white p-8 md:p-12 rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100">
            <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Send Us a Message</h2>
            <p className="text-slate-500 text-base mb-10">Fill out the form below and our team will get back to you within 24 hours.</p>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Embedded Map */}
      <section className="container mx-auto px-6 lg:px-8 max-w-7xl pb-10">
        <div className="relative rounded-[2rem] overflow-hidden shadow-md border border-slate-200/80 h-[400px] bg-slate-100 group">
          {/* Optional Overlay to prevent accidental scrolling inside map */}
          <div className="absolute inset-0 bg-transparent group-hover:pointer-events-none transition-all z-10" />
          <iframe
            src="https://maps.google.com/maps?q=Vision+IT+Computer+Institute+Pratappur&t=k&z=19&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Vision IT Computer Institute Location"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container mx-auto px-6 lg:px-8 max-w-5xl pt-20">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-16 text-center relative overflow-hidden shadow-2xl">
          {/* Dark Mode Gradients for CTA */}
          <div className="absolute -right-24 -top-24 w-72 h-72 bg-blue-600/30 rounded-full blur-[80px]" />
          <div className="absolute -left-24 -bottom-24 w-72 h-72 bg-indigo-600/30 rounded-full blur-[80px]" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Ready to Start Learning?</h2>
            <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Join Vision IT and take the first step toward a successful tech career today. Expert mentorship awaits.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button href="/admissions" size="lg" className="px-10 h-14 shadow-xl shadow-blue-900/50 rounded-full font-bold text-lg">
                Enroll Now
              </Button>
              <Button
                href="/courses"
                size="lg"
                variant="outline"
                className="px-10 h-14 rounded-full bg-white/10 text-white border-slate-700 hover:bg-white/20 hover:border-slate-600 font-bold text-lg backdrop-blur-md"
              >
                Browse Courses
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}