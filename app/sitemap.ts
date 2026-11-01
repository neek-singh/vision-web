import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.visionitinstitute.com';
  const siteUpdateDate = new Date('2026-11-01');

  // 1. Live Core Pages
  const staticRoutes = [
    '',
    '/about',
    '/courses',
    '/courses/bcc',
    '/courses/dca',
    '/courses/adca',
    '/courses/pgdca',
    '/courses/tally',
    '/courses/school-tuition',
    '/gallery',
    '/blog',
    '/contact',
    '/inquiry',
    '/verify',
  ];

  const staticUrls: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: siteUpdateDate,
  }));

  // 2. Dynamic Live Blog Posts
  let blogUrls: MetadataRoute.Sitemap = [];
  try {
    const blogsFilePath = path.join(process.cwd(), 'features', 'blog', 'data', 'blogs.json');
    if (fs.existsSync(blogsFilePath)) {
      const fileData = fs.readFileSync(blogsFilePath, 'utf-8');
      const blogs = JSON.parse(fileData);
      blogUrls = blogs
        .filter((blog: any) => blog.is_published !== false)
        .map((blog: any) => ({
          url: `${baseUrl}/blog/${blog.slug}`,
          lastModified: blog.published_at
            ? new Date(blog.published_at)
            : blog.created_at
            ? new Date(blog.created_at)
            : siteUpdateDate,
        }));
    }
  } catch (error) {
    console.error('Error reading blogs for sitemap:', error);
  }

  return [...staticUrls, ...blogUrls];
}
