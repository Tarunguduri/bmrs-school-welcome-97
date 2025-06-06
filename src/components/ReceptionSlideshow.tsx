
import React, { useState, useEffect } from 'react';

const ReceptionSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Mix of images and videos for the slideshow
  const slides = [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      alt: 'Happy children learning together'
    },
    {
      type: 'image', 
      src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      alt: 'Teacher helping student with studies'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      alt: 'Beautiful school environment'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      alt: 'Peaceful school grounds'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      alt: 'Children playing outdoors'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      alt: 'Nature around school'
    }
  ];

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
        <img 
          src="/lovable-uploads/ec5f6440-5f44-4cf0-801c-264b3d5fa7f4.png"
          alt="BMRS Schools Logo"
          className="w-24 h-24 rounded-full shadow-lg bg-white/90 backdrop-blur-sm p-2"
        />
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
                muted
                loop
                playsInline
              />
            )}
            
            {/* Gentle overlay for better text readability */}
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReceptionSlideshow;
