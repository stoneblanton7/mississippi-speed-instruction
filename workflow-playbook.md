# Synaptix Lab — Build Playbook

_How Stone and Sam build websites and custom business tools. Updated April 2026._
_This document is for Stone's reference and for NotebookLM to query._

---

## Business Model Overview

Synaptix Lab is a two-person operation: Stone (architecture, design, client-facing, frontend) and Sam (backend infrastructure, integrations, stays behind the scenes). 

**The pipeline:** Websites get the foot in the door → custom business tools create the recurring relationship. We don't build SaaS for mass market. We build bespoke internal tools per client — dashboards, portals, automation platforms, transcription tools, whatever that business owner needs to run better. The leverage is that 80% of these tools share the same bones. Build once, skin it, customize workflows, deploy per client.

**Client Zero:** Mike Frascogna at Paraclete (Orpheus, Archon). **Patient Zero for the agency model:** Wade Ward (5 businesses, running on Excel, warm relationship). Shane Blanton Jr. (gun trust platform, Beacon newsletter tool).

---

## Tool Stack

### Planning & Design (Claude.ai)
- Architecture decisions, prompt writing, design mockups
- Debugging from screenshots
- This project's knowledge base for research and reference

### Implementation (Claude Code)
- Copy-paste prompts from Claude.ai
- All code execution, CLI commands, ffmpeg, Docker, git
- Skills in `.claude/skills/` guide behavior per task type

### Visual Asset Pipeline
- **Stitch** (Google) → visual ideation, mockup layouts
- **OpenArt / Gemini Nano Banana Pro** → image generation (Google AI Ultra subscription)
- **Kling 3.0** on hixfield.com → image-to-video conversion
- **vectorizer.ai** → SVG conversion (lines-only curves, coarse tolerance, stack shapes, group by color) + Python cleanup scripts

### Research
- SearXNG MCP (port 8888) + Crawl4AI (port 8002) + Redis (port 6379)
- Zero-hallucination policy: source verification, confidence ratings (HIGH/MEDIUM/LOW)
- NotebookLM for queryable institutional memory

### Infrastructure
- Docker for every project (assigned ports per project, never conflict)
- GitHub repos under `stoneblanton7/`, branch `stone-dev`
- Vercel for static deploys (Iron Forge)
- ERPNext for Archon backend

---

## Project Types & Workflows

### TYPE 1: Website Prototype (Revenue Reveal pitch)

**Purpose:** Pre-build a prospect's website before the sales meeting. Show them their own business on a modern site. Close on the spot.

**Timeline:** 8-12 hours total across 2-3 days

#### Phase 1: Research & Data Gathering (1-2 hours)
1. Scrape real data from prospect's existing site (inventory, reviews, locations, pricing)
2. Pull Google reviews and rating
3. Screenshot competitor websites for audit comparison
4. Identify brand colors, logo, and identity from their current materials
5. Save everything as structured JSON in `api/data/`

#### Phase 2: Design Direction (30 min)
1. Determine the brand tone — who is this business? What should the site feel like?
2. Choose color palette (reference `recommended-palettes.json` by industry)
3. Choose font pairing (reference `recommended-fonts.json`)
4. Decide hero approach (static image vs. video — static for most local businesses)
5. Lock design system in `context/design-system.md`

**Key learning:** Start with the brand, not the aesthetic. Car World pivot from dark fog cinematic → warm golden-hour was the right call. The site must match who they are, not who we are.

#### Phase 3: Scaffold (30 min)
1. Create project from template (copy local CLAUDE.md template, fill in details)
2. Set up Docker with assigned port
3. Create folder structure, routing, layouts
4. Push initial commit

#### Phase 4: Build — Page by Page (4-6 hours)
1. Write detailed prompts in Claude.ai (numbered sections, exact file paths, commit messages)
2. Paste into Claude Code, execute, screenshot result
3. Review in Claude.ai, write fix prompts if needed
4. Move to next page only when current page is solid

**Prompt sizing:** Small fix = 1 section. Medium feature = 3-5 sections. Large build = 5-7 sections. If >7, split into two prompts.

**Build order for local business sites:**
1. Layout + routing + homepage hero
2. Homepage remaining sections (value props, testimonials, CTA)
3. Services / Inventory page
4. About page
5. Contact / Locations page
6. Any specialty pages (Financing, Referrals, etc.)
7. Site-wide polish pass

#### Phase 5: Visual Polish (2-3 hours)
1. Section transitions and gradient overlays
2. Hover effects and micro-interactions
3. Typography and spacing refinement
4. Muted text brightness (`#B0BEC5` baseline)
5. Decorative elements (use restraint — less is more)
6. Video backgrounds if applicable (boomerang loop via ffmpeg)

**Asset pipeline for polish:** Stitch → OpenArt/Gemini → Kling 3.0 → Claude Code implements

#### Phase 6: Quality Pass (1-2 hours)
1. Accessibility audit (a11y skill, target 93+)
2. Mobile responsiveness pass
3. SEO (meta tags, schema, sitemap)
4. Audit ALL pages — Claude Code frequently misses applying updates universally

#### Phase 7: Pitch Prep
1. Record video walkthrough for Mike (concise, professional)
2. Prepare for Revenue Reveal meeting
3. Have site running on phone for live demo

---

### TYPE 2: Custom Business Tool

**Purpose:** Build an internal tool for a specific business owner. Not SaaS — deployed per client, customized to their workflows.

**Timeline:** Varies by complexity. Simple tool = 1-2 weeks. Platform = 1-2 months.

#### Phase 1: Discovery (Claude.ai)
1. Understand the business owner's current workflow (what are they doing manually or in Excel?)
2. Identify the pain points and bottlenecks
3. Map the workflow as a linear process (Hormozi: every business is one workflow)
4. Determine which parts can be automated or improved with a tool
5. Check existing project debriefs — has something similar been built before?

#### Phase 2: Architecture (Claude.ai)
1. Define portals / user types (who uses this tool and what do they see?)
2. Define pages per portal
3. Define data model (JSON for prototype, real backend for production)
4. Identify crossover with existing tools (Orpheus client portal ≈ any client portal, Archon dashboard ≈ any executive dashboard)
5. Write the CLAUDE.md with full project context

#### Phase 3: Research (if needed)
1. Use research SOP for domain-specific knowledge
2. Zero-hallucination policy with source verification
3. Save research as markdown files in project knowledge
4. Research informs architecture, not the other way around

#### Phase 4: Prototype Build (Claude Code)
1. Same prompt workflow as websites: Claude.ai plans → Claude Code executes → screenshot → review
2. Mock data first, real backend later (progressive enhancement)
3. Build one portal at a time, one page at a time
4. Every button does something — no dead UI in demos

#### Phase 5: Backend Integration (Sam)
Sam handles: Django/DRF APIs, ERPNext integration, database design, authentication, deployment infrastructure. Stone handles: frontend, UX, client communication, demo prep.

#### Phase 6: Handoff & Iteration
1. Demo to client with real data
2. Gather feedback
3. Iterate in short cycles
4. Deploy and train

---

### TYPE 3: Research Project

**Purpose:** Build a structured knowledge base on a specific topic.

**Two models:**
- **Web Research:** Many sources → synthesized topic files (e.g., web design research library)
- **Source Extraction:** Specific sources → framework extractions (e.g., Hormozi knowledge base)

**Process:** See Research SOP (separate document). Key principle: research informs architecture, never the reverse.

---

## Cross-Project Knowledge System

### NotebookLM (Stone's memory)
One notebook containing:
- All project debriefs (standardized format)
- All SOPs
- This playbook
- Design system reference files

**Query it when:** Starting a new project, trying to remember how something was done, checking if a pattern has been solved before.

### Global CLAUDE.md (Claude Code's memory)
Lives at `~/.claude/CLAUDE.md`. Contains:
- Stone's identity and working style
- Default stack and conventions
- Cross-project lab notes (lessons learned)
- User preferences (how Stone likes things done)

**Every Claude Code session reads this automatically.** Project-specific context goes in the local CLAUDE.md.

### Local CLAUDE.md (Project-specific memory)
Lives at project root. Contains:
- What this project is and who it's for
- Project-specific design system
- Page/route inventory with status
- What not to break
- Project-specific lab notes and user preferences

### Skills (.claude/skills/)
Reusable behavior patterns for Claude Code:
- `design-system` — foundation CSS variables, tokens, typography
- `landing-page` — conversion-optimized page structure
- `local-biz-web` — Jackson market optimizations
- `scroll-stop` — attention-grabbing animations and effects
- `a11y-audit` — accessibility scanning
- `one-shot` — tunable creative dials for visual builds

Skills are in the `stone-skills` GitHub repo. Copy relevant skills into each project's `.claude/skills/`.

---

## Quality Standards

### Every Page Must Have
- Working navigation (no dead links)
- Theme toggle support (dark/light)
- Mobile responsiveness
- No placeholder content
- Every button does something
- Consistent typography and color tokens

### Every Project Must Have
- CLAUDE.md with full context
- Lab notes section (auto-populated by Claude Code)
- User preferences section
- Accessibility audit before handoff (target 93+)
- SEO meta tags and schema
- Clean git history with descriptive commits

### Design Principles
- Design iteration happens at the prompt/mockup stage, not the code stage
- Test one implementation before scaling to all instances
- Start with the brand identity, not the aesthetic you want
- Hero image matters more than anything else — spend the time
- Static images over video for most local businesses
- Build all pages before polishing any page (design language must be consistent)
- Organic textures over geometric patterns
- Muted text should pop, not strain — `#B0BEC5` baseline on dark backgrounds
- Decorative elements need extreme restraint

---

## Revenue Model

### Tier 1: Website Only ($1,500-2,000/mo)
Website prototype → Revenue Reveal pitch → close on monthly retainer

### Tier 2: Website + Marketing ($3,000/mo)
Website + social media calendar + content marketing + review management

### Tier 3: Website + Tools ($5,000+/mo)
Website + custom business tools (dashboards, portals, automation) + ongoing development

### The Play
Every client enters at Tier 1 or 2. The website is the foot in the door. Once they see what's possible, the conversation naturally moves to "what else can you build me?" That's where the tools come in. Tools create deeper lock-in, higher LTV, and justify Tier 3 pricing.

---

## Project Registry

| Project | Type | Client/User | Status | Port |
|---------|------|------------|--------|------|
| Synaptix Lab Website | Website | Internal | Visual polish | 5177 |
| Car World Arkansas | Website Prototype | Prospect | Visual polish | 5179 |
| Capital Resources | Website Prototype | Prospect | Complete | — |
| Orpheus | Business Tool | Mike/Paraclete | Client Portal complete, Studio built | 5173 |
| Archon | Business Tool | Mike/Paraclete | MVP with ERPNext integration | 5174 |
| Iron Forge | Personal Tool | Stone | Deployed to Vercel | — |
| AIM SGO | Business Tool | Subcontract (Raborn) | Prototype built | — |
| Gun Trust Platform | Business Tool | Shane Blanton Jr. | Research complete, build pending | — |
| Beacon | Business Tool | Shane/Internal | Newsletter tool, early stage | — |
| Dictate | Utility Tool | Internal | Whisper-based transcription | — |
| Meeting Transcriber | Utility Tool | Internal | Otter.ai-style tool | — |
| Hormozi Research Agent | Research | Internal | Complete | — |
| Web Design Research | Research | Internal | Complete (this project) | — |
