'use client';

import { useEffect, useState } from 'react';
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
import useSkillStore from '@/store/useSkillStore';

export default function SkillsPage() {
  const { fetchSkills, isLoading, error } = useSkillStore();
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  if (error) {
    return (
      <div className="text-center text-red-500 dark:text-red-400">
        Erreur de chargement des compétences
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        Chargement des compétences...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Gestion des compétences</h1>

      <Dialog open={isAddingSkill} onOpenChange={setIsAddingSkill}>
        <DialogTrigger asChild>
          <Button className="mb-4">Ajouter une compétence</Button>
        </DialogTrigger>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Ajouter une nouvelle compétence</DialogTitle>
          </DialogHeader>
          <SkillForm onSkillAdded={() => setIsAddingSkill(false)} />
        </DialogContent>
      </Dialog>

      <SkillList />
    </div>
  );
}
