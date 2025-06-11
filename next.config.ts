// next.config.ts
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*/',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/:path*/`,
      },
    ];
  },
};

export default nextConfig;
