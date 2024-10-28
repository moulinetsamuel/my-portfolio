/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
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
import { Controller } from 'react-hook-form';

interface SkillSelectorProps {
  control: any;
  errors: any;
  defaultSkills?: number[];
}

export default function SkillSelector({
  control,
  errors,
  defaultSkills = [],
}: SkillSelectorProps) {
  const skills = useSkillStore((state) => state.skills);
  const [selectedSkills, setSelectedSkills] = useState<number[]>(defaultSkills);

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
              onClick={() => {
                const newSelectedSkills = selectedSkills.filter((id) => id !== skill.id);
                setSelectedSkills(newSelectedSkills);
                control.setValue('skillIds', newSelectedSkills);
              }}
            >
              {skill.name} ✕
            </Button>
          ) : null;
        })}
      </div>
      <Controller
        name="skillIds"
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={(value) => {
              const newSkillId = parseInt(value, 10);
              if (!selectedSkills.includes(newSkillId)) {
                const newSelectedSkills = [...selectedSkills, newSkillId];
                setSelectedSkills(newSelectedSkills);
                field.onChange(newSelectedSkills);
              }
            }}
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
        )}
      />
      {errors.skillIds && <p className="text-red-500">{errors.skillIds.message}</p>}
    </div>
  );
}
