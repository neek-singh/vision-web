import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Jagrani Devi University (JDU) Affiliation | Vision IT Pratappur",
  description: "Explore our official academic collaboration with Jagrani Devi University (JDU). JDU is a UGC-approved state university offering regular & private graduation and postgraduate degree courses in Pratappur, Chhattisgarh.",
  keywords: [
    "about JDU university",
    "JDU UGC recognition",
    "Jagrani Devi University Chhattisgarh",
    "JDU courses",
    "Vision IT JDU affiliation",
    "degree verification",
    "JDU exams"
  ],
  alternates: {
    canonical: "https://visionitinstitute.com/courses/university/about",
  },
  openGraph: {
    title: "About Jagrani Devi University (JDU) Affiliation | Vision IT",
    description: "Learn about the UGC-approved JDU state university affiliation. Read details about courses, regular/private modes, examinations, and facilities.",
    url: "https://visionitinstitute.com/courses/university/about",
    siteName: "Vision IT Computer Institute",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Jagrani Devi University (JDU) Affiliation | Vision IT",
    description: "Official collaboration with UGC-approved state university Jagrani Devi University (JDU) for regular and private degrees.",
  },
};

export default function JduAboutLayout({ children }: { children: React.ReactNode }) {
  const jduAboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Jagrani Devi University (JDU)",
    "description": "Jagrani Devi University is a leading state university recognized by the UGC, offering comprehensive academic departments including Arts, Science, IT, Commerce, Law, and Pharmacy.",
    "url": "https://visionitinstitute.com/courses/university/about",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Chhattisgarh",
      "addressCountry": "IN"
    },
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "degree"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jduAboutJsonLd) }}
      />
      {children}
    </>
  );
}
