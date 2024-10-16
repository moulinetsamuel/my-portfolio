import React, { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { DialogClose } from '@/components/ui/dialog';
import useSkillStore from '@/store/useSkillStore';
import { useToast } from '@/hooks/use-toast';
import { skillFormSchema, type SkillFormData } from '@/lib/schemas/skill/skillSchema';
import type { Skill } from '@/lib/schemas/skill/skillSchema';

interface SkillFormProps {
  skill?: Skill;
  onCloseSkillForm: () => void;
}

export default function SkillForm({ skill, onCloseSkillForm }: SkillFormProps) {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SkillFormData>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      name: skill?.name || '',
      icon: null,
    },
  });

  const { addSkill, updateSkill } = useSkillStore();
  const { toast } = useToast();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setValue('icon', acceptedFiles[0], { shouldValidate: true });
    },
    [setValue],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
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

    try {
      if (skill) {
        await updateSkill(skill.id, formData);
        toast({ title: 'Compétence mise à jour avec succès' });
      } else {
        await addSkill(formData);
        toast({ title: 'Compétence ajoutée avec succès' });
      }
      onCloseSkillForm();
    } catch (error) {
      console.error("Erreur lors de l'opération sur la compétence:", error);
      toast({
        title: `Erreur lors de ${skill ? 'la mise à jour' : "l'ajout"} de la compétence`,
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Nom de la compétence</Label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <>
              <Input {...field} id="name" />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </>
          )}
        />
      </div>
      <div>
        <Label htmlFor="icon">Icône SVG</Label>
        <Card className="mt-2">
          <CardContent>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
                isDragActive ? 'border-primary' : 'border-gray-300'
              }`}
            >
              <input {...getInputProps()} />
              {watchIcon ? (
                <p>Fichier sélectionné : {watchIcon.name}</p>
              ) : (
                <p>
                  {skill
                    ? 'Déposez une nouvelle icône SVG ici ou cliquez pour sélectionner'
                    : 'Déposez une icône SVG ici ou cliquez pour sélectionner'}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
        {errors.icon && (
          <p className="text-red-500 text-sm mt-1">{errors.icon.message}</p>
        )}
        {skill && !watchIcon && (
          <p className="mt-2 text-sm text-gray-500">Icône actuelle : {skill.iconPath}</p>
        )}
      </div>
      <div className="flex justify-end space-x-2">
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Annuler
          </Button>
        </DialogClose>
        <Button type="submit">{skill ? 'Mettre à jour' : 'Ajouter'} la compétence</Button>
      </div>
    </form>
  );
}
