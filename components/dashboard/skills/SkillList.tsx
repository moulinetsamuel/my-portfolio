import SkillItem from '@/components/dashboard/skills/SkillItem';
import useSkillStore from '@/store/useSkillStore';

export default function SkillList() {
  const skills = useSkillStore((state) => state.skills);
  return (
    <div className="space-y-4 mt-4">
      {skills.map((skill) => (
        <SkillItem key={skill.id} skill={skill} />
      ))}
    </div>
  );
}
