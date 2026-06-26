"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateUserProfile, sendOtpSms, sendRegistrationSms, syncProfileFromStudent } from "@/features/auth/actions/auth";
import { 
  User, Mail, Phone, Calendar, MapPin, 
  GraduationCap, Upload, CheckCircle, AlertTriangle, ArrowLeft, ArrowRight, Lock, Key, Smartphone, Pencil
} from "lucide-react";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", 
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const CHHATTISGARH_DISTRICTS = [
  "Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", 
  "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", 
  "Gaurela-Pendra-Marwahi", "Janjgir-Champa", "Jashpur", "Kabirdham (Kawardha)", 
  "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Manendragarh-Chirmiri-Bharatpur",
  "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sakti", 
  "Sarangarh-Bilaigarh", "Sukma", "Surajpur", "Surguja", "Khairagarh-Chhuikhadan-Gandai", "Mohla-Manpur-Ambagarh Chowki"
].sort();

interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
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
  aadhar_proof_url: string | null;
  caste_proof_url: string | null;
  roll_number: string | null;
  is_profile_completed: boolean;
  document_verified: boolean;
}

export function ProfileForm({ 
  profile, 
  userEmail 
}: { 
  profile: Profile | null; 
  userEmail: string 
}) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [maxCompletedStep, setMaxCompletedStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // OTP & Verification states
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);
  const [registrationNumber, setRegistrationNumber] = useState<string | null>(profile?.roll_number || null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isEditing, setIsEditing] = useState(
    profile ? (!profile.is_profile_completed && !profile.roll_number) : true
  );
  const hasRegistration = !!(profile?.is_profile_completed || registrationNumber || profile?.roll_number);

  const handleOtpChange = (index: number, val: string) => {
    const digit = val.slice(-1).replace(/\D/g, "");
    const newValues = [...otpValues];
    newValues[index] = digit;
    setOtpValues(newValues);
    setOtpCode(newValues.join(""));

    // Focus next box if value is typed
    if (digit && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      // If current box is empty, clear previous box and focus it
      if (!otpValues[index] && index > 0) {
        const newValues = [...otpValues];
        newValues[index - 1] = "";
        setOtpValues(newValues);
        setOtpCode(newValues.join(""));
        const prevInput = document.getElementById(`otp-${index - 1}`);
        prevInput?.focus();
      }
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text").trim().slice(0, 6).replace(/\D/g, "");
    if (pastedText.length > 0) {
      const digits = pastedText.split("");
      const newValues = [...otpValues];
      for (let i = 0; i < 6; i++) {
        newValues[i] = digits[i] || "";
      }
      setOtpValues(newValues);
      setOtpCode(newValues.join(""));
      const focusIndex = Math.min(pastedText.length - 1, 5);
      const targetBox = document.getElementById(`otp-${focusIndex}`);
      targetBox?.focus();
    }
  };

  // Initialize completed steps if profile is already done
  useEffect(() => {
    if (profile?.is_profile_completed || profile?.roll_number) {
      setMaxCompletedStep(5);
    }
  }, [profile]);

  // Helper to parse address JSON
  const parseAddress = (addrStr: string | null) => {
    try {
      if (addrStr && (addrStr.startsWith("{") || addrStr.startsWith("["))) {
        const parsed = JSON.parse(addrStr);
        return {
          village: parsed.village || "",
          post: parsed.post || "",
          district: parsed.district || "",
          state: parsed.state || "",
          pin: parsed.pin || "",
        };
      }
    } catch (e) {
      // ignore
    }
    return {
      village: addrStr || "",
      post: "",
      district: "",
      state: "",
      pin: "",
    };
  };

  const initialAddress = parseAddress(profile?.address || null);

  // Form State
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    phone: profile?.phone || "",
    father_name: profile?.father_name || "",
    mother_name: profile?.mother_name || "",
    dob: profile?.dob ? profile.dob.substring(0, 10) : "",
    gender: profile?.gender || "",
    category: profile?.category || "",
    qualification: profile?.qualification || "",
    village: initialAddress.village,
    post: initialAddress.post,
    district: initialAddress.district,
    state: initialAddress.state,
    pin: initialAddress.pin,
  });

  // Reset district if state changes to avoid mismatched state-district submissions
  const [lastState, setLastState] = useState(formData.state);
  useEffect(() => {
    if (formData.state !== lastState) {
      setFormData(prev => ({ ...prev, district: "" }));
      setLastState(formData.state);
    }
  }, [formData.state, lastState]);

  // Document states
  const [uploadProgress, setUploadProgress] = useState<{
    photo: number;
    signature: number;
    identity: number;
    aadhar: number;
    caste: number;
  }>({
    photo: profile?.photo_url ? 100 : 0,
    signature: profile?.signature_url ? 100 : 0,
    identity: profile?.identity_proof_url ? 100 : 0,
    aadhar: profile?.aadhar_proof_url ? 100 : 0,
    caste: profile?.caste_proof_url ? 100 : 0,
  });

  const [uploadedUrls, setUploadedUrls] = useState({
    photo_url: profile?.photo_url || "",
    signature_url: profile?.signature_url || "",
    identity_proof_url: profile?.identity_proof_url || "",
    aadhar_proof_url: profile?.aadhar_proof_url || "",
    caste_proof_url: profile?.caste_proof_url || "",
  });


  // Clear any previously saved localStorage cache (cache system removed)
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("profile_form_draft");
    }
  }, []);

  // Sync profile from students database if not completed

  useEffect(() => {
    async function performSync() {
      if (!profile?.roll_number) {
        try {
          const syncRes = await syncProfileFromStudent();
          if (syncRes.success && syncRes.profile) {
            const synced = syncRes.profile;
            setRegistrationNumber(synced.roll_number);
            
            // Set form data from synced values
            setFormData(prev => ({
              ...prev,
              full_name: synced.full_name || prev.full_name,
              phone: synced.phone || prev.phone,
              father_name: synced.father_name || prev.father_name,
              mother_name: synced.mother_name || prev.mother_name,
              dob: synced.dob ? synced.dob.substring(0, 10) : prev.dob,
              gender: synced.gender || prev.gender,
              category: synced.category || prev.category,
              qualification: synced.qualification || prev.qualification,
            }));

            if (synced.photo_url) {
              setUploadedUrls(prev => ({
                ...prev,
                photo_url: synced.photo_url || prev.photo_url,
              }));
            }

            if (synced.is_profile_completed) {
              setIsEditing(false); // Switch to Summary View directly!
              setMaxCompletedStep(5);
            }
            
            // Dispatch update event to sync headers/avatars
            window.dispatchEvent(new Event("profile-updated"));
            router.refresh();
          }
        } catch (e) {
          console.error("Client profile sync error:", e);
        }
      }
    }

    performSync();
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  // Real file upload: convert to base64 data URL so actual image is shown and stored
  const handleFileChange = (type: "photo" | "signature" | "identity" | "aadhar" | "caste", file: File) => {
    // Block SVG files — only real photos allowed
    if (file.type === "image/svg+xml" || file.name.endsWith(".svg")) {
      setError("SVG files are not allowed. Please upload a JPG, PNG, or JPEG photo.");
      return;
    }

    // Only allow real image formats
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setError(`Invalid file type (${file.type}). Please upload a JPG, PNG, or WEBP image.`);
      return;
    }

    if (file.size > 100 * 1024) {
      setError(`File size exceeds 100 KB limit. Current size: ${(file.size / 1024).toFixed(1)} KB`);
      return;
    }

    setError(null);
    setUploadProgress(prev => ({ ...prev, [type]: 10 }));


    const keyMap: Record<string, string> = {
      photo: "photo_url",
      signature: "signature_url",
      identity: "identity_proof_url",
      aadhar: "aadhar_proof_url",
      caste: "caste_proof_url",
    };

    const reader = new FileReader();

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 85) + 10;
        setUploadProgress(prev => ({ ...prev, [type]: percent }));
      }
    };

    reader.onload = () => {
      const base64 = reader.result as string;
      setUploadedUrls(prev => ({
        ...prev,
        [keyMap[type]]: base64,
      }));
      setUploadProgress(prev => ({ ...prev, [type]: 100 }));
      setTimeout(() => {
        setUploadProgress(prev => ({ ...prev, [type]: 0 }));
      }, 1200);
    };

    reader.onerror = () => {
      setError("Failed to read file. Please try again.");
      setUploadProgress(prev => ({ ...prev, [type]: 0 }));
    };

    reader.readAsDataURL(file);
  };


  // Step-by-Step Validations
  const validateStep1 = () => {
    if (!formData.full_name.trim()) return "Full Name is required";
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) return "Valid 10-digit Indian mobile number required";
    if (!formData.dob) return "Date of Birth is required";
    if (!formData.gender) return "Gender is required";
    if (!formData.category) return "Caste/Category is required";
    return "";
  };

  const validateStep2 = () => {
    if (!formData.father_name.trim()) return "Father's Name is required";
    if (!formData.mother_name.trim()) return "Mother's Name is required";
    return "";
  };

  const validateStep3 = () => {
    if (!formData.village.trim()) return "Village/City is required";
    if (!formData.post.trim()) return "Post Office is required";
    if (!formData.district.trim()) return "District is required";
    if (!formData.state.trim()) return "State is required";
    if (!formData.pin.trim() || formData.pin.length !== 6) return "Valid 6-digit Pin Code is required";
    return "";
  };

  const validateStep4 = () => {
    if (!formData.qualification) return "Highest Qualification is required";
    return "";
  };

  const validateStep5 = () => {
    // All documents are optional — no required validation
    return "";
  };

  // Step Navigations
  const handleNext = () => {
    let validationErr = "";
    if (currentStep === 1) validationErr = validateStep1();
    else if (currentStep === 2) validationErr = validateStep2();
    else if (currentStep === 3) validationErr = validateStep3();
    else if (currentStep === 4) validationErr = validateStep4();

    if (validationErr) {
      setError(validationErr);
      return;
    }

    setError(null);
    setCurrentStep(prev => prev + 1);
    if (currentStep >= maxCompletedStep) {
      setMaxCompletedStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setError(null);
    setCurrentStep(prev => prev - 1);
  };

  const jumpToStep = (stepNum: number) => {
    if (stepNum <= maxCompletedStep || hasRegistration) {
      setError(null);
      setCurrentStep(stepNum);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalErr = validateStep5();
    if (finalErr) return setError(finalErr);

    setError(null);

    // Registered user — direct update, no OTP
    if (hasRegistration) {
      await handleSectionUpdate();
      return;
    }

    // First-time user — send OTP to verify phone before saving
    setLoading(true);
    setOtpError(null);
    setOtpCode("");
    setOtpValues(Array(6).fill(""));

    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);

    try {
      const smsRes = await sendOtpSms(formData.phone, randomOtp);
      if (!smsRes.success) {
        setError("Failed to send OTP to your mobile number. Please check the number and try again.");
        setLoading(false);
        return;
      }
      setShowOtpModal(true);
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtpAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otpCode !== generatedOtp) {
      setOtpError("Invalid verification code. Please check the OTP and try again.");
      return;
    }

    setLoading(true);
    setOtpError(null);

    try {
      const serializedAddress = JSON.stringify({
        village: formData.village,
        post: formData.post,
        district: formData.district,
        state: formData.state,
        pin: formData.pin,
      });

      // Pass forceComplete=true so registration number is always generated after OTP verify
      const res = await updateUserProfile({
        full_name: formData.full_name,
        phone: formData.phone,
        father_name: formData.father_name,
        mother_name: formData.mother_name,
        dob: formData.dob,
        gender: formData.gender,
        category: formData.category,
        qualification: formData.qualification,
        address: serializedAddress,
        photo_url: uploadedUrls.photo_url,
        signature_url: uploadedUrls.signature_url,
        identity_proof_url: uploadedUrls.identity_proof_url,
        aadhar_proof_url: uploadedUrls.aadhar_proof_url,
        caste_proof_url: uploadedUrls.caste_proof_url,
        forceComplete: true,
      });

      if (res.error) {
        setOtpError(res.error);
      } else {
        setRegistrationNumber(res.rollNumber || null);
        setSuccess(true);
        setShowOtpModal(false);
        setShowSuccessModal(true);
        setIsEditing(false);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("profile-updated"));
        }
        router.refresh();

        // Send Registration Number via SMS
        if (res.rollNumber) {
          try {
            await sendRegistrationSms(formData.phone, formData.full_name, res.rollNumber);
          } catch (err) {
            console.error("Failed to send registration SMS:", err);
          }
        }
      }
    } catch (err: any) {
      setOtpError(err.message || "Failed to complete verification and save profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleSectionUpdate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    let validationErr = "";
    if (currentStep === 1) validationErr = validateStep1();
    else if (currentStep === 2) validationErr = validateStep2();
    else if (currentStep === 3) validationErr = validateStep3();
    else if (currentStep === 4) validationErr = validateStep4();
    else if (currentStep === 5) validationErr = validateStep5();

    if (validationErr) {
      setError(validationErr);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const serializedAddress = JSON.stringify({
        village: formData.village,
        post: formData.post,
        district: formData.district,
        state: formData.state,
        pin: formData.pin,
      });

      const res = await updateUserProfile({
        full_name: formData.full_name,
        phone: formData.phone,
        father_name: formData.father_name,
        mother_name: formData.mother_name,
        dob: formData.dob,
        gender: formData.gender,
        category: formData.category,
        qualification: formData.qualification,
        address: serializedAddress,
        photo_url: uploadedUrls.photo_url,
        signature_url: uploadedUrls.signature_url,
        identity_proof_url: uploadedUrls.identity_proof_url,
        aadhar_proof_url: uploadedUrls.aadhar_proof_url,
        caste_proof_url: uploadedUrls.caste_proof_url,
      });

      if (res.error) {
        setError(res.error);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Update registration number in state if generated
        if (res.rollNumber) {
          setRegistrationNumber(res.rollNumber);
        }
        setSuccess(true);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("profile-updated"));
        }
        // If profile is now complete, go to summary view; else stay on form
        if (res.isComplete) {
          setIsEditing(false);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
        router.refresh();
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err: any) {
      setError(err.message || "Failed to update profile details.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  // Helper to get document info based on qualification
  const getQualificationDocInfo = () => {
    switch (formData.qualification) {
      case "10th":
        return {
          title: "10th Passing Marksheet",
          buttonText: "Upload Marksheet",
          description: "Scanned copy of 10th Class Board Marksheet",
          icon: "📄"
        };
      case "12th":
        return {
          title: "12th Passing Marksheet",
          buttonText: "Upload Marksheet",
          description: "Scanned copy of 12th Class Board Marksheet",
          icon: "📄"
        };
      case "Diploma":
        return {
          title: "Diploma Certificate",
          buttonText: "Upload Certificate",
          description: "Scanned copy of Diploma Certificate/Marksheet",
          icon: "📜"
        };
      case "Graduate":
        return {
          title: "Graduation Marksheet",
          buttonText: "Upload Degree/Marksheet",
          description: "Scanned copy of Graduation Degree / Final Year Marksheet",
          icon: "🎓"
        };
      case "Post Graduate":
        return {
          title: "Post Graduate Certificate",
          buttonText: "Upload PG Certificate",
          description: "Scanned copy of Post Graduate Degree / Marksheet",
          icon: "🎓"
        };
      default:
        return {
          title: "Identity Proof / Marksheet",
          buttonText: "Upload Document",
          description: "Scanned copy of Aadhar card or Marksheet",
          icon: "🪪"
        };
    }
  };

  const docInfo = getQualificationDocInfo();

  const steps = [
    { label: "Basic Info", stepNum: 1 },
    { label: "Family Details", stepNum: 2 },
    { label: "Address", stepNum: 3 },
    { label: "Qualification", stepNum: 4 },
    { label: "Documents", stepNum: 5 }
  ];

  const getMissingFields = () => {
    const missing: string[] = [];
    
    // Step 1 check
    if (
      !formData.full_name.trim() || 
      !formData.phone.trim() || 
      !formData.dob || 
      !formData.gender || 
      !formData.category
    ) {
      missing.push("Basic Details & Caste Category (Step 1)");
    }
    // Step 2 check
    if (!formData.father_name.trim() || !formData.mother_name.trim()) {
      missing.push("Family Details (Step 2)");
    }
    // Step 3 check
    if (
      !formData.village.trim() || 
      !formData.post.trim() || 
      !formData.district.trim() || 
      !formData.state.trim() || 
      !formData.pin.trim()
    ) {
      missing.push("Residential Address (Step 3)");
    }
    // Step 4 check
    if (!formData.qualification) {
      missing.push("Highest Qualification (Step 4)");
    }
    // Step 5 documents are all optional — no missing check
    
    return missing;
  };

  // Check if we should render Profile Summary (View Mode)
  // Show summary if not editing AND user has a registration number (roll_number) OR profile is completed
  if (!isEditing && (profile?.is_profile_completed || profile?.roll_number || registrationNumber)) {
    return (
      <div className="space-y-6">
        {/* Profile Complete Status Banner */}
        <div className={`${profile?.is_profile_completed ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-blue-50 border-blue-200 text-blue-900'} border rounded-3xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm animate-in fade-in duration-300`}>
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-2xl ${profile?.is_profile_completed ? 'bg-emerald-500/10 text-emerald-600' : 'bg-blue-500/10 text-blue-600'} flex items-center justify-center shrink-0`}>
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base">
                {profile?.is_profile_completed ? 'Your Student Profile is Verified' : 'Registration Number Assigned'}
              </h3>
              <p className="text-xs mt-1 leading-relaxed opacity-80">
                Registration Number: <span className="font-extrabold text-blue-600 select-all">{registrationNumber || profile?.roll_number}</span>.{" "}
                {profile?.is_profile_completed
                  ? 'Your details are saved and will auto-populate during course enrollments.'
                  : 'Your registration is active. Click "Update Profile" to complete or update your details.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-500/10 cursor-pointer"
          >
            <Pencil className="w-4 h-4" />
            Update Profile
          </button>
        </div>

        {/* Profile Card Summary Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
          {/* Left Column: Profile Card Header */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-100 bg-slate-50 flex items-center justify-center">
                {uploadedUrls.photo_url ? (
                  <img src={uploadedUrls.photo_url} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl text-gray-300">👤</div>
                )}
              </div>
              <span className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 text-white rounded-full border-2 border-white flex items-center justify-center shadow-sm shrink-0">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">{formData.full_name}</h2>
              <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">{formData.qualification} Student</span>
              <p className="text-xs text-gray-400 mt-1">{userEmail}</p>
              {registrationNumber && (
                <div className="mt-3 inline-flex flex-col items-center bg-blue-50 border border-blue-100 rounded-xl px-3 py-1.5 shadow-sm">
                  <span className="text-[9px] uppercase font-bold text-blue-500 tracking-wider">Registration Number</span>
                  <span className="text-sm font-extrabold text-blue-700 tracking-wide select-all mt-0.5">{registrationNumber}</span>
                </div>
              )}
            </div>
            
            <div className="w-full border-t border-gray-100 pt-4 flex flex-col items-center">
              <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-250 px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                Profile Active
              </span>
            </div>
          </div>

          {/* Right Column: Details & Documents */}
          <div className="md:col-span-2 space-y-6">
            {/* Personal Details Section */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-5">
              <div className="flex justify-between items-center border-b border-gray-100 pb-2.5">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  Personal Details
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(true);
                    setCurrentStep(1);
                  }}
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-bold transition-colors cursor-pointer"
                >
                  <Pencil className="w-3 h-3" />
                  Edit
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
                {registrationNumber && (
                  <div className="sm:col-span-2 bg-blue-50/40 border border-blue-100/50 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <span className="text-xs font-bold text-blue-500 block uppercase tracking-wider">Registration Number</span>
                      <span className="text-lg font-extrabold text-blue-700 tracking-wide select-all">{registrationNumber}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium italic">Double-click to select & copy</span>
                  </div>
                )}
                <div>
                  <span className="text-xs font-bold text-gray-400 block uppercase">Mobile Number</span>
                  <span className="font-semibold text-gray-800">{formData.phone || "—"}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 block uppercase">Date of Birth</span>
                  <span className="font-semibold text-gray-800">{formData.dob || "—"}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 block uppercase">Gender</span>
                  <span className="font-semibold text-gray-800 capitalize">{formData.gender || "—"}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 block uppercase">Caste Category</span>
                  <span className="font-semibold text-gray-800">{formData.category || "—"}</span>
                </div>
              </div>
            </div>

            {/* Family Details Section */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-5">
              <div className="flex justify-between items-center border-b border-gray-100 pb-2.5">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  Family Details
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(true);
                    setCurrentStep(2);
                  }}
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-bold transition-colors cursor-pointer"
                >
                  <Pencil className="w-3 h-3" />
                  Edit
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
                <div>
                  <span className="text-xs font-bold text-gray-400 block uppercase">Father's Name</span>
                  <span className="font-semibold text-gray-800">{formData.father_name || "—"}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 block uppercase">Mother's Name</span>
                  <span className="font-semibold text-gray-800">{formData.mother_name || "—"}</span>
                </div>
              </div>
            </div>

            {/* Address Details */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-5">
              <div className="flex justify-between items-center border-b border-gray-100 pb-2.5">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  Permanent Residential Address
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(true);
                    setCurrentStep(3);
                  }}
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-bold transition-colors cursor-pointer"
                >
                  <Pencil className="w-3 h-3" />
                  Edit
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 text-sm">
                <div className="col-span-2">
                  <span className="text-xs font-bold text-gray-400 block uppercase">Village / City</span>
                  <span className="font-semibold text-gray-800">{formData.village || "—"}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 block uppercase">Post Office</span>
                  <span className="font-semibold text-gray-800">{formData.post || "—"}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 block uppercase">District</span>
                  <span className="font-semibold text-gray-800">{formData.district || "—"}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 block uppercase">State</span>
                  <span className="font-semibold text-gray-800">{formData.state || "—"}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 block uppercase">Pin Code</span>
                  <span className="font-semibold text-gray-800">{formData.pin || "—"}</span>
                </div>
              </div>
            </div>

            {/* Academic Qualification Section */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-5">
              <div className="flex justify-between items-center border-b border-gray-100 pb-2.5">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  Academic Qualification
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(true);
                    setCurrentStep(4);
                  }}
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-bold transition-colors cursor-pointer"
                >
                  <Pencil className="w-3 h-3" />
                  Edit
                </button>
              </div>
              <div className="text-sm">
                <span className="text-xs font-bold text-gray-400 block uppercase">Highest Qualification</span>
                <span className="font-semibold text-gray-800">{formData.qualification || "—"} Student</span>
              </div>
            </div>

            {/* Verification Documents */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-gray-100 pb-2.5">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  Verified Academic & Identity Documents
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(true);
                    setCurrentStep(5);
                  }}
                  className="inline-flex items-center gap-1 text-xs text-blue-655 text-blue-600 hover:text-blue-800 font-bold transition-colors cursor-pointer"
                >
                  <Pencil className="w-3 h-3" />
                  Edit
                </button>
              </div>
              
              <div className="divide-y divide-gray-100">
                {/* Profile Photo */}
                <div className="py-3 flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-700">Profile Photo</span>
                    {uploadedUrls.photo_url && (
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200">
                        <img src={uploadedUrls.photo_url} alt="Profile Thumbnail" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  {uploadedUrls.photo_url ? (
                    <a 
                      href={uploadedUrls.photo_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      Uploaded - Click to View
                    </a>
                  ) : (
                    <span className="text-xs text-red-500 font-medium">Not Uploaded</span>
                  )}
                </div>

                {/* Signature */}
                <div className="py-3 flex justify-between items-center text-sm">
                  <span className="font-semibold text-gray-700">Student Signature</span>
                  {uploadedUrls.signature_url ? (
                    <a 
                      href={uploadedUrls.signature_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      Uploaded - Click to View
                    </a>
                  ) : (
                    <span className="text-xs text-red-500 font-medium">Not Uploaded</span>
                  )}
                </div>

                {/* Qualification Marksheet */}
                <div className="py-3 flex justify-between items-center text-sm">
                  <span className="font-semibold text-gray-700">{docInfo.title}</span>
                  {uploadedUrls.identity_proof_url ? (
                    <a 
                      href={uploadedUrls.identity_proof_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      Uploaded - Click to View
                    </a>
                  ) : (
                    <span className="text-xs text-red-500 font-medium">Not Uploaded</span>
                  )}
                </div>

                {/* Aadhar Card */}
                <div className="py-3 flex justify-between items-center text-sm">
                  <span className="font-semibold text-gray-700">Aadhar Card</span>
                  {uploadedUrls.aadhar_proof_url ? (
                    <a 
                      href={uploadedUrls.aadhar_proof_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      Uploaded - Click to View
                    </a>
                  ) : (
                    <span className="text-xs text-red-500 font-medium">Not Uploaded</span>
                  )}
                </div>

                {/* Caste Certificate (if applicable) */}
                {formData.category !== "General" && (
                  <div className="py-3 flex justify-between items-center text-sm">
                    <span className="font-semibold text-gray-700">Caste Certificate ({formData.category})</span>
                    {uploadedUrls.caste_proof_url ? (
                      <a 
                        href={uploadedUrls.caste_proof_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        Uploaded - Click to View
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400 font-medium">Not Uploaded</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {hasRegistration && (
        <div className="flex justify-between items-center bg-blue-50 border border-blue-150 text-blue-900 rounded-2xl p-4 shadow-sm animate-in fade-in duration-300">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="text-base">✍️</span>
            <span>You are editing your registered profile (Reg No: <span className="font-bold text-blue-600 select-all">{registrationNumber}</span>). Click "Update Details" on any step to save changes instantly.</span>
          </div>
          {profile?.is_profile_completed && (
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer shrink-0"
            >
              Cancel & View Profile
            </button>
          )}
        </div>
      )}
      {/* Status banner */}
      {profile?.is_profile_completed ? (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-5 flex items-start gap-4">
          <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-sm">Profile Complete & Verified</h3>
            <p className="text-xs text-emerald-600 mt-1">
              Your profile is registered with Registration Number: <span className="font-extrabold text-blue-600 select-all">{registrationNumber}</span>. When you enroll in any new course, your details will be pre-filled automatically!
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl p-5 flex items-start gap-4 animate-in fade-in duration-300">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-2 w-full">
            <h3 className="font-bold text-sm text-amber-900">Complete Your Profile</h3>
            {registrationNumber && (
              <div className="inline-block bg-amber-100 border border-amber-200 rounded-lg px-2.5 py-1 mb-1">
                <span className="text-[9px] uppercase font-bold text-amber-600 block tracking-wider">Registration Number</span>
                <span className="text-xs font-extrabold text-amber-800 tracking-wide select-all">{registrationNumber}</span>
              </div>
            )}
            <p className="text-xs text-amber-700 leading-relaxed font-medium">
              Please complete the following missing sections to register your student profile:
            </p>
            <ul className="space-y-1 bg-white/40 border border-amber-100 rounded-xl p-3 text-xs text-amber-800 font-semibold list-none">
              {getMissingFields().map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[11px] leading-relaxed">
                  <span className="text-red-500 font-black shrink-0 mt-0.5">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[10px] text-amber-500 pt-1">
              {registrationNumber 
                ? `💡 Your registration number is registered. Please complete the missing fields.`
                : `💡 Once all sections are completed, you will receive your official sequential Registration Number.`}
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-semibold flex items-center gap-3 animate-in fade-in duration-300">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-3 animate-in fade-in duration-300">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          Profile updated successfully!
        </div>
      )}

      {/* Stepper Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm overflow-x-auto">
        <div className="min-w-[480px] flex justify-between items-center relative">
          <div className="absolute top-4.5 left-0 right-0 h-[2px] bg-gray-100 -z-10 rounded"></div>
          
          {steps.map((st) => {
            const isActive = currentStep === st.stepNum;
            const isCompleted = maxCompletedStep > st.stepNum || hasRegistration;
            const isSelectable = st.stepNum <= maxCompletedStep || hasRegistration;
            
            return (
              <button
                key={st.stepNum}
                type="button"
                onClick={() => isSelectable && jumpToStep(st.stepNum)}
                disabled={!isSelectable}
                className="flex flex-col items-center flex-1 cursor-pointer transition-all duration-300 relative z-10 disabled:cursor-not-allowed"
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
                <span className={`text-[10px] font-bold mt-2 tracking-wide uppercase transition-colors duration-300 ${
                  isActive ? "text-blue-600" : isCompleted ? "text-emerald-600" : "text-slate-400"
                }`}>
                  {st.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
        
        {/* STEP 1: Basic Details (includes demographics now) */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" /> Step 1: Basic Details & Demographics
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  required
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-semibold text-gray-900 bg-white"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Email Address</label>
                <input
                  type="email"
                  disabled
                  value={userEmail}
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-400 outline-none text-sm font-semibold cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-semibold text-gray-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  required
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-semibold text-gray-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Gender</label>
                <select
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-semibold text-gray-900 cursor-pointer bg-white"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Caste / Category</label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-semibold text-gray-900 cursor-pointer bg-white"
                >
                  <option value="">Select Category</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-between items-center gap-3">
              {hasRegistration && (
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleSectionUpdate()}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update Details"}
                </button>
              )}
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto px-5 py-2.5 bg-blue-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Family Details */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-600" /> Step 2: Family Details
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Father's Name</label>
                <input
                  type="text"
                  name="father_name"
                  required
                  value={formData.father_name}
                  onChange={handleChange}
                  placeholder="Father's full name"
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-semibold text-gray-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Mother's Name</label>
                <input
                  type="text"
                  name="mother_name"
                  required
                  value={formData.mother_name}
                  onChange={handleChange}
                  placeholder="Mother's full name"
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-semibold text-gray-900 bg-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-between items-center gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2.5 bg-white border border-gray-200 text-gray-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <div className="flex items-center gap-3">
                {hasRegistration && (
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleSectionUpdate()}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? "Updating..." : "Update Details"}
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Address */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" /> Step 3: Residential Address Details
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Village / City</label>
                <input
                  type="text"
                  name="village"
                  required
                  value={formData.village}
                  onChange={handleChange}
                  placeholder="Village or city name"
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-semibold text-gray-900 bg-white"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Post Office</label>
                <input
                  type="text"
                  name="post"
                  required
                  value={formData.post}
                  onChange={handleChange}
                  placeholder="Post Office name"
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-semibold text-gray-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">District</label>
                {formData.state === "Chhattisgarh" ? (
                  <select
                    name="district"
                    required
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-semibold text-gray-900 cursor-pointer bg-white"
                  >
                    <option value="">Select District</option>
                    {CHHATTISGARH_DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    name="district"
                    required
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="District"
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-semibold text-gray-900 bg-white"
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">State</label>
                <select
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-semibold text-gray-900 cursor-pointer bg-white"
                >
                  <option value="">Select State</option>
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Pin Code</label>
                <input
                  type="text"
                  name="pin"
                  required
                  maxLength={6}
                  value={formData.pin}
                  onChange={e => setFormData(prev => ({ ...prev, pin: e.target.value.replace(/\D/g, "") }))}
                  placeholder="6-digit PIN code"
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-semibold text-gray-900 bg-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-between items-center gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2.5 bg-white border border-gray-200 text-gray-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <div className="flex items-center gap-3">
                {hasRegistration && (
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleSectionUpdate()}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? "Updating..." : "Update Details"}
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Qualification Details */}
        {currentStep === 4 && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-600" /> Step 4: Highest Academic Qualification
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Highest Qualification</label>
                <select
                  name="qualification"
                  required
                  value={formData.qualification}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-semibold text-gray-900 cursor-pointer bg-white"
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
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-between items-center gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2.5 bg-white border border-gray-200 text-gray-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <div className="flex items-center gap-3">
                {hasRegistration && (
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleSectionUpdate()}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? "Updating..." : "Update Details"}
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Document Uploads */}
        {currentStep === 5 && (
          <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-2">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Upload className="w-4 h-4 text-blue-600" /> Step 5: Document Uploads (Scanned Copies)
              </h3>
              <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-md font-semibold self-start sm:self-auto">
                ⚠️ Max File Size Limit: 100 KB
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              
              {/* Photo */}
              <div className="space-y-2 border border-gray-150 rounded-xl p-4 bg-gray-50/50 flex flex-col items-center">
                <span className="text-xs font-bold text-gray-600">Profile Photo</span>
                <div className="w-24 h-24 rounded-full overflow-hidden border border-slate-200 bg-white relative flex items-center justify-center">
                  {uploadedUrls.photo_url ? (
                    <img src={uploadedUrls.photo_url} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl">👤</span>
                  )}
                  {uploadProgress.photo > 0 && uploadProgress.photo < 100 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-extrabold">
                      {uploadProgress.photo}%
                    </div>
                  )}
                </div>
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg cursor-pointer transition-colors mt-2">
                  <Upload className="w-3.5 h-3.5" />
                  Upload Photo
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={e => e.target.files?.[0] && handleFileChange("photo", e.target.files[0])} 
                  />
                </label>
              </div>

              {/* Signature */}
              <div className="space-y-2 border border-gray-150 rounded-xl p-4 bg-gray-50/50 flex flex-col items-center">
                <span className="text-xs font-bold text-gray-600">Student Signature</span>
                <div className="w-32 h-16 rounded border border-slate-200 bg-white relative flex items-center justify-center p-2">
                  {uploadedUrls.signature_url ? (
                    <img src={uploadedUrls.signature_url} alt="Signature" className="max-h-full max-w-full object-contain" />
                  ) : (
                    <span className="text-xl">✍️</span>
                  )}
                  {uploadProgress.signature > 0 && uploadProgress.signature < 100 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-extrabold">
                      {uploadProgress.signature}%
                    </div>
                  )}
                </div>
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg cursor-pointer transition-colors mt-2">
                  <Upload className="w-3.5 h-3.5" />
                  Upload Signature
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={e => e.target.files?.[0] && handleFileChange("signature", e.target.files[0])} 
                  />
                </label>
              </div>

              {/* Qualification Certificate */}
              <div className="space-y-2 border border-gray-150 rounded-xl p-4 bg-gray-50/50 flex flex-col items-center text-center">
                <span className="text-xs font-bold text-gray-600">{docInfo.title}</span>
                <div className="w-28 h-20 rounded border border-slate-200 bg-white relative flex items-center justify-center overflow-hidden">
                  {uploadedUrls.identity_proof_url ? (
                    <img src={uploadedUrls.identity_proof_url} alt={docInfo.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl">{docInfo.icon}</span>
                  )}
                  {uploadProgress.identity > 0 && uploadProgress.identity < 100 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-extrabold">
                      {uploadProgress.identity}%
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-gray-400 max-w-[150px] leading-tight mt-1">{docInfo.description}</span>
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg cursor-pointer transition-colors mt-2">
                  <Upload className="w-3.5 h-3.5" />
                  {docInfo.buttonText}
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={e => e.target.files?.[0] && handleFileChange("identity", e.target.files[0])} 
                  />
                </label>
              </div>

              {/* Aadhar Card */}
              <div className="space-y-2 border border-gray-150 rounded-xl p-4 bg-gray-50/50 flex flex-col items-center text-center">
                <span className="text-xs font-bold text-gray-600">Aadhar Card</span>
                <div className="w-28 h-20 rounded border border-slate-200 bg-white relative flex items-center justify-center overflow-hidden">
                  {uploadedUrls.aadhar_proof_url ? (
                    <img src={uploadedUrls.aadhar_proof_url} alt="Aadhar Card" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl">🪪</span>
                  )}
                  {uploadProgress.aadhar > 0 && uploadProgress.aadhar < 100 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-extrabold">
                      {uploadProgress.aadhar}%
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-gray-400 max-w-[150px] leading-tight mt-1">Scanned PDF or Image of Aadhar Card</span>
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg cursor-pointer transition-colors mt-2">
                  <Upload className="w-3.5 h-3.5" />
                  Upload Aadhar
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={e => e.target.files?.[0] && handleFileChange("aadhar", e.target.files[0])} 
                  />
                </label>
              </div>

              {/* Caste Certificate */}
              {formData.category !== "General" && (
                <div className="space-y-2 border border-gray-150 rounded-xl p-4 bg-gray-50/50 flex flex-col items-center text-center">
                  <span className="text-xs font-bold text-gray-600">Caste Certificate (Optional)</span>
                  <div className="w-28 h-20 rounded border border-slate-200 bg-white relative flex items-center justify-center overflow-hidden">
                    {uploadedUrls.caste_proof_url ? (
                      <img src={uploadedUrls.caste_proof_url} alt="Caste Certificate" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl">📜</span>
                    )}
                    {uploadProgress.caste > 0 && uploadProgress.caste < 100 && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-extrabold">
                        {uploadProgress.caste}%
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-400 max-w-[150px] leading-tight mt-1">Caste Certificate for {formData.category} category (Optional)</span>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg cursor-pointer transition-colors mt-2">
                    <Upload className="w-3.5 h-3.5" />
                    Upload Certificate
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={e => e.target.files?.[0] && handleFileChange("caste", e.target.files[0])} 
                    />
                  </label>
                </div>
              )}

            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2.5 bg-white border border-gray-200 text-gray-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-blue-600 hover:bg-slate-900 text-white font-bold rounded-xl text-xs transition-all duration-200 hover:shadow-lg disabled:opacity-50 flex items-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {hasRegistration ? "Updating Profile..." : "Saving Profile..."}
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    {hasRegistration ? "Update Details" : "Save & Complete Profile"}
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </div>

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-gray-150 rounded-3xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Top design accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600"></div>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Smartphone className="w-7 h-7" />
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-gray-900">Verify Your Phone Number</h3>
                <p className="text-xs text-gray-500 mt-1">
                  We have sent a 6-digit OTP to +91 {formData.phone || "your number"}.
                </p>
              </div>


              {otpError && (
                <div className="w-full p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold text-center">
                  {otpError}
                </div>
              )}

              <form onSubmit={handleVerifyOtpAndSubmit} className="w-full space-y-5">
                {/* OTP Digit Boxes */}
                <div className="flex justify-center gap-2.5">
                  {otpValues.map((val, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      autoComplete="one-time-code"
                      maxLength={1}
                      required
                      value={val}
                      onChange={e => handleOtpChange(index, e.target.value)}
                      onKeyDown={e => handleOtpKeyDown(index, e)}
                      onPaste={handleOtpPaste}
                      className="w-11 h-12 text-center text-xl font-extrabold text-gray-900 border border-gray-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 rounded-xl bg-gray-50 focus:bg-white outline-none transition-all"
                    />
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => setShowOtpModal(false)}
                    className="flex-1 h-11 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || otpCode.length !== 6}
                    className="flex-1 h-11 bg-blue-600 hover:bg-slate-900 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verifying...
                      </>
                    ) : (
                      <>Verify & Save</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Registration Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-gray-150 rounded-3xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Top design accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-500"></div>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                <CheckCircle className="w-10 h-10" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900">Profile Complete!</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Congratulations! Your student profile has been verified and registered.
                </p>
              </div>

              {/* Registration / Roll Number card */}
              <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col items-center gap-1 shadow-sm">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Registration Number</span>
                <span className="text-2xl font-extrabold text-blue-600 tracking-wide select-all">{registrationNumber}</span>
                <span className="text-[10px] text-gray-400 mt-1">Double click to copy</span>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-xs text-emerald-800 text-center leading-normal">
                📱 An SMS containing your registration number has been sent to +91 {formData.phone}. Use this registration number for all future course applications.
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowSuccessModal(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  router.refresh();
                }}
                className="w-full h-11 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
