import Image from 'next/image';
import { motion } from 'motion/react';
import React, { useMemo, useCallback } from 'react';
import { useTheme } from 'next-themes'; 
import travelerImage from '../../public/images/traveler.png'; 
import TypingEffect from './TypingEffect';
import {Button} from './Button';
import { memo } from 'react';

interface CreationsProps {
    id?: string; 
}

const Creations: React.FC<CreationsProps> = ({ id }) => {
  const { theme } = useTheme(); 

  const styles = useMemo(() => ({
    glow: theme === 'dark'
      ? '0 0 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 0, 0, 0.3)'
      : '0 0 20px rgba(173, 216, 230, 0.5), 0 0 40px rgba(173, 216, 230, 0.3)',
    title: theme === 'dark' ? 'text-white' : 'text-gray-800',
    text: theme === 'dark' ? 'text-white' : 'text-gray-800'
  }), [theme]);

  const handleTypingComplete = useCallback(() => {
    // Add any completion logic here
  }, []);

  return (
    <section 
      id={id} 
      className="py-8 sm:py-12 md:py-24 h-[800px] sm:h-[850px] md:h-[700px] w-full overflow-x-hidden"
      aria-label="Nos créations"
      style={{ 
        contentVisibility: 'auto',
        containIntrinsicSize: '0 700px'
      }}
    > 
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between sm:gap-1 lg:gap-2 h-full">
        {/* Image Container with fixed dimensions */}
        <div className="w-full lg:w-1/2 flex flex-col items-center h-[400px] lg:h-[600px]">
          <motion.h1 
            className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center ${styles.title} mb-6 sm:mb-8 h-[40px]`}
            initial={{ opacity: 0, y: -20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            Notre collaboration actuelle
          </motion.h1>
          
          <motion.div
            className="w-full max-w-md rounded-lg overflow-hidden relative"
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            style={{
              boxShadow: styles.glow,
              height: '500px',
              width: '100%',
              aspectRatio: '3/4'
            }}
          >
            <div className="overflow-hidden h-full">
              <Image 
                src={travelerImage} 
                alt="Illustration de notre projet Traveler"
                className="w-full h-full object-contain"
                priority={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="eager"
                placeholder="blur"
                width={400}
                height={500}
                style={{
                  objectFit: 'contain',
                  width: '100%',
                  height: '100%'
                }}
              />
              <div 
                className="absolute top-2 sm:top-4 left-2 sm:left-4 p-2 backdrop-blur-md bg-black bg-opacity-50 rounded-lg"
                aria-hidden="true"
              >
                <h2 className="text-lg sm:text-xl md:text-3xl font-semibold text-white">
                  Traveler
                </h2>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Text Container with fixed height */}
        <div className="w-full lg:w-1/2 flex flex-col items-center mt-6 sm:mt-8 lg:mt-0 text-center h-[200px]">
          <motion.div 
            className={`text-base sm:text-lg md:text-xl mb-4 sm:mb-6 relative max-w-xl ${styles.text} h-[100px]`}
            initial={{ opacity: 0, y: -20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <p className={`mb-2 ${styles.text} h-[30px]`}>
              Nous nous adaptons à chaque demande
            </p>
            <div className="h-[30px]">
              <span>afin d'obtenir un résultat </span>
              <TypingEffect 
                onComplete={handleTypingComplete}
                ariaLabel="Caractéristiques de notre travail"
              />
            </div>
          </motion.div>

          <div className="h-[50px]">
            <Button />
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Creations);
