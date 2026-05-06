# Mock App Scaffold

## Goal

Provide the first runnable mock scaffold for the Technology Evaluation Integrated Platform without implementing business flows early.

## Implemented Scope

- Anonymous visitor opens `/`.
- Home shows service introduction, login CTA placeholder, dark mode placeholder, and service menu placeholders.
- Backend exposes `/api/v1/health`.
- Backend exposes `/api/v1/mock/version`.
- Playwright verifies the home smoke flow.
- JUnit verifies the backend scaffold endpoints.

## Non-goals

- Real OAuth
- Mock login
- Certificate login
- Simple authentication
- KTRS-FM flow
- Domain entities
- Seed data
- Real scoring
- Real report generation
- Billing/payment
- Guarantee recommendation
- Legal electronic signature integration
