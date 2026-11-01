import React from 'react';

export default function StructuredData() {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.visionitinstitute.com/#website",
    "url": "https://www.visionitinstitute.com",
    "name": "Vision IT Computer Institute",
    "description": "Vision IT Computer Institute is an offline computer training center in Pratappur, Chhattisgarh offering practical computer courses.",
    "publisher": {
      "@type": "EducationalOrganization",
      "@id": "https://www.visionitinstitute.com/#organization",
      "name": "Vision IT Computer Institute",
      "url": "https://www.visionitinstitute.com"
    },
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.visionitinstitute.com/courses?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    ],
    "inLanguage": "en-IN"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
    />
  );
}
