
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-base-200/50 backdrop-blur-sm p-4 shadow-lg sticky top-0 z-10">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
          Photo Animator AI
        </h1>
      </div>
    </header>
  );
};
