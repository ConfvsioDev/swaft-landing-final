import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useTheme } from 'next-themes';
import { memo } from 'react';

// Replace lodash debounce with a custom implementation
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

interface VideoProps {
  id?: string;
  title?: string;
  videoId?: string;
  aspectRatio?: string;
  quality?: 'auto' | 'low' | 'medium' | 'high';
  preload?: boolean;
}

const Video: React.FC<VideoProps> = ({ 
  id, 
  title = "Product Demo Video",
  videoId = "z9sctViHNqg",
  aspectRatio = "16/9",
  quality = "auto",
  preload = true
}) => {
  const [isClient, setIsClient] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  // Optimize scroll tracking with better offset values
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
    layoutEffect: false // Optimize performance by using useEffect instead of useLayoutEffect
  });

  // Enhanced spring configuration for smoother animations
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 15,
    restDelta: 0.001
  });

  // Optimize transformations with better performance values
  const rotateX = useTransform(smoothScrollProgress, [0, 0.15], [90, 0]);
  const opacity = useTransform(smoothScrollProgress, [0, 0.2], [0.2, 1]);
  const scale = useTransform(smoothScrollProgress, [0, 0.2], [0.8, 1.2]);
  const y = useTransform(smoothScrollProgress, [0, 0.1], ['30%', '0%']);

  // Memoize theme-dependent values with enhanced visual effects
  const themeColors = useMemo(() => ({
    borderColor: theme === 'dark' 
      ? 'rgba(5, 14, 25, 0.3)' 
      : 'rgba(0, 0, 190, 0.2)',
    glowColor: theme === 'dark' 
      ? 'rgba(0, 0, 139, 0.5)' 
      : 'rgba(173, 216, 230, 0.2)',
    overlayColor: theme === 'dark'
      ? 'rgba(0, 0, 0, 0.05)'
      : 'rgba(255, 255, 255, 0.05)'
  }), [theme]);

  // Intersection Observer for better performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Optimize resize handler
  useEffect(() => {
    setIsClient(true);

    const handleResize = debounce(() => {
      if (containerRef.current) {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }
    }, 250);

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate optimized YouTube URL
  const youtubeUrl = useMemo(() => {
    const params = new URLSearchParams({
      autoplay: isInView ? '1' : '0',
      mute: '1',
      loop: '1',
      playlist: videoId,
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
      controls: '0',
      ...(quality !== 'auto' && { vq: quality })
    });
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  }, [videoId, quality, isInView]);

  if (!isClient) return null;

  return (
    <div 
      ref={containerRef} 
      id={id}
      className="w-full min-h-[60vh] flex items-center justify-center perspective-1000 z-10 px-4 sm:px-6 lg:px-8 pt-0 sm:pt-10 lg:pt-24"
      role="region"
      aria-label={title}
    >
      <motion.div
        style={{
          rotateX,
          opacity,
          scale,
          y,
          boxShadow: `0 0 20px ${themeColors.glowColor}, 0 0 40px ${themeColors.glowColor}`,
          borderColor: themeColors.borderColor,
          aspectRatio,
        }}
        className="w-full max-w-[85vw] sm:max-w-[75vw] md:max-w-[70vw] lg:max-w-[1000px] rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden border-2 sm:border-3 lg:border-4 relative"
      >
        <div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ backgroundColor: themeColors.overlayColor }}
        />
        <iframe
          className="w-full h-full"
          src={youtubeUrl}
          title={`${title} - Vidéo de démonstration`} // More descriptive title
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading={preload ? "eager" : "lazy"}
          aria-label={`${title} - Vidéo de démonstration du produit`}
        />
      </motion.div>
    </div>
  );
};

// Add display name for better debugging
Video.displayName = 'Video';

export default memo(Video);