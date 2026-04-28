-- ==========================================
-- GALLERY TABLE
-- ==========================================

CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ==========================================
-- RLS
-- ==========================================

ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view gallery"
ON public.gallery
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage gallery"
ON public.gallery
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- ==========================================
-- STORAGE BUCKET
-- ==========================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- ==========================================
-- STORAGE POLICIES
-- ==========================================

-- Public Read
CREATE POLICY "Public Gallery Access"
ON storage.objects
FOR SELECT
USING (bucket_id = 'gallery');

-- Admin Upload (restricted types)
CREATE POLICY "Admin Upload Gallery"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'gallery'
  AND public.is_admin()
  AND (storage.extension(name) IN ('jpg','jpeg','png','webp'))
);

-- Admin Delete
CREATE POLICY "Admin Delete Gallery"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'gallery'
  AND public.is_admin()
);

-- Admin Update (NEW ✅)
CREATE POLICY "Admin Update Gallery"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'gallery'
  AND public.is_admin()
);
