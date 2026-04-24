# mike-website — Mississippi Speed Instruction

## What This Is
Rebuild of mississippispeed.com (MSI) — Mike Frascogna III's youth speed-training brand, est. 1993. Audience is parents (30-55, Mississippi) of athletes ages 7-14 who want serious athletic development. Primary CTA: register for the summer 2026 Boys (June 9-11) or Girls (June 23-25) speed camps at Madison Ridgeland Academy.

## Status
Scaffold complete (Phases 1-2 of build-site). Home page hero + content next.

## Tech Stack
- **Frontend:** React 18 (JSX, no TypeScript) + Vite + Tailwind CSS v3 + React Router v6
- **Animation:** motion (framer-motion successor — `import { motion } from 'motion/react'`)
- **Icons:** lucide-react
- **Port:** 5191
- **Repo:** local only — GitHub remote not yet created
- **Backend:** none — static marketing site, registration handled externally by campnetwork.com

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
├── MSI-AMENDMENT.md       # Build-time corrections (camp data, Phillip spelling, etc.)
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
| `/`                          | Home          | stub       |
| `/camp`                      | Camp landing  | stub       |
| `/camp/boys`                 | Boys Camp     | stub       |
| `/camp/girls`                | Girls Camp    | stub       |
| `/elements`                  | Elements grid | stub       |
| `/elements/:slug`            | Element detail| stub       |
| `/about`                     | About landing | stub       |
| `/about/mike-frascogna`      | Mike's bio    | stub       |
| `/about/phillip-short`       | Phillip's bio | stub       |
| `/contact`                   | Contact       | stub       |

## What NOT To Break
- `MSI-AMENDMENT.md` is the tiebreaker when brief / live site / scrape-output disagree.
- All Register CTAs use `REGISTER_LINK_PROPS` from `config.js` so the URL stays single-source. Don't hardcode the URL elsewhere.
- Phillip Short — **two Ls** in display copy. The Vimeo asset titles still read "Philip" (one L) on the asset; we re-label on-page without renaming the source. Phase 6 grep audit: `grep -rn "Philip[^l]" frontend/src/` → zero hits.
- Lime budget on the home page: ≤ 15 instances of accent color total.

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

## User Preferences
- **Dark only** — no light mode toggle. The same token values apply to `:root` and `.dark` so a stray class change doesn't break the site.
- **Anti-slop reinforcements** — see MSI-AMENDMENT.md for the lime budget, no-invented-stats rule, external-link rule.
- **Sessions over phases** — build in 4-5 sessions, one logical chunk per session. Commit after each phase.
- **Vimeo first** — every video on the site is a Vimeo embed using IDs from `config.js`. No self-hosted video.
