
import React, { useState, useEffect, useCallback } from 'react';

const ReceptionSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [slides, setSlides] = useState([]);
  const [nextSlide, setNextSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Animation variants for different transition effects
  const animationTypes = ['fade', 'slideLeft', 'slideRight', 'zoom', 'blur'];
  const [currentAnimation, setCurrentAnimation] = useState('fade');

  // Function to get random animation
  const getRandomAnimation = () => {
    return animationTypes[Math.floor(Math.random() * animationTypes.length)];
  };

  // Function to shuffle array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Function to generate file paths for images and videos
  const generateMediaPaths = useCallback(() => {
    // Generate paths for images (assuming you'll have slide1.png to slide50.png)
    const imagePaths = [];
    for (let i = 1; i <= 50; i++) {
      imagePaths.push({
        type: 'image',
        src: `/images/slides/slide${i}.png`,
        alt: `BMRS School Activity ${i}`,
        fallback: `/images/slide${i}.png` // fallback to existing structure
      });
      
      // Add common image extensions
      imagePaths.push({
        type: 'image',
        src: `/images/slides/slide${i}.jpg`,
        alt: `BMRS School Activity ${i}`,
        fallback: `/images/slide${i}.jpg`
      });
      
      imagePaths.push({
        type: 'image',
        src: `/images/slides/slide${i}.jpeg`,
        alt: `BMRS School Activity ${i}`,
        fallback: `/images/slide${i}.jpeg`
      });
    }

    // Generate paths for videos (assuming you'll have video1.mp4 to video20.mp4)
    const videoPaths = [];
    for (let i = 1; i <= 20; i++) {
      videoPaths.push({
        type: 'video',
        src: `/videos/video${i}.mp4`,
        alt: `BMRS School Video ${i}`,
        fallback: `https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_${i}mb.mp4`
      });
      
      // Add other video formats
      videoPaths.push({
        type: 'video',
        src: `/videos/video${i}.webm`,
        alt: `BMRS School Video ${i}`,
        fallback: `https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_${i}mb.mp4`
      });
    }

    return { imagePaths, videoPaths };
  }, []);

  // Function to check if media file exists
  const checkMediaExists = async (path) => {
    try {
      const response = await fetch(path, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  };

  // Function to load available media files
  const loadAvailableMedia = useCallback(async () => {
    const { imagePaths, videoPaths } = generateMediaPaths();
    
    // Check which images exist
    const availableImages = [];
    for (const image of imagePaths) {
      const exists = await checkMediaExists(image.src);
      if (exists) {
        availableImages.push(image);
      } else if (image.fallback && await checkMediaExists(image.fallback)) {
        availableImages.push({ ...image, src: image.fallback });
      }
    }

    // Check which videos exist
    const availableVideos = [];
    for (const video of videoPaths) {
      const exists = await checkMediaExists(video.src);
      if (exists) {
        availableVideos.push(video);
      } else if (video.fallback) {
        availableVideos.push({ ...video, src: video.fallback });
      }
    }

    // If no custom media found, use existing slides
    if (availableImages.length === 0) {
      const existingImages = [
        { type: 'image', src: '/images/slide1.png', alt: 'BMRS School cultural dance performance' },
        { type: 'image', src: '/images/slide2.png', alt: 'BMRS students on educational field trip' },
        { type: 'image', src: '/images/slide3.png', alt: 'BMRS school assembly and activities' },
        { type: 'image', src: '/images/slide4.png', alt: 'BMRS students in classroom activities' },
        { type: 'image', src: '/lovable-uploads/560b2ab8-4587-4b01-9398-c0198cb7be29.png', alt: 'BMRS Group of Schools outdoor assembly' },
        { type: 'image', src: '/lovable-uploads/7771b6e2-93d3-433c-b259-1d0008818c1c.png', alt: 'BMRS students with science projects and awards' },
        { type: 'image', src: '/lovable-uploads/db4821d2-ec23-468b-be87-4536cff32f1f.png', alt: 'BMRS Grammar School SSC Toppers 2024-2025' },
        { type: 'image', src: '/lovable-uploads/09240cc6-8539-4792-a0bb-948b8dc2fbaf.png', alt: 'BMRS martial arts achievements and competitions' },
        { type: 'image', src: '/lovable-uploads/52287f64-78ea-4d64-bef7-1d4178fb1887.png', alt: 'BMRS Grammar High School promotional banner' },
        { type: 'image', src: '/lovable-uploads/37110f2e-ddde-43bf-add6-86b06ea45365.png', alt: 'BMRS cultural dance performance by students' },
        { type: 'image', src: '/lovable-uploads/71adb750-cc43-4a40-af59-701e04d0f872.png', alt: 'BMRS sports activities and competitions' },
        { type: 'image', src: '/lovable-uploads/7ab56fa5-a690-4852-b44e-39528fbc97d9.png', alt: 'BMRS students on educational field trip to ISRO' },
        { type: 'image', src: '/images/slide5.png', alt: 'BMRS students showcasing their projects' },
        { type: 'image', src: '/images/slide6.png', alt: 'BMRS students with science projects' },
        { type: 'image', src: '/images/slide7.png', alt: 'BMRS achievement ceremony' },
        { type: 'image', src: '/images/slide8.png', alt: 'BMRS student expo presentation' },
        { type: 'image', src: '/images/slide9.png', alt: 'BMRS sports and competition achievements' },
        { type: 'image', src: '/images/slide10.png', alt: 'BMRS Grammar High School promotional banner' },
        { type: 'image', src: '/images/slide11.png', alt: 'BMRS SSC Toppers 2024-2025 congratulations' }
      ];
      availableImages.push(...existingImages);
    }

    if (availableVideos.length === 0) {
      const existingVideos = [
        { type: 'video', src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4', alt: 'BMRS School Activities Video 1' },
        { type: 'video', src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4', alt: 'BMRS School Activities Video 2' },
        { type: 'video', src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4', alt: 'BMRS School Activities Video 3' },
        { type: 'video', src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_7mb.mp4', alt: 'BMRS School Activities Video 4' },
        { type: 'video', src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_10mb.mp4', alt: 'BMRS School Activities Video 5' }
      ];
      availableVideos.push(...existingVideos);
    }

    // Shuffle both arrays for randomness
    const shuffledImages = shuffleArray(availableImages);
    const shuffledVideos = shuffleArray(availableVideos);

    // Create combined slides with videos after every 4 images
    const combined = [];
    let videoIndex = 0;
    
    for (let i = 0; i < shuffledImages.length; i++) {
      combined.push(shuffledImages[i]);
      
      // Add video after every 4 images
      if ((i + 1) % 4 === 0 && videoIndex < shuffledVideos.length) {
        combined.push(shuffledVideos[videoIndex]);
        videoIndex++;
      }
    }
    
    // Shuffle the final combined array for maximum randomness
    return shuffleArray(combined);
  }, [generateMediaPaths]);

  useEffect(() => {
    const initializeSlideshow = async () => {
      const loadedSlides = await loadAvailableMedia();
      setSlides(loadedSlides);
      setIsLoaded(true);
      console.log(`Loaded ${loadedSlides.length} slides for slideshow`);
    };

    initializeSlideshow();
  }, [loadAvailableMedia]);

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentAnimation(getRandomAnimation());
      
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setNextSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000); // 5 seconds per slide

    return () => clearInterval(interval);
  }, [slides.length]);

  // Enhanced loading screen with animations
  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-300/20 rounded-full animate-pulse animation-delay-0"></div>
          <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-purple-300/20 rounded-full animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-32 h-32 bg-pink-300/20 rounded-full animate-pulse animation-delay-2000"></div>
        </div>
        <div className="text-center animate-fade-in relative z-10">
          <div className="mb-8">
            <img 
              src="/lovable-uploads/e4807246-51a8-4ba1-97cb-f11ee4b3fe66.png"
              alt="BMRS Schools Logo"
              className="w-32 h-32 mx-auto mb-4 animate-bounce rounded-full shadow-xl"
            />
          </div>
          <h1 className="text-6xl font-bold text-blue-600 mb-4 animate-fade-in animation-delay-500">
            BMRS Schools
          </h1>
          <p className="text-2xl text-gray-600 animate-fade-in animation-delay-1000">
            Loading your visual journey...
          </p>
          <div className="mt-8 flex justify-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce animation-delay-200"></div>
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce animation-delay-400"></div>
          </div>
        </div>
      </div>
    );
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

  // Animation class generator
  const getAnimationClass = (index, animation) => {
    const isActive = index === currentSlide;
    const isNext = index === nextSlide;
    
    if (!isActive && !isNext) return 'opacity-0 scale-95 translate-y-8';
    
    if (isTransitioning && isNext) {
      switch (animation) {
        case 'slideLeft':
          return 'opacity-100 scale-100 translate-x-0 transition-all duration-1000 ease-out';
        case 'slideRight':
          return 'opacity-100 scale-100 -translate-x-0 transition-all duration-1000 ease-out';
        case 'zoom':
          return 'opacity-100 scale-110 transition-all duration-1000 ease-out';
        case 'blur':
          return 'opacity-100 scale-100 transition-all duration-1000 ease-out filter blur-0';
        default:
          return 'opacity-100 scale-100 transition-all duration-1000 ease-out';
      }
    }
    
    if (isActive) {
      switch (animation) {
        case 'slideLeft':
          return isTransitioning 
            ? 'opacity-0 scale-100 -translate-x-full transition-all duration-1000 ease-out'
            : 'opacity-100 scale-100 translate-x-0 transition-all duration-1000 ease-out';
        case 'slideRight':
          return isTransitioning 
            ? 'opacity-0 scale-100 translate-x-full transition-all duration-1000 ease-out'
            : 'opacity-100 scale-100 translate-x-0 transition-all duration-1000 ease-out';
        case 'zoom':
          return isTransitioning 
            ? 'opacity-0 scale-75 transition-all duration-1000 ease-out'
            : 'opacity-100 scale-100 transition-all duration-1000 ease-out';
        case 'blur':
          return isTransitioning 
            ? 'opacity-0 scale-100 transition-all duration-1000 ease-out filter blur-lg'
            : 'opacity-100 scale-100 transition-all duration-1000 ease-out filter blur-0';
        default:
          return isTransitioning 
            ? 'opacity-0 scale-95 transition-all duration-1000 ease-out'
            : 'opacity-100 scale-100 transition-all duration-1000 ease-out';
      }
    }
    
    return 'opacity-0 scale-95';
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 animate-pulse"></div>
      
      {/* Enhanced School Logo Overlay with animations */}
      <div className="absolute top-8 left-8 z-20 animate-fade-in">
        <div className="w-24 h-24 rounded-full bg-white/95 backdrop-blur-sm shadow-2xl overflow-hidden flex items-center justify-center hover:scale-110 transition-all duration-300 ring-4 ring-white/50">
          <img 
            src="/lovable-uploads/e4807246-51a8-4ba1-97cb-f11ee4b3fe66.png"
            alt="BMRS Schools Logo"
            className="w-full h-full object-cover object-center transition-transform duration-300 hover:rotate-12"
          />
        </div>
      </div>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 z-20 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg animate-fade-in">
        <span className="text-sm font-medium text-gray-800">
          {currentSlide + 1} / {slides.length}
        </span>
      </div>

      {/* Enhanced Welcome Message Overlay */}
      <div className="absolute bottom-8 left-8 right-8 z-20 text-center animate-fade-in animation-delay-500">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl px-8 py-6 shadow-2xl max-w-2xl mx-auto border border-white/50 hover:scale-105 transition-all duration-500">
          <h2 className="text-3xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to BMRS Group of Schools
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            A Partnership For Your Child's Success
          </p>
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-200"></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse animation-delay-400"></div>
          </div>
        </div>
      </div>

      {/* Enhanced Slideshow Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={`${slide.src}-${index}`}
            className={`absolute inset-0 ${getAnimationClass(index, currentAnimation)}`}
          >
            {slide.type === 'image' ? (
              <div className="relative w-full h-full group">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-cover transition-transform duration-[10s] ease-linear group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    console.log(`Failed to load image: ${slide.src}`);
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 opacity-60"></div>
                {/* Floating particles effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-bounce animation-delay-0"></div>
                  <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-bounce animation-delay-1000"></div>
                  <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce animation-delay-2000"></div>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full">
                <video
                  src={slide.src}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  onError={(e) => {
                    console.log(`Failed to load video: ${slide.src}`);
                    const target = e.target as HTMLVideoElement;
                    target.style.display = 'none';
                  }}
                />
                {/* Video overlay with subtle animation */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10 animate-pulse"></div>
                {/* Video indicator */}
                <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
                  LIVE
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-[5000ms] ease-linear"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ReceptionSlideshow;
