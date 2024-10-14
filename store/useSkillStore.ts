import { create } from 'zustand';
import { getSkills, createSkill, updateSkill, deleteSkill } from '@/lib/api/skills';
import type { Skill } from '@/lib/schemas/skillSchema';

interface SkillStore {
  skills: Skill[];
  isLoading: boolean;
  error: string | null;
  fetchSkills: () => Promise<void>;
  addSkill: (formData: FormData) => Promise<void>;
  updateSkill: (id: number, formData: FormData) => Promise<void>;
  deleteSkill: (id: number) => Promise<void>;
}

const useSkillStore = create<SkillStore>((set, get) => ({
  skills: [],
  isLoading: false,
  error: null,
  fetchSkills: async () => {
    set({ isLoading: true });
    try {
      const skills = await getSkills();
      set({ skills, isLoading: false, error: null });
    } catch (error) {
      // TODO: Ajouter un logger
      console.error(error);
      set({ error: 'Failed to fetch skills', isLoading: false });
    }
  },
  addSkill: async (formData: FormData) => {
    set({ isLoading: true });
    try {
      await createSkill(formData);
      get().fetchSkills();
    } catch (error) {
      // TODO: Ajouter un logger
      console.error(error);
      set({ error: 'Failed to add skill', isLoading: false });
    }
  },
  updateSkill: async (id: number, formData: FormData) => {
    set({ isLoading: true });
    try {
      await updateSkill(id, formData);
      get().fetchSkills();
    } catch (error) {
      // TODO: Ajouter un logger
      console.error(error);
      set({ error: 'Failed to update skill', isLoading: false });
    }
  },
  deleteSkill: async (id: number) => {
    set({ isLoading: true });
    try {
      await deleteSkill(id);
      get().fetchSkills();
    } catch (error) {
      // TODO: Ajouter un logger
      console.error(error);
      set({ error: 'Failed to delete skill', isLoading: false });
    }
  },
}));

export default useSkillStore;
