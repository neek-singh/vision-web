export default function AdcaLayout({ children }: { children: React.ReactNode }) {
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Advanced Diploma in Computer Applications (ADCA)",
    "description": "12-month Advanced Diploma in Computer Applications at Vision IT Computer Institute Pratappur. Covers MS Office, Desktop Publishing (Photoshop, CorelDraw, PageMaker), Programming (C/C++), Web Development, Tally Accounting, and AI Tools. Certificate by Drishti Computer Education.",
    "url": "https://www.visionitinstitute.com/courses/adca",
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
    "timeToComplete": "P12M",
    "educationalCredentialAwarded": "Advanced Diploma Certificate by Drishti Computer Education",
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
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.visionitinstitute.com" },
        { "@type": "ListItem", "position": 2, "name": "Courses", "item": "https://www.visionitinstitute.com/courses" },
        { "@type": "ListItem", "position": 3, "name": "ADCA Course", "item": "https://www.visionitinstitute.com/courses/adca" }
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
