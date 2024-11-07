import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProjectList from '@/components/dashboard/projects/ProjectList';
import ProjectForm from '@/components/dashboard/projects/ProjectForm';

export default function ProjectManager() {
  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Liste des projets</CardTitle>
        <ProjectForm />
      </CardHeader>
      <CardContent>
        <ProjectList />
      </CardContent>
    </Card>
  );
}
