/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.dodostatic.net',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dodostatic.net',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'eljzbzkg5d36iyau.public.blob.vercel-storage.com',
        pathname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'], // Оптимизированные форматы изображений
  },
};

export default nextConfig;
