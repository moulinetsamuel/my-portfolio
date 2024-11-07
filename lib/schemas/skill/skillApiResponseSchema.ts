import { z } from 'zod';
import { skillSchema } from '@/lib/schemas/skill/skillSchema';

// Schéma pour la réponse de l'API
export const skillApiResponseSchema = z.object({
  data: skillSchema,
  message: z.string({
    required_error: 'Un message de confirmation est requis',
    invalid_type_error: 'Le message doit être une chaîne de caractères',
  }),
});

// Type inféré pour la réponse de l'API
export type SkillApiResponse = z.infer<typeof skillApiResponseSchema>;

// Schéma pour la réponse de l'API en cas d'erreur
export const skillApiErrorSchema = z.object({
  message: z.string({
    required_error: "Un message d'erreur est requis",
    invalid_type_error: 'Le message doit être une chaîne de caractères',
  }),
});

// Type inféré pour la réponse de l'API en cas d'erreur
export type SkillApiError = z.infer<typeof skillApiErrorSchema>;
