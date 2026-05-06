'use client';

import { useEffect, useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { ApiError } from '@/components/api-error';
import { Card, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';

export default function QnaPage() {
  const [faqs, setFaqs] = useState<Array<{ id: string; question: string; answer: string }>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.faqs().then(setFaqs).catch((event: Error) => setError(event.message));
  }, []);

  return (
    <AppShell title="Q&A" subtitle="Mock Q&A and FAQ content. Inquiry registration remains a later slice.">
      {error ? <ApiError message={error} /> : null}
      <div className="grid gap-3" data-testid="qna-list">
        {faqs.map((faq) => (
          <Card key={faq.id}>
            <CardTitle>{faq.question}</CardTitle>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">{faq.answer}</p>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
