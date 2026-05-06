# Architecture

This repository is a monorepo-style mock implementation for the Technology Evaluation Integrated Platform.

## Current Structure

```text
apps/
├── api            # Spring Boot 3.5+ mock API, Java 21, Gradle, H2
└── external-web   # Next.js 16+ customer-facing Front Office

e2e/               # Playwright Front Office flow tests
docs/              # Product, design, security, and quality documentation
```

Back-office web is intentionally not created in this PR. Institution-facing Front Office pages live in `apps/external-web` until Back Office IA is confirmed.

## Backend Boundary

`apps/api` exposes `/api/v1` endpoints for mock authentication, dashboards, KTRS-FM applications, consent, My Page, common notices, and FAQs. H2 is enabled only for local/mock development and tests. It must later be replaced by the confirmed production database.

## Frontend Boundary

`apps/external-web` uses Next.js App Router. It calls the Spring Boot API through `NEXT_PUBLIC_API_URL`, defaulting to `http://localhost:8080` for local development. It must not hardcode production URLs.

## Authentication Boundary

Current login is mock-only. Future KIBO OAuth 2.0 integration is a placeholder and must be implemented only after provider configuration, callback URLs, token handling, and security requirements are approved.

## Evaluation Boundary

KTRS-FM result grades are static placeholders. Real formulas, grade thresholds, paid/free membership effects, guarantee recommendation logic, and report generation are open policy questions.
