---
name: frontend-conventions
description: Use when modifying frontend/src/ in any React project. Covers JSX-only React, Tailwind CSS, single API client usage, no frontend secrets, and no UI-only RBAC.
---

# Frontend Conventions

Use this before editing `frontend/src/` (or the project's React source root).

## Rules

- JSX only. No `.ts` or `.tsx`.
- Functional components with hooks (useState/useReducer — no Redux or state libraries).
- Tailwind CSS for styling; colors come from CSS variables mapped in
  `tailwind.config.js`, never hardcoded hex in components.
- No emojis in UI.
- All API calls go through the project's single client helper (e.g.
  `frontend/src/lib/api.js`) — no scattered `fetch` calls with hand-built URLs.
- Frontend interacts only with the backend's APIs for scoped data,
  authentication-backed actions, and file access.
- Frontend route guards improve UX but never replace server-side RBAC.
- Never add secrets, database URLs, storage credentials, or privileged tokens to
  frontend env vars (`VITE_*` is inlined into the browser bundle).
- No direct database clients, direct storage calls, or JSON demo-data persistence as
  a production data path.
