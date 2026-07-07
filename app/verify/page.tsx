import { Metadata } from "next";
import VerificationPortal from "@/features/verification/components/VerificationPortal";

export const metadata: Metadata = {
  title: "Certificate & Marksheet Verification | Vision IT Computer Institute",
  description: "Verify academic certificates and marksheets issued by Vision IT Computer Institute Pratappur. Secure online student credentials verification.",
  keywords: "verify certificate Vision IT, marksheet verification computer institute, verify student roll number",
};

export const revalidate = 0;

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const params = await searchParams;
  const initialQuery = params.id || "";

  return (
    <main className="w-full bg-slate-50 min-h-screen pb-24 font-sans overflow-x-hidden">
      {/* Hero Section (Clean Light Theme) */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200 py-20 lg:py-28">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-blue-100/80 to-white pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-300/80 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-32 -left-24 w-72 h-72 bg-indigo-300/80 rounded-full blur-3xl pointer-events-none" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight mb-3">
            Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Verification</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed font-medium">
            Verify official student certifications, transcript records, and grades issued by our institute.
          </p>
        </div>
      </section>

      {/* Verification Portal Wrapper */}
      <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 -mt-6 md:-mt-8 z-10">
        <VerificationPortal initialQuery={initialQuery} />
      </section>
    </main>
  );
}
