'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { getCV, uploadCV } from '@/lib/api/cv';
import type { CV } from '@/lib/schemas/cvSchemas';
import CVManager from '@/components/dashboard/cv/CvManager';
import { useToast } from '@/hooks/use-toast';

export default function CVPage() {
  const { data: cv, error, mutate } = useSWR<CV | null>('/api/cv', getCV);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleUploadCV = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      await uploadCV(formData);
      await mutate();
      toast({
        title: 'CV téléchargé avec succès',
        description: 'Votre CV a été mis à jour.',
      });
    } catch (error) {
      console.error('Erreur lors du téléchargement du CV:', error);
      toast({
        title: 'Erreur lors du téléchargement',
        description: 'Une erreur est survenue lors du téléchargement du CV.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const isLoading = !error && cv === undefined;
  const noCV = error && error.status === 404;

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Gestion du CV</h1>
      {isLoading ? (
        <div className="text-center text-gray-500 dark:text-gray-400">
          Chargement du CV...
        </div>
      ) : (
        <CVManager
          cv={noCV ? null : cv}
          onUpload={handleUploadCV}
          isUploading={isUploading}
        />
      )}
    </div>
  );
}
