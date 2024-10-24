import SkillItem from '@/components/dashboard/skills/SkillItem';
import useSkillStore from '@/store/useSkillStore';
import ErrorMessage from '@/components/ErrorMessage';

interface SkillListProps {
  message: string | null;
}

export default function SkillList({ message }: SkillListProps) {
  const skills = useSkillStore((state) => state.skills);

  if (message) {
    return <ErrorMessage errorMessage={message} />;
  }

  return (
    <div className="space-y-4 mt-4">
      {skills.map((skill) => (
        <SkillItem key={skill.id} skill={skill} />
      ))}
    </div>
  );
}
