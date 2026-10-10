import React from 'react'

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // ─── Organization + LocalBusiness + EducationalOrganization ───
      {
        "@type": ["Organization", "LocalBusiness", "EducationalOrganization"],
        "@id": "https://visionitinstitute.com/#organization",
        "name": "Vision IT Computer Institute",
        "alternateName": "Vision IT Computer Center Pratappur",
        "url": "https://visionitinstitute.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://res.cloudinary.com/ddiooxxks/image/upload/f_auto,q_auto/logo_unnut8.png",
          "width": 400,
          "height": 400
        },
        "image": "https://res.cloudinary.com/ddiooxxks/image/upload/f_auto,q_auto/logo_unnut8.png",
        "description": "Vision IT Computer Institute is the leading computer institute in Pratappur, Chhattisgarh. We offer government-recognized diploma and certificate computer courses including DCA, ADCA, PGDCA, BCC, and Web Development with 70% practical offline training.",
        "foundingDate": "2018",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Kadampara Chowk",
          "addressLocality": "Pratappur",
          "addressRegion": "Chhattisgarh",
          "postalCode": "497223",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "23.2599",
          "longitude": "82.5983"
        },
        "telephone": "+91-8103170595",
        "email": "info@visionitinstitute.com",
        "openingHours": "Mo,Tu,We,Th,Fr,Sa 09:00-18:00",
        "priceRange": "₹₹",
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+91-8103170595",
            "email": "info@visionitinstitute.com",
            "contactType": "admissions",
            "areaServed": "IN",
            "availableLanguage": ["en", "hi"]
          },
          {
            "@type": "ContactPoint",
            "telephone": "+91-8103170595",
            "email": "support@visionitinstitute.com",
            "contactType": "customer support",
            "areaServed": "IN",
            "availableLanguage": ["en", "hi"]
          }
        ],
        "sameAs": [
          "https://www.facebook.com/visionitinstitute",
          "https://www.instagram.com/visionitinstitute"
        ],
        "knowsAbout": [
          "Diploma in Computer Applications (DCA)",
          "Advanced Diploma in Computer Applications (ADCA)",
          "Post Graduate Diploma in Computer Applications (PGDCA)",
          "Basic Computer Course (BCC)",
          "Web Development",
          "Tally Prime Accounting",
          "MS Office Automation",
          "Computer Fundamentals",
          "AI Tools & ChatGPT"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Computer Courses at Vision IT Computer Institute Pratappur",
          "itemListElement": [
            {
              "@type": "Course",
              "name": "Diploma in Computer Applications (DCA)",
              "description": "12-month government-recognized diploma in computer applications covering Office Automation, Programming, DBMS, Web Development, Accounting & Networking.",
              "provider": { "@id": "https://visionitinstitute.com/#organization" },
              "url": "https://visionitinstitute.com/courses/dca",
              "timeToComplete": "P12M",
              "offers": {
                "@type": "Offer",
                "price": "13999",
                "priceCurrency": "INR"
              }
            },
            {
              "@type": "Course",
              "name": "Advanced Diploma in Computer Applications (ADCA)",
              "description": "12-month advanced diploma covering MS Office, DTP (Photoshop, CorelDraw), Programming (C/C++), Web Development, Tally Accounting, and AI Tools.",
              "provider": { "@id": "https://visionitinstitute.com/#organization" },
              "url": "https://visionitinstitute.com/courses/adca",
              "timeToComplete": "P12M",
              "offers": {
                "@type": "Offer",
                "price": "14999",
                "priceCurrency": "INR"
              }
            },
            {
              "@type": "Course",
              "name": "Post Graduate Diploma in Computer Applications (PGDCA)",
              "description": "12-month post-graduate diploma for graduates covering Computer Architecture, OOP (C++), DBMS, Web Technologies, MS Office, Tally Accounting, Networking & AI.",
              "provider": { "@id": "https://visionitinstitute.com/#organization" },
              "url": "https://visionitinstitute.com/courses/pgdca",
              "timeToComplete": "P12M",
              "offers": {
                "@type": "Offer",
                "price": "16999",
                "priceCurrency": "INR"
              }
            },
            {
              "@type": "Course",
              "name": "Basic Computer Course (BCC)",
              "description": "3-month beginner certificate course covering Computer Fundamentals, Windows OS, MS Office basics, Internet & Digital Safety, and AI Tools.",
              "provider": { "@id": "https://visionitinstitute.com/#organization" },
              "url": "https://visionitinstitute.com/courses/bcc",
              "timeToComplete": "P3M",
              "offers": {
                "@type": "Offer",
                "price": "2999",
                "priceCurrency": "INR"
              }
            },
            {
              "@type": "Course",
              "name": "Basic Computer for Beginner",
              "description": "3-month absolute beginner course covering Computer Basics, Windows Interface, MS Word, Internet, Email & AI Tools.",
              "provider": { "@id": "https://visionitinstitute.com/#organization" },
              "url": "https://visionitinstitute.com/courses/basic-beginner",
              "timeToComplete": "P3M",
              "offers": {
                "@type": "Offer",
                "price": "2999",
                "priceCurrency": "INR"
              }
            }
          ]
        }
      },

      // ─── WebSite ───
      {
        "@type": "WebSite",
        "@id": "https://visionitinstitute.com/#website",
        "url": "https://visionitinstitute.com",
        "name": "Vision IT Computer Institute",
        "description": "Vision IT Computer Institute is the leading computer institute in Pratappur, Chhattisgarh offering government-recognized computer courses.",
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

      // ─── FAQ (AEO — Answer Engine Optimization) ───
      {
        "@type": "FAQPage",
        "@id": "https://visionitinstitute.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Which is the best computer institute in Pratappur?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Vision IT Computer Institute is the best computer institute in Pratappur, Chhattisgarh. It offers government-recognized computer courses like DCA, ADCA, PGDCA, and BCC with 70% practical offline training at Kadampara Chowk, Pratappur."
            }
          },
          {
            "@type": "Question",
            "name": "What courses are offered at Vision IT Computer Institute Pratappur?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Vision IT Computer Institute Pratappur offers DCA (Diploma in Computer Applications), ADCA (Advanced Diploma), PGDCA (Post Graduate Diploma), BCC (Basic Computer Course), and a Basic Computer for Beginner course. All courses are government-recognized with offline classroom training."
            }
          },
          {
            "@type": "Question",
            "name": "What is the fee for DCA course at Vision IT Computer Institute?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The total fee for the DCA (Diploma in Computer Applications) course at Vision IT Computer Institute Pratappur is ₹13,999, which includes admission fee (₹2,000), tuition fee (₹10,999), and exam fee (₹1,000). The course duration is 12 months."
            }
          },
          {
            "@type": "Question",
            "name": "Where is Vision IT Computer Institute located?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Vision IT Computer Institute is located at Kadampara Chowk, Pratappur, Surajpur District, Chhattisgarh - 497223. You can contact us at +91-8103170595."
            }
          },
          {
            "@type": "Question",
            "name": "Is Vision IT Computer Institute government recognized?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Vision IT Computer Institute Pratappur is a government-recognized computer training center. Our certificates are valid for government jobs and higher education admissions."
            }
          }
        ]
      },

      // ─── Navigation ───
      {
        "@type": "ItemList",
        "@id": "https://visionitinstitute.com/#navigation",
        "name": "Main Navigation",
        "itemListElement": [
          { "@type": "SiteNavigationElement", "position": 1, "name": "Courses", "url": "https://visionitinstitute.com/courses" },
          { "@type": "SiteNavigationElement", "position": 2, "name": "Inquiry", "url": "https://visionitinstitute.com/inquiry" },
          { "@type": "SiteNavigationElement", "position": 3, "name": "About Us", "url": "https://visionitinstitute.com/about" },
          { "@type": "SiteNavigationElement", "position": 4, "name": "Gallery", "url": "https://visionitinstitute.com/gallery" },
          { "@type": "SiteNavigationElement", "position": 5, "name": "Contact", "url": "https://visionitinstitute.com/contact" }
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
