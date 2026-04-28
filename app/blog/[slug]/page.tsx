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



  return (
    <main className="w-full bg-white pb-32 min-h-screen">

      {/* Header */}
      <section className="bg-blue-900 text-white pt-32 pb-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">

          <span className="text-sm bg-blue-800 px-4 py-1 rounded-full">
            {blog.created_at
              ? new Date(blog.created_at).toLocaleDateString()
              : "Recent"}
          </span>

          <h1 className="text-4xl md:text-6xl font-black mt-6">
            {blog.title}
          </h1>

          {blog.excerpt && (
            <p className="mt-6 text-blue-200 text-xl">
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
          dangerouslySetInnerHTML={{ __html: blog.content }} 
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