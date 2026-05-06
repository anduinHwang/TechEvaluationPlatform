'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { KeyRound, ShieldCheck, Smartphone } from 'lucide-react';
import { AppShell } from '@/components/app-shell';
import { ApiError } from '@/components/api-error';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { api, type Role } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<Role | null>(null);

  const login = async (role: Role) => {
    setError(null);
    setIsLoading(role);
    try {
      const user = await api.mockLogin(role);
      localStorage.setItem('ttpMockUser', JSON.stringify(user));
      router.push(role === 'COMPANY_MEMBER' ? '/company' : '/institution');
    } catch (event) {
      setError(event instanceof Error ? event.message : 'Mock login failed.');
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <AppShell title="Mock Login" subtitle="Real KIBO OAuth, certificate login, and simple authentication are placeholders.">
      <Card className="max-w-3xl">
        {error ? <ApiError message={error} /> : null}
        <Tabs defaultValue="id" className="mt-2" data-testid="login-tabs">
          <TabsList className="grid w-full grid-cols-3 rounded-md bg-[var(--muted)] p-1">
            <TabsTrigger className="rounded px-3 py-2 data-[state=active]:bg-white" value="id" data-testid="tab-id-login">
              <KeyRound className="mr-2 inline h-4 w-4" /> ID login
            </TabsTrigger>
            <TabsTrigger className="rounded px-3 py-2 data-[state=active]:bg-white" value="certificate" data-testid="tab-certificate-login">
              <ShieldCheck className="mr-2 inline h-4 w-4" /> Certificate login
            </TabsTrigger>
            <TabsTrigger className="rounded px-3 py-2 data-[state=active]:bg-white" value="simple" data-testid="tab-simple-login">
              <Smartphone className="mr-2 inline h-4 w-4" /> Simple authentication
            </TabsTrigger>
          </TabsList>
          <TabsContent value="id" className="mt-6 space-y-4">
            <label className="block text-sm font-medium">
              ID
              <input className="mt-1 min-h-10 w-full rounded-md border border-[var(--border)] px-3" defaultValue="mock-user" />
            </label>
            <label className="block text-sm font-medium">
              Password
              <input className="mt-1 min-h-10 w-full rounded-md border border-[var(--border)] px-3" type="password" defaultValue="mock-password" />
            </label>
            <div className="flex flex-wrap gap-4 text-sm text-[var(--muted-foreground)]">
              <label><input type="checkbox" className="mr-2" /> Save ID</label>
              <label><input type="checkbox" className="mr-2" /> Keyboard security</label>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button data-testid="login-company" disabled={isLoading !== null} onClick={() => login('COMPANY_MEMBER')}>
                {isLoading === 'COMPANY_MEMBER' ? 'Logging in...' : 'Login as company member'}
              </Button>
              <Button data-testid="login-institution" disabled={isLoading !== null} variant="secondary" onClick={() => login('INSTITUTION_MEMBER')}>
                {isLoading === 'INSTITUTION_MEMBER' ? 'Logging in...' : 'Login as institution member'}
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-[var(--primary)]">
              <span>Sign up</span>
              <span>Find ID/password</span>
              <span>Account recovery</span>
            </div>
          </TabsContent>
          <TabsContent value="certificate" className="mt-6 rounded-md bg-slate-50 p-4" data-testid="certificate-placeholder">
            Joint certificate login, financial certificate login, registration, and guide are placeholder only.
          </TabsContent>
          <TabsContent value="simple" className="mt-6 rounded-md bg-slate-50 p-4" data-testid="simple-auth-placeholder">
            Simple authentication is placeholder only until provider requirements are confirmed.
          </TabsContent>
        </Tabs>
      </Card>
    </AppShell>
  );
}
