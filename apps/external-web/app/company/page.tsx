'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ClipboardList, Settings, Star } from 'lucide-react';
import { AppShell } from '@/components/app-shell';
import { ApiError } from '@/components/api-error';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { api, type DashboardData } from '@/lib/api';

export default function CompanyDashboardPage() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.companyDashboard().then(setDashboard).catch((event: Error) => setError(event.message));
  }, []);

  return (
    <AppShell title="Company Member Dashboard" subtitle="Personalized company member mock dashboard.">
      {error ? <ApiError message={error} /> : null}
      <div className="grid gap-4 md:grid-cols-3" data-testid="company-dashboard">
        <Card>
          <CardTitle>Recent evaluations</CardTitle>
          <p className="mt-4 text-3xl font-bold">{dashboard?.recentEvaluationCount ?? '-'}</p>
        </Card>
        <Card>
          <CardTitle>Submitted</CardTitle>
          <p className="mt-4 text-3xl font-bold">{dashboard?.submittedEvaluationCount ?? '-'}</p>
        </Card>
        <Card>
          <CardTitle>Personal settings</CardTitle>
          <p className="mt-4 flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
            <Settings className="h-4 w-4" /> Quick/favorite menu placeholder
          </p>
        </Card>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <CardTitle>Quick Menu</CardTitle>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/evaluations/ktrs-fm/company" data-testid="company-ktrs-link">
              <Button><ClipboardList className="mr-2 h-4 w-4" /> KTRS-FM self-diagnosis</Button>
            </Link>
            <Link href="/mypage">
              <Button variant="outline"><Star className="mr-2 h-4 w-4" /> My Page</Button>
            </Link>
          </div>
        </Card>
        <Card>
          <CardTitle>Help Service</CardTitle>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">Notices and Q&A are available from the global navigation.</p>
        </Card>
      </div>
    </AppShell>
  );
}
