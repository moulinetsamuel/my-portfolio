import { z } from 'zod';
import { skillSchema } from '@/lib/schemas/skill/skillSchema';

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
