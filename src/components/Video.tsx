import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTheme } from 'next-themes';

const Video: React.FC = () => {
    const [isClient, setIsClient] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { theme } = useTheme();
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const smoothScrollProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 15,
    });

    const rotateX = useTransform(smoothScrollProgress, [0, 0.15], [90, 0]);
    const opacity = useTransform(smoothScrollProgress, [0, 0.2], [0.2, 1]);
    const scale = useTransform(smoothScrollProgress, [0, 0.2], [0.8, 1.2]);
    const y = useTransform(smoothScrollProgress, [0, 0.1], ['30%', '0%']);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    const borderColor = theme === 'dark' ? 'rgba(5, 14, 25, 0.3)' : 'rgba(0, 0, 190, 0.2)';
    const glowColor = theme === 'dark' ? 'rgba(0, 0, 139, 0.5)' : 'rgba(173, 216, 230, 0.2)';

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
            <div ref={containerRef} className="w-full flex items-center justify-center perspective-1000 z-10 mb-8">
                <motion.div
                    style={{
                        rotateX,
                        opacity,
                        scale,
                        y,
                        boxShadow: `0 0 20px ${glowColor}, 0 0 40px ${glowColor}`,
                        borderColor: borderColor,
                    }}
                    className="w-full max-w-6xl aspect-video rounded-2xl overflow-hidden border-4"
                >
                    <div className="relative w-full h-0 pb-[56.25%]">
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src="https://www.youtube.com/embed/z9sctViHNqg?autoplay=1&mute=1&loop=1&playlist=z9sctViHNqg"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Video;