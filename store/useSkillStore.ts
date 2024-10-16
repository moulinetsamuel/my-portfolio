import { create } from 'zustand';
import { getSkills, createSkill, updateSkill, deleteSkill } from '@/lib/api/skills';
import type { Skill } from '@/lib/schemas/skill/skillSchema';

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
      set({ error: 'Failed to fetch skills', isLoading: false });
      throw error;
    }
  },
  addSkill: async (formData: FormData) => {
    set({ isLoading: true });
    try {
      const newSkill = await createSkill(formData);
      set((state) => ({
        skills: [...state.skills, newSkill],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to add skill', isLoading: false });
      throw error;
    }
  },
  updateSkill: async (id: number, formData: FormData) => {
    set({ isLoading: true });
    try {
      const updatedSkill = await updateSkill(id, formData);
      set((state) => ({
        skills: state.skills.map((skill) =>
          skill.id === updatedSkill.id ? updatedSkill : skill,
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update skill', isLoading: false });
      throw error;
    }
  },
  deleteSkill: async (id: number) => {
    set({ isLoading: true });
    try {
      await deleteSkill(id);
      get().fetchSkills();
    } catch (error) {
      console.error(error);
      set({ error: error.error, isLoading: false });
      throw error;
    }
  },
}));

export default useSkillStore;
