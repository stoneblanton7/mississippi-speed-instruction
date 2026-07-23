# mike-website — Mississippi Speed Instruction

## What This Is
Rebuild of mississippispeed.com (MSI) — Mike Frascogna III's youth speed-training brand, est. 1993. Audience is parents (30-55, Mississippi) of athletes ages 7-14 who want serious athletic development. Primary CTA: register for the summer 2026 Boys (June 9-11) or Girls (June 23-25) speed camps at Madison Ridgeland Academy.

## Status
Site is built and substantially complete — all routes are live (home, camp landing + boys/girls
detail, ten elements index + detail, both bios, podcast hub + episodes, video library, contact,
404). Newsletter wired to Mailchimp via `/api/subscribe`; contact form posts to an n8n webhook.
Remaining work is cleanup/hardening tracked in `WEBSITE_FIX_PLAN.md` (media optimization, a11y
polish, form/API hardening, lint + smoke tests, deployment hygiene).

## Tech Stack
- **Frontend:** React 18 (JSX, no TypeScript) + Vite + Tailwind CSS v3 + React Router v6
- **Animation:** motion (framer-motion successor — `import { motion } from 'motion/react'`)
- **Icons:** lucide-react
- **Port:** 5191
- **Repo:** local only — GitHub remote not yet created
- **Backend:** one Vercel serverless function (`api/subscribe.js`) for Mailchimp newsletter
  upserts; contact posts to an n8n webhook. Registration handled externally by campnetwork.com.

## Project Structure
```
mike-website/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/    # Navbar, Footer, Layout (Phase 2)
│   │   │   └── ui/        # Reusable primitives
│   │   ├── contexts/      # (none — dark-only, no theme toggle)
│   │   ├── pages/         # 10 route components
│   │   ├── assets/        # Brand assets (32 files copied from scrape-output)
│   │   ├── App.jsx        # All routes
│   │   ├── config.js      # REGISTER_URL, CAMPS, ELEMENTS, VIMEO IDs
│   │   ├── global.css     # CSS variables, Tailwind directives
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── scrape-output/         # Site-clone artifacts from mississippispeed.com
│   ├── copy.md            # Authoritative body copy
│   ├── camps.json         # Authoritative camp data (overrides any other source)
│   ├── videos.json        # 24 unique Vimeo IDs
│   ├── images.json        # Image catalog with sport meter values
│   └── brand-assets/      # 32 image files
├── scripts/               # Firecrawl scrape + extract scripts
├── MSI-AMENDMENT.md       # Build-time corrections (camp data, Philip spelling, etc.)
├── docker-compose.yml
├── Dockerfile
├── .gitignore             # .env, node_modules, dist already excluded
└── CLAUDE.md              # this file
```

## Design System

### Tokens (from build brief)
- **Background:** `#0A0A0A` (near-black, dominant)
- **Surface:** `#141414` / `#1F1F1F` (elevated)
- **Accent (lime, used sparingly):** `#C6F73E`
- **Text:** `#FFFFFF` / muted `#B8B8B8` / dim `#6F6F6F` / ghost `rgba(255,255,255,0.08)`
- **Border:** `#262626` / strong `#404046`
- **Mode:** dark-only (`:root` and `.dark` have identical values)

### Fonts
- **Display headlines:** Anton (400)
- **Ghosted hero word only:** Oswald Italic Semibold (600 italic)
- **Body:** Inter (400/500/600/700)
- **Data/stats/meters:** JetBrains Mono (400/500)

### Creative Dials (one-shot)
- DESIGN_VARIANCE: 7
- MOTION_INTENSITY: 7
- VISUAL_DENSITY: 3 (intentionally restrained)

### Aesthetic
"Cinematic Sports Editorial" — Nike/Jordan youth program. Dark dominant, lime as a precision weapon. Reference: Players Academy, BARC running club, FFL Gym, X-Fit, Xeque Mate.

## Pages / Routes
| Route                        | Page          | Status     |
|------------------------------|---------------|------------|
| `/`                          | Home          | built      |
| `/camp`                      | Camp landing  | built      |
| `/camp/boys`                 | Boys Camp     | built      |
| `/camp/girls`                | Girls Camp    | built      |
| `/elements`                  | Elements grid | built      |
| `/elements/:slug`            | Element detail| built      |
| `/about`                     | → redirects to `/about/mike-frascogna` | built |
| `/about/mike-frascogna`      | Mike's bio    | built      |
| `/about/philip-short`        | Philip's bio  | built      |
| `/podcast`                   | Podcast hub   | built      |
| `/podcast/:slug`             | Episode detail| built      |
| `/videos` (`/film` redirect) | Video library | built      |
| `/contact`                   | Contact       | built      |
| `*`                          | 404 NotFound  | built      |

## What NOT To Break
- `MSI-AMENDMENT.md` is the tiebreaker when brief / live site / scrape-output disagree.
- All Register CTAs use `REGISTER_LINK_PROPS` from `config.js` so the URL stays single-source. Don't hardcode the URL elsewhere.
- Philip Short — **one L** in all display copy, slugs, file paths, and component names. Earlier guidance said two Ls; that was reversed per Stone's instruction. Vimeo asset titles also use one L. Audit: `grep -rin "phillip" frontend/src/` → zero hits.
- Lime budget on the home page: ≤ 15 instances of accent color total.

## Agent fleet (orchestration — mirrors the Warehouse Collective setup)

The main session is the **coder**: talks to Stone, owns architecture decisions,
git, and judgment calls. It delegates via the Agent tool to the in-repo fleet
(`.claude/agents/`):

- `executor` (Opus) — default implementation workhorse; ONE bounded task per
  invocation with files, acceptance criteria, and which skills/conventions apply.
- `executor-light` (Sonnet) — mechanical bulk work: renames, repeated patterns,
  copy edits. Never for the `/api/subscribe` function, env/config, or data-file
  sync work.
- `reviewer` (Sonnet, read-only) — the tripwire gate. Run it BEFORE committing
  anything touching: secrets/env/config (Mailchimp key, n8n webhook URL —
  server-side only, never `VITE_*`), `api/subscribe.js` or the contact-form
  webhook post, `frontend/src/config.js` (REGISTER_URL single-source, CAMPS vs
  MSI-AMENDMENT.md), display copy (Philip — one L), the home page (lime budget
  ≤ 15), or any large diff. HARD findings must be fixed before commit.
- `doc-keeper` (Haiku, docs only) — fire after any milestone that changes what
  the docs describe — feature shipped, architecture/deploy/env change, decision
  made, lesson learned; docs only, never product code, never secrets.

Delegation policy: mechanical → executor-light; normal build tasks → executor;
hardest reasoning/debugging → coder does it itself. Cheap models on purpose.
Agents never run git; the coder commits after the gate. Receipts rule: every
delegation is a visible task block in the transcript — a claim of review with
no reviewer block above it didn't happen.

ERD gate (mandatory, not judgment): any change to a data shape — `config.js`
constants (CAMPS, VIMEO, REGISTER_URL), `frontend/src/api/data/*.js`,
`scrape-output/*.json`, form payloads, or the `/api/subscribe` contract — fires
doc-keeper to update `.opencode/docs/architecture/data-model.md` BEFORE the
work is reported done. The data-model doc is the content↔component contract; a
data-shape change without an update there is a defect.

## Key Data Files
- `frontend/src/config.js` — runtime constants (REGISTER_URL, CAMPS, ELEMENTS, VIMEO)
- `scrape-output/copy.md` — body copy, camps section corrected
- `scrape-output/camps.json` — authoritative camp data
- `scrape-output/videos.json` — Vimeo IDs grouped by section
- `scrape-output/images.json` — sport meter values per skill (encoded in filenames)

## Context Files
- `CLAUDE.md` — this file (master instructions)
- `MSI-AMENDMENT.md` — project-specific corrections
- `scrape-output/` — site-clone artifacts

## Lab Notes
_Project-specific lessons learned. Add entries here when you discover and resolve an issue._

- **Canonical elements data is `frontend/src/api/data/elements.js`.** The old `ELEMENTS` export in
  `config.js` was dead (no importers) and was removed. Note: `components/sections/TenElements.jsx`
  still defines its own local `ELEMENTS` array with home-specific copy — consolidating that into
  `elements.js` (e.g. a `homeOutcome` field) is still pending per `WEBSITE_FIX_PLAN.md` §3.1.
- **Camp data runtime source is `frontend/src/config.js`** (`CAMPS`). `scrape-output/camps.json` is
  derived editorial data, not consumed at runtime — keep both in sync with `MSI-AMENDMENT.md`.
- **Removed dead config:** `WEB3FORMS_ACCESS_KEY` (contact now uses n8n, newsletter uses Mailchimp)
  and the unused `ROUTE_LINKS` constant in `Navbar.jsx`.

## User Preferences
- **Dark only** — no light mode toggle. The same token values apply to `:root` and `.dark` so a stray class change doesn't break the site.
- **Anti-slop reinforcements** — see MSI-AMENDMENT.md for the lime budget, no-invented-stats rule, external-link rule.
- **Sessions over phases** — build in 4-5 sessions, one logical chunk per session. Commit after each phase.
- **Vimeo first** — every video on the site is a Vimeo embed using IDs from `config.js`. No self-hosted video.
