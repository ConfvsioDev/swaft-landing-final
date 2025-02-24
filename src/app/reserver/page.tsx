'use client';

import React, { useState, useEffect } from 'react';
import { usePostHog } from 'posthog-js/react';
import { InlineWidget } from 'react-calendly';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { MessageCircle } from 'lucide-react';

interface CalendlyEvent {
  event: string;
  payload: {
    event: {
      start_time: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export default function ReserverPage() {
  const posthog = usePostHog();
  const [step, setStep] = useState(1);
  const [appointmentInfo, setAppointmentInfo] = useState<{date: string, time: string} | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // WhatsApp URL - remplacer par votre numéro
  const whatsappUrl = "https://wa.me/33600000000?text=Bonjour,%20j'ai%20réservé%20un%20appel%20le%20";

  useEffect(() => {
    // Track page view
    posthog?.capture('page_view', {
      page: 'reserver'
    });

    // Écouter les événements de Calendly
    const handleCalendlyEvent = (e: MessageEvent) => {
      const data = e.data as CalendlyEvent;
      if (data.event && typeof data.event === 'string' && data.event.indexOf('calendly') === 0) {
        if (data.event === 'calendly.event_scheduled') {
          // Extraire les informations de rendez-vous
          const eventData = data.payload;
          const date = new Date(eventData.event.start_time);
          
          // Formater la date et l'heure
          const formattedDate = date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });
          
          const formattedTime = date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
          });
          
          setAppointmentInfo({
            date: formattedDate,
            time: formattedTime
          });
          
          // Passer à l'étape suivante
          setStep(2);
          
          // Tracker l'événement
          posthog?.capture('appointment_scheduled', {
            date: formattedDate,
            time: formattedTime
          });
        }
      }
    };

    window.addEventListener('message', handleCalendlyEvent);
    
    return () => {
      window.removeEventListener('message', handleCalendlyEvent);
    };
  }, [posthog]);

  const triggerConfetti = () => {
    setShowConfetti(true);
    
    // Lancer les confettis
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Lancer des confettis des deux côtés
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
    
    // Tracker l'événement
    posthog?.capture('whatsapp_redirect', {
      appointment_date: appointmentInfo?.date,
      appointment_time: appointmentInfo?.time
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center">
        Réserver un Appel
      </h1>
      
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl"
          >
            <p className="text-lg text-center max-w-2xl mx-auto mb-8">
              Choisissez un créneau qui vous convient pour un appel de consultation gratuit avec notre équipe.
            </p>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-[600px]">
              <InlineWidget 
                url="https://calendly.com/swaft-uiux/appel-de-decouverte-pour-un-diagnostic-gratuit" 
                styles={{ height: '100%' }}
              />
            </div>
          </motion.div>
        )}
        
        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Ce n'est pas encore fini !</h2>
            
            <p className="mb-6">
              Vous avez réservé un appel le <strong>{appointmentInfo?.date}</strong> à <strong>{appointmentInfo?.time}</strong>.
            </p>
            
            <p className="mb-8">
              Pour confirmer votre rendez-vous, veuillez nous envoyer un message sur WhatsApp en indiquant la date et l'heure de votre rendez-vous.
            </p>
            
            <Link 
              href={`${whatsappUrl}${appointmentInfo?.date}%20à%20${appointmentInfo?.time}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={triggerConfetti}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 transition-colors duration-300 text-white font-medium w-full justify-center"
            >
              <MessageCircle className="w-5 h-5" />
              Nous contacter sur WhatsApp
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
      
      {showConfetti && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
        >
          <div className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 p-8 rounded-xl shadow-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">On se retrouve sur WhatsApp !</h2>
          </div>
        </motion.div>
      )}
    </div>
  );
} 