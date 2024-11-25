/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.R2_PUBLIC_URL,
      },
    ],
  },
};

export default nextConfig;
