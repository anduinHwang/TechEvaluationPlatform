'use client';

import { useEffect, useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { ApiError } from '@/components/api-error';
import { Card, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';

export default function NoticesPage() {
  const [notices, setNotices] = useState<Array<{ id: string; title: string; category: string }>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.notices().then(setNotices).catch((event: Error) => setError(event.message));
  }, []);

  return (
    <AppShell title="Notices" subtitle="Mock notices with future file download and PDF preview placeholders.">
      {error ? <ApiError message={error} /> : null}
      <div className="grid gap-3" data-testid="notice-list">
        {notices.map((notice) => (
          <Card key={notice.id}>
            <CardTitle>{notice.title}</CardTitle>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">{notice.category}</p>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
