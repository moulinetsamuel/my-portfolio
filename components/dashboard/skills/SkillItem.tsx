import { Skill } from '@/lib/schemas/skill/skillSchema';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import SkillForm from '@/components/dashboard/skills/SkillForm';
import useSkillStore from '@/store/useSkillStore';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { handleError } from '@/lib/utils/handleError';

interface SkillItemProps {
  skill: Skill;
}

export default function SkillItem({ skill }: SkillItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const deleteSkill = useSkillStore((state) => state.deleteSkill);
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const response = await deleteSkill(skill.id);
      toast({
        title: `Succès`,
        description: response,
      });
    } catch (error) {
      const { title, description } = handleError(error);
      toast({ title, description, variant: 'destructive' });
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded">
      <div>
        <h3 className="font-bold">{skill.name}</h3>
        <Image src={skill.iconPath} alt={skill.name} width={24} height={24} />
      </div>
      <div>
        <Button onClick={() => setIsEditing(!isEditing)} className="mr-2">
          {isEditing ? 'Annuler' : 'Modifier'}
        </Button>
        <Button onClick={handleDelete} variant="destructive">
          Supprimer
        </Button>
      </div>
      {isEditing && <SkillForm skill={skill} onClose={() => setIsEditing(false)} />}
    </div>
  );
}
