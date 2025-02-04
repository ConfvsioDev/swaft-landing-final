import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link'; 
import { useTheme } from 'next-themes';

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
    role: "Fondatrice d'un gros caca",
    comment: 'BG DE LA STREET',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
  },
  {
    id: 2,
    name: 'Ylian',
    role: 'Fondateur de ImboutaCum',
    comment: "Je suis aigri et je n'ai pas d'amis",
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
  },
  {
    id: 3,
    name: 'Theophile',
    role: "Fondatrice du chomage",
    comment: "J'ai tjrs pas sorti mon ebook",
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
  },
];

interface TestimonialsProps {
  theme?: 'dark' | 'light';
}

const Testimonials: React.FC<TestimonialsProps> = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  const themeStyles = useMemo(() => ({
    text: theme === 'dark' ? 'text-white' : 'text-gray-900',
    cardBg: theme === 'dark' ? 'bg-[#1A103C]' : 'bg-white',
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
  }), [theme]);

  // Double the testimonials array for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="min-h-screen py-24 px-4 overflow-hidden">
      
      <motion.div
        className="relative max-w-7xl mx-auto"
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        <motion.h2
          className={`text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 ${themeStyles.text}`}
          variants={itemVariants}
          style={themeStyles.textShadow}
        >
          Ce qu'ils en pensent
        </motion.h2>
        <motion.p
          className={`text-lg md:text-xl text-center mb-8 md:mb-16 ${themeStyles.subtitleColor}`}
          variants={itemVariants}
        >
          Voici ce que nos clients disent de nous
        </motion.p>

        <motion.div
          className="flex justify-center mb-8 md:mb-16"
          variants={itemVariants}
        >
          <div className="flex justify-center w-full"> 
            <Link 
              href="/reserver" 
              className={`mt-4 px-6 py-3 md:px-8 md:py-4 rounded-full border ${
                theme === 'dark' 
                  ? 'border-white text-white hover:bg-white hover:text-[#01020E]' 
                  : 'border-[#01020E] text-[#01020E] hover:bg-[#01020E] hover:text-white'
              } transition-colors duration-300 text-base md:text-lg font-medium`}
            >
              Réserver un Appel
            </Link>
          </div>
        </motion.div>

        <div className="relative overflow-hidden">
          {/* Fade effect on the left side */}
          <div className={`absolute left-0 top-0 h-full w-8 md:w-16 pointer-events-none z-10 ${theme === 'dark' ? 'bg-gradient-to-r from-[#01020E] to-transparent' : 'bg-gradient-to-r from-[#E5E7EB] to-transparent'}`} />
          {/* Fade effect on the right side */}
          <div className={`absolute right-0 top-0 h-full w-8 md:w-16 pointer-events-none z-10 ${theme === 'dark' ? 'bg-gradient-to-l from-[#01020E] to-transparent' : 'bg-gradient-to-l from-[#E5E7EB] to-transparent'}`} />
          <motion.div
            className="flex gap-4 md:gap-6 py-4"
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              x: {
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              },
            }}
            style={{
              width: '100%',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                className={`${themeStyles.cardBg} ${themeStyles.cardShadow} 
                  rounded-2xl p-4 md:p-6 flex-shrink-0 w-[200px] sm:w-[250px] md:w-[300px] lg:w-[400px] 
                  backdrop-blur-sm bg-opacity-90 transition-colors duration-300`}
                whileHover={{ 
                  scale: 1.02, 
                  transition: { duration: 0.2 } 
                }}
              >
                <div className="flex items-center gap-3 md:gap-4 mb-4">
                  <div className="relative w-10 h-10 md:w-12 md:h-12">
                    <img
                      src={testimonial.avatarUrl}
                      alt={testimonial.name}
                      className="rounded-full object-cover w-full h-full"
                    />
                    <div className={`absolute inset-0 rounded-full ${
                      theme === 'dark'
                        ? 'bg-gradient-to-tr from-purple-500/20 to-transparent'
                        : 'bg-gradient-to-tr from-indigo-500/10 to-transparent'
                    }`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${themeStyles.text}`}>{testimonial.name}</h3>
                    <p className={`text-sm ${themeStyles.roleColor}`}>{testimonial.role}</p>
                  </div>
                </div>
                <p className={`${themeStyles.text} text-base md:text-lg leading-relaxed`}>
                  {testimonial.comment}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;