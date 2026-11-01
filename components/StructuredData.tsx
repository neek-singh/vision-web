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
        "description": "Vision IT Computer Institute is a computer training institute in Pratappur, Chhattisgarh, operating since 2025 as a franchise branch of Drishti Computer Education (Branch Code: DCE/25/041). We offer offline BCC, DCA, ADCA, PGDCA, Tally Prime with GST, and School Tuition with 70% practical offline training.",
        "foundingDate": "2025",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Shubham Gift Gallery, 2nd Floor, Kadampara Chowk",
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
        "openingHours": "Mo,Tu,We,Th,Fr,Sa 08:00-18:00",
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
            "telephone": "+91-9301221630",
            "email": "info@visionitinstitute.com",
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
          "Tally Prime with GST",
          "School Computer Tuition (Class 6th-11th)",
          "MS Office Automation",
          "Computer Fundamentals"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Computer Courses at Vision IT Computer Institute Pratappur",
          "itemListElement": [
            {
              "@type": "Course",
              "name": "Diploma in Computer Applications (DCA)",
              "description": "12-month computer applications diploma covering Office Automation, C Programming, DBMS, Web Basics, and Tally Prime with GST.",
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
              "description": "12-month advanced diploma covering MS Office, DTP (Photoshop, CorelDRAW, PageMaker), C/C++ basics, web basics, and Tally Prime with GST.",
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
              "description": "12-month post-graduate diploma for graduates covering C++ OOP, database design, web technologies, and accounting.",
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
              "description": "3-month beginner certificate course covering Computer Fundamentals, Windows OS, MS Office basics, and Internet.",
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
              "name": "Tally Prime with GST",
              "description": "3-month certificate course in computerized accounting, vouchers, inventory, and GST billing.",
              "provider": { "@id": "https://visionitinstitute.com/#organization" },
              "url": "https://visionitinstitute.com/courses/tally",
              "timeToComplete": "P3M",
              "offers": {
                "@type": "Offer",
                "price": "4499",
                "priceCurrency": "INR"
              }
            },
            {
              "@type": "Course",
              "name": "School Computer Tuition (Class 6th – 11th)",
              "description": "Monthly offline computer tuition for school students covering school curriculum, touch typing, MS Office, and digital hygiene.",
              "provider": { "@id": "https://visionitinstitute.com/#organization" },
              "url": "https://visionitinstitute.com/courses/school-tuition",
              "timeToComplete": "P1M",
              "offers": {
                "@type": "Offer",
                "price": "599",
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
        "description": "Vision IT Computer Institute is a computer training center in Pratappur, Chhattisgarh offering offline practical computer courses.",
        "publisher": {
          "@id": "https://visionitinstitute.com/#organization"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://visionitinstitute.com/courses"
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
            "name": "Which computer institute is located in Pratappur?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Vision IT Computer Institute is located at Shubham Gift Gallery, 2nd Floor, Kadampara Chowk, Pratappur, Chhattisgarh. It offers offline computer courses like BCC, DCA, ADCA, PGDCA, Tally Prime with GST, and School Tuition with 70% practical offline training."
            }
          },
          {
            "@type": "Question",
            "name": "What courses are offered at Vision IT Computer Institute Pratappur?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Vision IT Computer Institute Pratappur offers BCC (3 months), DCA (12 months), ADCA (12 months), PGDCA (12 months), Tally Prime with GST (3 months), and School Computer Tuition (Class 6th to 11th). All training is conducted offline in our computer lab."
            }
          },
          {
            "@type": "Question",
            "name": "What is the fee for DCA course at Vision IT Computer Institute?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The total fee for the DCA (Diploma in Computer Applications) course at Vision IT Computer Institute Pratappur is ₹13,999, which includes admission fee (₹2,000), tuition fee (₹10,999), and exam fee (₹1,000). The course duration is 12 months with flexible installment options."
            }
          },
          {
            "@type": "Question",
            "name": "Where is Vision IT Computer Institute located?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Vision IT Computer Institute is located at Shubham Gift Gallery, 2nd Floor, Kadampara Chowk, Pratappur, Surajpur District, Chhattisgarh - 497223. You can contact us at +91-8103170595 or +91-9301221630."
            }
          },
          {
            "@type": "Question",
            "name": "Who issues the certificates for courses at Vision IT?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Vision IT Computer Institute is an authorized franchise branch of Drishti Computer Education (Branch Code: DCE/25/041). Certificates are awarded by Drishti Computer Education upon successful completion and examination."
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
