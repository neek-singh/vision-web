import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upsgoqluovwzijtgmlhp.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },

    ],
  },
  async redirects() {
    return [
      {
        source: '/courses/basic-beginner',
        destination: '/courses/bcc',
        permanent: true,
      },
      {
        source: '/courses/certificate',
        destination: '/courses',
        permanent: true,
      },
      {
        source: '/courses/diploma',
        destination: '/courses',
        permanent: true,
      },
      {
        source: '/courses/university',
        destination: '/courses',
        permanent: true,
      },
      {
        source: '/courses/university/:path*',
        destination: '/courses',
        permanent: true,
      },
      {
        source: '/courses/bca',
        destination: '/courses',
        permanent: true,
      },
      {
        source: '/courses/dfso',
        destination: '/courses',
        permanent: true,
      },
      {
        source: '/courses/dsps',
        destination: '/courses',
        permanent: true,
      },
      {
        source: '/courses/pgdrd',
        destination: '/courses',
        permanent: true,
      },
      {
        source: '/blog/vision-it-computer-institute-the-pioneer-of-it-education-in-pratappur',
        destination: '/blog/vision-it-computer-institute-pratappur-courses-fees-admission',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
