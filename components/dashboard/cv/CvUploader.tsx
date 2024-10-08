import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CVUploaderProps } from "@/types/portfolio";

export default function CVUploader({
  onUpload,
  hasExistingCV,
}: CVUploaderProps) {
  return (
    <div className="mt-4">
      <Label htmlFor="cv-pdf">
        {hasExistingCV
          ? "Remplacer le CV actuel"
          : "Télécharger un nouveau CV PDF"}
      </Label>
      <Input
        id="cv-pdf"
        type="file"
        accept=".pdf"
        onChange={onUpload}
        className="mt-2"
      />
    </div>
  );
}
