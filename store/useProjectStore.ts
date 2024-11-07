import { create } from 'zustand';
import { Project } from '@/lib/schemas/project/projectSchema';
import {
  fetchProjects,
  createProject,
  deleteProject,
  updateProject,
} from '@/lib/api/projectsApi';
import { ApiError } from '@/lib/errors/apiError';

interface ApiErrorShape {
  message: string;
  fetch?: boolean;
}

interface ProjectStore {
  projects: Project[];
  isLoading: boolean;
  error: ApiErrorShape | null;
  fetchProjects: () => Promise<void>;
  addProject: (formData: FormData) => Promise<string | undefined>;
  deleteProject: (id: number) => Promise<string | undefined>;
  updateProject: (id: number, formData: FormData) => Promise<string | undefined>;
}

const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  isLoading: false,
  error: null,

  fetchProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const projects = await fetchProjects();
      set({ projects, isLoading: false });
    } catch (error) {
      if (error instanceof ApiError) {
        set({
          isLoading: false,
          error: { message: error.message, fetch: true },
        });
      } else {
        set({
          isLoading: false,
          error: { message: 'Une erreur inattendue est survenue', fetch: true },
        });
      }
    }
  },

  addProject: async (formData: FormData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await createProject(formData);
      set((state) => ({
        projects: [...state.projects, response.data],
        isLoading: false,
      }));
      return response.message;
    } catch (error) {
      if (error instanceof ApiError) {
        set({
          isLoading: false,
          error: { message: error.message },
        });
      } else {
        set({
          isLoading: false,
          error: { message: 'Une erreur inattendue est survenue' },
        });
      }
    }
  },

  updateProject: async (id: number, formData: FormData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await updateProject(id, formData);
      set((state) => ({
        projects: state.projects.map((project) =>
          project.id === id ? response.data : project,
        ),
        isLoading: false,
      }));
      return response.message;
    } catch (error) {
      if (error instanceof ApiError) {
        set({
          isLoading: false,
          error: { message: error.message },
        });
      } else {
        set({
          isLoading: false,
          error: { message: 'Une erreur inattendue est survenue' },
        });
      }
    }
  },

  deleteProject: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await deleteProject(id);
      set((state) => ({
        projects: state.projects.filter((project) => project.id !== id),
        isLoading: false,
      }));
      return response.message;
    } catch (error) {
      if (error instanceof ApiError) {
        set({
          isLoading: false,
          error: { message: error.message },
        });
      } else {
        set({
          isLoading: false,
          error: { message: 'Une erreur inattendue est survenue' },
        });
      }
    }
  },
}));

export default useProjectStore;
