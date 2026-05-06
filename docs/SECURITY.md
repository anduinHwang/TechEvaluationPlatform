# Security

## Mock Authentication

Authentication is mock-only in this PR. The app must not call the future KIBO OAuth login URL and must not include OAuth client IDs, client secrets, tokens, certificates, private keys, or production callback URLs.

## Sensitive Data Classes

- Personal information
- Company confidential data
- Business registration numbers
- Financial/technical data
- Evaluation results
- Uploaded consent forms
- Report files
- Sub-account permissions

## Consent

Information-use consent is represented as a mock consent record with `MOCK_SIGNED`. Real electronic signature provider behavior and legal retention rules are open questions.

## Audit

The backend records audit events for mock login, application creation, consent submission, application submission, and institution list access.
