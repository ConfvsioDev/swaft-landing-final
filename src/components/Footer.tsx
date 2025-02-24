"use client";

import React, { useMemo } from 'react';
import { useTheme } from 'next-themes';

const Footer: React.FC = () => {
  const { theme } = useTheme();

  const glowStyles = useMemo(() => ({
    boxShadow: theme === 'dark'
      ? '0 0 40px rgba(79, 70, 229, 0.2)'
      : '0 0 40px rgba(79, 70, 229, 0.1)',
  }), [theme]);

  return (
    <footer className="w-full py-8 sm:py-12 relative min-h-[200px]">
      {/* Glowing line with responsive width */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-[90%] sm:w-2/3 md:w-1/2 lg:w-1/3 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 blur-sm"
        style={glowStyles}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr,1fr,1fr] gap-8 md:gap-12">
          {/* Logo section with improved responsive spacing */}
          <div className="space-y-4 sm:pr-4">
            <div className="flex items-center space-x-2 justify-center sm:justify-start">
              
              <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">SWAFT</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-center sm:text-left text-sm sm:text-base">
              Voyez plus grand.
            </p>
          </div>

          {/* Navigation sections with responsive alignment */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white text-center sm:text-right text-base sm:text-lg">
              Accueil
            </h3>
            <ul className="space-y-2 flex flex-col items-center sm:items-end">
                <li>
                <a 
                  href="#creations" 
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors text-sm sm:text-base hover:underline"
                >
                  Nos créations
                </a>
              </li>
              <li>
                <a 
                  href="#process"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors text-sm sm:text-base hover:underline"
                >
                  Notre processus
                </a>
              </li>
              <li>
                <a 
                  href="#offer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors text-sm sm:text-base hover:underline"
                >
                  Nos offres
                </a>
              </li>
              <li>
                <a 
                  href="/faq" 
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors text-sm sm:text-base hover:underline"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white text-center sm:text-right text-base sm:text-lg">
              Information
            </h3>
            <ul className="space-y-2 flex flex-col items-center sm:items-end">
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors text-sm sm:text-base hover:underline"
                >
                  Contact
                </a>
              </li>
              <li>
                <a 
                  href="/legal" 
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors text-sm sm:text-base hover:underline"
                >
                  Legal
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Added copyright section */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Swaft. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;