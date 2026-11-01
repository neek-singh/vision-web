"use client";

export default function InteractiveMap() {
  const mapQuery = "Vision IT Computer Institute Pratappur";
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  const directMapsUrl = `https://maps.google.com/?q=${encodeURIComponent(mapQuery)}`;

  return (
    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 h-[300px] sm:h-[350px] md:h-[420px] bg-slate-100">
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Vision IT Computer Institute Location"
        className="w-full h-full object-cover"
      />

      {/* Floating Action: Open in Google Maps */}
      <div className="absolute bottom-4 right-4 z-20">
        <a
          href={directMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/95 hover:bg-white text-slate-950 font-normal text-xs rounded-xl shadow-md border border-slate-200 backdrop-blur-sm transition-all hover:-translate-y-0.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}
