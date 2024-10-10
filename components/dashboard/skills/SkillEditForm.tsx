import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import type { SkillEditFormProps } from '@/types/portfolio';

export default function SkillEditForm({ skill, onSave }: SkillEditFormProps) {
  const [name, setName] = useState(skill.name);
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/svg+xml': ['.svg'] },
    multiple: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(skill.id, name, file || undefined);
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
      <Button type="submit" disabled={!name || (!skill && !file)}>
        {skill ? 'Mettre à jour' : 'Ajouter'} la compétence
      </Button>
    </form>
  );
}
