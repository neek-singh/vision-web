"use client";

import dynamic from "next/dynamic";

const GalleryGrid = dynamic(() => import("@/app/gallery/GalleryGrid"), {
  ssr: false,
  loading: () => <div className="h-96 bg-slate-100 rounded-[2rem] animate-pulse" />,
});

export default function GalleryGridClientWrapper({ images }: { images: any[] }) {
  return <GalleryGrid images={images} />;
}
