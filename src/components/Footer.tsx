"use client";

import React, { useMemo } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

// Extract navigation items to reduce repetition
const FOOTER_LINKS = {
    main: [
        { href: '#creations', label: 'Nos créations' },
        { href: '#process', label: 'Notre processus' },
        { href: '#offer', label: 'Nos offres' },
        { href: '/faq', label: 'FAQ' },
    ],
    info: [
        { href: '/contact', label: 'Contact' },
        { href: '/legal', label: 'Legal' },
    ]
} as const;

const FooterLink: React.FC<{ href: string; label: string }> = ({ href, label }) => (
    <li>
        <Link 
            href={href}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors text-sm sm:text-base hover:underline"
        >
            {label}
        </Link>
    </li>
);

const Footer: React.FC = () => {
    const { theme } = useTheme();
    
    // Pre-calculate theme values
    const glowStyles = useMemo(() => ({
        light: { boxShadow: '0 0 40px rgba(79, 70, 229, 0.1)' },
        dark: { boxShadow: '0 0 40px rgba(79, 70, 229, 0.2)' }
    }), []);

    return (
        <footer 
            className="w-full py-8 sm:py-12 relative min-h-[200px]" 
            role="contentinfo"
            style={theme === 'dark' ? glowStyles.dark : glowStyles.light}
        >
            {/* Glowing line with responsive width */}
            <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-[90%] sm:w-2/3 md:w-1/2 lg:w-1/3 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 blur-sm"
            />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr,1fr,1fr] gap-8 md:gap-12">
                    {/* Logo section with improved responsive spacing */}
                    <div className="space-y-4 sm:pr-4">
                        <div className="flex items-center space-x-2 justify-center sm:justify-start">
                            <Link href="/" className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                                SWAFT
                            </Link>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-center sm:text-left text-sm sm:text-base">
                            Voyez plus grand.
                        </p>
                    </div>

                    {/* Navigation sections with responsive alignment */}
                    <nav className="space-y-4" aria-label="Navigation principale">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-center sm:text-right text-base sm:text-lg">
                            Accueil
                        </h3>
                        <ul className="space-y-2 flex flex-col items-center sm:items-end">
                            {FOOTER_LINKS.main.map(link => (
                                <FooterLink key={link.href} {...link} />
                            ))}
                        </ul>
                    </nav>

                    <nav className="space-y-4" aria-label="Information">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-center sm:text-right text-base sm:text-lg">
                            Information
                        </h3>
                        <ul className="space-y-2 flex flex-col items-center sm:items-end">
                            {FOOTER_LINKS.info.map(link => (
                                <FooterLink key={link.href} {...link} />
                            ))}
                        </ul>
                    </nav>
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