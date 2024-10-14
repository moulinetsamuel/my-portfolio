import type { CV, CVApiResponse } from '@/lib/schemas/cvSchemas';
import { fetchWithErrorHandling } from '@/lib/api/fetchWithErrorHandling';
import { API_URLS } from '@/lib/api/URLs';

/**
 * Récupère le CV actuel depuis l'API.
 * @returns Une promesse qui résout vers le CV ou null si aucun CV n'est trouvé.
 */
export const getCV = (): Promise<CV | null> =>
  fetchWithErrorHandling<CV | null>(API_URLS.CV.GET);

/**
 * Télécharge un nouveau CV vers l'API.
 * @param formData - Les données du formulaire contenant le fichier CV à télécharger.
 * @returns Une promesse qui résout vers les données du CV mis à jour.
 */
export const uploadCV = (formData: FormData): Promise<CVApiResponse> => {
  return fetchWithErrorHandling<CVApiResponse>(API_URLS.CV.UPLOAD, {
    method: 'POST',
    body: formData,
  });
};

/**
 * Vérifie si un fichier est un PDF valide.
 * @param file - Le fichier à vérifier.
 * @returns true si le fichier est un PDF valide, false sinon.
 */
export const isValidPDF = (file: File): boolean => {
  return file.type === 'application/pdf' && file.size <= 5 * 1024 * 1024; // 5 MB max
};
