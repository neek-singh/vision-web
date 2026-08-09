import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PGDCA Course Pratappur | Post Graduate Diploma in Computer Applications | Vision IT",
  description: "Enroll in PGDCA (Post Graduate Diploma in Computer Applications) at Vision IT Computer Institute, the leading computer institute pratappur. 12-month government-recognized post-graduate course for graduates. Fee: ₹16,999.",
  keywords: [
    "PGDCA course pratappur",
    "post graduate diploma computer applications pratappur",
    "PGDCA computer institute pratappur",
    "vision it PGDCA course",
    "computer course for graduates pratappur",
    "advanced IT course pratappur",
    "PGDCA chhattisgarh"
  ],
  alternates: {
    canonical: "https://visionitinstitute.com/courses/pgdca",
  },
  openGraph: {
    title: "PGDCA Course Pratappur | Post Graduate Diploma in Computer Applications | Vision IT",
    description: "Enroll in PGDCA at Vision IT Computer Institute pratappur. 12-month government-recognized post-graduate diploma covering OOP (C++), DBMS, Web Technologies, Tally & AI. Fee: ₹16,999.",
    url: "https://visionitinstitute.com/courses/pgdca",
    siteName: "Vision IT Computer Institute",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PGDCA Course Pratappur | Vision IT Computer Institute",
    description: "12-month PGDCA (Post Graduate Diploma in Computer Applications) at Vision IT Computer Institute Pratappur. Government-recognized. Fee: ₹16,999.",
  },
};

export default function PgdcaLayout({ children }: { children: React.ReactNode }) {
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Post Graduate Diploma in Computer Applications (PGDCA)",
    "description": "12-month government-recognized Post Graduate Diploma in Computer Applications at Vision IT Computer Institute Pratappur. Covers Computer Architecture, OOP (C++), Database Management System, Web Technologies, MS Office, Tally Accounting, Computer Networking, and AI Tools.",
    "url": "https://visionitinstitute.com/courses/pgdca",
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
    "educationalCredentialAwarded": "Government-Recognized Post Graduate Diploma Certificate",
    "educationalCredentialRequirement": "Graduate (Any Stream)",
    "teaches": [
      "Computer Organization & Architecture",
      "Object Oriented Programming (C++)",
      "Database Management System",
      "Web Technologies (HTML, CSS, JavaScript)",
      "Office Automation Suite",
      "Financial Accounting (Tally Prime)",
      "Computer Networking & Cybersecurity",
      "AI Tools & Machine Learning Basics"
    ],
    "offers": {
      "@type": "Offer",
      "price": "16999",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    },
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
        { "@type": "ListItem", "position": 3, "name": "PGDCA Course", "item": "https://visionitinstitute.com/courses/pgdca" }
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
