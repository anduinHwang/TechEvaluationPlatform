import { ReactNode } from 'react';

export const AppShell = ({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) => (
  <main className="mx-auto w-full max-w-6xl px-4 py-8">
    <div className="mb-6">
      <h1 className="text-2xl font-bold tracking-normal md:text-3xl">{title}</h1>
      {subtitle ? <p className="mt-2 max-w-3xl text-[var(--muted-foreground)]">{subtitle}</p> : null}
    </div>
    {children}
  </main>
);
