import React, { useMemo } from 'react';
import { useTheme } from 'next-themes';

const smoothScroll = (targetId: string) => {
const targetElement = document.getElementById(targetId);
if (!targetElement) return;


const headerOffset = 100; // Account for fixed header
const elementPosition = targetElement.getBoundingClientRect().top;
const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
});
};

const Hero: React.FC = () => {
const { theme } = useTheme();


// Make sure theme is defined before rendering the component
if (theme === undefined) {
    return <div>Loading theme...</div>; // Display a loading state until theme is determined
}

const shadowStyle = useMemo(() => ({
    textShadow: theme === 'dark' 
        ? '0 0 10px rgba(255, 255, 255, 0.6)' 
        : '0 0 10px rgba(0, 0, 0, 0.3)',
}), [theme]);

return (
    <div className="hero text-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight">
            <span 
                className={`inline-block mb-2 sm:mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#01020E]'}`}
                style={shadowStyle}
            >
                Des interfaces intuitives qui
            </span>
            <br />
            <span 
                className={`inline-block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                style={shadowStyle}
            >
                transforment l'expérience utilisateur
            </span>
        </h1>
        <h3 
            className={`mt-4 sm:mt-6 md:mt-8 text-lg sm:text-xl md:text-2xl lg:text-3xl font-light ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
        >
            Optimisez votre taux de conversion grâce à une landing page parfaite.
        </h3>
        <div className="mt-8 sm:mt-10 md:mt-12">
            <button 
                className={`group relative inline-flex items-center overflow-hidden rounded-full h-12 pr-12 pl-6 text-lg font-medium transition-all duration-300 ease-out
                ${theme === 'dark' 
                    ? 'text-white hover:text-black' 
                    : 'text-black hover:text-white'}`}
                onClick={() => smoothScroll('creations')} // Use the smoothScroll function
            >
                <span className="relative z-10 mr-4">
                    Nous découvrir
                </span>
                <span className={`absolute right-0 w-12 h-12 rounded-full transition-all duration-300 ease-out group-hover:w-full
                    ${theme === 'dark' 
                        ? 'bg-white' 
                        : 'bg-black'}`} />
                <span className="absolute right-0 z-10 flex h-12 w-12 items-center justify-center">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        className={`h-6 w-6 rotate-90 ${theme === 'dark' ? 'text-black' : 'text-white'}`}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </span>
            </button>
        </div>
    </div>
);
};

export default Hero;