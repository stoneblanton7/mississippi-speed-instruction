---
name: centralized-settings
description: Use when adding or changing storage paths, database URLs, broker/queue settings, bucket names, file URL builders, AI providers, LLM models, or other environment-dependent knobs. Keeps dev, staging, and production changes centralized and documented.
---

# Centralized Settings

Load this skill before adding or changing storage paths, file naming schemes, database
URLs, storage identifiers, broker/result URLs, AI provider/model settings, service
URLs, or any knob that may differ between dev, staging, and production.

This is a narrow companion to `ci-cd-readiness`: use it to keep operational settings
easy to find and change.

## Rules

- Put environment-dependent values in one central config module per runtime, not
  inline in views, components, jobs, or service methods.
- Keep storage identifiers, database URLs, endpoints, public base URLs, and file URL
  builders behind named settings or helpers.
- Keep AI provider, model names, timeout values, temperature, retry limits, and tool
  enablement in backend-only config — a model name like `gpt-*` or `claude-*` inside
  business logic is a red flag.
- Read secrets from environment only. Never expose keys, secrets, database URLs, or
  privileged tokens through frontend `VITE_*` variables or checked-in `.env` files.
- Treat path templates as configuration: centralize object prefixes, temp upload
  roots, generated artifact paths, and signed-URL construction.
- Do not duplicate the same literal across frontend, backend, jobs, and scripts — if
  two places need it, create or reuse a shared constant/helper per runtime boundary.
- Document every required env var in `.env.example`; keep Docker env wiring
  (`.env.example`, `.env`, compose files) together in the same change.

## Preferred Shape

- Backend: a single settings module loads env vars; services receive settings or
  import the settings object consistently.
- Frontend: only browser-safe API base URLs and public feature flags use `VITE_*`;
  API URL construction lives in one client helper.
- Scripts read the same env var names as the app.

## Check Before Completion

- Can staging swap storage, URLs, and AI models by changing env/config only?
- Is there ONE obvious place to change each path, model choice, timeout, and endpoint?
- Are secrets backend-only and absent from `VITE_*`?
- Is `.env.example` updated for every new required setting?
