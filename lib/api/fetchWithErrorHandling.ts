import { ZodError } from 'zod';
import { API_URLS } from './URLs';

export class APIError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown,
  ) {
    super(message);
    this.name = 'APIError';
  }
}

type FetchOptions = RequestInit & {
  parseResponse?: boolean;
};

type ApiUrlKey = keyof typeof API_URLS;

export async function fetchWithErrorHandling<T>(
  url: ApiUrlKey | string,
  options: FetchOptions = {},
): Promise<T> {
  const { parseResponse = true, ...fetchOptions } = options;

  try {
    const fullUrl = typeof url === 'string' ? url : API_URLS[url];
    const response = await fetch(fullUrl, fetchOptions);

    if (!response.ok) {
      let errorData: unknown;
      try {
        errorData = await response.json();
      } catch {
        errorData = null;
      }
      throw new APIError(response.status, response.statusText, errorData);
    }

    if (parseResponse) {
      const data = await response.json();
      return data as T;
    }

    return response as unknown as T;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    } else if (error instanceof ZodError) {
      throw new APIError(400, 'Validation error', error.errors);
    } else if (error instanceof Error) {
      throw new APIError(500, error.message);
    } else {
      throw new APIError(500, 'An unknown error occurred');
    }
  }
}
