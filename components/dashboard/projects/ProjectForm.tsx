import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import SkillSelector from '@/components/dashboard/projects/SkillSelector';
import type { ProjectFormProps } from '@/types/portfolio';
import { DialogClose } from '@/components/ui/dialog';

export default function ProjectForm({
  project,
  skills,
  onSave,
  onAddSkill,
}: ProjectFormProps) {
  const [title, setTitle] = useState(project?.title || '');
  const [description, setDescription] = useState(project?.description || '');
  const [siteUrl, setSiteUrl] = useState(project?.siteUrl || '');
  const [repoUrl, setRepoUrl] = useState(project?.repoUrl || '');
  const [selectedSkills, setSelectedSkills] = useState<number[]>(
    project?.skills.map((s) => s.id) || [],
  );
  const [image, setImage] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (project) {
      formData.append('id', project.id.toString());
    }
    formData.append('title', title);
    formData.append('description', description);
    formData.append('siteUrl', siteUrl);
    formData.append('repoUrl', repoUrl);
    formData.append('skillIds', JSON.stringify(selectedSkills));
    if (image) {
      formData.append('image', image);
    }
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Titre</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="siteUrl">URL du site</Label>
        <Input
          id="siteUrl"
          type="url"
          value={siteUrl}
          onChange={(e) => setSiteUrl(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="repoUrl">URL du dépôt GitHub</Label>
        <Input
          id="repoUrl"
          type="url"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          required
        />
      </div>
      <div>
        <Label>Image du projet</Label>
        <Card className="mt-2">
          <CardContent>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
                isDragActive ? 'border-primary' : 'border-gray-300'
              }`}
            >
              <input {...getInputProps()} />
              {image ? (
                <p>Fichier sélectionné : {image.name}</p>
              ) : (
                <p>
                  {project
                    ? 'Déposez une nouvelle image ici ou cliquez pour sélectionner'
                    : 'Déposez une image ici ou cliquez pour sélectionner'}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
        {project && !image && (
          <p className="mt-2 text-sm text-gray-500">
            Image actuelle : {project.imagePath}
          </p>
        )}
      </div>
      <SkillSelector
        skills={skills}
        selectedSkills={selectedSkills}
        onSkillsChange={setSelectedSkills}
        onAddSkill={onAddSkill}
      />
      <div className="flex justify-end space-x-2">
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Annuler
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="submit">{project ? 'Mettre à jour' : 'Ajouter'} le projet</Button>
        </DialogClose>
      </div>{' '}
    </form>
  );
}
