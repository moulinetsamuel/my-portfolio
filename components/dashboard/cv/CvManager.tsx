import type { CV } from '@/lib/schemas/cv/cvSchemas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CurrentCV from '@/components/dashboard/cv/CurrentCv';
import CVUploader from '@/components/dashboard/cv/CvUploader';
import ErrorMessage from '@/components/ErrorMessage';

interface CVManagerProps {
  cv: CV | null;
  onUpload: (formData: FormData) => Promise<void>;
  isUploading: boolean;
  error: string | null;
}

export default function CVManager({ cv, onUpload, isUploading, error }: CVManagerProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{cv ? 'CV PDF actuel' : 'Télécharger votre premier CV'}</CardTitle>
      </CardHeader>
      <CardContent>
        {cv ? <CurrentCV cv={cv} /> : <ErrorMessage errorMessage={error} />}
        <CVUploader onUpload={onUpload} hasExistingCV={!!cv} isUploading={isUploading} />
      </CardContent>
    </Card>
  );
}
