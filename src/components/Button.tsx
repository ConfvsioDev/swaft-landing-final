import { useCallback, useState, memo, useEffect } from "react";
import { Engine } from "tsparticles-engine";
import { Particles } from "react-tsparticles";
import { usePostHog } from 'posthog-js/react';
import { loadSlim } from "tsparticles-slim";
import ConfirmationModal from "./ConfirmationModal";
import CalendlyModal from "./CalendlyModal";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.

// Separate particles configuration for reusability and performance
const particlesConfig = {
    fullScreen: { enable: false },
    style: {
        position: "absolute" as const,
        width: "100%",
        height: "100%",
    },
    background: {
        color: {
            value: "transparent",
        },
    },
    fpsLimit: 60, // Reduced from 120 for better performance
    particles: {
        move: {
            direction: "inside" as const,
            enable: true,
            outModes: {
                default: "out" as const,
            },
            random: false,
            speed: 3,
            straight: false,
        },
        number: {
            density: {
                enable: true,
                area: 800,
            },
            value: 400, // Reduced for better performance
        },
        opacity: {
            value: { min: 0.3, max: 1 },
        },
        shape: {
            type: "circle",
        },
    },
};

const Button = memo(() => {
    const [showParticles, setShowParticles] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [isCalendlyModalOpen, setIsCalendlyModalOpen] = useState(false);
    const [confirmationStep, setConfirmationStep] = useState<'confirmation' | 'success'>('confirmation');
    const posthog = usePostHog();

    const handleClick = useCallback(() => {
        // First open the confirmation modal
        setIsConfirmationModalOpen(true);
        setConfirmationStep('confirmation');
        
        posthog?.capture('main-cta', {
            component: 'Button',
            action: 'click',
            type: 'open_confirmation_modal'
        });
        
        console.log("Button clicked, opening confirmation modal");
    }, [posthog]);

    const handleConfirmationClose = useCallback(() => {
        console.log("Closing confirmation modal");
        setIsConfirmationModalOpen(false);
        
        // Open Calendly modal after confirmation modal is closed
        setTimeout(() => {
            setIsCalendlyModalOpen(true);
            console.log("Opening Calendly modal after confirmation closed");
        }, 300);
    }, []);

    const handleWhatsAppClick = useCallback(() => {
        // Passer à l'étape de succès
        setConfirmationStep('success');
        console.log("WhatsApp button clicked, showing success step");
        
        // Ouvrir WhatsApp dans un nouvel onglet
        window.open("https://api.whatsapp.com/send?phone=33766259551", '_blank');
        
        // Fermer automatiquement le modal après quelques secondes
        setTimeout(() => {
            setIsConfirmationModalOpen(false);
            setConfirmationStep('confirmation');
            
            // Open Calendly modal after success message
            setTimeout(() => {
                setIsCalendlyModalOpen(true);
                console.log("Opening Calendly modal after success message");
            }, 300);
        }, 5000);
    }, []);

    const handleCalendlyClose = useCallback(() => {
        console.log("Closing Calendly modal");
        setIsCalendlyModalOpen(false);
    }, []);

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    // Add console log to check modal states
    useEffect(() => {
        console.log("Modal states:", { 
            confirmationModal: isConfirmationModalOpen, 
            calendlyModal: isCalendlyModalOpen,
            step: confirmationStep 
        });
    }, [isConfirmationModalOpen, isCalendlyModalOpen, confirmationStep]);

    return (
        <>
            <div 
                onMouseEnter={() => setShowParticles(true)}
                onMouseLeave={() => setShowParticles(false)}
                className="relative"
            >
                <button 
                    onClick={handleClick}
                    className="mt-4 px-6 py-3 rounded-full border border-white text-white transition-colors duration-300 text-base font-medium relative hover:bg-gradient-to-b from-[#2B1AC1] to-[#2b1ac1e1] hover:shadow-[0_4px_15px_rgba(255,255,255,0.3),0_4px_15px_rgba(33,20,148,0.3)]"
                    aria-label="Réserver un appel de consultation gratuit"
                >
                    Réserver un Appel
                    {showParticles && (
                        <div className="absolute inset-0" aria-hidden="true">
                            <Particles
                                id="particles-effect"
                                className="absolute inset-0"
                                init={particlesInit}
                                options={{
                                    ...particlesConfig,
                                    particles: {
                                        ...particlesConfig.particles,
                                        size: { value: { min: 0.3, max: 2 } },
                                    }
                                }}
                            />
                        </div>
                    )}
                </button>
            </div>
            
            {/* Confirmation Modal */}
            <ConfirmationModal 
                isOpen={isConfirmationModalOpen} 
                onClose={handleConfirmationClose}
                onWhatsAppClick={handleWhatsAppClick}
                step={confirmationStep}
            />
            
            {/* Calendly Modal */}
            <CalendlyModal
                isOpen={isCalendlyModalOpen}
                onClose={handleCalendlyClose}
            />
        </>
    );
});

Button.displayName = 'Button';

export { Button };
export default Button;