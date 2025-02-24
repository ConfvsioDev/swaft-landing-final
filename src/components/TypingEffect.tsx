import React, { useEffect, useState, useCallback, memo } from 'react';

const words = [" unique", " parfait", " original", " exceptionnel"] as const;

interface TypingEffectProps {
  onComplete: () => void;
  ariaLabel?: string;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ 
  onComplete, 
  ariaLabel = "Texte animé qui change automatiquement" 
}) => {
  const [displayedWord, setDisplayedWord] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const TYPING_SPEED = 75;
  const ERASING_SPEED = 50;
  const PAUSE_DURATION = 1500;

  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  const updateText = useCallback(() => {
    if (isTyping) {
      setDisplayedWord(prev => {
        const nextWord = words[currentIndex];
        return prev.length < nextWord.length 
          ? nextWord.substring(0, prev.length + 1)
          : prev;
      });
    } else {
      setDisplayedWord(prev => prev.substring(0, prev.length - 1));
    }
  }, [currentIndex, isTyping]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const interval = setInterval(() => {
      const currentWord = words[currentIndex];
      
      if (isTyping && displayedWord === currentWord) {
        clearInterval(interval);
        timeoutId = setTimeout(() => {
          setIsTyping(false);
          handleComplete();
        }, PAUSE_DURATION);
      } else if (!isTyping && displayedWord === '') {
        clearInterval(interval);
        setCurrentIndex(prev => (prev + 1) % words.length);
        setIsTyping(true);
      } else {
        updateText();
      }
    }, isTyping ? TYPING_SPEED : ERASING_SPEED);

    return () => {
      clearInterval(interval);
      clearTimeout(timeoutId);
    };
  }, [displayedWord, currentIndex, isTyping, handleComplete, updateText]);

  return (
    <span 
      className="inline-flex"
      role="text"
      aria-label={`${ariaLabel}: ${displayedWord}`}
    >
      {displayedWord}
      <span 
        className="animate-cursor"
        aria-hidden="true"
        style={{ borderRight: '2px solid currentColor', height: '1.1em' }}
      />
    </span>
  );
};

export default memo(TypingEffect);