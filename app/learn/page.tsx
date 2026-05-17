import { Button } from "@/components/ui/Button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vision Learn - Student Portal",
  description: "Access your course materials, track progress, and interact with instructors on Vision Learn.",
};

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-white pt-20 flex flex-col relative overflow-hidden">

      {/* 1. Hero Section */}
      <section className="relative bg-slate-50 pt-16 pb-32 overflow-hidden border-b border-slate-200/60">
        {/* Dynamic Backgrounds */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/70 via-slate-50 to-slate-50 pointer-events-none"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/40 rounded-full blur-[80px] opacity-80 pointer-events-none"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-indigo-400/40 rounded-full blur-[80px] opacity-80 pointer-events-none"></div>

        {/* Decorative Tech Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-blue-50 text-blue-700 font-semibold rounded-full text-sm border border-blue-200/60 shadow-sm transition-transform hover:scale-105 cursor-default">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            Official Digital Campus
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Your Classroom, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Everywhere You Go.</span>
          </h1>

          <p className="text-lg text-slate-600 mb-10 font-medium leading-relaxed max-w-2xl mx-auto">
            Experience seamless learning with Vision Learn. Access your courses, track your progress, submit assignments, and stay connected with your instructors 24/7.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
            <Button
              href="https://learn.visionitinstitute.com"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="w-full sm:w-auto text-base px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/30 rounded-full transition-all duration-300 hover:-translate-y-1 font-bold flex items-center justify-center border-none group"
            >
              Login to Portal
              <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Button>
            <Button
              href="#features"
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-base px-8 py-4 rounded-full bg-white shadow-sm border-slate-200 text-slate-700 hover:!text-white hover:!bg-slate-900 hover:!border-slate-900 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center"
            >
              Explore Features
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Visual / Mockup Section */}
      <section className="relative -mt-20 z-20 px-6 lg:px-8 pb-10">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-slate-900 rounded-[2rem] shadow-2xl border-4 border-white overflow-hidden flex items-center justify-center aspect-video relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-indigo-500/40 mix-blend-overlay"></div>

            {/* Abstract dashboard representation */}
            <div className="w-full h-full p-4 md:p-8 flex flex-col gap-4 bg-slate-900/95 backdrop-blur-sm">
              {/* Navbar mock */}
              <div className="flex items-center gap-4 mb-4 border-b border-slate-800 pb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-inner"></div>
                <div className="h-6 w-32 bg-slate-800 rounded-md"></div>
                <div className="ml-auto flex gap-3">
                  <div className="h-10 w-10 bg-slate-800 rounded-full"></div>
                </div>
              </div>

              {/* Content Area mock */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow">
                <div className="md:col-span-2 flex flex-col gap-6">
                  {/* Main Video/Content block */}
                  <div className="flex-grow bg-slate-800 rounded-xl border border-slate-700 relative overflow-hidden group-hover:border-blue-500/50 transition-colors duration-500 shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
                    {/* Play button mock */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20">
                      <div className="w-6 h-6 bg-white rounded-sm transform translate-x-1 [clip-path:polygon(0_0,0_100%,100%_50%)]"></div>
                    </div>
                    {/* Progress bar mock */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-700">
                      <div className="h-full bg-blue-500 w-1/3"></div>
                    </div>
                  </div>
                </div>

                {/* Sidebar mock */}
                <div className="hidden md:flex col-span-1 flex-col gap-4">
                  <div className="h-32 bg-slate-800 rounded-xl border border-slate-700 p-4 flex flex-col gap-3">
                    <div className="h-4 w-1/2 bg-slate-700 rounded"></div>
                    <div className="h-2 w-full bg-slate-700 rounded mt-auto"></div>
                    <div className="h-2 w-3/4 bg-slate-700 rounded"></div>
                  </div>
                  <div className="flex-grow bg-slate-800 rounded-xl border border-slate-700 p-4 flex flex-col gap-3">
                    <div className="h-8 w-full bg-slate-700/50 rounded-md"></div>
                    <div className="h-8 w-full bg-slate-700/50 rounded-md"></div>
                    <div className="h-8 w-full bg-slate-700/50 rounded-md"></div>
                    <div className="h-8 w-full bg-blue-600/20 border border-blue-500/30 rounded-md mt-2 relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Features Section */}
      <section id="features" className="py-24 bg-white relative">
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6">Everything You Need to Succeed</h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto font-medium">
              Our custom-built Learning Management System provides all the tools required to master your tech skills, bridging the gap between classroom and home.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-50 rounded-3xl p-8 hover:bg-blue-50 transition-colors duration-300 group border border-slate-100">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">On-Demand Lectures</h3>
              <p className="text-slate-600 leading-relaxed">
                Missed a class? No problem. Access recorded sessions, video tutorials, and interactive coding exercises anytime, anywhere.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-50 rounded-3xl p-8 hover:bg-indigo-50 transition-colors duration-300 group border border-slate-100">
              <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Progress Tracking</h3>
              <p className="text-slate-600 leading-relaxed">
                Visualize your learning journey. Track completed modules, monitor your quiz scores, and see how close you are to graduation.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-50 rounded-3xl p-8 hover:bg-purple-50 transition-colors duration-300 group border border-slate-100">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Assignments & Materials</h3>
              <p className="text-slate-600 leading-relaxed">
                Download PDF notes, source code, and submit your project assignments directly through the portal for instructor review.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900"></div>
        {/* Animated Glows */}
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-500/40 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-indigo-500/40 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Ready to Resume Learning?
          </h2>
          <p className="text-blue-100/80 text-base md:text-lg max-w-2xl mx-auto mb-10 font-medium">
            Log in to the Vision Learn portal with your student credentials to pick up right where you left off.
          </p>
          <Button
            href="https://learn.visionitinstitute.com"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            variant="secondary"
            className="text-base px-8 py-4 bg-white text-blue-900 hover:!bg-blue-600 hover:!text-white active:!bg-blue-700 active:!text-white shadow-[0_0_40px_rgba(255,255,255,0.15)] rounded-full transition-all duration-300 hover:-translate-y-1 font-bold inline-flex items-center group border-none"
          >
            Go to Portal
            <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </Button>
        </div>
      </section>
    </main>
  );
}
