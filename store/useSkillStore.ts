import { create } from 'zustand';
import { Skill } from '@/lib/schemas/skill/skillSchema';
import { fetchSkills, createSkill, updateSkill, deleteSkill } from '@/lib/api/skillsApi';

interface SkillStore {
  skills: Skill[];
  isLoading: boolean;
  fetchSkills: () => Promise<void>;
  addSkill: (formData: FormData) => Promise<string>;
  updateSkill: (id: number, formData: FormData) => Promise<string>;
  deleteSkill: (id: number) => Promise<string>;
}

const useSkillStore = create<SkillStore>((set) => ({
  skills: [],
  isLoading: false,
  statusMessage: null,

  fetchSkills: async () => {
    set({ isLoading: true });
    try {
      const skills = await fetchSkills();
      set({ skills, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  addSkill: async (formData: FormData) => {
    set({ isLoading: true });
    try {
      const response = await createSkill(formData);
      set((state) => ({
        skills: [...state.skills, response.data],
        isLoading: false,
      }));
      return response.message;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  updateSkill: async (id: number, formData: FormData) => {
    set({ isLoading: true });
    try {
      const response = await updateSkill(id, formData);
      set((state) => ({
        skills: state.skills.map((skill) => (skill.id === id ? response.data : skill)),
        isLoading: false,
      }));
      return response.message;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  deleteSkill: async (id: number) => {
    set({ isLoading: true });
    try {
      const response = await deleteSkill(id);
      set((state) => ({
        skills: state.skills.filter((skill) => skill.id !== id),
        isLoading: false,
      }));
      return response.message;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));

export default useSkillStore;
