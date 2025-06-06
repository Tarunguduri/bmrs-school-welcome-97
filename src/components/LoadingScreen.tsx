
import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <img 
            src="/lovable-uploads/e4807246-51a8-4ba1-97cb-f11ee4b3fe66.png"
            alt="BMRS Schools Logo"
            className="w-32 h-32 mx-auto mb-4 rounded-full shadow-xl animate-bounce"
          />
        </div>
        <h1 className="text-6xl font-bold text-blue-600 mb-4 animate-pulse">
          BMRS Schools
        </h1>
        <p className="text-2xl text-gray-600 animate-fade-in">
          ReView AI is loading...
        </p>
        <div className="mt-8 flex justify-center">
          <div className="w-16 h-1 bg-blue-200 rounded-full overflow-hidden">
            <div className="w-full h-full bg-blue-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
