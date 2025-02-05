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
    <div className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      {/* Background with responsive padding */}
      <div className="absolute inset-x-0 top-0 h-full">
        <div className="absolute inset-0 bg-[radial-gradient(#d1d1d1_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />
        <div className="absolute inset-x-0 top-0 h-24 sm:h-32 bg-gradient-to-b from-[#F2F2F2] dark:from-[#01020E] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-[#F2F2F2] dark:from-[#01020E] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-tight text-[#01020E] dark:text-white"
          style={titleGlow}
        >
          Passez au niveau supérieur
        </h1>
        <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300">
          Il est maintenant temps de faire les bons choix.
        </p>

        {/* Offer Card with responsive width */}
        <div className="mx-auto mt-8 sm:mt-12 md:mt-16 w-full max-w-sm sm:max-w-md">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/90 to-gray-100/90 dark:from-[#14124F]/90 dark:to-[#1E1B74]/90 p-6 sm:p-8 text-left backdrop-blur-sm ring-1 ring-indigo-500/20 dark:ring-white/10 shadow-[0_0_30px_rgba(79,70,229,0.15)] dark:shadow-[0_0_30px_rgba(79,70,229,0.2)]">
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-medium text-gray-900 dark:text-white">Nom de l'offre</h3>
              <p className="mt-2 text-base sm:text-lg text-gray-600 dark:text-gray-300">Détail de l'offre</p>
              
              <button className="mt-6 w-full rounded-full border border-indigo-200/50 dark:border-white/20 bg-white/80 dark:bg-white/10 py-3 text-center text-gray-900 dark:text-white backdrop-blur-sm transition-all hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-[#14124F] text-base sm:text-lg">
                Réserver un appel
              </button>

              <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-blue-400" />
                    <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                      Feature n°{item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;