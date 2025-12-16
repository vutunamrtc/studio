import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Không bundle better-sqlite3 trên client-side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'better-sqlite3': false,
        fs: false,
        path: false,
      };
    }
    return config;
  },
  allowedDevOrigins: [
    'https://6000-firebase-studio-1765415271500.cluster-ubrd2huk7jh6otbgyei4h62ope.cloudworkstations.dev',
  ]
};

export default nextConfig;
