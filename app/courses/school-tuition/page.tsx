import type { Metadata } from "next";
import CourseDetailsView, { CourseData } from "@/components/CourseDetailsView";

export const metadata: Metadata = {
  title: "School Computer Tuition in Pratappur (Class 6th–11th)",
  description: "Computer tuition classes for school students (Class 6th to 11th) in Pratappur. School curriculum, practical lab, typing, MS Office, digital safety. Fee Rs 599/month. Vision IT.",
  alternates: {
    canonical: "/courses/school-tuition",
  },
  openGraph: {
    title: "School Computer Tuition in Pratappur (Class 6th–11th)",
    description: "Computer tuition classes for school students (Class 6th to 11th) in Pratappur. School curriculum, practical lab, typing, MS Office, digital safety. Fee Rs 599/month.",
    url: "/courses/school-tuition",
  },
};

const schoolTuitionData: CourseData = {
  courseId: "school-tuition",
  title: "School Students Computer Tuition (Class 6th – 11th)",
  badge: "School Batch • Monthly Tuition",
  duration: "Monthly Batches",
  level: "Class 6th to 11th",
  mode: "Offline Lab & Classroom",
  language: "Hindi & English",
  eligibility: "Students studying in Class 6th to 11th",
  about: "Specially designed offline computer tuition for school students from Class 6th to 11th. We help students master their school computer curriculum alongside extensive practical lab practice — covering computer fundamentals, Hindi and English typing, MS Office (Word, Excel, PowerPoint), basic programming logic, internet awareness, and cyber safety.",
  fee: {
    total: "₹599 / Month",
    admission: "Nil",
    tuition: "₹599 / Month",
    exam: "Included",
  },
  skills: [
    "School Computer Curriculum Support & Concept Clarity",
    "Hardware, Software & Operating System Fundamentals",
    "Hindi & English Touch Typing Practice",
    "MS Word (School Notes, Reports & Assignments)",
    "MS Excel (Math Calculations, Tables & Graphs)",
    "MS PowerPoint (Class Presentations & Visual Projects)",
    "Safe Web Research & Educational Internet Tools",
    "Cyber Safety, Privacy & Digital Hygiene",
    "Introduction to Coding Logic & Flowcharts",
  ],
  curriculum: [
    {
      title: "Module 1: Computer Fundamentals & Operating System",
      desc: "Deep dive into school curriculum theory and practicals: hardware parts, input/output devices, Windows OS, and file organization.",
      topics: ["Computer Architecture", "Hardware & Peripherals", "Windows Desktop & File Management", "Safe Computer Operations"],
    },
    {
      title: "Module 2: Typing Speed & Accuracy",
      desc: "Structured typing lessons for both English and Hindi, building fast and accurate keyboard skills early.",
      topics: ["Keyboard Layout", "Correct Finger Placement", "English Typing Exercises", "Hindi Typing Practice"],
    },
    {
      title: "Module 3: MS Office for Schoolwork",
      desc: "Mastering essential tools needed for school assignments, projects, practical exams, and presentations.",
      topics: ["MS Word Document Creation", "MS Excel Data Tables & Charts", "MS PowerPoint Animated Decks", "Printing & Formatting"],
    },
    {
      title: "Module 4: Logical Thinking & Basic Coding Concepts",
      desc: "Introduction to algorithms, logic flowcharts, and fundamental programming concepts aligned with middle/high school syllabus.",
      topics: ["Algorithms & Problem Solving", "Drawing Flowcharts", "Basic Programming Concepts", "Logic Building Drills"],
    },
    {
      title: "Module 5: Internet Literacy & Cyber Safety",
      desc: "Safe searching for school research, evaluating online information, cyberbullying awareness, and safe password habits.",
      topics: ["Educational Web Search", "Safe Email Communication", "Social Media & Privacy Awareness", "Cyber Safety Best Practices"],
    },
  ],
  projects: [
    {
      title: "School Science/Social Presentation",
      desc: "Design an animated PowerPoint presentation on a school subject topic with images and transitions.",
    },
    {
      title: "Student Marks & Grade Sheet",
      desc: "Build a structured spreadsheet in MS Excel with automatic percentage and grade calculations.",
    },
    {
      title: "School Project Report Document",
      desc: "Format a complete multi-page school project report in MS Word with cover page, index, and headings.",
    },
  ],
  careers: [
    "School Computer Exam Excellence",
    "Strong Foundation for Future IT & Coding Careers",
    "Digital Literacy for Higher Studies",
    "Fast Typing & Documentation Proficiency",
  ],
};

export default function SchoolTuitionPage() {
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "School Students Computer Tuition (Class 6th – 11th)",
    "description": "Monthly offline computer tuition for school students covering school curriculum, practical lab, typing, MS Office, and basic programming logic.",
    "url": "https://www.visionitinstitute.com/courses/school-tuition",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Vision IT Computer Institute",
      "url": "https://www.visionitinstitute.com",
    },
    "timeRequired": "P1M",
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Offline",
      "courseWorkload": "P1M",
      "inLanguage": "hi",
    },
    "offers": {
      "@type": "Offer",
      "price": "599",
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
      <CourseDetailsView course={schoolTuitionData} />
    </>
  );
}

