
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { AnimateButton, LoadingSpinner } from './components/IconComponents';
import { animateImage } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
  const [animatedImage, setAnimatedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback((file: File | null) => {
    setOriginalImage(file);
    setAnimatedImage(null);
    setError(null);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setOriginalImagePreview(null);
    }
  }, []);

  const handleAnimateClick = async () => {
    if (!originalImage) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnimatedImage(null);

    try {
      const base64Image = await fileToBase64(originalImage);
      const mimeType = originalImage.type;
      
      const prompt = "Transform this photo into a vibrant, high-quality animation style. Emphasize dynamic lines and expressive colors, similar to a modern animated feature film.";
      
      const result = await animateImage(base64Image, mimeType, prompt);
      setAnimatedImage(result);

    } catch (err) {
      console.error(err);
      setError('Failed to animate image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 text-gray-200 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center">
        <p className="text-center text-lg md:text-xl text-gray-400 mb-8 max-w-2xl">
          Upload a photo and our AI will magically transform it into an animation. Bring your pictures to life!
        </p>

        <div className="w-full max-w-5xl bg-base-200 rounded-xl shadow-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col space-y-6">
              <h2 className="text-2xl font-bold text-white">1. Upload Your Photo</h2>
              <ImageUploader onImageUpload={handleImageUpload} previewUrl={originalImagePreview} />
              <button
                onClick={handleAnimateClick}
                disabled={isLoading || !originalImage}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner />
                    Animating...
                  </>
                ) : (
                  <>
                    <AnimateButton />
                    Animate Photo
                  </>
                )}
              </button>
              {error && <p className="text-red-400 text-center mt-2">{error}</p>}
            </div>
            
            <div className="flex flex-col space-y-6">
              <h2 className="text-2xl font-bold text-white">2. See the Magic</h2>
              <ResultDisplay animatedImageUrl={animatedImage} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500">
        <p>Powered by Gemini AI</p>
      </footer>
    </div>
  );
};

export default App;
