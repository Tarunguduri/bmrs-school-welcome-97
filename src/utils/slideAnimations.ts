
export type AnimationType = 'fade' | 'slideLeft' | 'slideRight' | 'zoom' | 'blur';

export const animationTypes: AnimationType[] = ['fade', 'slideLeft', 'slideRight', 'zoom', 'blur'];

export const getRandomAnimation = (): AnimationType => {
  return animationTypes[Math.floor(Math.random() * animationTypes.length)];
};

export const getAnimationClass = (
  index: number, 
  currentSlide: number, 
  nextSlide: number, 
  animation: AnimationType, 
  isTransitioning: boolean
): string => {
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
