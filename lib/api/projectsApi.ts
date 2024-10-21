import { API_URLS } from '@/lib/api/URLs';
import { ApiError } from '../errors/apiError';
import { Project } from '@/lib/schemas/project/projectSchema';
import {
  ProjectApiError,
  ProjectApiResponse,
} from '@/lib/schemas/project/projectApiResponseSchema';

export const fetchProjects = async (): Promise<Project[]> => {
  const response = await fetch(API_URLS.PROJECTS.GET);
  if (!response.ok) {
    const errorData = (await response.json()) as ProjectApiError;
    throw new ApiError(
      errorData.message || 'Erreur lors de la récupération des projets',
      response.status,
    );
  }
  return response.json();
};

export const createProject = async (formData: FormData): Promise<ProjectApiResponse> => {
  const response = await fetch(API_URLS.PROJECTS.CREATE, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = (await response.json()) as ProjectApiError;
    throw new ApiError(
      errorData.message || 'Erreur lors de la création du projet',
      response.status,
    );
  }
  return response.json();
};

export const updateProject = async (
  id: number,
  formData: FormData,
): Promise<ProjectApiResponse> => {
  const response = await fetch(API_URLS.PROJECTS.UPDATE(id), {
    method: 'PUT',
    body: formData,
  });

  if (!response.ok) {
    const errorData = (await response.json()) as ProjectApiError;
    throw new ApiError(
      errorData.message || 'Erreur lors de la mise à jour du projet',
      response.status,
    );
  }
  return response.json();
};

export const deleteProject = async (id: number): Promise<ProjectApiResponse> => {
  const response = await fetch(API_URLS.PROJECTS.DELETE(id), {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = (await response.json()) as ProjectApiError;
    throw new ApiError(
      errorData.message || 'Erreur lors de la suppression du projet',
      response.status,
    );
  }
  return response.json();
};
