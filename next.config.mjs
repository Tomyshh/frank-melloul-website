/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Reduce runtime footprint on small instances (e.g. Render 512MB)
  output: "standalone",
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60,
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  experimental: {
    // Helps reduce client bundle size for heavy libs
    optimizePackageImports: ["framer-motion", "@studio-freight/lenis"],
  },
};

export default nextConfig;

