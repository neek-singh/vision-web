import Link from "next/link";
import Image from "next/image";
import { Clock, Globe } from "lucide-react";

interface CourseCardProps {
  title: string;
  badge: string;
  duration?: string;
  mode: string;
  price?: string;
  imageSrc: string;
  detailsHref?: string;
  applyHref: string;
}

export default function CourseCard({
  title,
  badge,
  duration,
  mode,
  price,
  imageSrc,
  detailsHref,
  applyHref,
}: CourseCardProps) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Course Image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-grow space-y-4">
        {/* Badge */}
        <span className="inline-block px-3 py-1 text-[10px] font-bold rounded-full bg-[#f1f5f9] text-[#475569] w-max uppercase tracking-wider">
          {badge}
        </span>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900 leading-snug line-clamp-2 min-h-[3.25rem] flex items-center">
          {title}
        </h3>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 font-semibold">
          {duration && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{duration}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-slate-400" />
            <span>{mode}</span>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-slate-100" />

        {/* Bottom price and actions */}
        <div className="mt-auto flex items-center justify-between pt-2">
          {/* Price */}
          <span className="text-xl font-serif font-bold text-slate-900">
            {price || ""}
          </span>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {detailsHref && (
              <Link
                href={detailsHref}
                className="px-4 py-2 border border-slate-200 hover:border-slate-300 text-slate-800 font-semibold text-xs rounded-lg transition-colors bg-white hover:bg-slate-50"
              >
                Details
              </Link>
            )}
            <Link
              href={applyHref}
              className="px-4 py-2 bg-black hover:bg-slate-900 text-white font-semibold text-xs rounded-lg transition-colors"
            >
              Apply
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
