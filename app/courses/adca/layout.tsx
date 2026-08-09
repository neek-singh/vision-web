import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ADCA Course Pratappur | Advanced Diploma in Computer Applications | Vision IT",
  description: "Enroll in ADCA (Advanced Diploma in Computer Applications) at Vision IT Computer Institute, the leading computer institute pratappur. 12-month government-recognized course covering MS Office, DTP (Photoshop, CorelDraw), Programming, Web Development, Tally & AI Tools. Fee: ₹14,999.",
  keywords: [
    "ADCA course pratappur",
    "advanced diploma in computer applications pratappur",
    "computer course pratappur",
    "ADCA computer institute pratappur",
    "vision it ADCA course",
    "DTP course pratappur",
    "advanced computer training pratappur"
  ],
  alternates: {
    canonical: "https://visionitinstitute.com/courses/adca",
  },
  openGraph: {
    title: "ADCA Course Pratappur | Advanced Diploma in Computer Applications | Vision IT",
    description: "Enroll in ADCA at Vision IT Computer Institute pratappur. 12-month offline government-recognized course covering MS Office, DTP, Programming, Web Dev, Tally & AI Tools. Fee: ₹14,999.",
    url: "https://visionitinstitute.com/courses/adca",
    siteName: "Vision IT Computer Institute",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ADCA Course Pratappur | Vision IT Computer Institute",
    description: "12-month ADCA (Advanced Diploma in Computer Applications) at Vision IT Computer Institute Pratappur. Government-recognized. Fee: ₹14,999.",
  },
};

export default function AdcaLayout({ children }: { children: React.ReactNode }) {
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Advanced Diploma in Computer Applications (ADCA)",
    "description": "12-month government-recognized Advanced Diploma in Computer Applications at Vision IT Computer Institute Pratappur. Covers MS Office, Desktop Publishing (Photoshop, CorelDraw, PageMaker), Programming (C/C++), Web Development, Tally Accounting, and AI Tools.",
    "url": "https://visionitinstitute.com/courses/adca",
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
    "educationalCredentialAwarded": "Government-Recognized Advanced Diploma Certificate",
    "teaches": [
      "Computer Fundamentals & OS",
      "Office Automation Suite",
      "Desktop Publishing (DTP)",
      "Programming Foundations (C/C++)",
      "Database & Web Development",
      "Financial Accounting (Tally Prime)",
      "Internet & AI Tools"
    ],
    "offers": {
      "@type": "Offer",
      "price": "14999",
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
        { "@type": "ListItem", "position": 3, "name": "ADCA Course", "item": "https://visionitinstitute.com/courses/adca" }
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
