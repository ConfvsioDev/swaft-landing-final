import Image from 'next/image';
import { useState, memo } from 'react';

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}

const ImageWithLoader = memo<ImageWithLoaderProps>(({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div 
      className="relative" 
      style={{ width, height, aspectRatio: `${width}/${height}` }}
      role="img"
      aria-label={alt}
    >
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg"
          aria-hidden="true"
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`duration-700 ease-in-out ${
          isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        } ${className}`}
        onLoadingComplete={() => setIsLoading(false)}
        priority={priority}
        quality={85}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  );
});

ImageWithLoader.displayName = 'ImageWithLoader';

export default ImageWithLoader; 