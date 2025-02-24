'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { usePostHog } from 'posthog-js/react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { X, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendlyModal: React.FC<CalendlyModalProps> = ({ isOpen, onClose }) => {
  const posthog = usePostHog();
  const [step, setStep] = useState(1);
  const [appointmentInfo, setAppointmentInfo] = useState<{date: string, time: string} | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // WhatsApp URL - remplacer par votre numéro
  const whatsappUrl = "https://wa.me/33600000000?text=Bonjour,%20j'ai%20réservé%20un%20appel%20le%20";

  const handleCalendlyEvent = useCallback((e: MessageEvent) => {
    if (e.data.event && typeof e.data.event === 'string' && e.data.event.indexOf('calendly') === 0) {
      if (e.data.event === 'calendly.event_scheduled') {
        // Extraire les informations de rendez-vous
        const eventData = e.data.payload;
        if (eventData && eventData.event && eventData.event.start_time) {
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
    }
  }, [posthog]);

  useEffect(() => {
    // Ajouter l'écouteur d'événements quand le modal est ouvert
    if (isOpen) {
      window.addEventListener('message', handleCalendlyEvent);
    }
    
    return () => {
      window.removeEventListener('message', handleCalendlyEvent);
    };
  }, [isOpen, handleCalendlyEvent]);

  // Réinitialiser l'état quand le modal se ferme
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setShowConfetti(false);
      }, 300);
    }
  }, [isOpen]);

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

    // Fermer le modal après un délai
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold">
              {step === 1 ? "Réserver un Appel" : "Confirmation"}
            </h2>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 70px)' }}>
            {step === 1 ? (
              <div className="h-[600px]">
                <iframe
                  src="https://calendly.com/swaft-uiux/appel-de-decouverte-pour-un-diagnostic-gratuit?embed_domain=swaft.fr&embed_type=Inline&hide_gdpr_banner=1"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Calendly Scheduling Page"
                  className="w-full h-full"
                ></iframe>
              </div>
            ) : (
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-4">Ce n'est pas encore fini !</h3>
                
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
              </div>
            )}
          </div>

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
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CalendlyModal;