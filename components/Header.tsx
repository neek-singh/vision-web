"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { UserNav } from "./UserNav";

export default function Header() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleClose = () => setIsOpen(false);

  const hideNav =
    ["/login", "/signup", "/admissions"].includes(pathname) ||
    pathname.startsWith("/admin");

  useEffect(() => {
    if (hideNav) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, hideNav]);

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
              src="/logo.png"
              alt="Vision IT Logo"
              width={40}
              height={40}
              className="object-contain rounded-lg"
            />
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-none">
                Vision<span className="text-blue-600">IT</span>
              </span>
              <span className="text-[9px] font-black text-slate-800 tracking-wider mt-1 uppercase">
                Computer Institute <span className="text-blue-600">Pratappur</span>
              </span>
            </div>
          </Link>

          {/* 💻 Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-8 pr-4">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/courses">Courses</NavLink>
              <NavLink href="/admissions">Admissions</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/blog">Blog</NavLink>
              <NavLink href="/gallery">Gallery</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </div>

            {/* 👤 User */}
            <div className="pl-4 border-l border-slate-200">
              <UserNav />
            </div>
          </div>

          {/* 📱 Mobile Right */}
          <div className="md:hidden flex items-center gap-3">
            <UserNav />

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 -mr-2 text-slate-600 rounded-xl hover:bg-slate-100 hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
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
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col px-4 py-6 space-y-1 bg-slate-50/50">
            <MobileLink href="/" onClick={handleClose}>Home</MobileLink>
            <MobileLink href="/courses" onClick={handleClose}>Courses</MobileLink>
            <MobileLink href="/admissions" onClick={handleClose}>Admissions</MobileLink>
            <MobileLink href="/about" onClick={handleClose}>About</MobileLink>
            <MobileLink href="/blog" onClick={handleClose}>Blog</MobileLink>
            <MobileLink href="/gallery" onClick={handleClose}>Gallery</MobileLink>
            <MobileLink href="/contact" onClick={handleClose}>Contact</MobileLink>
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
      className="group relative text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
    >
      {children}
      {/* Animated Underline */}
      <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-blue-600 rounded-full transition-all duration-300 ease-out group-hover:w-full" />
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
      className="block w-full px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-white hover:text-blue-600 hover:shadow-sm transition-all duration-200"
    >
      {children}
    </Link>
  );
}