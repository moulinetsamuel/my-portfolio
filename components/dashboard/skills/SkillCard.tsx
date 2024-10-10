import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import type { SkillCardProps } from '@/types/portfolio';
import SkillEditForm from '@/components/dashboard/skills/SkillEditForm';

export default function SkillCard({ skill, onUpdate, onDelete }: SkillCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Image
            src={skill.iconPath}
            alt={skill.name}
            width={24}
            height={24}
            className="mr-2"
          />
          {skill.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-4 flex justify-end space-x-2">
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <Button variant="outline">Modifier</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Modifier la compétence</DialogTitle>
              </DialogHeader>
              <SkillEditForm
                skill={skill}
                onSave={(id, name, icon) => {
                  onUpdate(id, name, icon);
                  setIsEditing(false);
                }}
              />
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Supprimer</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Êtes-vous sûr de vouloir supprimer cette compétence ?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action ne peut pas être annulée.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(skill.id)}>
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
