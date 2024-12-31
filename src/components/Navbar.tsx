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
            className={`relative text-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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

    // Vérifie si le composant est monté
    useEffect(() => {
        setMounted(true);
    }, []);

    // Gère la visibilité de la barre de navigation lors du défilement
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.pageYOffset;
            setIsVisible(currentScrollY <= 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed w-full z-50">
            <motion.nav
                className={`w-full max-w-[90%] lg:max-w-[75%] mx-auto ${
                    theme === 'dark' ? 'bg-[#01020E]' : 'bg-[#F2F2F2]'
                } bg-opacity-90 rounded-full`}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -100 }}
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
                            <NavLink href="/creations">Nos Créations</NavLink>
                            <NavLink href="/processus">Notre Processus</NavLink>
                            <NavLink href="/offres">Nos Offres</NavLink>
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
                            <Link 
                                href="/reserver" 
                                className={`px-4 py-2 rounded-full border ${
                                    theme === 'dark' 
                                        ? 'border-white text-white hover:bg-white hover:text-[#01020E]' 
                                        : 'border-[#01020E] text-[#01020E] hover:bg-[#01020E] hover:text-white'
                                } transition-colors duration-300 text-sm font-medium`}
                            >
                                Réserver un Appel
                            </Link>

                            {/* Bouton mobile */}
                            <button
            className={`2xl:hidden p-2 ${theme === 'light' ? 'text-black' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
            <svg 
                className="w-7 h-7" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
            >
                {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
            </svg>
        </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Menu mobile */}
            {isMobileMenuOpen && (
                <div className={`2xl:hidden fixed top-[90px] left-0 w-full ${
                    theme === 'dark' ? 'bg-[#01020E]' : 'bg-[#F2F2F2]'
                } bg-opacity-90 p-4 mt-10`}>
                    <div className="flex flex-col items-center space-y-4"> 
                        <NavLink href="/creations">Nos Créations</NavLink>
                        <NavLink href="/processus">Notre Processus</NavLink>
                        <NavLink href="/offres">Nos Offres</NavLink>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;