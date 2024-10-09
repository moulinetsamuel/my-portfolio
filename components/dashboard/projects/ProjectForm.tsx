import { useState } from 'react';
import type { Project, ProjectFormProps } from '@/types/portfolio';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import SkillSelector from '@/components/dashboard/SkillSelector';

export default function ProjectForm({
  project,
  onSave,
  skills,
  onAddNewSkill,
}: ProjectFormProps) {
  const [formData, setFormData] = useState<Omit<Project, 'id'>>(
    project || {
      title: '',
      description: '',
      imagePath: '',
      stack: [],
      siteUrl: '',
      repoUrl: '',
    },
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Titre du projet</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="image">URL de l&apos;image</Label>
        <Input
          id="image"
          name="image"
          type="url"
          value={formData.imagePath}
          onChange={handleInputChange}
          required
        />
        {/* TODO: Implémenter le téléchargement d'image et remplacer ce champ par un composant de téléchargement */}
      </div>
      <div>
        <Label htmlFor="siteUrl">URL du site</Label>
        <Input
          id="siteUrl"
          name="siteUrl"
          type="url"
          value={formData.siteUrl}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="repoUrl">URL du dépôt</Label>
        <Input
          id="repoUrl"
          name="repoUrl"
          type="url"
          value={formData.repoUrl}
          onChange={handleInputChange}
          required
        />
      </div>
      <SkillSelector
        selectedSkills={formData.stack}
        allSkills={skills}
        onSkillChange={(updatedStack) =>
          setFormData({ ...formData, stack: updatedStack })
        }
        onAddNewSkill={onAddNewSkill}
      />
      <Button type="submit">Enregistrer</Button>
    </form>
  );
}
