"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  updateAdmissionPersonalDetails, 
  updateAdmissionDocuments, 
  verifyAdmissionDocuments,
  createStudentAccountAction
} from "@/features/admissions/actions/admissions";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  course_code: string;
  fee: number;
  discount_fee: number | null;
}

interface Student {
  student_id: string;
}

interface Admission {
  id: string;
  student_name: string;
  email: string;
  phone: string;
  status: string;
  father_name: string | null;
  mother_name: string | null;
  dob: string | null;
  gender: string | null;
  category: string | null;
  address: string | null;
  qualification: string | null;
  photo_url: string | null;
  signature_url: string | null;
  identity_proof_url: string | null;
  flow_step: string | null; // "personal" | "documents" | "review" | "payment"
  document_verified: boolean;
  completed_payment: boolean;
  courses: Course;
  students?: Student[];
}

interface AdmissionPipelineClientProps {
  admission: Admission;
}

export function AdmissionPipelineClient({ admission }: AdmissionPipelineClientProps) {
  const router = useRouter();
  
  // Determine current active step based on database state
  const getInitialStep = (adm: Admission) => {
    if (adm.completed_payment) return 7; // Start at credentials after payment completes
    if (adm.document_verified || adm.flow_step === "payment") return 6;
    if (adm.flow_step === "review") return 5;
    if (adm.flow_step === "documents") return 4;
    return 3; // Default starting interactive step
  };

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [maxAllowedStep, setMaxAllowedStep] = useState<number>(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedStudentId, setGeneratedStudentId] = useState<string | null>(null);
  
  // Step 3 (Personal Details) state
  // Parse address fields from database string (could be JSON or plain text)
  const parseAddress = (addr: string | null) => {
    try {
      if (addr && (addr.startsWith("{") || addr.startsWith("["))) {
        const parsed = JSON.parse(addr);
        return {
          village: parsed.village || "",
          post: parsed.post || "",
          district: parsed.district || "",
          state: parsed.state || "",
          pin: parsed.pin || "",
        };
      }
    } catch (e) {
      // Ignored
    }
    return {
      village: addr || "",
      post: "",
      district: "",
      state: "",
      pin: "",
    };
  };

  const initialAddress = parseAddress(admission.address);

  // Step 3 (Personal Details) state
  const [personalDetails, setPersonalDetails] = useState({
    father_name: admission.father_name || "",
    mother_name: admission.mother_name || "",
    dob: admission.dob ? admission.dob.substring(0, 10) : "",
    gender: admission.gender || "",
    category: admission.category || "",
    qualification: admission.qualification || "",
    village: initialAddress.village,
    post: initialAddress.post,
    district: initialAddress.district,
    state: initialAddress.state,
    pin: initialAddress.pin,
  });

  // Step 4 (Document Upload) states
  const [files, setFiles] = useState<{
    photo: File | null;
    signature: File | null;
    identity: File | null;
  }>({
    photo: null,
    signature: null,
    identity: null,
  });

  const [uploadProgress, setUploadProgress] = useState<{
    photo: number;
    signature: number;
    identity: number;
  }>({
    photo: admission.photo_url ? 100 : 0,
    signature: admission.signature_url ? 100 : 0,
    identity: admission.identity_proof_url ? 100 : 0,
  });

  const [uploadedUrls, setUploadedUrls] = useState({
    photo_url: admission.photo_url || "",
    signature_url: admission.signature_url || "",
    identity_proof_url: admission.identity_proof_url || "",
  });

  useEffect(() => {
    const initialStep = getInitialStep(admission);
    setCurrentStep(initialStep);
    
    // Set max allowed step based on database progression
    if (admission.completed_payment) {
      const hasAccount = !!(admission.students?.[0]?.student_id || generatedStudentId);
      setMaxAllowedStep(hasAccount ? 8 : 7);
    } else if (admission.document_verified || admission.flow_step === "payment") {
      setMaxAllowedStep(6);
    } else if (admission.flow_step === "review") {
      setMaxAllowedStep(5);
    } else if (admission.flow_step === "documents") {
      setMaxAllowedStep(4);
    } else {
      setMaxAllowedStep(3);
    }
  }, [admission, generatedStudentId]);

  const course = admission.courses;
  const finalFee = 1000; // Fixed Admission Fee

  // Handle navigation
  const handleNextStep = () => {
    if (currentStep < maxAllowedStep) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 1 || currentStep === 2) {
      // Step 1 and Step 2 are read-only and always allowed to transition
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const jumpToStep = (step: number) => {
    if (step === 1 || step === 2 || step <= maxAllowedStep) {
      setCurrentStep(step);
    }
  };

  // Step 3 Submit: Save Personal Details
  const handleSavePersonalDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    const { father_name, mother_name, dob, gender, category, qualification, village, post, district, state, pin } = personalDetails;
    if (!father_name || !mother_name || !dob || !gender || !category || !qualification || !village || !post || !district || !state || !pin) {
      setError("Please fill out all personal details and residential address fields.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Serialize address block into JSON string for saving in DB
      const serializedAddress = JSON.stringify({ village, post, district, state, pin });
      
      const res = await updateAdmissionPersonalDetails(admission.id, {
        father_name,
        mother_name,
        dob,
        gender,
        category,
        qualification,
        address: serializedAddress
      });

      if (res.error) {
        setError(res.error);
      } else {
        router.refresh();
        setMaxAllowedStep(4);
        setCurrentStep(4);
      }
    } catch (err: any) {
      setError(err.message || "Failed to update personal details.");
    } finally {
      setLoading(false);
    }
  };

  // Step 4 File selection simulation
  const handleFileChange = (type: "photo" | "signature" | "identity", file: File) => {
    setFiles(prev => ({ ...prev, [type]: file }));
    setUploadProgress(prev => ({ ...prev, [type]: 1 }));
    setError(null);

    // Simulate file upload progress (0% -> 100%)
    let progress = 1;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 20) + 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Save beautiful simulated Unsplash images representing documents
        const mockUrls = {
          photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
          signature: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=200",
          identity: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=400"
        };
        
        setUploadedUrls(prev => ({
          ...prev,
          [`${type}_url` === "identity_url" ? "identity_proof_url" : `${type}_url`]: mockUrls[type]
        }));
      }
      setUploadProgress(prev => ({ ...prev, [type]: progress }));
    }, 150);
  };

  // Step 4 Submit: Save uploaded mock file urls
  const handleSaveDocuments = async () => {
    if (!uploadedUrls.photo_url || !uploadedUrls.signature_url || !uploadedUrls.identity_proof_url) {
      setError("Please upload all three requested documents.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await updateAdmissionDocuments(admission.id, uploadedUrls);
      if (res.error) {
        setError(res.error);
      } else {
        setMaxAllowedStep(5);
        setCurrentStep(5);
      }
    } catch (err: any) {
      setError(err.message || "Failed to update documents.");
    } finally {
      setLoading(false);
    }
  };

  // Step 5 Developer Mode simulation: bypass review
  const handleDevApprove = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await verifyAdmissionDocuments(admission.id, true);
      if (res.error) {
        setError(res.error);
      } else {
        setMaxAllowedStep(6);
        setCurrentStep(6);
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "Failed to execute developer bypass approval.");
    } finally {
      setLoading(false);
    }
  };

  // Step 7: Call server action to create student account dynamically
  const handleCreateStudentAccount = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await createStudentAccountAction(admission.id);
      if (res.error) {
        setError(res.error);
      } else if (res.studentId) {
        setGeneratedStudentId(res.studentId);
        setMaxAllowedStep(8);
        setCurrentStep(8);
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "Failed to create student account.");
    } finally {
      setLoading(false);
    }
  };

  // Steps headers for stepper
  const steps = [
    { label: "Registration", stepNum: 1 },
    { label: "Course Selection", stepNum: 2 },
    { label: "Personal Info", stepNum: 3 },
    { label: "Document Upload", stepNum: 4 },
    { label: "Document Review", stepNum: 5 },
    { label: "Fee Payment", stepNum: 6 },
    { label: "Account Created", stepNum: 7 },
    { label: "LMS Access", stepNum: 8 }
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 md:px-6 lg:px-8 pt-24 md:pt-32">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-8 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 group-hover:-translate-x-1 transition-transform"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Dashboard
        </Link>

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Admission Pipeline Progress
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Complete the remaining tasks to activate your student enrollment.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-semibold flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {error}
          </div>
        )}

        {/* Stepper Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-8 overflow-x-auto">
          <div className="min-w-[720px] flex justify-between items-center relative">
            {/* Connecting lines background */}
            <div className="absolute top-4 left-0 right-0 h-1 bg-slate-100 -z-10 rounded"></div>
            
            {steps.map((st, idx) => {
              const isActive = currentStep === st.stepNum;
              const isCompleted = maxAllowedStep > st.stepNum || 
                (st.stepNum === 6 && admission.completed_payment) ||
                (st.stepNum === 7 && admission.completed_payment && (admission.students?.[0]?.student_id || generatedStudentId)) ||
                (st.stepNum === 8 && admission.completed_payment);
              const isSelectable = st.stepNum === 1 || st.stepNum === 2 || st.stepNum <= maxAllowedStep;
              
              return (
                <button
                  key={st.stepNum}
                  onClick={() => isSelectable && jumpToStep(st.stepNum)}
                  disabled={!isSelectable}
                  className={`flex flex-col items-center flex-1 cursor-pointer transition-all duration-300 relative z-10 disabled:cursor-not-allowed`}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center border font-bold text-sm transition-all duration-300 ${
                    isCompleted
                      ? "bg-emerald-500 border-emerald-500 text-white shadow-sm"
                      : isActive
                        ? "bg-blue-600 border-blue-600 text-white ring-4 ring-blue-50"
                        : isSelectable
                          ? "bg-white border-blue-200 text-blue-600"
                          : "bg-slate-50 border-slate-200 text-slate-400"
                  }`}>
                    {isCompleted ? "✓" : st.stepNum}
                  </div>
                  <span className={`text-[9px] font-bold mt-2 tracking-wide uppercase transition-colors duration-300 ${
                    isActive ? "text-blue-600" : isCompleted ? "text-emerald-600" : "text-slate-400"
                  }`}>
                    {st.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
          
          {/* STEP 1: STUDENT REGISTRATION */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Step 1: Student Registration</h2>
                <p className="text-slate-500 text-sm mt-0.5">Your registered institute account details.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 bg-slate-50 border border-slate-100 rounded-2xl p-5 text-sm font-medium">
                <div>
                  <span className="text-slate-400 block text-xs uppercase tracking-wider mb-0.5">Student Name</span>
                  <span className="text-slate-950 font-semibold">{admission.student_name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs uppercase tracking-wider mb-0.5">Contact Number</span>
                  <span className="text-slate-950 font-semibold">{admission.phone}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-400 block text-xs uppercase tracking-wider mb-0.5">Email Address</span>
                  <span className="text-slate-950 font-semibold">{admission.email}</span>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                  onClick={handleNextStep}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                >
                  Continue to Course Details
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: COURSE SELECTION */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Step 2: Selected Course Details</h2>
                <p className="text-slate-500 text-sm mt-0.5">The course selection associated with this admission application.</p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4">
                <div className="border-b border-slate-200/60 pb-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Course Title
                  </span>
                  <span className="font-extrabold text-slate-900 text-lg leading-snug">
                    {course.title}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm font-medium">
                  <div>
                    <span className="text-slate-400 block text-xs uppercase tracking-wider mb-0.5">Course Code</span>
                    <span className="text-slate-950">{course.course_code}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs uppercase tracking-wider mb-0.5">Tuition Fee</span>
                    <span className="text-slate-950 font-bold">₹{finalFee}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={handlePrevStep}
                  className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={handleNextStep}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                >
                  Continue to Personal Details
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PERSONAL DETAILS FORM */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-extrabold">Step 3: Personal Details Form</h2>
                <p className="text-slate-500 text-sm mt-0.5">Provide detailed student profile information for institutional records.</p>
              </div>

              {maxAllowedStep > 3 ? (
                // Read-only state showing saved personal details
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 bg-slate-50 border border-slate-100 rounded-2xl p-5 text-sm font-medium">
                    <div>
                      <span className="text-slate-400 block text-xs uppercase tracking-wider mb-0.5">Father's Name</span>
                      <span className="text-slate-950">{personalDetails.father_name}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-xs uppercase tracking-wider mb-0.5">Mother's Name</span>
                      <span className="text-slate-950">{personalDetails.mother_name || "—"}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-xs uppercase tracking-wider mb-0.5">Date of Birth</span>
                      <span className="text-slate-950">
                        {personalDetails.dob ? new Date(personalDetails.dob).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : "—"}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-xs uppercase tracking-wider mb-0.5">Gender</span>
                      <span className="text-slate-950 capitalize">{personalDetails.gender}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-xs uppercase tracking-wider mb-0.5">Caste / Category</span>
                      <span className="text-slate-950">{personalDetails.category || "—"}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-xs uppercase tracking-wider mb-0.5">Highest Qualification</span>
                      <span className="text-slate-950">{personalDetails.qualification}</span>
                    </div>
                    <div className="sm:col-span-2 border-t border-slate-200/60 pt-3 mt-1">
                      <span className="text-slate-400 block text-[10px] font-black uppercase tracking-[0.15em] mb-2 text-blue-600">Residential Address Details</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700 bg-white p-4 border border-slate-100 rounded-xl">
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Village/City</span>
                          <span className="text-slate-900">{personalDetails.village || "—"}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Post Office</span>
                          <span className="text-slate-900">{personalDetails.post || "—"}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-slate-400 block">District</span>
                          <span className="text-slate-900">{personalDetails.district || "—"}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-slate-400 block">State</span>
                          <span className="text-slate-900">{personalDetails.state || "—"}</span>
                        </div>
                        <div className="sm:col-span-2">
                          <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Pin Code</span>
                          <span className="text-slate-900">{personalDetails.pin || "—"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-slate-100">
                    <button
                      onClick={handlePrevStep}
                      className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                    >
                      Continue to Document Upload
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </button>
                  </div>
                </div>
              ) : (
                // Editable form state
                <form onSubmit={handleSavePersonalDetails} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-1.5">Father's Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter father's full name"
                        value={personalDetails.father_name}
                        onChange={e => setPersonalDetails(prev => ({ ...prev, father_name: e.target.value }))}
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-semibold text-slate-900 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-1.5">Mother's Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter mother's full name"
                        value={personalDetails.mother_name}
                        onChange={e => setPersonalDetails(prev => ({ ...prev, mother_name: e.target.value }))}
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-semibold text-slate-900 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-1.5">Date of Birth</label>
                      <input
                        type="date"
                        required
                        value={personalDetails.dob}
                        onChange={e => setPersonalDetails(prev => ({ ...prev, dob: e.target.value }))}
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-semibold text-slate-900 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-1.5">Gender</label>
                      <select
                        required
                        value={personalDetails.gender}
                        onChange={e => setPersonalDetails(prev => ({ ...prev, gender: e.target.value }))}
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-semibold text-slate-900 bg-white cursor-pointer"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-1.5">Caste / Category</label>
                      <select
                        required
                        value={personalDetails.category}
                        onChange={e => setPersonalDetails(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-semibold text-slate-900 bg-white cursor-pointer"
                      >
                        <option value="">Select Category</option>
                        <option value="General">General</option>
                        <option value="OBC">OBC</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-1.5">Highest Qualification</label>
                      <select
                        required
                        value={personalDetails.qualification}
                        onChange={e => setPersonalDetails(prev => ({ ...prev, qualification: e.target.value }))}
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-semibold text-slate-900 bg-white cursor-pointer"
                      >
                        <option value="">Select Education</option>
                        <option value="10th">10th Pass</option>
                        <option value="12th">12th Pass</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Graduate">Graduate</option>
                        <option value="Post Graduate">Post Graduate (PG)</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Address Block */}
                    <div className="sm:col-span-2 border-t border-slate-100 pt-4 mt-2">
                      <span className="block text-xs font-black uppercase tracking-[0.15em] text-blue-600 mb-4">Residential Address Block</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Village / City</label>
                          <input
                            type="text"
                            required
                            placeholder="Enter Village or City name"
                            value={personalDetails.village}
                            onChange={e => setPersonalDetails(prev => ({ ...prev, village: e.target.value }))}
                            className="w-full h-11 px-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-semibold text-slate-900 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Post Office</label>
                          <input
                            type="text"
                            required
                            placeholder="Enter Post Office"
                            value={personalDetails.post}
                            onChange={e => setPersonalDetails(prev => ({ ...prev, post: e.target.value }))}
                            className="w-full h-11 px-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-semibold text-slate-900 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">District</label>
                          <input
                            type="text"
                            required
                            placeholder="Enter District"
                            value={personalDetails.district}
                            onChange={e => setPersonalDetails(prev => ({ ...prev, district: e.target.value }))}
                            className="w-full h-11 px-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-semibold text-slate-900 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">State</label>
                          <input
                            type="text"
                            required
                            placeholder="Enter State"
                            value={personalDetails.state}
                            onChange={e => setPersonalDetails(prev => ({ ...prev, state: e.target.value }))}
                            className="w-full h-11 px-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-semibold text-slate-900 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Pin Code</label>
                          <input
                            type="text"
                            required
                            maxLength={6}
                            placeholder="Enter 6-digit Pincode"
                            value={personalDetails.pin}
                            onChange={e => setPersonalDetails(prev => ({ ...prev, pin: e.target.value.replace(/\D/g, "") }))}
                            className="w-full h-11 px-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-semibold text-slate-900 bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? "Saving Details..." : "Save & Continue"}
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* STEP 4: DOCUMENT UPLOAD */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Step 4: Upload Documents</h2>
                <p className="text-slate-500 text-sm mt-0.5">Please upload scanned copies of your photo, signature, and educational marksheet/identity proof.</p>
              </div>

              {maxAllowedStep > 4 ? (
                // Read-only uploaded previews
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 bg-slate-50 border border-slate-100 rounded-2xl p-5 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Profile Photo</span>
                      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-md relative bg-slate-200">
                        <img src={uploadedUrls.photo_url} alt="Profile Photo" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center gap-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Student Signature</span>
                      <div className="w-32 h-16 rounded border border-slate-200 overflow-hidden shadow-sm relative bg-white flex items-center justify-center p-2">
                        <img src={uploadedUrls.signature_url} alt="Signature" className="max-h-full max-w-full object-contain" />
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Identity / Marksheet</span>
                      <div className="w-28 h-20 rounded border border-slate-200 overflow-hidden shadow-sm relative bg-white flex items-center justify-center">
                        <img src={uploadedUrls.identity_proof_url} alt="Identity Proof" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-slate-100">
                    <button
                      onClick={handlePrevStep}
                      className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                    >
                      Continue to Review
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </button>
                  </div>
                </div>
              ) : (
                // Upload Form
                <div className="space-y-6">
                  <div className="space-y-4">
                    {/* Document 1: Photo */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-slate-200 rounded-2xl gap-4">
                      <div>
                        <span className="font-bold text-sm text-slate-900 block">1. Profile Photo</span>
                        <span className="text-xs text-slate-400">Passport size photo, max size 2MB (JPG/PNG).</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {uploadProgress.photo > 0 && uploadProgress.photo < 100 && (
                          <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-blue-600 h-full transition-all duration-150" style={{ width: `${uploadProgress.photo}%` }}></div>
                          </div>
                        )}
                        {uploadProgress.photo === 100 && (
                          <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded font-bold uppercase tracking-wider">Uploaded</span>
                        )}
                        <label className="px-4 py-2 bg-slate-900 text-white hover:bg-blue-600 rounded-xl text-xs font-bold cursor-pointer transition-colors select-none shrink-0">
                          {uploadProgress.photo > 0 ? "Re-upload" : "Choose File"}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={e => e.target.files && handleFileChange("photo", e.target.files[0])}
                          />
                        </label>
                      </div>
                    </div>

                    {/* Document 2: Signature */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-slate-200 rounded-2xl gap-4">
                      <div>
                        <span className="font-bold text-sm text-slate-900 block">2. Student Signature</span>
                        <span className="text-xs text-slate-400">Scanned signature on white paper, max size 1MB.</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {uploadProgress.signature > 0 && uploadProgress.signature < 100 && (
                          <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-blue-600 h-full transition-all duration-150" style={{ width: `${uploadProgress.signature}%` }}></div>
                          </div>
                        )}
                        {uploadProgress.signature === 100 && (
                          <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded font-bold uppercase tracking-wider">Uploaded</span>
                        )}
                        <label className="px-4 py-2 bg-slate-900 text-white hover:bg-blue-600 rounded-xl text-xs font-bold cursor-pointer transition-colors select-none shrink-0">
                          {uploadProgress.signature > 0 ? "Re-upload" : "Choose File"}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={e => e.target.files && handleFileChange("signature", e.target.files[0])}
                          />
                        </label>
                      </div>
                    </div>

                    {/* Document 3: Identity / Marksheet */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-slate-200 rounded-2xl gap-4">
                      <div>
                        <span className="font-bold text-sm text-slate-900 block">3. Educational Marksheet / ID Proof</span>
                        <span className="text-xs text-slate-400">Scanned PDF or Image of marksheet / Aadhar card.</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {uploadProgress.identity > 0 && uploadProgress.identity < 100 && (
                          <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-blue-600 h-full transition-all duration-150" style={{ width: `${uploadProgress.identity}%` }}></div>
                          </div>
                        )}
                        {uploadProgress.identity === 100 && (
                          <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded font-bold uppercase tracking-wider">Uploaded</span>
                        )}
                        <label className="px-4 py-2 bg-slate-900 text-white hover:bg-blue-600 rounded-xl text-xs font-bold cursor-pointer transition-colors select-none shrink-0">
                          {uploadProgress.identity > 0 ? "Re-upload" : "Choose File"}
                          <input
                            type="file"
                            accept="image/*,application/pdf"
                            className="hidden"
                            onChange={e => e.target.files && handleFileChange("identity", e.target.files[0])}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-slate-100">
                    <button
                      onClick={handlePrevStep}
                      className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSaveDocuments}
                      disabled={loading || uploadProgress.photo < 100 || uploadProgress.signature < 100 || uploadProgress.identity < 100}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Saving Files..." : "Submit Documents for Review"}
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: ADMISSION REVIEW */}
          {currentStep === 5 && (
            <div className="space-y-6 text-center py-6">
              
              {!admission.document_verified ? (
                <div className="max-w-md mx-auto space-y-5">
                  {/* Under Review State */}
                  <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 text-amber-500 flex items-center justify-center mx-auto text-2xl font-bold animate-pulse">
                    ⏳
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Application Under Review</h2>
                    <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                      Your details and files have been successfully submitted. Our administrative office is reviewing your files. This step generally completes within 2–4 hours.
                    </p>
                  </div>

                  <div className="pt-2">
                    <span className="text-xs text-slate-400 block font-medium">Please refresh the dashboard page later for status updates.</span>
                  </div>

                  {/* Developer bypass panel */}
                  <div className="p-5 border border-dashed border-blue-200 rounded-2xl bg-blue-50/20 text-left space-y-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black px-2 py-0.5 bg-blue-600 text-white rounded uppercase tracking-wider">DEV MODE</span>
                      <span className="text-xs font-bold text-blue-900">Simulate Document Review</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-normal">
                      For testing purposes, bypass the administrative review and instantly verify student documents to advance to the payment step.
                    </p>
                    <button
                      disabled={loading}
                      onClick={handleDevApprove}
                      className="w-full py-2 bg-blue-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold shadow-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {loading ? "Processing..." : "Verify & Approve Documents (Dev)"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="max-w-md mx-auto space-y-5">
                  {/* Verified State */}
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-500 flex items-center justify-center mx-auto text-2xl font-bold">
                    ✓
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Documents Verified!</h2>
                    <p className="text-slate-500 text-sm mt-2">
                      Your educational documents and details have been verified by our admissions staff. You are now cleared to make the tuition fee payment.
                    </p>
                  </div>

                  <div className="flex justify-center pt-4">
                    <button
                      onClick={handleNextStep}
                      className="px-6 py-3 bg-blue-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-blue-500/10"
                    >
                      Proceed to Tuition Fee Payment
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 6: FEE PAYMENT */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Step 6: Complete Fee Payment</h2>
                <p className="text-slate-500 text-sm mt-0.5">Finalize your enrollment by paying the course tuition fee.</p>
              </div>

              {admission.completed_payment ? (
                <div className="p-6 border border-emerald-200 bg-emerald-50/20 rounded-2xl flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xl">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">Payment Completed Successfully!</h3>
                    <p className="text-xs text-slate-500 mt-1">You are officially enrolled in the course. Check your dashboard to access course materials.</p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="px-5 py-2 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  
                  {/* Fee Summary */}
                  <div className="md:col-span-7 bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Invoice Details</span>
                    
                    <div className="border-b border-slate-200/60 pb-3">
                      <span className="text-xs text-slate-500">Selected Course</span>
                      <span className="font-bold text-slate-900 text-sm block mt-0.5">{course.title}</span>
                    </div>

                    <div className="space-y-2.5 text-xs font-semibold text-slate-500">
                      <div className="flex justify-between">
                        <span>Admission Fee</span>
                        <span className="text-slate-900">₹{finalFee}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-baseline pt-3 border-t border-slate-200/60">
                      <span className="text-sm font-extrabold text-slate-900">Total Payable Amount</span>
                      <span className="text-xl font-black text-slate-900">₹{finalFee}</span>
                    </div>
                  </div>

                  {/* Payment Redirection Info */}
                  <div className="md:col-span-5 space-y-4 border border-slate-200 rounded-2xl p-5 bg-white">
                    <h3 className="font-extrabold text-sm text-slate-950">Secure Checkout Gateways</h3>
                    <p className="text-xs text-slate-500 leading-normal">
                      We support instant payments via UPI Apps (PhonePe, GPay, Paytm) and scanner code through **SMEPay**.
                    </p>
                    
                    <Link
                      href={`/checkout/${admission.id}`}
                      className="w-full h-11 bg-blue-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/10 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Proceed to Checkout
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </Link>
                  </div>

                </div>
              )}
            </div>
          )}

          {/* STEP 7: STUDENT ACCOUNT CREATION */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Step 7: Student Account Credentials</h2>
                <p className="text-slate-500 text-sm mt-0.5">Your official institutional login credentials generated for the LMS portal.</p>
              </div>

              {(admission.students?.[0]?.student_id || generatedStudentId) ? (
                <div className="space-y-6">
                  <div className="p-6 border border-blue-200 bg-blue-50/20 rounded-2xl space-y-4 max-w-md mx-auto text-left">
                    <div className="text-center pb-2 border-b border-blue-100">
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Vision Learn Account</span>
                      <span className="text-xs text-slate-400 block mt-0.5">Credentials generated successfully</span>
                    </div>

                    <div className="space-y-3 font-semibold text-slate-700">
                      <div className="bg-white p-3 border border-slate-100 rounded-xl flex justify-between items-center">
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Student ID</span>
                          <span className="text-sm font-mono font-bold text-slate-900">{admission.students?.[0]?.student_id || generatedStudentId}</span>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(admission.students?.[0]?.student_id || generatedStudentId || "");
                            alert("Student ID copied!");
                          }}
                          className="px-2.5 py-1.5 hover:bg-slate-50 text-[10px] text-blue-600 font-bold border border-slate-200 rounded-lg cursor-pointer"
                        >
                          Copy
                        </button>
                      </div>

                      <div className="bg-white p-3 border border-slate-100 rounded-xl flex justify-between items-center">
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Password</span>
                          <span className="text-sm font-mono font-bold text-slate-900">
                            {(() => {
                              const firstName = admission.student_name.trim().split(/\s+/)[0];
                              const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
                              const last4Phone = admission.phone.replace(/\D/g, "").slice(-4);
                              return `${capitalizedFirstName}@${last4Phone}`;
                            })()}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            const firstName = admission.student_name.trim().split(/\s+/)[0];
                            const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
                            const last4Phone = admission.phone.replace(/\D/g, "").slice(-4);
                            navigator.clipboard.writeText(`${capitalizedFirstName}@${last4Phone}`);
                            alert("Password copied!");
                          }}
                          className="px-2.5 py-1.5 hover:bg-slate-50 text-[10px] text-blue-600 font-bold border border-slate-200 rounded-lg cursor-pointer"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-slate-100">
                    <button
                      onClick={handlePrevStep}
                      className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                    >
                      Continue to LMS Access
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6 border border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center gap-4 bg-white shadow-sm max-w-md mx-auto">
                  <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-xl">
                    🔑
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">Generate Student Account</h3>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      Your tuition fee payment has been successfully completed and verified. Click the button below to generate your official student credentials for the **Vision Learn** portal.
                    </p>
                  </div>
                  
                  {error && (
                    <div className="w-full p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-semibold text-left">
                      {error}
                    </div>
                  )}

                  <div className="w-full pt-2 flex flex-col gap-3">
                    <button
                      disabled={loading}
                      onClick={handleCreateStudentAccount}
                      className="w-full py-3 bg-blue-600 hover:bg-slate-900 disabled:bg-slate-300 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/10 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {loading ? "Generating Account..." : "Create Account & Generate Credentials"}
                    </button>
                    <button
                      onClick={handlePrevStep}
                      className="w-full py-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      Back to Fee Payment
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 8: LMS ACCESS */}
          {currentStep === 8 && (
            <div className="space-y-6 text-center py-6">
              <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mx-auto text-2xl font-bold">
                🎓
              </div>

              <div className="max-w-md mx-auto space-y-3">
                <h2 className="text-xl font-extrabold text-slate-900">Welcome to Vision IT Institute!</h2>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Your admission process is complete and payment has been processed. You can now log in to the Vision Learn student portal using your student credentials to access your courses, interactive classes, batch schedule, and study materials.
                </p>
              </div>

              <div className="flex justify-center gap-4 pt-4">
                <button
                  onClick={handlePrevStep}
                  className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Back
                </button>
                <Link
                  href="/learn"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-blue-500/10"
                >
                  Access LMS Portal
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </Link>
              </div>
            </div>
          )}

        </div>

      </div>
    </main>
  );
}
