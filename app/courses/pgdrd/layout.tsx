import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PGDRD Course Pratappur | PG Diploma in Rural Development | Vision IT Computer Institute",
  description: "Enroll in PGDRD (Post Graduate Diploma in Rural Development) at Vision IT Computer Institute Pratappur, affiliated with Jagrani Devi University (JDU). 1-year UGC-approved PG diploma covering rural planning, community development, governance, and social work.",
  keywords: [
    "PGDRD course pratappur",
    "PG diploma rural development pratappur",
    "PGDRD JDU university pratappur",
    "vision it PGDRD course",
    "rural development diploma pratappur",
    "Jagrani Devi University PGDRD",
    "PGDRD admission pratappur"
  ],
  alternates: {
    canonical: "https://visionitinstitute.com/courses/pgdrd",
  },
  openGraph: {
    title: "PGDRD Course Pratappur | PG Diploma in Rural Development | Vision IT",
    description: "Enroll in PGDRD at Vision IT Computer Institute Pratappur. 1-year UGC-approved PG diploma affiliated with Jagrani Devi University (JDU).",
    url: "https://visionitinstitute.com/courses/pgdrd",
    siteName: "Vision IT Computer Institute",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PGDRD Course Pratappur | Vision IT Computer Institute",
    description: "1-year PG Diploma in Rural Development at Vision IT Computer Institute Pratappur affiliated with JDU University.",
  },
};

export default function PgdrdLayout({ children }: { children: React.ReactNode }) {
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "PG Diploma in Rural Development (PGDRD)",
    "description": "1-year UGC-approved PG Diploma in Rural Development at Vision IT Computer Institute Pratappur, affiliated with Jagrani Devi University (JDU). Covers rural planning, governance, community development, social work, and panchayati raj.",
    "url": "https://visionitinstitute.com/courses/pgdrd",
    "provider": {
      "@type": "EducationalOrganization",
      "@id": "https://visionitinstitute.com/#organization",
      "name": "Vision IT Computer Institute",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Pratappur",
        "addressRegion": "Chhattisgarh",
        "postalCode": "497223",
        "addressCountry": "IN"
      }
    },
    "timeToComplete": "P12M",
    "educationalCredentialAwarded": "UGC-Approved PG Diploma Certificate",
    "teaches": [
      "Rural Development Planning",
      "Community Development",
      "Panchayati Raj & Governance",
      "Social Work & Welfare Schemes",
      "Rural Economy & Agriculture",
      "NGO Management"
    ],
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Onsite",
      "courseWorkload": "P12M",
      "inLanguage": "hi"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://visionitinstitute.com" },
        { "@type": "ListItem", "position": 2, "name": "Courses", "item": "https://visionitinstitute.com/courses" },
        { "@type": "ListItem", "position": 3, "name": "PGDRD Course", "item": "https://visionitinstitute.com/courses/pgdrd" }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      {children}
    </>
  );
}
