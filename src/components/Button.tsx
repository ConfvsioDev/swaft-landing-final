import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BubbleButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [bubbles, setBubbles] = useState<{ id: number; x: number; y: number }[]>([]);
  const bubbleCount = 50; // Number of bubbles to spawn at once

  // Function to spawn a new bubble
  const spawnBubble = () => {
    const x = Math.random() * 80 + 10; // Random horizontal position within button
    const y = Math.random() * 40 + 10; // Random vertical position above the bottom center
    const id = Date.now(); // Unique ID for each bubble
    setBubbles((prev) => [...prev, { id, x, y }]); // Add new bubble to state
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isHovered) {
      interval = setInterval(spawnBubble, 200); // Spawn a bubble every 200ms
    }

    return () => {
      clearInterval(interval); // Clean up on unmount or hover out
    };
  }, [isHovered]);

  return (
    <div className="relative inline-block">
      <motion.button
        className={`relative rounded-full border-2 border-gray-600 text-gray-300 px-6 py-2 text-lg overflow-hidden focus:outline-none transition-all duration-300 ${
          isHovered ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-transparent'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setBubbles([]); // Clear bubbles when not hovered
        }}
      >
        Réserver un appel
      </motion.button>

      {bubbles.map(({ id, x, y }) => (
        <motion.div
          key={id}
          className="absolute rounded-full"
          style={{
            width: '5px', // Smaller bubble size
            height: '5px', // Smaller bubble size
            top: `${y}%`, // Random vertical position
            left: `${x}%`, // Random horizontal position
            pointerEvents: 'none', // Prevent mouse events on bubbles
            backgroundColor: '#1E3A8A', // Darker blue for bubbles
          }}
          initial={{ opacity: 1 }}
          animate={{
            y: '70%', // Move towards bottom center (70% is a relative position)
            x: '-50%', // Center horizontally (adjust as needed)
            opacity: [1, 0], // Fade out effect
          }}
          transition={{
            duration: Math.random() * 0.5 + 0.5,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default BubbleButton;
