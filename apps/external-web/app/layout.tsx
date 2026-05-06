import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Technology Evaluation Integrated Platform',
  description: 'Mock Front Office vertical slice for technology evaluation services.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-[var(--border)] bg-white">
          <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2 font-semibold" data-testid="global-logo">
              <Building2 className="h-5 w-5 text-[var(--primary)]" />
              TTP Front Office
            </Link>
            <nav className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted-foreground)]">
              <Link href="/evaluations/ktrs-fm/company">KTRS-FM</Link>
              <Link href="/notices">Notices</Link>
              <Link href="/qna">Q&A</Link>
              <Link href="/mypage">My Page</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="mt-12 border-t border-[var(--border)] bg-white">
          <div className="mx-auto grid w-full max-w-6xl gap-3 px-4 py-8 text-sm text-[var(--muted-foreground)] md:grid-cols-3">
            <div>KIBO logo placeholder. No click action.</div>
            <div>33 Munhyeon Geumyung-ro, Nam-gu, Busan</div>
            <div>1544-1120 weekdays 09:00-18:00 / Night duty 051-606-7301</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
