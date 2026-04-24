# MSI — Build Site Brief

This is the single source of truth for the Mississippi Speed Instruction website rebuild. It plugs directly into the `build-site` skill orchestrator. Run this in Claude Code with all relevant skills already installed.

---

## Quick Start Template

```
Read CLAUDE.md and all skills in .claude/skills/ before starting.

# Mississippi Speed Instruction Website — Build Site Workflow

**Client:** Mississippi Speed Instruction (MSI)
**Business:** Youth speed training program — summer camps + year-round instruction
**Founder:** Mike Frascogna III, est. 1993
**Lead Coach:** Phillip Short (two Ls — live site has typo "Philip", fix on import)
**Location:** Madison Ridgeland Academy, Madison, MS
**Audience:** Parents (30-55, middle-to-upper-middle income, Mississippi) of young athletes ages 6-14 who want serious athletic development for their kid — NOT a fun summer camp
**Primary CTA:** Register for Speed Camp (external URL — see below)
**Pages:** Home, Camp (with /boys + /girls sub-pages), Elements (with /:slug detail pages), About (with /mike-frascogna + /phillip-short sub-pages), Contact
**Style:** Custom — "Cinematic Sports Editorial" (Nike/Jordan youth program aesthetic). Dark dominant, lime as a precision weapon. Reference Pinterest pins captured in conversation history: Players Academy, BARC running club, FFL Gym stat treatment, X-Fit dark + lime palette, Xeque Mate curriculum reveal.
**Colors:** Black dominant (#0A0A0A), MSI lime as accent only (#C6F73E). See "Tokens" section below for full palette.
**Fonts:** Anton (display headlines), Oswald Italic Semibold (ghosted hero word only), Inter (body), JetBrains Mono (stats/data). NOT a named pairing from one-shot's table.
**Creative Dials:** DESIGN_VARIANCE: 7, MOTION_INTENSITY: 7, VISUAL_DENSITY: 3

**Docker port:** 5191

Follow .claude/skills/build-site/SKILL.md phases 1-7 exactly, with the deviations documented below.
Commit after each phase. Run npm run build after each phase.
DO NOT use placeholder content anywhere — pull real copy from /scrape-output/copy.md.
```

---

## Required Inputs (already prepared)

Before running `build-site`, verify these exist in the project:

- `/scrape-output/` — site-clone output from mississippispeed.com (15 pages, 27 Vimeo URLs, 32 brand assets)
- `/scrape-output/copy.md` — all real copy from the existing site
- `/scrape-output/videos.json` — all Vimeo IDs grouped by section
- `/scrape-output/brand-assets/logo.svg` + `logo-white.png` + 10 skill icons + Mike's portrait + Phillip's portrait
- `image-queue.json` at project root — Kie.ai prompts for 7 cinematic images (run separately via `image-gen` skill before Phase 3)
- `/MSI-AMENDMENT.md` — project-specific corrections to apply throughout the build (camp dates, registration URL, Phillip spelling fix on imports, etc.)

If `/scrape-output/` doesn't exist, run `site-clone` skill on `https://mississippispeed.com/` first.

---

## Tokens (Phase 1 override)

These replace the `design-system` defaults. MSI is dark-only — light mode CSS variables get the same dark values so any inadvertent `.dark` toggle doesn't break the site.

```css
:root, .dark {
  /* Backgrounds */
  --color-bg: #0A0A0A;
  --color-surface: #141414;
  --color-surface-elevated: #1F1F1F;

  /* Accent — MSI lime, used SPARINGLY */
  --color-accent: #C6F73E;
  --color-accent-hover: #D4F95E;
  --color-accent-pressed: #9BC52F;
  --color-accent-soft: rgba(198, 247, 62, 0.08);

  /* Text */
  --color-text: #FFFFFF;
  --color-text-muted: #B8B8B8;
  --color-text-dim: #6F6F6F;
  --color-text-ghost: rgba(255, 255, 255, 0.08);  /* for the ghosted SPEED hero word */
  --color-text-inverted: #0A0A0A;

  /* Borders */
  --color-border: #262626;
  --color-border-strong: #404046;

  /* Overlays — for hero video gradient */
  --color-overlay-top: rgba(10, 10, 10, 0.6);
  --color-overlay-bottom: rgba(10, 10, 10, 0.9);

  /* Status — keep one-shot defaults */
  --color-success: #16A34A;
  --color-warning: #F59E0B;
  --color-error: #DC2626;

  /* Typography */
  --font-heading: 'Anton', sans-serif;
  --font-heading-italic: 'Oswald', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Shape, depth — one-shot defaults */
}
```

Tailwind config maps every variable. **Zero hardcoded hex values in any component file** — `build-site` Phase 6 anti-slop checklist already enforces this.

Google Fonts link in `index.html`:
```
https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Oswald:ital,wght@1,600&display=swap
```

---

## Constants (Phase 1)

Add to `frontend/src/config.js`:

```jsx
export const REGISTER_URL = 'https://portal.campnetwork.com/Register/Register.php?camp_id=398473';

export const CAMPS = {
  boys: {
    name: 'Boys Speed Camp',
    dates: 'June 9-11, 2025',
    time: '1:00–3:30 PM',
    ages: '6-12',
    spots: 40,
    cost: 135,
    location: 'Madison Ridgeland Academy',
  },
  girls: {
    name: 'Girls Speed Camp',
    dates: 'June 23-25, 2025',
    time: '4:00–5:45 PM',
    ages: '7-14',
    spots: 50,
    cost: 115,
    location: 'Madison Ridgeland Academy',
  },
};
```

Pull final values from `/scrape-output/camps.json` if it exists — those override the above.

---

## Conversion Stack Deviations

`build-site` Phase 4 follows the `landing-page` Conversion Stack (Hero → Trust Bar → Problem → Solution → Social Proof → Benefits → How It Works → Pricing → Final CTA → FAQ). For MSI, the stack is reorganized:

| Default Section | MSI Replacement |
|---|---|
| Trust Bar | **Stat Strip** — 4 stats (`30+ YEARS`, athletes count from scrape, `8:1 RATIO`, `10 ELEMENTS`). Verify each stat from `copy.md` — remove any that can't be sourced. White on black, no lime borders. |
| Problem | **Skip** — parent audience already knows the problem. Cinematic hero IS the problem-solution combined. |
| Solution | **Two Camps Section** — side-by-side cards for Boys + Girls camps with scarcity counters and external register links via REGISTER_URL constant. |
| Social Proof | **Skip** — Mike has no testimonials yet. Add later when real quotes exist. |
| Benefits | **Ten Elements** — sticky pinned scroll-reveal of all 10 elements with parent-outcome copy. Replaces standard benefits grid. Use Framer Motion `useScroll`. Use scraped skill icon PNGs from `/scrape-output/brand-assets/skill-icon-*.png`. |
| How It Works | **Film Room** — three featured Vimeo videos as cards with play modal. Use top 3 from `videos.json` `home_featured`. |
| Pricing | **Built By The Best** — editorial coach intro: Mike's portrait + bio pullquote + Phillip lead-in strip. Pricing handled inline within Two Camps cards. |
| Final CTA | **Speed Camp Final Block** — headline `SPEED CAMP`, two CTAs (`REGISTER BOYS CAMP` + `REGISTER GIRLS CAMP`), both pointing to REGISTER_URL. |
| FAQ | **Skip** — parents won't engage. Move to Contact page if Mike requests later. |

---

## Hero Specifics (Phase 3)

`build-site` Phase 3 builds Hero + Trust Bar. For MSI:

- **Background:** Vimeo loop using `home_hero` ID from `videos.json`. Embed as background with `?background=1&autoplay=1&loop=1&muted=1`. Dark gradient overlay using `--color-overlay-top` to `--color-overlay-bottom`. Static fallback: `hero-fallback.jpg` from Kie.ai queue.
- **Ghosted SPEED:** Massive italic word ~450px desktop, positioned absolute, bleeds off right edge, color `--color-text-ghost`, font `--font-heading-italic` (Oswald Italic). This is the Players Academy compositional trick.
- **Content layer:** eyebrow (`MISSISSIPPI SPEED INSTRUCTION — EST. 1993` in lime, letter-spaced), headline (`FASTER ATHLETES / START HERE.` in Anton, 140-180px desktop, two lines), sub-copy (`Three days. Ten elements. One faster athlete.`), two CTAs (`REGISTER FOR CAMP →` lime fill external link to REGISTER_URL, `WATCH THE FILM` ghost button opens VideoModal).
- **30-Year badge:** Use `thirty-years-icon.png` from brand assets, 60px, top-right of hero content area, subtle fade-in on load.
- **Stat row:** thin strip at bottom of viewport, 4 stats in `font-mono`, separated by border dividers.
- **No Trust Bar separately** — the stat row in the hero IS the trust signal. Skip the standard Trust Bar section.

---

## Sticky Register CTA (custom component, Phase 6)

Add to Phase 6 polish: floating register button bottom-right, appears after scrolling past hero, links to REGISTER_URL externally. Desktop only for v1. Pulse animation every 4 seconds. Anti-slop check: no `rounded-full` on the button container itself if it'd look pill-on-card weird — use `rounded-lg` consistent with other primary CTAs.

---

## Multi-Page Routing (Phase 2 expansion)

`build-site` Phase 2 builds Layout + Navigation. Default assumes single page. MSI needs:

```
/ → Home
/camp → Camp landing (shows both camps)
/camp/boys → Boys Camp detail
/camp/girls → Girls Camp detail
/elements → Elements grid (all 10)
/elements/:slug → Element detail (magazine layout)
/about → About landing (with football scroll-pass animation)
/about/mike-frascogna → Mike's full bio
/about/phillip-short → Phillip's full bio
/contact → Contact form
```

In Phase 2, scaffold all 10 routes with placeholder pages. Phase 3 builds Home only. Subsequent build sessions add Camp, Elements, About, Contact one at a time — those will be separate `build-site` runs OR a continuation with explicit phase tracking.

**Nav links:** `Camp / Elements / About / Contact` + persistent `REGISTER` button (lime fill, links externally to REGISTER_URL with `target="_blank"`).

---

## Anti-Slop Reinforcements (specific to MSI)

`one-shot` skill's anti-slop rules apply globally. Additional MSI-specific rules:

- **Lime budget:** No more than 15 instances of accent color across the home page. Lime is for: register CTAs (4-5 instances), nav register button, hover states, single accent dividers (1 per section max), eyebrow text. NOT for stat numbers, NOT for icon backgrounds, NOT for card borders. Phase 6 audit enforces this with grep.
- **No invented credentials:** When writing Mike's bio section, pull from scrape only. Do not invent CSCS, USA Weightlifting, or any cert Mike doesn't actually claim.
- **No invented stats:** Hero stat row stats come from verifiable scraped copy. If a number can't be confirmed, remove it. 3 real stats > 4 fake stats.
- **Phillip with two Ls everywhere:** Live site has typo "Philip". When importing copy from `copy.md`, replace `Philip` → `Phillip` (preserve case). Grep audit in Phase 6: `grep -rn "Philip[^l]" frontend/src/` returns zero hits.
- **External register links:** Every register CTA on the site uses `target="_blank" rel="noopener noreferrer"` — parents don't lose their place on MSI when registering.

---

## Phase Tracking

`build-site` runs phases 1-7 sequentially. Realistic split for MSI:

| Session | Phases | Pages built |
|---|---|---|
| 1 | 1-2 (scaffold + layout) | All routes stubbed |
| 2 | 3-4 (hero + content sections) | Home page complete |
| 3 | 5 (contact + final CTA) | Contact page + Home final CTA |
| 4 | 6-7 (polish + a11y audit) | Home page shipped |
| 5+ | New build-site runs for Camp, Elements, About | Each page in its own session |

Run `image-gen` skill (using `image-queue.json`) **between sessions 1 and 2** so all images are in `frontend/src/assets/` before hero/content are built.

---

## Out of Scope for v1

These are explicitly NOT part of the home page build:

- Football scroll-pass animation on About page (separate spec at `02-about-page-football-pass.md`, separate `build-site` session)
- Skill detail pages magazine layout (separate Elements detail spec — TBD)
- Real testimonials (none exist yet)
- FAQ accordion (audience won't use it)
- Light mode (MSI is dark-only)
- Mobile sticky register CTA (desktop-only for v1)
- Coaches roster page (cut earlier in planning)

If anything in the above list comes up during build, defer it and flag for Stone — don't expand scope mid-phase.

---

## Definition of Done

Home page is shippable when:

1. All 11 sections from build-site Phase 3-5 deliverables exist (with MSI deviations applied)
2. `npm run build` passes with zero errors and zero warnings
3. Phase 7 a11y audit scores ≥ 93/100
4. No hardcoded hex/rgb values in any `.jsx` file (grep check)
5. No instance of "Philip" with one L anywhere in source (grep check)
6. Lime accent count ≤ 15 across home page
7. All Vimeo videos load correctly (test 3 random IDs)
8. All register CTAs link to REGISTER_URL externally with new-tab behavior
9. Site renders correctly at 375px, 768px, 1280px, 1920px
10. Stone has reviewed at `localhost:5191` and approved
