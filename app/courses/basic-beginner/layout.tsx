import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Basic Computer for Beginner Pratappur | Beginner Computer Course | Vision IT",
  description: "Enroll in Basic Computer for Beginner course at Vision IT Computer Institute, the best computer institute pratappur. 3-month introductory course covering Computer Basics, Windows Interface, MS Word, Excel, Internet, Email & AI Tools. Perfect for absolute beginners.",
  keywords: [
    "basic computer for beginner pratappur",
    "beginner computer course pratappur",
    "computer classes for beginners pratappur",
    "computer coaching pratappur beginner",
    "vision it beginner course",
    "learn computer pratappur",
    "computer education pratappur"
  ],
  alternates: {
    canonical: "https://visionitinstitute.com/courses/basic-beginner",
  },
  openGraph: {
    title: "Basic Computer for Beginner Pratappur | Vision IT Computer Institute",
    description: "3-month Basic Computer for Beginner course at Vision IT Computer Institute pratappur. Covers Computer Basics, Windows, MS Word, Excel, Internet, Email & AI Tools. Ideal for absolute beginners.",
    url: "https://visionitinstitute.com/courses/basic-beginner",
    siteName: "Vision IT Computer Institute",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Basic Computer for Beginner | Vision IT Computer Institute Pratappur",
    description: "3-month absolute beginner computer course at Vision IT Computer Institute Pratappur. Learn Computer Basics, Windows, MS Word, Internet & AI Tools.",
  },
};

export default function BasicBeginnerLayout({ children }: { children: React.ReactNode }) {
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Basic Computer for Beginner",
    "description": "3-month introductory computer course for absolute beginners at Vision IT Computer Institute Pratappur. Covers Computer Basics, Windows Interface, MS Word, MS Excel, Internet browsing, Email setup, and AI Tools introduction.",
    "url": "https://visionitinstitute.com/courses/basic-beginner",
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
    "educationalCredentialAwarded": "Certificate of Completion",
    "teaches": [
      "Computer Basics & Hardware",
      "Windows Operating System Interface",
      "Microsoft Word",
      "Microsoft Excel Basics",
      "Internet & Web Browsing",
      "Email Setup & Digital Communication",
      "Introduction to AI Tools"
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
        { "@type": "ListItem", "position": 3, "name": "Basic Computer for Beginner", "item": "https://visionitinstitute.com/courses/basic-beginner" }
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
