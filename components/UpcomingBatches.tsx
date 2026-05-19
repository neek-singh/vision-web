import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import fs from "fs";
import path from "path";
import { unstable_cache } from "next/cache";

const getBatches = unstable_cache(
  async () => {
    const batchesFilePath = path.join(process.cwd(), "data", "batches.json");
    try {
      if (fs.existsSync(batchesFilePath)) {
        const fileData = fs.readFileSync(batchesFilePath, "utf-8");
        return JSON.parse(fileData);
      }
    } catch (e) {
      console.error("Home batches fetch error:", e);
    }
    return [];
  },
  ["upcoming-batches"],
  { revalidate: 3600, tags: ["batches"] }
);

export default async function UpcomingBatches() {
  const displayBatches = await getBatches();

  return (
    <section className="container mx-auto px-6 lg:px-8 py-24 max-w-7xl relative z-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="text-center mb-10 relative">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mb-3">
          Upcoming Batches
        </h2>
        <p className="text-slate-900 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-medium">
          Choose a schedule that fits your routine and start your career transformation today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {displayBatches.map((batch: any, idx: number) => (
          <Card
            key={idx}
            className="group relative bg-white rounded-xl p-4 md:p-5 shadow-sm hover:shadow-lg border border-slate-200 hover:border-blue-200 transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative flex justify-between items-center mb-3">
              <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-bold rounded text-[9px] uppercase tracking-wider group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                {batch.type}
              </span>

            </div>

            <h3 className="relative text-sm md:text-base font-semibold text-slate-900 mb-3 leading-snug">
              {batch.course}
            </h3>

            <div className="relative space-y-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-7 h-7 rounded-md bg-blue-50 text-blue-600 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div>
                  <p className="text-[9px] text-slate-900 font-bold uppercase tracking-wider mb-px">Starts</p>
                  <p className="text-slate-900 font-bold text-xs">{batch.date}</p>
                </div>
              </div>


            </div>

            <Button
              href="/admissions"
              className="group relative mt-auto w-fit mr-auto px-5 rounded-lg bg-slate-900 hover:bg-blue-600 text-white py-2 text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 border-none"
            >
              Book Your Seat
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="text-center mb-10 relative">
        <div className="h-5 bg-slate-200 rounded-full w-36 mx-auto mb-4 animate-pulse"></div>
        <div className="h-8 bg-slate-200 rounded-full w-56 mx-auto mb-4 animate-pulse"></div>
        <div className="h-4 bg-slate-200 rounded-full w-80 mx-auto animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-4 md:p-5 border border-slate-200 animate-pulse flex flex-col overflow-hidden h-[190px] shadow-sm"
          >
            {/* Tag Badge Placeholder */}
            <div className="w-14 h-4 bg-slate-200 rounded mb-3"></div>

            {/* Course Title Placeholder */}
            <div className="h-4 bg-slate-200 rounded w-11/12 mb-1.5"></div>
            <div className="h-4 bg-slate-200 rounded w-3/4 mb-3"></div>

            {/* Start Date Placeholder */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-slate-200 shrink-0"></div>
              <div className="space-y-1">
                <div className="h-2 w-8 bg-slate-200 rounded"></div>
                <div className="h-3 w-16 bg-slate-200 rounded"></div>
              </div>
            </div>

            {/* Button Placeholder */}
            <div className="mt-auto w-28 h-7 bg-slate-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    </section>
  );
}

