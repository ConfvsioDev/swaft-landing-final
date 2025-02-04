import React, { useMemo } from 'react';
import { useTheme } from 'next-themes';

const Offer: React.FC = () => {
  const { theme } = useTheme();

  const titleGlow = useMemo(() => ({
    textShadow: theme === 'dark' 
      ? '0 0 40px rgba(79, 70, 229, 0.6)'
      : '0 0 40px rgba(79, 70, 229, 0.3)',
  }), [theme]);

  return (
    <div className="relative w-full py-24 px-4">
      {/* Contained dots background with fading edges */}
      <div className="absolute inset-x-0 top-0 h-full">
        <div className="absolute inset-0 bg-[radial-gradient(#d1d1d1_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#F2F2F2] dark:from-[#01020E] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F2F2F2] dark:from-[#01020E] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <h1 
          className="text-5xl font-medium leading-tight text-[#01020E] dark:text-white md:text-6xl lg:text-7xl"
          style={titleGlow}
        >
          Passez au niveau supérieur
        </h1>
        <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 md:text-2xl">
          Il est maintenant temps de faire les bons choix.
        </p>

        {/* Offer Card */}
        <div className="mx-auto mt-12 w-full max-w-md">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/90 to-gray-100/90 dark:from-[#14124F]/90 dark:to-[#1E1B74]/90 p-8 text-left backdrop-blur-sm ring-1 ring-indigo-500/20 dark:ring-white/10 shadow-[0_0_30px_rgba(79,70,229,0.15)] dark:shadow-[0_0_30px_rgba(79,70,229,0.2)]">
            <div className="relative z-10">
              <h3 className="text-2xl font-medium text-gray-900 dark:text-white">Nom de l'offre</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Détail de l'offre</p>
              
              <button className="mt-6 w-full rounded-full border border-indigo-200/50 dark:border-white/20 bg-white/80 dark:bg-white/10 py-3 text-center text-gray-900 dark:text-white backdrop-blur-sm transition-all hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-[#14124F]">
                Réserver un appel
              </button>

              <div className="mt-8 flex items-center space-x-3">
                <div className="h-2 w-2 rounded-full bg-blue-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Feature n°1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;