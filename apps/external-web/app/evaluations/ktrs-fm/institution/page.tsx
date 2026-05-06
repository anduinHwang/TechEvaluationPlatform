'use client';

import { useEffect, useMemo, useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { ApiError } from '@/components/api-error';
import { Card } from '@/components/ui/card';
import { api, type EvaluationApplication } from '@/lib/api';

export default function InstitutionKtrsFmPage() {
  const [applications, setApplications] = useState<EvaluationApplication[]>([]);
  const [companyName, setCompanyName] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.institutionApplications().then(setApplications).catch((event: Error) => setError(event.message));
  }, []);

  const filteredApplications = useMemo(
    () =>
      applications.filter((application) => {
        const matchesCompany = application.applicantOrganizationName.toLowerCase().includes(companyName.toLowerCase());
        const matchesNumber = application.businessRegistrationNumber.includes(businessNumber);
        return matchesCompany && matchesNumber;
      }),
    [applications, businessNumber, companyName],
  );

  return (
    <AppShell title="KTRS-FM Individual Evaluation List" subtitle="Institution member view of company-transmitted mock evaluation records.">
      {error ? <ApiError message={error} /> : null}
      <Card className="mb-5 grid gap-3 md:grid-cols-2">
        <label className="text-sm font-medium">
          Company name
          <input data-testid="institution-company-search" className="mt-1 min-h-10 w-full rounded-md border border-[var(--border)] px-3" value={companyName} onChange={(event) => setCompanyName(event.target.value)} />
        </label>
        <label className="text-sm font-medium">
          Business registration number
          <input data-testid="institution-business-search" className="mt-1 min-h-10 w-full rounded-md border border-[var(--border)] px-3" value={businessNumber} onChange={(event) => setBusinessNumber(event.target.value)} />
        </label>
      </Card>
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm" data-testid="institution-applications-table">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="py-3">Sequence</th>
              <th>Transmission date</th>
              <th>Company name</th>
              <th>Business registration number</th>
              <th>Evaluation result</th>
              <th>Edit/view</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((application, index) => (
              <tr key={application.id} className="border-b border-[var(--border)]">
                <td className="py-3">{index + 1}</td>
                <td>{new Date(application.updatedAt).toLocaleDateString()}</td>
                <td>{application.applicantOrganizationName}</td>
                <td>{application.businessRegistrationNumber}</td>
                <td>{application.resultGrade ?? 'Placeholder'}</td>
                <td>View placeholder</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </AppShell>
  );
}
