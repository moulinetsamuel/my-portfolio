'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { getCV, uploadCV } from '@/lib/api';
import type { CV } from '@/types/portfolio';
import CVManager from '@/components/dashboard/cv/CvManager';
import { useToast } from '@/hooks/use-toast';

export default function CVPage() {
  const { data: cv, error, mutate } = useSWR<CV>('/api/cv', getCV);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleUploadCV = async (file: File) => {
    setIsUploading(true);
    try {
      await uploadCV(file);
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

  if (error) {
    return (
      <div className="text-center text-red-500 dark:text-red-400">
        Erreur de chargement du CV
      </div>
    );
  }

  if (cv === undefined) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        Chargement du CV...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Gestion du CV</h1>
      <CVManager cv={cv} onUpload={handleUploadCV} isUploading={isUploading} />
    </div>
  );
}
