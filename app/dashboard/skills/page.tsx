'use client';

import useSkillStore from '@/store/useSkillStore';
import { useEffect, useState } from 'react';
import LoadingMessage from '@/components/LoadingMessage';
import ErrorMessage from '@/components/ErrorMessage';
import SkillManager from '@/components/dashboard/skills/SkillManager';

export default function SkillsPage() {
  const { fetchSkills, isLoading } = useSkillStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSkills()
      .then(() => setError(null))
      .catch((error) => {
        setError(
          error.message ||
            'Une erreur inattendue est survenue lors de la récupération des compétences',
        );
      });
  }, [fetchSkills]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Gestion des compétences</h1>
      <LoadingMessage isLoading={isLoading} />
      <ErrorMessage errorMessage={error} />
      <SkillManager />
    </div>
  );
}
