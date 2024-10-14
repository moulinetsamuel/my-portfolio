import { ContactFormData } from '@/lib/schemas/contactSchema';
import type { Project, Skill } from '@/types/portfolio';



// Projects
export const getProjects = (): Promise<Project[]> =>
  fetchWithErrorHandling(`${API_BASE_URL}/projects`);

export const getProject = (id: number): Promise<Project> =>
  fetchWithErrorHandling(`${API_BASE_URL}/projects/${id}`);

export const createProject = (projectData: FormData): Promise<Project> =>
  fetchWithErrorHandling(`${API_BASE_URL}/projects`, {
    method: 'POST',
    body: projectData,
  });

export const updateProject = (id: number, projectData: FormData): Promise<Project> =>
  fetchWithErrorHandling(`${API_BASE_URL}/projects/${id}`, {
    method: 'PUT',
    body: projectData,
  });

export const deleteProject = (id: number): Promise<void> =>
  fetchWithErrorHandling(`${API_BASE_URL}/projects/${id}`, { method: 'DELETE' });

// Skills
export const getSkills = (): Promise<Skill[]> =>
  fetchWithErrorHandling(`${API_BASE_URL}/skills`);

export const createSkill = (formData: FormData): Promise<Skill> =>
  fetchWithErrorHandling(`${API_BASE_URL}/skills`, {
    method: 'POST',
    body: formData,
  });

export const updateSkill = (id: number, formData: FormData): Promise<Skill> =>
  fetchWithErrorHandling(`${API_BASE_URL}/skills/${id}`, {
    method: 'PUT',
    body: formData,
  });

export const deleteSkill = (id: number): Promise<void> =>
  fetchWithErrorHandling(`${API_BASE_URL}/skills/${id}`, { method: 'DELETE' });
