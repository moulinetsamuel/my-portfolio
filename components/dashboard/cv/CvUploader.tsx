import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CVFormData, cvFormSchema } from '@/lib/schemas/cv/cvFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';

interface CVUploaderProps {
  onUpload: (formData: FormData) => Promise<void>;
  hasExistingCV: boolean;
  isUploading: boolean;
}

export default function CVUploader({
  onUpload,
  hasExistingCV,
  isUploading,
}: CVUploaderProps) {
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

    await onUpload(formData);
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
                {hasExistingCV
                  ? 'Déposez un nouveau CV ici ou cliquez pour sélectionner'
                  : 'Déposez votre CV ici ou cliquez pour sélectionner'}
              </p>
            )}
          </div>
          {errors.cv && <p className="text-red-500 text-sm mt-1">{errors.cv.message}</p>}
          <div className="mt-4 flex justify-between">
            <Button type="button" onClick={open} disabled={isUploading}>
              Sélectionner un fichier
            </Button>
            <Button type="submit" disabled={isUploading || !watchCv}>
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
