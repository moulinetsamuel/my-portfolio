'use client';

import useSWR from 'swr';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import SkillList from '@/components/dashboard/skills/SkillList';
import SkillForm from '@/components/dashboard/skills/SkillForm';
import { getSkills, createSkill, updateSkill, deleteSkill } from '@/lib/api/skills';
import type { Skill } from '@/lib/schemas/skillSchema';
import { useToast } from '@/hooks/use-toast';

export default function SkillsPage() {
  const { data: skills, error, mutate } = useSWR<Skill[]>('/api/skills', getSkills);
  const { toast } = useToast();

  if (error) {
    return (
      <div className="text-center text-red-500 dark:text-red-400">
        Erreur de chargement des compétences
      </div>
    );
  }
  if (!skills) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        Chargement des compétences...
      </div>
    );
  }
  const handleAddSkill = async (formData: FormData) => {
    try {
      const createdSkill = await createSkill(formData);
      await mutate([...skills, createdSkill], false);
      toast({ title: 'Compétence ajoutée avec succès' });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la compétence:", error);
      toast({ title: "Erreur lors de l'ajout de la compétence", variant: 'destructive' });
    }
  };

  const handleUpdateSkill = async (id: number, formData: FormData) => {
    try {
      const updatedSkill = await updateSkill(id, formData);
      await mutate(
        skills.map((skill) => (skill.id === id ? updatedSkill : skill)),
        false,
      );
      toast({ title: 'Compétence mise à jour avec succès' });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la compétence:', error);
      toast({
        title: 'Erreur lors de la mise à jour de la compétence',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteSkill = async (id: number) => {
    try {
      await deleteSkill(id);
      await mutate(
        skills.filter((skill) => skill.id !== id),
        false,
      );
      toast({ title: 'Compétence supprimée avec succès' });
    } catch (error) {
      console.error('Erreur lors de la suppression de la compétence:', error);
      toast({
        title: 'Erreur lors de la suppression de la compétence',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Gestion des compétences</h1>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Ajouter une compétence</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une nouvelle compétence</DialogTitle>
          </DialogHeader>
          <SkillForm onSave={handleAddSkill} />
        </DialogContent>
      </Dialog>

      <SkillList
        skills={skills}
        onUpdateSkill={handleUpdateSkill}
        onDeleteSkill={handleDeleteSkill}
      />
    </div>
  );
}
