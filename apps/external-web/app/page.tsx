import Link from 'next/link';
import { ArrowRight, Moon, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <p className="text-sm font-semibold text-[var(--primary)]">Open Technology Evaluation</p>
            <h1 className="mt-3 text-3xl font-bold tracking-normal md:text-5xl" data-testid="service-intro">
              Technology Evaluation Integrated Platform
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted-foreground)]">
              A mock Front Office slice for company and institution members to explore KTRS-FM
              self-diagnosis, information-use consent, My Page status, and institution review entry points.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/login" data-testid="login-cta">
                <Button>
                  Go to mock login <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" data-testid="dark-mode-toggle">
                <Moon className="mr-2 h-4 w-4" /> Dark mode placeholder
              </Button>
            </div>
          </div>
          <Card>
            <CardTitle>Integrated Search</CardTitle>
            <div className="mt-4 flex min-h-12 items-center gap-3 rounded-md border border-[var(--border)] px-4 text-[var(--muted-foreground)]">
              <Search className="h-4 w-4" />
              Search placeholder for reports, notices, Q&A, and evaluation services
            </div>
          </Card>
        </div>
      </section>
      <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-8 md:grid-cols-3">
        {['KTRS-FM', 'TECH-INDEX', 'BIGx Report'].map((title) => (
          <Card key={title}>
            <CardTitle>{title}</CardTitle>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              Mock entry point. Full policy, scoring, and paid tier behavior remain open questions.
            </p>
          </Card>
        ))}
      </section>
    </main>
  );
}
