import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SkillList from '@/components/dashboard/skills/SkillList';
import SkillForm from '@/components/dashboard/skills/SkillForm';

export default function SkillManager() {
  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Liste des compétences</CardTitle>
        <SkillForm />
      </CardHeader>
      <CardContent>
        <SkillList />
      </CardContent>
    </Card>
  );
}
