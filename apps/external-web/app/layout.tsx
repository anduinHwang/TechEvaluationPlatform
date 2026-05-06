import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Building2, Moon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Technology Evaluation Integrated Platform',
  description: 'Mock Front Office scaffold for technology evaluation services.',
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
            <div className="flex items-center gap-2 rounded-md border border-[var(--border)] px-3 py-2 text-sm text-[var(--muted-foreground)]">
              <Moon className="h-4 w-4" />
              Dark mode placeholder
            </div>
          </div>
        </header>
        {children}
        <footer className="border-t border-[var(--border)] bg-white">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-[var(--muted-foreground)] md:flex-row md:items-center md:justify-between">
            <div>KIBO logo placeholder. No click action.</div>
            <div>Mock scaffold only. Production footer links are future work.</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
