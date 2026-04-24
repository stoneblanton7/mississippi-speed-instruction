# Synaptix Lab — Standard Operating Procedure: Building Client Website Prototypes

## Overview

This SOP documents the full process Synaptix Lab uses to build website prototypes for client pitches. It was developed during the Capitol Resources LLC project (March 2026) and captures every step from initial research to handoff. Anyone following this SOP should be able to replicate the process for any local business client.

## Tools Required

| Tool | Purpose | Cost |
|------|---------|------|
| Claude.ai (web app) | Planning, architecture, design decisions, prompt writing | Pro subscription |
| Claude Code (terminal) | Implementation, coding, file creation | Pro subscription |
| Docker + docker-compose | Containerized dev environment | Free |
| VS Code / terminal | Code editor, Git operations | Free |
| Fire Crawl | Scrape client branding (colors, fonts, logos) | Free tier |
| Gemini (Google AI Studio) | Generate images for the prototype | Free |
| FFmpeg | Video processing (loops, reverse, compression) | Free |
| GitHub | Version control, collaboration | Free |
| Otter.ai | Transcribe process for documentation | Free tier |
| NotebookLM | Package deliverables for client sharing | Free |
| hover.dev | Premium React/Tailwind animation components | $49 lifetime |
| 21st.dev | Community React components for inspiration | Free |

## Phase 1: Research & Branding (30 minutes)

### Step 1: Scrape the client's current site
1. Go to Fire Crawl (firecrawl.dev)
2. Enter the client's website URL
3. Select "Branding" format
4. Screenshot the results — colors, fonts, logos
5. Save the branding screenshot for Claude.ai context

### Step 2: Set up Claude.ai project
1. Create a new Claude.ai project named after the client
2. Copy Synaptix Lab project instructions into the project instructions field
3. Upload all website research files (from the research project) into project knowledge
4. These research files cover: typography, color theory, layout patterns, SEO, accessibility, social proof, conversion optimization, and Jackson MS market data

### Step 3: Initial planning conversation
1. Upload the Fire Crawl branding screenshot to Claude.ai
2. Describe what you want: "Build a prototype for [client]. Upgrade their current site without changing the bones. Keep it professional for their industry."
3. Let Claude.ai audit their current site (it will web-scrape and analyze)
4. Discuss design direction — fonts, colors, layout structure, special features
5. Get Claude.ai to write the first scaffold prompt

## Phase 2: Visual Prototype (Optional — 30 minutes)

### Step 4: One-shot prototype in AI Studio / Stitch
1. Take Claude.ai's one-shot prompt and paste it into Google AI Studio or Stitch
2. Let it generate a visual prototype
3. Screenshot the results
4. Send screenshots back to Claude.ai for feedback
5. Decide: iterate in AI Studio, or move to Claude Code for full build

This step is optional but useful for getting early visual direction before committing to code.

## Phase 3: Project Scaffold (15 minutes)

### Step 5: Create the GitHub repo
1. Create a new GitHub repo: `[client-name]-app`
2. Clone locally

### Step 6: Run scaffold prompt (Prompt 0)
1. Open terminal in the project directory
2. Run: `claude --dangerously-skip-permissions` (at your own risk — read the prompt first)
3. Paste the scaffold prompt from Claude.ai
4. This creates: Docker config, folder structure, CLAUDE.md, data files, global CSS, Tailwind config, base components
5. Verify with `docker compose up --build` and visit localhost

### Step 7: Set up .claude folder
1. Add skills to `.claude/skills/` — design system, spline-3d, a11y-audit, etc.
2. Add commands to `.claude/commands/` — prime command for context loading
3. Update CLAUDE.md with project-specific colors, fonts, and component patterns

**Important:** Make sure the Docker port doesn't conflict with other running projects. Each project gets its own port (5173, 5174, 5178, etc.).

## Phase 4: Build Prompts (2-4 hours)

### Step 8: Write and execute build prompts
Claude.ai writes detailed prompts. You paste them into Claude Code. The loop:

1. Claude.ai writes a prompt (with exact file paths, code snippets, commit messages)
2. You paste the prompt into Claude Code
3. Claude Code implements it and commits
4. You run `docker compose down && docker compose up --build`
5. You screenshot the result in the browser
6. You send the screenshot back to Claude.ai
7. Claude.ai tells you what's working, what's broken, what to fix
8. Repeat

### Prompt sizing guidelines:
- Small fix: 1 section, 1 commit
- Medium feature: 3-5 sections, 3-5 commits
- Large build: 5-7 sections, 5-7 commits
- If it needs more than 7 sections, split into two prompts

### Prompt structure:
```markdown
# Feature Name

Read CLAUDE.md before starting.
DO NOT break [existing features].
Commit after each numbered section.

## 1. FIRST TASK
[Detailed description with file paths and code]
Commit: "type: description"

## 2. SECOND TASK
[Same level of detail]
Commit: "type: description"
```

### Typical prompt sequence for a single-page site:
1. Prompt 0: Scaffold (Docker, folder tree, CLAUDE.md, data files)
2. Prompt 1: Hero + Navbar
3. Prompt 2: About + Core sections
4. Prompt 3: Remaining sections (map, team, contact, footer)
5. Prompt 4: Visual polish (fix colors, spacing, Tailwind issues)
6. Prompt 5: Animations (scroll reveals, typewriter, parallax)
7. Prompt 6: Advanced features (video hero, hover panels, spotlight cards)
8. Prompt 7: Visual depth (textures, layered sections, micro-interactions)
9. Prompt 8+: Iteration based on screenshots and feedback

## Phase 5: Visual Polish & Animations (1-2 hours)

### Step 9: Add animations and effects
- Use react-awesome-reveal for scroll animations (wrap in SafeFade for reduced motion)
- Use Framer Motion (motion/react) for parallax, nav entrance, complex animations
- Browse hover.dev and 21st.dev for component inspiration
- Convert components from TypeScript to JSX if needed
- Always test that animations don't break grid/flex layouts

### Step 10: Generate images
- Use Gemini to generate section-specific images
- Write specific prompts: include orientation, color grading, style, no-people rules
- Save to `frontend/public/images/[section]/`
- Update data files with local image paths

### Step 11: Video hero (if applicable)
- Source or generate a drone/aerial video
- Use FFmpeg to create a boomerang loop: forward + reverse concatenated
- Command: `ffmpeg -i input.mp4 -filter_complex "[0:v]split[fwd][rev];[rev]reverse[reversed];[fwd][reversed]concat=n=2:v=1:a=0" -an output-loop.mp4`
- Use native `<video loop>` — no JavaScript loop logic
- Add dark overlay + text shadows for readability

## Phase 6: Accessibility Audit (1 hour)

### Step 12: Install the a11y-audit skill
1. Copy `.claude/skills/a11y-audit/SKILL.md` and `references/criteria.md` into the project
2. The skill covers 6 categories: Contrast, Keyboard, Screen Reader, Touch Targets, Motion, Color Independence

### Step 13: Run the audit
1. Tell Claude Code: "Run the accessibility audit following the a11y-audit skill"
2. It scans all source files, runs grep checks, evaluates each component
3. Generates a scored report (0-100) with specific fix recommendations
4. Write fixes based on the report

### Step 14: Iterate
- Run the audit → fix issues → re-audit → fix new issues
- Each audit cycle catches things the previous one missed
- Target: 90+ score (WCAG 2.1 AA Excellent)
- Capitol Resources went: 62 → 82 → 86 → 92 → 93 → 91 → 95 across 7 cycles
- The score dropping (93 → 91) is normal — strict fresh scans find new issues

### Key accessibility fixes that apply to every project:
- Gold/accent text on light backgrounds usually fails contrast — create a darker accent-text variant
- All form inputs need htmlFor/id label association
- Interactive divs need tabIndex, role, onFocus, onKeyDown
- Add a SafeFade wrapper for react-awesome-reveal (reduced motion)
- Add a skip-to-main-content link
- Add aria-labels to all sections
- Global focus-visible CSS rule for all interactive elements
- Video autoplay needs a pause/stop control
- Touch targets minimum 44x44px

## Phase 7: SEO Optimization (30 minutes)

### Step 15: Add meta tags and structured data
- Title tag with client name + location + primary service
- Meta description with key details
- Open Graph tags for Facebook/LinkedIn sharing
- Twitter Card tags
- JSON-LD LocalBusiness schema (name, address, phone, services, area served)
- Canonical URL
- Geo tags for local SEO

### Step 16: Technical SEO
- Semantic HTML (main, nav, footer, heading hierarchy)
- Image lazy loading + explicit dimensions
- Font preconnect + preload
- sitemap.xml and robots.txt
- theme-color meta tag

## Phase 8: Handoff (30 minutes)

### Step 17: Git cleanup
1. Merge feature branch into stone-dev
2. Push stone-dev to GitHub
3. Add collaborators to the repo

### Step 18: Create handoff package
- Executive summary (what we built)
- Design system documentation
- Content audit (real vs suggested)
- Accessibility audit results
- SEO implementation details
- Sales playbook for the pitch
- Technical documentation for running the project

### Step 19: Package for NotebookLM
- Create 8-10 comprehensive markdown files
- Upload to a NotebookLM project folder
- Use NotebookLM to generate: mind maps, flashcards, presentations, summaries
- Share the NotebookLM project with team members

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Blank screen after build | Check console for component crash errors |
| Colors not working | Tailwind v4 uses @theme in CSS, not JS config |
| Grid layouts stacking vertically | Never put `<Fade>` as direct child of grid. Use Approach B. |
| Docker shows old code | `docker compose down && docker compose up --build` |
| Docker cache corrupted | `docker builder prune -f` then rebuild |
| Video loop hard-cuts | Use FFmpeg boomerang (forward + reverse concat), native loop |
| Animations complete before visible | Add delay, increase duration, use intersection observer |
| Text unreadable over video | Black overlay (not colored), text-shadow on all text elements |

## Timeline Summary

| Phase | Duration | Output |
|-------|----------|--------|
| Research & Branding | 30 min | Fire Crawl data, Claude project setup |
| Visual Prototype | 30 min | AI Studio/Stitch screenshots (optional) |
| Project Scaffold | 15 min | Docker, folder tree, base files |
| Build Prompts | 2-4 hours | Full website with all sections |
| Visual Polish | 1-2 hours | Animations, textures, interactions |
| Accessibility | 1 hour | 90+ WCAG score |
| SEO | 30 min | Meta tags, schema, sitemap |
| Handoff | 30 min | Documentation, NotebookLM package |
| **Total** | **6-9 hours** | **Production-ready prototype** |
