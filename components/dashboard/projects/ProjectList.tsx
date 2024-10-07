import { Project, Skill } from "@/types/portfolio";
import ProjectCard from "./ProjectCard";

type ProjectListProps = {
  projects: Project[];
  skills: Skill[];
  onUpdateProject: (project: Project) => void;
  onDeleteProject: (id: number) => void;
  onAddNewSkill: (skillName: string) => Skill;
};

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
