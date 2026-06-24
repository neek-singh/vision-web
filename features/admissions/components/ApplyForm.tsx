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

export default function ApplyForm({
  courses,
  user,
  courseId,
}: {
  courses: Course[];
  user: any;
  courseId: string;
}) {
  const router = useRouter();
  const preselectedCourseId = courseId;

  const displayedCourses =
    preselectedCourseId && courses.some((c) => c.id === preselectedCourseId)
      ? courses.filter((c) => c.id === preselectedCourseId)
      : courses;

  const [formData, setFormData] = useState({
    student_name: user?.user_metadata?.full_name || "",
    email: user?.email || "",
    phone: "",
    course_id: preselectedCourseId || "",
    father_name: "",
    mother_name: "",
    dob: "",
    gender: "",
    category: "",
    address: "",
    qualification: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // 🔄 Preselect course
  useEffect(() => {
    if (preselectedCourseId) {
      setFormData((prev) => ({ ...prev, course_id: preselectedCourseId }));
    }
  }, [preselectedCourseId]);

  // 🔄 Fetch profile details if logged in
  useEffect(() => {
    if (user?.id) {
      const fetchProfile = async () => {
        const { data } = await supabase
          .from("profiles")
          .select("full_name, phone, father_name, mother_name, dob, gender, category, address, qualification")
          .eq("id", user.id)
          .single();
        if (data) {
          setFormData((prev) => ({
            ...prev,
            student_name: data.full_name || prev.student_name,
            phone: data.phone || prev.phone,
            father_name: data.father_name || "",
            mother_name: data.mother_name || "",
            dob: data.dob || "",
            gender: data.gender || "",
            category: data.category || "",
            address: data.address || "",
            qualification: data.qualification || "",
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

  const validate = () => {
    if (!formData.student_name.trim()) return "Full name is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return "Valid email is required";
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) return "Valid 10-digit Indian phone number is required";
    if (!formData.course_id) return "Please select a course";
    if (!formData.father_name.trim()) return "Father's name is required";
    if (!formData.dob) return "Date of birth is required";
    if (!formData.gender) return "Please select gender";
    if (!formData.qualification.trim()) return "Qualification is required";
    return "";
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isSubmitting) return;

    const err = validate();
    if (err) return setError(err);

    setIsSubmitting(true);
    try {
      const res = await submitAdmission(formData);
      if (!res || res.error) throw new Error(res?.error || "Submission failed");
      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 5000);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🎉 Success screen
  if (success) {
    return (
      <div className="text-center p-8 md:p-12 space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-50 rounded-full mb-2 shadow-inner">
          <span className="text-5xl">🎓</span>
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
            Application Submitted!
          </h3>
          <p className="text-gray-500 text-sm font-medium max-w-md mx-auto">
            Your admission application has been received. Our team will review it and contact you within 24–48 hours.
          </p>
          <p className="text-xs text-gray-400 mt-2">Redirecting to dashboard in 5 seconds...</p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href={`https://wa.me/918103170595?text=${encodeURIComponent(
              `*Admission Application* 🎓\n` +
              `--------------------------\n` +
              `*Name:* ${formData.student_name}\n` +
              `*Course:* ${courses.find((c) => c.id === formData.course_id)?.title || "Selected Course"}\n` +
              `*Email:* ${formData.email}\n` +
              `*Phone:* ${formData.phone}\n\n` +
              `Hello, I just submitted my admission application on your website. Please guide me through the next steps.`
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
            onClick={() => router.push("/dashboard")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="flex items-center gap-3 bg-red-50 text-red-700 px-4 py-3 rounded-xl border border-red-100 text-sm font-medium animate-in slide-in-from-top-2 duration-300">
          <svg className="w-5 h-5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      {/* Section: Personal Info */}
      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
          <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-[10px] font-black">1</span>
          Personal Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="student_name"
            value={formData.student_name}
            placeholder="Full Name *"
            onChange={handleChange}
            className="col-span-2 sm:col-span-1 w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            readOnly={!!user?.email}
            placeholder="Email Address *"
            className={`col-span-2 sm:col-span-1 w-full px-4 py-3 text-gray-900 border border-gray-200 rounded-xl placeholder:text-gray-400 focus:outline-none transition-all text-sm ${user?.email ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"}`}
          />
          <input
            name="phone"
            value={formData.phone}
            placeholder="Phone Number *"
            onChange={handleChange}
            className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
          />
          <input
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            title="Date of Birth *"
            className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
          />
          <div className="relative">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
            >
              <option value="" disabled>Gender *</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
          <div className="relative">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
            >
              <option value="" disabled>Category</option>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="EWS">EWS</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Family Info */}
      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
          <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-[10px] font-black">2</span>
          Family Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="father_name"
            value={formData.father_name}
            placeholder="Father's Name *"
            onChange={handleChange}
            className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
          />
          <input
            name="mother_name"
            value={formData.mother_name}
            placeholder="Mother's Name"
            onChange={handleChange}
            className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
          />
        </div>
      </div>

      {/* Section: Academic & Address */}
      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
          <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-[10px] font-black">3</span>
          Academic & Course
        </h3>
        <div className="space-y-4">
          <input
            name="qualification"
            value={formData.qualification}
            placeholder="Highest Qualification (e.g. 12th, B.A.) *"
            onChange={handleChange}
            className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
          />
          <div className="relative">
            <select
              name="course_id"
              value={formData.course_id}
              onChange={(e) => setFormData({ ...formData, course_id: e.target.value })}
              className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
            >
              {displayedCourses.length > 1 && (
                <option value="" disabled>Select a Course *</option>
              )}
              {displayedCourses.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
          <textarea
            name="address"
            value={formData.address}
            placeholder="Full Address (Village/City, District, State, Pin)"
            onChange={handleChange}
            className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm min-h-[80px] resize-y"
          />
          <textarea
            name="message"
            value={formData.message}
            placeholder="Any additional message or question (optional)"
            onChange={handleChange}
            className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm min-h-[80px] resize-y"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="pt-2">
        <Button
          disabled={isSubmitting}
          className="w-full py-4 text-sm font-bold rounded-xl transition-all duration-200 hover:shadow-md disabled:opacity-70"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting Application...
            </span>
          ) : (
            "Submit Application 🚀"
          )}
        </Button>
        <p className="text-center text-xs text-gray-400 mt-3">
          By submitting, you agree to be contacted by our admissions team.
        </p>
      </div>
    </form>
  );
}
