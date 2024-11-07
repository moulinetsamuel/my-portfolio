import { CV } from '@/lib/schemas/cv/cvSchemas';
import { CVApiResponse, CVApiError } from '@/lib/schemas/cv/cvApiResponseSchema';
import { API_URLS } from '@/lib/api/URLs';
import { ApiError } from '@/lib/errors/apiError';

export const fetchCV = async (): Promise<CV> => {
  const response = await fetch(API_URLS.CV.GET);
  if (!response.ok) {
    const errorData = (await response.json()) as CVApiError;
    throw new ApiError(
      errorData.message || 'Erreur lors de la récupération du CV',
      response.status,
    );
  }
  return response.json();
};

export const uploadCV = async (formData: FormData): Promise<CVApiResponse> => {
  const response = await fetch(API_URLS.CV.UPLOAD, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = (await response.json()) as CVApiError;
    throw new ApiError(
      errorData.message || 'Erreur lors du téléchargement du CV',
      response.status,
    );
  }
  return response.json();
};
