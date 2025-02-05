import React, { useState, useEffect, useMemo, use } from 'react';
import { animate, motion, useAnimation, useMotionValue } from 'framer-motion';
import { useTheme } from 'next-themes';
import useMeasure from 'react-use-measure';

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
    comment: 'Une expérience exceptionnelle avec une équipe professionnelle.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
  },
  {
    id: 2,
    name: 'Ylian',
    role: 'CEO de TechVision',
    comment: "L'attention aux détails et la qualité du travail sont remarquables.",
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
  },
  {
    id: 3,
    name: 'Theophile',
    role: "Directeur Marketing",
    comment: "Une collaboration fructueuse qui a dépassé nos attentes.",
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
  },
];

const Testimonials: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();
  const controls = useAnimation();

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
    cardBg: theme === 'dark' ? 'bg-[#1A103C]/90' : 'bg-white/90',
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

  let [ref, {width}] = useMeasure();

  const xTranslation = useMotionValue(0);
 
  useEffect(() => {
    let controls;
    let finalPosition = -width / 2 - 8;

    controls = animate(xTranslation, [0, finalPosition], {
      ease: 'linear',
      duration: 40,
      repeat: Infinity,
      repeatType: 'loop',
      repeatDelay: 0,
    });

    return controls.stop;
    }, [xTranslation, width]);


  const sliderVariants = {
    animate: (custom: number) => ({
      x: [`${custom}%`, `${custom - 100}%`],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 60,
          ease: "linear",
        },
      },
    }),
  };

  useEffect(() => {
    controls.start("animate");
  }, [controls]);

  if (!mounted) return null;

  const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
    <motion.div
      className={`${themeStyles.cardBg} ${themeStyles.cardShadow}
        rounded-2xl p-6 backdrop-blur-sm transition-all duration-300
        ${isMobile ? 'w-full' : 'flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px] lg:w-[440px]'}`}
      whileHover={{ 
        scale: isMobile ? 1 : 1.02,
        transition: { duration: 0.2 }
      }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-12 h-12 md:w-14 md:h-14">
          <img
            src={testimonial.avatarUrl}
            alt={testimonial.name}
            className="rounded-full object-cover w-full h-full"
            loading="lazy"
            decoding="async"
          />
          <div className={`absolute inset-0 rounded-full ${
            theme === 'dark'
              ? 'bg-gradient-to-tr from-purple-500/20 to-transparent'
              : 'bg-gradient-to-tr from-indigo-500/10 to-transparent'
          }`} />
        </div>
        <div>
          <h3 className={`font-semibold text-lg ${themeStyles.text}`}>
            {testimonial.name}
          </h3>
          <p className={`text-sm ${themeStyles.roleColor}`}>
            {testimonial.role}
          </p>
        </div>
      </div>
      <p className={`${themeStyles.text} text-base md:text-lg leading-relaxed`}>
        {testimonial.comment}
      </p>
    </motion.div>
  );

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
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        ) : (
          <div className="relative overflow-hidden">
            {/* Left & Right Gradient Fades */}
            <div className={`absolute left-0 top-0 h-full w-16 sm:w-24 md:w-32 z-10 pointer-events-none
                ${themeStyles.fadeLeft} transition-colors duration-300`}
            />
            <div className={`absolute right-0 top-0 h-full w-16 sm:w-24 md:w-32 z-10 pointer-events-none
                ${themeStyles.fadeRight} transition-colors duration-300`}
            />
  
            {/* Scrolling Wrapper */}
            <div className="flex" ref={ref}>
              <motion.div
                className="flex gap-6 py-4"
                ref={ref}
                style={{x: xTranslation}}
                variants={sliderVariants}
                animate={controls}
                custom={0}
              >
                {duplicatedTestimonials.map((testimonial, index) => (
                  <TestimonialCard 
                    key={`${testimonial.id}-${index}`} 
                    testimonial={testimonial} 
                  />
                ))}
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}  

export default Testimonials;
