import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface LoadingProps {
  isLoading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const spinnerConfig = {
    size: "35px",
    stroke: "3.5px",
    speed: "0.8s",
    color: theme === 'dark' ? '#ffffff' : '#000000'
  };

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-50">
      <div
        className="flex items-center justify-between"
        style={{
          width: spinnerConfig.size,
          height: `calc(${spinnerConfig.size} * 0.9)`,
        }}
      >
        <div
          className="bar"
          style={{
            width: spinnerConfig.stroke,
            backgroundColor: spinnerConfig.color,
            animation: `grow ${spinnerConfig.speed} ease-in-out calc(${spinnerConfig.speed} * -0.45) infinite`,
          }}
        ></div>
        <div
          className="bar"
          style={{
            width: spinnerConfig.stroke,
            backgroundColor: spinnerConfig.color,
            animation: `grow ${spinnerConfig.speed} ease-in-out calc(${spinnerConfig.speed} * -0.3) infinite`,
          }}
        ></div>
        <div
          className="bar"
          style={{
            width: spinnerConfig.stroke,
            backgroundColor: spinnerConfig.color,
            animation: `grow ${spinnerConfig.speed} ease-in-out calc(${spinnerConfig.speed} * -0.15) infinite`,
          }}
        ></div>
        <div
          className="bar"
          style={{
            width: spinnerConfig.stroke,
            backgroundColor: spinnerConfig.color,
            animation: `grow ${spinnerConfig.speed} ease-in-out infinite`,
          }}
        ></div>
      </div>

      <style jsx>{`
        .bar {
          height: 100%;
          transition: background-color 0.3s ease;
        }

        @keyframes grow {
          0%,
          100% {
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

export default Loading;
