import { create } from 'zustand';
import { Skill } from '@/lib/schemas/skill/skillSchema';
import { fetchSkills, createSkill, updateSkill, deleteSkill } from '@/lib/api/skillsApi';
import { ApiError } from '@/lib/errors/apiError';

interface ApiErrorShape {
  message: string;
  fetch?: boolean;
}
interface SkillStore {
  skills: Skill[];
  isLoading: boolean;
  error: ApiErrorShape | null;
  fetchSkills: () => Promise<void>;
  addSkill: (formData: FormData) => Promise<string | undefined>;
  updateSkill: (id: number, formData: FormData) => Promise<string | undefined>;
  deleteSkill: (id: number) => Promise<string | undefined>;
}

const useSkillStore = create<SkillStore>((set) => ({
  skills: [],
  isLoading: false,
  error: null,

  fetchSkills: async () => {
    set({ isLoading: true, error: null });
    try {
      const skills = await fetchSkills();
      set({ skills, isLoading: false });
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

  addSkill: async (formData: FormData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await createSkill(formData);
      set((state) => ({
        skills: [...state.skills, response.data],
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

  updateSkill: async (id: number, formData: FormData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await updateSkill(id, formData);
      set((state) => ({
        skills: state.skills.map((skill) => (skill.id === id ? response.data : skill)),
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

  deleteSkill: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await deleteSkill(id);
      set((state) => ({
        skills: state.skills.filter((skill) => skill.id !== id),
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

export default useSkillStore;
