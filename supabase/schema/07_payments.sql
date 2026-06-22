-- ==========================================
-- 📌 STATUS ENUM
-- ==========================================
DO $$ BEGIN
  CREATE TYPE public.payment_status AS ENUM ('pending', 'completed', 'failed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ==========================================
-- 💳 ADMISSION PAYMENTS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.admission_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admission_id UUID NOT NULL REFERENCES public.admissions(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,
    status public.payment_status DEFAULT 'pending' NOT NULL,
    payment_method TEXT, -- e.g., 'UPI', 'QR', 'SMEPay Link'
    transaction_id TEXT UNIQUE, -- SMEPay reference ID
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ==========================================
-- ⚡ INDEXES (PERFORMANCE)
-- ==========================================
CREATE INDEX IF NOT EXISTS idx_admission_payments_admission ON public.admission_payments(admission_id);
CREATE INDEX IF NOT EXISTS idx_admission_payments_status ON public.admission_payments(status);
CREATE INDEX IF NOT EXISTS idx_admission_payments_created_at ON public.admission_payments(created_at DESC);

-- ==========================================
-- 🔄 UPDATED_AT TRIGGER
-- ==========================================
CREATE OR REPLACE FUNCTION public.set_admission_payment_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_admission_payments_updated_at ON public.admission_payments;

CREATE TRIGGER trg_admission_payments_updated_at
BEFORE UPDATE ON public.admission_payments
FOR EACH ROW EXECUTE FUNCTION public.set_admission_payment_updated_at();

-- Disable RLS (to match admissions table style)
ALTER TABLE public.admission_payments DISABLE ROW LEVEL SECURITY;
