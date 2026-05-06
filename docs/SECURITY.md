# Security

## Authentication

Authentication is not implemented in the PR 1-1 scaffold. Future login must be mock-only first. Future KIBO OAuth 2.0 integration is planned, but provider configuration is not confirmed.

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

Information-use consent is not implemented in this scaffold. Real electronic signature provider behavior, consent history, audit event schema, and legal retention rules are open questions.

Audit logging starts in later mock flow PRs when auditable actions exist.
