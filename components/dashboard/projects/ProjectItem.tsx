'use client';

import { useState } from 'react';
import { Project } from '@/lib/schemas/project/projectSchema';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ProjectForm from '@/components/dashboard/projects/ProjectForm';
import useProjectStore from '@/store/useProjectStore';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
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
import { ExternalLink, Github, Trash2 } from 'lucide-react';

interface ProjectItemProps {
  project: Project;
}

export default function ProjectItem({ project }: ProjectItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteProject = useProjectStore((state) => state.deleteProject);
  const error = useProjectStore((state) => state.error);
  const { toast } = useToast();

  const handleDelete = async () => {
    setIsDeleting(true);
    const response = await deleteProject(project.id);

    if (response) {
      toast({ title: response });
    } else if (error) {
      toast({ title: error.message, variant: 'destructive' });
    }
    setIsDeleting(false);
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="truncate">{project.title}</span>
          <div className="flex space-x-2">
            <a href={project.siteUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Github className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        {project.imagePath && (
          <div className="mb-4 relative aspect-video">
            <Image
              src={project.imagePath}
              alt={`Image de ${project.title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-md object-cover"
              priority
            />
          </div>
        )}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {project.description}
        </p>
        <div>
          <h4 className="text-sm font-semibold mb-2">Compétences :</h4>
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <div key={skill.id} title={skill.name}>
                <Image
                  src={skill.iconPath}
                  alt={skill.name}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <ProjectForm project={project} />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2 className="w-4 h-4 mr-2" />
              Supprimer
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Êtes-vous sûr de vouloir supprimer ce projet ?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Cette action ne peut pas être annulée. Cela supprimera définitivement le
                projet &quot;{project.title}&quot; et toutes les données associées.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? 'Suppression...' : 'Supprimer'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
