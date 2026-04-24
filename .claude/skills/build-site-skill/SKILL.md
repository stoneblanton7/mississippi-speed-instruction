---
name: build-site
description: Orchestrate a complete website build from scratch using the full skill chain. Use this skill whenever starting a new website, client prototype, or Revenue Reveal build. Chains design-system → one-shot → landing-page → local-biz-web → scroll-stop → a11y-audit into a structured 7-phase build with commits after each phase. Triggers on any mention of new website, new client site, build a site, start a project, new prototype, Revenue Reveal build, or full website build.
---

# Build Site Orchestrator Skill

This skill chains your individual skills into a complete website build pipeline. It replaces the manual 7-prompt workflow with a single structured plan that Claude Code executes phase by phase.

**Read this entire file before writing any code.**

---

## Before You Start

### Required Information

Before Phase 1, you MUST have answers to these questions. If Stone hasn't provided them, ASK — don't guess:

1. **Client name** — who is this for?
2. **Business type** — what industry? (restaurant, law firm, contractor, SaaS, etc.)
3. **Target audience** — who visits this site?
4. **Primary CTA** — what's the #1 action visitors should take? (call, book, buy, sign up)
5. **Pages needed** — homepage only? + about? + services? + contact?
6. **Style direction** — any reference sites, mood words, or aesthetic vocabulary? (see design-system skill for named styles: Linear, Glassmorphism, Minimal Luxury, etc.)
7. **Color direction** — brand colors, or pick from industry defaults?
8. **Content source** — does Stone have real copy, or should Claude write it from research?

### Required Skills Check

Verify these skills exist before proceeding. Read each one at the start of the session:

```
.claude/skills/design-system/SKILL.md    — tokens, typography, component specs
.claude/skills/one-shot/SKILL.md         — creative dials, anti-slop, Button.jsx
.claude/skills/landing-page/SKILL.md     — conversion stack, section blueprints
.claude/skills/local-biz-web/SKILL.md    — local business patterns, Jackson MS market
.claude/skills/scroll-stop/SKILL.md      — animations, scroll reveals, parallax
.claude/skills/a11y-audit/SKILL.md       — WCAG audit, scoring, remediation
```

If any skill is missing, tell Stone which one and stop. Do not improvise — the skills contain specific research-backed rules that generic defaults will violate.

---

## The 7-Phase Build

Each phase has a clear deliverable, specific skill references, and a commit. Do NOT skip phases. Do NOT combine phases. Run `npm run build` after each phase to catch errors before they cascade.

---

### Phase 1: Scaffold + Design Foundation
**Read:** `design-system/SKILL.md` (full file)
**Read:** `one-shot/SKILL.md` (Creative Dials section)

**Deliverables:**
- [ ] Project initialized: `npm create vite@latest . -- --template react` → install Tailwind CSS v3 → configure `tailwind.config.js`
- [ ] Google Fonts loaded in `index.html` (pick pairing from design-system Font Pairing table based on industry)
- [ ] `global.css` with full CSS variable set (`:root` + `.dark`) — use exact hex values, no placeholders
- [ ] `tailwind.config.js` extended with all token mappings (colors, fonts, radius, shadows)
- [ ] `ThemeContext.jsx` with dark/light toggle + localStorage persistence
- [ ] Project folder structure created:
  ```
  src/
  ├── components/
  │   ├── layout/        # Navbar, Footer, Layout
  │   └── ui/            # Button, Card, Badge, Modal, Toast
  ├── contexts/          # ThemeContext
  ├── hooks/             # useScrollReveal
  ├── pages/             # One folder per page
  ├── assets/            # Images, videos
  └── App.jsx            # Routes
  ```
- [ ] Creative Dials set (get from Stone or use defaults: DESIGN_VARIANCE: 6, MOTION_INTENSITY: 5, VISUAL_DENSITY: 4)

**Build check:** `npm run build` — must pass with zero errors.

```
Commit: "scaffold: project init with design tokens, theme context, folder structure"
```

---

### Phase 2: Layout Shell + Navigation
**Read:** `design-system/SKILL.md` (Navigation spec)
**Read:** `local-biz-web/SKILL.md` (Phone Number Treatment — if local business)
**Read:** `landing-page/SKILL.md` (Remove Navigation rule — if landing page)

**Deliverables:**
- [ ] `Layout.jsx` wrapping `<Outlet />` with Navbar + Footer
- [ ] `Navbar.jsx`:
  - Sticky, glassmorphism on scroll (`bg-bg/80 backdrop-blur-md`)
  - Logo left, nav links center, CTA right
  - Mobile hamburger → full-screen overlay menu
  - Phone number prominent if local business (click-to-call on mobile)
  - Theme toggle (sun/moon icon)
  - 5-7 nav items max
- [ ] `Footer.jsx`:
  - Business info (name, address, phone, hours if local)
  - Navigation links mirror main nav
  - Social media icons
  - Copyright with current year (dynamic)
  - If local business: NAP (Name, Address, Phone) for local SEO
- [ ] `App.jsx` with React Router v6 routes configured for all planned pages
- [ ] All pages exist as stub components (just return a div with the page name)

**Build check:** `npm run build` — must pass. Verify nav renders on localhost.

```
Commit: "layout: navbar with mobile menu, footer, routing, page stubs"
```

---

### Phase 3: Hero + Trust Bar
**Read:** `landing-page/SKILL.md` (Hero Section + Trust Bar blueprints)
**Read:** `one-shot/SKILL.md` (Button.jsx — Dot Expand pattern)
**Read:** `scroll-stop/SKILL.md` (Hero animation patterns)

**Deliverables:**
- [ ] `Button.jsx` component built (Dot Expand pattern from one-shot skill with CSS variable tokens)
- [ ] Hero section with:
  - Headline: 6-12 words, 5th-7th grade reading level, REAL copy for this client
  - Subheadline: who it's for + key benefit + differentiator
  - Primary CTA using Button.jsx (first-person copy: "Get My Free Quote", "Book My Appointment")
  - Supporting proof line ("Trusted by 500+ businesses" or star rating)
  - Layout: split hero (local biz) or centered (SaaS) — pick based on business type
  - Background: image, video, or gradient based on Stone's direction
- [ ] Trust Bar immediately below hero:
  - 4-6 items: Google rating, years in business, certifications, client count
  - Grayscale treatment, subtle background differentiation
- [ ] Hero entrance animation (fade-up + stagger timing from scroll-stop skill)

**Build check:** `npm run build` — must pass. Screenshot hero on desktop and mobile widths.

```
Commit: "hero: headline, CTA, trust bar with entrance animations"
```

---

### Phase 4: Content Sections
**Read:** `landing-page/SKILL.md` (Problem → Solution → Social Proof → Benefits → How It Works)
**Read:** `local-biz-web/SKILL.md` (Services Overview, About/Story, Service Area — if local)
**Read:** `scroll-stop/SKILL.md` (useScrollReveal hook, stagger patterns)

**Deliverables:**
- [ ] `useScrollReveal.js` hook in `hooks/` folder
- [ ] All content sections built in Conversion Stack order:
  - **Services/Features** — cards with icons, real descriptions, links to detail pages if multi-page
  - **About/Story** — owner photo area + narrative (especially important for local businesses)
  - **Social Proof** — testimonials with real names, cities, specific details (never generic)
  - **Benefits** — tied to outcomes, not feature lists
  - **How It Works** — 3-step numbered process (only if service is complex)
  - **Pricing/Offer** — if applicable for this client
- [ ] Every section uses `useScrollReveal` for entrance animations
- [ ] Stagger delays on card grids (100ms increments)
- [ ] All content is REAL — no Lorem ipsum, no "John Doe", no placeholder descriptions
- [ ] If content doesn't exist yet, write it based on the business research or tell Stone what's needed

**Build check:** `npm run build` — must pass. Scroll through entire page on localhost.

```
Commit: "content: services, about, testimonials, benefits sections with scroll reveals"
```

---

### Phase 5: Contact + Final CTA + FAQ
**Read:** `landing-page/SKILL.md` (Final CTA, FAQ section)
**Read:** `local-biz-web/SKILL.md` (Contact section, Service Area)
**Read:** `design-system/SKILL.md` (Input/Form Field specs)

**Deliverables:**
- [ ] Contact section:
  - Simple form: 3-4 fields max (name, phone, email, message)
  - Inputs follow design-system spec (48px height, 16px font, proper focus rings)
  - Form submit shows success toast (use ToastContext or simple state)
  - Phone number and address displayed alongside form
  - If local: embedded map placeholder or service area list
- [ ] Final CTA section:
  - Urgency-driven headline
  - Same CTA button as hero (consistency)
  - Supporting social proof nearby
- [ ] FAQ accordion:
  - 5-8 real questions with real answers
  - Smooth expand/collapse animation
  - Questions address actual objections for this business type
- [ ] Service Area section (local businesses only):
  - List of cities/neighborhoods served
  - Important for local SEO

**Build check:** `npm run build` — must pass.

```
Commit: "contact: form, final CTA, FAQ accordion, service area"
```

---

### Phase 6: Visual Polish Pass
**Read:** `scroll-stop/SKILL.md` (full file — micro-interactions, hover effects, CSS animations)
**Read:** `one-shot/SKILL.md` (Creative Dials — check current MOTION_INTENSITY setting)
**Read:** `design-system/SKILL.md` (Anti-Patterns checklist)

**Deliverables:**
- [ ] Hover effects on all interactive elements (buttons, cards, links, nav items)
- [ ] Consistent spacing audit — verify all sections use `py-16 md:py-24` rhythm
- [ ] Mobile responsiveness verified at 375px, 768px, 1024px, 1440px
- [ ] Dark mode verified — every section, every component
- [ ] Image optimization: lazy loading on below-fold images, proper sizing
- [ ] Typography hierarchy check: H1 > H2 > H3 > body consistently applied
- [ ] No dead buttons — every clickable element does something (navigate, scroll, open modal, show toast)
- [ ] No raw hex values in components — all colors from CSS variables
- [ ] No placeholder content anywhere — full scan of all text
- [ ] Smooth scroll behavior on anchor links
- [ ] Page transitions or section reveals feel cohesive (consistent timing, same easing)
- [ ] Favicon and page title set

**Anti-slop checklist (from one-shot skill):**
- [ ] No generic gradient backgrounds that serve no purpose
- [ ] No "Learn More" buttons — every CTA has specific, first-person copy
- [ ] No stock photo placeholder boxes
- [ ] No components with identical styling repeated 6 times in a row (vary the rhythm)
- [ ] No Tailwind class strings over 200 characters (extract to component)

**Build check:** `npm run build` — must pass. Full scroll-through on desktop AND mobile.

```
Commit: "polish: hover effects, spacing audit, responsive fixes, dark mode verification"
```

---

### Phase 7: Accessibility Audit + Final
**Read:** `a11y-audit/SKILL.md` (full file)

**Deliverables:**
- [ ] Run full WCAG 2.1 AA audit using a11y-audit skill methodology
- [ ] Score all 6 categories (Contrast, Keyboard, Screen Reader, Touch Targets, Motion, Color Independence)
- [ ] Fix all Critical and High issues immediately
- [ ] Fix Medium issues if time allows
- [ ] Re-audit until overall score ≥ 93/100
- [ ] Write audit report to `ACCESSIBILITY_AUDIT.md` in project root
- [ ] Add `<meta>` tags: title, description, viewport, Open Graph basics
- [ ] Add schema markup (LocalBusiness JSON-LD if local business)
- [ ] Final `npm run build` — zero errors, zero warnings
- [ ] Verify site runs clean on localhost

```
Commit: "a11y: accessibility audit 93+, meta tags, schema markup"
```

---

## Build Rules (Apply to ALL Phases)

### Error Prevention
- Run `npm run build` after EVERY phase — not just at the end
- If the build fails, fix it IMMEDIATELY before moving to the next phase
- Never batch more than 5-7 file changes without a build check

### Content Rules
- Zero placeholder content at any point — write real copy or flag what's missing
- Testimonials need: real first name, city, specific detail about their experience
- Business stats need real numbers or realistic estimates (not "100+" if they've been open 2 years)

### Asset Rules
- `git add` all image and video files alongside the code that references them
- Verify files are tracked with `git status` before committing
- Images go in `src/assets/` — reference with standard import
- Use inline SVGs for icons (Lucide React) — avoid icon libraries that break Docker builds

### Docker Rules
- All projects run in Docker — do not run `npm install` locally
- After all phases complete: `docker compose down && docker compose up --build`
- If Docker cache is corrupted: `docker compose down && docker builder prune -f && docker compose up --build`
- Never kill ports 5173 or 5174 without asking Stone first

### Commit Rules
- One commit per phase minimum
- Commit message format: `"type: description"` (scaffold, layout, hero, content, contact, polish, a11y)
- Never batch all phases into one commit
- Commit AFTER the build check passes, not before

---

## Choosing the Right Sub-Skills

Not every build needs every skill. Here's when to apply each:

| Skill | Always | When Applicable |
|-------|--------|-----------------|
| design-system | ✅ Every build | — |
| one-shot | ✅ Every build | — |
| landing-page | — | Single-page sites, lead gen, sales pages |
| local-biz-web | — | Any Jackson/local/brick-and-mortar business |
| scroll-stop | ✅ Every build | — |
| a11y-audit | ✅ Every build | — |
| spline-3d | — | Only if Stone requests 3D elements |

For **SaaS sites**: skip local-biz-web, lean heavily on landing-page + design-system Aurora/Linear/Glassmorphism styles.

For **local business sites**: use local-biz-web as the primary guide, landing-page for section structure, and design-system Minimal Luxury or Soft/Pastel styles.

For **portfolio/agency sites** (like Synaptix Lab): skip local-biz-web, use landing-page structure loosely, lean into scroll-stop for maximum visual impact.

---

## Session Management

### If the Session Gets Long
Claude Code degrades after ~7-8 phases in a single session. If quality drops:

1. Stop after the current phase
2. Commit everything
3. Start a new session
4. Say: "Read CLAUDE.md and .claude/skills/build-site/SKILL.md. We're in Phase [X] of a build-site workflow for [client name]. Continue from Phase [X]."

### If Stone Sends a Screenshot
Stop the current phase. Evaluate the screenshot. Identify what's wrong. Fix it before continuing. Do not push forward with broken output.

### If a Phase Fails Build Check
Do not move to the next phase. Fix the build error first. Common causes:
- Missing import statement
- Unclosed JSX tag (extra `</div>`)
- Referencing a component that doesn't exist yet
- Importing an image file that hasn't been added to `src/assets/`

---

## Quick Start Template

Copy this to start any new build:

```
Read CLAUDE.md and all skills in .claude/skills/ before starting.

# [Client Name] Website — Build Site Workflow

**Business:** [type]
**Audience:** [who]
**Primary CTA:** [action]
**Pages:** [list]
**Style:** [aesthetic vocabulary or reference site]
**Colors:** [brand colors or "pick from industry defaults"]
**Fonts:** [specific pairing or "pick from design-system industry table"]
**Creative Dials:** DESIGN_VARIANCE: [1-10], MOTION_INTENSITY: [1-10], VISUAL_DENSITY: [1-10]

Follow .claude/skills/build-site/SKILL.md phases 1-7 exactly.
Commit after each phase. Run npm run build after each phase.
DO NOT use placeholder content anywhere.
```
