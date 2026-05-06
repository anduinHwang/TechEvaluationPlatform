# Security

## Authentication

Authentication is not implemented in the current scaffold. `MockUser` records exist only as local mock data for future role-aware flows. They are not production accounts and do not store passwords, tokens, OAuth sessions, certificates, or credentials.

Future login must be mock-only first. Future KIBO OAuth 2.0 integration is planned, but provider configuration is not confirmed.

Do not implement real OAuth, call the OAuth reference URL from application code, or hardcode OAuth client IDs, client secrets, tokens, certificates, private keys, production callback URLs, or real credentials.

## Sensitive Data Classes

- Personal information
- Company confidential data
- Business registration numbers
- Financial and technical data
- Evaluation results
- Uploaded consent forms
- Report files
- Sub-account permissions

## Consent and Audit

Information-use consent persistence exists only as a mock record shape. `MOCK_SIGNED` is a placeholder state, not real electronic signature behavior. Real electronic signature provider behavior, consent history rules, audit event policy, and legal retention rules are open questions.

Audit log storage exists as a simple mock table for later flow PRs. No audit search UI, admin API, retention policy, or production compliance behavior is implemented.
