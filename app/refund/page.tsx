import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Vision IT Computer Institute",
  description:
    "Read the detailed fee refund, cancellation, and course withdrawal policy at Vision IT Computer Institute.",
};

export default function RefundPage() {
  const lastUpdated = "June 2026";

  const sections = [
    { id: "fee-transparency", title: "Fee Transparency" },
    { id: "cancellation-rules", title: "Course Cancellation & Withdrawal" },
    { id: "refund-eligibility", title: "Refund Eligibility" },
    { id: "non-refundable", title: "Non-Refundable Fees" },
    { id: "request-process", title: "How to Request a Refund" },
    { id: "batch-transfer", title: "Batch Transfer & Rescheduling" },
    { id: "contact", title: "Contact Us" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 relative selection:bg-blue-100 selection:text-blue-900">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px] opacity-30 [mask-image:linear-gradient(to_bottom,white,transparent_80%)]" />

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
            Refund & Cancellation Policy
          </h1>
          <div className="mt-6 flex items-center gap-3 text-slate-500">
            <span className="flex h-2.5 w-2.5 rounded-full bg-blue-500"></span>
            <p className="text-sm font-medium">Last updated: {lastUpdated}</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          {/* Sticky Sidebar Navigation */}
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
                At <strong>Vision IT Computer Institute</strong>, we strive to provide high-quality education and training programs. We understand that plans can change, and we want to ensure a fair and transparent process for fee refunds, course cancellations, and withdrawals.
              </p>

              {/* Section 1 */}
              <div className="flex items-center gap-4 mb-6 mt-12" id="fee-transparency">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">1</span>
                <h2 className="!my-0">Fee Transparency</h2>
              </div>
              <p>
                All course fees, registration fees, and other charges are clearly stated before enrollment. Students are encouraged to attend trial classes (if available) or review course details carefully before making payments.
              </p>

              {/* Section 2 */}
              <div className="flex items-center gap-4 mb-6 mt-12" id="cancellation-rules">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">2</span>
                <h2 className="!my-0">Course Cancellation & Withdrawal</h2>
              </div>
              <p>
                Students have the right to withdraw from a course at any time. Depending on the timing of the withdrawal, a partial refund or credit may be available as detailed below:
              </p>
              <ul>
                <li><strong>Withdrawal before batch start:</strong> Full refund of course fees (excluding admission registration fee).</li>
                <li><strong>Withdrawal within first 7 days:</strong> 70% refund of the course tuition fee paid.</li>
                <li><strong>Withdrawal after 7 days:</strong> No refunds are applicable after the first week of class.</li>
              </ul>

              {/* Section 3 */}
              <div className="flex items-center gap-4 mb-6 mt-12" id="refund-eligibility">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">3</span>
                <h2 className="!my-0">Refund Eligibility</h2>
              </div>
              <p>
                Refunds are eligible only when:
              </p>
              <ul>
                <li>The withdrawal request is submitted in writing or via registered email within the designated timelines.</li>
                <li>The institute cancels a course or postpones a batch start date by more than 30 days, in which case students are eligible for a 100% refund of the fees paid.</li>
              </ul>

              {/* Section 4 */}
              <div className="flex items-center gap-4 mb-6 mt-12" id="non-refundable">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">4</span>
                <h2 className="!my-0">Non-Refundable Fees</h2>
              </div>
              <p>
                The following fees are strictly non-refundable and non-transferable under any circumstances:
              </p>
              <ul>
                <li>Admission registration fees and prospectus charges.</li>
                <li>Examination fees or university/board registration fees already processed.</li>
                <li>Printed study materials, bags, kits, or books already distributed.</li>
                <li>GST or other statutory taxes collected at the time of payment.</li>
              </ul>

              {/* Section 5 */}
              <div className="flex items-center gap-4 mb-6 mt-12" id="request-process">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">5</span>
                <h2 className="!my-0">How to Request a Refund</h2>
              </div>
              <p>
                To initiate a withdrawal and request a refund, please follow these steps:
              </p>
              <ol>
                <li>Obtain a <strong>Course Withdrawal Form</strong> from the office administration or request one by email at <a href="mailto:visionitpratappur@gmail.com">visionitpratappur@gmail.com</a>.</li>
                <li>Submit the completed form along with original payment receipts and bank account details for processing.</li>
                <li>Approved refunds will be processed via bank transfer or cheque within <strong>7 to 10 working days</strong> from the date of submission of the withdrawal form.</li>
              </ol>

              {/* Section 6 */}
              <div className="flex items-center gap-4 mb-6 mt-12" id="batch-transfer">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">6</span>
                <h2 className="!my-0">Batch Transfer & Rescheduling</h2>
              </div>
              <p>
                Instead of a refund, students may opt for a batch transfer or course suspension. Requests to pause enrollment or change batch timings must be submitted to the center director. Paused admissions can be reactivated within 6 months of the pause date without any additional charges, subject to batch availability.
              </p>

              {/* Section 7 */}
              <div className="flex items-center gap-4 mb-6 mt-12" id="contact">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">7</span>
                <h2 className="!my-0">Contact Us</h2>
              </div>
              <p>
                If you have any questions or require assistance regarding our Refund & Cancellation Policy, please contact the center office:
              </p>

              {/* Contact Card */}
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
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Phone number</p>
                      <a href="tel:+918103170595" className="text-blue-600 hover:text-blue-700 transition-colors">+91 81031 70595</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-slate-600">
                    <svg className="w-5 h-5 mt-0.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Location</p>
                      <p>Kadampara Chowk, Pratappur, Surajpur (C.G.) - 497223</p>
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
