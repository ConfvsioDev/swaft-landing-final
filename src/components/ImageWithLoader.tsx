import Image from 'next/image';
import { useState } from 'react';

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative" style={{ width, height }}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`duration-700 ease-in-out ${
          isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
        onLoadingComplete={() => setIsLoading(false)}
        priority={priority}
        quality={90}
      />
    </div>
  );
};

export default ImageWithLoader; 