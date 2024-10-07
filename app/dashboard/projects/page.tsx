import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ProjectsPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Gestion des projets</h1>
      <form className="space-y-4">
        <div>
          <Label htmlFor="project-title">Titre du projet</Label>
          <Input id="project-title" placeholder="Entrez le titre du projet" />
        </div>
        <div>
          <Label htmlFor="project-description">Description</Label>
          <Textarea
            id="project-description"
            placeholder="Décrivez votre projet"
          />
        </div>
        <div>
          <Label htmlFor="project-image">Image du projet</Label>
          <Input id="project-image" type="file" accept="image/*" />
        </div>
        <div>
          <Label htmlFor="project-link">Lien du projet</Label>
          <Input id="project-link" placeholder="https://..." />
        </div>
        <Button type="submit">Ajouter le projet</Button>
      </form>
      {/* Liste des projets existants à ajouter ici */}
    </div>
  );
}
