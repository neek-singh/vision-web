-- ==========================================
-- 🔥 EXTENSION
-- ==========================================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==========================================
-- 📌 STATUS ENUM
-- ==========================================
DO $$ BEGIN
  CREATE TYPE public.admission_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ==========================================
-- 📄 ADMISSIONS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.admissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- 🔐 User (Optional to allow public submissions)
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,

    student_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,

    -- 🎓 Course relation (IMPORTANT)
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,

    status public.admission_status DEFAULT 'pending' NOT NULL,

    -- 📋 Additional Pipeline Info
    father_name TEXT,
    mother_name TEXT,
    dob DATE,
    gender TEXT,
    category TEXT,
    address TEXT,
    qualification TEXT,
    flow_step TEXT DEFAULT 'personal',
    document_verified BOOLEAN DEFAULT false,

    message TEXT,

    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ==========================================
-- ⚡ INDEXES (PERFORMANCE)
-- ==========================================
CREATE INDEX IF NOT EXISTS idx_admissions_user 
ON public.admissions(user_id);

CREATE INDEX IF NOT EXISTS idx_admissions_course 
ON public.admissions(course_id);

CREATE INDEX IF NOT EXISTS idx_admissions_status 
ON public.admissions(status);

CREATE INDEX IF NOT EXISTS idx_admissions_created_at 
ON public.admissions(created_at DESC);

-- ==========================================
-- ✅ DATA VALIDATION (INDIA READY)
-- ==========================================
ALTER TABLE public.admissions
ADD CONSTRAINT valid_email 
CHECK (email ~* '^[^@]+@[^@]+\.[^@]+$');

ALTER TABLE public.admissions
ADD CONSTRAINT valid_phone 
CHECK (phone ~ '^[6-9][0-9]{9}$');

-- ==========================================
-- 🔄 UPDATED_AT TRIGGER
-- ==========================================
CREATE OR REPLACE FUNCTION public.set_admission_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_admissions_updated_at ON public.admissions;

CREATE TRIGGER trg_admissions_updated_at
BEFORE UPDATE ON public.admissions
FOR EACH ROW EXECUTE FUNCTION public.set_admission_updated_at();

-- ==========================================
-- 🔐 RLS DISABLE
-- ==========================================
ALTER TABLE public.admissions DISABLE ROW LEVEL SECURITY;

-- Note: Policies are removed because RLS is disabled.
DROP POLICY IF EXISTS "Users can view own admissions" ON public.admissions;
DROP POLICY IF EXISTS "Users can insert own admission" ON public.admissions;
DROP POLICY IF EXISTS "Admins manage admissions" ON public.admissions;