---
name: sop
description: "Generate a Standard Operating Procedure (SOP) document from a completed or in-progress project. Use this skill whenever the user says 'create an SOP', 'write the SOP', 'document the process', 'make this repeatable', 'standard operating procedure', 'how-to guide', 'process doc', or 'playbook for this'. Also trigger when the user finishes a project type for the first time and wants to capture the process so the next one is faster (e.g., 'I just built my first dealership site, make an SOP so the next one takes half the time'). This skill reads the project CLAUDE.md, git history, debrief, and context files to generate a step-by-step SOP that another person (or future Stone) could follow to replicate the work."
---

# SOP Skill

Generate a Standard Operating Procedure that captures how a project was built so the process is repeatable. SOPs are the bridge between "I did it once" and "I can do it every time in half the time."

Read this entire file before generating anything.

---

## WHEN TO CREATE AN SOP

- After completing a project type for the first time (first dealership site, first client portal, first research project)
- When a workflow has been refined through 2+ iterations and the pattern is stable
- When the user says "I want to be able to hand this off" or "make this repeatable"
- When a project debrief reveals a process worth documenting

**Do NOT create an SOP for:**
- One-off tasks that won't repeat
- Processes that are still being figured out (too early to standardize)
- Things that are already covered by an existing skill (point to the skill instead)

---

## DATA GATHERING PHASE

Before writing, gather information from these sources:

### 1. Project Debrief (if it exists)
```bash
cat PROJECT-DEBRIEF.md 2>/dev/null || echo "No debrief found"
```
Extract: what was built, what went well, what was challenging, process metrics, reusable patterns.

### 2. CLAUDE.md
```bash
cat CLAUDE.md
```
Extract: tech stack, project structure, conventions, lab notes.

### 3. Git History — Trace the Build Sequence
```bash
git log --oneline --reverse | head -40
```
Extract: the order things were built. Commit messages reveal the actual sequence (scaffold → routing → first page → second page → polish → audit).

### 4. Context Files
```bash
ls context/ 2>/dev/null
ls docs/ 2>/dev/null
```
Extract: business context, strategy docs, research that informed the build.

### 5. Prompt History (if available)
Check for any saved prompts, command files, or prompt templates in:
```bash
ls .claude/commands/ 2>/dev/null
ls prompts/ 2>/dev/null
```

### 6. Ask the User
If the data sources above don't answer these, ask:
- What would you do differently next time?
- What took the longest that shouldn't have?
- What prerequisites does someone need before starting this process?

---

## SOP TEMPLATE

Write the SOP as a markdown file. Save to project root as `SOP-[process-name].md`.

```markdown
# SOP: [Process Name]

_Synaptix Lab | SOP #[N] | Created: [Date]_
_Derived from: [Project name and date]_
_Purpose: [One sentence — what does following this SOP produce?]_
_Estimated time: [Total hours from start to finish]_
_Prerequisites: [What must be true before starting]_

---

## Overview

[2-3 sentences explaining the full process at a high level. 
What goes in, what comes out, and who is involved.]

---

## Prerequisites

### Required Before Starting
- [ ] [Specific thing that must exist or be true]
- [ ] [Access, accounts, tools that must be set up]
- [ ] [Data or assets that must be gathered first]

### Required Tools
| Tool | Purpose | Setup Notes |
|------|---------|-------------|
| [tool] | [what it's used for] | [any config needed] |

---

## Phase 1: [Phase Name] — [Estimated Time]

### What You're Doing
[One sentence describing the goal of this phase.]

### Steps

1. **[Step name]**
   - What to do: [Specific action]
   - Where: [File path, tool, or location]
   - Output: [What this step produces]
   - Tips: [Anything learned from experience — from lab notes or debrief]

2. **[Step name]**
   - What to do: [Specific action]
   - Where: [File path, tool, or location]
   - Output: [What this step produces]

### Phase 1 Checkpoint
- [ ] [Verification step — what should be true when this phase is done]
- [ ] [Second verification if needed]

---

## Phase 2: [Phase Name] — [Estimated Time]

[Same structure as Phase 1. Repeat for each phase.]

---

## Phase N: Quality Assurance — [Estimated Time]

### Accessibility Audit
- Run the a11y-audit skill
- Target score: 93+
- Fix all critical and serious issues before proceeding

### Cross-Page Consistency Check
- [ ] All pages use the same font stack
- [ ] All pages use CSS variables (no hardcoded colors)
- [ ] All pages support dark/light mode toggle
- [ ] All buttons do something (no dead UI)
- [ ] All images have alt text
- [ ] Mobile responsive on all pages

### Performance Check
- [ ] No images over 500KB without lazy loading
- [ ] No unused dependencies in package.json
- [ ] Build completes without warnings: `npm run build`

---

## Common Issues & Fixes

[Pull from the project debrief's "What Was Challenging" section and lab notes.]

| Issue | Cause | Fix | Prevention |
|-------|-------|-----|------------|
| [problem] | [why it happened] | [how to fix] | [how to avoid next time] |

---

## Prompt Templates

[If specific Claude Code prompts were used that worked well, include them here.
These are copy-paste ready for the next time this process runs.]

### Prompt: [Phase/Step Name]
```markdown
# [Feature Name]

Read CLAUDE.md before starting.
DO NOT break existing features.

---

## 1. [TASK]
[Description]
Commit: "type: description"
```

---

## Customization Points

[What changes between instances of this process? 
List the variables that get swapped each time.]

| Variable | Example (This Project) | What to Change |
|----------|----------------------|----------------|
| [e.g., Color palette] | [e.g., Navy + Gold] | [Adjust CSS variables in global.css] |
| [e.g., Mock data source] | [e.g., Scraped from client site] | [Scrape new client's site] |
| [e.g., Page count] | [e.g., 10 routes] | [Add/remove routes in App.jsx] |

---

## Estimated Timeline

| Phase | Hours | Notes |
|-------|-------|-------|
| [Phase 1] | [X] | [Any caveats] |
| [Phase 2] | [X] | |
| [Phase N] | [X] | |
| **Total** | **[X]** | |

---

## Related Documents

- **Project Debrief:** `PROJECT-DEBRIEF.md`
- **Design System:** [reference file]
- **Research:** [if applicable]

---

_This SOP was generated on [date] from the [project name] build._
_Update this document after each use to incorporate improvements._
```

---

## AFTER GENERATING

1. **Save** the SOP to the project root: `SOP-[process-name].md`
2. **Commit:** `"docs: create SOP for [process name]"`
3. **Tell the user** to add this SOP to their NotebookLM notebook
4. **Check for a parent SOP** — if this is an industry-specific process (e.g., dealership websites), check if a general parent SOP exists (e.g., website prototypes). If so, reference it: "This SOP extends SOP-website-prototypes.md with dealership-specific steps."

---

## SOP HIERARCHY

SOPs can be layered:

```
SOP-website-prototypes.md          (general process for any website)
├── SOP-dealership-prototypes.md   (industry-specific for car dealers)
├── SOP-restaurant-prototypes.md   (industry-specific for restaurants)
└── SOP-law-firm-prototypes.md     (industry-specific for attorneys)

SOP-business-tools.md              (general process for any portal/dashboard)
├── SOP-client-portal.md           (client-facing portal pattern)
└── SOP-admin-dashboard.md         (internal admin tool pattern)
```

The industry-specific SOP says "follow the general SOP, with these changes." It doesn't duplicate the entire general process — it extends it.

---

## QUALITY CHECKS

Before finalizing, verify:

- [ ] Every step has a specific action, not just a description ("Create the file" not "The file should exist")
- [ ] Time estimates are realistic based on actual project metrics
- [ ] Common issues are documented with actual fixes (not theoretical)
- [ ] Prompt templates are copy-paste ready (exact file paths, real examples)
- [ ] Customization points clearly identify what changes between instances
- [ ] Prerequisites are complete — someone following this SOP shouldn't hit a surprise dependency
- [ ] The SOP references existing skills where applicable instead of duplicating their content
