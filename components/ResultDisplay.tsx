
import React from 'react';
import { ImageIcon, LoadingSpinner } from './IconComponents';

interface ResultDisplayProps {
  animatedImageUrl: string | null;
  isLoading: boolean;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ animatedImageUrl, isLoading }) => {
  return (
    <div className="w-full aspect-square border-2 border-base-300 bg-base-100 rounded-lg flex items-center justify-center overflow-hidden relative">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-base-100/80 backdrop-blur-sm z-10">
          <LoadingSpinner />
          <p className="mt-4 text-lg font-semibold text-gray-300">Animating your image...</p>
        </div>
      )}
      {animatedImageUrl ? (
        <img src={animatedImageUrl} alt="Animated result" className="object-contain h-full w-full" />
      ) : (
        !isLoading && (
          <div className="text-center text-gray-500">
            <ImageIcon />
            <p className="mt-4">Your animated image will appear here</p>
          </div>
        )
      )}
    </div>
  );
};
