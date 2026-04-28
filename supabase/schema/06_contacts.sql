-- ==========================================
-- 06. CONTACT REQUESTS
-- ==========================================

CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    is_resolved BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all contacts" ON public.contacts FOR SELECT USING (public.is_admin());
CREATE POLICY "Anyone can submit a contact form" ON public.contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can update contacts" ON public.contacts FOR UPDATE USING (public.is_admin());
