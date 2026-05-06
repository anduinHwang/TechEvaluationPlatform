export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

export type HealthResponse = {
  status: 'UP';
  service: string;
};

export const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Mock API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
};

export const api = {
  health: () => request<HealthResponse>('/api/v1/health'),
};
