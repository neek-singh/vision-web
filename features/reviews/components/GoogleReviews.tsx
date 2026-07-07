import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import Image from "next/image";

interface Review {
  id: string;
  name: string;
  avatarColor: string;
  rating: number;
  date: string;
  comment: string;
}

const REVIEWS: Review[] = [
  {
    id: "2",
    name: "Kamlesh Kanshi",
    avatarColor: "bg-emerald-600",
    rating: 5,
    date: "2 weeks ago",
    comment: "vision IT is very good, the teachers here are very well behaved. Must visit Vision IT",
  },
  {
    id: "3",
    name: "Neek Singh",
    avatarColor: "bg-emerald-800",
    rating: 5,
    date: "2 days ago",
    comment: "Mai yha pahli baar aur mujhe bahut achha lga 🥰, abhi me ms excel, ms Word, ms PowerPoint sikh rha hu.",
  },
  {
    id: "4",
    name: "Amar Kumar",
    avatarColor: "bg-blue-600",
    rating: 5,
    date: "1 hour ago",
    comment: "Vision it computer center is very good computer center.yha computer ki puri jankari ke sath padhate sikhate hai . Mujhe vision it computer center bahut hi acchha laga 😇",
  }
];

export default function GoogleReviews() {
  const googleReviewLink = "https://g.page/r/CZkPSap_DwIeEAE/review";

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10 overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-blue-100/50 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-100/40 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-4 mb-10 md:mb-12 border-b border-slate-100 pb-6 md:pb-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              <span className="text-blue-600 font-bold text-xs uppercase tracking-wider">
                Google Reviews & Ratings
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              What Our Students Say on <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Google</span>
            </h2>
          </div>

          {/* Google Ratings summary card */}
          <div className="flex items-center gap-3 sm:gap-4 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/60 shadow-sm backdrop-blur-md w-full sm:w-auto justify-center sm:justify-start">
            {/* Google Logo */}
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-slate-50 rounded-xl border border-slate-100">
              <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-slate-900 text-lg">5.0</span>
                <div className="flex text-amber-400 text-sm">★★★★★</div>
              </div>
              <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
                4+ Reviews on Maps
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {REVIEWS.map((review) => (
            <Card
              key={review.id}
              className="bg-white hover:bg-slate-50/50 p-5 rounded-2xl border border-slate-200/60 hover:border-blue-300/60 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                {/* Header: Avatar, Name */}
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${review.avatarColor} text-white font-extrabold text-sm flex items-center justify-center shadow-inner`}>
                    {review.name[0]}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">
                      {review.name}
                    </h4>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex text-amber-400 text-xs tracking-wider">
                  {"★".repeat(review.rating)}
                </div>

                {/* Review Text */}
                <p className="text-xs md:text-sm text-slate-800 leading-relaxed font-medium">
                  "{review.comment}"
                </p>
              </div>

              <div className="border-t border-slate-100/80 pt-3 mt-4 flex items-center justify-end text-[10px] text-slate-400">
                <span className="font-semibold uppercase tracking-wider">Maps Review</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Call To Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            href={googleReviewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold text-sm shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 border-none flex items-center justify-center gap-2"
          >
            {/* Google G logo in white circle */}
            <span className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
              <svg viewBox="0 0 24 24" width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
              </svg>
            </span>
            Write a Review on Google
          </Button>

          <Button
            href="https://maps.google.com/maps?q=Vision+IT+Computer+Institute+Pratappur"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-slate-700 bg-white border border-slate-200 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50/20 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="12 8 8 12 12 16 12 8" /></svg>
            View Place on Google Maps
          </Button>
        </div>
      </div>
    </section>
  );
}
