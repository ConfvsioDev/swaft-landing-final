import React, { useEffect, useState, useCallback } from 'react';

const words = ["unique.", "parfait.", "original.", "exceptionnel."]; // Words to cycle through

interface TypingEffectProps {
  onComplete: () => void; // Callback when typing is complete
}

const TypingEffect: React.FC<TypingEffectProps> = ({ onComplete }) => {
  const [displayedWord, setDisplayedWord] = useState(""); // Start with an empty string
  const [currentIndex, setCurrentIndex] = useState(0); // Index for cycling through words
  const [isTyping, setIsTyping] = useState(true); // State for typing or erasing

  // Define typing speeds and pause duration
  const typingSpeed = 75; // Speed of typing
  const erasingSpeed = 50; // Speed of erasing
  const pauseDuration = 1500; // Pause duration after typing the full word

  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let currentLength = isTyping ? 0 : words[currentIndex].length;

    if (isTyping) {
      // Typing logic
      interval = setInterval(() => {
        if (currentLength < words[currentIndex].length) {
          currentLength++;
          setDisplayedWord(words[currentIndex].substring(0, currentLength)); // No leading space here
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setIsTyping(false); // Switch to erasing after pause
            handleComplete(); // Use the callback
          }, pauseDuration);
        }
      }, typingSpeed);
    } else {
      // Erasing logic
      interval = setInterval(() => {
        if (currentLength > 0) {
          currentLength--;
          setDisplayedWord(words[currentIndex].substring(0, currentLength)); // Maintain space during erasing
        } else {
          clearInterval(interval);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length); // Cycle to the next word
          setIsTyping(true); // Switch back to typing mode
        }
      }, erasingSpeed);
    }

    return () => clearInterval(interval); // Cleanup on unmount
  }, [isTyping, currentIndex, handleComplete]);

  return (
    <span className="font-bold absolute" style={{ left: '0', top: '0', whiteSpace: 'nowrap' }}>
      {displayedWord}
    </span>
  );
};

export default TypingEffect;
