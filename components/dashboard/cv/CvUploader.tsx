import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { CVUploaderProps } from '@/types/portfolio';

export default function CVUploader({
  onUpload,
  hasExistingCV,
  isUploading,
}: CVUploaderProps) {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
    noClick: true,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      await onUpload(file);
      setFile(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mt-4">
        <CardContent>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center ${
              isDragActive ? 'border-primary' : 'border-gray-300'
            }`}
          >
            <input {...getInputProps()} />
            {file ? (
              <p>Fichier sélectionné : {file.name}</p>
            ) : (
              <p>
                {hasExistingCV
                  ? 'Déposez un nouveau CV ici ou cliquez pour sélectionner'
                  : 'Déposez votre CV ici ou cliquez pour sélectionner'}
              </p>
            )}
          </div>
          <div className="mt-4 flex justify-between">
            <Button type="button" onClick={open} disabled={isUploading}>
              Sélectionner un fichier
            </Button>
            <Button type="submit" disabled={!file || isUploading}>
              {isUploading
                ? 'Téléchargement en cours...'
                : hasExistingCV
                  ? 'Remplacer le CV'
                  : 'Télécharger le CV'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
