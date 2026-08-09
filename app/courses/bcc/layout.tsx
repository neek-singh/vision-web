import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BCC Course Pratappur | Basic Computer Course | Vision IT Computer Institute",
  description: "Enroll in BCC (Basic Computer Course) at Vision IT Computer Institute, the top computer institute pratappur. 3-month certificate course covering Computer Fundamentals, Windows OS, MS Office, Internet & AI Tools. Fee: ₹2,999.",
  keywords: [
    "BCC course pratappur",
    "basic computer course pratappur",
    "computer certificate course pratappur",
    "vision it BCC course",
    "beginner computer classes pratappur",
    "computer classes pratappur",
    "basic IT course pratappur"
  ],
  alternates: {
    canonical: "https://visionitinstitute.com/courses/bcc",
  },
  openGraph: {
    title: "BCC Course Pratappur | Basic Computer Course | Vision IT",
    description: "Enroll in BCC at Vision IT Computer Institute pratappur. 3-month offline certificate course. Fee: ₹2,999. Covers Computer Fundamentals, Windows, MS Office, Internet & AI Tools.",
    url: "https://visionitinstitute.com/courses/bcc",
    siteName: "Vision IT Computer Institute",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BCC Course Pratappur | Vision IT Computer Institute",
    description: "3-month BCC (Basic Computer Course) at Vision IT Computer Institute Pratappur. Government-recognized. Fee: ₹2,999.",
  },
};

export default function BccLayout({ children }: { children: React.ReactNode }) {
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Basic Computer Course (BCC)",
    "description": "3-month government-recognized Basic Computer Course at Vision IT Computer Institute Pratappur. Covers Computer Fundamentals, Windows OS, Typing Skills, Office Automation, Internet & Digital Safety, and AI Tools.",
    "url": "https://visionitinstitute.com/courses/bcc",
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
    "timeToComplete": "P3M",
    "educationalCredentialAwarded": "Government-Recognized Certificate",
    "teaches": [
      "Computer Fundamentals",
      "Windows Operating System",
      "Typing Skills",
      "Office Automation (MS Word, Excel, PowerPoint)",
      "Internet & Digital Safety",
      "AI Tools & ChatGPT"
    ],
    "offers": {
      "@type": "Offer",
      "price": "2999",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Onsite",
      "courseWorkload": "P3M",
      "inLanguage": "hi"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://visionitinstitute.com" },
        { "@type": "ListItem", "position": 2, "name": "Courses", "item": "https://visionitinstitute.com/courses" },
        { "@type": "ListItem", "position": 3, "name": "BCC Course", "item": "https://visionitinstitute.com/courses/bcc" }
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
