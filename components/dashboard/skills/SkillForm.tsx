import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  skillFormSchema,
  updateSkillFormSchema,
} from '@/lib/schemas/skill/skillFormSchema';
import useSkillStore from '@/store/useSkillStore';
import { Skill } from '@/lib/schemas/skill/skillSchema';
import { useDropzone } from 'react-dropzone';
import { z } from 'zod';
import { useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { handleError } from '@/lib/utils/handleError';

interface SkillFormProps {
  skill?: Skill;
  onClose: () => void;
}

export default function SkillForm({ skill, onClose }: SkillFormProps) {
  const isLoading = useSkillStore((state) => state.isLoading);
  const addSkill = useSkillStore((state) => state.addSkill);
  const updateSkill = useSkillStore((state) => state.updateSkill);
  const { toast } = useToast();

  const isUpdate = Boolean(skill);
  const schema = isUpdate ? updateSkillFormSchema : skillFormSchema;
  type SkillFormData = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SkillFormData>({
    resolver: zodResolver(schema),
    defaultValues: skill ? { name: skill.name } : {},
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
    try {
      if (skill) {
        const updateMessage = await updateSkill(skill.id, formData);
        toast({ title: 'Succès', description: updateMessage });
        onClose();
      } else {
        const addMessage = await addSkill(formData);
        toast({ title: 'Succès', description: addMessage });
        onClose();
      }
    } catch (error) {
      const { title, description } = handleError(error);
      toast({ title, description, variant: 'destructive' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="mt-4">
        <CardContent className="space-y-4">
          <div>
            <Input {...register('name')} placeholder="Nom de la compétence" />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center ${isDragActive ? 'border-primary' : 'border-gray-300'}`}
          >
            <input {...getInputProps()} />
            {watchIcon ? (
              <p>Fichier sélectionné : {watchIcon.name}</p>
            ) : (
              <p>
                {isDragActive
                  ? 'Déposez le fichier ici...'
                  : 'Glissez et déposez une icône SVG ici, ou cliquez pour sélectionner un fichier'}
              </p>
            )}
          </div>
          {errors.icon && <p className="text-red-500">{errors.icon.message}</p>}
          <div className="mt-4 flex justify-between">
            <Button type="button" onClick={open} disabled={isLoading}>
              Sélectionner un fichier
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Chargement...' : isUpdate ? 'Modifier' : 'Ajouter'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
