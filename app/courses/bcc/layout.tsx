export default function BccLayout({ children }: { children: React.ReactNode }) {
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Basic Computer Course (BCC)",
    "description": "3-month Basic Computer Course at Vision IT Computer Institute Pratappur. Covers Computer Fundamentals, Windows OS, Typing Skills, Office Automation, Internet & Digital Safety, and AI Tools. Certificate by Drishti Computer Education.",
    "url": "https://www.visionitinstitute.com/courses/bcc",
    "provider": {
      "@type": "EducationalOrganization",
      "@id": "https://www.visionitinstitute.com/#organization",
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
    "educationalCredentialAwarded": "Certificate by Drishti Computer Education",
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
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.visionitinstitute.com" },
        { "@type": "ListItem", "position": 2, "name": "Courses", "item": "https://www.visionitinstitute.com/courses" },
        { "@type": "ListItem", "position": 3, "name": "BCC Course", "item": "https://www.visionitinstitute.com/courses/bcc" }
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
