# Plans

## Execution Order

1. PR 0-1: Project guidance and FO requirements baseline.
2. PR 1-1: Spring Boot and Next.js mock app scaffold.
3. PR 1-2: H2 mock domain baseline.
4. PR 2-1: Mock login flow.
5. PR 2-2: Role-aware main dashboards.
6. PR 3: KTRS-FM vertical slices.
7. Later phases: common content, TECH-INDEX, Source Technology, Investment Model, BIGx Report, My Page, bulk evaluation, CI hardening, responsive/accessibility passes, and back-office boundary.

## Rule

Do not implement future PR items early. Each PR must stay within its declared scope.

If an out-of-sequence mock implementation has already landed on `main`, do not delete it from a documentation PR. Continue future work by reconciling the existing mock implementation with this plan in small, reviewable PRs.
