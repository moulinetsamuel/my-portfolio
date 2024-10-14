const BASE_URL = '/api';
const RESOURCES = {
  PROJECTS: 'projects',
  SKILLS: 'skills',
  CV: 'cv',
} as const;

type ResourceId = number;

export const API_URLS = {
  PROJECTS: {
    GET: `${BASE_URL}/${RESOURCES.PROJECTS}`,
    GET_ONE: (id: ResourceId) => `${BASE_URL}/${RESOURCES.PROJECTS}/${id}`,
    CREATE: `${BASE_URL}/${RESOURCES.PROJECTS}`,
    UPDATE: (id: ResourceId) => `${BASE_URL}/${RESOURCES.PROJECTS}/${id}`,
    DELETE: (id: ResourceId) => `${BASE_URL}/${RESOURCES.PROJECTS}/${id}`,
  },
  SKILLS: {
    GET: `${BASE_URL}/${RESOURCES.SKILLS}`,
    CREATE: `${BASE_URL}/${RESOURCES.SKILLS}`,
    UPDATE: (id: ResourceId) => `${BASE_URL}/${RESOURCES.SKILLS}/${id}`,
    DELETE: (id: ResourceId) => `${BASE_URL}/${RESOURCES.SKILLS}/${id}`,
  },
  CV: {
    GET: `${BASE_URL}/${RESOURCES.CV}`,
    UPLOAD: `${BASE_URL}/${RESOURCES.CV}`,
  },
} as const;

// Type pour l'objet API_URLS complet
export type ApiUrls = typeof API_URLS;
