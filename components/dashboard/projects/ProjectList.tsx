import type { ProjectListProps } from "@/types/portfolio";
import ProjectCard from "./ProjectCard";

export default function ProjectList({
  projects,
  skills,
  onUpdateProject,
  onDeleteProject,
  onAddNewSkill,
}: ProjectListProps) {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          skills={skills}
          onUpdate={onUpdateProject}
          onDelete={onDeleteProject}
          onAddNewSkill={onAddNewSkill}
        />
      ))}
    </div>
  );
}
