import { fetchWithErrorHandling } from '@/lib/api/fetchWithErrorHandling';
import { API_URLS } from '@/lib/api/URLs';
import type { Skill, SkillApiResponse } from '@/lib/schemas/skillSchema';

// Fonction pour récupérer toutes les compétences
export const getSkills = (): Promise<Skill[]> => {
  return fetchWithErrorHandling(API_URLS.SKILLS.GET);
};

// Fonction pour créer une nouvelle compétence
export const createSkill = (formData: FormData): Promise<SkillApiResponse> =>
  fetchWithErrorHandling(API_URLS.SKILLS.CREATE, {
    method: 'POST',
    body: formData,
  });

// Fonction pour mettre à jour une compétence existante
export const updateSkill = (id: number, formData: FormData): Promise<SkillApiResponse> =>
  fetchWithErrorHandling(API_URLS.SKILLS.UPDATE(id), {
    method: 'PUT',
    body: formData,
  });

// Fonction pour supprimer une compétence existante
export const deleteSkill = (id: number): Promise<void> =>
  fetchWithErrorHandling(API_URLS.SKILLS.DELETE(id), {
    method: 'DELETE',
  });
