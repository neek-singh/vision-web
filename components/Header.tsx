"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
export default function Header() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isAboutPageTransparent = pathname === "/about" && !isScrolled && !isOpen;
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"
        } ${isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm border-b border-slate-200/50"
          : "bg-transparent border-b border-transparent"
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
              <span className={`text-xl md:text-2xl font-normal tracking-tight leading-none transition-colors duration-300 ${
                isAboutPageTransparent ? "text-white" : "text-slate-950"
              }`}>
                Vision<span className="text-blue-600">IT</span>
              </span>
              <span className={`text-[9px] font-normal tracking-wider mt-1 uppercase transition-colors duration-300 ${
                isAboutPageTransparent ? "text-white" : "text-slate-950"
              }`}>
                Computer Institute
              </span>
            </div>
          </Link>

          {/* 💻 Desktop Menu */}
          <div className="hidden md:flex items-center gap-5 lg:gap-8">
            <div className="flex items-center gap-5 lg:gap-8 pr-2">
              <NavLink href="/" isTransparent={isAboutPageTransparent}>Home</NavLink>
              <NavLink href="/courses" isTransparent={isAboutPageTransparent}>Courses</NavLink>
              <NavLink href="/about" isTransparent={isAboutPageTransparent}>About</NavLink>
              <NavLink href="/gallery" isTransparent={isAboutPageTransparent}>Gallery</NavLink>
              <NavLink href="/blog" isTransparent={isAboutPageTransparent}>Blog</NavLink>
              <NavLink href="/contact" isTransparent={isAboutPageTransparent}>Contact</NavLink>
              <NavLink href="/verify" isTransparent={isAboutPageTransparent}>Verify</NavLink>
              <NavLink href="/learn" isTransparent={isAboutPageTransparent}>Student Login</NavLink>
            </div>

            {/* 👤 Apply Now Button */}
            <div className={`pl-4 border-l transition-colors duration-300 ${
              isAboutPageTransparent ? "border-white/40" : "border-slate-300"
            }`}>
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
              className={`p-2 -mr-2 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                isAboutPageTransparent
                  ? "text-white hover:text-white hover:bg-white/10"
                  : "text-slate-950 hover:bg-slate-100 hover:text-blue-700"
              }`}
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
  isTransparent?: boolean;
}

function NavLink({ href, children, isTransparent }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`group relative text-sm font-normal transition-colors duration-300 ${
        isTransparent
          ? "text-white hover:text-white"
          : "text-slate-950 hover:text-blue-700"
      }`}
    >
      {children}
      {/* Animated Underline */}
      <span className={`absolute -bottom-1.5 left-0 w-0 h-0.5 rounded-full transition-all duration-300 ease-out group-hover:w-full ${
        isTransparent ? "bg-white" : "bg-blue-600"
      }`} />
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