'use client';

import React, { useMemo } from 'react';
import { useTheme } from 'next-themes';

const smoothScroll = (targetId: string) => {
  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  const headerOffset = 80;
  const elementPosition = targetElement.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

const Hero: React.FC = () => {
  const { theme } = useTheme();

  if (theme === undefined) {
    return <div>Loading theme...</div>;
  }

  const shadowStyle = useMemo(() => ({
    textShadow: theme === "dark" 
      ? '0 0 12px rgba(255, 255, 255, 0.4)' 
      : '0 0 12px rgba(0, 0, 0, 0.2)',
  }), [theme]);

  return (
    <div className="hero min-h-[85vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-8 relative w-screen overflow-hidden">
      {/* Background pattern with fade effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#d1d1d1_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#ffffff22_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-30" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#F2F2F2] dark:from-[#01020E] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F2F2F2] dark:from-[#01020E] to-transparent" />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F2F2F2] dark:from-[#01020E] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#F2F2F2] dark:from-[#01020E] to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 space-y-6 md:space-y-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-tight text-center max-w-5xl mx-auto">
          <span 
            className={`inline-block mb-2 sm:mb-3 ${theme === 'dark' ? 'text-white' : 'text-[#01020E]'} tracking-tight`}
            style={shadowStyle}
          >
            Des interfaces intuitives qui
          </span>
          <br />
          <span 
            className={`inline-block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} tracking-tight`}
            style={shadowStyle}
          >
            transforment l'expérience utilisateur
          </span>
        </h1>
        
        <h3 
          className={`text-xl sm:text-2xl md:text-3xl font-light ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-center max-w-3xl mx-auto leading-relaxed`}
        >
          Optimisez votre taux de conversion grâce à une landing page parfaite.
        </h3>
        
        <div className="mt-8 sm:mt-10 md:mt-12 flex justify-center">
          <button 
            className={`group relative inline-flex items-center overflow-hidden rounded-full h-14 pr-14 pl-8 text-lg sm:text-xl font-medium transition-all duration-300 ease-out transform hover:scale-105
            ${theme === 'dark' 
                ? 'text-white hover:text-black bg-opacity-10 bg-white' 
                : 'text-black hover:text-white bg-opacity-10 bg-black'}`}
            onClick={() => smoothScroll('video')}
          >
            <span className="relative z-10 mr-4">
              Nous découvrir
            </span>
            <span className={`absolute right-0 w-14 h-14 rounded-full transition-all duration-300 ease-out group-hover:w-full
                ${theme === 'dark' 
                    ? 'bg-white' 
                    : 'bg-black'}`} />
            <span className="absolute right-0 z-10 flex h-14 w-14 items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                className={`h-6 w-6 rotate-90 transition-transform duration-300 group-hover:rotate-[135deg] ${theme === 'dark' ? 'text-black' : 'text-white'}`}
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

export default Hero;