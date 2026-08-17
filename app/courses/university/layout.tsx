import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "University Degree & Diploma Programs in Pratappur | Jagrani Devi University | Vision IT",
  description: "Pursue UGC-approved university degree & diploma programs (BCA, MCA, BA, MA, B.Sc, MBA, B.Com, D.Pharm) at Vision IT Computer Institute, Pratappur. Partnered with Jagrani Devi University (JDU) Chhattisgarh. Regular & private modes available.",
  keywords: [
    "university programs pratappur",
    "JDU degrees pratappur",
    "regular private graduation pratappur",
    "BCA admission JDU",
    "B.Sc JDU pratappur",
    "BA MA private college Chhattisgarh",
    "Vision IT university courses",
    "Jagrani Devi University Chhattisgarh",
    "D.Pharm JDU pratappur"
  ],
  alternates: {
    canonical: "https://visionitinstitute.com/courses/university",
  },
  openGraph: {
    title: "University Degree & Diploma Programs in Pratappur | JDU Affiliation",
    description: "Pursue UGC-approved degrees (BA, MA, B.Sc, BCA, MBA, B.Com, D.Pharm) at Vision IT Computer Institute Pratappur, affiliated with Jagrani Devi University.",
    url: "https://visionitinstitute.com/courses/university",
    siteName: "Vision IT Computer Institute",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "University Degree & Diploma Programs in Pratappur | Vision IT",
    description: "UGC-approved degrees (BCA, B.Sc, BA, MA, B.Com, MBA) affiliated with Jagrani Devi University (JDU) at Vision IT Pratappur.",
  },
};

export default function UniversityLayout({ children }: { children: React.ReactNode }) {
  const universityJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": "https://visionitinstitute.com/courses/university/#jdu",
        "name": "Jagrani Devi University (JDU)",
        "url": "https://visionitinstitute.com/courses/university/about",
        "description": "Jagrani Devi University is a UGC-approved state university offering undergraduate, postgraduate, and professional degree programs.",
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "Chhattisgarh",
          "addressCountry": "IN"
        }
      },
      {
        "@type": "OfferCatalog",
        "@id": "https://visionitinstitute.com/courses/university/#catalog",
        "name": "University Degree & Diploma Programs at Vision IT",
        "itemListElement": [
          {
            "@type": "Course",
            "name": "Bachelor of Computer Applications (BCA)",
            "description": "3-year UGC-approved regular degree in computer applications covering Software Engineering, DBMS, and Web Programming.",
            "provider": { "@id": "https://visionitinstitute.com/courses/university/#jdu" }
          },
          {
            "@type": "Course",
            "name": "Master of Computer Applications (MCA)",
            "description": "2-year post-graduate degree in computer applications for advanced computing careers.",
            "provider": { "@id": "https://visionitinstitute.com/courses/university/#jdu" }
          },
          {
            "@type": "Course",
            "name": "Bachelor of Arts (BA)",
            "description": "3-year undergraduate arts degree available in Regular/Private modes with specializations like Hindi, History, Sociology, and Geography.",
            "provider": { "@id": "https://visionitinstitute.com/courses/university/#jdu" }
          },
          {
            "@type": "Course",
            "name": "Master of Arts (MA)",
            "description": "2-year postgraduate degree in humanities in Regular/Private modes.",
            "provider": { "@id": "https://visionitinstitute.com/courses/university/#jdu" }
          },
          {
            "@type": "Course",
            "name": "Bachelor of Science (B.Sc General)",
            "description": "3-year regular undergraduate science program.",
            "provider": { "@id": "https://visionitinstitute.com/courses/university/#jdu" }
          },
          {
            "@type": "Course",
            "name": "Diploma in Pharmacy (D.Pharm)",
            "description": "2-year professional diploma in pharmacy for licensing as a pharmacist.",
            "provider": { "@id": "https://visionitinstitute.com/courses/university/#jdu" }
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://visionitinstitute.com/courses/university/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Are university courses at Vision IT government recognized?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, all university courses are offered under affiliation with Jagrani Devi University (JDU), a government-recognized, UGC-approved state university. The degrees are fully valid for all government exams and public/private employment."
            }
          },
          {
            "@type": "Question",
            "name": "Can I enroll in private mode for BA and MA courses?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, BA, MA, B.Com, and M.Com courses are available in 'Regular / Private' non-collegiate modes, allowing working professionals and remote students to complete their degrees without daily attendance requirements."
            }
          },
          {
            "@type": "Question",
            "name": "Where are the university examinations held?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "All official university examinations are conducted strictly at the Jagrani Devi University campus or university-designated examination centers according to JDU schedules."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(universityJsonLd) }}
      />
      {children}
    </>
  );
}
