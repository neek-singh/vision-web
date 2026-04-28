import React from 'react'

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://visionitinstitute.com/#organization",
        "name": "Vision IT Computer Institute",
        "url": "https://visionitinstitute.com",
        "logo": "https://visionitinstitute.com/logo.png",
        "sameAs": [
          "https://www.facebook.com/visionitinstitute",
          "https://www.instagram.com/visionitinstitute"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-8103170595",
          "contactType": "customer service",
          "areaServed": "IN",
          "availableLanguage": ["en", "hi"]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://visionitinstitute.com/#website",
        "url": "https://visionitinstitute.com",
        "name": "Vision IT Computer Institute",
        "description": "Empowering students with cutting-edge technology education.",
        "publisher": {
          "@id": "https://visionitinstitute.com/#organization"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://visionitinstitute.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ],
        "inLanguage": "en-IN"
      },
      {
        "@type": "ItemList",
        "@id": "https://visionitinstitute.com/#navigation",
        "name": "Main Navigation",
        "itemListElement": [
          {
            "@type": "SiteNavigationElement",
            "position": 1,
            "name": "Courses",
            "url": "https://visionitinstitute.com/courses"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 2,
            "name": "Admissions",
            "url": "https://visionitinstitute.com/admissions"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 3,
            "name": "About Us",
            "url": "https://visionitinstitute.com/about"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 4,
            "name": "Gallery",
            "url": "https://visionitinstitute.com/gallery"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 5,
            "name": "Contact",
            "url": "https://visionitinstitute.com/contact"
          }
        ]
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
