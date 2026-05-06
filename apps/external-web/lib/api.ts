export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

export type HealthResponse = {
  status: 'UP';
  service: string;
};

export type MockVersionResponse = {
  app: string;
  mode: 'mock';
  backend: string;
  database: string;
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
    throw new Error(`목업 API 요청 실패: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
};

export const api = {
  health: () => request<HealthResponse>('/api/v1/health'),
  mockVersion: () => request<MockVersionResponse>('/api/v1/mock/version'),
};
