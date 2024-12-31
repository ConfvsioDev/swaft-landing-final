import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { Search, Wand2, Code, Rocket } from 'lucide-react';

const steps = [
  {
    title: "Audit complet",
    description: "L'équipe de Swaft réalise un audit complet de ton SaaS afin de fournir toutes les informations nécessaires.",
    Icon: Search,
    color: 'bg-blue-500'
  },
  {
    title: "Création de la maquette",
    description: "Notre designer réalise une maquette basée sur les points faibles vus pendant la première phase.",
    Icon: Wand2,
    color: 'bg-green-500'
  },
  {
    title: "Développement",
    description: "Notre développeur s'occupe de concrétiser la maquette, nous nous occupons d'intégrer le nécessaire afin de traker les KPIs qu'on aura défini au préalable.",
    Icon: Code,
    color: 'bg-purple-500'
  },
  {
    title: "Suivi et garantie",
    description: "Notre équipe assurera un suivi sur 2 semaines pour les résultats. En cas de résultats non satisfaisants, le tout est remboursé.",
    Icon: Rocket,
    color: 'bg-cyan-500'
  }
];

const Process = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false); // Track visibility

  // Use Framer Motion's useScroll hook
  const { scrollY } = useScroll();

  // Calculate current step index based on scroll position
  const stepHeight = window.innerHeight; // Each step takes full viewport height
  const currentStepIndex = useTransform(scrollY, [0, stepHeight * steps.length], [0, steps.length]);

  // Update current step based on scroll position when visible
  useEffect(() => {
    if (!isVisible) return; // Only update steps if in view

    return currentStepIndex.onChange((latest) => {
      const newStep = Math.floor(latest);
      if (newStep !== currentStep && newStep < steps.length) {
        setCurrentStep(newStep);
        controls.start({ opacity: 0, y: -20 });
        setTimeout(() => {
          controls.start({ opacity: 1, y: 0 });
        }, 300);
      }
    });
  }, [currentStepIndex, isVisible]);

  // Intersection Observer to track visibility of the component
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting); // Set visibility based on intersection
        if (entry.isIntersecting) {
          setCurrentStep(0); // Reset to first step when entering view
          controls.start({ opacity: 1 }); // Start animation when in view
        } else {
          controls.start({ opacity: 0 }); // Fade out when out of view
        }
      },
      { threshold: 0.5 } // Trigger when at least 50% of the component is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls]);

  return (
    <div ref={ref} className="relative h-screen overflow-hidden">
      {/* Background for each step */}
      <div className="absolute inset-0 flex flex-col">
        {steps.map((stepData, index) => (
          <motion.div 
            key={index} 
            className={`h-screen flex items-center justify-center ${stepData.color}`} 
            initial={{ opacity: 0 }} 
            animate={isVisible && currentStep === index ? { opacity: 1 } : { opacity: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-white text-5xl font-bold">{stepData.title}</h1>
          </motion.div>
        ))}
      </div>

      {/* Sticky Centered Icon */}
      {isVisible && ( // Render icon only when visible
        <motion.div 
          className="fixed inset-0 flex items-center justify-center"
          animate={controls}
          initial={{ opacity: 0 }} 
          style={{ zIndex: 10 }} 
        >
          <div className="flex items-center justify-center w-48 h-48 shadow-lg rounded-full">
            <div className={`flex items-center justify-center w-32 h-32 ${steps[currentStep].color} rounded-full`}>
              {/* Correctly render the current step's icon */}
              {React.createElement(steps[currentStep].Icon, { className: "w-16 h-16 text-gray-800" })}
            </div>
          </div>
        </motion.div>
      )}

      {/* Text Content */}
      <div className="absolute right-64 top-1/2 transform -translate-y-1/2 max-w-md">
        {isVisible && ( // Render text only when visible
          <>
            <motion.h2 
              className="text-3xl font-bold"
              animate={controls}
              initial={{ opacity: 0 }} 
              transition={{ duration: 0.3 }}
            >
              {steps[currentStep].title}
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-700"
              animate={controls}
              initial={{ opacity: 0 }} 
              transition={{ duration: 0.3 }}
            >
              {steps[currentStep].description}
            </motion.p>
          </>
        )}
      </div>

      <div className="fixed bottom-10 left-0 right-0 flex flex-col items-center">
        <span className="text-gray-600 text-3xl cursor-pointer">&#8595;</span>
        <span className="text-gray-600 text-3xl cursor-pointer mt-1">&#8595;</span>
      </div>
    </div>
  );
};

export default Process;
