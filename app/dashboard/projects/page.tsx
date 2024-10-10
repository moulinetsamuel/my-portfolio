// ok pour cv tous est top passon a projet voici mes composent :
// /dashboard/page :
// 'use client';

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import ProjectList from '@/components/dashboard/projects/ProjectList';
// import ProjectForm from '@/components/dashboard/projects/ProjectForm';
// import { SkillsData, ProjectsData } from '@/constants';
// import type { Project, Skill } from '@/types/portfolio';

// export default function ProjectsPage() {
//   // TODO: Remplacer ces états locaux par des appels à l'API et des mises à jour de la base de données
//   const [projects, setProjects] = useState<Project[]>(ProjectsData);
//   const [skills, setSkills] = useState<Skill[]>(SkillsData);

//   // TODO: Implémenter l'ajout de projet via l'API
//   const handleAddProject = (newProject: Omit<Project, 'id'>) => {
//     setProjects([
//       ...projects,
//       { ...newProject, id: Math.max(...projects.map((p) => p.id)) + 1 },
//     ]);
//   };

//   // TODO: Implémenter la mise à jour de projet via l'API
//   const handleUpdateProject = (updatedProject: Project) => {
//     setProjects(projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)));
//   };

//   // TODO: Implémenter la suppression de projet via l'API
//   const handleDeleteProject = (id: number) => {
//     setProjects(projects.filter((project) => project.id !== id));
//   };

//   const handleAddNewSkill = (newSkill: Omit<Skill, 'id'>) => {
//     // TODO: Implémenter l'ajout via l'API
//     setSkills((prev) => [...prev, { ...newSkill, id: Date.now() }]);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="mb-6 text-3xl font-bold">Gestion des projets</h1>

//       <Dialog>
//         <DialogTrigger asChild>
//           <Button className="mb-4">Nouveau Projet</Button>
//         </DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Ajouter un nouveau projet</DialogTitle>
//           </DialogHeader>
//           <ProjectForm
//             onSave={handleAddProject}
//             skills={skills}
//             onAddNewSkill={handleAddNewSkill}
//           />
//         </DialogContent>
//       </Dialog>

//       <ProjectList
//         projects={projects}
//         skills={skills}
//         onUpdateProject={handleUpdateProject}
//         onDeleteProject={handleDeleteProject}
//         onAddNewSkill={handleAddNewSkill}
//       />
//     </div>
//   );
// }

// ProjectCard :
// import { useState } from 'react';
// import type { ProjectCardProps } from '@/types/portfolio';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from '@/components/ui/alert-dialog';
// import ProjectForm from '@/components/dashboard/projects/ProjectForm';

// export default function ProjectCard({
//   project,
//   skills,
//   onUpdate,
//   onDelete,
//   onAddNewSkill,
// }: ProjectCardProps) {
//   const [isEditing, setIsEditing] = useState(false);

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>{project.title}</CardTitle>
//       </CardHeader>
//       <CardContent className="flex items-center justify-between">
//         <div>
//           <p>{project.description}</p>
//           <p>
//             Technologies :{' '}
//             {project.stack.map((id) => skills.find((s) => s.id === id)?.name).join(', ')}
//           </p>
//           {/* TODO: Ajouter l'affichage de l'image du projet */}
//         </div>
//         <div>
//           <Dialog open={isEditing} onOpenChange={setIsEditing}>
//             <DialogTrigger asChild>
//               <Button variant="outline" className="mr-2">
//                 Modifier
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Modifier le projet</DialogTitle>
//               </DialogHeader>
//               <ProjectForm
//                 project={project}
//                 onSave={(updatedProject) => {
//                   onUpdate({ ...updatedProject, id: project.id });
//                   setIsEditing(false);
//                 }}
//                 skills={skills}
//                 onAddNewSkill={onAddNewSkill}
//               />
//             </DialogContent>
//           </Dialog>

//           <AlertDialog>
//             <AlertDialogTrigger asChild>
//               <Button variant="destructive">Supprimer</Button>
//             </AlertDialogTrigger>
//             <AlertDialogContent>
//               <AlertDialogHeader>
//                 <AlertDialogTitle>
//                   Êtes-vous sûr de vouloir supprimer ce projet ?
//                 </AlertDialogTitle>
//                 <AlertDialogDescription>
//                   Cette action ne peut pas être annulée.
//                 </AlertDialogDescription>
//               </AlertDialogHeader>
//               <AlertDialogFooter>
//                 <AlertDialogCancel>Annuler</AlertDialogCancel>
//                 <AlertDialogAction onClick={() => onDelete(project.id)}>
//                   Supprimer
//                 </AlertDialogAction>
//               </AlertDialogFooter>
//             </AlertDialogContent>
//           </AlertDialog>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// ProjectForm:
// import { useState } from 'react';
// import type { Project, ProjectFormProps } from '@/types/portfolio';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import SkillSelector from '@/components/dashboard/SkillSelector';

// export default function ProjectForm({
//   project,
//   onSave,
//   skills,
//   onAddNewSkill,
// }: ProjectFormProps) {
//   const [formData, setFormData] = useState<Omit<Project, 'id'>>(
//     project || {
//       title: '',
//       description: '',
//       imagePath: '',
//       stack: [],
//       siteUrl: '',
//       repoUrl: '',
//     },
//   );

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <Label htmlFor="title">Titre du projet</Label>
//         <Input
//           id="title"
//           name="title"
//           value={formData.title}
//           onChange={handleInputChange}
//           required
//         />
//       </div>
//       <div>
//         <Label htmlFor="description">Description</Label>
//         <Textarea
//           id="description"
//           name="description"
//           value={formData.description}
//           onChange={handleInputChange}
//           required
//         />
//       </div>
//       <div>
//         <Label htmlFor="image">URL de l&apos;image</Label>
//         <Input
//           id="image"
//           name="image"
//           type="url"
//           value={formData.imagePath}
//           onChange={handleInputChange}
//           required
//         />
//         {/* TODO: Implémenter le téléchargement d'image et remplacer ce champ par un composant de téléchargement */}
//       </div>
//       <div>
//         <Label htmlFor="siteUrl">URL du site</Label>
//         <Input
//           id="siteUrl"
//           name="siteUrl"
//           type="url"
//           value={formData.siteUrl}
//           onChange={handleInputChange}
//           required
//         />
//       </div>
//       <div>
//         <Label htmlFor="repoUrl">URL du dépôt</Label>
//         <Input
//           id="repoUrl"
//           name="repoUrl"
//           type="url"
//           value={formData.repoUrl}
//           onChange={handleInputChange}
//           required
//         />
//       </div>
//       <SkillSelector
//         selectedSkills={formData.stack}
//         allSkills={skills}
//         onSkillChange={(updatedStack) =>
//           setFormData({ ...formData, stack: updatedStack })
//         }
//         onAddNewSkill={onAddNewSkill}
//       />
//       <Button type="submit">Enregistrer</Button>
//     </form>
//   );
// }

// ProjectList:
// import type { ProjectListProps } from '@/types/portfolio';
// import ProjectCard from './ProjectCard';

// export default function ProjectList({
//   projects,
//   skills,
//   onUpdateProject,
//   onDeleteProject,
//   onAddNewSkill,
// }: ProjectListProps) {
//   return (
//     <div className="space-y-4">
//       {projects.map((project) => (
//         <ProjectCard
//           key={project.id}
//           project={project}
//           skills={skills}
//           onUpdate={onUpdateProject}
//           onDelete={onDeleteProject}
//           onAddNewSkill={onAddNewSkill}
//         />
//       ))}
//     </div>
//   );
// }

// donc je dois voir les projets actuel, en suprimer ou modifier, et en ajouter.

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ProjectList from '@/components/dashboard/projects/ProjectList';
import ProjectForm from '@/components/dashboard/projects/ProjectForm';
import { SkillsData, ProjectsData } from '@/constants';
import type { Project, Skill } from '@/types/portfolio';

export default function ProjectsPage() {
  // TODO: Remplacer ces états locaux par des appels à l'API et des mises à jour de la base de données
  const [projects, setProjects] = useState<Project[]>(ProjectsData);
  const [skills, setSkills] = useState<Skill[]>(SkillsData);

  // TODO: Implémenter l'ajout de projet via l'API
  const handleAddProject = (newProject: Omit<Project, 'id'>) => {
    setProjects([
      ...projects,
      { ...newProject, id: Math.max(...projects.map((p) => p.id)) + 1 },
    ]);
  };

  // TODO: Implémenter la mise à jour de projet via l'API
  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)));
  };

  // TODO: Implémenter la suppression de projet via l'API
  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const handleAddNewSkill = (newSkill: Omit<Skill, 'id'>) => {
    // TODO: Implémenter l'ajout via l'API
    setSkills((prev) => [...prev, { ...newSkill, id: Date.now() }]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Gestion des projets</h1>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Nouveau Projet</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau projet</DialogTitle>
          </DialogHeader>
          <ProjectForm
            onSave={handleAddProject}
            skills={skills}
            onAddNewSkill={handleAddNewSkill}
          />
        </DialogContent>
      </Dialog>

      <ProjectList
        projects={projects}
        skills={skills}
        onUpdateProject={handleUpdateProject}
        onDeleteProject={handleDeleteProject}
        onAddNewSkill={handleAddNewSkill}
      />
    </div>
  );
}
