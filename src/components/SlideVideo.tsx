
import React from 'react';

interface SlideVideoProps {
  src: string;
  alt: string;
}

const SlideVideo = ({ src, alt }: SlideVideoProps) => {
  return (
    <div className="relative w-full h-full">
      <video
        src={src}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        onError={(e) => {
          console.log(`Failed to load video: ${src}`);
          const target = e.target as HTMLVideoElement;
          target.style.display = 'none';
        }}
      />
    </div>
  );
};

export default SlideVideo;
