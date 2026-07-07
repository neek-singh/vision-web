"use server";

import { createPublicSupabaseClient } from "@/lib/supabase-server";

/**
 * Fetch the current likes count for a blog post slug.
 */
export async function getBlogLikes(slug: string): Promise<number> {
  if (!slug) return 0;
  
  try {
    const supabase = createPublicSupabaseClient();
    const { data, error } = await supabase
      .from("blog_likes")
      .select("likes_count")
      .eq("blog_slug", slug)
      .maybeSingle();

    if (error) {
      console.error("Error fetching blog likes:", error);
      return 0;
    }

    return data ? data.likes_count : 0;
  } catch (e) {
    console.error("Exception fetching blog likes:", e);
    return 0;
  }
}

/**
 * Safely toggle (increment or decrement) the likes count of a blog post.
 */
export async function toggleBlogLike(slug: string, increment: boolean): Promise<number> {
  if (!slug) return 0;

  try {
    const supabase = createPublicSupabaseClient();
    const functionName = increment ? "increment_blog_likes" : "decrement_blog_likes";

    const { data, error } = await supabase.rpc(functionName, {
      target_slug: slug,
    });

    if (error) {
      console.error(`Error executing RPC ${functionName}:`, error);
      
      // Fallback: If RPC is not available or errors, do a standard update/upsert
      const currentLikes = await getBlogLikes(slug);
      const targetLikes = increment ? currentLikes + 1 : Math.max(0, currentLikes - 1);
      
      const { data: upsertData, error: upsertError } = await supabase
        .from("blog_likes")
        .upsert({ blog_slug: slug, likes_count: targetLikes, updated_at: new Date().toISOString() })
        .select("likes_count")
        .maybeSingle();
        
      if (upsertError) {
        console.error("Upsert fallback failed:", upsertError);
        return currentLikes;
      }
      
      return upsertData ? upsertData.likes_count : targetLikes;
    }

    return typeof data === "number" ? data : 0;
  } catch (e) {
    console.error("Exception toggling blog likes:", e);
    return 0;
  }
}
