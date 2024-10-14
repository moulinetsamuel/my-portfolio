import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import type { Skill } from '@/lib/schemas/skillSchema';
import { DialogClose } from '@/components/ui/dialog';

interface SkillFormProps {
  skill?: Skill;
  onSave: (formData: FormData) => Promise<void>;
}

export default function SkillForm({ skill, onSave }: SkillFormProps) {
  const [name, setName] = useState(skill?.name || '');
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/svg+xml': ['.svg'] },
    multiple: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    if (file) {
      formData.append('icon', file);
    }
    await onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nom de la compétence</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
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
              {file ? (
                <p>Fichier sélectionné : {file.name}</p>
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
        {skill && !file && (
          <p className="mt-2 text-sm text-gray-500">Icône actuelle : {skill.iconPath}</p>
        )}
      </div>
      <div className="flex justify-end space-x-2">
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Annuler
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="submit" disabled={!name}>
            {skill ? 'Mettre à jour' : 'Ajouter'} la compétence
          </Button>
        </DialogClose>
      </div>
    </form>
  );
}
