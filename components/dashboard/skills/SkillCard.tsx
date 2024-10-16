import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
import type { Skill } from '@/lib/schemas/skill/skillSchema';
import SkillForm from '@/components/dashboard/skills/SkillForm';
import useSkillStore from '@/store/useSkillStore';
import { useToast } from '@/hooks/use-toast';

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { deleteSkill } = useSkillStore();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await deleteSkill(skill.id);
      toast({ title: 'Compétence supprimée avec succès' });
    } catch (error) {
      console.error('Erreur lors de la suppression de la compétence:', error);
      toast({
        title: 'Erreur lors de la suppression de la compétence',
        variant: 'destructive',
      });
    }
  };

  const handleCloseEditDialog = () => {
    setIsEditing(false);
  };

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
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            Modifier
          </Button>

          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Modifier la compétence</DialogTitle>
              </DialogHeader>
              <SkillForm skill={skill} onCloseSkillForm={handleCloseEditDialog} />
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
                <AlertDialogAction onClick={handleDelete}>Supprimer</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
