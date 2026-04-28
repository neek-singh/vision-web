"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type GalleryImage = {
  id: string;
  title: string;
  image_url: string;
};

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const currentImage = currentIndex !== null ? images[currentIndex] : null;

  // 🔐 ESC key + Scroll Lock
  useEffect(() => {
    if (currentIndex !== null) {
      document.body.style.overflow = "hidden";

      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setCurrentIndex(null);
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      };

      window.addEventListener("keydown", handleKey);

      return () => {
        document.body.style.overflow = "auto";
        window.removeEventListener("keydown", handleKey);
      };
    }
  }, [currentIndex]);

  // ➡ Next
  const next = () => {
    if (currentIndex === null) return;
    setCurrentIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : 0
    );
  };

  // ⬅ Prev
  const prev = () => {
    if (currentIndex === null) return;
    setCurrentIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : 0
    );
  };

  return (
    <>
      {/* 🔍 Premium Lightbox */}
      {currentImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
          onClick={() => setCurrentIndex(null)}
        >
          {/* ❌ Close Button */}
          <button
            onClick={() => setCurrentIndex(null)}
            className="absolute top-6 right-6 p-3 text-white/70 bg-white/10 hover:bg-white/20 hover:text-white rounded-full transition-all duration-300 z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            aria-label="Close lightbox"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18" /><line x1="6" x2="18" y1="6" y2="18" /></svg>
          </button>

          {/* ⬅ Prev Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 sm:left-8 p-3 text-white/70 bg-white/5 hover:bg-white/20 hover:text-white rounded-full transition-all duration-300 z-50 hover:-translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>

          {/* ➡ Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 sm:right-8 p-3 text-white/70 bg-white/5 hover:bg-white/20 hover:text-white rounded-full transition-all duration-300 z-50 hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>

          {/* 🖼 Image Container */}
          <div
            className="relative w-full max-w-6xl h-[75vh] flex items-center justify-center animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentImage.image_url}
              alt={currentImage.title}
              fill
              className="object-contain drop-shadow-2xl"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
              quality={90}
            />
          </div>

          {/* 📝 Image Metadata (Title & Counter) */}
          <div
            className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex flex-col items-center justify-center text-center px-4 animate-in slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-white text-lg sm:text-xl font-medium tracking-wide drop-shadow-md">
              {currentImage.title}
            </p>
            <p className="text-white/50 text-sm mt-1.5 font-medium tracking-widest uppercase">
              {currentIndex !== null ? currentIndex + 1 : 0} / {images.length}
            </p>
          </div>
        </div>
      )}

      {/* 📷 Masonry Grid */}
      {images.length === 0 ? (
        <div className="text-center py-32 bg-white/50 backdrop-blur-sm rounded-[2rem] border border-slate-200/60 shadow-sm">
          <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">
            Gallery Coming Soon
          </h3>
          <p className="text-slate-500">
            Check back later for photos from our events, classes, and campus.
          </p>
        </div>
      ) : (
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((img, index) => (
            <div
              key={img.id}
              onClick={() => setCurrentIndex(index)}
              className="group relative break-inside-avoid cursor-pointer rounded-2xl overflow-hidden bg-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Image
                src={img.image_url}
                alt={img.title}
                width={600}
                height={800} // Set a higher relative height for Next.js to determine aspect ratio correctly in Masonry
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <p className="text-white font-semibold text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {img.title}
                </p>
                <div className="w-8 h-1 bg-blue-500 rounded-full mt-2 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left delay-100" />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}