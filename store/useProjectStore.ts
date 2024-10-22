import { create } from 'zustand';
import { Project } from '@/lib/schemas/project/projectSchema';
import {
  fetchProjects,
  createProject,
  deleteProject,
  updateProject,
} from '@/lib/api/projectsApi';
import { ApiError } from '@/lib/errors/apiError';

interface ProjectStore {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  fetchProjects: () => Promise<void>;
  addProject: (formData: FormData) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  updateProject: (id: number, formData: FormData) => Promise<void>;
}

const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  isLoading: false,
  error: null,
  successMessage: null,

  fetchProjects: async () => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      const projects = await fetchProjects();
      set({ projects, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  addProject: async (formData: FormData) => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      const response = await createProject(formData);
      set((state) => ({
        projects: [...state.projects, response.data],
        isLoading: false,
        successMessage: response.message,
      }));
    } catch (error) {
      if (error instanceof ApiError) {
        set({ error: error.message, isLoading: false });
      } else {
        set({ error: 'Une erreur inattendue est survenue', isLoading: false });
      }
    }
  },

  updateProject: async (id: number, formData: FormData) => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      const response = await updateProject(id, formData);
      set((state) => ({
        projects: state.projects.map((project) =>
          project.id === id ? response.data : project,
        ),
        isLoading: false,
        successMessage: response.message,
      }));
    } catch (error) {
      if (error instanceof ApiError) {
        set({ error: error.message, isLoading: false });
      } else {
        set({ error: 'Une erreur inattendue est survenue', isLoading: false });
      }
    }
  },

  deleteProject: async (id: number) => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      const response = await deleteProject(id);
      set((state) => ({
        projects: state.projects.filter((project) => project.id !== id),
        isLoading: false,
        successMessage: response.message,
      }));
    } catch (error) {
      if (error instanceof ApiError) {
        set({ error: error.message, isLoading: false });
      } else {
        set({ error: 'Une erreur inattendue est survenue', isLoading: false });
      }
    }
  },
}));

export default useProjectStore;
