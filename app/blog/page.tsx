import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import fs from "fs";
import path from "path";
import Image from "next/image";

export const revalidate = 3600;

export default async function BlogListingPage() {
  const blogsFilePath = path.join(process.cwd(), "data", "blogs.json");
  let blogsList: any[] = [];

  try {
    if (fs.existsSync(blogsFilePath)) {
      const fileData = fs.readFileSync(blogsFilePath, "utf-8");
      blogsList = JSON.parse(fileData);
    }
  } catch (e) {
    console.error("Error loading blogs from JSON:", e);
  }

  return (
    <main className="w-full bg-gray-50 pb-32 min-h-screen">

      {/* Header */}
      <section className="bg-white pt-32 pb-24 border-b relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <span className="inline-block mb-4 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
            📚 Insights & Updates
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-blue-950 mb-6">
            Our <span className="text-blue-600">Blog</span>
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Latest tech trends, tutorials, and success stories.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-6 pt-16">

        {blogsList.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow border max-w-3xl mx-auto">
            <span className="text-5xl block mb-4">✍️</span>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No blogs published yet.
            </h2>
            <p className="text-gray-500">
              Check back later for updates.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

            {blogsList.map((blog) => (
              <Link href={`/blog/${blog.slug}`} key={blog.id} className="block group">
                <Card className="hover:-translate-y-3 hover:shadow-xl border border-slate-100 transition-all duration-300 flex flex-col overflow-hidden rounded-[1rem] h-full bg-white">
                  {blog.image_url && (
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={blog.image_url}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}

                  <CardHeader>
                    <span className="text-xs text-blue-500 mb-2 font-bold">
                      {blog.created_at
                        ? new Date(blog.created_at).toLocaleDateString()
                        : "Recent"}
                    </span>

                    <CardTitle className="group-hover:text-blue-600 transition-colors text-xl font-bold">{blog.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="flex flex-col flex-grow">
                    <p className="text-gray-600 mb-6 flex-grow text-sm leading-relaxed">
                      {blog.excerpt || "Read this article to learn more."}
                    </p>

                    <span className="text-blue-600 font-bold text-sm mt-auto inline-flex items-center gap-1">
                      Read Article 
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
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