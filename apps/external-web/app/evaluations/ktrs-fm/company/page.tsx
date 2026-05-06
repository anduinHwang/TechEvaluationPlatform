'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { AppShell } from '@/components/app-shell';
import { ApiError } from '@/components/api-error';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { api, type EvaluationApplication } from '@/lib/api';

export default function CompanyKtrsFmPage() {
  const [applications, setApplications] = useState<EvaluationApplication[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.companyApplications().then(setApplications).catch((event: Error) => setError(event.message));
  }, []);

  return (
    <AppShell title="KTRS-FM Self-Diagnosis List" subtitle="Mock company self-diagnosis progress and result inquiry.">
      {error ? <ApiError message={error} /> : null}
      <Link href="/evaluations/ktrs-fm/company/new" data-testid="create-application-link">
        <Button><Plus className="mr-2 h-4 w-4" /> Create mock application</Button>
      </Link>
      <Card className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm" data-testid="company-applications-table">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="py-3">Sequence</th>
              <th>Evaluation date</th>
              <th>Progress status</th>
              <th>Evaluation result</th>
              <th>Result view</th>
              <th>Result transmission</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <tr key={application.id} className="border-b border-[var(--border)]">
                <td className="py-3">{index + 1}</td>
                <td>{new Date(application.createdAt).toLocaleDateString()}</td>
                <td>{application.status}</td>
                <td>{application.resultGrade ?? 'Placeholder'}</td>
                <td>Preview placeholder</td>
                <td>Transmission placeholder</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </AppShell>
  );
}
