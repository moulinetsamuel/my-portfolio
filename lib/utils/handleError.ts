import { ApiError } from '@/lib/errors/apiError';

export const handleError = (error: unknown) => {
  if (error instanceof ApiError) {
    return {
      title: 'Erreur',
      description: error.message,
    };
  }
  return {
    title: 'Erreur inconnue',
    description: 'Une erreur inattendue est survenue',
  };
};
