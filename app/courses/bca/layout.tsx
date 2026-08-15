import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BCA Course Pratappur | Bachelor of Computer Applications | Vision IT Computer Institute",
  description: "Enroll in BCA (Bachelor of Computer Applications) at Vision IT Computer Institute Pratappur, affiliated with Jagrani Devi University (JDU). 3-year UGC-approved degree covering Programming, DBMS, Web Development, Networking & more. Govt. recognized degree.",
  keywords: [
    "BCA course pratappur",
    "bachelor of computer applications pratappur",
    "BCA university course pratappur",
    "BCA JDU university pratappur",
    "vision it BCA course",
    "computer degree pratappur",
    "Jagrani Devi University BCA",
    "BCA admission pratappur"
  ],
  alternates: {
    canonical: "https://visionitinstitute.com/courses/bca",
  },
  openGraph: {
    title: "BCA Course Pratappur | Bachelor of Computer Applications | Vision IT",
    description: "Enroll in BCA at Vision IT Computer Institute Pratappur. 3-year UGC-approved degree affiliated with Jagrani Devi University (JDU). Government-recognized degree for a career in IT.",
    url: "https://visionitinstitute.com/courses/bca",
    siteName: "Vision IT Computer Institute",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BCA Course Pratappur | Vision IT Computer Institute",
    description: "3-year BCA (Bachelor of Computer Applications) at Vision IT Computer Institute Pratappur affiliated with JDU University. Government-recognized UGC-approved degree.",
  },
};

export default function BcaLayout({ children }: { children: React.ReactNode }) {
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Bachelor of Computer Applications (BCA)",
    "description": "3-year UGC-approved Bachelor of Computer Applications degree at Vision IT Computer Institute Pratappur, affiliated with Jagrani Devi University (JDU). Covers Programming, DBMS, Web Development, Data Structures, Networking, and Software Engineering.",
    "url": "https://visionitinstitute.com/courses/bca",
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
    "timeToComplete": "P36M",
    "educationalCredentialAwarded": "UGC-Approved Bachelor Degree",
    "teaches": [
      "Programming (C, C++, Java)",
      "Database Management System",
      "Web Development (HTML, CSS, JavaScript)",
      "Data Structures & Algorithms",
      "Computer Networks",
      "Software Engineering",
      "Operating Systems",
      "Mathematics & Statistics"
    ],
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Onsite",
      "courseWorkload": "P36M",
      "inLanguage": "hi"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://visionitinstitute.com" },
        { "@type": "ListItem", "position": 2, "name": "Courses", "item": "https://visionitinstitute.com/courses" },
        { "@type": "ListItem", "position": 3, "name": "BCA Course", "item": "https://visionitinstitute.com/courses/bca" }
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
