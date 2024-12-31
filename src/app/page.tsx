'use client'
import { motion } from 'motion/react';
import Hero from '../components/Hero';
import Video from '../components/Video';
import { useTheme } from 'next-themes';

export default function Home() {
  const { theme } = useTheme();

  // Define colors based on the theme
  const darkThemeColors = {
    side: '#01020E', // Dark color for sides
    middle: '#1A1E30', // Slightly lighter color for the middle
  };

  const lightThemeColors = {
    side: '#F2F2F2', // Light color for sides
    middle: '#E0E0E0', // Lighter middle color for better visibility
  };

  const colors = theme === 'dark' ? darkThemeColors : lightThemeColors;

  return (
    <main className='flex min-h-screen flex-col items-center justify-start p-24'>
      <Hero />
      <Video />
      
      {/* Blurred horizontal line under the video */}
      <div className="w-1/2 h-0.5 mt-32 mx-auto"> {/* Height set to 0.5 for thinner line */}
        <div 
          className="h-full bg-gradient-to-r"
          style={{
            backgroundImage: `linear-gradient(to right, ${colors.side}, ${colors.middle}, ${colors.side})`,
            filter: 'blur(1px)',
          }}
        />
      </div>

      {/* Scrollable boxes with padding above */}
      <div className="flex flex-col items-center w-full mt-8 space-y-4 pt-8">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="w-3/4 md:w-1/2 lg:w-1/3 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md flex items-center justify-center">
            <p className="text-center text-lg font-semibold">Box {index + 1}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
