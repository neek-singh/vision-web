import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import fs from "fs";
import path from "path";
import Image from "next/image";
import { unstable_cache } from "next/cache";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Tech Updates | Vision IT Computer Institute",
  description: "Stay updated with the latest computer technology trends, programming tutorials, career tips, and official announcements from Vision IT Computer Institute in Pratappur.",
  keywords: "vision it blog, computer tutorials, learn programming, pratappur computer coaching, IT news",
};

export const revalidate = 3600;

const getBlogs = unstable_cache(
  async () => {
    const blogsFilePath = path.join(process.cwd(), "features", "blog", "data", "blogs.json");
    try {
      if (fs.existsSync(blogsFilePath)) {
        const fileData = fs.readFileSync(blogsFilePath, "utf-8");
        return JSON.parse(fileData);
      }
    } catch (e) {
      console.error("Error loading blogs from JSON:", e);
    }
    return [];
  },
  ["blogs-list"],
  { revalidate: 3600, tags: ["blogs"] }
);

export default async function BlogListingPage() {
  const blogsList = await getBlogs();

  return (
    <main className="w-full bg-gray-50 pb-32 min-h-screen">

      {/* Header */}
      <section className="bg-white pt-24 pb-16 border-b relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <span className="inline-block mb-3 px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
            📚 Insights & Updates
          </span>

          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-slate-900 mb-4 tracking-tight">
            Our <span className="text-blue-600">Blog</span>
          </h1>

          <p className="text-sm md:text-base text-black max-w-2xl mx-auto leading-relaxed">
            Latest tech trends, tutorials, and success stories.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-6 pt-10">

        {blogsList.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl shadow border max-w-2xl mx-auto">
            <span className="text-4xl block mb-3">✍️</span>
            <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
              No blogs published yet.
            </h2>
            <p className="text-sm text-black">
              Check back later for updates.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

            {blogsList.map((blog: any) => (
              <Link href={`/blog/${blog.slug}`} key={blog.id} className="block group">
                <Card className="hover:-translate-y-2 hover:shadow-xl border border-slate-100 transition-all duration-300 flex flex-col overflow-hidden rounded-2xl h-full bg-white">
                  {blog.image_url && (
                    <div className="relative w-full h-44 overflow-hidden">
                      <Image
                        src={blog.image_url}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}

                  <CardHeader className="p-5 pb-3">
                    <span className="text-[11px] text-blue-500 mb-1.5 font-bold">
                      {blog.created_at
                        ? new Date(blog.created_at).toLocaleDateString()
                        : "Recent"}
                    </span>

                    <CardTitle className="group-hover:text-blue-600 transition-colors text-base md:text-lg font-bold text-slate-900 leading-snug">{blog.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="px-5 pb-5 pt-0 flex flex-col flex-grow">
                    <p className="text-black mb-4 flex-grow text-xs md:text-sm leading-relaxed">
                      {blog.excerpt || "Read this article to learn more."}
                    </p>

                    <span className="text-blue-600 font-semibold text-xs mt-auto inline-flex items-center gap-1">
                      Read Article 
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}

          </div>
        )}

      </section>
    </main>
  );
}