import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CVPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Gestion du CV</h1>
      <div className="space-y-4">
        <div>
          <Label htmlFor="current-cv">CV actuel</Label>
          <div className="mt-1 flex items-center space-x-2">
            <Input id="current-cv" value="mon-cv.pdf" readOnly />
            <Button>Télécharger</Button>
          </div>
        </div>
        <div>
          <Label htmlFor="new-cv">Nouveau CV</Label>
          <div className="mt-1 flex items-center space-x-2">
            <Input id="new-cv" type="file" accept=".pdf" />
            <Button>Uploader</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
