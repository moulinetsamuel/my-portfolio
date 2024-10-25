'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CVFormData, cvFormSchema } from '@/lib/schemas/cv/cvFormSchema';
import useCvStore from '@/store/useCvStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

export default function CVUploader() {
  const uploadCV = useCvStore((state) => state.uploadCV);
  const isLoading = useCvStore((state) => state.isLoading);
  const error = useCvStore((state) => state.error);
  const { toast } = useToast();
  const {
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<CVFormData>({
    resolver: zodResolver(cvFormSchema),
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setValue('cv', acceptedFiles[0], { shouldValidate: true });
    },
    [setValue],
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
  });

  const watchCv = watch('cv');

  const onSubmit = async (data: CVFormData) => {
    const formData = new FormData();
    formData.append('cv', data.cv);

    const response = await uploadCV(formData);
    if (response) {
      toast({
        title: response,
      });
    } else if (error) {
      toast({
        title: error.message || 'Une erreur est survenue lors du téléchargement du CV',
        variant: 'destructive',
      });
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="mt-4">
        <CardContent>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center ${
              isDragActive ? 'border-primary' : 'border-gray-300'
            }`}
          >
            <input {...getInputProps()} />
            {watchCv ? (
              <p>Fichier sélectionné : {watchCv.name}</p>
            ) : (
              <p>
                {isDragActive
                  ? 'Déposez le fichier ici...'
                  : 'Glissez et déposez votre CV ici, ou cliquez pour le sélectionner'}
              </p>
            )}
          </div>
          {errors.cv && <p className="text-red-500 text-sm mt-1">{errors.cv.message}</p>}
          <div className="mt-4 flex justify-between">
            <Button type="button" onClick={open} disabled={isLoading}>
              Sélectionner un fichier
            </Button>
            <Button type="submit" disabled={isLoading || !watchCv}>
              {isLoading ? 'Téléchargement en cours...' : 'Télécharger le CV'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
