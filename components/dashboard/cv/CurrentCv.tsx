import type { CV } from '@/lib/schemas/cv/cvSchemas';

interface CurrentCVProps {
  cv: CV;
}

export default function CurrentCV({ cv }: CurrentCVProps) {
  return (
    <div className="space-y-4">
      <div>
        <a
          href={cv.filePath}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Voir le CV PDF actuel
        </a>
        <p className="mt-1 text-sm text-gray-500">
          Téléchargé le : {new Date(cv.uploadedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
