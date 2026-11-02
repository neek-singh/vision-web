"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const handleClose = () => setIsOpen(false);

  const hideNav =
    ["/login", "/signup", "/inquiry", "/forgot-password"].includes(pathname) ||
    pathname.startsWith("/admin") ||
    (pathname.startsWith("/blog/") && pathname !== "/blog");

  useEffect(() => {
    if (hideNav) return;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScroll);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hideNav]);

  if (hideNav) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80"
          : "bg-white/90 backdrop-blur-sm border-b border-slate-100"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">

          {/* 🔵 Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Image
              src="https://res.cloudinary.com/ddiooxxks/image/upload/f_auto,q_auto/logo_unnut8.png"
              alt="Vision IT Logo"
              width={44}
              height={44}
              className="object-contain rounded-lg"
              priority
            />
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-normal text-slate-950 tracking-tight leading-none">
                Vision<span className="text-blue-600">IT</span>
              </span>
              <span className="text-[9px] font-normal text-slate-700 tracking-wider mt-1 uppercase">
                Computer Institute
              </span>
            </div>
          </Link>

          {/* 💻 Desktop Menu */}
          <div className="hidden md:flex items-center gap-5 lg:gap-8">
            <div className="flex items-center gap-5 lg:gap-8 pr-2">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/courses">Courses</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/gallery">Gallery</NavLink>
              <NavLink href="/blog">Blog</NavLink>
              <NavLink href="/contact">Contact</NavLink>
              <NavLink href="/verify">Verify</NavLink>
              <NavLink href="/learn">Student Login</NavLink>
            </div>

            {/* 👤 Apply Now Button */}
            <div className="pl-4 border-l border-slate-300">
              <Link
                href="/inquiry"
                className="hidden md:inline-flex items-center justify-center h-10 px-6 rounded-full text-sm font-normal text-white bg-blue-600 shadow-sm hover:bg-blue-500 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 whitespace-nowrap"
              >
                Apply Now
              </Link>
            </div>
          </div>

          {/* 📱 Mobile Right */}
          <div className="md:hidden flex items-center gap-3">
            <Link
              href="/inquiry"
              className="inline-flex items-center justify-center h-9 px-4 rounded-full text-xs font-normal text-white bg-blue-600 shadow-sm hover:bg-blue-500 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 whitespace-nowrap"
            >
              Apply Now
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 -mr-2 rounded-xl text-slate-950 hover:bg-slate-100 hover:text-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" x2="6" y1="6" y2="18" /><line x1="6" x2="18" y1="6" y2="18" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 📱 Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col px-4 py-6 space-y-1 bg-white">
            <MobileLink href="/" onClick={handleClose}>Home</MobileLink>
            <MobileLink href="/courses" onClick={handleClose}>Courses</MobileLink>
            <MobileLink href="/about" onClick={handleClose}>About</MobileLink>
            <MobileLink href="/gallery" onClick={handleClose}>Gallery</MobileLink>
            <MobileLink href="/blog" onClick={handleClose}>Blog</MobileLink>
            <MobileLink href="/contact" onClick={handleClose}>Contact</MobileLink>
            <MobileLink href="/verify" onClick={handleClose}>Verify</MobileLink>
            <div className="my-2 border-t border-slate-200"></div>
            <MobileLink href="/learn" onClick={handleClose}>Student Login</MobileLink>
          </div>
        </div>
      )}
    </nav>
  );
}

/* 🔹 Reusable Desktop Link (with Types & Hover Animation) */
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="group relative text-sm font-normal text-slate-950 hover:text-blue-700 transition-colors duration-200"
    >
      {children}
      {/* Animated Underline */}
      <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 rounded-full bg-blue-600 transition-all duration-300 ease-out group-hover:w-full" />
    </Link>
  );
}

/* 🔹 Reusable Mobile Link (with Types) */
interface MobileLinkProps extends NavLinkProps {
  onClick: () => void;
}

function MobileLink({ href, children, onClick }: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block w-full px-4 py-3 rounded-xl text-base font-normal text-slate-950 hover:bg-slate-50 hover:text-blue-700 transition-all duration-200"
    >
      {children}
    </Link>
  );
}
