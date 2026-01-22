// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    unoptimized: true, // Important for static exports
  },
  // For static site generation
  output: 'standalone', // or 'export' for static sites
  
  // Enable trailing slashes for better compatibility
  trailingSlash: true,
  
  // Disable TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig