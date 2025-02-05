import { useCallback, useState } from "react";
import type { Container, Engine } from "tsparticles-engine";
import { Particles } from "react-tsparticles";
import Link from "next/link";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.

const Button = () => {
    const [showParticles, setShowParticles] = useState(false);

    const particlesInit = useCallback(async (engine: Engine) => {
        console.log(engine);

        // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        //await loadFull(engine);
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        await console.log(container);
    }, []);
    return (
            <div 
                onMouseEnter={() => setShowParticles(true)}
                onMouseLeave={() => setShowParticles(false)}
                className="relative"
            >
                <Link 
                    href="/reserver" 
                    className="mt-4 px-6 py-3 rounded-full border border-white text-white transition-colors duration-300 text-base font-medium relative hover:bg-gradient-to-b from-[#2B1AC1] to-[#2b1ac1e1] hover:shadow-[0_4px_15px_rgba(255,255,255,0.3),0_4px_15px_rgba(33,20,148,0.3)]"
                >
                    Réserver un Appel
                    {showParticles && (
                        <div className="absolute inset-0">
                            <Particles
                                id="small"
                                className="absolute inset-0"
                                init={particlesInit}
                                loaded={particlesLoaded}
                                options={{
                                    fullScreen: { enable: false },
                                    style: {
                                        position: "absolute",
                                        width: "100%",
                                        height: "100%",
                                    },
                                    background: {
                                        color: {
                                            value: "transparent",
                                        },
                                    },
                                    fpsLimit: 120,
                                    particles: {
                                        move: {
                                            direction: "inside",
                                            enable: true,
                                            outModes: {
                                                default: "out",
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
                                            value: 800,
                                        },
                                        opacity: {
                                            value: { min: 0.3, max: 1 },
                                        },
                                        shape: {
                                            type: "circle",
                                        },
                                        size: {
                                            value: { min: 0.5, max: 1 },
                                        },
                                    },
                                }}
                            />
                            <Particles
                                id="large"
                                className="absolute inset-0"
                                init={particlesInit}
                                loaded={particlesLoaded}
                                options={{
                                    fullScreen: { enable: false },
                                    style: {
                                        position: "absolute",
                                        width: "100%",
                                        height: "100%",
                                    },
                                    background: {
                                        color: {
                                            value: "transparent",
                                        },
                                    },
                                    fpsLimit: 120,
                                    particles: {
                                        move: {
                                            direction: "inside",
                                            enable: true,
                                            outModes: {
                                                default: "out",
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
                                            value: 800,
                                        },
                                        opacity: {
                                            value: { min: 0.3, max: 1 },
                                        },
                                        shape: {
                                            type: "circle",
                                        },
                                        size: {
                                            value: { min: 0.3, max: 3 },
                                        },
                                    },
                                }}
                            />
                            <Particles
                                id="large-blur"
                                className="absolute inset-0"
                                init={particlesInit}
                                loaded={particlesLoaded}
                                options={{
                                    fullScreen: { enable: false },
                                    style: {
                                        position: "absolute",
                                        width: "100%",
                                        height: "100%",
                                    },
                                    background: {
                                        color: {
                                            value: "transparent",
                                        },
                                    },
                                    fpsLimit: 120,
                                    particles: {
                                        move: {
                                            direction: "inside",
                                            enable: true,
                                            outModes: {
                                                default: "out",
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
                                            value: 800,
                                        },
                                        opacity: {
                                            value: { min: 0.3, max: 0.8 },
                                        },
                                        shape: {
                                            type: "circle",
                                        },
                                        size: {
                                            value: { min: 0.5, max: 3 },
                                        },
                                        blur: {
                                            value: 1,
                                        }
                                    },
                                }}
                            />
                        </div>
                    )}
                </Link>
            </div>
    );
};

export { Button };