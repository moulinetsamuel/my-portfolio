import { z } from 'zod';

// Schéma pour le formulaire de projet
export const projectFormSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: 'Le titre du projet ne peut pas être vide',
    })
    .max(50, {
      message: 'Le titre du projet ne peut pas dépasser 50 caractères',
    }),
  description: z
    .string()
    .min(1, {
      message: 'La description du projet ne peut pas être vide',
    })
    .max(500, {
      message: 'La description du projet ne peut pas dépasser 500 caractères',
    }),
  image: z
    .instanceof(File, { message: "L'image doit être un fichier" })
    .refine((file) => file.type === 'image/jpeg' || file.type === 'image/png', {
      message: "L'image doit être au format JPEG ou PNG",
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
  skillIds: z
    .array(z.number().positive())
    .min(1, { message: 'Au moins une compétence est requise' })
    .max(5, { message: 'Au maximum 5 compétences sont autorisées' }),
});

// Type inféré pour le formulaire de projet
export type ProjectFormData = z.infer<typeof projectFormSchema>;

// Schéma pour le formulaire de mise à jour de projet
export const updateProjectFormSchema = z.object({
  title: projectFormSchema.shape.title,
  description: projectFormSchema.shape.description,
  image: projectFormSchema.shape.image.optional(),
  siteUrl: projectFormSchema.shape.siteUrl,
  repoUrl: projectFormSchema.shape.repoUrl,
  skillIds: projectFormSchema.shape.skillIds,
});

// Type inféré pour le formulaire de mise à jour de projet
export type UpdateProjectFormData = z.infer<typeof updateProjectFormSchema>;
