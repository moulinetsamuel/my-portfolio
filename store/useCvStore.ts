import { create } from 'zustand';
import { CV } from '@/lib/schemas/cv/cvSchemas';
import { fetchCV, uploadCV } from '@/lib/api/cvApi';
import { ApiError } from '@/lib/errors/apiError';

interface CvStore {
  cv: CV | null;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  fetchCV: () => Promise<void>;
  uploadCV: (formData: FormData) => Promise<void>;
  clearMessages: () => void;
}

const useCvStore = create<CvStore>((set) => ({
  cv: null,
  isLoading: false,
  error: null,
  successMessage: null,

  fetchCV: async () => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      const cv = await fetchCV();
      set({ cv, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  uploadCV: async (formData: FormData) => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      const response = await uploadCV(formData);
      set({
        cv: response.data,
        isLoading: false,
        successMessage: response.message,
      });
    } catch (error) {
      if (error instanceof ApiError) {
        set({ error: error.message, isLoading: false });
      } else {
        set({ error: 'Une erreur inattendue est survenue', isLoading: false });
      }
    }
  },

  clearMessages: () => {
    set({ error: null, successMessage: null });
  },
}));

export default useCvStore;
