import ProjectCard from '@/components/dashboard/projects/ProjectCard';
import useProjectStore from '@/store/useProjectStore';

export default function ProjectList() {
  const { projects } = useProjectStore();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
