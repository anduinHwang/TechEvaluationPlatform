'use client';

import { useEffect, useState } from 'react';
import { Bell, Star, UserCog, Users } from 'lucide-react';
import { AppShell } from '@/components/app-shell';
import { ApiError } from '@/components/api-error';
import { Card, CardTitle } from '@/components/ui/card';
import { api, type EvaluationApplication } from '@/lib/api';

export default function MyPage() {
  const [applications, setApplications] = useState<EvaluationApplication[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.mypageApplications().then(setApplications).catch((event: Error) => setError(event.message));
  }, []);

  return (
    <AppShell title="My Page" subtitle="Mock member dashboard for progress, result, notification, and sub-account entry points.">
      {error ? <ApiError message={error} /> : null}
      <div className="grid gap-4 md:grid-cols-4" data-testid="mypage-dashboard">
        <Card>
          <CardTitle>Application progress</CardTitle>
          <p className="mt-4 text-3xl font-bold">{applications.length}</p>
        </Card>
        <Card>
          <CardTitle>Evaluation result detail</CardTitle>
          <p className="mt-3 text-sm text-[var(--muted-foreground)]">PDF/report placeholder</p>
        </Card>
        <Card>
          <CardTitle>Notifications</CardTitle>
          <p className="mt-3 flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
            <Bell className="h-4 w-4" /> SMS/Kakao toggle placeholder
          </p>
        </Card>
        <Card>
          <CardTitle>Sub-accounts</CardTitle>
          <p className="mt-3 flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
            <Users className="h-4 w-4" /> Permission management placeholder
          </p>
        </Card>
      </div>
      <Card className="mt-6 overflow-x-auto">
        <CardTitle>Submitted applications</CardTitle>
        <table className="mt-4 w-full min-w-[640px] border-collapse text-left text-sm" data-testid="mypage-applications-table">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="py-3">Service application item</th>
              <th>Application date</th>
              <th>Key information</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id} className="border-b border-[var(--border)]">
                <td className="py-3">KTRS-FM</td>
                <td>{new Date(application.createdAt).toLocaleDateString()}</td>
                <td>{application.technologyName}</td>
                <td>{application.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <CardTitle><Star className="mr-2 inline h-4 w-4" /> Quick menu/favorites</CardTitle>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">Registration and personalization placeholder.</p>
        </Card>
        <Card>
          <CardTitle><UserCog className="mr-2 inline h-4 w-4" /> Member information</CardTitle>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">Member update screen placeholder.</p>
        </Card>
      </div>
    </AppShell>
  );
}
