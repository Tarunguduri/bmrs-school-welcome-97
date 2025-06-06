
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

  // Function to check if media file exists with timeout
  const checkMediaExists = async (path, timeout = 3000) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      const response = await fetch(path, { 
        method: 'HEAD',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch {
      return false;
    }
  };

  // Function to load available media files with faster fallback
  const loadAvailableMedia = useCallback(async () => {
    console.log('Starting to load media files...');
    
    // First, try to load from slides folder
    const slidesImages = [];
    const videosArray = [];
    
    // Check for images in slides folder (limit to 20 for faster loading)
    for (let i = 1; i <= 20; i++) {
      const extensions = ['png', 'jpg', 'jpeg'];
      for (const ext of extensions) {
        const imagePath = `/images/slides/slide${i}.${ext}`;
        try {
          const exists = await checkMediaExists(imagePath, 2000); // 2 second timeout
          if (exists) {
            slidesImages.push({
              type: 'image',
              src: imagePath,
              alt: `BMRS School Activity ${i}`
            });
            break; // Found one format, move to next number
          }
        } catch (error) {
          console.log(`Could not check ${imagePath}`);
        }
      }
    }

    // Check for videos (limit to 10 for faster loading)
    for (let i = 1; i <= 10; i++) {
      const extensions = ['mp4', 'webm'];
      for (const ext of extensions) {
        const videoPath = `/videos/video${i}.${ext}`;
        try {
          const exists = await checkMediaExists(videoPath, 2000);
          if (exists) {
            videosArray.push({
              type: 'video',
              src: videoPath,
              alt: `BMRS School Video ${i}`
            });
            break;
          }
        } catch (error) {
          console.log(`Could not check ${videoPath}`);
        }
      }
    }

    console.log(`Found ${slidesImages.length} images and ${videosArray.length} videos in slides/videos folders`);

    // If no custom media found, use existing slides
    if (slidesImages.length === 0) {
      console.log('No custom slides found, using default slides');
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
      slidesImages.push(...existingImages);
    }

    // Shuffle both arrays for randomness
    const shuffledImages = shuffleArray(slidesImages);
    const shuffledVideos = shuffleArray(videosArray);

    // Create combined slides with videos after every 4 images
    const combined = [];
    let videoIndex = 0;
    
    for (let i = 0; i < shuffledImages.length; i++) {
      combined.push(shuffledImages[i]);
      
      // Add video after every 4 images if videos are available
      if ((i + 1) % 4 === 0 && videoIndex < shuffledVideos.length) {
        combined.push(shuffledVideos[videoIndex]);
        videoIndex++;
      }
    }
    
    // Shuffle the final combined array for maximum randomness
    const finalSlides = shuffleArray(combined);
    console.log(`Final slideshow has ${finalSlides.length} slides`);
    return finalSlides;
  }, []);

  useEffect(() => {
    const initializeSlideshow = async () => {
      try {
        console.log('Initializing slideshow...');
        const loadedSlides = await loadAvailableMedia();
        
        if (loadedSlides.length > 0) {
          setSlides(loadedSlides);
          // Set 5 second delay before showing slideshow
          setTimeout(() => {
            setIsLoaded(true);
            console.log(`Successfully loaded ${loadedSlides.length} slides for slideshow`);
          }, 5000);
        } else {
          console.error('No slides could be loaded');
          // Force load with default slides if nothing else works
          setSlides([
            { type: 'image', src: '/images/slide1.png', alt: 'BMRS School cultural dance performance' },
            { type: 'image', src: '/images/slide2.png', alt: 'BMRS students on educational field trip' }
          ]);
          setTimeout(() => {
            setIsLoaded(true);
          }, 5000);
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
        }, 5000);
      }
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
      }, 800);
    }, 6000); // 6 seconds per slide

    return () => clearInterval(interval);
  }, [slides.length]);

  // Clean loading screen - 5 seconds only
  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <img 
              src="/lovable-uploads/e4807246-51a8-4ba1-97cb-f11ee4b3fe66.png"
              alt="BMRS Schools Logo"
              className="w-32 h-32 mx-auto mb-4 rounded-full shadow-xl"
            />
          </div>
          <h1 className="text-6xl font-bold text-blue-600 mb-4">
            BMRS Schools
          </h1>
          <p className="text-2xl text-gray-600">
            Loading your visual journey...
          </p>
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
          return 'opacity-100 scale-100 translate-x-0 transition-all duration-[1200ms] ease-out';
        case 'slideRight':
          return 'opacity-100 scale-100 -translate-x-0 transition-all duration-[1200ms] ease-out';
        case 'zoom':
          return 'opacity-100 scale-110 transition-all duration-[1200ms] ease-out';
        case 'blur':
          return 'opacity-100 scale-100 transition-all duration-[1200ms] ease-out filter blur-0';
        default:
          return 'opacity-100 scale-100 transition-all duration-[1200ms] ease-out';
      }
    }
    
    if (isActive) {
      switch (animation) {
        case 'slideLeft':
          return isTransitioning 
            ? 'opacity-0 scale-100 -translate-x-full transition-all duration-[1200ms] ease-out'
            : 'opacity-100 scale-100 translate-x-0 transition-all duration-[1200ms] ease-out';
        case 'slideRight':
          return isTransitioning 
            ? 'opacity-0 scale-100 translate-x-full transition-all duration-[1200ms] ease-out'
            : 'opacity-100 scale-100 translate-x-0 transition-all duration-[1200ms] ease-out';
        case 'zoom':
          return isTransitioning 
            ? 'opacity-0 scale-75 transition-all duration-[1200ms] ease-out'
            : 'opacity-100 scale-100 transition-all duration-[1200ms] ease-out';
        case 'blur':
          return isTransitioning 
            ? 'opacity-0 scale-100 transition-all duration-[1200ms] ease-out filter blur-lg'
            : 'opacity-100 scale-100 transition-all duration-[1200ms] ease-out filter blur-0';
        default:
          return isTransitioning 
            ? 'opacity-0 scale-95 transition-all duration-[1200ms] ease-out'
            : 'opacity-100 scale-100 transition-all duration-[1200ms] ease-out';
      }
    }
    
    return 'opacity-0 scale-95';
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      
      {/* Clean School Logo */}
      <div className="absolute top-8 left-8 z-20">
        <div className="w-24 h-24 rounded-full bg-white/95 shadow-lg overflow-hidden flex items-center justify-center">
          <img 
            src="/lovable-uploads/e4807246-51a8-4ba1-97cb-f11ee4b3fe66.png"
            alt="BMRS Schools Logo"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* Clean Welcome Message */}
      <div className="absolute bottom-8 left-8 right-8 z-20 text-center">
        <div className="bg-white/95 rounded-3xl px-8 py-6 shadow-lg max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Welcome to BMRS Group of Schools
          </h2>
          <p className="text-gray-600 text-lg">
            A Partnership For Your Child's Success
          </p>
        </div>
      </div>

      {/* Clean Slideshow Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={`${slide.src}-${index}`}
            className={`absolute inset-0 ${getAnimationClass(index, currentAnimation)}`}
          >
            {slide.type === 'image' ? (
              <div className="relative w-full h-full">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    console.log(`Failed to load image: ${slide.src}`);
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
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
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceptionSlideshow;
