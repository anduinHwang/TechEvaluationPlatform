# Technology Evaluation Integrated Platform

Mock Front Office vertical slice for a Korean Technology Evaluation Integrated Platform inspired by KIBO K-TOP.

## Stack

- Backend: Spring Boot 3.5+, Java 21, Gradle, H2 in-memory DB
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

The frontend defaults to `http://localhost:8080` for the API. Override with `NEXT_PUBLIC_API_URL` only for non-production-safe local endpoints.

## Checks

```bash
npm run backend:test
npm run frontend:lint
npm run frontend:typecheck
npm run frontend:build
npm run test:e2e
```

## Mock Scope

This implementation is mock-level only. It does not implement real KIBO OAuth, certificate login, simple authentication, scoring formulas, grade thresholds, paid/free membership policy, billing, electronic signature provider behavior, guarantee recommendation, or report generation.
