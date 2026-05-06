# Mock FO Vertical Slice

## Goal

Provide a minimal coherent mock application that proves the Front Office can support role-aware navigation, KTRS-FM mock application creation, consent submission, My Page visibility, and institution list access.

## Implemented Flow

- Anonymous visitor opens `/`.
- Visitor opens `/login`.
- Visitor uses mock role login as company or institution member.
- Company member opens `/company`.
- Company member opens `/evaluations/ktrs-fm/company`.
- Company member creates a mock application at `/evaluations/ktrs-fm/company/new`.
- Required information-use consent is submitted as `MOCK_SIGNED`.
- Company member lands on `/mypage` and sees the submitted application.
- Institution member opens `/institution`.
- Institution member opens `/evaluations/ktrs-fm/institution` and sees submitted/transmitted mock applications.

## Non-goals

- Real OAuth
- Certificate login
- Simple authentication
- Real scoring
- Real report generation
- Billing/payment
- Guarantee recommendation
- Legal electronic signature integration
