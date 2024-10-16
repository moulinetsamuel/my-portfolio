'use client';

import React, { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import SkillSelector from '@/components/dashboard/projects/SkillSelector';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import SkillForm from '@/components/dashboard/skills/SkillForm';
import useProjectStore from '@/store/useProjectStore';
import useSkillStore from '@/store/useSkillStore';
import { useToast } from '@/hooks/use-toast';
import { projectFormSchema, type ProjectFormData } from '@/lib/schemas/projectSchema';
import type { Project } from '@/lib/schemas/projectSchema';

interface ProjectFormProps {
  project?: Project;
  onCloseProjectForm: () => void;
}

export default function ProjectForm({ project, onCloseProjectForm }: ProjectFormProps) {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: project?.title || '',
      description: project?.description || '',
      siteUrl: project?.siteUrl || '',
      repoUrl: project?.repoUrl || '',
      skillIds: project?.skills?.map((s) => s.id) || [],
      image: null,
    },
  });

  const [isAddingSkill, setIsAddingSkill] = React.useState(false);
  const { addProject, updateProject } = useProjectStore();
  const { fetchSkills } = useSkillStore();
  const { toast } = useToast();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setValue('image', acceptedFiles[0], { shouldValidate: true });
    },
    [setValue],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  const watchImage = watch('image');

  const onSubmit = async (data: ProjectFormData) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('siteUrl', data.siteUrl);
    formData.append('repoUrl', data.repoUrl);
    formData.append('skillIds', JSON.stringify(data.skillIds));
    if (data.image) {
      formData.append('image', data.image);
    }

    try {
      if (project) {
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
      onCloseProjectForm();
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="title">Titre</Label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <>
              <Input {...field} id="title" />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </>
          )}
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <>
              <Textarea {...field} id="description" />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </>
          )}
        />
      </div>
      <div>
        <Label htmlFor="siteUrl">URL du site</Label>
        <Controller
          name="siteUrl"
          control={control}
          render={({ field }) => (
            <>
              <Input {...field} id="siteUrl" type="url" />
              {errors.siteUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.siteUrl.message}</p>
              )}
            </>
          )}
        />
      </div>
      <div>
        <Label htmlFor="repoUrl">URL du dépôt GitHub</Label>
        <Controller
          name="repoUrl"
          control={control}
          render={({ field }) => (
            <>
              <Input {...field} id="repoUrl" type="url" />
              {errors.repoUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.repoUrl.message}</p>
              )}
            </>
          )}
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
              {watchImage ? (
                <p>Fichier sélectionné : {watchImage.name}</p>
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
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
        )}
        {project && !watchImage && (
          <p className="mt-2 text-sm text-gray-500">
            Image actuelle : {project.imagePath}
          </p>
        )}
      </div>
      <div>
        <Controller
          name="skillIds"
          control={control}
          render={({ field }) => (
            <SkillSelector
              selectedSkills={field.value}
              onSkillsChange={(skills) => field.onChange(skills)}
            />
          )}
        />
        {errors.skillIds && (
          <p className="text-red-500 text-sm mt-1">{errors.skillIds.message}</p>
        )}
        <Button variant="outline" onClick={() => setIsAddingSkill(true)} className="mt-2">
          Ajouter une nouvelle compétence
        </Button>
        <Dialog open={isAddingSkill} onOpenChange={setIsAddingSkill}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle compétence</DialogTitle>
            </DialogHeader>
            <SkillForm
              onCloseSkillForm={() => {
                setIsAddingSkill(false);
                fetchSkills();
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCloseProjectForm}>
          Annuler
        </Button>

        <Button type="submit">{project ? 'Mettre à jour' : 'Ajouter'} le projet</Button>
      </div>
    </form>
  );
}
