'use client';

import { useState } from 'react';
import { Skill } from '@/lib/schemas/skill/skillSchema';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import SkillForm from '@/components/dashboard/skills/SkillForm';
import useSkillStore from '@/store/useSkillStore';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
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
import { Trash2 } from 'lucide-react';

interface SkillItemProps {
  skill: Skill;
}

export default function SkillItem({ skill }: SkillItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteSkill = useSkillStore((state) => state.deleteSkill);
  const error = useSkillStore((state) => state.error);
  const { toast } = useToast();

  const handleDelete = async () => {
    setIsDeleting(true);
    const response = await deleteSkill(skill.id);

    if (response) {
      toast({ title: response });
    } else if (error) {
      toast({ title: error.message, variant: 'destructive' });
    }
    setIsDeleting(false);
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2">
          <Image
            src={skill.iconPath}
            alt={`Icône de ${skill.name}`}
            width={24}
            height={24}
            className="rounded-sm"
          />
          <span className="truncate">{skill.name}</span>
        </CardTitle>
        <SkillForm skill={skill} />
      </CardHeader>
      <CardFooter className="pt-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" className="w-full">
              <Trash2 className="w-4 h-4 mr-2" />
              Supprimer
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Êtes-vous sûr de vouloir supprimer cette compétence ?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Cette action ne peut pas être annulée. Cela supprimera définitivement la
                compétence &quot;{skill.name}&quot; et toutes les données associées.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? 'Suppression...' : 'Supprimer'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
