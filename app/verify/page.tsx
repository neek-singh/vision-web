import { Metadata } from "next";
import VerificationPortal from "@/features/verification/components/VerificationPortal";

export const metadata: Metadata = {
  title: "Verify Student Record | Vision IT",
  description:
    "Verify student records using Certificate ID and Date of Birth. Certificates are issued by Drishti Computer Education for Vision IT branch students.",
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
        <div className="text-center mb-10 pt-16 sm:pt-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 font-normal rounded-full text-xs border border-blue-200/50 mb-3">
            Official Records
          </span>
          <h1 className="text-3xl md:text-4xl font-normal text-slate-950 mb-3 tracking-tight">
            Verify Student Record
          </h1>
          <p className="text-slate-950 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-normal">
            Enter both Certificate ID and Date of Birth to verify student records. Certificates are issued by Drishti Computer Education. This portal displays verification records for Vision IT branch students.
          </p>
        </div>

        {/* Verification Portal Wrapper */}
        <div className="mt-6">
          <VerificationPortal initialQuery={initialQuery} />
        </div>
      </div>
    </main>
  );
}
