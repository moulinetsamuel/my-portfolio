'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  skillFormSchema,
  updateSkillFormSchema,
} from '@/lib/schemas/skill/skillFormSchema';
import useSkillStore from '@/store/useSkillStore';
import { Skill } from '@/lib/schemas/skill/skillSchema';
import { useDropzone } from 'react-dropzone';
import { z } from 'zod';
import { useCallback, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { X, Upload, Pencil } from 'lucide-react';

interface SkillFormProps {
  skill?: Skill;
}

export default function SkillForm({ skill }: SkillFormProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const addSkill = useSkillStore((state) => state.addSkill);
  const updateSkill = useSkillStore((state) => state.updateSkill);
  const error = useSkillStore((state) => state.error);
  const { toast } = useToast();

  const isUpdate = Boolean(skill);
  const schema = isUpdate ? updateSkillFormSchema : skillFormSchema;
  type SkillFormData = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<SkillFormData>({
    resolver: zodResolver(schema),
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setValue('icon', acceptedFiles[0], { shouldValidate: true });
    },
    [setValue],
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { 'image/svg+xml': ['.svg'] },
    multiple: false,
  });

  const watchIcon = watch('icon');

  const onSubmit = async (data: SkillFormData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.icon) {
      formData.append('icon', data.icon);
    }

    let response;
    if (skill) {
      response = await updateSkill(skill.id, formData);
    } else {
      response = await addSkill(formData);
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
        name: skill ? skill.name : '',
      });
    }
  };

  const removeIcon = () => {
    setValue('icon', undefined);
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
            'Ajouter une compétence'
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? 'Modifier la compétence' : 'Ajouter une compétence'}
          </DialogTitle>
          <DialogDescription>
            Remplissez le formulaire ci-dessous pour {isUpdate ? 'modifier' : 'ajouter'}{' '}
            une compétence.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid items-center gap-4">
              <Input
                id="name"
                className="w-full"
                {...register('name')}
                placeholder="Nom de la compétence"
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center ${
                isDragActive ? 'border-primary' : 'border-gray-300'
              }`}
            >
              <input {...getInputProps()} />
              {watchIcon ? (
                <div className="flex items-center justify-center">
                  <p className="mr-2">Fichier sélectionné : {watchIcon.name}</p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeIcon();
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <p>
                  {isDragActive
                    ? 'Déposez le fichier ici...'
                    : 'Glissez et déposez une icône SVG ici, ou cliquez pour sélectionner un fichier'}
                </p>
              )}
            </div>
            {errors.icon && <p className="text-red-500">{errors.icon.message}</p>}
          </div>
          <DialogFooter className="flex justify-between items-center mt-6">
            <div>
              <Button
                type="button"
                onClick={open}
                disabled={Boolean(watchIcon)}
                variant="outline"
                className="mr-2"
              >
                <Upload className="mr-2 h-4 w-4" />
                Sélectionner une icône
              </Button>
            </div>
            <div>
              <DialogClose asChild>
                <Button type="button" variant="outline" className="mr-2">
                  Annuler
                </Button>
              </DialogClose>
              <Button type="button" onClick={handleSubmit(onSubmit)}>
                {isUpdate ? 'Modifier' : 'Ajouter'}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
