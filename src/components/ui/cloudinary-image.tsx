'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { getCloudinaryUrl } from '@/lib/cloudinary/config';

interface CloudinaryImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
}

export function CloudinaryImage({
  src,
  alt,
  fallbackSrc = '/placeholder.png',
  className,
  width,
  height,
  ...props
}: CloudinaryImageProps) {
  const [error, setError] = useState(false);

  let imageSrc = src;
  if (!error && src && !src.startsWith('http') && !src.startsWith('/')) {
    imageSrc = getCloudinaryUrl(src, {
      width: typeof width === 'number' ? width : undefined,
      height: typeof height === 'number' ? height : undefined,
    });
  }

  return (
    <Image
      src={error ? fallbackSrc : imageSrc || fallbackSrc}
      alt={alt || 'UniqueAI Image'}
      width={width}
      height={height}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
}
