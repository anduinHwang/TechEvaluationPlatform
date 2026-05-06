import Link from 'next/link';
import { ArrowRight, BarChart3, Building2, FileText, Moon, Newspaper, Search, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';

const serviceMenuItems = [
  '공개기술평가',
  'KTRS-FM',
  'TECH-INDEX',
  '원천기술평가',
  '투자모형',
  'BIGx 리포트',
  '뉴스 / 알림',
];

export default function HomePage() {
  return (
    <main data-testid="home-page">
      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <p className="text-sm font-semibold text-[var(--primary)]">공개기술평가</p>
            <p className="mt-2 inline-flex rounded-md bg-[var(--muted)] px-3 py-1 text-xs font-semibold text-[var(--muted-foreground)]">
              목업 구현
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-normal md:text-5xl" data-testid="service-intro">
              기술평가 통합 플랫폼
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted-foreground)]">
              향후 한국형 기술평가 플랫폼 구축을 위한 최소 목업 프론트오피스 스캐폴드입니다.
              로그인, 서비스 흐름, 평가 산식, 보고서, 외부 연계는 이후 PR에서 단계적으로 구현합니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button data-testid="login-cta">
                목업 로그인 예정 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link
                href="/verify"
                data-testid="verify-link"
                className="inline-flex min-h-10 items-center justify-center rounded-md border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-50"
              >
                목업 기준선 검증
              </Link>
              <Button variant="outline" data-testid="dark-mode-toggle">
                <Moon className="mr-2 h-4 w-4" /> 다크 모드 자리표시자
              </Button>
            </div>
          </div>
          <Card>
            <CardTitle>통합 검색</CardTitle>
            <div className="mt-4 flex min-h-12 items-center gap-3 rounded-md border border-[var(--border)] px-4 text-[var(--muted-foreground)]">
              <Search className="h-4 w-4" />
              향후 보고서, 공지사항, Q&A, 평가 서비스를 검색하기 위한 자리표시자입니다
            </div>
          </Card>
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="mb-4 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-[var(--primary)]" />
          <h2 className="text-xl font-semibold">프론트오피스 서비스 메뉴 자리표시자</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="fo-service-menu">
          {serviceMenuItems.map((title, index) => (
            <Card key={title}>
              <div className="mb-3 flex items-center gap-2 text-[var(--primary)]">
                {index % 3 === 0 ? <ShieldCheck className="h-4 w-4" /> : null}
                {index % 3 === 1 ? <BarChart3 className="h-4 w-4" /> : null}
                {index % 3 === 2 ? <FileText className="h-4 w-4" /> : null}
                <CardTitle>{title}</CardTitle>
              </div>
              <p className="text-sm text-[var(--muted-foreground)]">
                목업 메뉴 자리표시자입니다. 상세 화면과 비즈니스 규칙은 이후 PR에서 구현합니다.
              </p>
            </Card>
          ))}
        </div>
        <Card className="mt-6" id="mock-login-placeholder">
          <div className="flex items-start gap-3">
            <Newspaper className="mt-1 h-5 w-5 text-[var(--primary)]" />
            <div>
              <CardTitle>목업 구현 안내</CardTitle>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                이 스캐폴드는 로그인, 실제 KIBO OAuth, 인증서 인증, 평가 산식, 등급 기준, 결제,
                전자서명, 보고서 생성을 구현하지 않습니다.
              </p>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}
