import { MetadataRoute } from 'next'
import { createPublicSupabaseClient } from '@/lib/supabase-server'
import fs from 'fs'
import path from 'path'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://visionitinstitute.com'
  const supabase = createPublicSupabaseClient()
  
  // Fetch courses from Supabase (only published courses)
  const { data: courses } = await supabase
    .from('courses')
    .select('id')
    .neq('is_published', false)
  
  const courseUrls = (courses || []).map((course) => ({
    url: `${baseUrl}/courses/${course.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Fetch blogs from local features/blog/data/blogs.json
  let blogUrls: MetadataRoute.Sitemap = []
  try {
    const blogsFilePath = path.join(process.cwd(), 'features', 'blog', 'data', 'blogs.json')
    if (fs.existsSync(blogsFilePath)) {
      const fileData = fs.readFileSync(blogsFilePath, 'utf-8')
      const blogs = JSON.parse(fileData)
      blogUrls = blogs.map((blog: any) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: blog.published_at ? new Date(blog.published_at) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    }
  } catch (error) {
    console.error('Error generating blog sitemap URLs:', error)
  }

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // Course detail pages
    {
      url: `${baseUrl}/courses/dca`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/adca`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/pgdca`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/bcc`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses/basic-beginner`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // Course category pages
    {
      url: `${baseUrl}/courses/diploma`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses/certificate`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/inquiry`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  return [...staticUrls, ...courseUrls, ...blogUrls]
}
