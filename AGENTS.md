# AGENTS.md

Behavioral guidelines for coding agents working on the Technology Evaluation Integrated Platform.

## 1. Think Before Coding

Do not assume policy. State assumptions and ask when the product rule is unclear.

## 2. Simplicity First

Build the smallest coherent vertical slice that satisfies the task. Do not add speculative abstractions, real integrations, or future-only features.

## 3. Surgical Changes

Touch only files required for the current PR. Do not refactor unrelated code.

## 4. Goal-Driven Execution

Every PR must include validation results. Backend behavior must be covered with JUnit tests. Front Office navigation flows must be covered with Playwright where practical.

## Project Guardrails

- Login is mock-only until approved OAuth 2.0 details are confirmed.
- Do not call the KIBO OAuth URL from application code in this mock slice.
- Do not hardcode secrets, client IDs, client secrets, tokens, certificates, private keys, production callback URLs, or real credentials.
- Do not invent scoring formulas, grade thresholds, legal rules, paid membership rules, billing rules, certificate login behavior, electronic signature provider behavior, guarantee recommendation logic, or report templates.
- If policy is missing, add or update `docs/product-specs/open-questions.md`.
- H2 is temporary and must not be treated as production storage.

## Validation Expectations

- Backend: `cd apps/api && ./gradlew test`
- Frontend lint/typecheck/build: `npm run frontend:lint`, `npm run frontend:typecheck`, `npm run frontend:build`
- E2E: `npm run test:e2e`
