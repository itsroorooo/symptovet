/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['your-domain.com'], // Add your domain(s) here for external images
      formats: ['image/avif', 'image/webp'], // Only 'image/avif' and 'image/webp' are allowed
    },
  };
  
  module.exports = nextConfig;