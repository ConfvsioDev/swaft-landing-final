'use client';
import { motion } from 'motion/react';
import Hero from '../components/Hero';
import Video from '../components/Video';
import Creations from '../components/Creations';
import Process from '@/components/Process';
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
      <div className="w-1/2 h-0.5 mt-32 mx-auto"> 
        <div 
          className="h-full bg-gradient-to-r"
          style={{
            backgroundImage: `linear-gradient(to right, ${colors.side}, ${colors.middle}, ${colors.side})`,
            filter: 'blur(1px)',
          }}
        />
      </div>

      {/* Add ID to Creations for scrolling */}
      <Creations id="creations" />
      
      {/* Ensure enough space between Creations and Process */}
      <div style={{ height: '100vh' }}></div> {/* This div ensures there's enough space */}
      
      <Process />
    </main>
  );
}
