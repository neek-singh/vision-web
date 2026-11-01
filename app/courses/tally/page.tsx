import type { Metadata } from "next";
import CourseDetailsView, { CourseData } from "@/components/CourseDetailsView";

export const metadata: Metadata = {
  title: "Tally Prime with GST Course in Pratappur",
  description: "Tally Prime with GST certificate course in Pratappur: 3 months, offline practical accounting, ledger, vouchers, inventory, GST billing. Fee Rs 4,499. Vision IT.",
  alternates: {
    canonical: "/courses/tally",
  },
  openGraph: {
    title: "Tally Prime with GST Course in Pratappur",
    description: "Tally Prime with GST certificate course in Pratappur: 3 months, offline practical accounting, ledger, vouchers, inventory, GST billing. Fee Rs 4,499.",
    url: "/courses/tally",
  },
};

const tallyData: CourseData = {
  courseId: "tally-prime-gst",
  title: "Tally Prime with GST",
  badge: "3 Months • Accounting Certificate",
  duration: "3 Months",
  level: "Beginner to Intermediate",
  mode: "Offline Lab",
  language: "Hindi & English",
  eligibility: "Minimum 10th / 12th Pass",
  about: "Tally Prime with GST is an intensive 3-month offline accounting course designed for students and job seekers who want practical expertise in computerized accounting. You will learn company creation, ledger posting, inventory management, voucher entries, GST calculation, billing, and balance sheet preparation.",
  fee: {
    total: "₹4,499",
    admission: "₹1,000",
    tuition: "₹3,000",
    exam: "₹499",
  },
  skills: [
    "Accounting Principles & Double Entry System",
    "Company Creation & Group Configuration in Tally Prime",
    "Ledger Accounts & Voucher Entries",
    "Inventory & Stock Group Management",
    "Purchase & Sales Invoicing with GST",
    "CGST, SGST & IGST Tax Computation",
    "Bank Reconciliation Statement (BRS)",
    "Financial Statements (Profit & Loss, Balance Sheet)",
    "GST Returns & Billing Reports Overview",
    "Backup & Restore of Company Data",
  ],
  curriculum: [
    {
      title: "Module 1: Accounting Fundamentals",
      desc: "Basic concepts of accounting, debit/credit rules, double-entry bookkeeping system, and chart of accounts.",
      topics: ["Golden Rules of Accounting", "Double Entry Bookkeeping", "Chart of Accounts", "Journal Entries Practice"],
    },
    {
      title: "Module 2: Tally Prime Fundamentals",
      desc: "Getting started with Tally Prime interface, company creation, security control, and alteration.",
      topics: ["Tally Prime Navigation", "Creating a Company", "Configuring Features & Preferences", "Security & Password Control"],
    },
    {
      title: "Module 3: Masters & Ledgers",
      desc: "Creating primary and sub-groups, customer/vendor ledgers, expense and income accounts.",
      topics: ["Group Creation", "Customer & Vendor Ledgers", "Capital & Bank Accounts", "Opening Balance Setup"],
    },
    {
      title: "Module 4: Vouchers & Daily Transactions",
      desc: "Recording day-to-day transactions using Payment, Receipt, Contra, Journal, Sales, and Purchase vouchers.",
      topics: ["Payment & Receipt Vouchers", "Contra Vouchers (Cash-Bank)", "Purchase & Sales Recording", "Debit & Credit Notes"],
    },
    {
      title: "Module 5: Inventory & Stock Management",
      desc: "Units of measure, stock groups, stock categories, Godown management, and item-wise stock valuation.",
      topics: ["Units of Measure (UoM)", "Stock Items & Groups", "Godown / Warehouse Management", "Stock Summary & Reorder Levels"],
    },
    {
      title: "Module 6: GST Implementation & Reporting",
      desc: "Setting up GST in Tally Prime, HSN/SAC codes, tax rates, GST tax invoices, and financial reports.",
      topics: ["GST Setup & Activation", "HSN/SAC Code Mapping", "CGST/SGST/IGST Invoicing", "Profit & Loss Account", "Balance Sheet Analysis"],
    },
  ],
  projects: [
    {
      title: "Retail Shop Accounting Book",
      desc: "Complete accounting setup and month-long voucher entries for a retail business.",
    },
    {
      title: "GST Tax Invoice Generation",
      desc: "Generate professional tax-compliant sales and service invoices with HSN/SAC details.",
    },
    {
      title: "Year-End Financial Audit Sheet",
      desc: "Reconcile bank statements and extract Trial Balance, Profit & Loss, and Balance Sheet.",
    },
  ],
  careers: [
    "Accounts Assistant",
    "Tally Operator",
    "Billing Executive",
    "Inventory Clerk",
    "Audit Assistant",
    "Accounts Clerk in Small & Medium Enterprises",
  ],
};

export default function TallyCoursePage() {
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Tally Prime with GST",
    "description": "3-month intensive offline accounting course covering company creation, ledger posting, inventory management, voucher entries, GST billing, and balance sheet.",
    "url": "https://www.visionitinstitute.com/courses/tally",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Vision IT Computer Institute",
      "url": "https://www.visionitinstitute.com",
    },
    "timeRequired": "P3M",
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Offline",
      "courseWorkload": "P3M",
      "inLanguage": "hi",
    },
    "offers": {
      "@type": "Offer",
      "price": "4499",
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
      <CourseDetailsView course={tallyData} />
    </>
  );
}

