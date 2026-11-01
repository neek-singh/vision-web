import type { Metadata } from "next";
import CourseDetailsView, { CourseData } from "@/components/CourseDetailsView";

export const metadata: Metadata = {
  title: "ADCA Course in Pratappur | Advanced Diploma in Computer Applications",
  description: "ADCA course in Pratappur: 12 months, offline, 70% practical. MS Office, DTP (Photoshop, CorelDRAW), C/C++, Tally. Fee Rs 14,999. Vision IT.",
  alternates: {
    canonical: "/courses/adca",
  },
  openGraph: {
    title: "ADCA Course in Pratappur | Advanced Diploma in Computer Applications",
    description: "ADCA course in Pratappur: 12 months, offline, 70% practical. MS Office, DTP (Photoshop, CorelDRAW), C/C++, Tally. Fee Rs 14,999.",
    url: "/courses/adca",
  },
};

const adcaData: CourseData = {
  courseId: "2fc69f17-e7a0-4bde-b995-8cbda1e2e55b",
  title: "Advanced Diploma in Computer Applications (ADCA)",
  badge: "Advanced Diploma",
  duration: "12 Months",
  level: "Advanced Diploma",
  mode: "Offline Lab",
  language: "Hindi",
  eligibility: "Minimum 10th / 12th Pass",
  about: "ADCA is an advanced 12-month program combining complete office automation with Desktop Publishing (Photoshop, CorelDRAW, PageMaker), C/C++ programming, database fundamentals, web design, and Tally Prime with GST.",
  fee: {
    total: "₹14,999",
    admission: "₹2,000",
    tuition: "₹11,999",
    exam: "₹1,000",
  },
  skills: [
    "Computer Fundamentals & Advanced OS Utilities",
    "Advanced MS Office Suite (Word, Excel, PowerPoint)",
    "Desktop Publishing (DTP) & Print Design",
    "Adobe Photoshop (Photo Editing & Banner Design)",
    "CorelDRAW (Vector Graphics & Visiting Cards)",
    "PageMaker (Document Layout & Typesetting)",
    "Programming Concepts in C & C++",
    "SQL Database Fundamentals",
    "Tally Prime with Comprehensive GST Accounting",
    "Internet, Email Security & AI Tools Integration",
  ],
  curriculum: [
    {
      title: "Module 1: Computer Fundamentals & OS",
      desc: "Computer hardware architecture, operating system management, system commands, and peripherals.",
      topics: ["Hardware Architecture", "Windows OS Management", "System Commands", "Storage & Memory Setup"],
    },
    {
      title: "Module 2: Advanced Office Automation",
      desc: "Advanced MS Word document styling, Excel formulas and data analysis, and PowerPoint presentation design.",
      topics: ["Complex Word Formats", "Excel Formulas, VLOOKUP & Data Filtering", "PowerPoint Master Slide Design", "Spreadsheet Printing & Protection"],
    },
    {
      title: "Module 3: Desktop Publishing (DTP)",
      desc: "Creative design using Photoshop, CorelDRAW, and PageMaker for marketing banners, logos, and publication layouts.",
      topics: ["Photoshop Tools & Layers", "Photo Retouching & Posters", "CorelDRAW Vector Logos & Banners", "PageMaker Booklets & Forms"],
    },
    {
      title: "Module 4: Programming Basics (C/C++)",
      desc: "Programming logic, syntax, variables, conditional control flow, loops, and basic C++ object orientation.",
      topics: ["Logic Development", "C Syntax & Operators", "Control Flow (If-Else, Loops)", "C++ Basic Object Orientation"],
    },
    {
      title: "Module 5: Database and Web",
      desc: "Relational database schema, SQL queries, HTML5 semantic structure, and CSS3 layouts.",
      topics: ["Database Tables & Schema", "SQL Select & Insert Statements", "HTML Tags & Page Structure", "CSS Styling & Layouts"],
    },
    {
      title: "Module 6: Accounting with Tally Prime",
      desc: "Tally Prime setup, voucher posting, GST compliance, and financial statement generation.",
      topics: ["Company Setup & Masters", "Voucher Entry", "GST Tax Calculation", "Financial Reports & Balance Sheet"],
    },
    {
      title: "Module 7: Internet, AI Tools & Typing",
      desc: "Internet security hygiene, professional mailing, workplace AI productivity tools, and bilingual typing drills.",
      topics: ["Internet Browsing Safety", "Professional Mailing", "AI Tools for Workplace Speed", "Hindi/English Typing Drills"],
    },
  ],
  projects: [
    {
      title: "Creative Banner & DTP Portfolio",
      desc: "Design marketing banners, visiting cards, and promotional posters in Photoshop and CorelDRAW.",
    },
    {
      title: "Business Tally Audit Book",
      desc: "Record a complete fiscal quarter's accounting transactions with GST compliance in Tally Prime.",
    },
    {
      title: "Personal Static Portfolio Website",
      desc: "Construct a clean multi-page personal website showcasing creative work with HTML and CSS.",
    },
  ],
  careers: [
    "DTP Operator & Graphic Designer",
    "Computer Center Faculty / Trainer",
    "Accounts & Billing Executive (Tally)",
    "Administrative Coordinator",
    "Web Layout Designer",
    "Digital Studio Assistant",
  ],
};

export default function AdcaCoursePage() {
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Advanced Diploma in Computer Applications (ADCA)",
    "description": "12-month advanced diploma covering MS Office, DTP (Photoshop, CorelDRAW), C/C++ programming fundamentals, relational database management, and Tally accounting.",
    "url": "https://www.visionitinstitute.com/courses/adca",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Vision IT Computer Institute",
      "url": "https://www.visionitinstitute.com",
    },
    "timeRequired": "P12M",
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Offline",
      "courseWorkload": "P12M",
      "inLanguage": "hi",
    },
    "offers": {
      "@type": "Offer",
      "price": "14999",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "category": "Paid",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <CourseDetailsView course={adcaData} />
    </>
  );
}
