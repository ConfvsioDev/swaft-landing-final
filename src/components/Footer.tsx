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
    <li className="min-h-[24px] h-[24px] flex items-center">
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
            className="w-full py-8 sm:py-12 relative h-[300px] sm:h-[320px] md:h-[300px]" 
            role="contentinfo"
            style={{
                ...(theme === 'dark' ? glowStyles.dark : glowStyles.light),
                contentVisibility: 'auto',
                containIntrinsicSize: '0 300px',
            }}
        >
            {/* Glowing line with responsive width */}
            <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-[90%] sm:w-2/3 md:w-1/2 lg:w-1/3 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 blur-sm"
            />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 h-[200px]">
                    {/* Logo section with fixed height */}
                    <div className="h-[80px] flex flex-col items-center md:items-start justify-center">
                        <div className="flex items-center space-x-2 h-[30px]">
                            <Link href="/" className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                                SWAFT
                            </Link>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base h-[24px]">
                            Voyez plus grand.
                        </p>
                    </div>

                    {/* Navigation sections with fixed heights */}
                    <nav className="h-[150px] flex flex-col items-center md:items-end" aria-label="Navigation principale">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-center md:text-right text-base sm:text-lg h-[30px] mb-4">
                            Accueil
                        </h3>
                        <ul className="space-y-2 flex flex-col items-center md:items-end h-[120px]">
                            {FOOTER_LINKS.main.map(link => (
                                <FooterLink key={link.href} {...link} />
                            ))}
                        </ul>
                    </nav>

                    <nav className="h-[100px] flex flex-col items-center md:items-end" aria-label="Information">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-center md:text-right text-base sm:text-lg h-[30px] mb-4">
                            Information
                        </h3>
                        <ul className="space-y-2 flex flex-col items-center md:items-end h-[70px]">
                            {FOOTER_LINKS.info.map(link => (
                                <FooterLink key={link.href} {...link} />
                            ))}
                        </ul>
                    </nav>
                </div>

                {/* Copyright section with fixed height */}
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 h-[40px] flex items-center justify-center">
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                        © {new Date().getFullYear()} Swaft. Tous droits réservés.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;