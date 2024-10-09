"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SkillList from "@/components/dashboard/skills/SkillList";
import SkillForm from "@/components/dashboard/skills/SkillForm";
import { SkillsData } from "@/constants";
import type { Skill } from "@/types/portfolio";

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>(SkillsData);

  // TODO: Implémenter la récupération des compétences depuis l'API
  useEffect(() => {
    // fetchSkills().then(setSkills)
  }, []);

  const handleAddSkill = (newSkill: Omit<Skill, "id">) => {
    // TODO: Implémenter l'ajout via l'API
    setSkills((prev) => [...prev, { ...newSkill, id: Date.now() }]);
  };

  const handleUpdateSkill = (updatedSkill: Skill) => {
    // TODO: Implémenter la mise à jour via l'API
    setSkills((prev) =>
      prev.map((skill) => (skill.id === updatedSkill.id ? updatedSkill : skill))
    );
  };

  const handleDeleteSkill = (id: number) => {
    // TODO: Implémenter la suppression via l'API
    setSkills((prev) => prev.filter((skill) => skill.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Gestion des compétences</h1>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Ajouter une compétence</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une nouvelle compétence</DialogTitle>
          </DialogHeader>
          <SkillForm onSave={handleAddSkill} />
        </DialogContent>
      </Dialog>

      <SkillList
        skills={skills}
        onUpdateSkill={handleUpdateSkill}
        onDeleteSkill={handleDeleteSkill}
      />
    </div>
  );
}
