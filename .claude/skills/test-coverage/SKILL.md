---
name: test-coverage
description: Use when adding or modifying backend logic, frontend behavior, permissions/RBAC, background tasks, upload/download flows, workflow state transitions, notifications, or bug fixes. Ensures meaningful test coverage for important behavior.
---

# Test Coverage

Load this skill for feature work, bug fixes, permission changes, workflow/state
transitions, background tasks, upload/download flows, and frontend behavior.

## Rules

- Test behavior, not implementation details.
- Add or update tests in the same change when adding backend services, workflow
  stages, permission logic, notification logic, or frontend flows.
- Role-sensitive code covers BOTH the allowed and the denied path — a frontend test is
  never the only RBAC proof.
- Cover queryset/data scoping for cross-tenant or cross-team leaks.
- Cover invalid state transitions, not just the happy path.
- Cover audit metadata on state transitions and access decisions.
- Cover idempotency where retries are possible (background tasks, notifications).
- Do not mock away the logic being tested. Mock only external delivery, storage, or
  third-party network boundaries when needed.

## Backend Targets

- Service functions for state transitions, sharing/access, and audit events.
- View responses for 200/403/404/409 paths.
- Private file upload/download authorization paths.
- Access policies, permission helpers, ORM constraints, and error translation.
- Background task wrappers and the services they dispatch.
- API schema generation when public request/response shapes change.

## Frontend Targets

- Route visibility and role-specific actions.
- Upload/data states: loading, success, error, empty.

## Check Before Completion

- What user-visible or security-critical behavior changed?
- Is there a test for the happy path AND at least one failure/denied path?
- Did you run the smallest relevant test command and report its output?
