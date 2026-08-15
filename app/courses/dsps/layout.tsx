import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DSPS Course Pratappur | Diploma in Solar Power System | Vision IT Computer Institute",
  description: "Enroll in DSPS (Diploma in Solar Power System) at Vision IT Computer Institute Pratappur, affiliated with Jagrani Devi University (JDU). 1-year UGC-approved diploma covering solar energy fundamentals, PV design, installation, maintenance, and grid systems.",
  keywords: [
    "DSPS course pratappur",
    "Diploma in Solar Power System pratappur",
    "DSPS JDU university pratappur",
    "vision it DSPS course",
    "solar power diploma pratappur",
    "Jagrani Devi University DSPS",
    "DSPS admission pratappur"
  ],
  alternates: {
    canonical: "https://visionitinstitute.com/courses/dsps",
  },
  openGraph: {
    title: "DSPS Course Pratappur | Diploma in Solar Power System | Vision IT",
    description: "Enroll in DSPS at Vision IT Computer Institute Pratappur. 1-year UGC-approved diploma affiliated with Jagrani Devi University (JDU). Hands-on solar panel installation and grid system training.",
    url: "https://visionitinstitute.com/courses/dsps",
    siteName: "Vision IT Computer Institute",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DSPS Course Pratappur | Vision IT Computer Institute",
    description: "1-year Diploma in Solar Power System at Vision IT Computer Institute Pratappur affiliated with JDU University.",
  },
};

export default function DspsLayout({ children }: { children: React.ReactNode }) {
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Diploma in Solar Power System (DSPS)",
    "description": "1-year UGC-approved Diploma in Solar Power System at Vision IT Computer Institute Pratappur, affiliated with Jagrani Devi University (JDU). Covers solar energy physics, PV installation, grid integration, and solar plant maintenance.",
    "url": "https://visionitinstitute.com/courses/dsps",
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
    "educationalCredentialAwarded": "UGC-Approved Diploma Certificate",
    "teaches": [
      "Solar Radiation & Photovoltaic Principles",
      "Solar PV Components & Batteries",
      "Solar Panel System Design & Sizing",
      "Installation & Commissioning Procedures",
      "Testing, Troubleshooting & Maintenance",
      "Off-Grid, On-Grid & Hybrid Solar Systems"
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
        { "@type": "ListItem", "position": 3, "name": "DSPS Course", "item": "https://visionitinstitute.com/courses/dsps" }
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
