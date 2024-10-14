import { fetchWithErrorHandling } from '@/lib/api/fetchWithErrorHandling';
import { API_URLS } from '@/lib/api/URLs';
import type { Project, ProjectApiResponse } from '@/lib/schemas/projectSchema';

// Fonction pour récupérer tous les projets
export const getProjects = (): Promise<Project[]> => {
  return fetchWithErrorHandling(API_URLS.PROJECTS.GET);
};

// Fonction pour récupérer un projet par son ID
export const getProjectById = (id: number): Promise<Project> => {
  return fetchWithErrorHandling(API_URLS.PROJECTS.GET_ONE(id));
};

// Fonction pour créer un nouveau projet
export const createProject = (formData: FormData): Promise<ProjectApiResponse> => {
  return fetchWithErrorHandling(API_URLS.PROJECTS.CREATE, {
    method: 'POST',
    body: formData,
  });
};

// Fonction pour mettre à jour un projet existant
export const updateProject = (
  id: number,
  formData: FormData,
): Promise<ProjectApiResponse> => {
  return fetchWithErrorHandling(API_URLS.PROJECTS.UPDATE(id), {
    method: 'PUT',
    body: formData,
  });
};

// Fonction pour supprimer un projet existant
export const deleteProject = (id: number): Promise<void> => {
  return fetchWithErrorHandling(API_URLS.PROJECTS.DELETE(id), {
    method: 'DELETE',
  });
};
