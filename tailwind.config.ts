import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  future: {
    hoverOnlyWhenSupported: true,
  },
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
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'grow': 'grow 1s ease-in-out infinite',
        'grow-delay-1': 'grow 1s ease-in-out -0.8s infinite',
        'grow-delay-2': 'grow 1s ease-in-out -0.6s infinite',
        'grow-delay-3': 'grow 1s ease-in-out -0.4s infinite',
      },
      keyframes: {
        grow: {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' }
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
