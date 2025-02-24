'use client';

import { memo } from 'react';

const LoadingSpinner = memo(() => {
  return (
    <div 
      className="flex justify-center items-center space-x-2"
      role="status"
      aria-label="Loading"
    >
      <div className="flex space-x-1">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`w-1.5 h-10 bg-black dark:bg-white ${
              index === 0 ? 'animate-grow' :
              index === 1 ? 'animate-grow-delay-1' :
              index === 2 ? 'animate-grow-delay-2' :
              'animate-grow-delay-3'
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes grow {
          0%, 100% {
            transform: scaleY(0.3);
          }
          50% {
            transform: scaleY(1);
          }
        }
        .animate-grow {
          animation: grow 1s ease-in-out infinite;
        }
        .delay-100 {
          animation-delay: -0.8s;
        }
        .delay-200 {
          animation-delay: -0.6s;
        }
        .delay-300 {
          animation-delay: -0.4s;
        }
      `}</style>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;
