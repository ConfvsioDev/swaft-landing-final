// src/components/Pain.tsx
import React, { useRef } from 'react';
import { CaretDoubleDown } from '@phosphor-icons/react';
import { motion, useScroll, useTransform } from "motion/react"

const Pain: React.FC = () => {
  // First h1 refs (existing)
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  
  // Second h1 refs
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);
  
  // Third h1 refs
  const ref5 = useRef<HTMLDivElement>(null);
  const ref6 = useRef<HTMLDivElement>(null);

  // First h1 scroll progress (updated)
  const { scrollYProgress: scrollProgress1 } = useScroll({
    target: ref1,
    offset: ["end end", "start start"]
  });

  // Second h1 scroll progress
  const { scrollYProgress: scrollProgress2 } = useScroll({
    target: ref3,
    offset: ["start center", "end start"]
  });

  // Third h1 scroll progress
  const { scrollYProgress: scrollProgress3 } = useScroll({
    target: ref5,
    offset: ["start center", "end start"]
  });

  // Transform values for first h1
  const opacity1 = useTransform(scrollProgress1, [0, 0.5, 1], [0, 1, 0]);
  const scale1 = useTransform(scrollProgress1, [0, 0.5, 1], [0.5, 1, 4]);
  const blur1 = useTransform(scrollProgress1, [0.6, 0.8], ['blur(0px)', 'blur(2px)']);

  // Transform values for second h1
  const opacity2 = useTransform(scrollProgress2, [0, 0.5, 1], [0, 1, 0]);
  const scale2 = useTransform(scrollProgress2, [0, 0.5, 1], [0.5, 1, 4]);
  const blur2 = useTransform(scrollProgress2, [0.6, 0.8], ['blur(0px)', 'blur(2px)']);

  // Transform values for third h1
  const opacity3 = useTransform(scrollProgress3, [0, 0.5, 1], [0, 1, 0]);
  const scale3 = useTransform(scrollProgress3, [0, 0.5, 1], [0.5, 1, 4]);
  const blur3 = useTransform(scrollProgress3, [0.6, 0.8], ['blur(0px)', 'blur(2px)']);

  return (
    <div className='w-full relative h-[400vh]' id='ScrollAnimContainer'>
      <div className='p-4 sm:p-8 min-h-screen sticky top-0 flex items-center' style={{
        background: 'radial-gradient(150% 70% at center bottom, rgba(33, 20, 148, 1) 0%, rgba(33, 20, 148, 0) 100%)'
      }}>
        <div id='ContentWrap' className='min-h-screen w-full relative flex items-center justify-center overflow-hidden'>
            {/* First h3 */}
            <motion.h3 
                className="text-white text-center font-inter font-semibold 
                          text-2xl sm:text-3xl md:text-4xl lg:text-[60px] absolute"
                style={{
                    opacity: opacity1,
                    scale: scale1,
                    filter: blur1,
                    lineHeight: '1.2em',
                    maxWidth: '90vw',
                    width: 'auto',
                }}
            >Tu possèdes un SaaS, mais tu sens que ton produit n'est pas assez bien perçu par tes utilisateurs ?</motion.h3>

            {/* Second h3 */}
            <motion.h3 
                className="text-white text-center font-inter font-semibold 
                          text-2xl sm:text-3xl md:text-4xl lg:text-[60px] absolute"
                style={{
                    opacity: opacity2,
                    scale: scale2,
                    filter: blur2,
                    lineHeight: '1.2em',
                    maxWidth: '90vw',
                    width: 'auto',
                }}
            >Tu remarques que tu as un énorme décalage entre tes visiteurs et tes clients ?</motion.h3>

            {/* Third h3 */}
            <motion.h3 
                className="text-white text-center font-inter font-semibold 
                          text-2xl sm:text-3xl md:text-4xl lg:text-[60px] absolute"
                style={{
                    opacity: opacity3,
                    scale: scale3,
                    filter: blur3,
                    lineHeight: '1.2em',
                    maxWidth: '90vw',
                    width: 'auto',
                }}
            >Tu souhaites améliorer ton SaaS mais tu n'as aucune compétence en Design et tu ne connais que très peu le potentiel de l'UX ?</motion.h3>

            <motion.div 
                className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 w-8 sm:w-12"
                style={{
                    zIndex: 1,
                }}
                animate={{
                    y: [0, 30, 0]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <CaretDoubleDown className="w-full h-full" color="#D9D9D9" />
            </motion.div>
        </div>
      </div>

      <div className='relative h-[200vh] w-full flex flex-col items-start gap-0 p-0 overflow-hidden' 
           style={{ zIndex: 1 }} 
           id='TriggerFrames'>
        <motion.div 
          ref={ref1}
          className='relative w-full h-[45vh] overflow-hidden'
          id="01-halfturn-1"
          initial={{ y: 0 }}
          style={{ y: 0 }}
        ></motion.div>
        <motion.div 
          ref={ref2}
          className='relative w-full h-[45vh] overflow-hidden'
          id="01-halfturn-2"
          initial={{ y: 0 }}
          style={{ y: 0 }}
        ></motion.div>
        <motion.div 
          className='relative w-full h-[10%] overflow-hidden'
          id="spacer"
          initial={{ y: 0 }}
          style={{ y: 0 }}
        ></motion.div>
        <motion.div 
          ref={ref3}
          className='relative w-full h-[45vh] overflow-hidden'
          id="02-halfturn-1"
          initial={{ y: 0 }}
          style={{ y: 0 }}
        ></motion.div>
        <motion.div 
          ref={ref4}
          className='relative w-full h-[45vh] overflow-hidden'
          id="02-halfturn-2"
          initial={{ y: 0 }}
          style={{ y: 0 }}
        ></motion.div>
        <motion.div 
          className='relative w-full h-[10%] overflow-hidden'
          id="spacer"
          initial={{ y: 0 }}
          style={{ y: 0 }}
        ></motion.div>
        <motion.div 
          ref={ref5}
          className='relative w-full h-[45vh] overflow-hidden'
          id="03-halfturn-1"
          initial={{ y: 0 }}
          style={{ y: 0 }}
        ></motion.div>
        <motion.div 
          ref={ref6}
          className='relative w-full h-[45vh] overflow-hidden'
          id="03-halfturn-2"
          initial={{ y: 0 }}
          style={{ y: 0 }}
        ></motion.div>
        <motion.div 
          className='relative w-full h-[10%] overflow-hidden'
          id="spacer"
          initial={{ y: 0 }}
          style={{ y: 0 }}
        ></motion.div>
        
      </div>
    </div>
  );
};

export default Pain;
