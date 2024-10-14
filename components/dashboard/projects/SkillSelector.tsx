'use client';

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
import useSkillStore from '@/store/useSkillStore';

interface SkillSelectorProps {
  selectedSkills: number[];
  onSkillsChange: (selectedSkills: number[]) => void;
}

export default function SkillSelector({
  selectedSkills,
  onSkillsChange,
}: SkillSelectorProps) {
  const { skills } = useSkillStore();

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
        onValueChange={(value) =>
          onSkillsChange([...selectedSkills, parseInt(value, 10)])
        }
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
    </div>
  );
}
