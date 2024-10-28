'use client';

import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { X, Upload } from 'lucide-react';
import Image from 'next/image';

interface ImageUploaderProps {
  onDrop: (acceptedFiles: File[]) => void;
  onRemove: () => void;
  currentImage?: string;
  watchImage?: File;
  projectTitle?: string;
}

export default function ImageUploader({
  onDrop,
  onRemove,
  currentImage,
  watchImage,
  projectTitle,
}: ImageUploaderProps) {
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [] },
    multiple: false,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          isDragActive ? 'border-primary' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        {watchImage ? (
          <div className="flex items-center justify-center">
            <p className="mr-2">Fichier sélectionné : {watchImage.name}</p>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : currentImage ? (
          <div className="flex items-center justify-center">
            <Image
              src={currentImage}
              alt={projectTitle || 'Image du projet'}
              width={100}
              height={100}
              className="rounded-md object-cover"
            />
            <p className="ml-2">Image actuelle</p>
          </div>
        ) : (
          <p>
            {isDragActive
              ? "Déposez l'image ici..."
              : 'Glissez et déposez une image ici, ou cliquez pour sélectionner un fichier'}
          </p>
        )}
      </div>
      <Button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          open();
        }}
        disabled={Boolean(watchImage)}
        variant="outline"
        className="w-full"
      >
        <Upload className="mr-2 h-4 w-4" />
        Sélectionner une image
      </Button>
    </div>
  );
}
