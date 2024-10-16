import { z } from 'zod';

// Schéma pour le formulaire de compétence
export const skillFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Le nom de la compétence ne peut pas être vide',
    })
    .max(50, {
      message: 'Le nom de la compétence ne peut pas dépasser 50 caractères',
    }),
  icon: z
    .instanceof(File, { message: "L'icône doit être un fichier" })
    .refine((file) => file.type === 'image/svg+xml', {
      message: "L'icône doit être au format SVG",
    }),
});

// Type inféré pour le formulaire de compétence
export type SkillFormData = z.infer<typeof skillFormSchema>;

// Schéma pour le formulaire de mise à jour de compétence
export const updateSkillFormSchema = skillFormSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Au moins un champ doit être fourni pour la mise à jour',
  });

// Type inféré pour le formulaire de mise à jour de compétence
export type UpdateSkillFormData = z.infer<typeof updateSkillFormSchema>;
