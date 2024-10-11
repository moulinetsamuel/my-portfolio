import ProjectCard from '@/components/dashboard/projects/ProjectCard';
import type { ProjectListProps } from '@/types/portfolio';

export default function ProjectList({
  projects,
  skills,
  onUpdateProject,
  onDeleteProject,
  onAddSkill,
}: ProjectListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          skills={skills}
          onUpdate={onUpdateProject}
          onDelete={onDeleteProject}
          onAddSkill={onAddSkill}
        />
      ))}
    </div>
  );
}
