import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes';
import { Inter } from "next/font/google";
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';
import "./globals.css";
import { PostHogProvider } from "./providers";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <script
          defer
          type="module"
          src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/spiral.js"
        />
      </head>
      <PostHogProvider>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange
        >
          <body className={`${inter.className} dark:bg-[#01020E] bg-[#F2F2F2] antialiased`}>
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4">
              Skip to main content
            </a>
            <Navbar />
            <main id="main-content">
              {children}
            </main>
            <Footer />
          </body>
        </ThemeProvider>
      </PostHogProvider>
    </html>
  );
}
