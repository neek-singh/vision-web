import type { Metadata } from "next";
import CourseDetailsView, { CourseData } from "@/components/CourseDetailsView";

export const metadata: Metadata = {
  title: "DCA Course in Pratappur | Diploma in Computer Applications",
  description: "DCA course in Pratappur: 12 months, offline, 70% practical. MS Office, C language, database, HTML, Tally, GST. Fee Rs 13,999. Vision IT.",
};

const dcaData: CourseData = {
  courseId: "38fdc235-f7b5-4628-9d72-41c9ff2eabd8",
  title: "Diploma in Computer Applications (DCA)",
  badge: "12-Month Diploma",
  duration: "12 Months",
  level: "Diploma",
  mode: "Offline Lab",
  language: "Hindi",
  eligibility: "Minimum 12th Pass",
  about: "DCA is a 12-month foundational diploma covering computer fundamentals, office automation, programming logic in C, relational databases, web design, and Tally accounting.",
  fee: {
    total: "₹13,999",
    admission: "₹2,000",
    tuition: "₹10,999",
    exam: "₹1,000",
  },
  skills: [
    "Computer Architecture & Operating Systems",
    "Advanced MS Word & Report Formatting",
    "MS Excel (Formulas, Pivot Tables, Charts)",
    "MS PowerPoint Presentations",
    "Programming Logic & C Language Basics",
    "DBMS & SQL Database Queries",
    "HTML5 & CSS3 Web Page Building",
    "Tally Prime & GST Billing Fundamentals",
    "Computer Networking & Cyber Safety",
    "Typing Proficiency (Hindi & English)",
  ],
  curriculum: [
    {
      title: "Module 1: Computer Fundamentals & OS",
      desc: "Computer architecture basics, hardware and software components, and Windows OS management.",
      topics: ["System Architecture", "Hardware & Peripherals", "Windows File Management", "OS Control & Utilities"],
    },
    {
      title: "Module 2: Office Automation",
      desc: "MS Word documentation, MS Excel formulas, charts, and pivot tables, and MS PowerPoint master decks.",
      topics: ["MS Word Document Design", "Excel Formulas & Functions", "Excel Pivot & Data Analysis", "PowerPoint Master Slides"],
    },
    {
      title: "Module 3: Programming in C",
      desc: "Algorithm logic, flowcharts, variables, operators, conditional control loops, and functions in C.",
      topics: ["Algorithm & Flowcharts", "Variables & Data Types", "Control Structures & Loops", "Functions & Arrays"],
    },
    {
      title: "Module 4: Database Management (DBMS)",
      desc: "Relational database concepts, primary and foreign keys, and SQL queries (SELECT, INSERT, UPDATE, DELETE).",
      topics: ["Relational Database Basics", "Primary & Foreign Keys", "SQL Queries (CRUD)", "Table Relationships"],
    },
    {
      title: "Module 5: Web Development",
      desc: "HTML5 semantic structure, CSS3 styling, and responsive layout techniques for static web pages.",
      topics: ["HTML5 Tags & Structure", "CSS3 Styling & Colors", "Responsive Layout Basics", "Building Static Web Pages"],
    },
    {
      title: "Module 6: Accounting with Tally Prime",
      desc: "Tally Prime company setup, ledger groups, voucher posting, and GST billing fundamentals.",
      topics: ["Company Setup", "Ledger & Groups Creation", "Payment, Receipt & Sales Vouchers", "GST Invoice & Billing"],
    },
    {
      title: "Module 7: Network and Cyber Safety",
      desc: "Networking principles, internet and email safety, phishing awareness, and virus protection.",
      topics: ["LAN/WAN Concepts", "Internet Protocols & Routers", "Email Security & Phishing Awareness", "Antivirus & System Hygiene"],
    },
  ],
  projects: [
    {
      title: "Advanced Excel Dashboard",
      desc: "Create an interactive sales tracking sheet with conditional formatting, charts, and lookup formulas.",
    },
    {
      title: "Personal Static Portfolio Website",
      desc: "Build and publish a clean multi-section static website using pure HTML and CSS.",
    },
    {
      title: "Company Accounts with GST in Tally",
      desc: "Setup complete simulated business accounts, enter monthly transactions, and generate GST reports.",
    },
  ],
  careers: [
    "Office Administrator",
    "Computer Operator",
    "Accounts Executive (Tally)",
    "Junior Web Designer",
    "Data Analyst Assistant",
    "IT Support Executive",
  ],
};

export default function DcaCoursePage() {
  return <CourseDetailsView course={dcaData} />;
}
