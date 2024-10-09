import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SkillForm from "@/components/dashboard/skills/SkillForm";
import type { SkillSelectorProps } from "@/types/portfolio";

export default function SkillSelector({
  selectedSkills,
  allSkills,
  onSkillChange,
  onAddNewSkill,
}: SkillSelectorProps) {
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  const handleSkillChange = (skillId: number) => {
    const updatedSkills = selectedSkills.includes(skillId)
      ? selectedSkills.filter((id) => id !== skillId)
      : [...selectedSkills, skillId];
    onSkillChange(updatedSkills);
  };

  const handleAddNewSkill = (newSkill: string) => {
    const addedSkill = onAddNewSkill(newSkill);
    onSkillChange([...selectedSkills, addedSkill.id]);
    setIsAddingSkill(false);
  };

  return (
    <div>
      <Label>Compétences</Label>
      <div className="mb-2 flex flex-wrap gap-2">
        {selectedSkills.map((skillId) => {
          const skill = allSkills.find((s) => s.id === skillId);
          return skill ? (
            <Button
              key={skill.id}
              type="button"
              variant="default"
              onClick={() => handleSkillChange(skill.id)}
            >
              {skill.name} ✕
            </Button>
          ) : null;
        })}
      </div>
      <Select onValueChange={(value) => handleSkillChange(Number(value))}>
        <SelectTrigger>
          <SelectValue placeholder="Sélectionner une compétence" />
        </SelectTrigger>
        <SelectContent>
          {allSkills
            .filter((skill) => !selectedSkills.includes(skill.id))
            .map((skill) => (
              <SelectItem key={skill.id} value={skill.id.toString()}>
                {skill.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <Dialog open={isAddingSkill} onOpenChange={setIsAddingSkill}>
        <DialogTrigger asChild>
          <Button type="button" variant="outline" className="mt-2">
            Ajouter une nouvelle compétence
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une nouvelle compétence</DialogTitle>
          </DialogHeader>
          <SkillForm onSave={handleAddNewSkill} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
