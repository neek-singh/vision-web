-- =======================================================
-- 📄 Create Blog Likes Table & Safe DB Functions
-- =======================================================

CREATE TABLE IF NOT EXISTS public.blog_likes (
    blog_slug TEXT PRIMARY KEY,
    likes_count INTEGER DEFAULT 0 NOT NULL CHECK (likes_count >= 0),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.blog_likes ENABLE ROW LEVEL SECURITY;

-- Allow public read access to likes
CREATE POLICY "Allow public read access to blog_likes" 
ON public.blog_likes 
FOR SELECT 
USING (true);

-- Allow public insert/update (so any client can trigger like increments/decrements)
CREATE POLICY "Allow public all access to blog_likes" 
ON public.blog_likes 
FOR ALL 
USING (true);

-- Function to safely increment blog likes (handles insert if doesn't exist)
CREATE OR REPLACE FUNCTION public.increment_blog_likes(target_slug TEXT)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    new_likes INTEGER;
BEGIN
    INSERT INTO public.blog_likes (blog_slug, likes_count)
    VALUES (target_slug, 1)
    ON CONFLICT (blog_slug)
    DO UPDATE SET likes_count = public.blog_likes.likes_count + 1, updated_at = now()
    RETURNING likes_count INTO new_likes;
    
    RETURN new_likes;
END;
$$;

-- Function to safely decrement blog likes (prevents negative values)
CREATE OR REPLACE FUNCTION public.decrement_blog_likes(target_slug TEXT)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    new_likes INTEGER;
BEGIN
    INSERT INTO public.blog_likes (blog_slug, likes_count)
    VALUES (target_slug, 0)
    ON CONFLICT (blog_slug)
    DO UPDATE SET likes_count = GREATEST(0, public.blog_likes.likes_count - 1), updated_at = now()
    RETURNING likes_count INTO new_likes;
    
    RETURN new_likes;
END;
$$;
