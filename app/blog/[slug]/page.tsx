import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogActions } from "@/features/blog/components/BlogActions";
import { getBlogLikes } from "@/features/blog/actions/blog";

export const revalidate = 0;

async function getBlogBySlug(slug: string) {
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
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return { title: "Blog Not Found" };
  }

  // Generate absolute URL for the image (required by WhatsApp/Facebook scrapers)
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://visionitcomputerinstitute.com";
  const absoluteImageUrl = blog.image_url 
    ? (blog.image_url.startsWith("http") ? blog.image_url : `${siteUrl}${blog.image_url}`)
    : `${siteUrl}/og-image.png`;

  return {
    title: `${blog.title} | Vision IT Blog`,
    description: blog.excerpt || `Read ${blog.title}`,
    openGraph: {
      title: blog.title,
      description: blog.excerpt || `Read ${blog.title}`,
      type: "article",
      url: `${siteUrl}/blog/${slug}`,
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt || `Read ${blog.title}`,
      images: [absoluteImageUrl],
    },
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

  // Load all blogs to find related ones
  const blogsFilePath = path.join(process.cwd(), "features", "blog", "data", "blogs.json");
  let relatedBlogs: any[] = [];
  try {
    if (fs.existsSync(blogsFilePath)) {
      const fileData = fs.readFileSync(blogsFilePath, "utf-8");
      const allBlogs = JSON.parse(fileData);
      relatedBlogs = allBlogs
        .filter((b: any) => b.slug !== slug && b.is_published !== false)
        .sort((a: any, b: any) => {
          const dateA = new Date(a.published_at || a.created_at || 0).getTime();
          const dateB = new Date(b.published_at || b.created_at || 0).getTime();
          return dateB - dateA;
        })
        .slice(0, 3);
    }
  } catch (e) {
    console.error("Error loading related blogs:", e);
  }

  return (
    <main className="w-full bg-slate-50 min-h-screen pb-32">
      {/* Premium Hero Section (Clean Light Theme) */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200 py-20 lg:py-24">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-blue-100/80 to-white pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-300/80 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-32 -left-24 w-72 h-72 bg-indigo-300/80 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center px-6">
          {/* Back Button */}
          <div className="flex justify-start mb-8 -mt-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors bg-slate-50 hover:bg-slate-100 border border-slate-200 px-4 py-2 rounded-full shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
              <span>Back to Blog</span>
            </Link>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            {blog.published_at || blog.created_at
              ? new Date(blog.published_at || blog.created_at).toLocaleDateString('en-IN', {
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
            href="/inquiry"
            variant="primary" 
            className="rounded-2xl px-6 py-2.5 text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/10 hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5"
          >
            Start Learning
          </Button>
        </div>
      </section>

      {/* Related Blogs Section */}
      {relatedBlogs.length > 0 && (
        <section className="max-w-3xl mx-auto px-6 border-t border-slate-200/80 pt-16 mt-20">
          <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-8 text-center tracking-tight">
            Related Articles
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedBlogs.map((item) => (
              <Link 
                href={`/blog/${item.slug}`} 
                key={item.id}
                className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                {item.image_url && (
                  <div className="relative w-full h-44 overflow-hidden bg-slate-100">
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
                
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
                      {item.category || "Recent"}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {item.published_at || item.created_at
                        ? new Date(item.published_at || item.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })
                        : ""}
                    </span>
                  </div>
                  
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-sm sm:text-base leading-snug mb-2 line-clamp-2">
                    {item.title}
                  </h4>
                  
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4">
                    {item.excerpt}
                  </p>
                  
                  <span className="text-blue-600 font-bold text-xs mt-auto inline-flex items-center gap-1">
                    Read Article
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}