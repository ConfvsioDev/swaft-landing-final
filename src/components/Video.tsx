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

    // Use spring for smooth scrolling effect with adjusted reactivity
    const smoothScrollProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 15,
    });

    // Adjusted transformations for better animation effect
    const rotateX = useTransform(smoothScrollProgress, [0, 0.5], [70, 0]);
    const opacity = useTransform(smoothScrollProgress, [0, 0.2], [0.2, 1]);
    
    // Scale from 0.8 to 1.2 for less aggressive growth
    const scale = useTransform(smoothScrollProgress, [0, 0.5], [0.8, 1.2]);
    const y = useTransform(smoothScrollProgress, [0, 0.5], ['30%', '0%']);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    // Define colors based on the theme
    const borderColor = theme === 'dark' ? 'rgba(5, 14, 25, 0.3)' : 'rgba(0, 0, 190, 0.2)';
    const glowColor = theme === 'dark' ? 'rgba(143, 186, 200, 0.5)' : 'rgba(173, 216, 230, 0.2)';

    return (
        <div ref={containerRef} className="w-full flex items-center justify-center perspective-1000 z-10 mb-8"> {/* Added margin-bottom */}
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
                <iframe
                    className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh]" // Responsive height settings
                    src="https://www.youtube.com/embed/z9sctViHNqg?autoplay=1&mute=1&loop=1&playlist=z9sctViHNqg"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </motion.div>
            {/* Ensure there's enough space below the video */}
            <div style={{ height: '40px' }} /> {/* This div creates space below the video */}
        </div>
    );
};

export default Video;
