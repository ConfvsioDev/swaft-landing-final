import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Wand2, Code, Rocket } from "lucide-react";
import { useTheme } from 'next-themes';

interface StepType {
  title: string;
  description: string;
  Icon: React.ElementType;
  color: string;
}

interface ProcessProps {
  id?: string;
}

const steps: StepType[] = [
  {
    title: "Audit complet",
    description:
      "L'équipe de Swaft réalise un audit complet de ton SaaS afin de fournir toutes les informations nécessaires.",
    Icon: Search,
    color: "bg-blue-500",
  },
  {
    title: "Création de la maquette",
    description:
      "Notre designer réalise une maquette basée sur les points faibles vus pendant la première phase.",
    Icon: Wand2,
    color: "bg-green-500",
  },
  {
    title: "Développement",
    description:
      "Notre développeur s'occupe de concrétiser la maquette, nous nous occupons d'intégrer le nécessaire afin de tracker les KPIs qu'on aura défini au préalable.",
    Icon: Code,
    color: "bg-purple-500",
  },
  {
    title: "Suivi et garantie",
    description:
      "Notre équipe assurera un suivi sur 2 semaines pour les résultats. En cas de résultats non satisfaisants, le tout est remboursé.",
    Icon: Rocket,
    color: "bg-cyan-500",
  },
];

const iconVariant = {
  enter: { 
    rotateY: 90, 
    opacity: 0,
    scale: 0.8
  },
  center: { 
    rotateY: 0, 
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1]
    }
  },
  exit: { 
    rotateY: -90, 
    opacity: 0,
    scale: 0.8
  }
};

const Process: React.FC<ProcessProps> = ({ id }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { theme } = useTheme();

  const themeStyles = useMemo(() => ({
    text: theme === "dark" ? "text-white" : "text-gray-900",
    cardBg: theme === "dark" ? "bg-black/5" : "bg-white",
    descriptionText: theme === "dark" ? "text-gray-300" : "text-gray-800",
    shadowStyle: {
      textShadow: theme === "dark"
        ? "0 0 10px rgba(255, 255, 255, 0.6)"
        : "0 0 10px rgba(0, 0, 0, 0.2)",
    },
    iconColor: theme === "dark" ? "text-white" : "text-gray-900",
    iconShadow: theme === "dark"
      ? "shadow-[0_0_30px_rgba(255,255,255,0.1)]"
      : "shadow-[0_0_30px_rgba(0,0,0,0.1)]",
    cardShadow: theme === "dark"
      ? "shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
      : "shadow-[0_8px_30px_rgba(0,0,0,0.1)]",
    gradient: theme === "dark"
      ? "bg-gradient-to-b from-[#01020e] to-[#191662]"
      : "bg-gradient-to-b from-gray-50/50 via-gray-100/70 to-gray-200/90"
  }), [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = stepRefs.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting) {
            setCurrentStep(index);
          }
        });
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0.1,
      }
    );

    stepRefs.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => observer.disconnect();
  }, []);

  const currentStepData = steps[currentStep] || steps[0];

  return (
    <div
      id={id}
      ref={sectionRef}
      className={`w-full relative mx-auto ${themeStyles.text} ${themeStyles.gradient}`}
    >
      <motion.div 
        className="text-center py-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold"
          style={themeStyles.shadowStyle}
        >
          Notre Processus
        </h1>
      </motion.div>

      <div className="lg:block hidden">
        <div className="sticky top-1/2 h-0">
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                variants={iconVariant}
                initial="enter"
                animate="center"
                exit="exit"
                className={`w-32 h-32 rounded-full flex items-center justify-center ${themeStyles.iconShadow}`}
              >
                {React.createElement(currentStepData.Icon, {
                  className: `w-16 h-16 ${themeStyles.iconColor}`
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              ref={(el) => {
                stepRefs.current[index] = el;
              }}
              className={`h-screen flex items-center ${
                index === 0 ? 'mt-64' : ''
              }`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div 
                className={`w-[40%] ${index % 2 === 0 ? 'ml-[5%]' : 'ml-[55%]'}`}
              >
                <motion.div 
                  className={`${themeStyles.cardBg} ${themeStyles.cardShadow} 
                    rounded-2xl p-6`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2
                    className="text-3xl font-bold mb-4 flex items-center gap-3"
                    style={themeStyles.shadowStyle}
                  >
                    <span className={`text-5xl font-light ${theme === "dark" ? "text-white" : "text-gray-700"}`}>
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    {step.title}
                  </h2>
                  <p className={`text-lg leading-relaxed ${themeStyles.descriptionText}`}>
                    {step.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="lg:hidden container mx-auto px-4 md:px-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="flex flex-col md:flex-row md:items-center md:gap-8 mb-16"
          >
            <div className="flex justify-center md:justify-start md:flex-shrink-0">
              <motion.div 
                className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center ${themeStyles.iconShadow}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ rotateY: 90, opacity: 0 }}
                whileInView={{ rotateY: 0, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  ease: [0.23, 1, 0.32, 1]
                }}
              >
                {React.createElement(step.Icon, {
                  className: `w-12 h-12 sm:w-14 sm:h-14 ${themeStyles.iconColor}`
                })}
              </motion.div>
            </div>
            
            <div className="mt-6 md:mt-0 text-center md:text-left">
              <h2 
                className="text-2xl sm:text-3xl font-bold mb-3" 
                style={themeStyles.shadowStyle}
              >
                {step.title}
              </h2>
              <p className={`text-lg ${themeStyles.descriptionText} leading-relaxed max-w-xl`}>
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Process;