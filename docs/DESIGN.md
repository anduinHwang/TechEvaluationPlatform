# Design Guide

## UX Principles

- Design for a public-facing government/financial service: clear, calm, trustworthy, and scan-friendly.
- Prefer dense but organized information over marketing-heavy layouts.
- Make login-required paths obvious and route anonymous users to mock login in early PRs.
- Use explicit placeholder language for unconfirmed policy, reports, billing, electronic signature, and external integration behavior.

## Role-Aware Home Principles

- Anonymous home: service introduction, login/sign-up CTA, global navigation, integrated search entry, dark mode placeholder.
- Company home: evaluation status, quick/favorite menus, service shortcuts, help links.
- Institution home: evaluation counts, sub-account summary, configured quick menus, help links.

## Interaction Patterns

- Use accessible forms with clear labels.
- Use tables for lists and detail pages for records.
- Use Recharts for trend/dashboard visualization when charts are introduced.
- Use clear empty/loading/error states.
