# Frontend Guide

The Front Office app targets Next.js 16+ with TypeScript and App Router. Current and future code should keep public Front Office pages in `apps/external-web`; Back Office UI must wait until Back Office IA is confirmed.

## Target Stack

- Next.js 16+
- TypeScript
- Tailwind CSS
- shadcn/ui
- lucide-react
- Recharts
- Playwright for UI/E2E tests

## Implementation Rules

- Keep business policy out of frontend code unless product specs explicitly define it.
- Use environment variables for API base URLs; do not hardcode production endpoints.
- Use shadcn/ui as the UI foundation and lucide-react as the standard icon set.
- Use Recharts for dashboards and trend information.
- Support PC, tablet, and mobile layouts.
- Use stable `data-testid` selectors for Playwright flows.
- Use `NEXT_PUBLIC_API_URL` or equivalent public runtime configuration for local API base URLs; never hardcode production URLs.
- Show clear mock/dev error states when the backend is unavailable.

## Placeholder Rules

Do not implement real OAuth, certificate login, simple authentication, scoring, billing, electronic signature, report generation, file server integration, or cross-network integration until confirmed.
