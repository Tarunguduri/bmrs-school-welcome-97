
import React from 'react';

const SlideshowOverlay = () => {
  return (
    <>
      {/* School Logo */}
      <div className="absolute top-8 left-8 z-20">
        <div className="w-24 h-24 rounded-full bg-white/95 shadow-lg overflow-hidden flex items-center justify-center">
          <img 
            src="/lovable-uploads/e4807246-51a8-4ba1-97cb-f11ee4b3fe66.png"
            alt="BMRS Schools Logo"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* Welcome Message */}
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
    </>
  );
};

export default SlideshowOverlay;
