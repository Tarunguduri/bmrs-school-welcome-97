import React, { useState, useEffect, useCallback } from 'react';
import LoadingScreen from './LoadingScreen';
import SlideImage from './SlideImage';
import SlideVideo from './SlideVideo';
import SlideshowOverlay from './SlideshowOverlay';
import { loadAvailableMedia, MediaSlide } from '../utils/mediaLoader';
import { getRandomAnimation, getAnimationClass, AnimationType } from '../utils/slideAnimations';

const ReceptionSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [slides, setSlides] = useState<MediaSlide[]>([]);
  const [nextSlide, setNextSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState<AnimationType>('fade');

  useEffect(() => {
    const initializeSlideshow = async () => {
      try {
        console.log('Initializing slideshow...');
        
        // Set maximum timeout of 8 seconds
        const maxTimeout = setTimeout(() => {
          console.log('Maximum loading time reached, forcing slideshow start');
          if (!isLoaded) {
            // Use fallback slides if loading takes too long
            setSlides([
              { type: 'image', src: '/images/slide1.png', alt: 'BMRS School cultural dance performance' },
              { type: 'image', src: '/images/slide2.png', alt: 'BMRS students on educational field trip' }
            ]);
            setIsLoaded(true);
          }
        }, 8000);

        const loadedSlides = await loadAvailableMedia();
        
        // Clear the timeout if loading completes
        clearTimeout(maxTimeout);
        
        if (loadedSlides.length > 0) {
          setSlides(loadedSlides);
          console.log(`Successfully loaded ${loadedSlides.length} slides for slideshow`);
          // Set 3 second delay before showing slideshow (reduced from 5 seconds)
          setTimeout(() => {
            setIsLoaded(true);
            console.log('Loading complete, showing slideshow');
          }, 3000);
        } else {
          console.error('No slides could be loaded');
          // Force load with default slides if nothing else works
          setSlides([
            { type: 'image', src: '/images/slide1.png', alt: 'BMRS School cultural dance performance' },
            { type: 'image', src: '/images/slide2.png', alt: 'BMRS students on educational field trip' }
          ]);
          setTimeout(() => {
            setIsLoaded(true);
          }, 3000);
        }
      } catch (error) {
        console.error('Error initializing slideshow:', error);
        // Fallback to basic slides
        setSlides([
          { type: 'image', src: '/images/slide1.png', alt: 'BMRS School cultural dance performance' },
          { type: 'image', src: '/images/slide2.png', alt: 'BMRS students on educational field trip' }
        ]);
        setTimeout(() => {
          setIsLoaded(true);
        }, 3000);
      }
    };

    initializeSlideshow();
  }, [isLoaded]);

  useEffect(() => {
    if (slides.length === 0 || !isLoaded) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentAnimation(getRandomAnimation());
      
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setNextSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 800);
    }, 6000); // 6 seconds per slide

    return () => clearInterval(interval);
  }, [slides.length, isLoaded]);

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  if (slides.length === 0) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">No Media Found</h1>
          <p className="text-gray-600">Please add images to /images/slides/ or videos to /videos/ folder</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <SlideshowOverlay />

      {/* Slideshow Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={`${slide.src}-${index}`}
            className={`absolute inset-0 ${getAnimationClass(
              index, 
              currentSlide, 
              nextSlide, 
              currentAnimation, 
              isTransitioning
            )}`}
          >
            {slide.type === 'image' ? (
              <SlideImage src={slide.src} alt={slide.alt} />
            ) : (
              <SlideVideo src={slide.src} alt={slide.alt} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceptionSlideshow;
