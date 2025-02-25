import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes';
import { Inter } from "next/font/google";
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';
import "./globals.css";
import { PostHogProvider } from "./providers";
import { Suspense } from 'react';
import LoadingSpinner from '@/components/Loader';

// Optimize font loading
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'Arial', 'sans-serif'],
  variable: '--font-inter',
});

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
        <link rel="preconnect" href="https://us-assets.i.posthog.com" crossOrigin="anonymous" />

        <link 
          rel="preload" 
          href="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/spiral.js" 
          as="script"
          crossOrigin="anonymous"
        />
        <style dangerouslySetInnerHTML={{ __html: `
          .hero h1 {
            font-weight: 500;
            line-height: 1.2;
          }
          .hero span {
            display: inline-block;
          }
        `}} />
        
        <link rel="icon" href="data:image/svg+xml,<svg width='70' height='40' viewBox='0 0 70 40' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M37.2551 1.61586C38.1803 0.653384 39.4368 0.112671 40.7452 0.112671C46.6318 0.112671 52.1793 0.112674 57.6424 0.112685C68.6302 0.112708 74.1324 13.9329 66.3629 22.0156L49.4389 39.6217C48.662 40.43 47.3335 39.8575 47.3335 38.7144V23.2076L49.2893 21.1729C50.8432 19.5564 49.7427 16.7923 47.5451 16.7923H22.6667L37.2551 1.61586Z' fill='%23FFFFFF'></path><path d='M32.7449 38.3842C31.8198 39.3467 30.5633 39.8874 29.2549 39.8874C23.3683 39.8874 17.8208 39.8874 12.3577 39.8874C1.36983 39.8873 -4.13236 26.0672 3.63721 17.9844L20.5612 0.378369C21.3381 -0.429908 22.6666 0.142547 22.6666 1.28562L22.6667 16.7923L20.7108 18.8271C19.1569 20.4437 20.2574 23.2077 22.455 23.2077L47.3335 23.2076L32.7449 38.3842Z' fill='%23FFFFFF'></path></svg>" />
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
