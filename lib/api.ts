import { ContactFormData } from '@/lib/schemas/contactSchema';
import type { Project } from '@/types/portfolio';

const GOOGLE_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyyqZM3Mf28262FF9GFsEdp6uutAN50bfspJkPl-DXIOM0K4O-uQY_eaAXXi3gRv53_/exec';

export async function submitContactForm(formData: ContactFormData): Promise<void> {
  try {
    await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
  } catch {
    throw new Error("Erreur lors de l'envoi du message");
  }
}

export const getProjects = () => fetch('/api/projects').then((res) => res.json());

export const createProject = (projectData: Omit<Project, 'id'>) =>
  fetch('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projectData),
  }).then((res) => res.json());

export const updateProject = (projectData: Project) =>
  fetch('/api/projects', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projectData),
  }).then((res) => res.json());

export const deleteProject = (id: number) =>
  fetch(`/api/projects?id=${id}`, { method: 'DELETE' }).then((res) => res.json());

export const getSkills = () => fetch('/api/skills').then((res) => res.json());
