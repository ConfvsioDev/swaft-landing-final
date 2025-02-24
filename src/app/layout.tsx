import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes';
import { Inter } from "next/font/google";
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';
import "./globals.css";
import { PostHogProvider } from "./providers";
import { Suspense } from 'react';
import LoadingSpinner from '@/components/Loader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Swaft Landing Page",
  description: "Boostez votre conversion avec Swaft",
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    title: 'Swaft Landing Page',
    description: 'Boostez votre conversion avec Swaft',
    siteName: 'Swaft',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://app.posthog.com" crossOrigin="anonymous" />
        <link 
          rel="preload" 
          href="/fonts/your-main-font.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="preload"
          as="image"
          href="/images/hero-image.webp"
          type="image/webp"
        />
      </head>
      <body className={`${inter.className} dark:bg-[#01020E] bg-[#F2F2F2] antialiased`}>
        <PostHogProvider>
          <ThemeProvider 
            attribute="class" 
            defaultTheme="dark"
            enableSystem={true}
            disableTransitionOnChange
          >
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4">
              Skip to main content
            </a>
            <Suspense fallback={<LoadingSpinner />}>
              <Navbar />
            </Suspense>
            <main id="main-content">
              <Suspense fallback={<LoadingSpinner />}>
                {children}
              </Suspense>
            </main>
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
            <script
              defer
              type="module"
              src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/spiral.js"
            />
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
