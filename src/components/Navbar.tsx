'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Button } from './Button'; // Update to named export

// Navbar
const Navbar: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Optimize scroll handler with throttle instead of debounce
    useEffect(() => {
        let lastScrollY = window.scrollY;
        let lastTime = Date.now();
        const THROTTLE_MS = 100; // Adjust based on needs

        const handleScroll = () => {
            const now = Date.now();
            if (now - lastTime >= THROTTLE_MS) {
                const currentScrollY = window.scrollY;
                const shouldBeVisible = currentScrollY < lastScrollY || currentScrollY <= 50;
                
                setIsVisible(shouldBeVisible);
                
                lastScrollY = currentScrollY;
                lastTime = now;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!mounted) return null;

    return (
        <motion.nav
            aria-label="Navigation principale"
            className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-200 ease-in-out ${
                isVisible ? 'translate-y-0' : '-translate-y-full'
            }`}
            initial={{ y: 0 }}
            animate={{ y: isVisible ? 0 : '-100%' }}
            transition={{ duration: 0.1 }}
        >
            <div className="px-8 sm:px-10 lg:px-20">
                <div className="flex items-center justify-between h-28 relative">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-3xl font-bold text-white">
                            Swaft
                        </Link>
                    </div>

                    {/* Button - shown on all devices */}
                    <div className="flex items-center">
                        <Button />
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
