import { API_URLS } from '@/lib/api/URLs';
import { Skill } from '@/lib/schemas/skill/skillSchema';
import {
  SkillApiError,
  SkillApiResponse,
} from '@/lib/schemas/skill/skillApiResponseSchema';
import { ApiError } from '@/lib/errors/apiError';

export const fetchSkills = async (): Promise<Skill[]> => {
  const response = await fetch(API_URLS.SKILLS.GET);
  if (!response.ok) {
    const errorData = (await response.json()) as SkillApiError;
    throw new ApiError(
      errorData.message || 'Erreur lors de la récupération des compétences',
      response.status,
    );
  }
  return response.json();
};

export const createSkill = async (formData: FormData): Promise<SkillApiResponse> => {
  const response = await fetch(API_URLS.SKILLS.CREATE, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = (await response.json()) as SkillApiError;
    throw new ApiError(
      errorData.message || 'Erreur lors de la création de la compétence',
      response.status,
    );
  }
  return response.json();
};

export const updateSkill = async (
  id: number,
  formData: FormData,
): Promise<SkillApiResponse> => {
  const response = await fetch(API_URLS.SKILLS.UPDATE(id), {
    method: 'PUT',
    body: formData,
  });

  if (!response.ok) {
    const errorData = (await response.json()) as SkillApiError;
    throw new ApiError(
      errorData.message || 'Erreur lors de la mise à jour de la compétence',
      response.status,
    );
  }
  return response.json();
};

export const deleteSkill = async (id: number): Promise<SkillApiResponse> => {
  const response = await fetch(API_URLS.SKILLS.DELETE(id), {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = (await response.json()) as SkillApiError;
    throw new ApiError(
      errorData.message || 'Erreur lors de la suppression de la compétence',
      response.status,
    );
  }
  return response.json();
};
