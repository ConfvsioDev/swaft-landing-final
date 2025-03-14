import React, { useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { X, MessageCircle } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWhatsAppClick: () => void;
  step: 'confirmation' | 'success';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ 
  isOpen, 
  onClose, 
  onWhatsAppClick,
  step
}) => {
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

  // Lancer les confettis quand on passe à l'étape de succès
  useEffect(() => {
    if (isOpen && step === 'success') {
      launchConfetti();
    }
  }, [isOpen, step, launchConfetti]);

  // Effet pour gérer le scroll du body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  // Add console log for debugging
  useEffect(() => {
    console.log("ConfirmationModal rendered with isOpen:", isOpen, "step:", step);
  }, [isOpen, step]);

  if (!isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Bouton de fermeture */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>

            {/* Contenu du modal selon l'étape */}
            {step === 'confirmation' && (
              <div className="p-6 sm:p-8 text-center">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Ce n'est pas encore fini !
                </h2>
                <p className="mb-6 sm:mb-8 text-gray-700 dark:text-gray-300">
                  Pour continuer, veuillez m'envoyer un message sur WhatsApp indiquant l'heure et la date du rendez-vous que vous souhaitez.
                </p>
                <p className="mb-6 sm:mb-8 text-gray-700 dark:text-gray-300">
                  Une fois envoyé, je vous répondrai et nous pourrons échanger librement comme n'importe quels humains.
                </p>
                <button
                  onClick={onWhatsAppClick}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-500/10 transition-all duration-300 font-medium"
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
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Nous avons hâte d'échanger avec vous et de vous aider à développer votre business.
                </p>
                <div className="w-24 h-24 mx-auto">
                  <MessageCircle className="w-full h-full text-green-500 animate-pulse" />
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal; 