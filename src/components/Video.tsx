import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useTheme } from 'next-themes';

interface VideoProps {
  id?: string;
}

const Video: React.FC<VideoProps> = ({ id }) => {
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

  // Responsive transformations based on viewport size
  const rotateX = useTransform(smoothScrollProgress, [0, 0.15], [90, 0]);
  const opacity = useTransform(smoothScrollProgress, [0, 0.2], [0.2, 1]);
  const scale = useTransform(smoothScrollProgress, [0, 0.2], [0.8, 1.2]);
  const y = useTransform(smoothScrollProgress, [0, 0.1], ['30%', '0%']);

  useEffect(() => {
    setIsClient(true);

    // Add resize listener for responsive adjustments
    const handleResize = () => {
      if (containerRef.current) {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isClient) return null;

  // Define colors based on the theme
  const borderColor = theme === 'dark' ? 'rgba(5, 14, 25, 0.3)' : 'rgba(0, 0, 190, 0.2)';
  const glowColor = theme === 'dark' ? 'rgba(0, 0, 139, 0.5)' : 'rgba(173, 216, 230, 0.2)';

  return (
    <div 
      ref={containerRef} 
      id={id}
      className="w-full min-h-[60vh] flex items-center justify-center perspective-1000 z-10 px-4 sm:px-6 lg:px-8 pt-2 sm:pt-10 lg:pt-24"
    >
      <motion.div
        style={{
          rotateX,
          opacity,
          scale,
          y,
          boxShadow: `0 0 20px ${glowColor}, 0 0 40px ${glowColor}`,
          borderColor: borderColor,
        }}
        className="w-full max-w-[85vw] sm:max-w-[75vw] md:max-w-[70vw] lg:max-w-[1000px] aspect-video rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden border-2 sm:border-3 lg:border-4 relative"
      >
        <div className="absolute inset-0 bg-black/5 dark:bg-white/5" />
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/z9sctViHNqg?autoplay=1&mute=1&loop=1&playlist=z9sctViHNqg"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </motion.div>
    </div>
  );
};

export default Video;