# Mississippi Speed Instruction Website

Marketing site for Mississippi Speed Instruction (MSI) — Mike Frascogna III's youth
speed-training brand, est. 1993. The site drives registrations for the summer 2026
Boys (June 9–11) and Girls (June 23–25) speed camps at Madison Ridgeland Academy.
Registration itself is handled externally by campnetwork.com.

## Tech Stack

- **Frontend:** React 18 (JSX, no TypeScript) + Vite + Tailwind CSS v3 + React Router v6
- **Animation:** `motion` (framer-motion successor — `import { motion } from 'motion/react'`)
- **Icons:** lucide-react
- **API:** one Vercel serverless function (`api/subscribe.js`) that upserts newsletter
  subscribers to Mailchimp
- **Contact form:** posts to an n8n webhook (URL injected via env / runtime config)
- **No database** — static marketing site

## Project Layout

```
mike-website/
├── frontend/            # Vite + React app (all UI lives here)
│   ├── src/
│   │   ├── api/data/    # Canonical content data (elements.js/.json)
│   │   ├── components/  # layout/, sections/, ui/
│   │   ├── pages/       # Route components
│   │   ├── config.js    # Runtime constants (register URL, camps, Vimeo, webhook)
│   │   └── global.css   # CSS variables + Tailwind directives
│   └── package.json
├── api/subscribe.js     # Vercel serverless: Mailchimp newsletter upsert
├── scripts/             # Scrape + Mailchimp tooling (mjs/py)
├── scrape-output/       # Site-clone artifacts (copy.md, camps.json, brand-assets/)
├── docker-compose.yml   # Local dev container (port 5191)
├── docker-compose.prod.yml / Dockerfile.prod  # Static production image
├── vercel.json          # Deploy config (API-aware rewrites)
├── CLAUDE.md            # Master build instructions
└── MSI-AMENDMENT.md     # Authoritative tiebreaker for content corrections
```

## Local Development

```bash
cd frontend
npm install
npm run dev          # Vite dev server
```

Or via Docker (serves on port **5191**):

```bash
docker compose up --build
```

## Environment Variables

| Variable | Used by | Purpose |
|----------|---------|---------|
| `VITE_N8N_CONTACT_WEBHOOK_URL` | frontend (local Vite) | Contact form target webhook |
| `N8N_CONTACT_WEBHOOK_URL` | Docker prod entrypoint | Written into `/config.js` at container start as `window.__MSI_CONFIG__` |
| `MAILCHIMP_API_KEY` | `api/subscribe.js` | Mailchimp API auth |
| `MAILCHIMP_SERVER_PREFIX` | `api/subscribe.js` | Mailchimp datacenter (e.g. `us21`) |
| `MAILCHIMP_AUDIENCE_ID` | `api/subscribe.js` | Target audience/list ID |

Contact webhook resolution order in `config.js`: `window.__MSI_CONFIG__` (runtime)
→ `VITE_N8N_CONTACT_WEBHOOK_URL` (build-time) → empty string.

## Scripts

From `frontend/`:

- `npm run dev` — Vite dev server
- `npm run build` — production build
- `npm run preview` — preview the production build

Repo-level tooling lives in `scripts/` (Firecrawl scrape, Mailchimp import/upload).

## Routes

| Route | Page |
|-------|------|
| `/` | Home |
| `/camp` | Camp landing (both camps) |
| `/camp/boys` · `/camp/girls` | Camp detail pages |
| `/elements` · `/elements/:slug` | Ten Elements index + detail |
| `/about` → `/about/mike-frascogna` | Mike's bio (redirect) |
| `/about/philip-short` | Philip's bio |
| `/podcast` · `/podcast/:slug` | Podcast hub + episodes |
| `/videos` (`/film` redirects here) | Video library |
| `/contact` | Contact form |
| `*` | Branded 404 |

## Data Sources

- `frontend/src/config.js` — runtime source of truth for camp data, register URL, Vimeo IDs.
- `frontend/src/api/data/elements.js` (+ `elements.json`) — canonical Ten Elements dataset.
- `scrape-output/` — site-clone artifacts (copy, camp data, brand assets) used during the build.
- `MSI-AMENDMENT.md` — authoritative tiebreaker when sources disagree.

## Deployment

- **Vercel** (recommended): deploys from repo root so `/api/subscribe` works. Uses root `vercel.json`.
- **Docker static** (`docker-compose.prod.yml`): builds the frontend and serves it with `serve`.
  Note: this static image does **not** include the `/api/subscribe` route — the newsletter
  endpoint requires a Vercel (or equivalent serverless/Node) host.

## Maintenance Notes

- All "Register" CTAs use `REGISTER_LINK_PROPS` from `config.js` — keep the URL single-source.
- "Philip Short" is **one L** in all display copy, slugs, and paths.
- Dark theme only; no light-mode toggle.
- `MSI-AMENDMENT.md` overrides any conflicting guidance in the brief, live site, or scrape output.
- `WEBSITE_FIX_PLAN.md` tracks the remaining cleanup/hardening backlog.
