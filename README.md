# Technology Evaluation Integrated Platform

Customer-facing Front Office first platform for technology evaluation services inspired by the KIBO K-TOP Open Technology Evaluation Platform.

This repository uses the documentation in `docs/` as the source of truth for Front Office requirements, product guardrails, and future implementation sequencing.

## Current Status

- PR 0-1: project guidance and Front Office requirements baseline.
- PR 1-1: minimal runnable mock app scaffold.
- PR 1-2: H2-backed mock domain persistence baseline.
- Future PRs must stay within the ordered plan in `docs/PLANS.md`.

## Source of Truth

- Agent guidance: `AGENTS.md`
- Target architecture: `ARCHITECTURE.md`
- Product requirements: `docs/product-specs/`
- UX/frontend/security/reliability guidance: `docs/*.md`
- Open questions: `docs/product-specs/open-questions.md`

## Mock Implementation Status

The current scaffold includes only:

- Spring Boot API shell with health and mock version endpoints
- H2-backed mock JPA entities and repositories for users, evaluation applications, information consent, and audit logs
- Local seed data for company/institution mock users and sample KTRS-FM applications
- Next.js Front Office anonymous home shell
- JUnit smoke tests for backend scaffold endpoints
- JUnit repository tests for the mock domain baseline
- Playwright smoke tests for the home page

Login, dashboards, KTRS-FM APIs, My Page, report generation, and real integrations are intentionally not implemented yet.

The current JPA entities are mock-level persistence only. They are not a final production schema, `MockUser` is not real authentication, and `resultGrade` is placeholder-only with no scoring or grade calculation.

## Stack

- Backend: Spring Boot 3.5+, Java 21, Gradle, H2 in-memory DB for local/test mock persistence
- Frontend: Next.js 16+, TypeScript, Tailwind CSS, shadcn-style local UI primitives, lucide-react, Recharts
- Tests: JUnit, Playwright

## Run Locally

Backend:

```bash
cd apps/api
./gradlew bootRun
```

Frontend:

```bash
npm install
npm run frontend:dev
```

The frontend API helper defaults to `http://localhost:8080` for local development. Override with `NEXT_PUBLIC_API_URL` only for non-production-safe local endpoints.

## Checks

```bash
npm run backend:test
npm run frontend:lint
npm run frontend:typecheck
npm run frontend:build
npm run test:e2e
```

## Guardrails

Login is mock-only until OAuth 2.0 details are confirmed. Do not implement real OAuth, certificate login, simple authentication, scoring formulas, paid/free policy, billing, electronic signature, report generation, production file storage, or cross-network integration until confirmed in product specs.

H2 is temporary mock persistence and must not be used as production storage. Production database configuration is not included in this scaffold.

## Next Recommended PR

PR 2-1: Mock login flow.
