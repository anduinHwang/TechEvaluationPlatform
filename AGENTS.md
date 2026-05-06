# AGENTS.md

Behavioral and project rules for agents working on the Technology Evaluation Integrated Platform.

## Think Before Coding

- Read `AGENTS.md`, `ARCHITECTURE.md`, and relevant `docs/product-specs/*` before implementation.
- State assumptions when requirements are unclear.
- If product documents conflict, stop and report the conflict.
- Do not silently choose between conflicting requirements.

## Simplicity First

- Implement the smallest change that satisfies the current PR.
- Do not implement future PR scope early.
- Do not add abstractions, integrations, or configurability that the current PR does not require.

## Surgical Changes

- Stay within the current PR's scope.
- Do not refactor unrelated code.
- Clean up only artifacts introduced by the current task.
- Every changed line should trace back to the requested PR.

## Goal-Driven Execution

- Every PR must include validation results.
- Backend behavior must use JUnit tests.
- Frontend E2E flows must use Playwright when UI behavior changes.
- If validation cannot run, explain the concrete blocker in the PR body.

## Product Policy Guardrails

- Login is mock-only until OAuth 2.0 integration details are confirmed.
- Do not implement real KIBO OAuth.
- Do not call `https://www.kibo.or.kr/oauth/login/id` from application code.
- Do not hardcode secrets, OAuth client IDs, client secrets, certificates, tokens, private keys, production callback URLs, or real credentials.
- Do not invent scoring formulas, grade thresholds, paid/free membership policy, billing policy, refund policy, certificate login behavior, electronic signature provider behavior, guarantee recommendation logic, report templates, legal retention rules, or production integration details.
- If policy is missing, add or update `docs/product-specs/open-questions.md`.

## Validation Expectations

Use the lightest validation that matches the PR scope.

- Documentation-only changes: check the documentation tree, run `git diff --check`, and search for conflict markers.
- Backend behavior changes: run JUnit tests, typically `npm run backend:test` when root scripts are available or the Gradle test command in `apps/api`.
- Frontend UI changes: run frontend lint/typecheck/build where available and Playwright for affected flows.
- Do not spend time installing unrelated dependencies for a documentation-only PR unless a configured doc check requires it.
