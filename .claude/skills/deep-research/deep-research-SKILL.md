---
name: deep-research
description: Multi-phase research pipeline that produces a structured, source-cited knowledge base with a portable HTML dashboard. Use this skill for big projects requiring thorough synthesis, source quality ratings, and comprehensive topic coverage. SearXNG finds URLs, Firecrawl extracts content. Triggers on any mention of deep research, comprehensive research, full research pipeline, knowledge base, research project, or "I need to really understand X."
---

# Deep Research Pipeline

Multi-phase research pipeline that produces a structured, source-cited knowledge base with a portable HTML dashboard. Every claim has a citation. Every source has a reliability rating. Every discrepancy is flagged.

This is NOT opinion writing. This is evidence synthesis.

**Stack:**
- **SearXNG-MCP** for URL discovery (finding what to read)
- **Firecrawl-MCP** for content extraction (reading the pages cleanly)
- NotebookLM for generating derivative artifacts (audio briefing, flashcards, quiz, infographic)

**Use this skill when:** You're building something big that needs a knowledge base, preparing for a major client call, writing a strategy document, or doing market research that will be referenced over weeks/months.

**Don't use this when:** You just need a quick scan of what's out there. That's `quick-research`.

**Input:** $ARGUMENTS (topic, company name, or research query)

---

## PHASE 0: SCOPING (Interactive)

Before doing anything, ask the user these questions and WAIT for answers. Do not proceed until you have responses.

### Question 1: Research Question & Context
Ask: "What specifically do you want to learn, and what's the context? For example: 'What does the data say about pricing psychology for service businesses — I have a client call Thursday and need to sound like an expert' or 'Everything about [Company X] — we have a discovery call next week.'"

### Question 2: Audience & Use Case
Ask: "How will you use this research?" and present these options:
- **Build reference** — I'm building something and need specs, implementation details, best practices
- **Sales/meetings** — I need talking points, ROI stats, competitor ammo, conversation prep
- **Strategy** — I need frameworks, decision trees, market data for planning
- **Learning** — I want to deeply understand this topic for personal knowledge
- **Client delivery** — I need plain-English summaries and visual examples to share with a client

### Question 3: Depth
Ask: "How deep should this go?"
- **Quick brief** — 3-5 topic areas, key findings only, 30-minute pipeline
- **Standard** — 5-8 topic areas, detailed findings with sources, 1-2 hour pipeline
- **Comprehensive** — 8-12 topic areas, exhaustive with cross-referencing, 2+ hour pipeline

### After receiving answers:

Generate the following and show it to the user for confirmation before proceeding:

**Research Plan:**
- One-sentence research question (synthesized from their input)
- Audience type and implications
- Topic map: 5-10 topic areas (numbered, with one-line descriptions)
- Source strategy: which source types to prioritize (see Source Priority Table below)
- Estimated output: number of files, depth level

Ask: "Does this plan look right? Any topics to add or remove?"

WAIT for confirmation. Then proceed.

### Source Priority Table

| Source Type | Priority | Examples |
|-------------|----------|----------|
| Peer-reviewed papers | Highest | Google Scholar, PubMed, CHI proceedings |
| University/research institution studies | High | Northwestern, Stanford, MIT, NNGroup |
| Official standards & documentation | High | W3C, Google docs, government data, SEC filings |
| Large-scale industry reports | Medium-High | Annual surveys, HTTP Archive, benchmark reports |
| Named company case studies | Medium | A/B test results, published case studies with data |
| Industry blogs with data | Medium-Low | HubSpot, CXL, VWO — ONLY when citing specific studies |
| Forums, Reddit, Quora | Low | Only for sentiment/anecdotal color, never primary evidence |
| Press releases, news articles | Medium | For recency and events, not as primary evidence |
| Wikipedia | Medium | For background context and finding primary sources |

---

## PHASE 1: PROJECT SETUP

### 1.1 — Create Project Folder
Slugify the research question into a folder name:
- Lowercase, hyphens for spaces, no special characters
- Example: "Pricing Psychology for Service Businesses" → `pricing-psychology-service-businesses`
- Example: "Acme Corp Discovery Call" → `acme-corp-discovery-call`

Create: `./<slug>/`

### 1.2 — Create Context Files

Create `./<slug>/context/` directory with these files:

**`./<slug>/context/research-plan.md`** — The confirmed research plan from Phase 0 (research question, audience, topic map, source strategy).

**`./<slug>/context/extraction-rules.md`** — Write this file with these rules:
```
# Extraction Rules

A finding is worth extracting if it meets ALL of these criteria:
- Has a specific number, percentage, dollar figure, or measurable claim
- Has an identifiable source (study name, company, author, year)
- Is directly relevant to the research question
- Is not promotional content disguised as research

For each finding, record:
- The specific claim (with numbers)
- The source (study name, author, year)
- Sample size (if available)
- Confidence level: HIGH / MEDIUM / LOW
- Any methodology concerns

Confidence Levels:
- HIGH: Peer-reviewed, rigorous methodology, large sample, or official documentation
- MEDIUM: Industry report, named case study, reputable survey, well-documented
- LOW: Blog post, unclear methodology, small sample, no primary source cited

Source Quality Ratings:
- 5 stars: Peer-reviewed, rigorous methodology, large sample
- 4 stars: Large-scale industry data, transparent methodology, respected org
- 3 stars: Named company case studies, reputable surveys, well-documented
- 2 stars: Industry blogs, unclear methodology, smaller surveys
- 1 star: Unverifiable claims, no clear primary source, promotional content
```

### 1.3 — Create Metadata
Create `./<slug>/meta.json`:
```json
{
  "topic": "$ARGUMENTS",
  "research_question": "<from scoping>",
  "audience": "<from scoping>",
  "depth": "<from scoping>",
  "slug": "<slug>",
  "created": "<ISO timestamp>",
  "status": "in-progress",
  "phases_completed": [],
  "topic_map": [<array of topic areas from scoping>]
}
```

Commit: "research: project setup complete for $ARGUMENTS"

---

## PHASE 2: DEEP RESEARCH (SearXNG + Firecrawl)

This is the core research phase. SearXNG finds URLs, Firecrawl extracts content from those URLs. This two-tool stack is more reliable than using SearXNG alone — Firecrawl handles JavaScript-rendered sites, navigation, and clean markdown conversion far better.

Execute one topic area at a time from the topic map.

### For EACH topic area in the topic map:

#### 2.A — Discover URLs (SearXNG)

Run 3-5 SearXNG searches per topic area with different query angles. Prioritize source types according to the Source Priority Table and the chosen source strategy.

Search strategies:
- Direct topic search: "[topic area] research data statistics"
- Academic search: "[topic area] study peer-reviewed"
- Industry search: "[topic area] benchmark report 2025 2026"
- Case study search: "[topic area] case study results"
- If company research: "[company] [topic area]", "[company competitors] [topic area]"

Collect 10-20 candidate URLs per topic area. Filter out:
- Paywalled content (too likely to fail extraction)
- Duplicates across searches
- Obvious SEO spam / aggregator reprints
- Forum threads (unless sentiment is specifically needed)

#### 2.B — Extract Content (Firecrawl)

For each candidate URL, use Firecrawl to scrape clean markdown:
- `formats: ['markdown']`
- `onlyMainContent: true`
- `includeTags: ['h1', 'h2', 'h3', 'p', 'ul', 'ol', 'table', 'blockquote']`
- 15-second timeout per URL

Save fetched content to `./<slug>/cache/[topic-number]-[topic-name]/[source-name].md`

Include source metadata at the top of each cached file:
```markdown
---
url: [original URL]
scraped_at: [ISO timestamp]
title: [page title from Firecrawl]
word_count: [count]
---
```

#### 2.C — Handle Failures

If a URL fails to fetch:
- Log it in `./<slug>/cache/failed-urls.md` with the error and reason
- If a URL appears high-value (e.g., peer-reviewed study, government source), try web_fetch as a fallback
- Continue with remaining URLs

#### 2.D — Extract Findings

Read all cached content for this topic. Extract every finding that meets the extraction rules. For each finding record:
- The specific claim (with numbers)
- The source (study name, author, year)
- Sample size (if available)
- Confidence level (HIGH/MEDIUM/LOW)
- Source quality rating (1-5 stars)
- Any methodology concerns or discrepancies with other sources

#### 2.E — Write Topic File

Write the output file following the Standard Research File Format below.

**Place in:** `./<slug>/output/[topic-number]-[topic-name].md`

### Standard Research File Format:

```markdown
# [Topic Title]

## Purpose
[One paragraph: what this file covers and why it matters for the research question]

---

## Key Findings
- [Finding 1 with specific number] (Source, year) — Confidence: HIGH
- [Finding 2 with specific number] (Source, year) — Confidence: MEDIUM
- [Finding 3 with specific number] (Source, year) — Confidence: HIGH
[5-10 bullet points — the TL;DR of the entire file]

---

## Detailed Research

### [Subtopic 1]
[Detailed findings with inline citations]

### [Subtopic 2]
[Detailed findings with inline citations]

---

## Discrepancies & Conflicts
[Where sources disagree — what each says and which is more reliable]

---

## Confidence Assessment
- **Overall confidence**: [HIGH / MEDIUM-HIGH / MEDIUM]
- **Strongest evidence**: [What's backed by the best sources]
- **Weakest evidence**: [What relies on blog posts or small samples]
- **Key discrepancies**: [Where sources disagree and what to make of it]

---

## Sources
1. [Author/Org] — [Title] ([Year]). [URL] — ★★★★★
2. [Author/Org] — [Title] ([Year]). [URL] — ★★★☆☆
```

### After ALL topic areas are complete:

#### 2.F — Save Key URLs
Compile all successful source URLs into `./<slug>/00_source_urls.txt` (one per line, best quality first).

#### 2.G — Write Source Quality Assessment
Create `./<slug>/output/source-quality-assessment.md` with:
- Total sources analyzed
- Distribution of star ratings (how many 5-star, 4-star, etc.)
- Strongest sources (top 5-10 with brief reasoning)
- Weakest sources and why they were included
- Overall source quality percentage (e.g., "72% of sources are 3+ stars")
- Any systematic gaps or biases in the source pool

Update `meta.json`: add `"phase2"` to `phases_completed`.

Commit: "research: phase 2 complete — topic research and extraction done"

---

## PHASE 3: NOTEBOOKLM ARTIFACTS

Generate derivative artifacts that make the research usable in different contexts (audio, quiz, visuals, slides).

### 3.1 — Executive Briefing

Create `./<slug>/output/executive-briefing.md`:

A 3-5 page synthesis of everything. Written in plain English. Structure:
```markdown
# Executive Briefing: [Research Question]

## The Bottom Line
[3-5 bullet points with the most important findings]

## What the Evidence Shows
[Narrative synthesis of key findings — written for someone who won't read the source files]

## Where the Evidence is Strongest
[Best-supported claims with citations]

## Where the Evidence is Shakiest
[Weaker claims, honest limitations]

## Practical Implications
[If [audience type], what does this mean for action]
```

### 3.2 — Strategic Intel

Create `./<slug>/output/strategic-intel.md`:

Actionable intelligence in a scannable format:
```markdown
# Strategic Intelligence

## Key Numbers to Remember
[Every important stat with source and context]

## Talking Points
[One-liners suitable for meetings, with citations]

## Counterarguments to Know
[What skeptics say and how to respond]

## What Most People Don't Know
[Non-obvious findings that give an edge]

## Red Flags to Watch
[Warning signs, problematic data, things to be skeptical of]
```

### 3.3 — NotebookLM Upload

Upload the cached content and output files to NotebookLM via the API or manual upload. Generate:
- Audio briefing (MP3, saved to `./<slug>/audio_briefing.mp3`)
- Quiz (save question set as `./<slug>/output/quiz.json`)
- Flashcards (save as `./<slug>/output/flashcards.json`)
- Infographic (save as `./<slug>/output/infographic.png`)
- Mind map (save as `./<slug>/output/mindmap.json`)
- Slides (save as `./<slug>/output/slides.pdf`)

Store the NotebookLM notebook ID in `meta.json`.

Update `meta.json`: add `"phase3"` to `phases_completed`.

Commit: "research: phase 3 complete — NotebookLM artifacts generated"

---

## PHASE 4: HTML DASHBOARD

Build a single-file HTML dashboard at `./<slug>/index.html`.

### Base64 Embedding (Critical for Phone Portability)
Convert audio and image to base64 so the HTML file is fully self-contained:

```python
import base64

# Audio
try:
    with open("./<slug>/audio_briefing.mp3", "rb") as f:
        audio_b64 = base64.b64encode(f.read()).decode()
except FileNotFoundError:
    audio_b64 = None

# Infographic
try:
    with open("./<slug>/output/infographic.png", "rb") as f:
        img_b64 = base64.b64encode(f.read()).decode()
except FileNotFoundError:
    img_b64 = None
```

### External CDN Resources
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
```

### Design
- Background: #08080c with subtle blue/purple radial gradient
- Panels: rgba(255,255,255,0.03) with backdrop-filter: blur(10px), border: 1px solid rgba(255,255,255,0.08)
- Primary accent: Electric blue #3B82F6
- Secondary accent: Gold #F59E0B
- Font: Inter 300-700
- Text: White primary, rgba(255,255,255,0.6) muted
- Border radius: 12px panels, 8px buttons
- All interactive elements: 0.2s ease transitions

### Layout
```
┌──────────────────────────────────────────────────────┐
│  HEADER: Research Title | Date | Audio Player        │
├───────────┬──────────────────────────────────────────┤
│           │                                           │
│  SIDEBAR  │          CONTENT AREA                     │
│           │                                           │
│  Briefing │  (renders based on active tab)            │
│  Intel    │                                           │
│  Topics   │  Markdown tabs: rendered via marked.js    │
│  Quiz     │                                           │
│  Cards    │                                           │
│  Graphic  │                                           │
│  Sources  │                                           │
│           │                                           │
├───────────┴──────────────────────────────────────────┤
│  FOOTER: Deep Research Pipeline | Confidence: X%      │
└──────────────────────────────────────────────────────┘
```

Mobile: sidebar collapses to horizontal tab bar at top on screens < 768px.

### Tabs (7 total)

**Tab 1 — Executive Briefing:** Render `executive-briefing.md` via marked.js. Store content in `<script type="text/markdown" id="md-briefing">`.

**Tab 2 — Strategic Intel:** Render `strategic-intel.md` via marked.js.

**Tab 3 — Research Topics:** Dropdown selector to choose any topic file from `output/`. Render selected file via marked.js. Default to first topic. Store all topic markdown content in separate script tags.

**Tab 4 — Knowledge Quiz:** Interactive JavaScript quiz from `quiz.json`. Clickable option buttons, green/red feedback on selection, running score counter, restart button after completion.

**Tab 5 — Flashcards:** Interactive flip cards from `flashcards.json`. CSS perspective (1000px), rotateY(180deg) on click, 0.6s transition. Blue/purple gradient front (Question), dark with gold border back (Answer). Arrow navigation, counter, progress dots.

**Tab 6 — Infographic:** Base64-embedded image, max-width 100%, centered. Show "Not available" message if no infographic.

**Tab 7 — Sources:** Render `source-quality-assessment.md` via marked.js. Shows all sources with quality ratings.

### Audio Player (header)
- `<audio>` with base64-embedded MP3
- Custom play/pause button (Font Awesome icons), time display
- Hide entirely if no audio generated

### Markdown Styling (.markdown-content)
- h1: 1.8rem, weight 700, bottom margin 1rem, white
- h2: 1.4rem, weight 600, top margin 2rem, bottom border rgba(255,255,255,0.1)
- h3: 1.1rem, weight 600, color #3B82F6
- p: line-height 1.7, bottom margin 1rem, color rgba(255,255,255,0.8)
- ul/li: left padding, bullet color #3B82F6
- table: full width, border-collapse, header bg rgba(255,255,255,0.05)
- strong: color white
- a: color #3B82F6, hover underline
- code: bg rgba(255,255,255,0.05), padding 2px 6px, radius 4px

### Build
Write complete HTML to `./<slug>/index.html`.
Update `meta.json`: add `"phase4"`, set status `"complete"`, add completion timestamp.

Commit: "research: phase 4 complete — dashboard built"

---

## PHASE 5: FINALIZE

### 5.1 — Register in Projects Manifest
Check if `./projects.json` exists in the parent directory. If not, create with empty array.

Append:
```json
{
  "topic": "$ARGUMENTS",
  "research_question": "<from meta.json>",
  "slug": "<slug>",
  "audience": "<from meta.json>",
  "depth": "<from meta.json>",
  "created": "<ISO timestamp>",
  "topic_count": "<number of topic areas>",
  "source_count": "<number of unique sources>",
  "artifacts": ["briefing", "audio", "quiz", "flashcards", "infographic", "mindmap", "slides", "intel"],
  "confidence": "<overall confidence from source quality assessment>",
  "notebook_id": "<from meta.json>"
}
```
Remove any existing entries with the same slug (re-runs).

### 5.2 — Create INDEX
Create `./<slug>/00_INDEX.md`:

```markdown
# Research Package: $ARGUMENTS

**Research Question:** [from scoping]
**Audience:** [from scoping]
**Depth:** [from scoping]
**Generated:** [date]
**Sources Analyzed:** [count]
**Overall Confidence:** [from source quality assessment]

## Research Output
| File | Description | Confidence |
|------|-------------|------------|
| README.md | Project overview with top findings | — |
| output/01-[topic].md | [description] | [level] |
| output/02-[topic].md | [description] | [level] |
| output/source-quality-assessment.md | Source ratings | — |
| output/strategic-intel.md | Strategic intelligence | — |

## NotebookLM Artifacts
| File | Description |
|------|-------------|
| output/executive-briefing.md | Executive brief |
| audio_briefing.mp3 | Podcast briefing |
| output/quiz.json | Knowledge quiz |
| output/flashcards.json | Study flashcards |
| output/infographic.png | Visual infographic |
| output/mindmap.json | Topic mind map |
| output/slides.pdf | Slide deck |

## How to Use
1. Open index.html in any browser (works on phone)
2. Listen to audio_briefing.mp3 on your commute
3. Read README.md for top findings summary
4. Dive into output/ files for topic deep dives
```

### 5.3 — Completion Summary
Print to terminal:

```
═══════════════════════════════════════════════════════════
  RESEARCH COMPLETE: $ARGUMENTS
═══════════════════════════════════════════════════════════

  Research Question: [question]
  Audience: [audience type]
  Depth: [depth level]

  Location: ./<slug>/
  Dashboard: ./<slug>/index.html

  Research Output:
  ✓ [N] topic areas researched
  ✓ [N] unique sources analyzed
  ✓ [N] findings extracted
  ✓ Source quality: [X]% medium-to-high authority
  ✓ Overall confidence: [level]

  NotebookLM Artifacts:
  ✓ Executive Briefing
  ✓ Audio Podcast
  ✓ Knowledge Quiz ([N] questions)
  ✓ Flashcards ([N] cards)
  ✓ Infographic
  ✓ Mind Map
  ✓ Slide Deck
  ✓ Strategic Intel

  NotebookLM Notebook: <notebook_id>

  Open index.html in your browser to view everything.
  The dashboard is portable — works on your phone too.
═══════════════════════════════════════════════════════════
```

Replace ✓ with ✗ for anything that failed.

Commit: "research: complete — $ARGUMENTS research package finalized"

---

## RULES & CONSTRAINTS

1. **SearXNG finds URLs. Firecrawl reads them.** Don't use SearXNG to extract page content — its content extraction is mediocre. Firecrawl is purpose-built for this.

2. **Phase 0 is mandatory.** Never skip scoping. Bad scope = bad output.

3. **Cache before you parse.** Save raw Firecrawl output before extracting findings. If parsing goes wrong, you can re-parse without re-fetching.

4. **Source quality ratings are real.** A 1-star source doesn't belong in a key finding. Demote or exclude weak sources, don't average them with strong ones.

5. **Flag discrepancies.** If two sources disagree, surface it. Don't pick a side by default.

6. **Don't fabricate citations.** If you can't find a source, say so. A finding without a real citation isn't a finding.

7. **Dashboard works offline.** Base64-embed everything. Stone might pull this up on his phone on an airplane.

8. **Never use this skill when the user wants fast research.** That's what `quick-research` is for. This skill is the 1-2 hour pipeline.
