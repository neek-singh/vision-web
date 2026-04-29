import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Vision IT Computer Institute",
  description:
    "Learn how Vision IT Computer Institute collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  const lastUpdated = "April 2026";

  const sections = [
    { id: "information-we-collect", title: "Information We Collect" },
    { id: "how-we-use", title: "How We Use Your Information" },
    { id: "cookies", title: "Cookies & Tracking" },
    { id: "third-party", title: "Third-Party Services" },
    { id: "security", title: "Data Security" },
    { id: "retention", title: "Data Retention" },
    { id: "your-rights", title: "Your Rights" },
    { id: "changes", title: "Changes to This Policy" },
    { id: "contact", title: "Contact Us" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 relative selection:bg-blue-100 selection:text-blue-900">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px] opacity-30 [mask-image:linear-gradient(to_bottom,white,transparent_80%)]" />

      {/* CHANGED: Reduced pt-24 to pt-8 lg:pt-12 for much less top space */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 md:pt-32 pb-32">


        {/* Header */}
        <div className="max-w-3xl mb-12">
          {/* CHANGED: Reduced mb-8 to mb-6 on the back link */}
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-6"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <div className="mt-6 flex items-center gap-3 text-slate-500">
            <span className="flex h-2.5 w-2.5 rounded-full bg-blue-500"></span>
            <p className="text-sm font-medium">Last updated: {lastUpdated}</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          {/* Sticky Sidebar Navigation */}
          <aside className="hidden lg:block w-64 shrink-0">
            {/* CHANGED: Reduced top-32 to top-20 so it sticks higher up the screen */}
            <div className="sticky top-20">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
                On this page
              </h3>
              <nav className="flex flex-col gap-3 border-l-2 border-slate-200">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="pl-4 text-sm text-slate-500 hover:text-blue-600 hover:border-blue-600 border-l-2 -ml-[2px] border-transparent transition-all"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content Card */}
          <div className="flex-1 bg-white border border-slate-200 rounded-3xl p-8 md:p-12 lg:p-16 shadow-sm">
            <div className="prose prose-slate prose-lg max-w-none text-slate-600 prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-li:marker:text-blue-500">

              <p className="text-xl leading-relaxed mb-10">
                At <strong>Vision IT Computer Institute</strong>, we are committed to protecting your privacy and ensuring transparency in how your data is handled. This policy outlines how we collect, use, and safeguard your personal information.
              </p>

              {/* Section 1 */}
              <div className="flex items-center gap-4 mb-6 mt-12" id="information-we-collect">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">1</span>
                <h2 className="!my-0">Information We Collect</h2>
              </div>
              <p>We collect personal information when you interact with our website, enroll in courses, or contact us:</p>
              <ul>
                <li>Full name, email address, and phone number</li>
                <li>Educational details for course recommendations</li>
                <li>Messages, inquiries, and submitted forms</li>
                <li>Technical data such as IP address and browser type</li>
              </ul>

              {/* Section 2 */}
              <div className="flex items-center gap-4 mb-6 mt-12" id="how-we-use">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">2</span>
                <h2 className="!my-0">How We Use Your Information</h2>
              </div>
              <ul>
                <li>To manage admissions and course enrollments</li>
                <li>To communicate updates, confirmations, and support</li>
                <li>To improve website performance and user experience</li>
                <li>To develop new courses and services</li>
              </ul>

              {/* Section 3 */}
              <div className="flex items-center gap-4 mb-6 mt-12" id="cookies">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">3</span>
                <h2 className="!my-0">Cookies & Tracking Technologies</h2>
              </div>
              <p>
                We may use cookies and similar technologies to enhance user experience, analyze traffic, and personalize content. You can disable cookies through your browser settings.
              </p>

              {/* Section 4 */}
              <div className="flex items-center gap-4 mb-6 mt-12" id="third-party">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">4</span>
                <h2 className="!my-0">Third-Party Services</h2>
              </div>
              <p>
                We may use trusted third-party tools (such as analytics or hosting providers) that process data on our behalf. These services follow their own privacy policies and industry standards.
              </p>

              {/* Section 5 */}
              <div className="flex items-center gap-4 mb-6 mt-12" id="security">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">5</span>
                <h2 className="!my-0">Data Security</h2>
              </div>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, or disclosure.
              </p>

              {/* Section 6 */}
              <div className="flex items-center gap-4 mb-6 mt-12" id="retention">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">6</span>
                <h2 className="!my-0">Data Retention</h2>
              </div>
              <p>
                We retain your information only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
              </p>

              {/* Section 7 */}
              <div className="flex items-center gap-4 mb-6 mt-12" id="your-rights">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">7</span>
                <h2 className="!my-0">Your Rights</h2>
              </div>
              <ul>
                <li>Request access to your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent at any time</li>
              </ul>

              {/* Section 8 */}
              <div className="flex items-center gap-4 mb-6 mt-12" id="changes">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">8</span>
                <h2 className="!my-0">Changes to This Policy</h2>
              </div>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.
              </p>

              {/* Section 9 */}
              <div className="flex items-center gap-4 mb-6 mt-12" id="contact">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">9</span>
                <h2 className="!my-0">Contact Us</h2>
              </div>
              <p>
                If you have any questions or concerns about this Privacy Policy, please reach out to us:
              </p>

              {/* Enhanced Contact Card */}
              <div className="not-prose mt-8 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Vision IT Computer Institute</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 text-slate-600">
                    <svg className="w-5 h-5 mt-0.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Email Address</p>
                      <a href="mailto:visionitpratappur@gmail.com" className="text-blue-600 hover:text-blue-700 transition-colors">visionitpratappur@gmail.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-slate-600">
                    <svg className="w-5 h-5 mt-0.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Location</p>
                      <p>Pratappur</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}