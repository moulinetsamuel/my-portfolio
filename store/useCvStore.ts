import { create } from 'zustand';
import { CV } from '@/lib/schemas/cv/cvSchemas';
import { fetchCV, uploadCV } from '@/lib/api/cvApi';
import { ApiError } from '@/lib/errors/apiError';

interface ApiErrorShape {
  message: string;
  fetch?: boolean;
}

interface CvStore {
  cv: CV | null;
  isLoading: boolean;
  error: ApiErrorShape | null;
  fetchCV: () => Promise<void>;
  uploadCV: (formData: FormData) => Promise<string | undefined>;
}

const useCvStore = create<CvStore>((set) => ({
  cv: null,
  isLoading: false,
  error: null,

  fetchCV: async () => {
    set({ isLoading: true, error: null });
    try {
      const cv = await fetchCV();
      set({ cv, isLoading: false });
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

  uploadCV: async (formData: FormData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await uploadCV(formData);
      set({
        cv: response.data,
        isLoading: false,
      });
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

export default useCvStore;
