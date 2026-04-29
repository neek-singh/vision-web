import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import fs from "fs";
import path from "path";
import Image from "next/image";

export const revalidate = 3600;

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const blogsFilePath = path.join(process.cwd(), "data", "blogs.json");
  
  let blog: any = null;
  try {
    if (fs.existsSync(blogsFilePath)) {
      const fileData = fs.readFileSync(blogsFilePath, "utf-8");
      const blogs = JSON.parse(fileData);
      blog = blogs.find((b: any) => b.slug === slug);
    }
  } catch (e) {
    console.error("Error loading blog metadata:", e);
  }

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
  const blogsFilePath = path.join(process.cwd(), "data", "blogs.json");
  
  let blog: any = null;
  try {
    if (fs.existsSync(blogsFilePath)) {
      const fileData = fs.readFileSync(blogsFilePath, "utf-8");
      const blogs = JSON.parse(fileData);
      blog = blogs.find((b: any) => b.slug === slug);
    }
  } catch (e) {
    console.error("Error loading blog post:", e);
  }

  if (!blog) {
    return notFound();
  }



  const cleanContent = blog.content.replace(/^<h1>.*?<\/h1>\s*/i, "");

  return (
    <main className="w-full bg-slate-50 pb-32 min-h-screen">

      {/* Premium Hero Section */}
      <section className="relative bg-[#0a0f1d] text-white pt-40 pb-32 rounded-b-[3rem] sm:rounded-b-[4rem] overflow-hidden shadow-2xl shadow-blue-950/20">
        {/* Soft Background Gradients & Grid */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto text-center px-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8 animate-in fade-in duration-500">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            {blog.created_at
              ? new Date(blog.created_at).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })
              : "Recent Update"}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-50 to-slate-300 animate-in slide-in-from-bottom-4 duration-700">
            {blog.title}
          </h1>

          {blog.excerpt && (
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed animate-in slide-in-from-bottom-6 duration-700 delay-150">
              {blog.excerpt}
            </p>
          )}
        </div>
      </section>


      {blog.image_url && (
        <div className="max-w-4xl mx-auto px-6 mt-12">
          <div className="relative w-full aspect-[21/9] rounded-[2rem] overflow-hidden shadow-xl">
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
      <section className="max-w-4xl mx-auto px-6 mt-16">

        <div 
          className="blog-html-content"
          dangerouslySetInnerHTML={{ __html: cleanContent }} 
        />

        {/* CTA */}
        <div className="mt-20 flex gap-4 justify-center">
          <Button href="/blog">← Back</Button>
          <Button href="/admissions">Start Learning</Button>
        </div>

      </section>
    </main>
  );
}