import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Building2, Moon } from 'lucide-react';

export const metadata: Metadata = {
  title: '기술평가 통합 플랫폼',
  description: '기술평가 서비스를 위한 목업 프론트오피스 스캐폴드입니다.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <header className="border-b border-[var(--border)] bg-white">
          <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2 font-semibold" data-testid="global-logo">
              <Building2 className="h-5 w-5 text-[var(--primary)]" />
              기술평가 통합 플랫폼
            </Link>
            <div className="flex items-center gap-2 rounded-md border border-[var(--border)] px-3 py-2 text-sm text-[var(--muted-foreground)]">
              <Moon className="h-4 w-4" />
              다크 모드 자리표시자
            </div>
          </div>
        </header>
        {children}
        <footer className="border-t border-[var(--border)] bg-white">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-[var(--muted-foreground)] md:flex-row md:items-center md:justify-between">
            <div>KIBO 로고 자리표시자입니다. 클릭 동작은 없습니다.</div>
            <div>현재는 목업 스캐폴드입니다. 실제 푸터 링크는 이후 작업에서 정의합니다.</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
