-- ==========================================
-- 03. BLOGS SYSTEM (PRODUCTION READY)
-- ==========================================

-- Ensure extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==========================================
-- TABLE
-- ==========================================

CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    title TEXT NOT NULL,

    slug TEXT UNIQUE NOT NULL 
    CHECK (slug = lower(slug)),

    excerpt TEXT,
    content TEXT NOT NULL,

    cover_image TEXT,
    tags TEXT[] DEFAULT '{}',

    author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

    is_published BOOLEAN DEFAULT false NOT NULL,

    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ==========================================
-- INDEXES (PERFORMANCE)
-- ==========================================

CREATE INDEX IF NOT EXISTS idx_blogs_slug 
ON public.blogs(slug);

CREATE INDEX IF NOT EXISTS idx_blogs_published 
ON public.blogs(is_published);

CREATE INDEX IF NOT EXISTS idx_blogs_created_at 
ON public.blogs(created_at DESC);

-- ==========================================
-- RLS ENABLE
-- ==========================================

ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Public: only published blogs
CREATE POLICY "Public can view published blogs"
ON public.blogs
FOR SELECT
USING (is_published = true);

-- Admin: view all blogs
CREATE POLICY "Admin can view all blogs"
ON public.blogs
FOR SELECT
USING (public.is_admin());

-- Admin: full control
CREATE POLICY "Admin full access blogs"
ON public.blogs
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- ==========================================
-- UPDATED_AT TRIGGER
-- ==========================================

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_blogs_updated_at ON public.blogs;

CREATE TRIGGER trg_blogs_updated_at
BEFORE UPDATE ON public.blogs
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ==========================================
-- OPTIONAL (ADVANCED - SEARCH)
-- ==========================================

-- Add search vector column
ALTER TABLE public.blogs
ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- Index for full-text search
CREATE INDEX IF NOT EXISTS idx_blogs_search 
ON public.blogs USING GIN(search_vector);