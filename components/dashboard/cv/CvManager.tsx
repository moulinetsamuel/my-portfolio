import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CurrentCV from '@/components/dashboard/cv/CurrentCv';
import CVUploader from '@/components/dashboard/cv/CvUploader';

export default function CVManager() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>CV</CardTitle>
      </CardHeader>
      <CardContent>
        <CVUploader />
        <CurrentCV />
      </CardContent>
    </Card>
  );
}
