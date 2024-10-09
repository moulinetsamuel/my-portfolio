import { useState } from 'react';
import type { ProjectCardProps } from '@/types/portfolio';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import ProjectForm from '@/components/dashboard/projects/ProjectForm';

export default function ProjectCard({
  project,
  skills,
  onUpdate,
  onDelete,
  onAddNewSkill,
}: ProjectCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div>
          <p>{project.description}</p>
          <p>
            Technologies :{' '}
            {project.stack.map((id) => skills.find((s) => s.id === id)?.name).join(', ')}
          </p>
          {/* TODO: Ajouter l'affichage de l'image du projet */}
        </div>
        <div>
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <Button variant="outline" className="mr-2">
                Modifier
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Modifier le projet</DialogTitle>
              </DialogHeader>
              <ProjectForm
                project={project}
                onSave={(updatedProject) => {
                  onUpdate({ ...updatedProject, id: project.id });
                  setIsEditing(false);
                }}
                skills={skills}
                onAddNewSkill={onAddNewSkill}
              />
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Supprimer</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Êtes-vous sûr de vouloir supprimer ce projet ?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action ne peut pas être annulée.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(project.id)}>
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
