import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import fs from "fs";
import path from "path";

export default async function UpcomingBatches() {
  const batchesFilePath = path.join(process.cwd(), "data", "batches.json");
  let displayBatches: any[] = [];

  try {
    if (fs.existsSync(batchesFilePath)) {
      const fileData = fs.readFileSync(batchesFilePath, "utf-8");
      displayBatches = JSON.parse(fileData);
    }
  } catch (e) {
    console.error("Home batches error:", e);
  }

  return (
    <section className="container mx-auto px-6 lg:px-8 py-24 max-w-7xl relative z-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="text-center mb-16 relative">
        <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase mb-5 border border-blue-100">
          Admissions Open
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-5">
          Upcoming Batches
        </h2>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
          Choose a schedule that fits your routine and start your career transformation today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {displayBatches.map((batch, idx) => (
          <Card
            key={idx}
            className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl border border-slate-200 hover:border-blue-200 transition-all duration-300 hover:-translate-y-1.5 flex flex-col overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative flex justify-between items-center mb-6">
              <span className="px-4 py-1.5 bg-slate-100 text-slate-700 font-bold rounded-lg text-xs uppercase tracking-wider group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                {batch.type}
              </span>
              <span className="flex items-center gap-1.5 text-red-600 text-xs font-bold bg-red-50 border border-red-100 px-3 py-1.5 rounded-lg shadow-sm">
                <span className="relative flex h-2 w-2 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                {batch.seats} Left
              </span>
            </div>

            <h3 className="relative text-2xl font-bold text-slate-900 mb-6 leading-snug">
              {batch.course}
            </h3>

            <div className="relative space-y-4 mb-10">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">Starts</p>
                  <p className="text-slate-900 font-bold">{batch.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">Time</p>
                  <p className="text-slate-900 font-bold">{batch.time}</p>
                </div>
              </div>
            </div>

            <Button
              href="/admissions"
              className="relative mt-auto w-full rounded-2xl bg-slate-900 hover:bg-blue-600 text-white py-3.5 font-semibold transition-all duration-300 flex items-center justify-center gap-2 border-none group/btn"
            >
              Book Your Seat
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function UpcomingBatchesSkeleton() {
  return (
    <section className="container mx-auto px-6 lg:px-8 py-24 max-w-7xl relative z-10">
      <div className="text-center mb-16">
        <div className="h-6 bg-slate-200 rounded-full w-32 mx-auto mb-5 animate-pulse"></div>
        <div className="h-12 bg-slate-200 rounded-full w-64 mx-auto mb-5 animate-pulse"></div>
        <div className="h-6 bg-slate-200 rounded-full w-96 mx-auto animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-80 bg-slate-100 rounded-3xl animate-pulse"></div>
        ))}
      </div>
    </section>
  );
}
