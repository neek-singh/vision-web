"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const contact = {
  email: "visionitpratappur@gmail.com",
  phone: "+91 81031 70595",
  address: "Vision IT Computer Institute, kadampara chowk, Pratappur, Surajpur(C.G.) - 497223",
};

export default function Footer() {
  const pathname = usePathname();
  const hideNav =
    ["/login", "/signup", "/admissions"].includes(pathname) ||
    pathname.startsWith("/admin");

  if (hideNav) return null;

  return (
    <footer className="relative bg-white text-slate-600 py-16 mt-auto border-t border-slate-100 shadow-[0_-8px_30px_rgb(0,0,0,0.01)] overflow-hidden z-10">
      {/* 🌟 Glossy Top Highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-60" />

      {/* 🌟 Subtle Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-50/60 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-50/60 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_0.5px,transparent_0.5px),linear-gradient(to_bottom,#f1f5f9_0.5px,transparent_0.5px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Column 1: Logo & Description (Wide) */}
          <div className="md:col-span-12 lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link
                href="/"
                className="flex items-center gap-3 transition-transform hover:scale-[1.01] active:scale-[0.99] w-fit"
              >
                <div className="relative p-1.5 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <Image
                    src="https://res.cloudinary.com/ddiooxxks/image/upload/f_auto,q_auto/logo_unnut8.png"
                    alt="Vision IT Logo"
                    width={40}
                    height={40}
                    className="object-contain rounded-lg"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl md:text-2xl font-black tracking-tight text-slate-900 leading-none">
                    Vision<span className="text-blue-600">IT</span>
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 tracking-widest mt-1 uppercase">
                    Computer Institute
                  </span>
                </div>
              </Link>
              <p className="mt-5 text-sm text-slate-600 max-w-sm leading-relaxed font-medium">
                Empowering students in Pratappur with state-of-the-art computer education, professional certifications, and placement assistance.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-8">
              <a
                href="https://facebook.com/visionitinstitute"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-blue-600 hover:text-white border border-slate-200/60 hover:border-blue-500 flex items-center justify-center text-slate-500 transition-all duration-300 hover:-translate-y-1 shadow-sm"
                aria-label="Facebook"
              >
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="https://instagram.com/visionitinstitute"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-pink-600 hover:text-white border border-slate-200/60 hover:border-pink-500 flex items-center justify-center text-slate-500 transition-all duration-300 hover:-translate-y-1 shadow-sm"
                aria-label="Instagram"
              >
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://wa.me/918103170595"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-[#25D366] hover:text-white border border-slate-200/60 hover:border-[#25D366] flex items-center justify-center text-slate-500 transition-all duration-300 hover:-translate-y-1 shadow-sm"
                aria-label="WhatsApp"
              >
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Popular Courses */}
          <div className="md:col-span-6 lg:col-span-2">
            <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest mb-5">Popular Courses</h4>
            <ul className="space-y-3">
              <FooterLink href="/courses/197f7c89-e410-4768-8b49-567b4b4e3e9e">Basic Computer (BCC)</FooterLink>
              <FooterLink href="/courses/38fdc235-f7b5-4628-9d72-41c9ff2eabd8">Diploma in Computer (DCA)</FooterLink>
              <FooterLink href="/courses/f9004121-1274-4b57-8179-ccc8365864b9">PGDCA Diploma</FooterLink>
              <FooterLink href="/courses/2fc69f17-e7a0-4bde-b995-8cbda1e2e55b">ADCA Diploma</FooterLink>
              <FooterLink href="/courses/31a26227-fb8d-4fc2-b8f0-6db262c46765">Python & C Classes</FooterLink>
              <FooterLink href="/courses" className="text-blue-600 hover:text-blue-500 font-semibold text-xs mt-1 inline-block">Explore All Courses</FooterLink>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="md:col-span-4 lg:col-span-2">
            <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-3">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/blog">Our Blogs</FooterLink>
              <FooterLink href="/gallery">Institute Gallery</FooterLink>
              <FooterLink href="/learn">Vision Learn</FooterLink>
              <FooterLink href="/contact">Get in Touch</FooterLink>
            </ul>
          </div>

          {/* Column 4: Programs */}
          <div className="md:col-span-4 lg:col-span-2">
            <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest mb-5">Programs</h4>
            <ul className="space-y-3">
              <FooterLink href="/courses">All Courses</FooterLink>
              <FooterLink href="/admissions">Batch Schedules</FooterLink>
              <FooterLink href="/admissions">Apply Now</FooterLink>
            </ul>
          </div>

          {/* Column 5: Reach Out (Contact) */}
          <div className="md:col-span-4 lg:col-span-2">
            <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest mb-5">Reach Out</h4>
            <ul className="space-y-4 text-xs font-medium text-slate-600">
              <li className="flex items-start gap-3 group">
                <div className="mt-0.5 p-1.5 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <a href={`mailto:${contact.email}`} className="mt-0.5 group-hover:text-blue-600 transition-colors break-all leading-relaxed">{contact.email}</a>
              </li>

              <li className="flex items-start gap-3 group">
                <div className="mt-0.5 p-1.5 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="mt-0.5 group-hover:text-blue-600 transition-colors leading-relaxed">{contact.phone}</a>
              </li>

              <li className="flex items-start gap-3 group">
                <div className="mt-0.5 p-1.5 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span className="mt-0.5 leading-relaxed group-hover:text-blue-600 transition-colors">{contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-400">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} Vision IT Computer Institute. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-blue-600 transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-blue-500 transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* 🔹 Reusable Link Component */
interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

function FooterLink({ href, children, className }: FooterLinkProps) {
  return (
    <li>
      <Link
        href={href}
        className={`group inline-flex items-center text-xs font-semibold text-slate-600 hover:text-blue-600 transition-all duration-300 ${className || ""}`}
      >
        <span className="w-0 overflow-hidden text-blue-500 group-hover:w-3 transition-all duration-300 ease-out">
          ›
        </span>
        <span className="group-hover:translate-x-1 transition-transform duration-300 ease-out">
          {children}
        </span>
      </Link>
    </li>
  );
}