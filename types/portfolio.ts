export type Skill = {
  id: number;
  name: string;
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
