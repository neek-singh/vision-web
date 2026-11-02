import type { Metadata } from "next";
import CourseDetailsView, { CourseData } from "@/components/CourseDetailsView";

export const metadata: Metadata = {
  title: "MDCA Course in Pratappur | Master Diploma in Computer Applications",
  description: "MDCA course at Vision IT Pratappur: 18 months comprehensive master diploma, offline lab, 70% practical. MS Office, DTP, Tally Prime with GST, C/C++, Web Design, SQL. Fee ₹15,999.",
  alternates: {
    canonical: "/courses/mdca",
  },
  openGraph: {
    title: "MDCA Course in Pratappur | Master Diploma in Computer Applications",
    description: "MDCA course at Vision IT Pratappur: 18 months comprehensive master diploma, offline lab, 70% practical. MS Office, DTP, Tally Prime with GST, C/C++, Web Design, SQL. Fee ₹15,999.",
    url: "/courses/mdca",
  },
};

const mdcaData: CourseData = {
  courseId: "mdca",
  title: "Master Diploma in Computer Applications (MDCA)",
  badge: "Master Diploma • 18 Months",
  duration: "18 Months",
  level: "Master Diploma",
  mode: "Offline Lab",
  language: "Hindi",
  eligibility: "Minimum 12th Pass",
  about: "MDCA is an extensive 18-month master diploma program designed to provide complete mastery across office automation, desktop publishing (DTP), business accounting with Tally Prime and GST, programming fundamentals in C/C++, database systems with SQL, modern web design, and workplace AI productivity.",
  fee: {
    total: "₹15,999",
    admission: "₹2,000",
    tuition: "₹12,999",
    exam: "₹1,000",
  },
  skills: [
    "Computer Hardware Architecture & Advanced Windows OS",
    "Complete MS Office Suite (Word, Advanced Excel, PowerPoint, Access)",
    "Desktop Publishing (Photoshop, CorelDRAW, PageMaker)",
    "Financial Accounting & GST Invoicing with Tally Prime",
    "Programming Concepts & Object-Oriented Logic in C & C++",
    "Relational Database Management (RDBMS) & SQL Queries",
    "Web Designing Fundamentals (HTML5, CSS3, JavaScript Basics)",
    "Cyber Security, Safe Banking & Email Hygiene",
    "Modern AI Tools for Office Productivity",
    "Bilingual Typing Mastery (Hindi KrutiDev/Mangal & English)",
  ],
  curriculum: [
    {
      title: "Module 1: Computer Fundamentals & Operating Systems",
      desc: "Hardware architecture, internal components, peripherals, Windows operating system settings, disk management, and command utilities.",
      topics: ["Hardware Architecture & Motherboard Components", "Windows OS Utilities & Settings", "File System, Storage & Device Management", "Command Prompt & Troubleshooting Basics"],
    },
    {
      title: "Module 2: Complete Office Automation & Data Analysis",
      desc: "Professional documentation in Word, advanced spreadsheets with Excel formulas and VLOOKUP, impactful PowerPoint presentations, and MS Access databases.",
      topics: ["Professional Word Documentation & Mail Merge", "Advanced Excel (Formulas, IF, VLOOKUP, Pivot Tables)", "Data Filtering, Sorting, Conditional Formatting & Charts", "PowerPoint Master Slides & MS Access Database Creation"],
    },
    {
      title: "Module 3: Desktop Publishing & Graphic Design (DTP)",
      desc: "Creative visual design using Adobe Photoshop, CorelDRAW, and PageMaker for printing, marketing media, and publication layouts.",
      topics: ["Photoshop Layers, Masking & Photo Retouching", "Poster, Banner & Social Media Creative Design", "CorelDRAW Vector Graphics, Logos & Visiting Cards", "PageMaker Newspaper Ads, Pamphlets & Booklets"],
    },
    {
      title: "Module 4: Financial Accounting with Tally Prime & GST",
      desc: "End-to-end business accounting, inventory management, purchase/sales vouchers, and GST tax invoice generation.",
      topics: ["Company Setup, Groups & Ledger Creation", "Day-to-day Accounting Voucher Entries", "Inventory, Stock Items & Units of Measure", "GST Tax Calculation, Invoicing & Balance Sheet Reports"],
    },
    {
      title: "Module 5: Programming & Logic Building (C & C++)",
      desc: "Foundational computer programming logic, algorithms, control structures, and object-oriented principles.",
      topics: ["Algorithms, Flowcharts & Programming Logic", "C Syntax, Data Types & Variables", "Control Statements (If-Else, Switch, For/While Loops)", "C++ Classes, Objects, Functions & Basic OOP"],
    },
    {
      title: "Module 6: Database Management & SQL",
      desc: "Relational database concepts, schema design, table management, and structured querying with SQL.",
      topics: ["RDBMS Concepts & Data Modeling", "SQL Table Creation & Primary/Foreign Keys", "Data Retrieval with SELECT, WHERE, ORDER BY & JOINs", "Data Modification (INSERT, UPDATE, DELETE)"],
    },
    {
      title: "Module 7: Web Designing Fundamentals",
      desc: "Creating responsive and aesthetic websites using modern HTML5 semantic markup and CSS3 styling.",
      topics: ["HTML5 Tags, Semantic Elements & Forms", "CSS3 Styling, Colors, Typography & Box Model", "Flexbox & Responsive Mobile Layouts", "JavaScript Basics for Web Interactivity"],
    },
    {
      title: "Module 8: Cyber Security, AI Tools & Bilingual Typing",
      desc: "Safe online practices, modern artificial intelligence productivity workflows, and professional bilingual keyboard typing speed.",
      topics: ["Cyber Hygiene, Phishing Protection & Safe Net Banking", "Modern AI Productivity Tools for Workplace Tasks", "Hindi Typing (KrutiDev / Remingon / Mangal)", "English Touch Typing Speed & Accuracy Drills"],
    },
  ],
  projects: [
    {
      title: "Complete Corporate DTP & Branding Kit",
      desc: "Design an entire corporate identity kit in Photoshop and CorelDRAW including logo, letterhead, business card, and marketing banners.",
    },
    {
      title: "Full Business Accounting in Tally Prime",
      desc: "Manage and audit a complete fiscal business ledger with multi-rate GST, inventory items, and final balance sheet generation.",
    },
    {
      title: "Multi-Page Responsive Portfolio Website",
      desc: "Build a responsive static website showcasing personal profile and projects using clean HTML5, CSS3, and JavaScript.",
    },
  ],
  careers: [
    "Master Computer Specialist / Lab Instructor",
    "Senior DTP Operator & Graphic Designer",
    "Accounts & GST Executive (Tally Prime)",
    "Office Automation Specialist & Admin Executive",
    "Frontend Web Designer",
    "Computer Center Faculty / Trainer",
  ],
};

export default function MdcaCoursePage() {
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Master Diploma in Computer Applications (MDCA)",
    "description": "18-month comprehensive master diploma covering MS Office, DTP (Photoshop, CorelDRAW), Tally Prime with GST, C/C++ programming, SQL databases, web design, and bilingual typing at Vision IT Pratappur.",
    "url": "https://www.visionitinstitute.com/courses/mdca",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Vision IT Computer Institute",
      "url": "https://www.visionitinstitute.com",
    },
    "timeRequired": "P18M",
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Offline",
      "courseWorkload": "P18M",
      "inLanguage": "hi",
    },
    "offers": {
      "@type": "Offer",
      "price": "15999",
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
      <CourseDetailsView course={mdcaData} />
    </>
  );
}

