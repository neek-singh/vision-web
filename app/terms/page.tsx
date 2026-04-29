import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Vision IT Computer Institute",
  description:
    "Terms and conditions for students and users of Vision IT Computer Institute services and courses.",
};

export default function TermsPage() {
  const lastUpdated = "April 2026";

  const sections = [
    { id: "acceptance", title: "Acceptance of Terms" },
    { id: "admissions", title: "Admissions & Fee Policy" },
    { id: "responsibilities", title: "Student Responsibilities" },
    { id: "violations", title: "Code of Conduct Violations" },
    { id: "ip", title: "Intellectual Property" },
    { id: "certification", title: "Certification Policy" },
    { id: "liability", title: "Limitation of Liability" },
    { id: "website-usage", title: "Website Usage" },
    { id: "termination", title: "Termination of Services" },
    { id: "governing-law", title: "Governing Law" },
    { id: "changes", title: "Changes to Terms" },
    { id: "contact", title: "Contact Information" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 relative selection:bg-blue-100 selection:text-blue-900">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px] opacity-30 [mask-image:linear-gradient(to_bottom,white,transparent_80%)]" />

      {/* Main Container with reduced top padding */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 md:pt-32 pb-32">


        {/* Header */}
        <div className="max-w-3xl mb-12">
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
            Terms of Service
          </h1>
          <div className="mt-6 flex items-center gap-3 text-slate-500">
            <span className="flex h-2.5 w-2.5 rounded-full bg-blue-500"></span>
            <p className="text-sm font-medium">Last updated: {lastUpdated}</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          {/* Sticky Sidebar Navigation (Table of Contents) */}
          <aside className="hidden lg:block w-64 shrink-0">
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
                Welcome to <strong>Vision IT Computer Institute</strong>. By accessing our website, enrolling in courses, or using our services, you agree to comply with the following Terms of Service.
              </p>

              {/* Section 1 */}
              <div className="flex items-center gap-4 mb-6 mt-12" id="acceptance">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">1</span>
                <h2 className="!my-0">Acceptance of Terms</h2>
              </div>
              <p>
                By registering or interacting with our institute (online or offline), you confirm that you have read, understood, and agreed to these terms. If you do not agree, you should not use our services.
              </p>

              {/* Section 2 */}
              <div className="flex items-center gap-4 mb-6 mt-12" id="admissions">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">2</span>
                <h2 className="!my-0">Admissions & Fee Policy</h2>
              </div>
              <ul>
                <li>All admissions are subject to seat availability and verification.</li>
                <li>Fees must be paid as per the selected installment plan.</li>
                <li>Failure to pay fees may result in suspension of classes or services.</li>
                <li>Admission fees are generally non-refundable unless explicitly stated.</li>
                <li>Course upgrades or transfers are subject to management approval.</li>
              </ul>

              {/* Section 3 */}
              <div className="flex items-center gap-4 mb-6 mt-12" id="responsibilities">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">3</span>
                <h2 className="!my-0">Student Responsibilities</h2>
              </div>
              <ul>
                <li>Maintain discipline inside classrooms and labs.</li>
                <li>Use institute systems only for educational purposes.</li>
                <li>Do not install unauthorized software or access restricted content.</li>
                <li>Respect faculty, staff, and fellow students.</li>
              </ul>

              {/* Section 4 */}
              <div className="flex items-center gap-4 mb-6 mt-12" id="violations">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">4</span>
                <h2 className="!my-0">Code of Conduct Violations</h2>
              </div>
              <p>
                Any misuse of institute resources, including damage to hardware, illegal downloads, or disruptive behavior, may result in suspension or permanent termination without refund.
              </p>

              {/* Section 5 */}
              <div className="flex items-center gap-4 mb-6 mt-12" id="ip">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">5</span>
                <h2 className="!my-0">Intellectual Property</h2>
              </div>
              <p>
                All course materials, notes, software, designs, and certifications provided by Vision IT are the intellectual property of the institute and cannot be copied, distributed, or sold without written permission.
              </p>

              {/* Section 6 */}
              <div className="flex items-center gap-4 mb-6 mt-12" id="certification">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">6</span>
                <h2 className="!my-0">Certification Policy</h2>
              </div>
              <ul>
                <li>Certificates are issued only after successful completion of the course.</li>
                <li>Attendance and performance criteria must be fulfilled.</li>
                <li>Misconduct may result in certificate cancellation.</li>
              </ul>

              {/* Section 7 */}
              <div className="flex items-center gap-4 mb-6 mt-12" id="liability">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">7</span>
                <h2 className="!my-0">Limitation of Liability</h2>
              </div>
              <p>
                Vision IT Computer Institute is not liable for any direct or indirect damages, including data loss, career outcomes, or technical issues arising from the use of our services or training programs.
              </p>

              {/* Section 8 */}
              <div className="flex items-center gap-4 mb-6 mt-12" id="website-usage">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">8</span>
                <h2 className="!my-0">Website Usage</h2>
              </div>
              <ul>
                <li>Do not attempt to hack, disrupt, or misuse the website.</li>
                <li>Do not submit false or misleading information.</li>
                <li>Unauthorized use may result in legal action.</li>
              </ul>

              {/* Section 9 */}
              <div className="flex items-center gap-4 mb-6 mt-12" id="termination">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">9</span>
                <h2 className="!my-0">Termination of Services</h2>
              </div>
              <p>
                We reserve the right to suspend or terminate access to our services at any time if users violate these terms or engage in harmful activities.
              </p>

              {/* Section 10 */}
              <div className="flex items-center gap-4 mb-6 mt-12" id="governing-law">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">10</span>
                <h2 className="!my-0">Governing Law</h2>
              </div>
              <p>
                These terms are governed by the laws of India. Any disputes shall fall under the jurisdiction of local courts in Surajpur, Chhattisgarh.
              </p>

              {/* Section 11 */}
              <div className="flex items-center gap-4 mb-6 mt-12" id="changes">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">11</span>
                <h2 className="!my-0">Changes to Terms</h2>
              </div>
              <p>
                We may update these Terms of Service at any time. Continued use of our services after changes implies acceptance of the revised terms.
              </p>

              {/* Section 12 */}
              <div className="flex items-center gap-4 mb-6 mt-12" id="contact">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">12</span>
                <h2 className="!my-0">Contact Information</h2>
              </div>

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