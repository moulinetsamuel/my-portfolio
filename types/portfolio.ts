export type NavLinkDashboardProps = {
  href: string;
  current: boolean;
  children: React.ReactNode;
};

export type NavLinkProps = {
  href: string;
  label: string;
  onClick?: () => void;
};

export type Skill = {
  id: number;
  name: string;
  iconPath: string;
};

export type SkillFormProps = {
  skill?: Skill;
  onSave: (name: string, icon: File) => void;
};

export type SkillEditFormProps = {
  skill: Skill;
  onSave: (id: number, name: string, icon?: File) => void;
};

export type SkillCardProps = {
  skill: Skill;
  onUpdate: (id: number, name: string, icon?: File) => void;
  onDelete: (id: number) => void;
};

export type SkillListProps = {
  skills: Skill[];
  onUpdateSkill: (id: number, name: string, icon?: File) => void;
  onDeleteSkill: (id: number) => void;
};

export type SkillSelectorProps = {
  skills: Skill[];
  selectedSkills: number[];
  onSkillsChange: (skills: number[]) => void;
  onAddSkill: (name: string, icon: File) => Promise<void>;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  imagePath: string;
  skills: Skill[];
  siteUrl: string;
  repoUrl: string;
};

export type ProjectFormProps = {
  project?: Project;
  skills: Skill[];
  onSave: (projectData: FormData) => Promise<void>;
  onAddSkill: (name: string, icon: File) => Promise<void>;
};

export type ProjectCardProps = {
  project: Project;
  skills: Skill[];
  onUpdate: (formData: FormData) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onAddSkill: (name: string, icon: File) => Promise<void>;
};

export type ProjectListProps = {
  projects: Project[];
  skills: Skill[];
  onUpdateProject: (formData: FormData) => Promise<void>;
  onDeleteProject: (id: number) => Promise<void>;
  onAddSkill: (name: string, icon: File) => Promise<void>;
};
