import SkillCard from '@/components/dashboard/skills/SkillCard';
import useSkillStore from '@/store/useSkillStore';

export default function SkillList() {
  const { skills } = useSkillStore();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {skills.map((skill) => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
    </div>
  );
}
