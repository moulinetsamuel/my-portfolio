'use client';

import ProjectItem from '@/components/dashboard/projects/ProjectItem';
import useProjectStore from '@/store/useProjectStore';
import ErrorMessage from '@/components/ErrorMessage';
import { useEffect } from 'react';
import useSkillStore from '@/store/useSkillStore';

export default function ProjectList() {
  const fetchSkills = useSkillStore((state) => state.fetchSkills);
  const fetchProjects = useProjectStore((state) => state.fetchProjects);
  const projects = useProjectStore((state) => state.projects);
  const error = useProjectStore((state) => state.error);

  useEffect(() => {
    fetchProjects();
    fetchSkills();
  }, [fetchProjects, fetchSkills]);

  if (error && error.fetch) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  if (projects.length === 0) {
    return <ErrorMessage errorMessage="Aucun projet trouvé" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  );
}
