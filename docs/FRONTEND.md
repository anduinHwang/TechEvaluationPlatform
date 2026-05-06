# Frontend Guide

The current Front Office app lives in `apps/external-web` and targets Next.js 16+ with App Router.

## UI

- Use shadcn-style local primitives in `components/ui`.
- Use lucide-react for icons.
- Use Recharts for mock dashboard/result charts.
- Support PC, tablet, and mobile with responsive layouts.

## API

Use `NEXT_PUBLIC_API_URL`, defaulting to `http://localhost:8080` for local development. Do not hardcode production URLs.

## Policy

Do not hardcode business policy in the frontend. Scoring, grade thresholds, report access, paid/free membership behavior, and transmission rules are placeholders.
