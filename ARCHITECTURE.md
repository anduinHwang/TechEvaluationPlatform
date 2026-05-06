# Architecture

This repository will evolve into a monorepo-style Technology Evaluation Integrated Platform. PR 0-1 is documentation-only; it defines the target boundaries that implementation PRs must follow.

## Target Application Shape

```text
apps/
├── api            # Spring Boot 3.5+ backend API, Java 21, Gradle, temporary H2 for mock PRs
└── external-web   # Next.js 16+ customer-facing Front Office

e2e/               # Playwright E2E tests
docs/              # Source-of-truth requirements and design documents
```

Do not create `backoffice-web` until Back Office IA is confirmed. Institution-facing Front Office pages remain inside `external-web` during the early mock phase.

## Target Boundaries

- Backend: Spring Boot 3.5+, Java 21, temporary H2 in-memory persistence for mock PRs only.
- Frontend: Next.js 16+, TypeScript, shadcn/ui, lucide-react, Recharts, responsive PC/tablet/mobile layouts.
- Authentication: mock-only first, future KIBO OAuth 2.0 placeholder only.
- Reports/files: placeholders until file server, PDF/report templates, and legal rules are confirmed.
- Evaluation policy: formulas, thresholds, paid/free behavior, and guarantee rules are product-policy placeholders.

## Dependency Direction

Future code should keep frontend, backend API, domain policy, persistence, and external integration boundaries explicit. Application code must not embed unknown product policy or production integration details.

## Current Implementation Boundary

If `apps/api`, `apps/external-web`, or `e2e` exist on the current branch, they are mock-level implementation only. H2 remains temporary, mock login remains non-production, and all real OAuth, scoring, billing, certificate, report, file, electronic signature, and cross-network integrations remain out of scope until product policy is confirmed.
