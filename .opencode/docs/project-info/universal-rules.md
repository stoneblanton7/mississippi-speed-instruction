# Universal rules — mike-website

The contract every agent works under. [[architecture-summary]] is the map;
this is the law. `MSI-AMENDMENT.md` (repo root) is the tiebreaker when brief,
live site, or scrape-output disagree.

## Stack conventions

- React 18 **JSX only** — no TypeScript, no `.tsx`.
- Tailwind CSS v3 with `tailwind.config.js`; colors come from CSS variables in
  `frontend/src/global.css`. Never hardcode hex values in components.
- Animation imports from `'motion/react'`, never `'framer-motion'`.
- Dark-only: `:root` and `.dark` carry identical token values. No theme toggle.
- All video is Vimeo embeds using IDs from `frontend/src/config.js`
  (`VIMEO`, `VIMEO_HASHES`). No self-hosted video.
- Docker-first dev on port **5191**. Host `node_modules` is IntelliSense-only.

## Security rules

- Secrets (Mailchimp API key, list ID, n8n webhook URL) live server-side only —
  never in frontend source, never in `VITE_*` vars, never checked in. `.env` is
  gitignored; keep `.env.example` current when adding vars.
- `api/subscribe.js` validates input (allow-listed parent types, email regex,
  name length cap, honeypot field) — keep that posture on any change.
- External links use the established external-link rule (see MSI-AMENDMENT.md).

## Sacred / single-source

- `frontend/src/config.js` — REGISTER_URL via `REGISTER_LINK_PROPS` (never
  hardcode the register URL elsewhere), `CAMPS` (runtime camp data), `VIMEO`.
- Philip Short — **one L** in all copy, slugs, file paths, component names.
- Home page lime accent budget: ≤ 15 instances.
- No invented stats, no placeholder content.

## Process

- One commit per logical unit, `type: description` format.
- `npm run build` every 3-5 file changes; fix before piling on.
- Reviewer gate before committing anything touching the surfaces listed in
  CLAUDE.md's Agent fleet section. Data-shape changes update [[data-model]]
  before the work is reported done.
