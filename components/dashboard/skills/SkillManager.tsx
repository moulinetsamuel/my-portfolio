import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SkillList from '@/components/dashboard/skills/SkillList';
import SkillForm from '@/components/dashboard/skills/SkillForm';

export default function SkillManager() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Liste des compétences</CardTitle>
      </CardHeader>
      <CardContent>
        <SkillForm />
        <SkillList />
      </CardContent>
    </Card>
  );
}
