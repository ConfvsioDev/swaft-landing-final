import Image from 'next/image';
import { motion } from 'framer-motion';
import React, { useState, useMemo } from 'react';
import { useTheme } from 'next-themes'; 
import travelerImage from '../../public/images/traveler.png'; 
import Link from 'next/link'; 
import TypingEffect from './TypingEffect';

interface CreationsProps {
    id?: string; 
}

const Creations: React.FC<CreationsProps> = ({ id }) => {
  const { theme } = useTheme(); 
  const [isTypingComplete, setIsTypingComplete] = useState(false); 

  const glowStyle = useMemo(() => theme === 'dark'
    ? '0 0 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 0, 0, 0.3)' 
    : '0 0 20px rgba(173, 216, 230, 0.5), 0 0 40px rgba(173, 216, 230, 0.3)', [theme]);

  const titleColor = useMemo(() => theme === 'dark' ? 'text-white' : 'text-gray-800', [theme]);

  // Define reduced image dimensions for 9:16 aspect ratio
  const IMAGE_DIMENSIONS = {
    width: 480,  // Reduced width
    height: 853, // Reduced height
  };

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
            className="w-full max-w-[480px] rounded-lg overflow-hidden relative mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            style={{
              boxShadow: glowStyle,
              height: IMAGE_DIMENSIONS.height,
            }}
          >
            <div className="overflow-hidden h-full relative">
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
              
              <Image 
                src={travelerImage}
                alt="Notre collaboration actuelle"
                className="object-cover"
                fill
                sizes="(max-width: 480px) 100vw, 480px"
                priority
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
              />
            </div>
          </motion.div>
        </div>

        {/* Text Container - Full width on mobile, half on desktop */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start mt-8 lg:mt-0">
          <motion.div 
            className={`text-lg md:text-xl text-center lg:text-left ${titleColor} mb-6 relative max-w-xl`}
            initial={{ opacity: 0, y: -20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <p className="mb-2">Nous nous adaptons à chaque demande</p>
            <p className="flex items-center justify-center lg:justify-start gap-2">
              afin d'obtenir un résultat
              <TypingEffect onComplete={() => setIsTypingComplete(true)} />
            </p>
          </motion.div>

          <div className="flex justify-center lg:justify-start w-full"> 
            <Link 
              href="/reserver" 
              className={`mt-4 px-8 py-4 rounded-full border ${
                theme === 'dark' 
                  ? 'border-white text-white hover:bg-white hover:text-[#01020E]' 
                  : 'border-[#01020E] text-[#01020E] hover:bg-[#01020E] hover:text-white'
              } transition-colors duration-300 text-lg font-medium`}
            >
              Réserver un Appel
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Creations;
