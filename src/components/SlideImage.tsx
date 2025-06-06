
import React from 'react';

interface SlideImageProps {
  src: string;
  alt: string;
}

const SlideImage = ({ src, alt }: SlideImageProps) => {
  return (
    <div className="relative w-full h-full">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={(e) => {
          console.log(`Failed to load image: ${src}`);
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
        }}
      />
    </div>
  );
};

export default SlideImage;
