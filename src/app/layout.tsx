import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes';
import { Inter } from "next/font/google";
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';
import { PostHogProvider } from './providers/ph-providers';
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Swaft Landing Page",
  description: "Boostez votre conversion avec Swaft",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          async
          type="module"
          src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/spiral.js"
        />
      </head>
      {/* The ThemeProvider with defaultTheme="dark" ensures that dark theme is applied from the start */}
      <ThemeProvider 
        attribute="class" 
        defaultTheme="dark"
        enableSystem={true}
        disableTransitionOnChange
      >
          <body className={`${inter.className} dark:bg-[#01020E] bg-[#F2F2F2]`}>
            <PostHogProvider >
            <Navbar />
            <main className="dark:bg-[#01020E]">
              {children}
            </main>
            <Footer />
            </PostHogProvider >
          </body>
      </ThemeProvider>
    </html>
  );
}
