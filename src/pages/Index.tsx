
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ReceptionSlideshow from '@/components/ReceptionSlideshow';

const Index = () => {
  const [showSlideshow, setShowSlideshow] = useState(false);

  if (showSlideshow) {
    return <ReceptionSlideshow />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Welcome to 
          <span className="text-blue-600 block mt-2">BMRS Schools</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Experience our warm and inviting reception slideshow - perfect for greeting 
          parents and visitors in your school reception area.
        </p>
        
        <Button 
          onClick={() => setShowSlideshow(true)}
          className="text-lg px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Start Reception Slideshow
        </Button>
        
        <p className="text-sm text-gray-500 mt-4">
          Press F11 for full-screen experience • ESC to exit slideshow
        </p>
      </div>
    </div>
  );
};

export default Index;
