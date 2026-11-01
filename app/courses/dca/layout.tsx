export default function DcaLayout({ children }: { children: React.ReactNode }) {
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Diploma in Computer Applications (DCA)",
    "description": "12-month Diploma in Computer Applications at Vision IT Computer Institute Pratappur. Covers Computer Fundamentals, Office Automation, Programming, DBMS, Web Development, Accounting and Networking. Certificate by Drishti Computer Education.",
    "url": "https://www.visionitinstitute.com/courses/dca",
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
    "educationalCredentialAwarded": "Diploma Certificate by Drishti Computer Education",
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
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.visionitinstitute.com" },
        { "@type": "ListItem", "position": 2, "name": "Courses", "item": "https://www.visionitinstitute.com/courses" },
        { "@type": "ListItem", "position": 3, "name": "DCA Course", "item": "https://www.visionitinstitute.com/courses/dca" }
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
