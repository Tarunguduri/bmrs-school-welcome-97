
import React, { useState, useEffect } from 'react';

const ReceptionSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Images array with all uploaded BMRS school images
  const images = [
    {
      type: 'image',
      src: '/images/slide1.png',
      alt: 'BMRS School cultural dance performance'
    },
    {
      type: 'image', 
      src: '/images/slide2.png',
      alt: 'BMRS students on educational field trip'
    },
    {
      type: 'image',
      src: '/images/slide3.png',
      alt: 'BMRS school assembly and activities'
    },
    {
      type: 'image',
      src: '/images/slide4.png',
      alt: 'BMRS students in classroom activities'
    },
    {
      type: 'image',
      src: '/lovable-uploads/560b2ab8-4587-4b01-9398-c0198cb7be29.png',
      alt: 'BMRS Group of Schools outdoor assembly'
    },
    {
      type: 'image',
      src: '/lovable-uploads/7771b6e2-93d3-433c-b259-1d0008818c1c.png',
      alt: 'BMRS students with science projects and awards'
    },
    {
      type: 'image',
      src: '/lovable-uploads/db4821d2-ec23-468b-be87-4536cff32f1f.png',
      alt: 'BMRS Grammar School SSC Toppers 2024-2025'
    },
    {
      type: 'image',
      src: '/lovable-uploads/09240cc6-8539-4792-a0bb-948b8dc2fbaf.png',
      alt: 'BMRS martial arts achievements and competitions'
    },
    {
      type: 'image',
      src: '/lovable-uploads/52287f64-78ea-4d64-bef7-1d4178fb1887.png',
      alt: 'BMRS Grammar High School promotional banner'
    },
    {
      type: 'image',
      src: '/lovable-uploads/37110f2e-ddde-43bf-add6-86b06ea45365.png',
      alt: 'BMRS cultural dance performance by students'
    },
    {
      type: 'image',
      src: '/lovable-uploads/71adb750-cc43-4a40-af59-701e04d0f872.png',
      alt: 'BMRS sports activities and competitions'
    },
    {
      type: 'image',
      src: '/lovable-uploads/7ab56fa5-a690-4852-b44e-39528fbc97d9.png',
      alt: 'BMRS students on educational field trip to ISRO'
    },
    {
      type: 'image',
      src: '/images/slide5.png',
      alt: 'BMRS students showcasing their projects'
    },
    {
      type: 'image',
      src: '/images/slide6.png',
      alt: 'BMRS students with science projects'
    },
    {
      type: 'image',
      src: '/images/slide7.png',
      alt: 'BMRS achievement ceremony'
    },
    {
      type: 'image',
      src: '/images/slide8.png',
      alt: 'BMRS student expo presentation'
    },
    {
      type: 'image',
      src: '/images/slide9.png',
      alt: 'BMRS sports and competition achievements'
    },
    {
      type: 'image',
      src: '/images/slide10.png',
      alt: 'BMRS Grammar High School promotional banner'
    },
    {
      type: 'image',
      src: '/images/slide11.png',
      alt: 'BMRS SSC Toppers 2024-2025 congratulations'
    }
  ];

  // Videos array - these will be inserted after every 4 images
  const videos = [
    {
      type: 'video',
      src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      alt: 'BMRS School Activities Video 1'
    },
    {
      type: 'video',
      src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
      alt: 'BMRS School Activities Video 2'
    },
    {
      type: 'video',
      src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4',
      alt: 'BMRS School Activities Video 3'
    },
    {
      type: 'video',
      src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_7mb.mp4',
      alt: 'BMRS School Activities Video 4'
    },
    {
      type: 'video',
      src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_10mb.mp4',
      alt: 'BMRS School Activities Video 5'
    }
  ];

  // Create combined slides array with videos inserted after every 4 images
  const createCombinedSlides = () => {
    const combined = [];
    let videoIndex = 0;
    
    for (let i = 0; i < images.length; i++) {
      combined.push(images[i]);
      
      // Add video after every 4 images
      if ((i + 1) % 4 === 0 && videoIndex < videos.length) {
        combined.push(videos[videoIndex]);
        videoIndex++;
      }
    }
    
    return combined;
  };

  const slides = createCombinedSlides();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 seconds per slide

    return () => clearInterval(interval);
  }, [slides.length]);

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h1 className="text-6xl font-bold text-blue-600 mb-4">BMRS Schools</h1>
          <p className="text-2xl text-gray-600">Welcome to our learning community</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* School Logo Overlay */}
      <div className="absolute top-8 left-8 z-20">
        <div className="w-24 h-24 rounded-full bg-white shadow-lg overflow-hidden flex items-center justify-center">
          <img 
            src="/lovable-uploads/e4807246-51a8-4ba1-97cb-f11ee4b3fe66.png"
            alt="BMRS Schools Logo"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* Welcome Message Overlay */}
      <div className="absolute bottom-8 left-8 right-8 z-20 text-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome to BMRS Group of Schools
          </h2>
          <p className="text-gray-600 text-lg">
            A Partnership For Your Child's Success
          </p>
        </div>
      </div>

      {/* Slideshow Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {slide.type === 'image' ? (
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <video
                src={slide.src}
                className="w-full h-full object-cover"
                autoPlay
                muted={false}
                loop
                playsInline
              />
            )}
            
            {/* Gentle overlay for better text readability */}
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceptionSlideshow;
