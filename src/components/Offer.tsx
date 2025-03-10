import React, { useMemo, useRef } from 'react';
import { useTheme } from 'next-themes';
import {Button} from './Button';

interface OfferProps {
  id?: string;
  title?: string;
  description?: string;
  offerName?: string;
  offerDetails?: string;
  features?: string[];
}

const Offer: React.FC<OfferProps> = ({ 
  id,
  title = "Passez au niveau supérieur",
  description = "Il est maintenant temps de faire les bons choix.",
  offerName = "Nom de l'offre",
  offerDetails = "Détails de l'offre",
  features = ["Feature n°1"]
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  const titleGlow = useMemo(() => ({
    textShadow: theme === 'dark' 
      ? '0 0 40px rgba(79, 70, 229, 0.6)'
      : '0 0 40px rgba(79, 70, 229, 0.3)',
  }), [theme]);

  return (
    <section 
      className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8" 
      id={id}
      ref={sectionRef}
      aria-labelledby="offer-title"
    >
      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <h2 
          id="offer-title"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-tight text-[#01020E] dark:text-white"
          style={titleGlow}
        >
          {title}
        </h2>
        <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300">
          {description}
        </p>

        <div className="mx-auto mt-8 sm:mt-12 md:mt-16 w-full max-w-sm sm:max-w-md">
          <article className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/90 to-gray-100/90 dark:from-[#14124F]/90 dark:to-[#1E1B74]/90 p-6 sm:p-8 text-left backdrop-blur-sm ring-1 ring-indigo-500/20 dark:ring-white/10 shadow-[0_0_30px_rgba(79,70,229,0.15)] dark:shadow-[0_0_30px_rgba(79,70,229,0.2)]">
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-medium text-gray-900 dark:text-white">{offerName}</h3>
              <p className="mt-2 text-base sm:text-lg text-gray-600 dark:text-gray-300">{offerDetails}</p>
              
              <div className="mt-6 justify-center flex">
                <Button />
              </div>

              <ul className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <span className="h-2 w-2 rounded-full bg-blue-400" aria-hidden="true" />
                    <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Offer;