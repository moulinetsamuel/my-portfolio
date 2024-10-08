export type Skill = {
  id: number;
  name: string;
};

export type SkillSelectorProps = {
  selectedSkills: number[];
  allSkills: Skill[];
  onSkillChange: (updatedSkills: number[]) => void;
  onAddNewSkill: (skillName: string) => Skill;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  stack: number[];
  siteUrl: string;
  repoUrl: string;
};

export type ProjectsProps = {
  projects: Project[];
};

export type ProjectCardProps = {
  project: Project;
  skills: Skill[];
  onUpdate: (project: Project) => void;
  onDelete: (id: number) => void;
  onAddNewSkill: (skillName: string) => Skill;
};

export type ProjectFormProps = {
  project?: Project;
  onSave: (project: Omit<Project, "id">) => void;
  skills: Skill[];
  onAddNewSkill: (skillName: string) => Skill;
};

export type ProjectListProps = {
  projects: Project[];
  skills: Skill[];
  onUpdateProject: (project: Project) => void;
  onDeleteProject: (id: number) => void;
  onAddNewSkill: (skillName: string) => Skill;
};

export type CV = {
  id: number;
  filePath: string;
  uploadDate: string;
};

export type CurrentCVProps = {
  cv: CV;
  onDelete: () => Promise<void>;
};

export type DeleteCVDialogProps = {
  onDelete: () => Promise<void>;
};

export type CVUploaderProps = {
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  hasExistingCV: boolean;
};

export type CVManagerProps = {
  cv: CV | null;
  onDelete: () => Promise<void>;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
};
