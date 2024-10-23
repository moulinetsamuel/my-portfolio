'use client';

import useCvStore from '@/store/useCvStore';
import { useEffect, useState } from 'react';
import LoadingMessage from '@/components/LoadingMessage';
import CVManager from '@/components/dashboard/cv/CvManager';
import { useToast } from '@/hooks/use-toast';

export default function CVPage() {
  const { cv, isLoading, error, successMessage, fetchCV, uploadCV } = useCvStore();
  const { toast } = useToast();
  const [initialLoadError, setInitialLoadError] = useState<string | null>(null);

  useEffect(() => {
    fetchCV()
      .then(() => setInitialLoadError(null))
      .catch((error) => {
        setInitialLoadError(error.message || 'Une erreur inattendue est survenue');
      });
  }, [fetchCV]);

  useEffect(() => {
    if (successMessage) {
      toast({ title: successMessage });
    }
    if (error) {
      toast({ title: error, variant: 'destructive' });
    }
  }, [successMessage, error, toast]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Gestion du CV</h1>
      <LoadingMessage store="cv" />
      <CVManager
        cv={cv}
        onUpload={uploadCV}
        isUploading={isLoading}
        error={initialLoadError}
      />
    </div>
  );
}
