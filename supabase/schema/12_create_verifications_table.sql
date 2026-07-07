-- =======================================================
-- 📄 Create Verifications Table for Certificates & Marksheets
-- =======================================================

CREATE TABLE IF NOT EXISTS public.verifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    certificate_no TEXT UNIQUE,
    marksheet_no TEXT UNIQUE,
    admission_no TEXT UNIQUE,
    student_id TEXT,
    roll_number TEXT UNIQUE NOT NULL,
    student_name TEXT NOT NULL,
    father_name TEXT NOT NULL,
    mother_name TEXT,
    dob DATE,
    course_name TEXT NOT NULL,
    course_duration TEXT NOT NULL,
    issue_date DATE NOT NULL,
    grade TEXT NOT NULL,
    percentage NUMERIC(5,2) CHECK (percentage >= 0 AND percentage <= 100),
    total_marks INTEGER,
    obtained_marks INTEGER,
    certificate_url TEXT,
    marksheet_url TEXT,
    status TEXT DEFAULT 'Authentic' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexing for performance
CREATE INDEX IF NOT EXISTS idx_verifications_roll ON public.verifications(roll_number);
CREATE INDEX IF NOT EXISTS idx_verifications_cert ON public.verifications(certificate_no);
CREATE INDEX IF NOT EXISTS idx_verifications_marks ON public.verifications(marksheet_no);
CREATE INDEX IF NOT EXISTS idx_verifications_admission ON public.verifications(admission_no);
CREATE INDEX IF NOT EXISTS idx_verifications_student_id ON public.verifications(student_id);

-- Enable RLS
ALTER TABLE public.verifications ENABLE ROW LEVEL SECURITY;

-- Allow public read access (select)
CREATE POLICY "Allow public read access to verifications" 
ON public.verifications 
FOR SELECT 
USING (true);

-- Allow admin full access (insert/update/delete)
CREATE POLICY "Allow admin full access to verifications"
ON public.verifications
FOR ALL
USING (public.is_admin());

-- Seed initial test verification records
INSERT INTO public.verifications (
    certificate_no,
    marksheet_no,
    admission_no,
    student_id,
    roll_number,
    student_name,
    father_name,
    mother_name,
    dob,
    course_name,
    course_duration,
    issue_date,
    grade,
    percentage,
    total_marks,
    obtained_marks,
    status
) VALUES 
(
    'VIT/2026/0001',
    'MS-VIT-2026-001',
    'VIT2026ADM01',
    'VIT2026STU01',
    'VIT20260001',
    'Nita Kumari',
    'Rajesh Kumar',
    'Sita Kumari',
    '2004-05-12',
    'Diploma in Computer Applications (DCA)',
    '12 Months',
    '2026-06-30',
    'A+',
    89.25,
    800,
    714,
    'Authentic'
),
(
    'VIT/2026/0002',
    'MS-VIT-2026-002',
    'VIT2026ADM02',
    'VIT2026STU02',
    'VIT20260002',
    'Ram Kumar',
    'Suresh Kumar',
    'Kiran Kumar',
    '2003-10-25',
    'Advanced Diploma in Computer Applications (ADCA)',
    '12 Months',
    '2026-06-30',
    'A',
    82.50,
    1000,
    825,
    'Authentic'
),
(
    null,
    null,
    'VIT2026ADM03',
    'VIT2026STU03',
    'VIT20260003',
    'Amit Sharma',
    'Vijay Sharma',
    'Sita Sharma',
    '2005-08-15',
    'Full Stack Web Development',
    '6 Months',
    '2026-05-01',
    'Ongoing',
    null,
    null,
    null,
    'Running'
)
ON CONFLICT (roll_number) DO NOTHING;
