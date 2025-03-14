import type { NextConfig } from 'next';
import type { Configuration as WebpackConfig } from 'webpack';

// Import bundle analyzer conditionally to avoid the error
let withBundleAnalyzer: (config: NextConfig) => NextConfig;
try {
  withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  });
} catch (e) {
  withBundleAnalyzer = (config: NextConfig) => config;
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config: WebpackConfig, { isServer, dev }: { isServer: boolean; dev: boolean }) => {
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
    
    // Add modern JavaScript optimizations for production builds
    if (!dev && !isServer) {
      // Use modern output for modern browsers
      // Note: removed ecmaVersion as it's not a valid property
    }
    
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/array/:path*",
        destination: "https://app.posthog.com/array/:path*",
      },
      {
        source: "/decide/:path*",
        destination: "https://us.i.posthog.com/decide/:path*",
      },
      {
        source: "/e/:path*",
        destination: "https://us.i.posthog.com/e/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://app.posthog.com/:path*",
      },
      {
        source: "/ph/e/:path*",
        destination: "https://us.i.posthog.com/e/:path*",
      },
      {
        source: "/ph/decide/:path*",
        destination: "https://us.i.posthog.com/decide/:path*",
      }
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
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://app.posthog.com https://*.i.posthog.com https://*.posthog.com;
              style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://*.posthog.com;
              img-src 'self' data: https: blob:;
              font-src 'self' data:;
              connect-src 'self' https://app.posthog.com https://*.i.posthog.com https://*.posthog.com;
              frame-src 'self' https://www.youtube-nocookie.com https://calendly.com;
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

// Apply bundle analyzer wrapper if available
export default withBundleAnalyzer(nextConfig);