import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function SkillsPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Gestion des compétences</h1>
      <form className="space-y-4">
        <div>
          <Label htmlFor="skill-name">Nom de la compétence</Label>
          <Input id="skill-name" placeholder="Entrez le nom de la compétence" />
        </div>
        <div>
          <Label htmlFor="skill-level">Niveau de maîtrise</Label>
          <Slider
            id="skill-level"
            defaultValue={[50]}
            max={100}
            step={1}
            className="mt-2"
          />
        </div>
        <Button type="submit">Ajouter la compétence</Button>
      </form>
      {/* Liste des compétences existantes à ajouter ici */}
    </div>
  );
}
