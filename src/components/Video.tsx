import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTheme } from 'next-themes';
import { memo } from 'react';

// Optimize debounce function with proper typing
type DebouncedFunction<T extends (...args: unknown[]) => void> = (
  func: T,
  wait: number
) => (...args: Parameters<T>) => void;

const debounce: DebouncedFunction<(...args: unknown[]) => void> = (func, wait) => {
  let timeout: NodeJS.Timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

interface VideoProps {
  id?: string;
  title?: string;
  videoId?: string;
  aspectRatio?: string;
  quality?: 'auto' | 'small' | 'medium' | 'large' | 'hd720' | 'hd1080';
  preload?: boolean;
}

const Video: React.FC<VideoProps> = ({ 
  id, 
  title = "Product Demo Video",
  videoId = "dHTK61HjJBU",
  aspectRatio = "16/9",
  quality = "auto",
  preload = true
}) => {
  // Only track client-side rendering
  const [isClient, setIsClient] = useState(false);
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
  const scale = useTransform(smoothScrollProgress, [0, 0.2], [1, 1.2]);
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
      : 'rgba(255, 255, 255, 0.05)',
    backgroundColor: theme === 'dark' ? '#000' : '#fff'
  }), [theme]);

  // Simplified intersection observer - just for logging
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only log in development
        if (process.env.NODE_ENV === 'development') {
          console.log('Video element visibility:', entry.isIntersecting);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Client-side initialization
  useEffect(() => {
    setIsClient(true);

    // Optimize resize handler with proper debounce
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

  // Generate optimized YouTube URL with privacy-enhanced mode
  const youtubeUrl = useMemo(() => {
    // Use youtube-nocookie.com for enhanced privacy and CSP compliance
    const baseUrl = 'https://www.youtube-nocookie.com/embed/';
    
    const params = new URLSearchParams({
      autoplay: '1',
      mute: '1',
      loop: '1',
      playlist: videoId,
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
      controls: '1',
      ...(quality !== 'auto' && { vq: quality }),
      // Add origin parameter for better security
      origin: typeof window !== 'undefined' ? window.location.origin : '',
    });
    
    return `${baseUrl}${videoId}?${params.toString()}`;
  }, [videoId, quality]);

  // Don't render anything on server
  if (!isClient) return null;

  return (
    <div 
      ref={containerRef} 
      id={id}
      className="w-full min-h-[60vh] flex items-center justify-center perspective-1000 z-10 px-4 sm:px-6 lg:px-8 pt-0 sm:pt-0 lg:pt-4"
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
          backgroundColor: themeColors.backgroundColor,
        }}
        className="w-full max-w-[85vw] sm:max-w-[75vw] md:max-w-[70vw] lg:max-w-[1000px] rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden border-2 sm:border-3 lg:border-4 relative"
        aria-hidden="false"
      >
        <div 
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ backgroundColor: themeColors.overlayColor }}
          aria-hidden="true"
        />
        <iframe
          className="w-full h-full z-[2] relative"
          src={youtubeUrl}
          title={`${title} - Vidéo de démonstration`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading={preload ? "eager" : "lazy"}
          aria-label={`${title} - Vidéo de démonstration du produit`}
          lang="fr"
        />
      </motion.div>
    </div>
  );
};

// Add display name for better debugging
Video.displayName = 'Video';

export default memo(Video);