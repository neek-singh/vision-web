import { Metadata } from "next";
import fs from "fs";
import path from "path";
import GalleryGridClientWrapper from "@/components/GalleryGridClientWrapper";

export const metadata: Metadata = {
  title: "Gallery | Vision IT Computer Institute Pratappur",
  description: "Explore our photo gallery showcasing events, classes, and campus life at Vision IT Computer Institute in Pratappur.",
  openGraph: {
    title: "Gallery | Vision IT Computer Institute",
    description: "Explore photos from Vision IT Computer Institute — events, workshops, and student life.",
    type: "website",
  },
};

export const revalidate = 3600;

export default async function GalleryPage() {
  const galleryFilePath = path.join(process.cwd(), "data", "gallery.json");
  let images: any[] = [];

  try {
    if (fs.existsSync(galleryFilePath)) {
      const fileData = fs.readFileSync(galleryFilePath, "utf-8");
      images = JSON.parse(fileData);
    }
  } catch (e) {
    console.error("Error loading gallery from JSON:", e);
  }

  return (
    <main className="flex-col w-full bg-slate-50 pb-24 md:pb-32 min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative bg-white pt-24 md:pt-32 pb-20 border-b border-slate-200/80 overflow-hidden">
        {/* Soft Background Gradients */}
        <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-slate-50 via-white to-white pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px] bg-blue-100/50 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute top-32 -left-24 w-[300px] h-[300px] bg-indigo-100/40 rounded-full blur-[80px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">

          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-blue-50 text-blue-700 font-semibold rounded-full text-sm border border-blue-200/60 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" />
            </svg>
            Our Moments
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
            Campus <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Gallery</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
            A glimpse into the vibrant life at Vision IT Computer Institute — events, workshops, achievements, and more.
          </p>

          {/* Photo Count Badge */}
          {images && images.length > 0 && (
            <div className="mt-8 flex justify-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-100/80 border border-slate-200/60 text-slate-600 font-medium text-sm shadow-sm backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
                {images.length} Photos Available
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section className="container mx-auto px-6 lg:px-8 pt-12 lg:pt-16 relative z-10">
        <GalleryGridClientWrapper images={images} />
      </section>
    </main>
  );
}