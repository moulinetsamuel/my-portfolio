import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SkillSelectorProps } from "@/types/portfolio";

export default function SkillSelector({
  selectedSkills,
  allSkills,
  onSkillChange,
  onAddNewSkill,
}: SkillSelectorProps) {
  const [newSkill, setNewSkill] = useState("");

  const handleSkillChange = (skillId: number) => {
    const updatedSkills = selectedSkills.includes(skillId)
      ? selectedSkills.filter((id) => id !== skillId)
      : [...selectedSkills, skillId];
    onSkillChange(updatedSkills);
  };

  const handleAddNewSkill = () => {
    if (newSkill.trim()) {
      const addedSkill = onAddNewSkill(newSkill.trim());
      onSkillChange([...selectedSkills, addedSkill.id]);
      setNewSkill("");
    }
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
      <div className="mt-2 flex gap-2">
        <Input
          placeholder="Nouvelle compétence"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
        <Button type="button" onClick={handleAddNewSkill}>
          Ajouter
        </Button>
      </div>
    </div>
  );
}
