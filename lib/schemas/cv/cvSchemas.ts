import { z } from 'zod';

// Schéma pour le CV stocké en base de données
export const cvSchema = z.object({
  id: z.number().positive({
    message: "L'identifiant du CV doit être un nombre positif",
  }),
  filePath: z.string().min(1, {
    message: 'Le chemin du fichier ne peut pas être vide',
  }),
  uploadedAt: z.date({
    required_error: "La date d'upload est requise",
    invalid_type_error: "La date d'upload doit être une date valide",
  }),
});

// Type inféré pour le CV
export type CV = z.infer<typeof cvSchema>;
