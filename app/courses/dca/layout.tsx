import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DCA Course Pratappur | Diploma in Computer Applications | Vision IT Computer Institute",
  description: "Enroll in DCA (Diploma in Computer Applications) at Vision IT Computer Institute, the leading computer institute pratappur. 12-month government-recognized course covering Office Automation, Programming, DBMS, Web Development, Accounting & Networking. Fee: ₹13,999.",
  keywords: [
    "DCA course pratappur",
    "diploma in computer applications pratappur",
    "computer course pratappur",
    "DCA computer institute pratappur",
    "vision it DCA course",
    "computer training center pratappur",
    "government recognized DCA pratappur"
  ],
  alternates: {
    canonical: "https://visionitinstitute.com/courses/dca",
  },
  openGraph: {
    title: "DCA Course Pratappur | Diploma in Computer Applications | Vision IT",
    description: "Enroll in DCA at Vision IT Computer Institute pratappur. 12-month offline government-recognized course. Fee: ₹13,999. Includes Office Automation, Programming, Web Development, Accounting & Networking.",
    url: "https://visionitinstitute.com/courses/dca",
    siteName: "Vision IT Computer Institute",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DCA Course Pratappur | Vision IT Computer Institute",
    description: "12-month DCA (Diploma in Computer Applications) at Vision IT Computer Institute Pratappur. Government-recognized. Fee: ₹13,999.",
  },
};

export default function DcaLayout({ children }: { children: React.ReactNode }) {
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Diploma in Computer Applications (DCA)",
    "description": "12-month government-recognized Diploma in Computer Applications at Vision IT Computer Institute Pratappur. Covers Computer Fundamentals, Office Automation, Programming, DBMS, Web Development, Accounting and Networking.",
    "url": "https://visionitinstitute.com/courses/dca",
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
    "educationalCredentialAwarded": "Government-Recognized Diploma Certificate",
    "teaches": [
      "Computer Fundamentals & OS",
      "Office Automation (MS Word, Excel, PowerPoint)",
      "Programming (C Language)",
      "Database Management System",
      "Web Development (HTML/CSS)",
      "Accounting (Tally Prime)",
      "Computer Networks & Cybersecurity"
    ],
    "offers": {
      "@type": "Offer",
      "price": "13999",
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
        { "@type": "ListItem", "position": 3, "name": "DCA Course", "item": "https://visionitinstitute.com/courses/dca" }
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
