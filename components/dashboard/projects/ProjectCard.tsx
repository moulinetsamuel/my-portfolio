import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import Image from 'next/image';
import ProjectForm from '@/components/dashboard/projects/ProjectForm';
import type { ProjectCardProps } from '@/types/portfolio';

export default function ProjectCard({
  project,
  skills,
  onUpdate,
  onDelete,
  onAddSkill,
}: ProjectCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="aspect-video relative mb-4">
          <Image
            src={project.imagePath}
            alt={project.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-sm mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.skills.map((skill) => (
            <span
              key={skill.id}
              className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded"
            >
              {skill.name}
            </span>
          ))}
        </div>
        <div className="flex justify-between">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Modifier</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Modifier le projet</DialogTitle>
              </DialogHeader>
              <ProjectForm
                project={project}
                skills={skills}
                onSave={onUpdate}
                onAddSkill={onAddSkill}
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
                  Cette action ne peut pas être annulée. Cela supprimera définitivement le
                  projet et toutes les données associées.
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
