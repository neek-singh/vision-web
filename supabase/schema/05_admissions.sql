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

    -- 🔐 User (Required)
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

    student_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,

    -- 🎓 Course relation (IMPORTANT)
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,

    status public.admission_status DEFAULT 'pending' NOT NULL,

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

-- ✅ Prevent duplicate applications
CREATE UNIQUE INDEX IF NOT EXISTS unique_user_course
ON public.admissions(user_id, course_id);

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
-- 🔐 RLS ENABLE
-- ==========================================
ALTER TABLE public.admissions ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- 👤 USER POLICIES
-- ==========================================

-- User can view own admissions
CREATE POLICY "Users can view own admissions"
ON public.admissions
FOR SELECT
USING (auth.uid() = user_id);

-- User can insert only their own data
CREATE POLICY "Users can insert own admission"
ON public.admissions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- ==========================================
-- 👑 ADMIN POLICY
-- ==========================================

-- Requires public.is_admin() function
CREATE POLICY "Admins manage admissions"
ON public.admissions
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());