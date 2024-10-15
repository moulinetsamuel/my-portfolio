'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import SkillSelector from '@/components/dashboard/projects/SkillSelector';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import SkillForm from '@/components/dashboard/skills/SkillForm';
import useProjectStore from '@/store/useProjectStore';
import useSkillStore from '@/store/useSkillStore';
import { useToast } from '@/hooks/use-toast';
import type { Project } from '@/lib/schemas/projectSchema';

interface ProjectFormProps {
  project?: Project;
}

export default function ProjectForm({ project }: ProjectFormProps) {
  const [title, setTitle] = useState(project?.title || '');
  const [description, setDescription] = useState(project?.description || '');
  const [siteUrl, setSiteUrl] = useState(project?.siteUrl || '');
  const [repoUrl, setRepoUrl] = useState(project?.repoUrl || '');
  const [selectedSkills, setSelectedSkills] = useState<number[]>(
    project?.skills?.map((s) => s.id) || [],
  );
  const [image, setImage] = useState<File | null>(null);

  const { addProject, updateProject } = useProjectStore();
  const { fetchSkills } = useSkillStore();
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('siteUrl', siteUrl);
    formData.append('repoUrl', repoUrl);
    formData.append('skillIds', JSON.stringify(selectedSkills));
    if (image) {
      formData.append('image', image);
    }

    try {
      if (project) {
        formData.append('id', project.id.toString());
        await updateProject(project.id, formData);
        toast({
          title: 'Succès',
          description: 'Le projet a été mis à jour avec succès.',
        });
      } else {
        await addProject(formData);
        toast({
          title: 'Succès',
          description: 'Le projet a été ajouté avec succès.',
        });
      }
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: 'Erreur',
        description: `Impossible de ${project ? 'mettre à jour' : 'ajouter'} le projet.`,
        variant: 'destructive',
      });
    }
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
      <div>
        <SkillSelector
          selectedSkills={selectedSkills}
          onSkillsChange={setSelectedSkills}
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" className="mt-2">
              Ajouter une nouvelle compétence
            </Button>
          </DialogTrigger>
          <DialogContent onInteractOutside={(e) => e.preventDefault()}>
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle compétence</DialogTitle>
            </DialogHeader>
            <SkillForm />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button type="submit">{project ? 'Mettre à jour' : 'Ajouter'} le projet</Button>
      </div>
    </form>
  );
}
