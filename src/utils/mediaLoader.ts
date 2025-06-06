
export interface MediaSlide {
  type: 'image' | 'video';
  src: string;
  alt: string;
}

// Function to check if media file exists with timeout
const checkMediaExists = async (path: string, timeout = 3000): Promise<boolean> => {
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

// Function to shuffle array
const shuffleArray = (array: MediaSlide[]): MediaSlide[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Function to load available media files
export const loadAvailableMedia = async (): Promise<MediaSlide[]> => {
  console.log('Starting to load media files...');
  
  const slidesImages: MediaSlide[] = [];
  const videosArray: MediaSlide[] = [];
  
  // Check for images in slides folder
  for (let i = 1; i <= 20; i++) {
    const extensions = ['png', 'jpg', 'jpeg'];
    for (const ext of extensions) {
      const imagePath = `/images/slides/slide${i}.${ext}`;
      try {
        const exists = await checkMediaExists(imagePath, 2000);
        if (exists) {
          slidesImages.push({
            type: 'image',
            src: imagePath,
            alt: `BMRS School Activity ${i}`
          });
          break;
        }
      } catch (error) {
        console.log(`Could not check ${imagePath}`);
      }
    }
  }

  // Check for videos
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

  console.log(`Found ${slidesImages.length} images and ${videosArray.length} videos`);

  // If no custom media found, use default slides
  if (slidesImages.length === 0) {
    console.log('No custom slides found, using default slides');
    const existingImages: MediaSlide[] = [
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

  // Combine and shuffle slides
  const shuffledImages = shuffleArray(slidesImages);
  const shuffledVideos = shuffleArray(videosArray);

  const combined: MediaSlide[] = [];
  let videoIndex = 0;
  
  for (let i = 0; i < shuffledImages.length; i++) {
    combined.push(shuffledImages[i]);
    
    if ((i + 1) % 4 === 0 && videoIndex < shuffledVideos.length) {
      combined.push(shuffledVideos[videoIndex]);
      videoIndex++;
    }
  }
  
  const finalSlides = shuffleArray(combined);
  console.log(`Final slideshow has ${finalSlides.length} slides`);
  return finalSlides;
};
