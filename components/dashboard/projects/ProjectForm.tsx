'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  projectFormSchema,
  updateProjectFormSchema,
  ProjectFormData,
  UpdateProjectFormData,
} from '@/lib/schemas/project/projectFormSchema';
import { Project } from '@/lib/schemas/project/projectSchema';
import useProjectStore from '@/store/useProjectStore';
import { useCallback, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Pencil } from 'lucide-react';
import SkillForm from '@/components/dashboard/skills/SkillForm';
import SkillSelector from '@/components/dashboard/projects/SkillSelector';
import ImageUploader from '@/components/dashboard/projects/ImageUploader';

interface ProjectFormProps {
  project?: Project;
}

export default function ProjectForm({ project }: ProjectFormProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const addProject = useProjectStore((state) => state.addProject);
  const updateProject = useProjectStore((state) => state.updateProject);
  const error = useProjectStore((state) => state.error);
  const { toast } = useToast();

  const isUpdate = Boolean(project);
  const schema = isUpdate ? updateProjectFormSchema : projectFormSchema;
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData | UpdateProjectFormData>({
    resolver: zodResolver(schema),
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setValue('image', acceptedFiles[0], { shouldValidate: true });
    },
    [setValue],
  );

  const watchImage = watch('image');

  const onSubmit = async (data: ProjectFormData | UpdateProjectFormData) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('siteUrl', data.siteUrl);
    formData.append('repoUrl', data.repoUrl);
    if (data.image) {
      formData.append('image', data.image);
    }
    data.skillIds.forEach((skillId) => formData.append('skillIds', skillId.toString()));

    let response;
    if (project) {
      response = await updateProject(project.id, formData);
    } else {
      response = await addProject(formData);
    }

    if (response) {
      toast({
        title: response,
      });
      handleOpenChange(false);
    } else if (error) {
      toast({
        title: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setIsDialogOpen(newOpen);
    if (newOpen) {
      reset({
        title: project ? project.title : '',
        description: project ? project.description : '',
        siteUrl: project ? project.siteUrl : '',
        repoUrl: project ? project.repoUrl : '',
        skillIds: project ? project.skills.map((skill) => skill.id) : [],
      });
    }
  };

  const removeImage = () => {
    setValue('image', undefined);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button type="button">
          {isUpdate ? (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Modifier
            </>
          ) : (
            'Ajouter un projet'
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? 'Modifier le projet' : 'Ajouter un projet'}
          </DialogTitle>
          <DialogDescription>
            Remplissez le formulaire ci-dessous pour {isUpdate ? 'modifier' : 'ajouter'}{' '}
            un projet.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid items-center gap-4">
              <Input
                id="title"
                className="w-full"
                {...register('title')}
                placeholder="Titre du projet"
              />
              {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>
            <div className="grid items-center gap-4">
              <Textarea
                id="description"
                className="w-full"
                {...register('description')}
                placeholder="Description du projet"
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
            <div className="grid items-center gap-4">
              <Input
                id="siteUrl"
                className="w-full"
                {...register('siteUrl')}
                placeholder="URL du site"
              />
              {errors.siteUrl && <p className="text-red-500">{errors.siteUrl.message}</p>}
            </div>
            <div className="grid items-center gap-4">
              <Input
                id="repoUrl"
                className="w-full"
                {...register('repoUrl')}
                placeholder="URL du dépôt"
              />
              {errors.repoUrl && <p className="text-red-500">{errors.repoUrl.message}</p>}
            </div>
            <SkillSelector
              control={control}
              errors={errors}
              defaultSkills={project?.skills.map((skill) => skill.id)}
            />
            <div className="flex items-center gap-4">
              <SkillForm />
              <p className="text-sm text-muted-foreground">
                Vous pouvez ajouter une nouvelle compétence si elle n&apos;existe pas dans
                la liste.
              </p>
            </div>
            <ImageUploader
              onDrop={onDrop}
              onRemove={removeImage}
              currentImage={project?.imagePath}
              watchImage={watchImage}
              projectTitle={project?.title}
            />
            {errors.image && <p className="text-red-500">{errors.image.message}</p>}
          </div>
          <DialogFooter className="flex justify-end items-center mt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="mr-2">
                Annuler
              </Button>
            </DialogClose>
            <Button type="submit">{isUpdate ? 'Modifier' : 'Ajouter'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
