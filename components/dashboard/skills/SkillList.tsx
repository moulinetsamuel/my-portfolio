import SkillCard from '@/components/dashboard/skills/SkillCard';
import type { Skill } from '@/lib/schemas/skillSchema';

interface SkillListProps {
  skills: Skill[];
  onUpdateSkill: (id: number, formData: FormData) => Promise<void>;
  onDeleteSkill: (id: number) => Promise<void>;
}

export default function SkillList({
  skills,
  onUpdateSkill,
  onDeleteSkill,
}: SkillListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {skills.map((skill) => (
        <SkillCard
          key={skill.id}
          skill={skill}
          onUpdate={onUpdateSkill}
          onDelete={onDeleteSkill}
        />
      ))}
    </div>
  );
}
