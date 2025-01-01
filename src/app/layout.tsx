import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes';
import { Inter } from "next/font/google";
import Navbar from '../components/Navbar';
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
      {/* The ThemeProvider with defaultTheme="dark" ensures that dark theme is applied from the start */}
      <ThemeProvider attribute="class" defaultTheme="dark">
        <body className={`${inter.className} dark:bg-[#01020E] bg-[#F2F2F2]`}>
          <Navbar />
          <main className="dark:bg-[#01020E] bg-[#F2F2F2]">
            {children}
          </main>
        </body>
      </ThemeProvider>
    </html>
  );
}
