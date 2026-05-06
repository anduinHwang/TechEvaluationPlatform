import { ArrowRight, BarChart3, Building2, FileText, Moon, Newspaper, Search, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';

const serviceMenuItems = [
  'Open Technology Evaluation',
  'KTRS-FM',
  'TECH-INDEX',
  'Source Technology Evaluation',
  'Investment Model',
  'BIGx Report',
  'News / Notifications',
];

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
              A minimal mock Front Office scaffold for the future Korean technology evaluation platform.
              Login, service flows, scoring, reports, and integrations are placeholders for later PRs.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button data-testid="login-cta">
                Mock login planned <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" data-testid="dark-mode-toggle">
                <Moon className="mr-2 h-4 w-4" /> Dark mode placeholder
              </Button>
            </div>
          </div>
          <Card>
            <CardTitle>Integrated Search</CardTitle>
            <div className="mt-4 flex min-h-12 items-center gap-3 rounded-md border border-[var(--border)] px-4 text-[var(--muted-foreground)]">
              <Search className="h-4 w-4" />
              Search placeholder for future reports, notices, Q&A, and evaluation services
            </div>
          </Card>
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="mb-4 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-[var(--primary)]" />
          <h2 className="text-xl font-semibold">Front Office service menu placeholders</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="fo-service-menu">
          {serviceMenuItems.map((title, index) => (
            <Card key={title}>
              <div className="mb-3 flex items-center gap-2 text-[var(--primary)]">
                {index % 3 === 0 ? <ShieldCheck className="h-4 w-4" /> : null}
                {index % 3 === 1 ? <BarChart3 className="h-4 w-4" /> : null}
                {index % 3 === 2 ? <FileText className="h-4 w-4" /> : null}
                <CardTitle>{title}</CardTitle>
              </div>
              <p className="text-sm text-[var(--muted-foreground)]">
                Mock menu placeholder. Detailed screens and business rules belong to later PRs.
              </p>
            </Card>
          ))}
        </div>
        <Card className="mt-6" id="mock-login-placeholder">
          <div className="flex items-start gap-3">
            <Newspaper className="mt-1 h-5 w-5 text-[var(--primary)]" />
            <div>
              <CardTitle>Mock implementation notice</CardTitle>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                This scaffold does not implement login, real KIBO OAuth, certificate authentication,
                scoring formulas, grade thresholds, billing, electronic signatures, or report generation.
              </p>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}
