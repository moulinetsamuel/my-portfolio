import { z } from 'zod';
import { skillSchema } from './skillSchema';

// Schéma pour un projet individuel
export const projectSchema = z.object({
  id: z.number().positive({
    message: "L'identifiant du projet doit être un nombre positif",
  }),
  title: z
    .string()
    .min(1, {
      message: 'Le nom du projet ne peut pas être vide',
    })
    .max(50, {
      message: 'Le nom du projet ne peut pas dépasser 50 caractères',
    }),
  description: z
    .string()
    .min(1, {
      message: 'La description du projet ne peut pas être vide',
    })
    .max(500, {
      message: 'La description du projet ne peut pas dépasser 500 caractères',
    }),
  imagePath: z.string().min(1, {
    message: "Le chemin de l'image ne peut pas être vide",
  }),
  siteUrl: z
    .string()
    .url({
      message: "L'URL du site doit être une URL valide",
    })
    .min(1, {
      message: "L'URL du site ne peut pas être vide",
    }),
  repoUrl: z
    .string()
    .url({
      message: "L'URL du dépôt doit être une URL valide",
    })
    .min(1, {
      message: "L'URL du dépôt ne peut pas être vide",
    }),
  createdAt: z.date({
    required_error: 'La date de création est requise',
    invalid_type_error: 'La date de création doit être une date valide',
  }),
  updatedAt: z.date({
    required_error: 'La date de mise à jour est requise',
    invalid_type_error: 'La date de mise à jour doit être une date valide',
  }),
  skills: z.array(skillSchema),
});

// Type inféré pour un projet
export type Project = z.infer<typeof projectSchema>;

// Schéma pour la création d'un nouveau projet
export const createProjectSchema = projectSchema
  .omit({
    id: true,
    imagePath: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    skills: z.array(z.number()).min(1, {
      message: 'Le projet doit avoir au moins une compétence',
    }),
  });

// Type inféré pour la création d'un projet
export type CreateProject = z.infer<typeof createProjectSchema>;

// Schéma pour la mise à jour d'un projet existant
export const updateProjectSchema = projectSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    skills: z.array(z.number()).min(1, {
      message: 'Le projet doit avoir au moins une compétence',
    }),
  })
  .partial();

// Type inféré pour la mise à jour d'un projet
export type UpdateProject = z.infer<typeof updateProjectSchema>;

// Schéma pour la réponse de l'API après la création ou la mise à jour d'un projet
export const projectApiResponseSchema = projectSchema.extend({
  message: z.string({
    required_error: 'Un message de confirmation est requis',
    invalid_type_error: 'Le message doit être une chaîne de caractères',
  }),
});

// Type inféré pour la réponse de l'API après la création ou la mise à jour d'un projet
export type ProjectApiResponse = z.infer<typeof projectApiResponseSchema>;
