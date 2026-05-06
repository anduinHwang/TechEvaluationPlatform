# Technology Evaluation Integrated Platform

Customer-facing Front Office first platform for technology evaluation services inspired by the KIBO K-TOP Open Technology Evaluation Platform.

This repository uses the documentation in `docs/` as the source of truth for Front Office requirements, product guardrails, and future implementation sequencing. If application scaffolding already exists on `main`, treat it as mock-level work that must continue to follow these documents.

## Current Status

- PR 0-1: project guidance and Front Office requirements baseline.
- Early mock application work may exist on `main`; do not expand it from this documentation-only PR.
- Future PRs should stay within the ordered plan in `docs/PLANS.md`.

## Source of Truth

- Agent guidance: `AGENTS.md`
- Target architecture: `ARCHITECTURE.md`
- Product requirements: `docs/product-specs/`
- UX/frontend/security/reliability guidance: `docs/*.md`
- Open questions: `docs/product-specs/open-questions.md`

## Guardrails

Login is mock-only until OAuth 2.0 details are confirmed. Do not implement real OAuth, certificate login, simple authentication, scoring formulas, paid/free policy, billing, electronic signature, report generation, production file storage, or cross-network integration until confirmed in product specs.

## Local Commands

When the mock applications are present, use the project scripts and app-local commands documented by the relevant implementation PR. For the planned Gradle/Next.js baseline, expected commands include:

```bash
npm run backend:test
npm run frontend:lint
npm run frontend:typecheck
npm run frontend:build
npm run test:e2e
```
