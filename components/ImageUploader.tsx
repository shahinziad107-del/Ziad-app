
import React, { useCallback, useState } from 'react';
import { UploadIcon } from './IconComponents';

interface ImageUploaderProps {
  onImageUpload: (file: File | null) => void;
  previewUrl: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, previewUrl }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  }, [onImageUpload]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };
  
  const handleRemoveImage = () => {
    onImageUpload(null);
  };

  return (
    <div className="w-full">
      {previewUrl ? (
        <div className="relative group w-full aspect-square border-2 border-dashed border-base-300 rounded-lg flex items-center justify-center overflow-hidden">
          <img src={previewUrl} alt="Original preview" className="object-contain h-full w-full" />
           <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
             <button 
                onClick={handleRemoveImage}
                className="opacity-0 group-hover:opacity-100 bg-red-600 text-white font-bold py-2 px-4 rounded-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                Remove Image
              </button>
           </div>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`w-full aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 text-center transition-all duration-300 ${isDragging ? 'border-brand-primary bg-base-300' : 'border-base-300 bg-base-100'}`}
        >
          <UploadIcon />
          <p className="mt-4 text-gray-400">
            <label htmlFor="file-upload" className="font-semibold text-brand-primary cursor-pointer hover:underline">
              Click to upload
            </label>
            {' '}or drag and drop
          </p>
          <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP up to 10MB</p>
          <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/png, image/jpeg, image/webp" onChange={handleChange} />
        </div>
      )}
    </div>
  );
};
