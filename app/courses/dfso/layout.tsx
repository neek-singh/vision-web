import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DFSO Course Pratappur | Diploma in Fire Service & Operations | Vision IT Computer Institute",
  description: "Enroll in DFSO (Diploma in Fire Service & Operations) at Vision IT Computer Institute Pratappur, affiliated with Jagrani Devi University (JDU). 1-year UGC-approved diploma covering fire safety engineering, rescue operations, disaster management, and industrial safety.",
  keywords: [
    "DFSO course pratappur",
    "Diploma in Fire Service & Operations pratappur",
    "DFSO JDU university pratappur",
    "vision it DFSO course",
    "fire safety diploma pratappur",
    "Jagrani Devi University DFSO",
    "DFSO admission pratappur"
  ],
  alternates: {
    canonical: "https://visionitinstitute.com/courses/dfso",
  },
  openGraph: {
    title: "DFSO Course Pratappur | Diploma in Fire Service & Operations | Vision IT",
    description: "Enroll in DFSO at Vision IT Computer Institute Pratappur. 1-year UGC-approved diploma affiliated with Jagrani Devi University (JDU). Complete fire safety and rescue operations training.",
    url: "https://visionitinstitute.com/courses/dfso",
    siteName: "Vision IT Computer Institute",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DFSO Course Pratappur | Vision IT Computer Institute",
    description: "1-year Diploma in Fire Service & Operations at Vision IT Computer Institute Pratappur affiliated with JDU University.",
  },
};

export default function DfsoLayout({ children }: { children: React.ReactNode }) {
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Diploma in Fire Service & Operations (DFSO)",
    "description": "1-year UGC-approved Diploma in Fire Service & Operations at Vision IT Computer Institute Pratappur, affiliated with Jagrani Devi University (JDU). Covers fire fighting chemistry, rescue operations, industrial safety, and first aid.",
    "url": "https://visionitinstitute.com/courses/dfso",
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
      "Fire Fighting Chemistry & Physics",
      "Rescue Operations & Equipment",
      "First Aid & Emergency Medical Care",
      "Disaster Management & Mitigation",
      "Industrial & Construction Safety",
      "Fire Prevention & Alarm Systems"
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
        { "@type": "ListItem", "position": 3, "name": "DFSO Course", "item": "https://visionitinstitute.com/courses/dfso" }
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
