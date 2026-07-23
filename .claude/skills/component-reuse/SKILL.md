---
name: component-reuse
description: Use when adding or modifying frontend UI, backend helpers, services, or repeated patterns. Promotes reusing existing components/modules when it makes sense without over-abstracting one-off code.
---

# Component Reuse

Load this skill before adding new UI components, backend helpers, service functions,
or repeated workflow logic.

## Rule

Reuse an existing component or module when the new code has the same purpose, shape,
and behavior as something already in the project. Do not copy/paste a similar
component and drift it independently.

## Frontend

- Search `frontend/src/components/` (and the relevant portal/section) before creating
  a new component.
- Prefer extracting shared UI only after a second real use case appears.
- Keep page/portal-specific components local until they are genuinely shared.
- Reuse layout, status badge, card, table, upload, and empty-state components when
  behavior matches.

## Backend

- Search the backend service modules before adding new business logic.
- Keep repeated ORM access, permission checks, notifications, and audit writes in
  service helpers.
- Keep repeated role rules in centralized access policy classes instead of duplicating
  inline checks across views.
- Do not create a helper for a single tiny one-off unless it clarifies a complex
  workflow.

## Check Before Completion

- Did you search for an existing component/module first?
- If you duplicated structure, is there a real reason?
- If you extracted a shared component, does it have at least two real callers?
