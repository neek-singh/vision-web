-- ==========================================
-- 🎓 COURSES SYSTEM (FINAL FIXED)
-- ==========================================

CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    course_code TEXT UNIQUE NOT NULL,

    title TEXT NOT NULL,
    description TEXT,
    duration TEXT,

    fee NUMERIC(10,2) CHECK (fee >= 0),
    discount_fee NUMERIC(10,2) CHECK (discount_fee >= 0),

    image_url TEXT,

    rating NUMERIC(2,1) DEFAULT 4.8 CHECK (rating >= 0 AND rating <= 5),
    enrolled_count INTEGER DEFAULT 0,

    admission_closes DATE,
    learning_format TEXT DEFAULT 'Offline',

    key_features TEXT[],
    career_opportunities TEXT[],
    hiring_companies JSONB DEFAULT '[]'::jsonb,
    skills_developed TEXT[],

    curriculum JSONB DEFAULT '[]'::jsonb,
    tools_covered JSONB DEFAULT '[]'::jsonb,
    projects JSONB DEFAULT '[]'::jsonb,
    trainers JSONB DEFAULT '[]'::jsonb,

    target_audience TEXT,
    faqs JSONB DEFAULT '[]'::jsonb,

    is_featured BOOLEAN DEFAULT false,

    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ==========================================
-- ⚡ INDEXES
-- ==========================================
CREATE INDEX IF NOT EXISTS idx_courses_id ON public.courses(id);
CREATE INDEX IF NOT EXISTS idx_courses_featured ON public.courses(is_featured);

-- ==========================================
-- 🔄 UPDATED_AT TRIGGER
-- ==========================================
CREATE OR REPLACE FUNCTION public.set_course_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_courses_updated_at ON public.courses;

CREATE TRIGGER trg_courses_updated_at
BEFORE UPDATE ON public.courses
FOR EACH ROW EXECUTE FUNCTION public.set_course_updated_at();

-- ==========================================
-- 🔐 RLS
-- ==========================================
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Courses are viewable by everyone"
ON public.courses
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage courses"
ON public.courses
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());