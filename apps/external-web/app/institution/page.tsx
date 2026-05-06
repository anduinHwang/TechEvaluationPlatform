'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ClipboardCheck, Users } from 'lucide-react';
import { AppShell } from '@/components/app-shell';
import { ApiError } from '@/components/api-error';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { api, type DashboardData } from '@/lib/api';

export default function InstitutionDashboardPage() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.institutionDashboard().then(setDashboard).catch((event: Error) => setError(event.message));
  }, []);

  return (
    <AppShell title="Institution Member Dashboard" subtitle="Institution-specific mock dashboard for FO users.">
      {error ? <ApiError message={error} /> : null}
      <div className="grid gap-4 md:grid-cols-3" data-testid="institution-dashboard">
        <Card>
          <CardTitle>Reviewable evaluations</CardTitle>
          <p className="mt-4 text-3xl font-bold">{dashboard?.reviewableEvaluationCount ?? '-'}</p>
        </Card>
        <Card>
          <CardTitle>Sub-account status</CardTitle>
          <p className="mt-4 flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
            <Users className="h-4 w-4" /> {dashboard?.subAccountSummary ?? 'Loading...'}
          </p>
        </Card>
        <Card>
          <CardTitle>Configured quick menus</CardTitle>
          <p className="mt-4 text-sm text-[var(--muted-foreground)]">Personalization placeholder</p>
        </Card>
      </div>
      <Card className="mt-6">
        <CardTitle>KTRS-FM Work Queue</CardTitle>
        <Link href="/evaluations/ktrs-fm/institution" data-testid="institution-ktrs-link">
          <Button className="mt-4"><ClipboardCheck className="mr-2 h-4 w-4" /> Open individual evaluation list</Button>
        </Link>
      </Card>
    </AppShell>
  );
}
