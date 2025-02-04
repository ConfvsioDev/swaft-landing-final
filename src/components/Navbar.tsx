'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

// Liens de navigation
const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
    const { theme } = useTheme();
    return (
        <Link 
            href={href} 
            className={`relative text-center px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 w-full sm:w-auto ${
                theme === 'dark' ? 'text-white' : 'text-[#01020E]'
            } group`}
        >
            <span className={`absolute inset-0 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-60 z-0 ${
                theme === 'dark' 
                    ? 'bg-gradient-to-r from-[#0B0732] to-[#0B0732]'
                    : 'bg-gradient-to-r from-[#E5E2FA] to-[#E5E2FA]'
            }`} />
            <span className="relative z-10">{children}</span>
            <span className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </Link>
    );
};


// Navbar
const Navbar: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    const { theme, setTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const mobileMenuRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Add click outside handler
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMobileMenuOpen]);

    // Simplified scroll handler - only shows navbar at the very top
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsVisible(currentScrollY <= 50);
            
            // Close mobile menu when scrolling
            if (currentScrollY > 50 && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobileMenuOpen]);

    if (!mounted) return null;

    return (
        <>
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
                    isVisible ? 'translate-y-0' : '-translate-y-full'
                }`}
                initial={{ y: 0 }}
                animate={{ y: isVisible ? 0 : '-100%' }}
                transition={{ duration: 0.3 }}
            >
                <div className="px-8 sm:px-10 lg:px-20">
                    <div className="flex items-center justify-between h-28 relative">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/" className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-[#01020E]'}`}>
                                Logo
                            </Link>
                        </div>

                        {/* Liens */}
                        <div className="hidden 2xl:flex absolute left-1/2 transform -translate-x-1/2 items-center space-x-4 xl:space-x-8 text-sm lg:text-base">
                            <NavLink href="#creations">Nos Créations</NavLink>
                            <NavLink href="#process">Notre Processus</NavLink>
                            <NavLink href="#offres">Nos Offres</NavLink>
                        </div>

                        {/* Boutons à droite */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className={`p-2 rounded-md ${theme === 'dark' ? 'text-white' : 'text-[#01020E]'}`}
                            >
                                {theme === 'dark' ? (
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ) : (
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646A9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                )}
                            </button>
                            <button
                                className={`2xl:hidden p-2 ${theme === 'dark' ? 'text-white' : 'text-[#01020E]'}`}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Update Mobile menu with animation and better positioning */}
            <motion.div
                ref={mobileMenuRef}
                initial={{ opacity: 0, y: -20 }}
                animate={{ 
                    opacity: isMobileMenuOpen && isVisible ? 1 : 0,
                    y: isMobileMenuOpen && isVisible ? 0 : -20 
                }}
                transition={{ duration: 0.2 }}
                className={`fixed top-28 left-0 right-0 z-40 ${
                    !isMobileMenuOpen && 'pointer-events-none'
                }`}
            >
                <div className={`mx-4 rounded-2xl shadow-lg ${
                    theme === 'dark' 
                        ? 'bg-[#01020E]/95 backdrop-blur-lg' 
                        : 'bg-white/95 backdrop-blur-lg'
                }`}>
                    <nav className="flex flex-col items-stretch p-4 space-y-2">
                        <NavLink href="#creations">Nos Créations</NavLink>
                        <NavLink href="#process">Notre Processus</NavLink>
                        <NavLink href="#offres">Nos Offres</NavLink>
                        <Link 
                            href="/reserver" 
                            className={`text-center px-4 py-3 mt-2 rounded-full border ${
                                theme === 'dark' 
                                    ? 'border-white text-white hover:bg-white hover:text-[#01020E]' 
                                    : 'border-[#01020E] text-[#01020E] hover:bg-[#01020E] hover:text-white'
                            } transition-colors duration-300 text-sm font-medium`}
                        >
                            Réserver un Appel
                        </Link>
                    </nav>
                </div>
            </motion.div>
        </>
    );
};

export default Navbar;
