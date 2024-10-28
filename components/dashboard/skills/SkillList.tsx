'use client';

import SkillItem from '@/components/dashboard/skills/SkillItem';
import useSkillStore from '@/store/useSkillStore';
import ErrorMessage from '@/components/ErrorMessage';
import { useEffect } from 'react';

export default function SkillList() {
  const fetchSkills = useSkillStore((state) => state.fetchSkills);
  const skills = useSkillStore((state) => state.skills);
  const error = useSkillStore((state) => state.error);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  if (error && error.fetch) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  if (skills.length === 0) {
    return <ErrorMessage errorMessage="Aucune compétence trouvée" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map((skill) => (
        <SkillItem key={skill.id} skill={skill} />
      ))}
    </div>
  );
}
