"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import { Button } from "@/components/ui/Button";
import { submitAdmission } from "@/features/admissions/actions/admissions";

type Course = {
  id: string;
  title: string;
};

export default function AdmissionForm({
  courses,
  user,
  courseId,
}: {
  courses: Course[];
  user?: any;
  courseId: string;
}) {
  const router = useRouter();
  const preselectedCourseId = courseId;

  const displayedCourses =
    preselectedCourseId && courses.some((c) => c.id === preselectedCourseId)
      ? courses.filter((c) => c.id === preselectedCourseId)
      : courses;

  const [formData, setFormData] = useState({
    student_name: "",
    email: user?.email || "",
    phone: "",
    course_id: preselectedCourseId || "",
    dob: "",
    qualification: "",
    school_name: "",
    batch_preference: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // 🔄 Preselect course
  useEffect(() => {
    if (preselectedCourseId) {
      setFormData((prev) => ({
        ...prev,
        course_id: preselectedCourseId,
      }));
    }
  }, [preselectedCourseId]);

  // 🔄 Fetch profile details if user is logged in
  useEffect(() => {
    if (user?.id) {
      const fetchProfile = async () => {
        const { data } = await supabase
          .from("profiles")
          .select("full_name, phone, dob, qualification")
          .eq("id", user.id)
          .single();
        if (data) {
          setFormData((prev) => ({
            ...prev,
            student_name: data.full_name || prev.student_name || user.user_metadata?.full_name || "",
            phone: data.phone || prev.phone || "",
            dob: data.dob || prev.dob || "",
            qualification: data.qualification || prev.qualification || "",
          }));
        }
      };
      fetchProfile();
    }
  }, [user]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // ✅ Strong validation
  const validate = () => {
    if (!formData.student_name.trim()) return { error: "Full Name is required", field: "student_name" };

    if (formData.email && formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) return { error: "Valid email address required", field: "email" };
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) return { error: "Valid 10-digit Indian phone number required", field: "phone" };

    if (!formData.dob) return { error: "Date of Birth is required", field: "dob" };

    if (!formData.qualification) return { error: "Highest Qualification is required", field: "qualification" };

    if (!formData.school_name.trim()) return { error: "School/College Name is required", field: "school_name" };

    if (!formData.course_id) return { error: "Select a course", field: "course_id" };

    return null;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (isSubmitting) return;

    const validationResult = validate();
    if (validationResult) {
      setError(validationResult.error);
      const element = document.querySelector(`[name="${validationResult.field}"]`) as HTMLElement;
      if (element) {
        element.focus();
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitAdmission(formData);

      if (!res || res.error) {
        throw new Error(res?.error || "Submission failed");
      }

      setSuccess(true);
      
      // ⏳ Auto redirect to home after 5s
      setTimeout(() => {
        router.push("/");
      }, 5000);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const coreCourseIds = [
    "197f7c89-e410-4768-8b49-567b4b4e3e9e", // Basic Computer Course (BCC)
    "a100f278-ea6c-4189-b09b-7d4e7cd9d0e7", // Basic Computer For Beginner
    "38fdc235-f7b5-4628-9d72-41c9ff2eabd8", // Diploma In Computer Applications (DCA)
    "2fc69f17-e7a0-4bde-b995-8cbda1e2e55b", // Advanced Diploma in Computer Applications (ADCA)
    "f9004121-1274-4b57-8179-ccc8365864b9"  // Post Graduate Diploma in Computer Applications (PGDCA)
  ];

  const courseDisplayName = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("beginner")) return "Basic computer for Beginner";
    if (t.includes("basic computer course")) return "BCC";
    if (t.includes("diploma in computer applications") && !t.includes("advanced") && !t.includes("post")) return "DCA";
    if (t.includes("advanced diploma")) return "ADCA";
    if (t.includes("post graduate")) return "PGDCA";
    return title;
  };

  const mappedCourses = courses
    .filter((c) => c.id !== "e0d6cfa9-a400-47b2-97b4-bb579c3ee595" && !c.title.toLowerCase().includes("university"))
    .map((c) => ({
      id: c.id,
      title: courseDisplayName(c.title),
    }));

  const coreCoursesList = mappedCourses
    .filter((c) => coreCourseIds.includes(c.id))
    .sort((a, b) => coreCourseIds.indexOf(a.id) - coreCourseIds.indexOf(b.id));

  const otherCoursesList = mappedCourses
    .filter((c) => !coreCourseIds.includes(c.id))
    .sort((a, b) => a.title.localeCompare(b.title));

  const filteredCourses = [...coreCoursesList, ...otherCoursesList];

  const selectedCourse = filteredCourses.find((c) => c.id === formData.course_id);
  const subtitle = selectedCourse ? selectedCourse.title : "Course Application";

  // 🎉 Success UI
  if (success) {
    return (
      <div className="text-center p-8 md:p-12 bg-white rounded-2xl shadow-sm border border-gray-100 space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-full mb-2">
          <span className="text-4xl">✅</span>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">
            Application Submitted Successfully
          </h3>
          <p className="text-gray-500 font-medium">
            Redirecting to home page in 5 seconds...
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href={`https://wa.me/918103170595?text=${encodeURIComponent(
              `*New Admission Application* 🎓\n` +
              `--------------------------\n` +
              `*Name:* ${formData.student_name}\n` +
              `*Course:* ${selectedCourse?.title || "Selected Course"}\n` +
              `*Email:* ${formData.email}\n` +
              `*Phone:* ${formData.phone}\n\n` +
              `Hello, I just submitted an application on the website. Please let me know the details.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-6 py-3 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Chat on WhatsApp
          </a>
          <button
            onClick={() => router.push("/")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 sm:p-10 space-y-6"
    >
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight leading-none mb-1.5">
          Application Form
        </h1>
        <p className="text-xs sm:text-sm text-slate-655 font-semibold leading-none text-slate-500">
          {subtitle}
        </p>
      </div>

      <hr className="border-slate-100" />

      {error && (
        <div className="flex items-center gap-3 bg-red-50 text-red-700 px-4 py-3 rounded-xl border border-red-100 text-sm font-medium animate-in slide-in-from-top-2 duration-300">
          <svg className="w-5 h-5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      {/* Section: PERSONAL INFORMATION */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-900">Full Name <span className="text-red-500">*</span></label>
            <input
              name="student_name"
              value={formData.student_name}
              placeholder="John Doe"
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm text-gray-900 bg-white border border-gray-250 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-900">Email Address <span className="text-slate-400 font-normal">(Optional)</span></label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              readOnly={!!user?.email}
              placeholder="john@example.com"
              className={`w-full px-3.5 py-2 text-sm text-gray-900 border border-gray-250 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                user?.email ? "bg-gray-50 text-gray-500 cursor-not-allowed" : ""
              }`}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-900">Phone Number <span className="text-red-500">*</span></label>
            <input
              name="phone"
              value={formData.phone}
              placeholder="e.g. 9876543210"
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm text-gray-900 bg-white border border-gray-250 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-900">Date of Birth <span className="text-red-500">*</span></label>
            <input
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm text-gray-900 bg-white border border-gray-250 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Section: EDUCATIONAL BACKGROUND */}
      <div className="space-y-4 pt-2">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          Educational Background
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-900">Highest Qualification <span className="text-red-500">*</span></label>
            <div className="relative">
              <select
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm text-gray-900 bg-white border border-gray-250 rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="">Select qualification</option>
                <option value="10th Pass">10th Pass</option>
                <option value="12th Pass">12th Pass</option>
                <option value="Graduate">Graduate</option>
                <option value="Post Graduate">Post Graduate</option>
                <option value="Other">Other</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-900">School/College Name <span className="text-red-500">*</span></label>
            <input
              name="school_name"
              value={formData.school_name}
              placeholder="Institution Name"
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm text-gray-900 bg-white border border-gray-250 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Section: COURSE PREFERENCES */}
      <div className="space-y-4 pt-2">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          Course Preferences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-900">Select Course <span className="text-red-500">*</span></label>
            <div className="relative">
              <select
                name="course_id"
                value={formData.course_id}
                onChange={(e) => setFormData({ ...formData, course_id: e.target.value })}
                className="w-full px-3.5 py-2 text-sm text-gray-900 bg-white border border-gray-255 rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="" disabled>Select course</option>
                {filteredCourses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-900">Batch Preference <span className="text-slate-400 font-normal">(Optional)</span></label>
            <div className="relative">
              <select
                name="batch_preference"
                value={formData.batch_preference}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm text-gray-900 bg-white border border-gray-250 rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="">Select batch</option>
                <option value="Morning Batch (7:00 AM - 9:00 AM)">Morning Batch (7:00 AM - 9:00 AM)</option>
                <option value="Morning Batch (9:00 AM - 11:00 AM)">Morning Batch (9:00 AM - 11:00 AM)</option>
                <option value="Noon Batch (12:00 PM - 2:00 PM)">Noon Batch (12:00 PM - 2:00 PM)</option>
                <option value="Afternoon Batch (2:00 PM - 4:00 PM)">Afternoon Batch (2:00 PM - 4:00 PM)</option>
                <option value="Evening Batch (4:00 PM - 6:00 PM)">Evening Batch (4:00 PM - 6:00 PM)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-1 pt-2">
        <label className="text-xs font-semibold text-slate-900">Why do you want to join this course? <span className="text-slate-400 font-normal">(Optional)</span></label>
        <textarea
          name="message"
          value={formData.message}
          placeholder="Briefly describe your motivation and goals..."
          onChange={handleChange}
          className="w-full px-3.5 py-2 text-sm text-gray-900 bg-white border border-gray-250 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-h-[100px] resize-y"
        />
      </div>

      <div className="flex justify-end pt-3 border-t border-slate-100">
        <Button
          disabled={isSubmitting}
          className="bg-black hover:bg-slate-900 text-white font-semibold text-xs px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-70 flex items-center gap-2 cursor-pointer"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span>
          ) : (
            "Submit Application"
          )}
        </Button>
      </div>
    </form>
  );
}
