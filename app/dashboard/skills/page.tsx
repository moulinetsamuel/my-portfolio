import LoadingMessage from '@/components/LoadingMessage';
import SkillManager from '@/components/dashboard/skills/SkillManager';

export default function SkillsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Gestion des compétences</h1>
      <LoadingMessage store="skill" />
      <SkillManager />
    </div>
  );
}
