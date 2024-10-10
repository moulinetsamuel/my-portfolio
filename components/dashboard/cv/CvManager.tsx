import type { CVManagerProps } from '@/types/portfolio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CurrentCV from '@/components/dashboard/cv/CurrentCv';
import CVUploader from '@/components/dashboard/cv/CvUploader';

export default function CVManager({ cv, onUpload, isUploading }: CVManagerProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>CV PDF actuel</CardTitle>
      </CardHeader>
      <CardContent>
        {cv ? <CurrentCV cv={cv} /> : <p className="mb-4">Aucun CV PDF téléchargé</p>}
        <CVUploader onUpload={onUpload} hasExistingCV={!!cv} isUploading={isUploading} />
      </CardContent>
    </Card>
  );
}
