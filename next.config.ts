import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  trailingSlash: true,
  images: {
    domains: ['res.cloudinary.com'],
    unoptimized: true,
  },
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
