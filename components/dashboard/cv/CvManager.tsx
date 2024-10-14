import type { CV } from '@/lib/schemas/cvSchemas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CurrentCV from '@/components/dashboard/cv/CurrentCv';
import CVUploader from '@/components/dashboard/cv/CvUploader';

interface CVManagerProps {
  cv: CV | null | undefined;
  onUpload: (file: File) => Promise<void>;
  isUploading: boolean;
}

export default function CVManager({ cv, onUpload, isUploading }: CVManagerProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{cv ? 'CV PDF actuel' : 'Télécharger votre premier CV'}</CardTitle>
      </CardHeader>
      <CardContent>
        {cv ? (
          <CurrentCV cv={cv} />
        ) : (
          <p className="mb-4">
            Aucun CV PDF téléchargé. Veuillez télécharger votre premier CV.
          </p>
        )}
        <CVUploader onUpload={onUpload} hasExistingCV={!!cv} isUploading={isUploading} />
      </CardContent>
    </Card>
  );
}
