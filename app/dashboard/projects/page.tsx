import LoadingMessage from '@/components/LoadingMessage';
import ProjectManager from '@/components/dashboard/projects/ProjectManager';

export default function ProjectsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Gestion des projets</h1>
      <LoadingMessage store="project" />
      <ProjectManager />
    </div>
  );
}
