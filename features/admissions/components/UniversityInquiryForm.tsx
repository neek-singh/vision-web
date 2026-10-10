"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { submitAdmission } from "@/features/admissions/actions/admissions";
import { Check, Mail, MapPin, Phone, Award, GraduationCap } from "lucide-react";

type Course = {
  id: string;
  title: string;
};

const UNIVERSITY_COURSES = [
  // Arts
  "Bachelor of Arts (BA)",
  "Master of Arts (MA)",
  "Bachelor of Library Science (B.Lib)",
  "Master of Library Science (M.Lib)",
  // Science UG
  "Bachelor of Science (B.Sc General)",
  "B.Sc Biotechnology",
  "B.Sc Forensic Science",
  "B.Sc Data Science",
  "B.Sc Bioinformatics",
  "B.Sc Cell Culture",
  "B.Sc Forestry",
  "B.Sc Dietetics",
  "B.Sc Nutrition",
  "B.Sc Microbiology",
  // Science PG
  "M.Sc Physics",
  "M.Sc Chemistry",
  "M.Sc Mathematics",
  "M.Sc Zoology",
  "M.Sc Botany",
  "M.Sc Microbiology",
  // Engineering & Tech
  "Bachelor of Computer Applications (BCA)",
  "Master of Computer Applications (MCA)",
  "B.Tech Computer Science Engineering",
  "B.Tech Information Technology",
  // Management & Professional
  "Bachelor of Business Administration (BBA)",
  "Master of Business Administration (MBA)",
  "Bachelor of Commerce (B.Com)",
  "Master of Commerce (M.Com)",
  "Bachelor of Hotel Management & Catering Technology (BHMCT)",
  "Master of Tourism & Travel Management (MTTM)",
  // Law
  "Bachelor of Laws (LLB)",
  "Master of Laws (LLM)",
  "BA LLB (Integrated)",
  "B.Com LLB (Integrated)",
  // Diploma
  "Post Graduate Diploma in Computer Applications (PGDCA)",
  "Diploma in Computer Applications (DCA)",
  "Diploma in Solar Power System (DSPS)",
  "Diploma in Fire Service & Operations (DFSO)",
  "PG Diploma in Rural Development (PGDRD)",
  // Pharmacy
  "Diploma in Pharmacy (D.Pharm)",
  "Bachelor of Pharmacy (B.Pharm)",
];

const COURSE_BRANCHES_MAP: Record<string, string[]> = {
  "Master of Arts (MA)": ["Sociology", "History", "Hindi", "Geography", "Political Science", "Home Science", "Yoga", "Education", "Philosophy", "Anthropology"],
  "Bachelor of Science (B.Sc General)": ["Mathematics Group (PCM)", "Biology Group (CBZ)"],
  "Bachelor of Business Administration (BBA)": ["General", "Finance", "Marketing", "HR Management"],
  "Master of Business Administration (MBA)": ["Finance", "Marketing", "HR Management", "Information Technology", "Operations Management"],
  "Bachelor of Commerce (B.Com)": ["General", "Computer Applications", "Taxation & Finance"],
  "Master of Commerce (M.Com)": ["General", "Computer Applications", "Taxation & Finance"],
};

export default function UniversityInquiryForm({
  courses,
  user,
  courseName = "",
}: {
  courses: Course[];
  user?: any;
  courseName?: string;
}) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    student_name: "",
    email: user?.email || "",
    phone: "",
    interested_course: courseName || "",
    course_branch: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const hasBranches = formData.interested_course in COURSE_BRANCHES_MAP;
  const availableBranches = hasBranches ? COURSE_BRANCHES_MAP[formData.interested_course] : [];

  // Set initial default course branch depending on course name
  useEffect(() => {
    if (courseName) {
      const branches = COURSE_BRANCHES_MAP[courseName];
      setFormData((prev) => ({
        ...prev,
        interested_course: courseName,
        course_branch: branches ? branches[0] : "",
      }));
    }
  }, [courseName]);

  // Reset course branch when selected course changes
  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const course = e.target.value;
    const branches = COURSE_BRANCHES_MAP[course];
    setFormData((prev) => ({
      ...prev,
      interested_course: course,
      course_branch: branches ? branches[0] : "",
    }));
    
    setErrors((prev) => {
      const next = { ...prev };
      delete next.interested_course;
      delete next.course_branch;
      return next;
    });
    setError("");
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    setError("");
  };

  const validate = () => {
    const tempErrors: Record<string, string> = {};

    if (!formData.student_name.trim()) {
      tempErrors.student_name = "Full Name is required";
    }

    if (formData.email && formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        tempErrors.email = "Valid email address required";
      }
    }

    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone Number is required";
    } else {
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        tempErrors.phone = "Valid 10-digit Indian phone number required";
      }
    }

    if (!formData.interested_course) {
      tempErrors.interested_course = "Select a course";
    }
    
    if (hasBranches && !formData.course_branch) {
      tempErrors.course_branch = "Select a branch";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isSubmitting) return;

    const isValid = validate();
    if (!isValid) {
      setError("Please fix the validation errors below.");
      
      // Auto focus first invalid element
      setTimeout(() => {
        const invalidElement = document.querySelector(".border-red-500") as HTMLElement;
        if (invalidElement) {
          invalidElement.focus();
          invalidElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 50);
      return;
    }

    setIsSubmitting(true);

    try {
      // Use specific row ID in courses table for University Course Inquiries
      const placeholderCourseId = "e0d6cfa9-a400-47b2-97b4-bb579c3ee595";

      // Combine actual university course and branch in message column
      const combinedMessage = `Interested University Course: ${formData.interested_course}${
        hasBranches ? `\nCourse Branch: ${formData.course_branch}` : ""
      }\n\nMotivation/Message:\n${formData.message || "N/A"}`;

      const insertData = {
        student_name: formData.student_name,
        email: formData.email,
        phone: formData.phone,
        course_id: placeholderCourseId,
        message: combinedMessage,
        dob: new Date().toISOString().split("T")[0], // Placeholder dob
        qualification: "Undergraduate", // Placeholder qualification
        school_name: "University Inquiry", // Marker
        batch_preference: "University Inquiry", // Marker
      };

      const res = await submitAdmission(insertData);

      if (!res || res.error) {
        throw new Error(res?.error || "Submission failed");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 5000);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="text-center p-8 md:p-12 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-6 max-w-lg mx-auto animate-in fade-in zoom-in duration-500">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-full mb-2">
          <span className="text-4xl">✅</span>
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-serif font-bold text-gray-900 tracking-tight">
            Inquiry Submitted
          </h3>
          <p className="text-slate-500 text-sm font-medium">
            Thank you for your interest! We have received your university program inquiry and our coordinator will contact you shortly.
          </p>
          <p className="text-slate-400 text-xs">
            Redirecting to home page in 5 seconds...
          </p>
        </div>
        <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href={`https://wa.me/918103170595?text=${encodeURIComponent(
              `*New University Inquiry* 🎓\n` +
              `--------------------------\n` +
              `*Name:* ${formData.student_name}\n` +
              `*Course:* ${formData.interested_course}${
                hasBranches ? `\n*Branch:* ${formData.course_branch}` : ""
              }\n` +
              `*Phone:* ${formData.phone}\n\n` +
              `Hello, I just submitted an inquiry for a university program. Please provide more details.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-6 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
          >
            Chat on WhatsApp
          </a>
          <button
            onClick={() => router.push("/")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black hover:bg-slate-900 text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-200"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl w-full mx-auto items-start font-sans">
      
      {/* Left: Form Card */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-6">
          Course Inquiry
        </h2>

        {error && (
          <div className="mb-5 bg-red-50 text-red-700 px-4 py-3 rounded-xl border border-red-100 text-sm font-medium animate-in slide-in-from-top-2 duration-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-800">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="student_name"
                value={formData.student_name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-1 transition-all ${
                  errors.student_name 
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
                    : "border-slate-200 focus:ring-violet-500 focus:border-violet-500"
                }`}
              />
              {errors.student_name && (
                <p className="text-red-500 text-xs font-semibold mt-0.5">{errors.student_name}</p>
              )}
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-800">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className={`w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-1 transition-all ${
                  errors.email 
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
                    : "border-slate-200 focus:ring-violet-500 focus:border-violet-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs font-semibold mt-0.5">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-800">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className={`w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-1 transition-all ${
                  errors.phone 
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
                    : "border-slate-200 focus:ring-violet-500 focus:border-violet-500"
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs font-semibold mt-0.5">{errors.phone}</p>
              )}
            </div>

            {/* Interested Course */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-800">
                Interested Course <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="interested_course"
                  value={formData.interested_course}
                  onChange={handleCourseChange}
                  className={`w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border rounded-lg appearance-none focus:outline-none focus:ring-1 transition-all ${
                    errors.interested_course 
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
                      : "border-slate-200 focus:ring-violet-500 focus:border-violet-500"
                  }`}
                >
                  <option value="">Select a course</option>
                  {UNIVERSITY_COURSES.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.interested_course && (
                <p className="text-red-500 text-xs font-semibold mt-0.5">{errors.interested_course}</p>
              )}
            </div>
          </div>

          {/* Course Branch - Displayed conditionally */}
          {hasBranches && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-800">
                  Course Branch <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="course_branch"
                    value={formData.course_branch}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border rounded-lg appearance-none focus:outline-none focus:ring-1 transition-all ${
                      errors.course_branch 
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
                        : "border-slate-200 focus:ring-violet-500 focus:border-violet-500"
                    }`}
                  >
                    <option value="">Select a branch</option>
                    {availableBranches.map((branch) => (
                      <option key={branch} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.course_branch && (
                  <p className="text-red-500 text-xs font-semibold mt-0.5">{errors.course_branch}</p>
                )}
              </div>
            </div>
          )}

          {/* Message */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-800">Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your academic goals..."
              rows={4}
              className="w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-slate-200 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 transition-all resize-y min-h-[120px]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-black hover:bg-slate-900 text-white font-bold text-sm rounded-lg shadow-sm hover:shadow transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Submitting..." : "Submit Inquiry"}
            </button>
          </div>
        </form>
      </div>

      {/* Right: Info Cards */}
      <div className="space-y-6">
        
        {/* Why Choose Us */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-teal-600" />
            <h3 className="text-base font-bold text-slate-900">Why Choose Us</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-2.5 text-sm text-slate-650 font-medium">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Industry-Recognized Certification</span>
            </li>
            <li className="flex items-start gap-2.5 text-sm text-slate-650 font-medium">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>100% Placement Support</span>
            </li>
            <li className="flex items-start gap-2.5 text-sm text-slate-650 font-medium">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Expert Faculty from Industry</span>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
          <h3 className="text-base font-bold text-slate-900 mb-4">Contact Us</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Kadampara Chowk, Pratappur, Surajpur, Chhattisgarh - 497223
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <a href="mailto:info@visionitinstitute.com" className="text-sm text-slate-600 hover:text-violet-600 transition-colors font-medium">
                info@visionitinstitute.com
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <a href="tel:+918103170595" className="text-sm text-slate-600 hover:text-violet-600 transition-colors font-medium">
                +91 81031 70595
              </a>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
