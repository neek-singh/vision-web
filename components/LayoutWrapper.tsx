"use client";

import { usePathname } from "next/navigation";

export default function LayoutWrapper({
  header,
  footer,
  children
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Hide header and footer on all course details pages
  const hideHeaderFooter = pathname.startsWith("/courses/dca") || pathname.startsWith("/courses/bcc") || pathname.startsWith("/courses/adca") || pathname.startsWith("/courses/pgdca") || pathname.startsWith("/courses/basic-beginner") || pathname.startsWith("/courses/diploma") || pathname.startsWith("/courses/certificate");

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {!hideHeaderFooter && header}
      {children}
      {!hideHeaderFooter && footer}
    </div>
  );
}
