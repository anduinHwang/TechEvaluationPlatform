# Architecture

This repository will evolve into a monorepo-style Technology Evaluation Integrated Platform. The documentation defines the target boundaries that implementation PRs must follow.

## Target Application Shape

```text
apps/
├── api            # Spring Boot 3.5+ backend API, Java 21, Gradle, temporary H2 for mock PRs
└── external-web   # Next.js 16+ customer-facing Front Office

e2e/               # Playwright E2E tests
docs/              # Source-of-truth requirements and design documents
```

Do not create `backoffice-web` until Back Office IA is confirmed. Institution-facing Front Office pages remain inside `external-web` during the early mock phase.

## PR 1-1 Scaffold Boundary

`apps/api` currently exposes only scaffold endpoints:

- `GET /api/v1/health`
- `GET /api/v1/mock/version`

H2 is wired only as temporary local/test mock persistence. Domain entities, seed data, repository tests, mock login, dashboards, evaluation flows, consent, and My Page APIs belong to later PRs.

`apps/external-web` currently contains only the anonymous home shell and shared UI primitives. The API helper uses `NEXT_PUBLIC_API_URL`, defaulting to `http://localhost:8080` for local development. It must not hardcode production URLs.

## Target Boundaries

- Backend: Spring Boot 3.5+, Java 21, temporary H2 in-memory persistence for mock PRs only.
- Frontend: Next.js 16+, TypeScript, shadcn/ui, lucide-react, Recharts, responsive PC/tablet/mobile layouts.
- Authentication: mock-only first, future KIBO OAuth 2.0 placeholder only.
- Reports/files: placeholders until file server, PDF/report templates, and legal rules are confirmed.
- Evaluation policy: formulas, thresholds, paid/free behavior, and guarantee rules are product-policy placeholders.

## Dependency Direction

Future code should keep frontend, backend API, domain policy, persistence, and external integration boundaries explicit. Application code must not embed unknown product policy or production integration details.

## Current Implementation Boundary

No login page, session behavior, or evaluation flow is implemented in this scaffold. Future mock login comes first; KIBO OAuth 2.0 remains a placeholder and must be implemented only after provider configuration, callback URLs, token handling, and security requirements are approved.

If `apps/api`, `apps/external-web`, or `e2e` exist on the current branch, they are mock-level implementation only. H2 remains temporary, mock login remains non-production, and all real OAuth, scoring, billing, certificate, report, file, electronic signature, and cross-network integrations remain out of scope until product policy is confirmed.
