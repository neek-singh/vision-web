"use client";

import { useEffect, useState } from "react";

export default function InteractiveMap() {
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    // Defer loading the iframe until after first render/mount
    const timer = setTimeout(() => {
      setShowMap(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-md border border-slate-200/80 h-[250px] sm:h-[300px] md:h-[400px] bg-slate-100 group">
      {/* Optional Overlay to prevent accidental scrolling inside map */}
      <div className="absolute inset-0 bg-transparent group-hover:pointer-events-none transition-all z-10" />
      {showMap ? (
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
      ) : (
        <div className="w-full h-full bg-slate-100 flex items-center justify-center">
          <span className="text-slate-400 font-medium text-sm">Loading map...</span>
        </div>
      )}
    </div>
  );
}
