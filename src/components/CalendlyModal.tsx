import React, { useState, useEffect, useCallback } from 'react';
import { InlineWidget } from 'react-calendly';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ConfirmationModal from './ConfirmationModal';

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
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationStep, setConfirmationStep] = useState<'confirmation' | 'success'>('confirmation');
  const [eventDetails, setEventDetails] = useState<{ date?: string; time?: string }>({});

  // URL de Calendly exacte fournie
  const calendlyUrl = "https://calendly.com/swaft-uiux/appel-de-decouverte-pour-un-diagnostic-gratuit";
  
  // URL de WhatsApp (à remplacer par votre numéro)
  const whatsappUrl = "https://wa.me/33600000000";

  // Gérer la fermeture du modal
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Gérer l'événement de réservation Calendly
  const handleEventScheduled = useCallback((event: CalendlyEventData) => {
    try {
      // Extraire la date et l'heure de l'événement
      if (event.data?.event?.start_time) {
        const eventDate = new Date(event.data.event.start_time as string);
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

        // Fermer le modal Calendly et ouvrir le modal de confirmation
        onClose();
        setTimeout(() => {
          setShowConfirmation(true);
        }, 300); // Petit délai pour éviter les problèmes d'animation
      }
    } catch (error) {
      console.error('Erreur lors du traitement de l\'événement Calendly:', error);
    }
  }, [onClose]);

  // Gérer le clic sur le bouton WhatsApp
  const handleWhatsAppClick = useCallback(() => {
    // Passer à l'étape de succès
    setConfirmationStep('success');
    
    // Ouvrir WhatsApp dans un nouvel onglet
    window.open(`${whatsappUrl}?text=Bonjour, je souhaite confirmer mon rendez-vous du ${eventDetails.date} à ${eventDetails.time}.`, '_blank');
    
    // Fermer automatiquement le modal après quelques secondes
    setTimeout(() => {
      setShowConfirmation(false);
      setConfirmationStep('confirmation');
    }, 5000);
  }, [eventDetails, whatsappUrl]);

  // Effet pour gérer le scroll du body et les événements Calendly
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      // Ajouter l'écouteur d'événement pour Calendly
      const handleCalendlyEvent = (e: MessageEvent) => {
        const data = e.data as CalendlyEventData;
        if (data.event && data.event === 'calendly.event_scheduled') {
          handleEventScheduled(data);
        }
      };
      
      window.addEventListener('message', handleCalendlyEvent);
      
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('message', handleCalendlyEvent);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, handleEventScheduled]);

  // Réinitialiser l'état du modal de confirmation lorsque le modal principal est fermé
  useEffect(() => {
    if (!isOpen) {
      setConfirmationStep('confirmation');
    }
  }, [isOpen]);

  return (
    <>
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
                height: 'calc(100vh - 16px)'
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

              {/* Contenu du modal Calendly */}
              <div className="w-full h-full overflow-hidden">
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
                      backgroundColor: '1e1e1e',
                      hideEventTypeDetails: false,
                      hideLandingPageDetails: false,
                      primaryColor: '2B1AC1',
                      textColor: 'ffffff'
                    }}
                    utm={{
                      utmCampaign: 'landing_page',
                      utmContent: 'button_cta',
                      utmMedium: 'website',
                      utmSource: 'swaft'
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de confirmation après réservation */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        eventDetails={eventDetails}
        onWhatsAppClick={handleWhatsAppClick}
        step={confirmationStep}
      />
    </>
  );
};

export default CalendlyModal;
