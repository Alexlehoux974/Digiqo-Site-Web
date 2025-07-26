import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  className?: string;
  containerClassName?: string;
  sizes?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  quality = 75,
  className,
  containerClassName,
  sizes,
  objectFit = 'cover',
  placeholder,
  blurDataURL,
  onLoad
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  // For partner logos and other static images, we need to handle the path correctly
  const imageSrc = src.startsWith('/') ? src : `/${src}`;

  if (fill) {
    return (
      <div className={cn('relative overflow-hidden', containerClassName)}>
        <Image
          src={imageSrc}
          alt={alt}
          fill
          priority={priority}
          quality={quality}
          className={cn(
            'duration-700 ease-in-out',
            isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0',
            className
          )}
          style={{ objectFit }}
          sizes={sizes || '100vw'}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          onLoad={handleLoad}
        />
      </div>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width!}
      height={height!}
      priority={priority}
      quality={quality}
      className={cn(
        'duration-700 ease-in-out',
        isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0',
        className
      )}
      style={{ objectFit }}
      sizes={sizes}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      onLoad={handleLoad}
    />
  );
}