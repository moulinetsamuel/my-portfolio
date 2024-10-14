import { z } from 'zod';

// Schéma pour le CV stocké en base de données
export const cvSchema = z.object({
  id: z.number().positive({
    message: "L'identifiant du CV doit être un nombre positif",
  }),
  filePath: z
    .string()
    .startsWith('/cv/', {
      message: "Le chemin du fichier doit commencer par '/cv/'",
    })
    .endsWith('.pdf', {
      message: 'Le fichier doit être au format PDF',
    }),
  uploadedAt: z.date({
    required_error: "La date d'upload est requise",
    invalid_type_error: "La date d'upload doit être une date valide",
  }),
});

// Type inféré pour le CV
export type CV = z.infer<typeof cvSchema>;

// Schéma pour la validation du fichier uploadé
export const cvUploadSchema = z.object({
  file: z
    .instanceof(File, {
      message: 'Veuillez sélectionner un fichier',
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'Le fichier ne doit pas dépasser 5 Mo',
    })
    .refine((file) => ['application/pdf'].includes(file.type), {
      message: 'Le fichier doit être un PDF',
    }),
});

// Type inféré pour l'upload de CV
export type CVUpload = z.infer<typeof cvUploadSchema>;

// Schéma pour la réponse de l'API après l'upload
export const cvApiResponseSchema = cvSchema.extend({
  message: z.string({
    required_error: 'Un message de confirmation est requis',
    invalid_type_error: 'Le message doit être une chaîne de caractères',
  }),
});

// Type inféré pour la réponse de l'API
export type CVApiResponse = z.infer<typeof cvApiResponseSchema>;
