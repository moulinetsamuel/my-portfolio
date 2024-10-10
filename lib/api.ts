import { ContactFormData } from '@/lib/schemas/contactSchema';

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

export const getSkills = () => fetch('/api/skills').then((res) => res.json());

export const createSkill = async (name: string, icon: File) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('icon', icon);
  const res = await fetch('/api/skills', {
    method: 'POST',
    body: formData,
  });
  return await res.json();
};

export const updateSkill = async (id: number, name: string, icon?: File) => {
  const formData = new FormData();
  formData.append('name', name);
  if (icon) formData.append('icon', icon);
  const res = await fetch(`/api/skills/${id}`, {
    method: 'PUT',
    body: formData,
  });
  return await res.json();
};

export const deleteSkill = (id: number) =>
  fetch(`/api/skills/${id}`, { method: 'DELETE' }).then((res) => res.json());

export const getCV = async () => {
  const response = await fetch('/api/cv');
  if (!response.ok) {
    throw new Error('Failed to fetch CV');
  }
  const data = await response.json();
  return data || null; // Retourne null si aucun CV n'est trouvé
};

export const uploadCV = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch('/api/cv', {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Failed to upload CV');
  }
  return response.json();
};
