'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, useMotionValue, animate } from 'motion/react';
import { useTheme } from 'next-themes';
import useMeasure from 'react-use-measure';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  comment: string;
  avatarUrl: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Nathan',
    role: "Fondateur de Swaft",
    comment: 'Le GOAT',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
  },
  {
    id: 2,
    name: 'Ylian',
    role: 'Fondateur de Swaft',
    comment: "J'suis aigri",
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
  },
  {
    id: 3,
    name: 'Theophyl',
    role: "Fondateur de Swaft",
    comment: "Mon ebook tjrs pas fini",
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
  },
];

interface ThemeStyles {
  text: string;
  cardBg: string;
  subtitleColor: string;
  roleColor: string;
  background: string;
  cardShadow: string;
  textShadow: {
    textShadow: string;
  };
  fadeLeft: string;
  fadeRight: string;
}

const TestimonialCard = React.memo(({ testimonial, themeStyles, isMobile }: {
  testimonial: Testimonial;
  themeStyles: ThemeStyles;
  isMobile: boolean;
}) => (
  <motion.div
    className={`${themeStyles.cardBg} rounded-[20px] p-8
      backdrop-blur-sm transition-all duration-300 border border-blue-500/10
      bg-gradient-to-b from-[blue-900/10] to-transparent
      ${isMobile ? 'w-full' : 'flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px] lg:w-[440px]'}`}
    whileHover={{ 
      scale: isMobile ? 1 : 1.02,
      transition: { duration: 0.2 }
    }}
  >
    <div className="flex items-center gap-4 mb-6">
      <div className="relative w-12 h-12 md:w-14 md:h-14">
        <Image
          src={testimonial.avatarUrl}
          alt={`${testimonial.name}'s avatar`}
          className="rounded-full object-cover w-full h-full ring-2 ring-purple-500/20"
          loading="lazy"
          width={56}
          height={56}
          quality={75}
        />
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/20 to-transparent" />
      </div>
      <div>
        <h3 className={`font-semibold text-lg ${themeStyles.text}`}>
          {testimonial.name}
        </h3>
        <p className="text-sm text-purple-400">
          {testimonial.role}
        </p>
      </div>
    </div>
    <p className={`${themeStyles.text} text-base md:text-lg leading-relaxed opacity-90`}>
      {testimonial.comment}
    </p>
  </motion.div>
));

TestimonialCard.displayName = 'TestimonialCard';

const Testimonials: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();
  const [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const themeStyles = useMemo(() => ({
    text: theme === 'dark' ? 'text-white' : 'text-gray-900',
    cardBg: theme === 'dark' ? 'bg-[#0A051E]' : 'bg-[#e8eaed]',
    subtitleColor: theme === 'dark' ? 'text-gray-400' : 'text-gray-700',
    roleColor: theme === 'dark' ? 'text-indigo-400' : 'text-indigo-700',
    background: theme === 'dark'
      ? 'bg-gradient-to-br from-[#0A051E] via-[#120B38] to-[#1A103C]'
      : 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200',
    cardShadow: theme === 'dark'
      ? 'shadow-[0_8px_30px_rgba(0,0,0,0.3)]'
      : 'shadow-[0_8px_30px_rgba(0,0,0,0.1)]',
    textShadow: {
      textShadow: theme === 'dark'
        ? '0 0 10px rgba(255, 255, 255, 0.6)'
        : '0 0 10px rgba(0, 0, 0, 0.2)',
    },
    fadeLeft: theme === 'dark'
      ? 'bg-gradient-to-r from-[#01020E] via-[#01020E]/80 to-transparent'
      : 'bg-gradient-to-r from-[#f2f2f2] via-gray-50/90 to-transparent',
    fadeRight: theme === 'dark'
      ? 'bg-gradient-to-l from-[#01020E] via-[#01020E]/80 to-transparent'
      : 'bg-gradient-to-l from-[#f2f2f2] via-gray-200/90 to-transparent',
  }), [theme]);

  useEffect(() => {
    const finalPosition = -width / 2 - 8;
    const controls = animate(xTranslation, [0, finalPosition], {
      ease: 'linear',
      duration: 40,
      repeat: Infinity,
      repeatType: 'loop',
      repeatDelay: 0,
    });

    return controls.stop;
  }, [xTranslation, width]);

  if (!mounted) return null;

  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-24 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 ${themeStyles.text}`}
          style={themeStyles.textShadow}
        >
          Ce qu'ils en pensent
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`text-lg md:text-xl text-center mb-16 ${themeStyles.subtitleColor}`}
        >
          Découvrez les retours de nos clients satisfaits
        </motion.p>

        {isMobile ? (
          <div className="space-y-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial} 
                themeStyles={themeStyles} 
                isMobile={isMobile} 
              />
            ))}
          </div>
        ) : (
          <div className="relative overflow-hidden">
            <div className={`absolute left-0 top-0 h-full w-16 sm:w-24 md:w-32 z-10 pointer-events-none
                ${themeStyles.fadeLeft} transition-colors duration-300`}
            />
            <div className={`absolute right-0 top-0 h-full w-16 sm:w-24 md:w-32 z-10 pointer-events-none
                ${themeStyles.fadeRight} transition-colors duration-300`}
            />

            <div className="flex" ref={ref}>
              <motion.div
                className="flex gap-6 py-4"
                style={{ x: xTranslation }}
              >
                {duplicatedTestimonials.map((testimonial, index) => (
                  <TestimonialCard 
                    key={`${testimonial.id}-${index}`} 
                    testimonial={testimonial} 
                    themeStyles={themeStyles}
                    isMobile={isMobile}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

Testimonials.displayName = 'Testimonials';

export default React.memo(Testimonials);