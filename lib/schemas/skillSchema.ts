import { z } from 'zod';

// Schéma pour une compétence individuelle
export const skillSchema = z.object({
  id: z.number().positive({
    message: "L'identifiant de la compétence doit être un nombre positif",
  }),
  name: z
    .string()
    .min(1, {
      message: 'Le nom de la compétence ne peut pas être vide',
    })
    .max(50, {
      message: 'Le nom de la compétence ne peut pas dépasser 50 caractères',
    }),
  iconPath: z.string().min(1, {
    message: "Le chemin de l'icône ne peut pas être vide",
  }),
  createdAt: z.date({
    required_error: 'La date de création est requise',
    invalid_type_error: 'La date de création doit être une date valide',
  }),
  updatedAt: z.date({
    required_error: 'La date de mise à jour est requise',
    invalid_type_error: 'La date de mise à jour doit être une date valide',
  }),
});

// Type inféré pour une compétence
export type Skill = z.infer<typeof skillSchema>;

// Schéma pour la création d'une nouvelle compétence
export const createSkillSchema = skillSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Schéma pour la mise à jour d'une compétence existante
export const updateSkillSchema = createSkillSchema.partial();

// Schéma pour la réponse de l'API après la création ou la mise à jour d'une compétence
export const skillApiResponseSchema = skillSchema.extend({
  message: z.string({
    required_error: 'Un message de confirmation est requis',
    invalid_type_error: 'Le message doit être une chaîne de caractères',
  }),
});

// Type inféré pour la réponse de l'API
export type SkillApiResponse = z.infer<typeof skillApiResponseSchema>;
