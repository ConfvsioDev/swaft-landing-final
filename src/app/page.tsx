'use client';
import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Video from '../components/Video';
import Creations from '../components/Creations';
import Process from '../components/Process';
import Pain from '../components/Pain';
import { useFeatureFlagVariantKey } from 'posthog-js/react'
import { posthog } from '@/lib/posthog'
import { motion } from 'motion/react';
import { SecondButton } from '@/components/SecondButton';

interface LoadingSpinnerProps {
  'aria-label': string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 'aria-label': ariaLabel }) => {
  return (
    <div className="flex justify-center items-center w-full h-screen" aria-label={ariaLabel}>
      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const colors = React.useMemo(() => ({
    side: '#01020E',
    middle: '#1A1E30',
  }), []);

  const variant = useFeatureFlagVariantKey('main-cta')

  useEffect(() => {
    if (variant !== null) {
      posthog.capture('$feature_flag_called', {
        $feature_flag: 'main-cta',
        $feature_flag_response: variant,
        $feature_flag_decision: true
      })
    }
  }, [variant])

  return (
    <main className='flex min-h-screen flex-col items-center justify-start' role="main">
      {isLoading ? (
        <LoadingSpinner aria-label="Loading content" />
      ) : (
        <>
          <Hero />
          <Video id="video" />

          
          <div className="w-full h-0.5 mt-24 mx-auto">
            <div 
              className="h-full bg-gradient-to-r"
              style={{
                backgroundImage: `linear-gradient(to right, ${colors.side}, ${colors.middle}, ${colors.side})`,
                filter: 'blur(1px)',
              }}
            />
          </div>

          <Creations id="creations" />
          
          <div style={{ height: '8vh' }}></div>

          <div className="relative w-screen bg-[#01020E] overflow-hidden"></div>

           {variant === 'test' ? <Pain /> : <Process />}

           <div className="w-full pt-40 pb-48 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white"
            >
              Prêt à transformer votre SaaS ?
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <SecondButton />
            </motion.div>
          </div>

          {/* <Testimonials/> */}

          {/* <div className="relative w-screen bg-[#F2F2F2] dark:bg-[#01020E] overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 w-full h-full bg-[radial-gradient(#d1d1d1_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#ffffff22_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-30" />
              <div className="absolute inset-x-0 top-0 w-full h-24 sm:h-32 bg-gradient-to-b from-[#F2F2F2] dark:from-[#01020E] to-transparent" />
              <div className="absolute inset-x-0 bottom-0 w-full h-24 sm:h-32 bg-gradient-to-t from-[#F2F2F2] dark:from-[#01020E] to-transparent" />
            </div>
            <Offer id="offer" />
          </div> */}
        </>
      )}
    </main>
  );
}



