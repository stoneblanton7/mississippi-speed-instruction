---
name: debrief
description: "Generate a project debrief document that captures what was built, what went well, what was challenging, key decisions, lab notes, and reusable patterns. Use this skill whenever the user says 'debrief', 'write the debrief', 'wrap up this project', 'document what we built', 'project summary', 'post-mortem', or 'capture lessons learned'. Also trigger when a project reaches a milestone (pitch-ready, deployed, demo-complete) and the user wants to document the state. This skill reads the git history, CLAUDE.md, lab notes, and project structure to auto-generate a comprehensive debrief in the standardized template format."
---

# Debrief Skill

Generate a comprehensive project debrief by reading the actual project state. This isn't a fill-in-the-blank template — Claude Code reads real data from the project and writes the debrief with specific, accurate content.

Read this entire file before generating anything.

---

## DATA GATHERING PHASE

Before writing a single line of the debrief, gather all of this information:

### 1. Read the CLAUDE.md
```bash
cat CLAUDE.md
```
Extract: project name, description, who it's for, tech stack, design system, page inventory, status.

### 2. Read the Git History
```bash
git log --oneline --since="1 month ago" | head -50
git log --oneline | wc -l
git log --format="%ai" | tail -1   # first commit date
git log --format="%ai" | head -1   # most recent commit
```
Extract: total commits, date range, commit message patterns, major features built.

### 3. Read Lab Notes
```bash
# Check CLAUDE.md for lab notes section
# Check any NOTES.md files in page folders
# Check context/ folder for relevant docs
```
Extract: issues encountered, fixes discovered, patterns learned.

### 4. Read Project Structure
```bash
find frontend/src/pages -type d | head -30
find frontend/src/components -type f -name "*.jsx" | head -30
find frontend/src/api/data -type f | head -20
```
Extract: page count, component count, mock data files.

### 5. Read Design System
```bash
cat frontend/src/global.css | head -60    # CSS variables
cat frontend/tailwind.config.js           # Tailwind mappings
cat frontend/index.html | grep -i font    # Font imports
```
Extract: color palette, fonts, dark/light mode setup.

### 6. Check Docker Config
```bash
cat docker-compose.yml | grep -E "port|PORT"
```
Extract: assigned port.

### 7. Check for Context Files
```bash
ls context/ 2>/dev/null
ls docs/ 2>/dev/null
```
Extract: any domain knowledge, business context, or strategy docs.

---

## DEBRIEF TEMPLATE

Write the debrief as a markdown file saved to the project root as `PROJECT-DEBRIEF.md`. Use this exact structure:

```markdown
# Project Debrief — [PROJECT NAME]

_Synaptix Lab | Project #[N] | Started: [First commit date]_
_Client: [Client name — extracted from CLAUDE.md]_
_Status: [Current phase — scaffold/build/polish/audit/pitch-ready/deployed]_

---

## Project Overview

[2-3 sentences: What is this, who is it for, why was it built, strategic intent.
Pull from CLAUDE.md and context/ files. Be specific — real names, real business context.]

---

## What Was Built

### Site / App Structure
[Generate this table from the actual pages/ directory]

| Route | Page | Status |
|-------|------|--------|
| /     | Home | Complete |
[... list all routes found in App.jsx or the pages directory]

### Tech Stack
- **Frontend:** [from CLAUDE.md or package.json]
- **Backend:** [from CLAUDE.md — mock JSON, ERPNext, Supabase, etc.]
- **Port:** [from docker-compose.yml]
- **Repo:** [from git remote -v]

### Design System
- **Base:** [from global.css --color-bg]
- **Primary:** [from global.css --color-accent]
- **Secondary:** [from global.css, if exists]
- **Headings:** [from index.html font imports or tailwind config]
- **Body:** [same]
- **Aesthetic:** [one sentence describing the visual feel]

---

## What Went Well

[Extract from lab notes, git history patterns, and conversation context.
Write 2-4 entries. Each should explain WHAT worked and WHY it matters for future projects.
If no explicit lab notes exist, infer from the commit history — clean commit sequences
with few "fix:" commits suggest smooth implementation.]

### 1. [Title]
[Description]

---

## What Was Challenging

[Extract from lab notes, "fix:" commits, and any NOTES.md files.
Write 2-4 entries. Each should explain what went wrong, how it was resolved,
and what to do differently next time.]

### 1. [Title]
[Description]

---

## Key Design Decisions

[Extract from CLAUDE.md architecture decisions, context/ files, and design system.
List the major choices made and why.]

| Decision | What We Chose | Why |
|----------|--------------|-----|
[... populate from project context]

---

## Strategic Value

[How does this project fit into the Synaptix Lab business model?
- Is this a Revenue Reveal prototype for a prospect?
- Is this an internal tool for Paraclete?
- Is this a reusable template for a vertical?
- What's the revenue path?]

---

## Outstanding Work

[Scan for TODO comments, incomplete pages, stub components.
Be honest about what's not done yet.]

| Item | Status | Effort | Priority |
|------|--------|--------|----------|

---

## Lab Notes (Issues Discovered & Resolved)

[Pull directly from the Lab Notes section of CLAUDE.md.
Add any patterns from "fix:" commits that aren't already documented.]

| Issue | Root Cause | Fix | Cross-Project? |
|-------|-----------|-----|----------------|
[... populate from lab notes and fix commits]

---

## Reusable Patterns

[Identify components, data structures, and approaches worth extracting.]

- **Components:** [List any custom components in components/ui/ that are generic enough to reuse]
- **Data structures:** [JSON schemas that could apply to other projects]
- **Design patterns:** [Layout approaches, section types, animation patterns]
- **Prompts:** [Note if any prompts worked exceptionally well — reference commit messages]

---

## Process Metrics

| Metric | Value |
|--------|-------|
| Total commits | [from git log --oneline \| wc -l] |
| Date range | [first commit] to [latest commit] |
| Pages / routes built | [from pages/ directory count] |
| Components built | [from components/ file count] |
| Mock data files | [from api/data/ file count] |

---

_This debrief was auto-generated on [today's date] by the debrief skill._
_Review for accuracy and add any context that couldn't be extracted from code._
```

---

## AFTER GENERATING

1. **Save** the debrief to the project root: `PROJECT-DEBRIEF.md`
2. **Commit:** `"docs: generate project debrief"`
3. **Flag cross-project lab notes** — any lab note marked "Cross-Project? Yes" should be added to the global CLAUDE.md at `~/.claude/CLAUDE.md` under the Lab Notes section. Ask the user before modifying the global file.
4. **Tell the user** to add this debrief to their NotebookLM notebook for the institutional memory layer.

---

## QUALITY CHECKS

Before finalizing, verify:

- [ ] All page routes listed match the actual App.jsx routes
- [ ] Color hex values match what's actually in global.css
- [ ] Port number matches docker-compose.yml
- [ ] Commit count and date range are accurate
- [ ] No placeholder text ("TBD", "fill in later") — if you don't have the info, say "Not documented" 
- [ ] Lab notes are specific and actionable, not vague
- [ ] Reusable patterns section identifies at least one concrete thing worth extracting
- [ ] Strategic value section connects to the Synaptix Lab business model (websites → tools → recurring revenue)

---

## WHEN TO RUN THIS SKILL

- After completing a project milestone (all pages built, visual polish done, audit passed)
- Before a client pitch (captures the state of the prototype)
- When wrapping up a project for handoff
- When starting a new project in the same vertical (reference the old debrief first)
- Periodically on long-running projects (monthly snapshot)

The user may say "debrief this project" or "write up what we built" or "I need to document this before I forget." All of these trigger this skill.
