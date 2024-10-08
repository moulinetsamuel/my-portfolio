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
import type { Project, Skill } from "@/types/portfolio";

// TODO: Remplacer ces données mockées par des appels à l'API une fois qu'elle sera prête
const ProjectsData: Project[] = [
  {
    id: 1,
    title: "Katsumeme",
    description: "Application web pour générer et partager des mèmes.",
    image: "/images/katsumeme.png",
    stack: [4, 3, 9, 7, 8],
    siteUrl: "https://katsumeme.rocks",
    repoUrl: "https://github.com/moulinetsamuel/katsumeme-back-sam",
  },
  {
    id: 2,
    title: "Mon portfolio",
    description: "Portfolio personnel réalisé avec Next.js et Tailwind CSS.",
    image: "/images/mon-portfolio.png",
    stack: [4, 5, 6, 16],
    siteUrl: "https://monportfolio.com",
    repoUrl: "https://github.com/moulinetsamuel/my-portfolio",
  },
];

// TODO: Récupérer cette liste depuis la base de données via l'API
const SkillsData: Skill[] = [
  {
    id: 1,
    name: "HTML5",
  },
  {
    id: 2,
    name: "CSS3",
  },
  {
    id: 3,
    name: "JavaScript",
  },
  {
    id: 4,
    name: "React",
  },
  {
    id: 5,
    name: "Next.js",
  },
  {
    id: 6,
    name: "Tailwind CSS",
  },
  {
    id: 7,
    name: "Node.js",
  },
  {
    id: 8,
    name: "Express",
  },
  {
    id: 9,
    name: "PostgreSQL",
  },
  {
    id: 10,
    name: "Git",
  },
  {
    id: 11,
    name: "GitHub",
  },
  {
    id: 12,
    name: "Prisma",
  },
  {
    id: 13,
    name: "Sequelize",
  },
  {
    id: 14,
    name: "Ubuntu",
  },
  {
    id: 15,
    name: "Visual Studio Code",
  },
  {
    id: 16,
    name: "TypeScript",
  },
];

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
