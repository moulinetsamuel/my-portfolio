import type { CurrentCVProps } from "@/types/portfolio";
import DeleteCVDialog from "@/components/dashboard/cv/DeleteCvDialog";

export default function CurrentCV({ cv, onDelete }: CurrentCVProps) {
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
          Téléchargé le : {new Date(cv.uploadDate).toLocaleDateString()}
        </p>
      </div>
      <DeleteCVDialog onDelete={onDelete} />
    </div>
  );
}
