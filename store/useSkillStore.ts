import { create } from 'zustand';
import { Skill } from '@/lib/schemas/skill/skillSchema';
import { fetchSkills, createSkill, updateSkill, deleteSkill } from '@/lib/api/skillsApi';
import { ApiError } from '@/lib/errors/apiError';

interface SkillStore {
  skills: Skill[];
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  fetchSkills: () => Promise<void>;
  addSkill: (formData: FormData) => Promise<void>;
  updateSkill: (id: number, formData: FormData) => Promise<void>;
  deleteSkill: (id: number) => Promise<void>;
}

const useSkillStore = create<SkillStore>((set) => ({
  skills: [],
  isLoading: false,
  error: null,
  successMessage: null,

  fetchSkills: async () => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      const skills = await fetchSkills();
      set({ skills, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  addSkill: async (formData: FormData) => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      const response = await createSkill(formData);
      set((state) => ({
        skills: [...state.skills, response.data],
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

  updateSkill: async (id: number, formData: FormData) => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      const response = await updateSkill(id, formData);
      set((state) => ({
        skills: state.skills.map((skill) => (skill.id === id ? response.data : skill)),
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

  deleteSkill: async (id: number) => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      await deleteSkill(id);
      set((state) => ({
        skills: state.skills.filter((skill) => skill.id !== id),
        isLoading: false,
        successMessage: 'La compétence a été supprimée avec succès',
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

export default useSkillStore;
