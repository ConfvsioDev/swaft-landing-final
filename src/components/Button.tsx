import { useCallback, useState, memo } from "react";
import { Engine } from "tsparticles-engine";
import { Particles } from "react-tsparticles";
import Link from "next/link";
import { usePostHog } from 'posthog-js/react';
import { loadSlim } from "tsparticles-slim";
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
    const posthog = usePostHog();

    const handleClick = useCallback(() => {
        posthog?.capture('main-cta', {
            component: 'Button',
            action: 'click',
            destination: '/reserver'
        });
    }, [posthog]);

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <div 
            onMouseEnter={() => setShowParticles(true)}
            onMouseLeave={() => setShowParticles(false)}
            className="relative"
        >
            <Link 
                href="/reserver" 
                onClick={handleClick}
                className="mt-4 px-6 py-3 rounded-full border border-white text-white transition-colors duration-300 text-base font-medium relative hover:bg-gradient-to-b from-[#2B1AC1] to-[#2b1ac1e1] hover:shadow-[0_4px_15px_rgba(255,255,255,0.3),0_4px_15px_rgba(33,20,148,0.3)]"
                aria-label="Réserver un appel de consultation gratuit"
                role="button"
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
            </Link>
        </div>
    );
});

Button.displayName = 'Button';

export { Button };