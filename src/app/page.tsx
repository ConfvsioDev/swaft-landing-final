'use client';
import React, { useState, useEffect } from 'react';
import { usePostHog, useFeatureFlagVariantKey } from 'posthog-js/react'
import Hero from '../components/Hero';
import Video from '../components/Video';
import Creations from '../components/Creations';
import Process from '../components/Process';
import Pain from '../components/Pain';
import Testimonials from '@/components/Testimonials';
import Offer from '@/components/Offer';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

const AB_EXPERIMENT_NAME = 'main-cta'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const posthog = usePostHog();
  const abTestVariant = useFeatureFlagVariantKey(AB_EXPERIMENT_NAME);

  const colors = {
    side: '#01020E',
    middle: '#1A1E30',
  };

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (posthog && abTestVariant) {
      posthog.capture('variant_viewed', { variant: abTestVariant });
    }
  }, [posthog, abTestVariant]);

  if (!mounted) return <LoadingSpinner />;

  return (
    <main className='flex min-h-screen flex-col items-center justify-start'>
      {isLoading ? (
        <LoadingSpinner />
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

          {abTestVariant === 'test' ? <Pain /> : <Process id="process" />}

          <Testimonials/>

          <div className="relative w-screen bg-[#F2F2F2] dark:bg-[#01020E] overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 w-full h-full bg-[radial-gradient(#d1d1d1_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#ffffff22_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-30" />
              <div className="absolute inset-x-0 top-0 w-full h-24 sm:h-32 bg-gradient-to-b from-[#F2F2F2] dark:from-[#01020E] to-transparent" />
              <div className="absolute inset-x-0 bottom-0 w-full h-24 sm:h-32 bg-gradient-to-t from-[#F2F2F2] dark:from-[#01020E] to-transparent" />
            </div>
            <Offer id="offer" />
          </div>
        </>
      )}
    </main>
  );
}
