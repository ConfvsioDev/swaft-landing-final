import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="flex space-x-1">
        <div className="w-1.5 h-10 bg-black animate-grow"></div>
        <div className="w-1.5 h-10 bg-black animate-grow delay-100"></div>
        <div className="w-1.5 h-10 bg-black animate-grow delay-200"></div>
        <div className="w-1.5 h-10 bg-black animate-grow delay-300"></div>
      </div>
      <style jsx>{`
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
        @keyframes grow {
          0%, 100% {
            transform: scaleY(0.3);
          }
          50% {
            transform: scaleY(1);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
