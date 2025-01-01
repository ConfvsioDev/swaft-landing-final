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
  enter: { rotateY: 90, opacity: 0 },
  center: { rotateY: 0, opacity: 1 },
  exit: { rotateY: -90, opacity: 0 },
};

const Process: React.FC<ProcessProps> = ({ id }) => {
  const [currentStep, setCurrentStep] = useState(0); // Ensures it's initialized to a valid index (0)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { theme } = useTheme();

  // Ensure theme is defined before rendering the component
  if (theme === undefined) {
    return <div>Loading theme...</div>;
  }

  const shadowStyle = useMemo(() => ({
    textShadow:
      theme === "dark"
        ? "0 0 10px rgba(255, 255, 255, 0.6)"
        : "0 0 10px rgba(0, 0, 0, 0.3)",
  }), [theme]);

  // IntersectionObserver to update icon based on step in view
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
        rootMargin: "0px 0px -50% 0px", // Update as step is near the middle
        threshold: 0,
      }
    );

    stepRefs.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => observer.disconnect();
  }, []);

  // Ensure currentStep stays within bounds of steps array
  const currentStepData = steps[currentStep] || steps[0]; // Fallback to the first step if `currentStep` is invalid

  return (
    <div
      id={id}
      className={`w-full min-h-screen relative ${
        theme === "dark"
          ? "bg-gradient-to-b from-[#03030e] to-[#0F0844] text-white"
          : "bg-gradient-to-b from-[#f2f2f2] to-[#a39bf0] text-black"
      }`}
    >
      {/* Section Title */}
      <div className="text-center mb-6">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold neon-effect"
          style={shadowStyle}
        >
          Notre Processus
        </h1>
      </div>
      <div className="lg:block hidden sm:hidden">
        {/* Sticky Icon for larger devices */}
        <div className="lg:flex hidden sticky top-0 h-screen flex-col justify-center items-center pointer-events-none">
          {/* Animated Icon */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={iconVariant}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.1, // Smoother rotation transition
                ease: "easeInOut", // Smooth easing for fluid transition
              }}
              className={`w-32 h-32 rounded-full flex items-center justify-center ${currentStepData.color} absolute`}
            >
              {React.createElement(currentStepData.Icon, {
                className: "w-16 h-16 text-white",
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Fixed Texts (visible on large devices only) */}
        <div className="absolute top-0 w-full lg:block sm:hidden md:hidden">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => {
                stepRefs.current[index] = el;
              }}
              className="absolute"
              style={{
                top: `${index * 100 + 50}vh`, // Adjusted step positioning
                left: index % 2 === 0 ? "10%" : "auto",
                right: index % 2 === 0 ? "auto" : "10%",
                width: "35%",
              }}
            >
              <div className="w-[70%] px-4 pb-24 mx-auto">
                <h2
                  className="text-3xl sm:text-4xl font-bold neon-effect"
                  style={shadowStyle}
                >
                  {step.title}
                </h2>
                <p className="text-xl text-gray-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Scrollable Area */}
        <div className="relative">
          {steps.map((_, index) => (
            <div
              key={index}
              className={index === steps.length - 1 ? "h-[0vh]" : "h-[90vh] sm:h-[100vh]"} // Last step has reduced height
            ></div>
          ))}
        </div>
      </div>

      {/* Stacked Layout for small devices */}
      <div className="lg:hidden">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center mb-16 px-4"
            style={{ position: "relative", width: "100%" }}
          >
            <div className={`w-32 h-32 rounded-full flex items-center justify-center ${step.color} mb-4`}>
              {React.createElement(step.Icon, {
                className: "w-16 h-16 text-white",
              })}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-center" style={shadowStyle}>
              {step.title}
            </h2>
            <p className="text-xl text-gray-500 text-center">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Process;
