import Image from 'next/image';
import { motion } from 'framer-motion';
import React, { useMemo } from 'react';
import { useTheme } from 'next-themes'; 
import travelerImage from '../../public/images/traveler.png'; 
import TypingEffect from './TypingEffect';
import {Button} from './Button';

interface CreationsProps {
    id?: string; 
}

const Creations: React.FC<CreationsProps> = ({ id }) => {
  const { theme } = useTheme(); 

  const glowStyle = useMemo(() => theme === 'dark'
    ? '0 0 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 0, 0, 0.3)' 
    : '0 0 20px rgba(173, 216, 230, 0.5), 0 0 40px rgba(173, 216, 230, 0.3)', [theme]);

  const titleColor = useMemo(() => theme === 'dark' ? 'text-white' : 'text-gray-800', [theme]);
  const textColor = useMemo(() => theme === 'dark' ? 'text-white' : 'text-gray-800', [theme]);

  return (
    <section 
      id={id} 
      className="py-12 md:py-24 min-h-screen"
      style={{ 
        containIntrinsicSize: '0 500px',
        contentVisibility: 'auto'
      }}
    > 
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Image Container - Full width on mobile, half on desktop */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <motion.h1 
            className={`text-3xl md:text-4xl font-bold text-center ${titleColor} mb-8`}
            initial={{ opacity: 0, y: -20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            Notre collaboration actuelle
          </motion.h1>
          
          <motion.div
            className="max-w-md rounded-lg overflow-hidden relative"
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            style={{
              boxShadow: glowStyle,
            }}
          >
            <div className="overflow-hidden">
              <Image 
                src={travelerImage} 
                alt="Notre collaboration actuelle"
                className="w-full h-auto object-cover"
                loading="lazy" // Added for better performance
              />
              <div className="absolute top-4 left-4 p-2 backdrop-blur-md bg-black bg-opacity-50 rounded-lg">
                <h2 className={`text-xl md:text-3xl font-semibold text-white`}>Traveler</h2>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Text Container - Full width on mobile, half on desktop */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start mt-8 lg:mt-0">
        <motion.div 
            className={`text-lg md:text-xl text-center lg:text-left mb-6 relative max-w-xl ${textColor}`}
            initial={{ opacity: 0, y: -20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <p className={`mb-2 ${textColor}`}>Nous nous adaptons à chaque demande</p>
            <p className="flex items-center justify-center lg:justify-start gap-2 flex-wrap">
              <span>afin d'obtenir un résultat</span>
              <TypingEffect onComplete={() => {}} />
            </p>
          </motion.div>

          <Button />
        </div>
      </div>
    </section>
  );
};

export default Creations;
