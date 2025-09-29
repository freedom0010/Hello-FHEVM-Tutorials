/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Static export configuration (disabled for Vercel)
  // output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  
  // Environment variables
  env: {
    SITE_NAME: 'Hello FHEVM Tutorials',
    SITE_DESCRIPTION: 'Learn FHEVM privacy computing smart contract development',
  },
  
  // Page extensions
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  
  // Compiler configuration
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Experimental features
  experimental: {
    // optimizeCss: true, // Temporarily disabled to avoid critters module issues
  },
};

module.exports = nextConfig;