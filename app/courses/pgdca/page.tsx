import type { Metadata } from "next";
import CourseDetailsView, { CourseData } from "@/components/CourseDetailsView";

export const metadata: Metadata = {
  title: "PGDCA Course in Pratappur | Post Graduate Diploma in Computer Applications",
  description: "PGDCA course in Pratappur for graduates: 12 months, offline, 70% practical. C++, DBMS, HTML/CSS, Tally, networking. Fee Rs 16,999. Vision IT.",
  alternates: {
    canonical: "/courses/pgdca",
  },
  openGraph: {
    title: "PGDCA Course in Pratappur | Post Graduate Diploma in Computer Applications",
    description: "PGDCA course in Pratappur for graduates: 12 months, offline, 70% practical. C++, DBMS, HTML/CSS, Tally, networking. Fee Rs 16,999.",
    url: "/courses/pgdca",
  },
};

const pgdcaData: CourseData = {
  courseId: "f9004121-1274-4b57-8179-ccc8365864b9",
  title: "Post Graduate Diploma in Computer Applications (PGDCA)",
  badge: "Post Graduate Diploma",
  duration: "12 Months",
  level: "Post Graduate",
  mode: "Offline Lab",
  language: "Hindi",
  eligibility: "Graduation (Any Stream)",
  about: "PGDCA is a 12-month postgraduate diploma program designed for college graduates. It covers in-depth computer architecture, C++ Object-Oriented Programming, Relational Database management, web design, Tally accounting, and cybersecurity essentials.",
  fee: {
    total: "₹16,999",
    admission: "₹2,000",
    tuition: "₹13,999",
    exam: "₹1,000",
  },
  skills: [
    "Computer Architecture & Operating Systems (Windows/Linux)",
    "Object-Oriented Programming (OOP) in C++",
    "Database Architecture & SQL Queries",
    "Web Frontend Basics (HTML5 & CSS3)",
    "Advanced MS Office Suite Applications",
    "Computer Accounting & GST Filing in Tally Prime",
    "Computer Networking Fundamentals",
    "Cybersecurity Hygiene & Threat Prevention",
    "AI Productivity Tools for IT Workflows",
    "Professional Documentation & Technical Presentation",
  ],
  curriculum: [
    {
      title: "Module 1: Computer Fundamentals & OS",
      desc: "Computer organization, hardware architecture, and fundamentals of Windows and Linux operating systems.",
      topics: ["System Architecture", "OS Memory Management", "Windows Administration", "Linux Command Line Basics"],
    },
    {
      title: "Module 2: Programming & C++ (OOP)",
      desc: "Programming logic, C++ OOP: classes, objects, constructors, inheritance, and polymorphism.",
      topics: ["C++ Syntax & Logic", "Classes & Objects", "Constructors & Destructors", "Inheritance & Encapsulation"],
    },
    {
      title: "Module 3: Database Management Systems (DBMS)",
      desc: "Relational database design, schema normalization, and complex SQL queries (JOIN, GROUP BY, views).",
      topics: ["ER Diagrams & Schema", "Relational Keys & Normal Form", "SQL Queries (Join, Group By)", "Data Integrity & Views"],
    },
    {
      title: "Module 4: Web Technologies",
      desc: "Semantic HTML5, CSS layout systems (Box Model & Flexbox), and web design principles.",
      topics: ["Semantic HTML5 Elements", "CSS Box Model & Flexbox", "Web Design Best Practices", "Building Structured Pages"],
    },
    {
      title: "Module 5: Office Automation",
      desc: "Advanced MS Word document templates, Excel nested analytical formulas, and dynamic PowerPoint presentations.",
      topics: ["Advanced Word Templates", "Excel Nested Formulas & Data Models", "Dynamic Charting", "PowerPoint Presentation Strategy"],
    },
    {
      title: "Module 6: Accounting with Tally Prime",
      desc: "Tally Prime setup, inventory management, GST ledgers, and financial statement generation.",
      topics: ["Ledger Configuration", "Inventory & Stock Tracking", "GST Invoicing & Reports", "Trial Balance & Financials"],
    },
    {
      title: "Module 7: Networks, Security & AI",
      desc: "Networking principles, security hygiene, firewall basics, and modern AI productivity tools.",
      topics: ["Network Topologies & IP Addressing", "Firewall & Security Best Practices", "Modern AI Productivity Tools", "Safe Digital Workflows"],
    },
  ],
  projects: [
    {
      title: "C++ Console Management System",
      desc: "Build a console-based student or library records application utilizing C++ classes and file handling.",
    },
    {
      title: "Database Sales Schema",
      desc: "Design and normalize a multi-table database schema with SQL queries for sales reporting.",
    },
    {
      title: "Tax-compliant Account Book in Tally",
      desc: "Set up and manage a full accounting cycle with inventory and GST reporting in Tally Prime.",
    },
  ],
  careers: [
    "Junior Systems Assistant",
    "Database Operator",
    "Computer Center Senior Faculty",
    "Accounts & Billing Manager Assistant",
    "Office IT Coordinator",
    "Data Processing Specialist",
  ],
};

export default function PgdcaCoursePage() {
  return <CourseDetailsView course={pgdcaData} />;
}
