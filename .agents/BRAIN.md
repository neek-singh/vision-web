# 🧠 Vision Web — Project Brain

> **Last Updated:** 2026-08-02
> **Purpose:** Har AI agent ke liye quick context. Ye file update hoti hai har kaam ke baad. Full codebase scan karne ki zaroorat nahi.

---

## 📌 Project Overview

- **Name:** vision-web
- **Type:** Next.js 16 Web Application
- **Domain:** Education / Online Courses Platform
- **Stack:** Next.js 16 (App Router) + TypeScript + Supabase + TailwindCSS v4
- **Deployment:** Vercel (assumed)
- **Dev Command:** `npm run dev` (port 3000)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.4 (App Router) |
| Language | TypeScript 5 |
| Styling | TailwindCSS v4 |
| Auth & DB | Supabase (`@supabase/ssr`, `@supabase/supabase-js`) |
| Images | Cloudinary (`next-cloudinary`) |
| Icons | Lucide React |
| Password | bcryptjs |
| Misc | boneyard-js, sharp |

---

## 📁 Folder Structure

```
vision-web/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage (21KB - large file)
│   ├── layout.tsx          # Root layout (5KB)
│   ├── globals.css         # Global styles
│   ├── about/
│   ├── actions/            # Server Actions
│   ├── admin/              # Admin panel (protected - role=admin)
│   ├── api/
│   │   ├── check-db/
│   │   └── health/
│   ├── auth/
│   ├── blog/
│   ├── checkout/
│   ├── contact/
│   ├── courses/            # Courses index & sub-pages
│   │   ├── certificate/    # Certificate courses list page
│   │   ├── diploma/        # Diploma courses list page
│   │   ├── dca/            # DCA Course details sub-pages
│   │   └── university/     # University degree listings & about page
│   ├── forgot-password/
│   ├── gallery/
│   ├── inquiry/            # Course inquiry page (formerly admissions)
│   ├── learn/
│   ├── login/
│   ├── payment/
│   ├── privacy/
│   ├── profile/
│   ├── refund/
│   ├── signup/
│   ├── terms/
│   └── verify/
│
├── components/             # Shared UI components
│   ├── Header.tsx          # Main site header (9KB)
│   ├── Footer.tsx          # Site footer (14KB)
│   ├── HomeSections.tsx    # Homepage sections (8KB)
│   ├── StructuredData.tsx  # SEO structured data
│   ├── UserNav.tsx         # User nav (server wrapper)
│   ├── UserNavClient.tsx   # User nav (client component)
│   ├── PopularCourses.tsx
│   ├── UpcomingBatches.tsx
│   ├── *ClientWrapper.tsx  # Client wrappers for SSR hydration
│   └── ui/                 # Base UI primitives
│
├── features/               # Feature-based modules
│   ├── admin/
│   ├── admissions/
│   ├── auth/
│   │   ├── actions/
│   │   ├── components/
│   │   └── lib/
│   ├── blog/
│   ├── contact/
│   ├── courses/
│   │   ├── actions/
│   │   ├── components/
│   │   └── data/
│   ├── gallery/
│   ├── reviews/
│   └── verification/
│
├── lib/                    # Utility libraries
│   ├── auth.ts             # Auth helpers
│   ├── supabase-browser.ts # Supabase browser client (client components)
│   ├── supabase-server.ts  # Supabase server client (server components/actions)
│   ├── supabase.ts         # General purpose supabase instance
│   └── utils.ts            # General utilities
│
├── services/index.ts       # Service layer
├── types/index.ts          # TypeScript types
├── utils/                  # Additional utilities
├── data/                   # Static data files
├── hooks/                  # Custom React hooks
├── bones/                  # boneyard-js related
├── supabase/schema/        # DB schema files
│
├── middleware.ts            # Route protection middleware
├── next.config.ts
├── .env.local              # Environment variables (gitignored)
└── .agents/
    └── BRAIN.md            # This file — project brain
```

---

## 🔐 Auth & Route Protection

**File:** `middleware.ts`

- Uses `@supabase/ssr` for session management
- **Middleware matches:** `/admin/:path*`, `/dashboard/:path*`, `/login`
- Logic flow:
  - Logged-in user on `/login` → redirect to `/dashboard` (or `?redirect` param)
  - Unauthenticated on `/admin` or `/dashboard` → redirect to `/login?redirect=<path>`
  - `/admin` additionally checks: `profiles.role === 'admin'`
  - Unauthorized admin → `/unauthorized`

---

## 🗄️ Supabase DB Tables (Known)

| Table | Columns Known | Notes |
|---|---|---|
| `profiles` | `id` (FK → auth.users), `role` | `role='admin'` for admin access |

> Add new tables here when discovered.

---

## 🌐 Environment Variables

See `.env.example` for full list. Key vars:

| Variable | Usage |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| Cloudinary vars | Image management via next-cloudinary |

---

## 📐 Architecture Patterns

### Server vs Client Components
- Server components by default (Next.js App Router)
- `*ClientWrapper.tsx` pattern = thin client wrapper around feature components for SSR compat
- `UserNav.tsx` (server) → `UserNavClient.tsx` (client)

### Feature Module Pattern
```
features/<feature>/
├── actions/    # Server Actions (use server)
├── components/ # Feature-specific React components
├── data/       # Data fetching functions (server-side)
└── lib/        # Feature-specific utilities
```

### Supabase Client Usage
- **Client components** → `lib/supabase-browser.ts`
- **Server components / Server Actions** → `lib/supabase-server.ts`
- **General / Edge** → `lib/supabase.ts`

### Styling
- TailwindCSS v4 — NO `tailwind.config.js`
- Config via `postcss.config.mjs`
- Global styles in `app/globals.css`

---

## ⚠️ Known Issues / Gotchas

| Issue | Detail |
|---|---|
| Large homepage | `app/page.tsx` is 21KB — be careful with edits |
| TailwindCSS v4 | Different config pattern — no `tailwind.config.js` |
| boneyard-js | `bones/` folder — custom lib, check before modifying |
| ClientWrappers | SSR hydration — always wrap client-heavy components |
| PowerShell script block | `npm` script execution disabled on Windows; use `npm.cmd` directly |

---

## 📋 Pending Tasks

### 🚀 Task: AI SEO — Full Website Entity SEO Optimization
**Priority:** High | **Status:** ✅ Completed

**Goal:** Pure website ko AI-era SEO ke liye optimize karna — jisme 4 pillars shamil hain:

> **AEO + GEO + LLMO + Semantic SEO = Entity SEO (AI-Powered SEO)**

---

#### 📌 Pillar 1 — AEO (Answer Engine Optimization)
AI answer engines (ChatGPT, Perplexity, Bing AI) ke liye optimize karo.
- [ ] Har page par FAQ schema (`FAQPage` JSON-LD) add karo
- [ ] `HowTo` schema add karo where applicable (DCA course steps, admission process)
- [ ] `QAPage` markup for Q&A rich snippets
- [ ] Short, factual, question-format headings use karo (e.g., "What is DCA?")
- [ ] Direct answer paragraphs likhein jo AI snippets ke liye ideal ho
- [ ] Featured snippet ke liye concise definitions har course page par

---

#### 📌 Pillar 2 — GEO (Generative Engine Optimization)
LLM-generated search results (Google AI Overviews, Bing Copilot) ke liye optimize karo.
- [ ] `Organization` JSON-LD schema add karo (name, address, phone, logo, sameAs)
- [ ] `LocalBusiness` schema add karo with complete NAP (Name, Address, Phone)
- [ ] `EducationalOrganization` schema add karo
- [ ] `Course` schema add karo har course ke liye (name, description, provider, duration, price)
- [ ] `BreadcrumbList` schema har page par
- [ ] Authoritative external references link karo (JDU university, NIELIT, etc.)
- [ ] Structured data validator se test karo (Google Rich Results Test)

---

#### 📌 Pillar 3 — LLMO (Large Language Model Optimization)
AI chatbots (ChatGPT, Gemini, Claude) ke context mein institute appear ho.
- [ ] `About` page par institute ki clear, factual entity description likhein
- [ ] Wikipedia-style entity statements add karo (founding, location, affiliation)
- [ ] Social proof data structure karo (reviews, testimonials, student count)
- [ ] `sameAs` property mein social media links add karo (Google Business, Facebook, YouTube)
- [ ] `mentions` and `knowsAbout` properties Organization schema mein add karo
- [ ] Consistent NAP (Name, Address, Phone) across ALL pages
- [ ] `robots.txt` aur `sitemap.xml` update karo with all new pages

---

#### 📌 Pillar 4 — Semantic SEO (Topical Authority + Entity Graph)
Google ke Knowledge Graph mein entity establish karo.
- [ ] Har page par `<meta name="description">` unique aur keyword-rich hona chahiye
- [ ] Canonical URLs set karo har page par
- [ ] OpenGraph + Twitter Card metadata har page par
- [ ] Semantic HTML structure review karo (single `<h1>`, proper heading hierarchy)
- [ ] Internal linking structure improve karo (course pages → inquiry → contact)
- [ ] Image `alt` tags semantic aur descriptive hone chahiye
- [ ] Page speed audit karo (Core Web Vitals — LCP, CLS, FID)
- [ ] `hreflang` consider karo agar Hindi version planned ho

---

#### 🗂️ Files to Create/Modify

| File | Action | Notes |
|---|---|---|
| `app/layout.tsx` | MODIFY | Global Organization + LocalBusiness JSON-LD schema add karo |
| `app/page.tsx` | MODIFY | Homepage meta, FAQ schema, hero semantic markup |
| `app/about/page.tsx` | MODIFY | EducationalOrganization schema, entity description |
| `app/courses/dca/page.tsx` | MODIFY | Course schema (DCA), FAQ schema |
| `app/courses/page.tsx` | MODIFY | Course listing page meta |
| `app/courses/university/page.tsx` | MODIFY | Course schema (university programs), JDU affiliation |
| `app/contact/page.tsx` | MODIFY | LocalBusiness schema, NAP |
| `app/sitemap.xml/route.ts` | CREATE | Dynamic sitemap with all course URLs |
| `app/robots.txt/route.ts` | MODIFY | Ensure all important pages are crawlable |

---

#### ✅ Expected Outcomes
- Institute appears in AI-generated answers for "computer institute in Pratappur"
- Rich snippets in Google (FAQ, Course, LocalBusiness)
- ChatGPT / Gemini mention kare Vision IT Computer Institute by name
- Improved organic rankings for local + course-specific keywords
- Google Knowledge Panel eligible

---


> **Rule:** Har kaam ke baad sirf relevant section update karo. Full rescan mat karo.
| Date | Change | Section Updated |
|---|---|---|
| 2026-08-17 | Added B.Sc. Honors, Integrated B.Sc. B.Ed., and D.Ed. options to both PCM and PCB career guide blogs in `blogs.json`. | Update Log |
| 2026-08-17 | Added general B.Sc. options and details to both 12th PCM and PCB career guide blogs in `blogs.json`. | Update Log |
| 2026-08-17 | Replaced the duplicate cover image with a microscope laboratory image for the 12th PCB career guide blog in `blogs.json`. | Update Log |
| 2026-08-17 | Added a new career guide blog post detailing career options after 12th PCB (and removed the 'निष्कर्ष' heading) in `blogs.json`. | Update Log |
| 2026-08-17 | Dynamically hid the main navbar (Header component) on all blog sub pages (details routes). | Update Log |
| 2026-08-17 | Added a new career guide blog post detailing career options after 12th PCM (and removed the 'निष्कर्ष' heading) in `blogs.json`. | Update Log |
| 2026-08-17 | Created layout.tsx files under university and university/about courses directories to implement comprehensive AI SEO (UGC JDU Affiliation schemas, FAQPage structured data, and metadata). | Update Log |
| 2026-08-17 | Replaced abstract gradient blog cover image with a high-quality AI-related image for the Artificial Intelligence blog post in `blogs.json`. | Update Log |
| 2026-08-17 | Sorted blog listings so the latest blogs appear first, and updated blog card and detail layouts to display the publication date correctly. | Update Log |
| 2026-08-15 | Added institute address and contact number details under English heading to the Vision IT Computer Institute blog in `blogs.json`. | Update Log |
| 2026-08-15 | Added a detailed, informative blog post about Vision IT Computer Institute, classes, labs, and placements with English headings and Hindi body text to `blogs.json`. | Update Log |
| 2026-08-15 | Added a "Related Articles" section at the bottom of the blog details page displaying cards for other published blogs. | Update Log |
| 2026-08-15 | Replaced the broken AI blog image URL with a highly reliable Unsplash abstract digital design image URL. | Update Log |
| 2026-08-15 | Added a detailed, informative blog post about Artificial Intelligence (AI), toolkits, and preparation tips with English headings and Hindi body text to `blogs.json`. | Update Log |
| 2026-08-15 | Kept JDU blog main title and sub-headings (H2s) in English while retaining the detailed explanation paragraphs in Hindi. | Update Log |
| 2026-08-15 | Added a premium "Back to Blog" arrow button at the top of the blog details page for easy navigation back to the blog index. | Update Log |
| 2026-08-15 | Linked PGDCA and DCA cards in the university program listings to their respective dedicated details pages (`/courses/pgdca` & `/courses/dca`) with proper inquiry parameters. | Update Log |
| 2026-08-15 | Created dedicated Diploma in Solar Power System (DSPS) details page (`/courses/dsps`) with custom layout and JSON-LD structured data, and updated details links on the university courses page and HeroSlider. | Update Log |
| 2026-08-15 | Created dedicated Diploma in Fire Service & Operations (DFSO) details page (`/courses/dfso`) with custom layout and JSON-LD structured data, and updated details links on the university courses page and HeroSlider. | Update Log |
| 2026-08-15 | Created dedicated BCA course details page (`/courses/bca`) with dark hero banner, 6-semester curriculum accordion, 9 career roles, 3 capstone projects, fees section, reviews, sticky sidebar with Apply Now routing to `/inquiry?type=university`, and JSON-LD + SEO metadata layout. | Update Log, Folder Structure |
| 2026-08-15 | Removed 'Government Recognized Institute' badge and changed homepage Institute Computer Programs section background to white with dark slate text and light gray cards. | Update Log |
| 2026-08-15 | Added a dedicated, dark-themed Institute Computer Programs section to the homepage featuring 4 vocational categories (Diplomas, Certificates, Industry Skills, Coding/AI) with grid cards and custom icons. | Update Log |
| 2026-08-15 | Updated the homepage University Programs inquiry CTA button to route to the university-specific form (`/inquiry?type=university`). | Update Log |
| 2026-08-15 | Removed 'Official Academic Partner' badge and changed homepage University Programs section background to white with dark slate text and light gray cards. | Update Log |
| 2026-08-15 | Added a dedicated Jagrani Devi University (JDU) Programs section to the homepage featuring 4 major academic departments with clean grid cards and direct CTAs. | Update Log |
| 2026-08-15 | Changed the default navbar links, logo text, dropdown choices, and mobile menu items from slate-600/700/800 to solid black (with blue hover effects) for all other states. | Update Log |
| 2026-08-15 | Dynamically set navbar text, logo, and icons to white on the About page when it is transparent (not scrolled) to ensure readability on the dark background image. | Update Log |
| 2026-08-15 | Updated the image URL for the 'Pioneers in IT Education' section on the About page to a highly reliable student collaboration photo. | Update Log |
| 2026-08-15 | Updated the image URL for the 'Our Purpose & Future' section on the About page to a highly reliable classroom photo. | Update Log |
| 2026-08-15 | Added 'About Us' button under the hero description on the courses index page. | Update Log |
| 2026-08-11 | Added DFSO, PGDRD, and DSPS slides to dynamic HeroSlider. | Update Log |
| 2026-08-11 | Removed selector tabs container from HeroSlider to keep layout clean and simple. | Update Log |
| 2026-08-11 | Moved home page main h1 headline inside HeroSlider to dynamically rotate title suffixes ('Computer Institute', 'DCA', 'PGDCA', 'BCA'). | Update Log |
| 2026-08-11 | Added default 'Overview' slide to HeroSlider with original copy and Explore Courses/Apply Now CTA buttons. | Update Log |
| 2026-08-11 | Replaced generic indicator dots in HeroSlider with interactive course name tabs (DCA, PGDCA, BCA) for clearer navigation. | Update Log |
| 2026-08-11 | Integrated HeroSlider client component to rotate between DCA, PGDCA, and BCA courses and dynamically swap Details & Apply CTA buttons. | Update Log |
| 2026-08-11 | Created OfferSlider client component and replaced static hero badge announcement with rotating offers for institute & university courses. | Update Log |
| 2026-08-11 | Added missing detailsHref link and aligned price (₹16,999) for PGDCA course card in popular courses section on home page. | Update Log |
| 2026-08-09 | Cleaned metadata keywords and aligned primary & secondary brand descriptions for AI SEO task optimization. | Update Log |
| 2026-08-09 | Updated course fees across all listings and details pages: DCA to ₹13,999, ADCA to ₹14,999, PGDCA to ₹16,999. | Update Log |
| 2026-08-09 | Created dedicated details pages for ADCA and PGDCA courses with custom curriculums, stats badges, structured fees, and eligibility cards. | Update Log, Folder Structure |
| 2026-08-09 | Aligned DCA details page skills list to match the new 7-module curriculum layout. | Update Log |
| 2026-08-09 | Updated DCA curriculum modules list to precisely render the 7 requested topics (Fundamentals, Office automation, Programing, Datamenagment, Web development, Accounting, Networking/Cybersecurity). | Update Log |
| 2026-08-09 | Added AI module & AI tools topics to the curriculum of BCC, DCA, and Basic Computer for Beginner course pages. | Update Log |
| 2026-08-09 | Created a dedicated details page for 'Basic Computer for Beginner' with custom modules, absolute beginner level specs, and eligibility rules. | Update Log, Folder Structure |
| 2026-08-09 | Updated DCA course eligibility criteria to require 'Minimum 12th pass'. | Update Log |
| 2026-08-09 | Added a dedicated 'Eligibility Criteria' section to both BCC and DCA course details pages below the main overview card. | Update Log |
| 2026-08-09 | Appended 'etc.' to all module curriculum bullet lists in both BCC and DCA details pages to indicate additional sub-topics. | Update Log |
| 2026-08-09 | Created a dedicated details page for BCC (Basic Computer Course) with custom 5-module curriculum, stats badges, and structured fees. | Update Log, Folder Structure |
| 2026-08-09 | Updated DCA curriculum module titles: simplified Module 2 to 'Module 2: MS Office' and Module 6 to 'Module 6: Tally & Final Projects'. | Update Log |
| 2026-08-09 | Simplified curriculum module bullet descriptions on the DCA details page to show only brief, clean topic names. | Update Log |
| 2026-08-09 | Changed all '100% Practical' training program references to '70% Practical' across the homepage, popular courses, and DCA details page. | Update Log |
| 2026-08-09 | Updated DCA course parameters: changed duration to '12 Months' and instruction language to 'Hindi'. | Update Log |
| 2026-08-09 | Updated the global Footer links to include a dedicated link for 'University Courses' under the Programs section. | Update Log |
| 2026-08-09 | Reverted Facilities cards headings to use the default sans-serif font to maintain aesthetic consistency. | Update Log |
| 2026-08-09 | Redesigned Facilities cards in the infrastructure section of the About page to match reference layout (top-left aligned icon boxes, white bg, serif font titles). | Update Log |
| 2026-08-09 | Changed 'World-Class Facilities' heading to 'Class Facilities' in the infrastructure section of the About page. | Update Log |
| 2026-08-09 | Categorized all institute courses (Certificate, Diploma, and 6 Short Term domains) directly in the courses page sidebar for unified filtering. | Update Log |
| 2026-08-08 | Added 'About University' button to the university courses page hero section, created a detailed JDU information page, and configured unique, course-specific professional images for all 41 university courses. | Update Log, Folder Structure |
| 2026-08-07 | Removed 'View Alumni Success' button from the Hero section of the About page. | Update Log |
| 2026-08-07 | Linked 'Explore Our Mission' button to the 'Mission & Vision' page section anchor on the About page. | Update Log |
| 2026-08-07 | Removed 'Since 1998' references from the About page text descriptions. | Update Log |
| 2026-08-07 | Removed 'EST. 1998' label and the '25+ Years of Academic Excellence' badge from the About page. | Update Log |
| 2026-08-07 | Removed '& IT Specialist' from Miss Geeta's role text in trainers profile section of About page. | Update Log |
| 2026-08-07 | Updated details of the 3 key trainers on the About page to represent local faculty: Miss Geeta (ADCA), Mr. Dev Kumar (PGDCA), and Miss Ruchi (MCA). | Update Log |
| 2026-08-07 | Kept only 3 mentor cards on the About page 'Meet Our Expert Mentors' section for a clean single-row desktop layout. | Update Log |
| 2026-08-07 | Made Batch Preference field optional (updated validation and input labels) in the regular admissions form. | Update Log |
| 2026-08-07 | Mentioned Jagrani Devi University (JDU) in the university page hero section badge and page description paragraphs. | Update Log |
| 2026-08-07 | Set study mode options for BA, MA, B.Com, and M.Com university courses to 'Regular / Private' to accommodate non-collegiate options. | Update Log |
| 2026-08-07 | Removed 'Distance' mode option from all university course listings, updating their mode details to show only 'Regular'. | Update Log |
| 2026-08-07 | Disabled branch selection for Bachelor of Arts (BA) inquiries so it is only prompted for Master of Arts (MA) inquiries. | Update Log |
| 2026-08-07 | Updated BA and MA specialization branches to include the exact requested subject list (Sociology, History, Hindi, Geography, Political Science, Home Science, Yoga, Education, Philosophy, Anthropology). | Update Log |
| 2026-08-07 | Configured the 'Course Branch' field on the university inquiry form to display dynamically only for general courses (BA, MA, B.Sc General, B.Com, M.Com, BBA, MBA) that require a sub-specialization. | Update Log |
| 2026-08-07 | Removed ISO 9001:2015 Certified and 25+ Years Academic Legacy tags from the Contact Us card in UniversityInquiryForm. | Update Log |
| 2026-08-07 | Integrated database storage for university course inquiries by adding a dedicated 'University Course Inquiry' entry in the courses table, mapping inquiries to this ID, and appending specialization fields inside the message column. | Update Log |
| 2026-08-07 | Implemented custom two-column UniversityInquiryForm matching the provided reference layout (with Course Branch, Interested Course dropdown, Why Choose Us, and local Contact Us info cards). | Update Log |
| 2026-08-07 | Added B.Sc Microbiology to the Science UG category, updating total count to 41. (M.Sc Microbiology is already present in Science PG). | Update Log |
| 2026-08-07 | Added Law Department (LLB, LLM, BA LLB, B.Com LLB), new Management courses (BHMCT, MTTM), and new Diplomas (DSPS, DFSO, PGDRD), updating total count to 40. | Update Log |
| 2026-08-07 | Removed Diploma in Yoga and Diploma in GST & Tally from the university courses listing, updating total count to 27. | Update Log |
| 2026-08-07 | Reorganized university courses page into 7 distinct departments (Arts Department, Science UG, Science PG, Engineering & Technology, Management & Professional, Diploma, and Pharmacy) with custom sidebar filters. | Update Log |
| 2026-08-07 | Optimized Contact page loading speed by lazy loading the heavy Google Maps iframe. | Update Log |
| 2026-08-07 | Removed FAQ sections from courses, certificate, and diploma listing pages; updated CourseCard main button label from 'Enroll' to 'Apply'. | Update Log |
| 2026-08-07 | Integrated reusable CourseCard component across homepage and courses pages, added dark-themed 'Why Learn With Us' sections, and added light-blue 'Ready to Start Your Journey' CTA banners. | Update Log |
| 2026-08-07 | Cleaned up unused imports in the main courses page and verified optimization benefits from global Next.js image optimization on local asset loading for DCA course details. | Update Log |
| 2026-08-08 | Added 40 skill-based and short term courses dataset and filter tab on the courses page; removed highlights section from the homepage and updated preview sections to use premium SVGs instead of native emojis. | Update Log |
| 2026-08-08 | Removed mentor/faculty stock images and replaced them with SVG gradient avatar icons, added card-level profile details (1 Year/2 Years/3 Years experience, BCA/MCA credentials), updated Ishwar Singh photo to a real Cloudinary image, and added preview sections for About, special policies (scholarship & exam/lab guidelines), and Gallery on the homepage. | Update Log |
| 2026-08-07 | Optimized homepage load speed by enabling Next.js image optimization, removing unused bones/registry import from layout, tuning Google Fonts weights, and dynamically importing below-the-fold components (GoogleReviews, FAQSection, SocialSection). | Update Log |
| 2026-08-06 | Implemented Share button functionality on the DCA page (using Web Share API and copy-to-clipboard fallback with tooltip feedback), changed 'Enroll now' text to 'Apply now', and resolved dead admissions links. | Update Log |
| 2026-08-06 | Replaced profile avatar/userNav in Header.tsx with a styled, responsive 'Apply Now' CTA button routing to the course inquiry page (/inquiry). | Update Log |
| 2026-08-06 | Removed authentication system: simplified middleware.ts to bypass redirects, removed userNav from layout.tsx, and updated AdmissionForm to redirect all users to the homepage on success. | Update Log |
| 2026-08-06 | Made the email field optional in the Admission Form validation and updated its UI label to '(Optional)'. | Update Log |
| 2026-08-06 | Updated Admission Form submit action to automatically focus and smooth-scroll the screen to the first failed/empty validation field. | Update Log |
| 2026-08-06 | Added robust client-side validation to all required fields (Date of Birth, Highest Qualification, School/College Name, and Batch Preference) in the Admission Form, added red required asterisks to form labels, and updated the phone number placeholder. | Update Log |
| 2026-08-06 | Started Next.js development server in the background using `npm.cmd run dev` on port 3000. | Update Log |
| 2026-08-06 | Redesigned Course Application Form (Inquiry page) to match template layout, structured fields into a 2-column grid, styled section headers, removed dark banner, and configured database action to parse extra fields (dob, qualification, school, batch). | Update Log |
| 2026-08-06 | Adjusted page font sizes, heading weights, simplified career grids & hands-on projects, course fees breakdown table, raw black icons for stats cards, and changed button text to 'Apply Now'. Also dynamically hid main navbar/footer on course detail routes. | Update Log |
| 2026-08-09 | Completed full AI SEO (Entity SEO) — upgraded StructuredData.tsx with @graph containing LocalBusiness+EducationalOrganization+Course catalog+FAQPage+WebSite schemas. Added layout.tsx with Course JSON-LD for DCA, ADCA, PGDCA, BCC, Basic-Beginner. Updated about/page.tsx and contact/page.tsx metadata with primary keyword, canonical, OG, Twitter. Updated sitemap.ts with all 7 course-level URLs + 2 category URLs. | Update Log |
| 2026-08-09 | Started Next.js development server on port 3000 using `npm.cmd run dev` due to PowerShell script execution restriction. | Known Issues / Update Log |
| 2026-08-06 | Redesigned the DCA course details page to match the user's provided template screenshot exactly (two-column layout, sticky sidebar, header bar, bottom CTA, etc.). | Update Log |
| 2026-08-06 | Refactored DCA course details layout hero section to a clean white background with slate text. | Update Log |
| 2026-08-06 | Removed Target Audience and Certification & Validity cards from the Overview section in DCA course details page. | Update Log |
| 2026-08-06 | Removed the main outer wrapper card from the course layout, and updated nested card components background and border styling to contrast correctly on bg-slate-50. | Update Log |
| 2026-08-06 | Removed DcaNav sidebar navigation and centered/maximized DCA course layout content container width. Also deleted the unused DcaNav component file. | Update Log |
| 2026-08-06 | Removed "Govt. Recognized Certificate" badge from the DCA course details page layout header. | Update Log |
| 2026-08-06 | Started Next.js development server on port 3000 using `npm.cmd run dev` due to PowerShell script execution restriction. | Known Issues / Update Log |
| 2026-08-03 | Fixed missing icon imports (`Shield` and `Code`) causing compilation errors on consolidated DCA page.tsx. | Update Log |
| 2026-08-03 | Consolidated all DCA course details onto a single scrollable page at `/courses/dca` with smooth scrolling and dynamic Scroll Spy sidebar navigation; cleaned up legacy directories. | Update Log |
| 2026-08-03 | Populated all DCA course sub-pages (Overview, Highlights, What You'll Learn, Syllabus, Career Opportunities, Projects, and Fees) with rich, styled content matching design requirements. | Update Log |
| 2026-08-03 | Converted DCA Student Reviews page (/courses/dca/reviews) to static reviews, styled to match Google Reviews cards without database queries. | Update Log |
| 2026-08-02 | Created dedicated DCA Course Details layout (/courses/dca) and sub-pages for Overview, Highlights, Skills, Syllabus, Career Opportunities, Projects, Fees, Reviews, and Apply. | Update Log |
| 2026-08-02 | Created separate sub-pages for Certificate (/courses/certificate) and Diploma (/courses/diploma) courses, with a unified tab navigation block. | Update Log |
| 2026-08-02 | Deleted unused course listing and details component files (`FaqList`, `HighlightsList`, `SkillsList`, `ToolsList`, `ProjectsList`, `CoursesList` and wrappers) to clean up code. | Update Log |
| 2026-08-02 | Completely deleted dynamic Course Details page (`/courses/[id]`) and removed all 'Details' buttons from course cards on Home and Courses pages. | Update Log |
| 2026-08-02 | Renamed admissions page to inquiry, deleted student dashboard, pipelines, and all apply pages to simplify user flows. | Update Log |
| 2026-08-02 | Switched Homepage & Courses page to static BCC, DCA, PGDCA, BCA; simplified contact cards, removed category chips, FAQ order swap, and fixed course detail TS compilation issues. | Update Log |
| 2026-08-02 | Initial brain file created | All sections |

---

## 📋 AI Agent Quick Rules

1. **Pehle ye file padho** — full codebase scan karne ki zaroorat nahi
2. **Kaam ke baad** — sirf relevant section update karo (Update Log mein entry daalo)
3. **Naya file?** → Folder Structure mein add karo
4. **Naya env var?** → Environment Variables table mein add karo
5. **Naya DB table?** → Supabase DB Tables mein add karo
6. **Naya route pattern?** → Auth section update karo
7. **Naya gotcha mila?** → Known Issues mein add karo
