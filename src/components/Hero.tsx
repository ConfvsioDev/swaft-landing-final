'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { memo } from 'react';

// Optimize smooth scroll with requestAnimationFrame
const smoothScroll = (targetId: string) => {
  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  const headerOffset = 80;
  const elementPosition = targetElement.getBoundingClientRect().top;
  const startPosition = window.pageYOffset;
  const targetPosition = elementPosition + startPosition - headerOffset;
  
  const duration = 1000;
  let start: number | null = null;
  
  const animation = (currentTime: number) => {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const progress = Math.min(timeElapsed / duration, 1);
    
    const easeInOutCubic = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    
    window.scrollTo(0, startPosition + (targetPosition - startPosition) * easeInOutCubic);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };
  
  requestAnimationFrame(animation);
};

const Hero = () => {
  const { theme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Delay applying complex styles until after initial render
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Simplified styles for initial render
  const initialStyles = {
    textShadow: 'none'
  };
  
  // Full styles for after initial render
  const styles = useMemo(() => ({
    textColors: {
      primary: theme === 'dark' ? 'text-white' : 'text-gray-900',
      secondary: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
    },
    textShadow: {
      textShadow: theme === "dark" 
        ? '0 0 8px rgba(255, 255, 255, 0.3)' // Reduced blur radius and opacity
        : '0 0 8px rgba(0, 0, 0, 0.1)',      // Reduced blur radius and opacity
    },
    buttonStyles: {
      text: theme === 'dark' ? 'text-white hover:text-black' : 'text-black hover:text-white',
      bg: theme === 'dark' ? 'bg-white' : 'bg-black',
    }
  }), [theme]);

  if (theme === undefined) {
    return <div aria-busy="true">Loading theme...</div>;
  }

  return (
    <div className="hero min-h-[85vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-8 relative w-screen overflow-hidden">
      {/* Simplified background with fewer divs */}
      <div className="absolute inset-0 bg-[radial-gradient(#d1d1d1_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#ffffff22_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-30" />
      
      {/* Content */}
      <div className="relative z-10 space-y-6 md:space-y-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-tight text-center max-w-5xl mx-auto">
          <span className={`inline-block mb-2 sm:mb-3 ${styles.textColors.primary} tracking-tight`}>
            Des interfaces intuitives qui
          </span>
          <br />
          <span 
            className={`inline-block ${styles.textColors.secondary} tracking-tight`}
            style={isLoaded ? styles.textShadow : initialStyles}
          >
            transforment l'expérience utilisateur
          </span>
        </h1>
        
        <h2 // Changed from h3 to maintain proper hierarchy
          className={`text-xl sm:text-2xl md:text-3xl font-light ${styles.textColors.secondary} text-center max-w-3xl mx-auto leading-relaxed`}
        >
          Optimisez votre taux de conversion grâce à une landing page parfaite.
        </h2>
        
        <div className="mt-8 sm:mt-10 md:mt-12 flex justify-center">
          <button 
            className={`group relative inline-flex items-center overflow-hidden rounded-full h-14 pr-14 pl-8 text-lg sm:text-xl font-medium transition-all duration-300 ease-out transform hover:scale-105
            ${styles.buttonStyles.text} bg-opacity-10 ${styles.buttonStyles.bg}`}
            onClick={() => smoothScroll('video')}
          >
            <span className="relative z-10 mr-4">
              Nous découvrir
            </span>
            <span className={`absolute right-0 w-14 h-14 rounded-full transition-all duration-300 ease-out group-hover:w-full
                ${styles.buttonStyles.bg}`} />
            <span className="absolute right-0 z-10 flex h-14 w-14 items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                className={`h-6 w-6 rotate-90 transition-transform duration-300 group-hover:rotate-[135deg] ${theme === 'dark' ? 'text-black' : 'text-white'}`}
                aria-label="Arrow icon"
                role="img"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

Hero.displayName = 'Hero';

export default memo(Hero);