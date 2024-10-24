import LoadingMessage from '@/components/LoadingMessage';
import CVManager from '@/components/dashboard/cv/CvManager';

export default function CVPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Gestion du CV</h1>
      <LoadingMessage store="cv" />
      <CVManager />
    </div>
  );
}
