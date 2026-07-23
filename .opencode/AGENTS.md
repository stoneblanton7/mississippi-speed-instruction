# mike-website — Mississippi Speed Instruction (project brief)

Rebuild of mississippispeed.com (MSI) — Mike Frascogna III's youth speed-training
brand, est. 1993. Audience: Mississippi parents (30-55) of athletes ages 7-14.
Primary CTA: register for the summer 2026 Boys (June 9-11) or Girls (June 23-25)
speed camps at Madison Ridgeland Academy. Registration is external
(campnetwork.com).

Status: built and substantially complete — all routes live. Remaining work is
cleanup/hardening tracked in `WEBSITE_FIX_PLAN.md`.

## Stack

- React 18 (JSX, **no TypeScript**) + Vite + Tailwind CSS v3 + React Router v6
- Animation: `motion` — import from `'motion/react'`, never `'framer-motion'`
- Icons: lucide-react. Port: **5191**. Docker for dev (`docker compose up`).
- Backend: one Vercel serverless function `api/subscribe.js` (Mailchimp
  newsletter upsert); contact form posts to an n8n webhook. Note: Sam's prod
  deploy is the static Docker path — `/api/*` may not run there.
- Repo: local only, branch `stone-dev`. No GitHub remote yet.

## Conventions

- Dark-only design. Tokens in `frontend/src/global.css` as CSS variables — never
  hardcode hex in components. Accent lime `#C6F73E` used sparingly (home page
  budget ≤ 15 instances).
- Fonts: Anton (display), Oswald italic (ghost hero word only), Inter (body),
  JetBrains Mono (data/stats).
- Every video is a Vimeo embed with IDs from `frontend/src/config.js`.
- All Register CTAs use `REGISTER_LINK_PROPS` from `config.js` — single-source URL.

## Hard "do nots"

- No TypeScript, no Redux, no hardcoded colors, no self-hosted video.
- Philip Short — **one L** everywhere (copy, slugs, paths, component names).
  Audit: `grep -rin "phillip" frontend/src/` → zero hits.
- `MSI-AMENDMENT.md` is the tiebreaker when sources disagree.
- Never put the Mailchimp key or n8n webhook secrets in frontend code or
  `VITE_*` vars.

Docs vault: `docs/` here (`.opencode/docs/`) — see [[MOC]]. Keep this file
consistent with the repo-root `CLAUDE.md` (the Claude Code entry point).
