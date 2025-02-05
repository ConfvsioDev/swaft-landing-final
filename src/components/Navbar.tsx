'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from './Button'; // Update to named export

// Liens de navigation
const NavLink: React.FC<React.PropsWithChildren<{ href: string }>> = ({ href, children }) => {
    return (
        <Link 
            href={href} 
            className="relative text-center px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 w-full sm:w-auto text-white group"
        >
            <span className="absolute inset-0 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-60 z-0 bg-gradient-to-r from-[#0B0732] to-[#0B0732]" />
            <span className="relative z-10">{children}</span>
            <span className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </Link>
    );
};

// Navbar
const Navbar: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
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
                            <Link href="/" className="text-3xl font-bold text-white">
                                Swaft
                            </Link>
                        </div>

                        {/* Liens */}
                        <div className="hidden 2xl:flex absolute left-1/2 transform -translate-x-1/2 items-center space-x-4 xl:space-x-8 text-sm lg:text-base">
                            <NavLink href="#creations">Nos Créations</NavLink>
                            <NavLink href="#process">Notre Processus</NavLink>
                            <NavLink href="#offer">Nos Offres</NavLink>
                        </div>

                        {/* Boutons à droite */}
                        <div className="flex items-center space-x-4">
                            <button
                                className="2xl:hidden p-2 text-white"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <div className=" hidden sm:hidden md:hidden lg:hidden 2xl:flex justify-center lg:justify-start w-full"> 
                                <Button />
                            </div>
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
                <div className="mx-4 rounded-2xl shadow-lg bg-[#01020E]/95 backdrop-blur-lg">
                    <nav className="flex flex-col items-stretch p-4 space-y-2">
                        <NavLink href="#creations">Nos Créations</NavLink>
                        <NavLink href="#process">Notre Processus</NavLink>
                        <NavLink href="#offres">Nos Offres</NavLink>
                        <Link 
                            href="/reserver" 
                            className="text-center px-4 py-3 mt-2 rounded-full border border-white text-white hover:bg-white hover:text-[#01020E] transition-colors duration-300 text-sm font-medium"
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
