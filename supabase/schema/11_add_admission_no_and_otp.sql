-- =======================================================
-- 📄 Add Admission No and Admission OTPs table
-- =======================================================

ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS admission_no TEXT UNIQUE;

CREATE TABLE IF NOT EXISTS public.admission_otps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone TEXT NOT NULL,
    otp TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Disable Row Level Security (RLS) to match public admission flow
ALTER TABLE public.admission_otps DISABLE ROW LEVEL SECURITY;
