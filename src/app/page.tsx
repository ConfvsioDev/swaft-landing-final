'use client';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Hero from '../components/Hero';
import Video from '../components/Video';
import Creations from '../components/Creations';
import Process from '../components/Process';
import { useTheme } from 'next-themes';
import Testimonials from '@/components/Testimonials';
import Offer from '@/components/Offer';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default function Home() {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

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

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <main className='flex min-h-screen flex-col items-center justify-start p-24'>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Hero />
          <Video />
          
          {/* Blurred horizontal line under the video */}
          <div className="w-full h-0.5 mt-32 mx-auto">
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
          <div style={{ height: '10vh' }}></div> {/* This div ensures there's enough space */}

          <div className='relative w-screen'>
            <Process id="process" />
          </div>

          <Testimonials/>

          <div className="min-h-screen bg-[#F2F2F2] dark:bg-[#01020E]">
            <Offer />
          </div>
        </>
      )}
    </main>
  );
}
