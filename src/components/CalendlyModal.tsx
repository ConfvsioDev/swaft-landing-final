import React, { useState, useEffect, useCallback } from 'react';
import { InlineWidget } from 'react-calendly';
import { motion, AnimatePresence } from 'framer-motion';
import { usePostHog } from 'posthog-js/react';
import confetti from 'canvas-confetti';
import { X, MessageCircle } from 'lucide-react';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Définir un type pour l'événement Calendly
interface CalendlyEventData {
  event: string;
  data?: {
    event?: {
      start_time?: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

const CalendlyModal: React.FC<CalendlyModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'calendly' | 'whatsapp' | 'success'>('calendly');
  const [eventDetails, setEventDetails] = useState<{ date?: string; time?: string }>({});
  const posthog = usePostHog();

  // URL de Calendly exacte fournie
  const calendlyUrl = "https://calendly.com/swaft-uiux/appel-de-decouverte-pour-un-diagnostic-gratuit";
  
  // URL de WhatsApp (à remplacer par votre numéro)
  const whatsappUrl = "https://wa.me/33600000000";

  // Fonction pour lancer les confettis
  const launchConfetti = useCallback(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

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
  }, []);

  // Gérer la fermeture du modal
  const handleClose = useCallback(() => {
    setStep('calendly');
    onClose();
    
    // Tracking PostHog
    posthog?.capture('calendly_modal_closed', {
      step: step
    });
  }, [onClose, posthog, step]);

  // Gérer l'événement de réservation Calendly
  const handleEventScheduled = useCallback((event: CalendlyEventData) => {
    try {
      // Extraire la date et l'heure de l'événement
      if (event.data?.event?.start_time) {
        const eventDate = new Date(event.data.event.start_time);
        const formattedDate = eventDate.toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
        const formattedTime = eventDate.toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit'
        });

        setEventDetails({
          date: formattedDate,
          time: formattedTime
        });

        // Passer à l'étape WhatsApp
        setStep('whatsapp');
        
        // Tracking PostHog
        posthog?.capture('calendly_event_scheduled', {
          event_date: formattedDate,
          event_time: formattedTime
        });
      }
    } catch (error) {
      console.error('Erreur lors du traitement de l\'événement Calendly:', error);
    }
  }, [posthog]);

  // Gérer le clic sur le bouton WhatsApp
  const handleWhatsAppClick = useCallback(() => {
    // Passer à l'étape de succès
    setStep('success');
    
    // Lancer les confettis
    launchConfetti();
    
    // Tracking PostHog
    posthog?.capture('whatsapp_redirect', {
      from: 'calendly_modal',
      with_event_details: !!eventDetails.date
    });
    
    // Ouvrir WhatsApp dans un nouvel onglet
    window.open(whatsappUrl, '_blank');
    
    // Fermer automatiquement le modal après quelques secondes
    setTimeout(() => {
      handleClose();
    }, 5000);
  }, [eventDetails, handleClose, launchConfetti, posthog, whatsappUrl]);

  // Effet pour gérer le scroll du body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      // Ajouter l'écouteur d'événement pour Calendly
      const handleCalendlyEvent = (e: MessageEvent<CalendlyEventData>) => {
        if (e.data.event && e.data.event === 'calendly.event_scheduled') {
          handleEventScheduled(e.data);
        }
      };
      
      window.addEventListener('message', handleCalendlyEvent as EventListener);
      
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('message', handleCalendlyEvent as EventListener);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, handleEventScheduled]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative w-full max-w-3xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden flex flex-col"
            style={{ 
              maxHeight: 'calc(100vh - 16px)',
              height: step === 'calendly' ? 'calc(100vh - 16px)' : 'auto'
            }}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Bouton de fermeture */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>

            {/* Contenu du modal selon l'étape */}
            <div className="w-full h-full overflow-auto">
              {step === 'calendly' && (
                <div className="h-full">
                  <InlineWidget
                    url={calendlyUrl}
                    styles={{ 
                      height: '100%', 
                      width: '100%',
                      minHeight: '100%' 
                    }}
                    prefill={{
                      email: "",
                      firstName: "",
                      lastName: "",
                      name: ""
                    }}
                    pageSettings={{
                      backgroundColor: 'ffffff',
                      hideEventTypeDetails: false,
                      hideLandingPageDetails: false,
                      primaryColor: '2B1AC1',
                      textColor: '000000'
                    }}
                    utm={{
                      utmCampaign: 'landing_page',
                      utmContent: 'button_cta',
                      utmMedium: 'website',
                      utmSource: 'swaft'
                    }}
                  />
                </div>
              )}

              {step === 'whatsapp' && (
                <div className="p-6 sm:p-8 text-center">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    Ce n'est pas encore fini !
                  </h2>
                  <p className="mb-4 sm:mb-6 text-gray-700 dark:text-gray-300">
                    Merci d'avoir réservé un appel pour le <strong>{eventDetails.date}</strong> à <strong>{eventDetails.time}</strong>.
                  </p>
                  <p className="mb-6 sm:mb-8 text-gray-700 dark:text-gray-300">
                    Pour confirmer votre rendez-vous, veuillez nous envoyer un message sur WhatsApp en indiquant la date et l'heure de votre rendez-vous.
                  </p>
                  <button
                    onClick={handleWhatsAppClick}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 transition-colors duration-300 text-white font-medium"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Continuer sur WhatsApp
                  </button>
                </div>
              )}

              {step === 'success' && (
                <div className="p-6 sm:p-8 text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
                    On se retrouve sur WhatsApp !
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    Nous avons hâte d'échanger avec vous et de vous aider à développer votre business.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CalendlyModal;
