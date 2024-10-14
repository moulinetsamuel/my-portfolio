import { create } from 'zustand';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from '@/lib/api/projects';
import type { Project } from '@/lib/schemas/projectSchema';

interface ProjectStore {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  addProject: (formData: FormData) => Promise<void>;
  updateProject: (id: number, formData: FormData) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
}

const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  isLoading: false,
  error: null,
  fetchProjects: async () => {
    set({ isLoading: true });
    try {
      const projects = await getProjects();
      set({ projects, isLoading: false, error: null });
    } catch (error) {
      // TODO: Ajouter un logger
      console.error(error);
      set({ error: 'Failed to fetch projects', isLoading: false });
    }
  },
  addProject: async (formData: FormData) => {
    set({ isLoading: true });
    try {
      await createProject(formData);
      get().fetchProjects();
    } catch (error) {
      console.error(error);
      set({ error: 'Failed to add project', isLoading: false });
    }
  },
  updateProject: async (id: number, formData: FormData) => {
    set({ isLoading: true });
    try {
      await updateProject(id, formData);
      get().fetchProjects();
    } catch (error) {
      console.error(error);
      set({ error: 'Failed to update project', isLoading: false });
    }
  },
  deleteProject: async (id: number) => {
    set({ isLoading: true });
    try {
      await deleteProject(id);
      get().fetchProjects();
    } catch (error) {
      console.error(error);
      set({ error: 'Failed to delete project', isLoading: false });
    }
  },
}));

export default useProjectStore;
