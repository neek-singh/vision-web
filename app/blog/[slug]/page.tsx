import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import fs from "fs";
import path from "path";
import Image from "next/image";
import { unstable_cache } from "next/cache";
import { BlogActions } from "@/features/blog/components/BlogActions";
import { getBlogLikes } from "@/features/blog/actions/blog";

export const revalidate = 3600;

const getBlogBySlug = unstable_cache(
  async (slug: string) => {
    const blogsFilePath = path.join(process.cwd(), "features", "blog", "data", "blogs.json");
    try {
      if (fs.existsSync(blogsFilePath)) {
        const fileData = fs.readFileSync(blogsFilePath, "utf-8");
        const blogs = JSON.parse(fileData);
        return blogs.find((b: any) => b.slug === slug);
      }
    } catch (e) {
      console.error("Error loading blog by slug:", e);
    }
    return null;
  },
  ["blog-detail"],
  { revalidate: 3600, tags: ["blogs"] }
);

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return { title: "Blog Not Found" };
  }

  return {
    title: `${blog.title} | Vision IT Blog`,
    description: blog.excerpt || `Read ${blog.title}`,
  };
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return notFound();
  }
  
  const initialLikes = await getBlogLikes(slug);
  const cleanContent = blog.content.replace(/^<h1>.*?<\/h1>\s*/i, "");

  return (
    <main className="w-full bg-slate-50 min-h-screen pb-32">
      {/* Premium Hero Section (Clean Light Theme) */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200 py-20 lg:py-24">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-blue-100/80 to-white pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-300/80 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-32 -left-24 w-72 h-72 bg-indigo-300/80 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            {blog.created_at
              ? new Date(blog.created_at).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })
              : "Recent Update"}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-snug">
            {blog.title}
          </h1>

          {blog.excerpt && (
            <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
              {blog.excerpt}
            </p>
          )}
        </div>
      </section>

      {/* Main Image */}
      {blog.image_url && (
        <div className="max-w-4xl mx-auto px-6 -mt-8 md:-mt-12 relative z-10">
          <div className="relative w-full aspect-[2/1] rounded-[2rem] overflow-hidden shadow-lg border border-slate-200/40">
            <Image
              src={blog.image_url}
              alt={blog.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 80vw"
              priority
            />
          </div>
        </div>
      )}

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 mt-16">
        <BlogActions blogSlug={slug} initialLikes={initialLikes} blogTitle={blog.title} />

        <div 
          className="blog-html-content text-slate-800 text-sm md:text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: cleanContent }} 
        />

        <BlogActions blogSlug={slug} initialLikes={initialLikes} blogTitle={blog.title} />

        {/* CTA Buttons */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-wrap gap-4 justify-center">
          <Button 
            href="/blog" 
            variant="outline"
            className="rounded-2xl px-6 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 transition-all duration-300 hover:-translate-y-0.5"
          >
            ← Back to Blog
          </Button>
          <Button 
            href="/admissions"
            variant="primary" 
            className="rounded-2xl px-6 py-2.5 text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/10 hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5"
          >
            Start Learning
          </Button>
        </div>
      </section>
    </main>
  );
}