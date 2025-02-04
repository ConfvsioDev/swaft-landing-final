import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes';
import { Inter } from "next/font/google";
import Navbar from '../components/Navbar';
import "./globals.css";
import type {} from 'ldrs'

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
          <Navbar />
          <main className="dark:bg-[#01020E] bg-[#F2F2F2]">
            {children}
          </main>
        </body>
      </ThemeProvider>
    </html>
  );
}

const iconVariant = {
  enter: { rotateY: 90, opacity: 0, scale: 0.9 },
  center: { 
    rotateY: 0, 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  },
  exit: { rotateY: -90, opacity: 0, scale: 0.9 }
};
