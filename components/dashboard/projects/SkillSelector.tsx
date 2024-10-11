import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import SkillForm from '@/components/dashboard/skills/SkillForm';
import type { SkillSelectorProps } from '@/types/portfolio';

export default function SkillSelector({
  skills,
  selectedSkills,
  onSkillsChange,
  onAddSkill,
}: SkillSelectorProps) {
  return (
    <div>
      <Label>Compétences</Label>
      <div className="mb-2 flex flex-wrap gap-2">
        {selectedSkills.map((skillId) => {
          const skill = skills.find((s) => s.id === skillId);
          return skill ? (
            <Button
              key={skill.id}
              type="button"
              variant="secondary"
              onClick={() =>
                onSkillsChange(selectedSkills.filter((id) => id !== skill.id))
              }
            >
              {skill.name} ✕
            </Button>
          ) : null;
        })}
      </div>
      <Select
        onValueChange={(value) => onSkillsChange([...selectedSkills, parseInt(value)])}
      >
        <SelectTrigger>
          <SelectValue placeholder="Sélectionner une compétence" />
        </SelectTrigger>
        <SelectContent>
          {skills
            .filter((skill) => !selectedSkills.includes(skill.id))
            .map((skill) => (
              <SelectItem key={skill.id} value={skill.id.toString()}>
                {skill.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <Dialog>
        <DialogTrigger asChild>
          <Button type="button" variant="outline" className="mt-2">
            Ajouter une nouvelle compétence
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une nouvelle compétence</DialogTitle>
          </DialogHeader>
          <SkillForm onSave={onAddSkill} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
