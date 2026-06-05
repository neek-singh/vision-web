"use client";

import dynamic from "next/dynamic";

const ContactForm = dynamic(() => import("@/features/contact/components/ContactForm"), {
  ssr: false,
  loading: () => <div className="h-96 bg-slate-100 rounded-2xl animate-pulse" />,
});

export default function ContactFormClientWrapper() {
  return <ContactForm />;
}
