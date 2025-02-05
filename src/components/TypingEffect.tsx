import React, { useEffect, useState, useCallback } from 'react';

const words = ["unique.", "parfait.", "original.", "exceptionnel."]; // Words to cycle through

interface TypingEffectProps {
  onComplete: () => void;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ onComplete }) => {
  const [displayedWord, setDisplayedWord] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const typingSpeed = 75;
  const erasingSpeed = 50;
  const pauseDuration = 1500;

  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let currentLength = isTyping ? 0 : words[currentIndex].length;

    if (isTyping) {
      interval = setInterval(() => {
        if (currentLength < words[currentIndex].length) {
          currentLength++;
          setDisplayedWord(words[currentIndex].substring(0, currentLength));
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setIsTyping(false);
            handleComplete();
          }, pauseDuration);
        }
      }, typingSpeed);
    } else {
      interval = setInterval(() => {
        if (currentLength > 0) {
          currentLength--;
          setDisplayedWord(words[currentIndex].substring(0, currentLength));
        } else {
          clearInterval(interval);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
          setIsTyping(true);
        }
      }, erasingSpeed);
    }

    return () => clearInterval(interval);
  }, [isTyping, currentIndex, handleComplete]);

  return (
    <span 
      className="font-bold inline-flex items-center relative"
      style={{ 
        minWidth: 'min(180px, 40vw)',
        textAlign: 'left',
        height: '1.5em',
        padding: '0 4px'
      }}
    >
      {displayedWord}
      <span 
        className="animate-cursor ml-0.5 -mt-1" 
        style={{ 
          borderRight: '2px solid currentColor',
          height: '1.1em'
        }}
      >
      </span>
    </span>
  );
};

export default TypingEffect;