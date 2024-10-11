'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import useSWR from 'swr';
import {
  getProjects,
  getSkills,
  createProject,
  updateProject,
  deleteProject,
  createSkill,
} from '@/lib/api';
import type { Project, Skill } from '@/types/portfolio';
import ProjectForm from '@/components/dashboard/projects/ProjectForm';
import ProjectList from '@/components/dashboard/projects/ProjectList';

export default function ProjectsPage() {
  const {
    data: projects,
    error: projectsError,
    mutate: mutateProjects,
  } = useSWR<Project[]>('/api/projects', getProjects);
  const {
    data: skills,
    error: skillsError,
    mutate: mutateSkills,
  } = useSWR<Skill[]>('/api/skills', getSkills);
  const { toast } = useToast();

  const handleAddProject = async (formData: FormData) => {
    try {
      await createProject(formData);
      mutateProjects();
      toast({
        title: 'Succès',
        description: 'Le projet a été ajouté avec succès.',
      });
    } catch (error) {
      console.error('Error adding project:', error);
      toast({
        title: 'Erreur',
        description: "Impossible d'ajouter le projet.",
        variant: 'destructive',
      });
    }
  };

  const handleUpdateProject = async (formData: FormData) => {
    try {
      await updateProject(Number(formData.get('id')), formData);
      mutateProjects();
      toast({
        title: 'Succès',
        description: 'Le projet a été mis à jour avec succès.',
      });
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour le projet.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteProject = async (id: number) => {
    try {
      await deleteProject(id);
      mutateProjects();
      toast({
        title: 'Succès',
        description: 'Le projet a été supprimé avec succès.',
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer le projet.',
        variant: 'destructive',
      });
    }
  };

  const handleAddSkill = async (name: string, icon: File) => {
    try {
      await createSkill(name, icon);
      mutateSkills();
      toast({
        title: 'Succès',
        description: 'La compétence a été ajoutée avec succès.',
      });
    } catch (error) {
      console.error('Error adding skill:', error);
      toast({
        title: 'Erreur',
        description: "Impossible d'ajouter la compétence.",
        variant: 'destructive',
      });
    }
  };

  if (projectsError || skillsError) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Gestion des projets</h1>
        <p>Une erreur s&apos;est produite. Veuillez réessayer.</p>
      </div>
    );
  }

  if (!projects || !skills) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Gestion des projets</h1>
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Gestion des projets</h1>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Ajouter un projet</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un projet</DialogTitle>
          </DialogHeader>
          <ProjectForm
            skills={skills}
            onSave={handleAddProject}
            onAddSkill={handleAddSkill}
          />
        </DialogContent>
      </Dialog>

      <ProjectList
        projects={projects}
        skills={skills}
        onUpdateProject={handleUpdateProject}
        onDeleteProject={handleDeleteProject}
        onAddSkill={handleAddSkill}
      />
    </div>
  );
}
