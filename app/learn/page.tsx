import { Button } from "@/components/ui/Button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vision Learn - Student Portal | Vision IT Computer Institute",
  description:
    "Access your course materials, track progress, submit assignments, and interact with instructors on Vision Learn – our powerful Learning Management System.",
  keywords:
    "Vision Learn, student portal, LMS, online learning, course materials, assignments, Vision IT",
};

/* ─── Icon Components ─── */
const IconVideo = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
);
const IconChart = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
);
const IconBook = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
);
const IconShield = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
);
const IconChat = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
);
const IconCalendar = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
);
const IconCertificate = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
);
const IconDevice = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
);
const IconCode = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
);
const IconDownload = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
);
const IconBell = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
);
const IconUsers = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
);
const IconArrow = () => (
  <svg className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
);
const IconCheck = () => (
  <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
);
const IconX = () => (
  <svg className="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
);


/* ─── Data ─── */
const features = [
  {
    icon: <IconVideo />,
    title: "On-Demand Video Lectures",
    desc: "Missed a class? No problem. Re-watch recorded sessions, video tutorials, and coding walkthroughs anytime, anywhere. Pause, rewind, and learn at your own pace.",
    color: "blue",
  },
  {
    icon: <IconChart />,
    title: "Real-Time Progress Tracking",
    desc: "Visualize your learning journey with detailed dashboards. Track completed modules, monitor quiz scores, and see how close you are to course completion.",
    color: "indigo",
  },
  {
    icon: <IconBook />,
    title: "Assignments & Study Materials",
    desc: "Download PDF notes, source code files, and practice exercises. Submit project assignments directly through the portal for instructor review and feedback.",
    color: "purple",
  },
  {
    icon: <IconShield />,
    title: "Secure Student Portal",
    desc: "Your data is safe with us. Access your personalized dashboard with secure login credentials. All sessions are encrypted and protected.",
    color: "emerald",
  },
  {
    icon: <IconChat />,
    title: "Doubt Resolution & Chat",
    desc: "Ask questions, participate in discussions, and get your doubts resolved by instructors. Never feel stuck — help is always just a message away.",
    color: "amber",
  },
  {
    icon: <IconCalendar />,
    title: "Batch Schedule & Timetable",
    desc: "View your class schedule, upcoming batch timings, and exam dates all in one place. Stay organized and never miss an important session.",
    color: "rose",
  },
  {
    icon: <IconCertificate />,
    title: "Digital Certificates",
    desc: "Upon course completion, receive digitally verified certificates that you can download, share on LinkedIn, and showcase to employers.",
    color: "cyan",
  },
  {
    icon: <IconDevice />,
    title: "Mobile Responsive Access",
    desc: "Access Vision Learn on any device — desktop, tablet, or mobile phone. The portal is fully optimized for all screen sizes for learning on-the-go.",
    color: "violet",
  },
  {
    icon: <IconCode />,
    title: "Live Coding Playground",
    desc: "Practice coding directly in the browser with our built-in code editor. Run HTML, CSS, JavaScript, and Python code without installing anything.",
    color: "sky",
  },
  {
    icon: <IconDownload />,
    title: "Offline Downloads",
    desc: "Download lecture notes and reference materials for offline study. Perfect for students with limited internet access.",
    color: "teal",
  },
  {
    icon: <IconBell />,
    title: "Smart Notifications",
    desc: "Get instant alerts for new assignments, class updates, results, and announcements. Stay informed about everything happening in your course.",
    color: "orange",
  },
  {
    icon: <IconUsers />,
    title: "Community & Peer Learning",
    desc: "Connect with fellow students, collaborate on projects, and learn together. Build your professional network from day one.",
    color: "pink",
  },
];

const colorMap: Record<string, { bg: string; text: string; hoverBg: string; hoverCard: string; border: string }> = {
  blue: { bg: "bg-blue-100", text: "text-blue-600", hoverBg: "group-hover:bg-blue-600", hoverCard: "hover:bg-blue-50", border: "border-blue-100" },
  indigo: { bg: "bg-indigo-100", text: "text-indigo-600", hoverBg: "group-hover:bg-indigo-600", hoverCard: "hover:bg-indigo-50", border: "border-indigo-100" },
  purple: { bg: "bg-purple-100", text: "text-purple-600", hoverBg: "group-hover:bg-purple-600", hoverCard: "hover:bg-purple-50", border: "border-purple-100" },
  emerald: { bg: "bg-emerald-100", text: "text-emerald-600", hoverBg: "group-hover:bg-emerald-600", hoverCard: "hover:bg-emerald-50", border: "border-emerald-100" },
  amber: { bg: "bg-amber-100", text: "text-amber-600", hoverBg: "group-hover:bg-amber-600", hoverCard: "hover:bg-amber-50", border: "border-amber-100" },
  rose: { bg: "bg-rose-100", text: "text-rose-600", hoverBg: "group-hover:bg-rose-600", hoverCard: "hover:bg-rose-50", border: "border-rose-100" },
  cyan: { bg: "bg-cyan-100", text: "text-cyan-600", hoverBg: "group-hover:bg-cyan-600", hoverCard: "hover:bg-cyan-50", border: "border-cyan-100" },
  violet: { bg: "bg-violet-100", text: "text-violet-600", hoverBg: "group-hover:bg-violet-600", hoverCard: "hover:bg-violet-50", border: "border-violet-100" },
  sky: { bg: "bg-sky-100", text: "text-sky-600", hoverBg: "group-hover:bg-sky-600", hoverCard: "hover:bg-sky-50", border: "border-sky-100" },
  teal: { bg: "bg-teal-100", text: "text-teal-600", hoverBg: "group-hover:bg-teal-600", hoverCard: "hover:bg-teal-50", border: "border-teal-100" },
  orange: { bg: "bg-orange-100", text: "text-orange-600", hoverBg: "group-hover:bg-orange-600", hoverCard: "hover:bg-orange-50", border: "border-orange-100" },
  pink: { bg: "bg-pink-100", text: "text-pink-600", hoverBg: "group-hover:bg-pink-600", hoverCard: "hover:bg-pink-50", border: "border-pink-100" },
};

const journeySteps = [
  { step: "01", title: "Sign Up & Enroll", desc: "Create your free account and enroll in your preferred course through the institute." },
  { step: "02", title: "Get Your Credentials", desc: "Receive unique login credentials to access the Vision Learn student portal." },
  { step: "03", title: "Start Learning", desc: "Watch lectures, download materials, complete assignments, and track your progress." },
  { step: "04", title: "Get Certified", desc: "Complete all modules, pass the final assessment, and download your digital certificate." },
];

const stats = [
  { value: "15+", label: "Active Students" },
  { value: "50+", label: "Video Lectures" },
  { value: "24/7", label: "Portal Access" },
  { value: "100%", label: "Mobile Friendly" },
];

const faqs = [
  {
    q: "How do I access Vision Learn?",
    a: "After enrolling at Vision IT Computer Institute, you'll receive login credentials. Visit learn.visionitinstitute.com and log in with your student email and password.",
  },
  {
    q: "Is Vision Learn free for enrolled students?",
    a: "Yes! Vision Learn is completely free for all students enrolled in any course at Vision IT Computer Institute. It's included with your course fee.",
  },
  {
    q: "Can I access lectures on my mobile phone?",
    a: "Absolutely. Vision Learn is fully responsive and works seamlessly on mobile phones, tablets, and desktop computers.",
  },
  {
    q: "What if I forget my password?",
    a: "You can reset your password using the 'Forgot Password' link on the login page. You'll receive a reset link on your registered email.",
  },
  {
    q: "Can I download lecture notes for offline study?",
    a: "Yes, all PDF notes and study materials can be downloaded for offline access. Video lectures require an internet connection.",
  },
  {
    q: "How long can I access the portal after course completion?",
    a: "You retain access to your course materials for 6 months after course completion, so you can revisit and revise anytime.",
  },
];

const comparisonData = [
  { feature: "24/7 Access to Materials", learn: true, traditional: false },
  { feature: "Recorded Video Lectures", learn: true, traditional: false },
  { feature: "Real-Time Progress Dashboard", learn: true, traditional: false },
  { feature: "Online Assignment Submission", learn: true, traditional: false },
  { feature: "Digital Certificates", learn: true, traditional: false },
  { feature: "Mobile-Friendly Access", learn: true, traditional: false },
  { feature: "Instructor Doubt Resolution", learn: true, traditional: true },
  { feature: "Hands-on Lab Practice", learn: true, traditional: true },
];


export default function LearnPage() {
  return (
    <main className="min-h-screen bg-white pt-20 flex flex-col relative overflow-hidden">

      {/* ════════════════════════════════════════════════════════════
          1. HERO SECTION
      ════════════════════════════════════════════════════════════ */}
      <section className="relative bg-slate-50 pt-16 pb-24 overflow-hidden border-b border-slate-200/60">
        {/* Gradient backgrounds */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/70 via-slate-50 to-slate-50 pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/40 rounded-full blur-[80px] opacity-80 pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-indigo-400/40 rounded-full blur-[80px] opacity-80 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-purple-400/20 rounded-full blur-[60px] pointer-events-none" />

        {/* Tech Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 bg-blue-50 text-blue-700 font-semibold rounded-full text-xs border border-blue-200/60 shadow-sm cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            Official Digital Campus • LMS Portal
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4 leading-tight text-slate-900">
            Your Classroom, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Everywhere You Go.
            </span>
          </h1>

          <p className="text-sm md:text-base text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Experience seamless learning with <strong className="text-slate-800">Vision Learn</strong> — our powerful Learning Management System.
            Access courses, track progress, submit assignments, and connect with instructors <span className="font-semibold text-blue-600">24/7</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <Button
              href="https://learn.visionitinstitute.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl flex items-center justify-center border-none group"
            >
              Login to Portal
              <IconArrow />
            </Button>
            <Button
              href="#features"
              variant="outline"
              className="w-full sm:w-auto px-7 h-12 rounded-full bg-white shadow-sm border border-slate-200 text-slate-700 hover:!text-white hover:!bg-slate-900 hover:!border-slate-900 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center font-semibold text-sm"
            >
              Explore Features ↓
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <IconShield />
              Secure Login
            </span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span className="flex items-center gap-1.5">
              <IconDevice />
              All Devices
            </span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span className="flex items-center gap-1.5">
              <IconVideo />
              HD Videos
            </span>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          2. DASHBOARD MOCKUP SECTION
      ════════════════════════════════════════════════════════════ */}
      <section className="relative -mt-12 z-20 px-6 lg:px-8 pb-12">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-slate-900 rounded-2xl shadow-2xl shadow-slate-900/30 border border-slate-700/50 overflow-hidden flex items-center justify-center aspect-video relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-indigo-500/30 mix-blend-overlay" />

            {/* Abstract dashboard representation */}
            <div className="w-full h-full p-4 md:p-6 flex flex-col gap-3 bg-slate-900/95 backdrop-blur-sm">
              {/* Navbar mock */}
              <div className="flex items-center gap-3 mb-2 border-b border-slate-800 pb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-inner" />
                <div className="h-5 w-28 bg-slate-800 rounded-md" />
                <div className="ml-auto flex gap-2 items-center">
                  <div className="h-3 w-3 bg-emerald-400/80 rounded-full animate-pulse" />
                  <div className="h-8 w-8 bg-slate-800 rounded-full" />
                </div>
              </div>

              {/* Content Area mock */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
                <div className="md:col-span-2 flex flex-col gap-4">
                  {/* Main Video block */}
                  <div className="flex-grow bg-slate-800 rounded-xl border border-slate-700 relative overflow-hidden group-hover:border-blue-500/50 transition-colors duration-500 shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 group-hover:scale-110 transition-transform duration-500">
                      <div className="w-4 h-4 bg-white rounded-sm transform translate-x-0.5 [clip-path:polygon(0_0,0_100%,100%_50%)]" />
                    </div>
                    {/* Progress bar mock */}
                    <div className="absolute bottom-0 left-0 w-full h-1.5 bg-slate-700">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 w-2/5 rounded-r-full" />
                    </div>
                  </div>
                </div>

                {/* Sidebar mock */}
                <div className="hidden md:flex col-span-1 flex-col gap-3">
                  <div className="h-24 bg-slate-800 rounded-xl border border-slate-700 p-3 flex flex-col gap-2">
                    <div className="h-3 w-16 bg-blue-500/40 rounded" />
                    <div className="h-2 w-full bg-slate-700 rounded mt-auto" />
                    <div className="h-2 w-3/4 bg-slate-700 rounded" />
                    <div className="h-2 w-1/2 bg-emerald-500/30 rounded" />
                  </div>
                  <div className="flex-grow bg-slate-800 rounded-xl border border-slate-700 p-3 flex flex-col gap-2">
                    <div className="h-7 w-full bg-slate-700/50 rounded-md flex items-center px-2 gap-2">
                      <div className="w-3 h-3 bg-emerald-400/50 rounded-full" />
                      <div className="h-2 w-16 bg-slate-600 rounded" />
                    </div>
                    <div className="h-7 w-full bg-slate-700/50 rounded-md flex items-center px-2 gap-2">
                      <div className="w-3 h-3 bg-emerald-400/50 rounded-full" />
                      <div className="h-2 w-20 bg-slate-600 rounded" />
                    </div>
                    <div className="h-7 w-full bg-slate-700/50 rounded-md" />
                    <div className="h-7 w-full bg-blue-600/20 border border-blue-500/30 rounded-md mt-1 relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
                    </div>
                    <div className="h-7 w-full bg-slate-700/50 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-slate-400 mt-3 font-medium">
            ↑ Vision Learn Student Dashboard Preview
          </p>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          3. STATS BAR
      ════════════════════════════════════════════════════════════ */}
      <section className="py-10 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  {s.value}
                </div>
                <div className="text-xs md:text-sm text-slate-500 font-medium mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          4. FEATURES SECTION (12 Features Grid)
      ════════════════════════════════════════════════════════════ */}
      <section id="features" className="py-20 bg-white relative">
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-indigo-50 text-indigo-700 font-semibold rounded-full text-xs border border-indigo-200/60">
              Platform Features
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-3">
              Everything You Need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Succeed</span>
            </h2>
            <p className="text-xs md:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Our custom-built Learning Management System provides all the tools required to master your tech skills — bridging the gap between classroom and home.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => {
              const c = colorMap[f.color];
              return (
                <div
                  key={f.title}
                  className={`bg-slate-50/80 rounded-2xl p-6 ${c.hoverCard} transition-all duration-300 group border border-slate-100 hover:shadow-md hover:-translate-y-0.5`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 ${c.bg} ${c.text} rounded-xl flex items-center justify-center group-hover:scale-110 ${c.hoverBg} group-hover:text-white transition-all duration-300 shadow-sm shrink-0`}
                    >
                      {f.icon}
                    </div>
                    <h3 className="text-sm md:text-base font-semibold text-slate-900">{f.title}</h3>
                  </div>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          5. HOW IT WORKS (Student Journey)
      ════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-200/30 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-200/30 rounded-full blur-[80px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 max-w-5xl relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-blue-50 text-blue-700 font-semibold rounded-full text-xs border border-blue-200/60">
              Student Journey
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-3">
              How Vision Learn <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Works</span>
            </h2>
            <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
              Getting started is simple. Follow these four easy steps to begin your learning journey with us.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {journeySteps.map((s, i) => (
              <div key={s.step} className="relative">
                {/* Connector line (hidden on last item & mobile) */}
                {i < journeySteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+2rem)] w-[calc(100%-2rem)] h-px bg-gradient-to-r from-blue-300 to-indigo-200 z-0" />
                )}
                <div className="relative bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-center z-10">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-500/20">
                    {s.step}
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          6. COMPARISON TABLE: Vision Learn vs Traditional
      ════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-emerald-50 text-emerald-700 font-semibold rounded-full text-xs border border-emerald-200/60">
              Why Vision Learn?
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-3">
              Vision Learn vs <span className="text-slate-400">Traditional Learning</span>
            </h2>
            <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
              See how our digital learning platform gives you an edge over traditional classroom-only education.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-slate-100 border-b border-slate-200">
              <div className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Feature</div>
              <div className="px-5 py-4 text-xs font-bold text-blue-600 uppercase tracking-wider text-center">Vision Learn</div>
              <div className="px-5 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Traditional</div>
            </div>
            {/* Table Rows */}
            {comparisonData.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 items-center ${i < comparisonData.length - 1 ? "border-b border-slate-100" : ""} hover:bg-white transition-colors`}
              >
                <div className="px-5 py-3.5 text-xs md:text-sm text-slate-700 font-medium">{row.feature}</div>
                <div className="px-5 py-3.5 flex justify-center">
                  {row.learn ? <IconCheck /> : <IconX />}
                </div>
                <div className="px-5 py-3.5 flex justify-center">
                  {row.traditional ? <IconCheck /> : <IconX />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          7. FEATURE DEEP-DIVE SECTION
      ════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-1/2 -translate-y-1/2 -right-32 w-96 h-96 bg-blue-200/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 max-w-5xl relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-purple-50 text-purple-700 font-semibold rounded-full text-xs border border-purple-200/60">
              Deep Dive
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-3">
              Features <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Explained</span>
            </h2>
          </div>

          {/* Feature 1: Video Lectures */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <div>
              <div className="inline-flex items-center gap-2 mb-3 px-2 py-0.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold">
                <IconVideo /> Video Learning
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">HD Video Lectures with Playback Control</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                Every class conducted at Vision IT is recorded in HD quality and uploaded to your portal within hours. You can pause, rewind, adjust playback speed, and rewatch as many times as needed.
              </p>
              <ul className="space-y-2">
                {["HD quality recordings", "Variable playback speed (0.5x - 2x)", "Chapter markers for easy navigation", "Watch on any device"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-slate-600">
                    <IconCheck /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-900 rounded-2xl p-6 aspect-video relative overflow-hidden border border-slate-700/50 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20">
                <div className="w-5 h-5 bg-white rounded-sm transform translate-x-0.5 [clip-path:polygon(0_0,0_100%,100%_50%)]" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                <div className="flex-grow h-1 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                </div>
                <span className="text-[10px] text-slate-400 font-mono">12:34 / 45:20</span>
              </div>
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-[10px] text-slate-400 font-medium">RECORDED</span>
              </div>
            </div>
          </div>

          {/* Feature 2: Progress Tracking */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <div className="order-2 md:order-1 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              {/* Mock progress dashboard */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-slate-700">Your Progress</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">72% Complete</span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
                <div className="h-full w-[72%] bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full" />
              </div>
              <div className="space-y-3">
                {[
                  { name: "HTML & CSS Basics", pct: 100, done: true },
                  { name: "JavaScript Fundamentals", pct: 85, done: false },
                  { name: "React.js", pct: 45, done: false },
                  { name: "Node.js & APIs", pct: 0, done: false },
                ].map((mod) => (
                  <div key={mod.name} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${mod.done ? "bg-emerald-500 border-emerald-500" : "border-slate-200"}`}>
                      {mod.done && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-slate-700">{mod.name}</span>
                        <span className="text-[10px] text-slate-400">{mod.pct}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${mod.pct === 100 ? "bg-emerald-500" : mod.pct > 0 ? "bg-blue-500" : "bg-slate-200"}`}
                          style={{ width: `${mod.pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 mb-3 px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-semibold">
                <IconChart /> Analytics
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">Detailed Progress Analytics</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                Your personal dashboard shows exactly where you stand. Track module completion, quiz scores, attendance, and assignment submissions — all in real-time.
              </p>
              <ul className="space-y-2">
                {["Module-wise completion tracking", "Quiz & test score history", "Attendance records", "Performance comparison"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-slate-600">
                    <IconCheck /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 3: Assignments */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-3 px-2 py-0.5 bg-purple-50 text-purple-600 rounded-lg text-xs font-semibold">
                <IconBook /> Study Hub
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">Assignment Submission & Resources</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                All your study materials in one place. Download lecture notes as PDFs, access source code repositories, and submit completed assignments directly for instructor review.
              </p>
              <ul className="space-y-2">
                {["One-click PDF downloads", "Source code access (GitHub integrated)", "Online assignment submission", "Instructor feedback & grades"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-slate-600">
                    <IconCheck /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              {/* Mock assignments panel */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-slate-700">Recent Assignments</span>
                <span className="text-[10px] text-blue-600 font-semibold cursor-pointer hover:underline">View All →</span>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Build a Portfolio Website", status: "Submitted", color: "emerald" },
                  { name: "JavaScript Quiz #3", status: "Graded: 92%", color: "blue" },
                  { name: "React Todo App", status: "Due: Jun 10", color: "amber" },
                  { name: "SQL Database Design", status: "Not Started", color: "slate" },
                ].map((a) => (
                  <div key={a.name} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                    <div className={`w-2 h-8 rounded-full bg-${a.color}-400 shrink-0`} />
                    <div className="flex-grow min-w-0">
                      <div className="text-xs font-semibold text-slate-700 truncate">{a.name}</div>
                      <div className={`text-[10px] font-medium text-${a.color}-600`}>{a.status}</div>
                    </div>
                    <IconDownload />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          8. FAQ SECTION
      ════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-amber-50 text-amber-700 font-semibold rounded-full text-xs border border-amber-200/60">
              Got Questions?
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-3">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden hover:border-slate-200 transition-colors">
                <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-sm font-semibold text-slate-800 select-none list-none">
                  <span>{faq.q}</span>
                  <svg
                    className="w-5 h-5 text-slate-400 transition-transform duration-300 group-open:rotate-180 shrink-0 ml-4"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 text-xs md:text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          9. BOTTOM CTA SECTION
      ════════════════════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900" />
        {/* Animated Glows */}
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-500/30 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-indigo-500/30 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-purple-500/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

        <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center max-w-2xl">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-white/10 text-blue-300 font-semibold rounded-full text-xs border border-white/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            Portal is Live
          </div>

          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">
            Ready to Start <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Learning?</span>
          </h2>
          <p className="text-blue-100/70 text-sm md:text-base max-w-xl mx-auto mb-8 font-medium leading-relaxed">
            Log in to the Vision Learn portal with your student credentials and pick up right where you left off. Your next skill is just one click away.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <Button
              href="https://learn.visionitinstitute.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 h-12 bg-white text-blue-900 hover:!bg-blue-500 hover:!text-white active:!bg-blue-600 active:!text-white shadow-lg rounded-full transition-all duration-300 hover:-translate-y-0.5 font-semibold text-sm inline-flex items-center group border-none"
            >
              Go to Portal
              <IconArrow />
            </Button>
            <Button
              href="/courses"
              variant="outline"
              className="px-7 h-12 rounded-full bg-transparent border border-white/20 text-white hover:!bg-white/10 transition-all duration-300 hover:-translate-y-0.5 font-semibold text-sm inline-flex items-center"
            >
              Explore Courses
            </Button>
          </div>

          {/* Support note */}
          <p className="text-xs text-slate-400 mt-6">
            Need help? Contact us at{" "}
            <Link href="/contact" className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors">
              Vision IT Support
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
