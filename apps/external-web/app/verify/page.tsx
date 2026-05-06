import Link from 'next/link';
import { AlertTriangle, CheckCircle2, CircleDashed, Server, ShieldAlert } from 'lucide-react';
import { api, API_BASE_URL, type HealthResponse, type MockVersionResponse } from '@/lib/api';
import { Card, CardTitle } from '@/components/ui/card';

type FetchState<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

const implementedFeatures = [
  '익명 사용자용 프론트오피스 홈 셸',
  '백엔드 헬스 체크 엔드포인트',
  '백엔드 목업 버전 엔드포인트',
  '프론트엔드 스모크 테스트 화면',
];

const missingFeatures = [
  '목업 로그인 흐름',
  '역할별 기업/기관 대시보드',
  'main 브랜치의 H2 도메인 데이터 조회 API',
  'KTRS-FM 비즈니스 흐름 API',
  '정보이용동의 제출 흐름',
  '마이페이지와 신청 이력',
  '보고서 출력 및 파일/PDF 처리',
];

const fetchState = async <T,>(loader: () => Promise<T>): Promise<FetchState<T>> => {
  try {
    return { ok: true, data: await loader() };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : '알 수 없는 목업 API 오류',
    };
  }
};

const StatusValue = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-3 text-2xl font-bold text-[var(--foreground)]">{children}</p>
);

export default async function VerifyPage() {
  const [health, mockVersion] = await Promise.all([
    fetchState<HealthResponse>(() => api.health()),
    fetchState<MockVersionResponse>(() => api.mockVersion()),
  ]);

  return (
    <main data-testid="verify-page" className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold text-[var(--primary)]">현재 목업 플랫폼 상태</p>
          <h1 className="mt-2 text-3xl font-bold tracking-normal md:text-4xl">목업 기능 검증</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted-foreground)]">
            이 페이지는 현재 브랜치에서 사용할 수 있는 스캐폴드 기능만 검증합니다. 이후 프론트오피스
            기능은 미리 구현하지 않고 명확히 자리표시자로 표시합니다.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex min-h-10 items-center justify-center rounded-md border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-50"
        >
          홈으로 돌아가기
        </Link>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <Card data-testid="backend-health-card">
          <div className="flex items-center gap-2 text-[var(--primary)]">
            <Server className="h-5 w-5" />
            <CardTitle>백엔드 헬스 체크</CardTitle>
          </div>
          {health.ok ? (
            <>
              <StatusValue>{health.data.status}</StatusValue>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">{health.data.service}</p>
            </>
          ) : (
            <>
              <StatusValue>사용 불가</StatusValue>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">{health.error}</p>
            </>
          )}
        </Card>

        <Card data-testid="mock-version-card">
          <div className="flex items-center gap-2 text-[var(--primary)]">
            <CircleDashed className="h-5 w-5" />
            <CardTitle>목업 버전</CardTitle>
          </div>
          {mockVersion.ok ? (
            <>
              <StatusValue>{mockVersion.data.mode}</StatusValue>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                {mockVersion.data.app} / {mockVersion.data.backend} / {mockVersion.data.database}
              </p>
            </>
          ) : (
            <>
              <StatusValue>사용 불가</StatusValue>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">{mockVersion.error}</p>
            </>
          )}
        </Card>

        <Card data-testid="domain-status-card">
          <div className="flex items-center gap-2 text-[var(--primary)]">
            <AlertTriangle className="h-5 w-5" />
            <CardTitle>H2 / 도메인 기준선</CardTitle>
          </div>
          <StatusValue>아직 노출되지 않음</StatusValue>
          <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
            병합된 스캐폴드 브랜치는 샘플 사용자, 평가 신청, 감사 로그를 읽기 전용 검증 API로 아직
            노출하지 않습니다. H2 목업 도메인 기준선이 병합된 뒤 필요한 범위에서 추가해야 합니다.
          </p>
        </Card>

        <Card data-testid="frontend-environment-card">
          <div className="flex items-center gap-2 text-[var(--primary)]">
            <CheckCircle2 className="h-5 w-5" />
            <CardTitle>프론트엔드 환경</CardTitle>
          </div>
          <StatusValue>Next.js 16 목업 셸</StatusValue>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">API 기본 URL: {API_BASE_URL}</p>
        </Card>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <CardTitle>구현된 기능 체크리스트</CardTitle>
          <ul className="mt-4 space-y-2 text-sm text-[var(--muted-foreground)]">
            {implementedFeatures.map((feature) => (
              <li key={feature} className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card data-testid="missing-feature-checklist">
          <CardTitle>미구현 기능 체크리스트</CardTitle>
          <ul className="mt-4 space-y-2 text-sm text-[var(--muted-foreground)]">
            {missingFeatures.map((feature) => (
              <li key={feature} className="flex gap-2">
                <CircleDashed className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <Card className="mt-6" data-testid="placeholder-warning">
        <div className="flex items-start gap-3">
          <ShieldAlert className="mt-1 h-5 w-5 shrink-0 text-[var(--primary)]" />
          <div>
            <CardTitle>자리표시자 및 보안 안내</CardTitle>
            <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
              OAuth, 평가 산식, 등급 기준, 유료 멤버십 정책, 보고서, 전자서명, 인증서 로그인, 결제,
              파일 저장소, 운영 연계는 모두 자리표시자입니다. 이 페이지는 실제 KIBO OAuth를 호출하거나
              비밀 값을 노출하면 안 됩니다.
            </p>
          </div>
        </div>
      </Card>

      <Card className="mt-6">
        <CardTitle>사용 가능한 페이지</CardTitle>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link href="/" className="text-[var(--primary)] underline underline-offset-4">
            익명 홈
          </Link>
          <span className="text-[var(--muted-foreground)]">로그인 페이지는 다음 PR에서 구현할 예정입니다.</span>
        </div>
      </Card>
    </main>
  );
}
