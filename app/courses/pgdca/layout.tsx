export default function PgdcaLayout({ children }: { children: React.ReactNode }) {
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Post Graduate Diploma in Computer Applications (PGDCA)",
    "description": "12-month Post Graduate Diploma in Computer Applications at Vision IT Computer Institute Pratappur. Covers Computer Architecture, OOP (C++), Database Management System, Web Technologies, MS Office, Tally Accounting, Computer Networking, and AI Tools. Certificate by Drishti Computer Education.",
    "url": "https://www.visionitinstitute.com/courses/pgdca",
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
    "educationalCredentialAwarded": "Post Graduate Diploma Certificate by Drishti Computer Education",
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
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.visionitinstitute.com" },
        { "@type": "ListItem", "position": 2, "name": "Courses", "item": "https://www.visionitinstitute.com/courses" },
        { "@type": "ListItem", "position": 3, "name": "PGDCA Course", "item": "https://www.visionitinstitute.com/courses/pgdca" }
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
