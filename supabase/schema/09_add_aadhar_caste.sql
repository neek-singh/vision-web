-- =======================================================
-- 📄 Add Aadhar Card and Caste Certificate to Profiles and Admissions
-- =======================================================

-- Profiles table columns
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS aadhar_proof_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS caste_proof_url TEXT;

-- Admissions table columns
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS mother_name TEXT;
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS aadhar_proof_url TEXT;
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS caste_proof_url TEXT;
