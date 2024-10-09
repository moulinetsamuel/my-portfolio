import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SkillFormProps, Skill } from "@/types/portfolio";

export default function SkillForm({ skill, onSave }: SkillFormProps) {
  const [formData, setFormData] = useState<Omit<Skill, "id">>(
    skill || { name: "", iconPath: "" }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  // TODO: Implémenter le téléchargement du fichier SVG
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Ici, vous devrez implémenter la logique pour télécharger le fichier
      // et obtenir le chemin où il sera stocké
      console.log("File to upload:", file);
      // setFormData(prev => ({ ...prev, iconPath: '/chemin/vers/icone.svg' }))
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nom de la compétence</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="icon">Icône SVG</Label>
        <Input
          id="icon"
          name="icon"
          type="file"
          accept=".svg"
          onChange={handleFileUpload}
          required={!skill}
        />
        {formData.iconPath && (
          <p className="mt-1 text-sm text-gray-500">
            Icône actuelle : {formData.iconPath}
          </p>
        )}
      </div>
      <Button type="submit">Enregistrer</Button>
    </form>
  );
}
