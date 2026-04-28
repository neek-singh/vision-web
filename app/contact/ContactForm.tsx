"use client";

import { useState, useTransition } from "react";
import { submitContactForm } from "@/app/actions/contact";

const WHATSAPP_NUMBER = "918103170595"; // Replace with your number

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const data = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await submitContactForm(data);
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        // WhatsApp redirect with pre-filled message
        const msg = encodeURIComponent(
          `Hello Vision IT! My name is ${formData.name}. Phone: ${formData.phone}. ${formData.message ? `Message: ${formData.message}` : ""}`
        );
        setTimeout(() => {
          window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
        }, 1500);
      }
    });
  };

  // ✨ Polished Success State
  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in-95 fade-in duration-500 fill-mode-both">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-sm shadow-emerald-100 ring-8 ring-emerald-50">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Message Sent!</h3>
        <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">
          Thank you for reaching out. We're redirecting you to WhatsApp for a faster response...
        </p>

        {/* Animated Redirect Indicator */}
        <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Redirecting securely
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-500">

      {/* 🚨 Error State */}
      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100 shadow-sm animate-in slide-in-from-top-2 duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
          <span className="font-medium text-sm leading-relaxed">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            Full Name <span className="text-blue-500">*</span>
          </label>
          <input
            required name="name" value={formData.name} onChange={handleChange}
            className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300 text-slate-900 placeholder:text-slate-400"
            placeholder="Rahul Sharma"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            Phone Number <span className="text-blue-500">*</span>
          </label>
          <input
            required name="phone" type="tel" value={formData.phone} onChange={handleChange}
            className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300 text-slate-900 placeholder:text-slate-400"
            placeholder="+91 81031 70595"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">Email Address</label>
        <input
          name="email" type="email" value={formData.email} onChange={handleChange}
          className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300 text-slate-900 placeholder:text-slate-400"
          placeholder="rahul@example.com (optional)"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">Message</label>
        <textarea
          name="message" value={formData.message} onChange={handleChange} rows={4}
          className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300 text-slate-900 placeholder:text-slate-400 resize-y min-h-[120px]"
          placeholder="Tell us about the course you're interested in..."
        />
      </div>

      <button
        type="submit" disabled={isPending}
        className="group relative flex items-center justify-center w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full shadow-md hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:pointer-events-none text-lg outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        {isPending ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending Message...
          </>
        ) : (
          "Send Message"
        )}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-center text-xs font-medium text-slate-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
        Your information is secure. You'll be redirected to WhatsApp for faster support.
      </p>
    </form>
  );
}