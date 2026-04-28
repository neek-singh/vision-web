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
    <footer className="relative bg-white/80 backdrop-blur-2xl text-gray-600 py-16 mt-auto rounded-t-[2.5rem] md:rounded-t-[3rem] border-t border-white shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden z-10">

      {/* 🌟 Glossy Top Highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-40" />

      {/* 🌟 Subtle Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-blue-100/60 to-transparent blur-[70px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-8">

          {/* Logo & Description */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="relative p-1 bg-white rounded-xl shadow-sm border border-gray-100">
                <Image
                  src="/logo.png"
                  alt="Vision IT Logo"
                  width={40}
                  height={40}
                  className="object-contain rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 leading-none">
                  Vision<span className="text-blue-600">IT</span>
                </span>
                <span className="text-[11px] font-black text-slate-800 tracking-wider mt-1.5 uppercase">
                  Computer Institute <span className="text-blue-600">Pratappur</span>
                </span>
              </div>
            </Link>

            <p className="mt-6 text-gray-500 max-w-sm leading-relaxed font-medium">
              Building future-ready tech professionals with practical skills and real-world training.
            </p>
          </div>

          {/* Popular Courses */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6">Popular Courses</h4>
            <ul className="space-y-3.5">
              <FooterLink href="/courses/197f7c89-e410-4768-8b49-567b4b4e3e9e">Basic Computer Course (BCC)</FooterLink>
              <FooterLink href="/courses/38fdc235-f7b5-4628-9d72-41c9ff2eabd8">Diploma in Computer (DCA)</FooterLink>
              <FooterLink href="/courses/f9004121-1274-4b57-8179-ccc8365864b9">PGDCA</FooterLink>
              <FooterLink href="/courses/2fc69f17-e7a0-4bde-b995-8cbda1e2e55b">ADCA</FooterLink>
              <FooterLink href="/courses/31a26227-fb8d-4fc2-b8f0-6db262c46765">C + Python Programming</FooterLink>
              <FooterLink href="/courses">Explore All</FooterLink>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6">Quick Links</h4>
            <ul className="space-y-3.5">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/blog">Blogs</FooterLink>
              <FooterLink href="/gallery">Gallery</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Programs & Batches */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6">Programs</h4>
            <ul className="space-y-3.5">
              <FooterLink href="/courses">Courses</FooterLink>
              <FooterLink href="/admissions">Batches</FooterLink>
              <FooterLink href="/admissions">Enroll Now</FooterLink>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6">Reach Out</h4>

            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li className="flex items-start gap-3 group">
                <div className="mt-0.5 p-2 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <span className="mt-1 group-hover:text-blue-600 transition-colors">{contact.email}</span>
              </li>

              <li className="flex items-start gap-3 group">
                <div className="mt-0.5 p-2 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span className="mt-1 group-hover:text-blue-600 transition-colors">{contact.phone}</span>
              </li>

              <li className="flex items-start gap-3 group">
                <div className="mt-0.5 p-2 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span className="mt-1 leading-relaxed group-hover:text-blue-600 transition-colors">{contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-200/80 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Vision IT Computer Institute. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-blue-600 transition-colors">
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
}

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <li>
      <Link
        href={href}
        className="group inline-flex items-center text-sm font-semibold text-gray-500 hover:text-blue-600 transition-all duration-300"
      >
        <span className="w-0 overflow-hidden text-blue-500 group-hover:w-3.5 transition-all duration-300 ease-out">
          ›
        </span>
        <span className="group-hover:translate-x-1 transition-transform duration-300 ease-out">
          {children}
        </span>
      </Link>
    </li>
  );
}