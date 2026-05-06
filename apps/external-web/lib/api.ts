export type Role = 'COMPANY_MEMBER' | 'INSTITUTION_MEMBER';

export type MockUser = {
  id: number;
  username: string;
  displayName: string;
  role: Role;
  organizationName: string;
  authMode: 'MOCK_ONLY';
};

export type EvaluationApplication = {
  id: number;
  serviceType: 'KTRS_FM';
  applicantOrganizationName: string;
  businessRegistrationNumber: string;
  technologyName: string;
  status: 'DRAFT' | 'CONSENT_REQUIRED' | 'SUBMITTED' | 'TRANSMITTED' | 'IN_REVIEW' | 'COMPLETED';
  resultGrade: string | null;
  createdAt: string;
  updatedAt: string;
};

export type DashboardData = {
  title: string;
  recentEvaluationCount?: number;
  submittedEvaluationCount?: number;
  reviewableEvaluationCount?: number;
  subAccountSummary?: string;
  quickMenus: string[];
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
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
  mockLogin: (role: Role) =>
    request<MockUser>('/api/v1/auth/mock-login', {
      method: 'POST',
      body: JSON.stringify({ role }),
    }),
  companyDashboard: () => request<DashboardData>('/api/v1/dashboard/company'),
  institutionDashboard: () => request<DashboardData>('/api/v1/dashboard/institution'),
  companyApplications: () =>
    request<EvaluationApplication[]>('/api/v1/evaluations/ktrs-fm/company/applications'),
  createApplication: (payload: {
    applicantOrganizationName: string;
    businessRegistrationNumber: string;
    technologyName: string;
  }) =>
    request<EvaluationApplication>('/api/v1/evaluations/ktrs-fm/company/applications', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  submitConsent: (id: number, consentedBy: string) =>
    request(`/api/v1/evaluations/ktrs-fm/company/applications/${id}/consent`, {
      method: 'POST',
      body: JSON.stringify({
        consentedBy,
        requiredConsentAccepted: true,
        optionalConsentAccepted: true,
      }),
    }),
  submitApplication: (id: number) =>
    request<EvaluationApplication>(`/api/v1/evaluations/ktrs-fm/company/applications/${id}/submit`, {
      method: 'POST',
    }),
  institutionApplications: () =>
    request<EvaluationApplication[]>('/api/v1/evaluations/ktrs-fm/institution/applications'),
  mypageApplications: () => request<EvaluationApplication[]>('/api/v1/mypage/applications'),
  notices: () => request<Array<{ id: string; title: string; category: string }>>('/api/v1/common/notices'),
  faqs: () => request<Array<{ id: string; question: string; answer: string }>>('/api/v1/common/faqs'),
};
