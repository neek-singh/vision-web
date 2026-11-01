import type { Metadata } from "next";
import CourseDetailsView, { CourseData } from "@/components/CourseDetailsView";

export const metadata: Metadata = {
  title: "BCC Course in Pratappur | Basic Computer Course",
  description: "Basic Computer Course (BCC) in Pratappur: 3 months, offline, 70% practical. Typing, Windows, MS Office, internet. Fee Rs 2,999. Vision IT.",
};

const bccData: CourseData = {
  courseId: "197f7c89-e410-4768-8b49-567b4b4e3e9e",
  title: "Basic Computer Course (BCC)",
  badge: "Beginner Certificate",
  duration: "3 Months",
  level: "Beginner",
  mode: "Offline Lab",
  language: "Hindi & English",
  eligibility: "Minimum 8th Pass",
  about: "BCC is a 3-month foundational course designed for first-time computer learners. It provides comprehensive, step-by-step training covering mouse and keyboard operation, typing, MS Word, Excel, PowerPoint, internet browsing, and digital safety.",
  fee: {
    total: "₹2,999",
    admission: "₹500",
    tuition: "₹2,000",
    exam: "₹499",
  },
  skills: [
    "Computer Hardware & Software Basics",
    "Windows File & Folder Management",
    "Hindi & English Typing Skills",
    "MS Word (Formatting, Tables)",
    "MS Excel (Basic Formulas, Data Sheets)",
    "MS PowerPoint (Slide Presentations)",
    "Internet, Browser & Google Search",
    "Gmail & Google Drive Management",
    "Digital Safety & Safe Passwords",
    "Basic AI Tools (ChatGPT Introduction)",
  ],
  curriculum: [
    {
      title: "Module 1: Computer Fundamentals",
      desc: "Introduction to computers, hardware vs. software, input/output peripherals, memory, and storage devices.",
      topics: ["Computer Basics", "Hardware vs Software", "Input/Output Devices", "RAM, ROM & Storage Devices"],
    },
    {
      title: "Module 2: Windows OS",
      desc: "Desktop environment, file and folder organization, control panel settings, and keyboard shortcuts.",
      topics: ["Desktop & Taskbar", "Files & Folders Management", "Windows Settings", "Keyboard Shortcuts"],
    },
    {
      title: "Module 3: Hindi & English Typing",
      desc: "Hindi and English typing practice, proper finger positioning, accuracy, and speed building.",
      topics: ["Finger Positioning", "English Typing Practice", "Hindi Typing Basics", "Typing Speed Drills"],
    },
    {
      title: "Module 4: Office Automation",
      desc: "MS Word formatting and tables, MS Excel basic formulas and sheets, and MS PowerPoint slide decks.",
      topics: ["MS Word Formatting", "MS Excel Tables & Calculations", "MS PowerPoint Presentation", "Printing Setup"],
    },
    {
      title: "Module 5: Internet & Digital Safety",
      desc: "Web browsing, search techniques, professional Gmail communication, Google Drive backup, and cyber safety.",
      topics: ["Web Browsing", "Search Techniques", "Professional Emailing (Gmail)", "Google Drive Backup", "Cyber Hygiene"],
    },
    {
      title: "Module 6: AI Tools",
      desc: "Practical introduction to conversational AI productivity tools like ChatGPT.",
      topics: ["Introduction to AI", "Using ChatGPT for Queries", "Voice Search Tools", "Digital Helpers"],
    },
  ],
  projects: [
    {
      title: "Digital Resume (Word)",
      desc: "Create and format a professional resume in MS Word with clean layout and tables.",
    },
    {
      title: "Student Expense Sheet (Excel)",
      desc: "Build a structured monthly calculation sheet in MS Excel using basic formulas.",
    },
    {
      title: "Presentation Deck (PowerPoint)",
      desc: "Prepare a multi-slide presentation deck on computer fundamentals with transitions.",
    },
  ],
  careers: [
    "Data Entry Operator",
    "Office Assistant",
    "Computer Lab Assistant",
    "Front Desk Executive",
    "Freelance Typist",
    "Customer Support Executive",
  ],
};

export default function BccCoursePage() {
  return <CourseDetailsView course={bccData} />;
}
