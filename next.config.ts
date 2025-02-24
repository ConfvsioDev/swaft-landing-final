import type { NextConfig } from 'next';
import type { Configuration as WebpackConfig } from 'webpack';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config: WebpackConfig, { isServer }: { isServer: boolean }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...(config.resolve?.fallback || {}),
          fs: false,
          net: false,
          tls: false,
        },
      };
    }
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/ingest/:path*",
        destination: "https://app.posthog.com/:path*", // Proxy to PostHog cloud service
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://app.posthog.com;
              style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;
              img-src 'self' data: https: blob:;
              font-src 'self' data:;
              connect-src 'self' https://app.posthog.com;
              frame-src 'self' https://www.youtube-nocookie.com;
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              frame-ancestors 'self';
              block-all-mixed-content;
              upgrade-insecure-requests;
            `.replace(/\s+/g, ' ').trim()
          }
        ]
      }
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    loader: 'default',
    domains: ['your-domain.com'],
    path: '/_next/image',
    disableStaticImages: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      'posthog-js',
      'react-intersection-observer',
      'motion'
    ],
    webVitalsAttribution: ['CLS', 'LCP', 'FID'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;