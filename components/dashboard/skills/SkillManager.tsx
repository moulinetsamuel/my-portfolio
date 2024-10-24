import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SkillList from '@/components/dashboard/skills/SkillList';
import SkillForm from '@/components/dashboard/skills/SkillForm';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface SkillManagerProps {
  message: string | null;
}

export default function SkillManager({ message }: SkillManagerProps) {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Liste des compétences</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={() => setIsFormVisible(!isFormVisible)} className="m-4">
          {isFormVisible ? 'Fermer le formulaire' : 'Ajouter une compétence'}
        </Button>
        {isFormVisible && <SkillForm onClose={() => setIsFormVisible(false)} />}

        <SkillList message={message} />
      </CardContent>
    </Card>
  );
}
