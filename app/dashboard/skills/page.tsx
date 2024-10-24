'use client';

import useSkillStore from '@/store/useSkillStore';
import { useEffect, useState } from 'react';
import LoadingMessage from '@/components/LoadingMessage';
import SkillManager from '@/components/dashboard/skills/SkillManager';

export default function SkillsPage() {
  const fetchSkills = useSkillStore((state) => state.fetchSkills);
  const [message, setMesage] = useState<string | null>(null);

  useEffect(() => {
    fetchSkills().catch((error) => {
      setMesage(error.message || 'Une erreur inattendue est survenue');
    });
  }, [fetchSkills]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Gestion des compétences</h1>
      <LoadingMessage store="skill" />
      <SkillManager message={message} />
    </div>
  );
}
