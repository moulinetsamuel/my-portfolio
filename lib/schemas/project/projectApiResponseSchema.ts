import { z } from 'zod';
import { projectSchema } from '@/lib/schemas/project/projectSchema';

// Schéma pour la réponse de l'API
export const projectApiResponseSchema = z.object({
  data: projectSchema,
  message: z.string({
    required_error: 'Un message de confirmation est requis',
    invalid_type_error: 'Le message doit être une chaîne de caractères',
  }),
});

// Type inféré pour la réponse de l'API après la création ou la mise à jour d'un projet
export type ProjectApiResponse = z.infer<typeof projectApiResponseSchema>;

// Schéma pour la réponse de l'API en cas d'erreur
export const projectApiErrorSchema = z.object({
  message: z.string({
    required_error: "Un message d'erreur est requis",
    invalid_type_error: 'Le message doit être une chaîne de caractères',
  }),
});

// Type inféré pour la réponse de l'API en cas d'erreur
export type ProjectApiError = z.infer<typeof projectApiErrorSchema>;
