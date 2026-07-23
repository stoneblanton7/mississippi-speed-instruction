---
name: ci-cd-readiness
description: Use when adding configuration, environment variables, deployment files, API calls, background workers, storage, build scripts, backend services, or anything that must move cleanly from dev to staging to production. Prevents hard-coded values, quick fixes, and dev-only assumptions.
---

# CI/CD Readiness

Load this skill before adding config, env vars, Docker services, deployment code,
service URLs, scripts, storage wiring, background workers, or anything that must
survive dev → staging → prod.

## Rules

- No hard-coded service URLs, database URLs, storage identifiers, role IDs, or
  secrets in application code.
- No hard-coded broker URLs, storage endpoints, bucket names, or queue names in
  application code.
- Put environment-dependent values in env vars and document them in `.env.example`.
- Keep frontend env vars browser-safe. Never expose server API keys through `VITE_*`
  (Vite inlines them into the browser bundle).
- Prefer deterministic scripts over manual console-only setup when a resource must
  exist across environments.
- No quick fixes that only work locally. If a workaround is unavoidable, stop and ask
  the user before implementing it.
- Build and test commands must run from a clean checkout with documented env.
- Docker Compose is the standard execution path for dev, CI, and production. New
  runtime dependencies update every applicable compose file (dev/ci/prod) in the same
  change.
- Schema changes belong in migrations, never manual production DB edits.
- When the project pairs a build-time frontend key with a runtime backend secret
  (captcha, Stripe publishable+secret), document the pair and set both together —
  setting only one half fails silently.

## Check Before Completion

- Would this work in staging with different IDs and URLs?
- Is every required env var documented in `.env.example`?
- Did you avoid local-only paths, localhost-only assumptions, and hidden manual steps?
- Are build/test commands clear enough for CI?
