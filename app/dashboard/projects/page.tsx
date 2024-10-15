'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ProjectForm from '@/components/dashboard/projects/ProjectForm';
import ProjectList from '@/components/dashboard/projects/ProjectList';
import useProjectStore from '@/store/useProjectStore';
import useSkillStore from '@/store/useSkillStore';

export default function ProjectsPage() {
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState(false);
  const {
    fetchProjects,
    isLoading: projectsLoading,
    error: projectsError,
  } = useProjectStore();
  const { isLoading: skillsLoading, error: skillsError } = useSkillStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  if (projectsError || skillsError) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Gestion des projets</h1>
        <p>Une erreur s&apos;est produite. Veuillez réessayer.</p>
      </div>
    );
  }

  if (projectsLoading || skillsLoading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Gestion des projets</h1>
        <p>Chargement...</p>
      </div>
    );
  }

  const handleCloseAddProjectDialog = () => {
    setIsAddProjectDialogOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Gestion des projets</h1>
      <Button className="mb-4" onClick={() => setIsAddProjectDialogOpen(true)}>
        Ajouter un projet
      </Button>

      <Dialog open={isAddProjectDialogOpen} onOpenChange={setIsAddProjectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un projet</DialogTitle>
          </DialogHeader>
          <ProjectForm onClose={handleCloseAddProjectDialog} />
        </DialogContent>
      </Dialog>

      <ProjectList />
    </div>
  );
}
