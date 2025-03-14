// src/components/Pain.tsx
'use client';

import React, { useRef } from 'react';
import { CaretDoubleDown } from '@phosphor-icons/react';
import { motion, useScroll, useTransform } from "motion/react"

interface PainProps {
  questions?: string[];
}

interface QuestionRef {
  main: React.RefObject<HTMLDivElement | null>;
  trigger: React.RefObject<HTMLDivElement | null>;
}

const Pain: React.FC<PainProps> = ({ 
  questions = [
    "Tu possèdes un SaaS, mais tu sens que ton produit n'est pas assez bien perçu par tes utilisateurs ?",
    "Tu remarques que tu as un énorme décalage entre tes visiteurs et tes clients ?",
    "Tu souhaites améliorer ton SaaS mais tu n'as aucune compétence en Design et tu ne connais que très peu le potentiel de l'UX ?"
  ] 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Fix the ref typing
  const questionRefs = useRef<QuestionRef[]>(
    questions.map(() => ({
      main: React.createRef<HTMLDivElement>(),
      trigger: React.createRef<HTMLDivElement>()
    }))
  ).current;

  // Create individual scroll progress values and transform configs for each question
  // This avoids calling hooks inside a callback
  const scrollConfig0 = useScroll({
    target: questionRefs[0].main,
    offset: ["start center", "end start"]
  });
  const opacity0 = useTransform(scrollConfig0.scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale0 = useTransform(scrollConfig0.scrollYProgress, [0, 0.5, 1], [0.5, 1, 4]);
  const blur0 = useTransform(scrollConfig0.scrollYProgress, [0.6, 0.8], ['blur(0px)', 'blur(2px)']);

  const scrollConfig1 = useScroll({
    target: questionRefs[1].main,
    offset: ["start center", "end start"]
  });
  const opacity1 = useTransform(scrollConfig1.scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale1 = useTransform(scrollConfig1.scrollYProgress, [0, 0.5, 1], [0.5, 1, 4]);
  const blur1 = useTransform(scrollConfig1.scrollYProgress, [0.6, 0.8], ['blur(0px)', 'blur(2px)']);

  const scrollConfig2 = useScroll({
    target: questionRefs[2].main,
    offset: ["start center", "end start"]
  });
  const opacity2 = useTransform(scrollConfig2.scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale2 = useTransform(scrollConfig2.scrollYProgress, [0, 0.5, 1], [0.5, 1, 4]);
  const blur2 = useTransform(scrollConfig2.scrollYProgress, [0.6, 0.8], ['blur(0px)', 'blur(2px)']);

  // Combine the transform values into an array for easy access
  const scrollConfigs = [
    { opacity: opacity0, scale: scale0, blur: blur0 },
    { opacity: opacity1, scale: scale1, blur: blur1 },
    { opacity: opacity2, scale: scale2, blur: blur2 },
  ];

  return (
    <section 
      className='w-full relative h-[400vh]' 
      ref={containerRef}
      aria-label="Questions principales"
    >
      <div 
        className='p-4 sm:p-8 min-h-screen sticky top-0 flex items-center'
        style={{
          background: 'radial-gradient(150% 70% at center bottom, rgba(33, 20, 148, 1) 0%, rgba(33, 20, 148, 0) 100%)'
        }}
      >
        <div className='min-h-screen w-full relative flex items-center justify-center overflow-hidden'>
          {questions.map((question, index) => (
            <motion.h2
              key={index}
              className="text-white text-center font-inter font-semibold 
                        text-2xl sm:text-3xl md:text-4xl lg:text-[60px] absolute"
              style={{
                opacity: scrollConfigs[index].opacity,
                scale: scrollConfigs[index].scale,
                filter: scrollConfigs[index].blur,
                lineHeight: '1.2em',
                maxWidth: '90vw',
                width: 'auto',
              }}
            >
              {question}
            </motion.h2>
          ))}

          <motion.div 
            className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 w-8 sm:w-12"
            animate={{ y: [0, 30, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            aria-hidden="true"
          >
            <CaretDoubleDown className="w-full h-full" color="#D9D9D9" />
          </motion.div>
        </div>
      </div>

      <div className='relative h-[200vh] w-full flex flex-col items-start gap-0 p-0 overflow-hidden'>
        {questions.map((_, index) => (
          <React.Fragment key={index}>
            <motion.div 
              ref={questionRefs[index].main}
              className='relative w-full h-[45vh] overflow-hidden'
            />
            <motion.div 
              ref={questionRefs[index].trigger}
              className='relative w-full h-[45vh] overflow-hidden'
            />
            <motion.div 
              className='relative w-full h-[10%] overflow-hidden'
            />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Pain;
