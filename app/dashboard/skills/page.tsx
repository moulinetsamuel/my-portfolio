'use client';

import useSkillStore from '@/store/useSkillStore';
import { useEffect } from 'react';
import LoadingMessage from '@/components/LoadingMessage';
import SkillManager from '@/components/dashboard/skills/SkillManager';
import { useToast } from '@/hooks/use-toast';
import { handleError } from '@/lib/utils/handleError';

export default function SkillsPage() {
  const { toast } = useToast();
  const fetchSkills = useSkillStore((state) => state.fetchSkills);

  useEffect(() => {
    try {
      fetchSkills();
    } catch (error) {
      const { title, description } = handleError(error);
      toast({ title, description, variant: 'destructive' });
    }
  }, [fetchSkills, toast]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Gestion des compétences</h1>
      <LoadingMessage store="skill" />
      <SkillManager />
    </div>
  );
}
