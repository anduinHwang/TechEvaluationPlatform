'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { AppShell } from '@/components/app-shell';
import { ApiError } from '@/components/api-error';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';

const placeholderChartData = [
  { name: 'Technology', score: 72 },
  { name: 'Market', score: 64 },
  { name: 'Business', score: 68 },
];

export default function NewCompanyKtrsFmPage() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState('Mirae Robotics Co., Ltd.');
  const [businessNumber, setBusinessNumber] = useState('220-81-62517');
  const [technologyName, setTechnologyName] = useState('Mock autonomous inspection robot');
  const [requiredConsent, setRequiredConsent] = useState(false);
  const [optionalConsent, setOptionalConsent] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!requiredConsent) {
      setError('Required information-use consent must be accepted.');
      return;
    }

    setIsSubmitting(true);
    try {
      const application = await api.createApplication({
        applicantOrganizationName: companyName,
        businessRegistrationNumber: businessNumber,
        technologyName,
      });
      await api.submitConsent(application.id, 'mock-company');
      await api.submitApplication(application.id);
      router.push('/mypage');
    } catch (event) {
      setError(event instanceof Error ? event.message : 'Mock application submission failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppShell title="Create KTRS-FM Mock Application" subtitle="Static placeholder results only. No real scoring formula or grade policy is implemented.">
      <form className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]" onSubmit={submit} data-testid="new-application-form">
        <Card className="space-y-4">
          {error ? <ApiError message={error} /> : null}
          <CardTitle>Company information</CardTitle>
          <label className="block text-sm font-medium">
            Company name
            <input className="mt-1 min-h-10 w-full rounded-md border border-[var(--border)] px-3" value={companyName} onChange={(event) => setCompanyName(event.target.value)} />
          </label>
          <label className="block text-sm font-medium">
            Business registration number
            <input className="mt-1 min-h-10 w-full rounded-md border border-[var(--border)] px-3" value={businessNumber} onChange={(event) => setBusinessNumber(event.target.value)} />
          </label>
          <CardTitle>Technology information</CardTitle>
          <label className="block text-sm font-medium">
            Technology name
            <input className="mt-1 min-h-10 w-full rounded-md border border-[var(--border)] px-3" value={technologyName} onChange={(event) => setTechnologyName(event.target.value)} />
          </label>
          <CardTitle>Checklist</CardTitle>
          <div className="grid gap-2 text-sm text-[var(--muted-foreground)]">
            <label><input type="checkbox" defaultChecked className="mr-2" /> Technology differentiation checked</label>
            <label><input type="checkbox" defaultChecked className="mr-2" /> Market potential checked</label>
            <label><input type="checkbox" className="mr-2" /> Financial policy placeholder acknowledged</label>
          </div>
          <CardTitle>Information-use consent</CardTitle>
          <div className="rounded-md bg-slate-50 p-4 text-sm">
            Consent is required for every mock evaluation submission. Electronic signature is represented as MOCK_SIGNED only.
          </div>
          <label className="block text-sm">
            <input
              data-testid="required-consent"
              type="checkbox"
              className="mr-2"
              checked={requiredConsent}
              onChange={(event) => setRequiredConsent(event.target.checked)}
            />
            Accept required information-use consent
          </label>
          <label className="block text-sm">
            <input type="checkbox" className="mr-2" checked={optionalConsent} onChange={(event) => setOptionalConsent(event.target.checked)} />
            Accept optional service notification consent
          </label>
          <Button data-testid="submit-application" disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Submitting...' : 'Submit mock application'}
          </Button>
        </Card>
        <Card>
          <CardTitle>Mock calculated result preview</CardTitle>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            This chart uses static placeholder values. Real formulas and grade thresholds are open questions.
          </p>
          <div className="mt-4 w-full overflow-x-auto" data-testid="mock-result-chart">
            <BarChart width={420} height={260} data={placeholderChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="var(--primary)" />
            </BarChart>
          </div>
        </Card>
      </form>
    </AppShell>
  );
}
