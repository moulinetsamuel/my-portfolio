"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProjectList from "@/components/dashboard/projects/ProjectList";
import ProjectForm from "@/components/dashboard/projects/ProjectForm";
import { SkillsData, ProjectsData } from "@/constants";
import type { Project, Skill } from "@/types/portfolio";

export default function ProjectsPage() {
  // TODO: Remplacer ces états locaux par des appels à l'API et des mises à jour de la base de données
  const [projects, setProjects] = useState<Project[]>(ProjectsData);
  const [skills, setSkills] = useState<Skill[]>(SkillsData);

  // TODO: Implémenter l'ajout de projet via l'API
  const handleAddProject = (newProject: Omit<Project, "id">) => {
    setProjects([
      ...projects,
      { ...newProject, id: Math.max(...projects.map((p) => p.id)) + 1 },
    ]);
  };

  // TODO: Implémenter la mise à jour de projet via l'API
  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(
      projects.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
  };

  // TODO: Implémenter la suppression de projet via l'API
  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  // TODO: Implémenter l'ajout de compétence via l'API
  const handleAddNewSkill = (skillName: string) => {
    const newSkill = {
      id: Math.max(...skills.map((s) => s.id)) + 1,
      name: skillName,
    };
    setSkills([...skills, newSkill]);
    return newSkill;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Gestion des projets</h1>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Nouveau Projet</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau projet</DialogTitle>
          </DialogHeader>
          <ProjectForm
            onSave={handleAddProject}
            skills={skills}
            onAddNewSkill={handleAddNewSkill}
          />
        </DialogContent>
      </Dialog>

      <ProjectList
        projects={projects}
        skills={skills}
        onUpdateProject={handleUpdateProject}
        onDeleteProject={handleDeleteProject}
        onAddNewSkill={handleAddNewSkill}
      />
    </div>
  );
}
