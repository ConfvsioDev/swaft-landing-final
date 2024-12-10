import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
          blue: {
            800: '#1e3a8a', // Dark Blue
            900: '#1e40af', // Very Dark Blue
            // Add more shades if necessary
          },
      },
    },
  },
  plugins: [],
} satisfies Config;
