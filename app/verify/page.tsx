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
    <main className="w-full bg-[#f8fafc] min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-serif font-black text-slate-900 mb-4 tracking-tight">
            Verify Credentials
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm md:text-base max-w-3xl mx-auto leading-relaxed font-medium">
            A secure tool for employers and institutions to validate academic records, marksheets, and certificates issued by the Computer Applications Institute.
          </p>
        </div>

        {/* Verification Portal Wrapper */}
        <div className="mt-8">
          <VerificationPortal initialQuery={initialQuery} />
        </div>
      </div>
    </main>
  );
}
