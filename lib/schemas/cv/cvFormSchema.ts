import { z } from 'zod';

// Schéma pour le formulaire de CV
export const cvFormSchema = z.object({
  cv: z
    .instanceof(File, { message: 'Le CV doit être un fichier PDF' })
    .refine((file) => file.type === 'application/pdf', {
      message: 'Le CV doit être au format PDF',
    }),
});

// Type inféré pour le formulaire de CV
export type CVFormData = z.infer<typeof cvFormSchema>;
