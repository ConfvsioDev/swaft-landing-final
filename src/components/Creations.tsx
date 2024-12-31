import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useTheme } from 'next-themes'; 
import travelerImage from './traveler.png'; 
import Link from 'next/link'; 
import TypingEffect from './TypingEffect'; 

interface CreationsProps {
    id?: string; 
}

const Creations: React.FC<CreationsProps> = ({ id }) => {
  const { theme } = useTheme(); 
  const [isTypingComplete, setIsTypingComplete] = useState(false); 

  const glowStyle = theme === 'dark'
    ? '0 0 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 0, 0, 0.3)' 
    : '0 0 20px rgba(173, 216, 230, 0.5), 0 0 40px rgba(173, 216, 230, 0.3)'; 

  const titleColor = theme === 'dark' ? 'text-white' : 'text-gray-800';

  return (
    <section id={id} className="py-12 md:py-24"> 
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 flex flex-col items-center">
          <motion.h1 
            className={`text-3xl md:text-4xl font-bold text-center ${titleColor} mb-4`}
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
              <img 
                src={travelerImage.src} 
                alt="Notre collaboration actuelle"
                className="w-full h-auto object-cover" 
              />
              <div className="absolute top-4 left-4 p-2 backdrop-blur-md bg-black bg-opacity-50 rounded-lg">
                <h2 className={`text-xl md:text-3xl font-semibold text-white`}>Traveler</h2>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="md:w-1/2 flex flex-col items-center md:items-end mt-8 md:mt-0">
          <motion.p 
            className={`text-lg md:text-xl text-center ${titleColor} mb-6 relative`} 
            initial={{ opacity: 0, y: -20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            Nous nous adaptons à chaque demande afin d'obtenir un résultat&nbsp;
            {/* Render TypingEffect with absolute positioning */}
            <span style={{ position: 'relative', display: 'inline-block', marginLeft: '4px' }}>
              <TypingEffect onComplete={() => setIsTypingComplete(true)} />
              {isTypingComplete && (
                <span style={{ marginLeft: '4px', fontWeight: 'bold' }}></span>
              )}
              {/* The dot is positioned right after the typed word */}
            </span>
          </motion.p>

          <div className="flex justify-center w-full"> 
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
