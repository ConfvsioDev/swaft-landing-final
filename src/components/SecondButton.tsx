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

const SecondButton = memo(() => {
    const [showParticles, setShowParticles] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [isCalendlyModalOpen, setIsCalendlyModalOpen] = useState(false);
    const [confirmationStep, setConfirmationStep] = useState<'confirmation' | 'success'>('confirmation');
    const posthog = usePostHog();

    const handleClick = useCallback(() => {
        // First open the Calendly modal
        setIsCalendlyModalOpen(true);
        
        posthog?.capture('main-cta', {
            component: 'Button',
            action: 'click',
            type: 'open_calendly_modal'
        });
        
        console.log("Button clicked, opening Calendly modal");
    }, [posthog]);

    const handleCalendlyClose = useCallback(() => {
        console.log("Closing Calendly modal");
        setIsCalendlyModalOpen(false);
        
        // Open confirmation modal after Calendly modal is closed
        setTimeout(() => {
            setIsConfirmationModalOpen(true);
            setConfirmationStep('confirmation');
            console.log("Opening confirmation modal after Calendly closed");
        }, 300);
    }, []);

    const handleConfirmationClose = useCallback(() => {
        console.log("Closing confirmation modal");
        setIsConfirmationModalOpen(false);
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
        }, 5000);
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
                className="relative flex justify-center items-center"
            >
                {/* Lowered glowing background effect */}
                <div className="absolute inset-0 -m-1 mt-2 bg-blue-500/20 rounded-full blur-md animate-pulse-slow"></div>
                <div className="absolute inset-0 -m-0.5 mt-1 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-indigo-500/30 rounded-full blur-sm"></div>
                
                <button 
                    onClick={handleClick}
                    className="mt-4 px-6 py-3 rounded-full border border-white text-white transition-all duration-300 text-base font-medium relative 
                    bg-gradient-to-b from-[#2B1AC1]/80 to-[#2b1ac1]/40
                    shadow-[0_2px_10px_rgba(255,255,255,0.2),0_2px_10px_rgba(33,20,148,0.2)]
                    hover:bg-gradient-to-b hover:from-[#2B1AC1] hover:to-[#2b1ac1e1] 
                    hover:shadow-[0_4px_15px_rgba(255,255,255,0.3),0_4px_15px_rgba(33,20,148,0.3)]"
                    aria-label="Réserver un appel de consultation gratuit"
                >
                    <span className="relative z-10 animate-pulse-subtle">Réserver un Appel</span>
                    <div className="absolute inset-0 rounded-full overflow-hidden" aria-hidden="true">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                    </div>
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
            
            {/* Calendly Modal - Opens first */}
            <CalendlyModal
                isOpen={isCalendlyModalOpen}
                onClose={handleCalendlyClose}
            />
            
            {/* Confirmation Modal - Opens after Calendly closes */}
            <ConfirmationModal 
                isOpen={isConfirmationModalOpen} 
                onClose={handleConfirmationClose}
                onWhatsAppClick={handleWhatsAppClick}
                step={confirmationStep}
            />
        </>
    );
});

SecondButton.displayName = 'SecondButton';

export { SecondButton };
export default SecondButton;