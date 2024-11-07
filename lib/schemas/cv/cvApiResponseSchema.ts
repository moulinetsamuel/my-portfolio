import { z } from 'zod';
import { cvSchema } from '@/lib/schemas/cv/cvSchemas';

// Schéma pour la réponse de l'API après l'upload
export const cvApiResponseSchema = z.object({
  data: cvSchema,
  message: z.string({
    required_error: 'Un message de confirmation est requis',
    invalid_type_error: 'Le message doit être une chaîne de caractères',
  }),
});

// Type inféré pour la réponse de l'API
export type CVApiResponse = z.infer<typeof cvApiResponseSchema>;

// Schéma pour la réponse de l'API en cas d'erreur
export const cvApiErrorSchema = z.object({
  message: z.string({
    required_error: "Un message d'erreur est requis",
    invalid_type_error: 'Le message doit être une chaîne de caractères',
  }),
});

// Type inféré pour la réponse de l'API en cas d'erreur
export type CVApiError = z.infer<typeof cvApiErrorSchema>;
