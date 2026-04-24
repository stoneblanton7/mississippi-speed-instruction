---
name: site-clone
description: Extract content and structure from any website using Firecrawl so you can rebuild it with better design. Use this skill whenever you need to capture a site's words, page hierarchy, forms, CTAs, and structural elements WITHOUT inheriting their fonts, colors, or visual styling. Triggers on any mention of site clone, scrape website, extract content, copy a site's copy, rebuild a website, or analyzing competitor sites for a rebuild.
---

# Site Clone Skill

Extract the **content and structure** from a target website using Firecrawl. Output clean, organized markdown files that capture exactly what the site says and how it's organized — without any of the styling decisions (fonts, colors, shadows, hex values) that Stone will replace anyway.

**Philosophy:** Stone builds better-looking sites than whoever he's cloning from. What he actually needs is the words, the page structure, the CTAs, the forms, and the content hierarchy. Everything else gets thrown out.

---

## WHAT THIS SKILL CAPTURES

**YES — extract these:**
- Page text content (headlines, subheadlines, body copy)
- Page hierarchy (home → services → contact → etc.)
- Navigation structure (nav items and their destinations)
- Form fields and their labels
- CTA button text (exact wording)
- Lists, bullet points, FAQ questions and answers
- Testimonials (quote, name, role, company)
- Pricing information (tier names, prices, included items)
- Contact info (phone, email, address, hours)
- Image descriptions and alt text
- Meta descriptions (for SEO reference)

**NO — ignore these:**
- Font families and weights
- Color palettes (hex values, gradients)
- Custom CSS, shadow styles, border radius
- JavaScript animations or interactions
- Specific layout decisions (grid vs flex, spacing values)
- Image files themselves (capture descriptions, not assets)
- Background images or hero photos
- Logo files

Stone is rebuilding the visual layer with his own design system. He does NOT want the source site's styling influencing the new build.

---

## INPUT

The user provides a URL. If not provided, ask for:
1. The URL of the site to clone
2. Whether to clone the full site or a specific page
3. Whether to include competitor sites for comparison (optional)

---

## PHASE 0: SCOPING

Ask the user:

**"What's this for?"** with options:
- **New client prototype** — cloning a client's existing site to rebuild it better
- **Competitor reference** — extracting structure from a competitor to inform a new site
- **Inspiration capture** — pulling content patterns from a site Stone likes

**"Full site or single page?"**
- **Full site** — crawl all discoverable pages (up to 20 by default)
- **Key pages only** — home, about, services, contact (4-6 pages)
- **Single page** — just one specific URL

**"Any pages to skip?"** (optional)
- Blog posts, legal/privacy pages, login/account pages, etc.

After answers, confirm the scope and proceed.

---

## PHASE 1: PROJECT SETUP

### 1.1 — Create Output Folder

Slugify the source URL's domain:
- `https://www.thompsonplumbing.com` → `thompson-plumbing-clone`
- `https://anthropic.com/claude` → `anthropic-clone`

Create: `./<slug>-clone/`

### 1.2 — Folder Structure

```
<slug>-clone/
├── 00_SUMMARY.md           # What was extracted, page count, key findings
├── site-structure.md       # Full site map + nav hierarchy
├── pages/
│   ├── home.md
│   ├── about.md
│   ├── services.md
│   ├── contact.md
│   └── [other-pages].md
├── content/
│   ├── headlines.md        # All major headlines across all pages
│   ├── ctas.md             # All CTA button text and destinations
│   ├── testimonials.md     # All testimonial content
│   ├── faq.md              # All FAQ Q&A content
│   ├── pricing.md          # Pricing tables, tier info
│   └── forms.md            # Form fields and submit button copy
└── raw/
    └── [original-firecrawl-output].md  # Raw Firecrawl output for reference
```

---

## PHASE 2: CRAWL WITH FIRECRAWL

Use Firecrawl MCP to extract site content. Firecrawl handles JavaScript rendering, navigation, and returns clean markdown.

### 2.1 — Discover Site Structure

If user selected "full site":
- Use Firecrawl's crawl endpoint with `maxDepth: 2` and `limit: 20`
- Exclude patterns: `/blog/*`, `/privacy`, `/terms`, `/login`, `/account/*`, `/cart`, `/checkout`
- Returns list of all crawlable pages

If "key pages only":
- Crawl the homepage first
- Parse navigation links from the homepage
- Crawl up to 6 main nav destinations

If "single page":
- Just scrape the one URL

### 2.2 — Scrape Each Page

For each URL, use Firecrawl's scrape endpoint with:
- `formats: ['markdown']` (skip HTML, we don't need it)
- `onlyMainContent: true` (strips nav, footer, ads)
- `includeTags: ['h1', 'h2', 'h3', 'p', 'ul', 'ol', 'table', 'blockquote', 'a']`
- `excludeTags: ['style', 'script', 'aside.sidebar']`

Save each raw Firecrawl output to `./raw/[page-slug]-raw.md` for reference.

### 2.3 — Handle Failures

If a URL fails to scrape:
- Log it in `./raw/failed-urls.md` with the error
- Continue with remaining pages
- Don't halt the pipeline

---

## PHASE 3: STRUCTURE THE CONTENT

This is where the skill adds real value — organizing Firecrawl's raw output into Stone-usable files.

### 3.1 — Per-Page Files (`pages/[page].md`)

For each scraped page, create a structured markdown file:

```markdown
# [Page Name] — [Source URL]

**Page purpose:** [1-sentence summary of what this page does]
**Primary CTA:** [what the page is trying to get visitors to do]

---

## Meta
- **URL:** [full URL]
- **Title tag:** [page title]
- **Meta description:** [meta description if present]

---

## Page Hierarchy

### H1 (Hero Headline)
[The main headline, exactly as written]

### H1 Subheadline
[The supporting subheadline below the H1]

### H2 Sections (in order)
1. [First H2 heading]
2. [Second H2 heading]
3. [etc.]

---

## Full Content

### [Section 1 - H2]
[Body copy of section 1, exactly as written]

[Any lists, quotes, or structured content in this section]

### [Section 2 - H2]
[etc.]

---

## CTAs on This Page
| Button Text | Destination | Location on Page |
|-------------|-------------|------------------|
| "Get a Free Quote" | /contact | Hero, right side |
| "Call Now" | tel:+16015551234 | Sticky header |
| "See Our Work" | /gallery | Below testimonials |

---

## Forms on This Page
[If the page has a form, document it:]
- **Form purpose:** [Quote request / Contact / Newsletter / etc.]
- **Fields:** Name (required), Email (required), Phone (required), Message (optional)
- **Submit button text:** "Send My Request"
- **Success message:** [if visible]

---

## Notes
[Anything unusual or worth flagging — weird copy, broken links, missing content, etc.]
```

### 3.2 — Site Structure File (`site-structure.md`)

```markdown
# Site Structure — [domain.com]

**Total pages crawled:** [N]
**Primary navigation items:** [count]

---

## Navigation Hierarchy

### Primary Nav
- Home (/)
- About (/about)
- Services (/services)
  - Service A (/services/a)
  - Service B (/services/b)
- Contact (/contact)

### Footer Nav
- Privacy Policy (/privacy)
- Terms (/terms)
- Sitemap (/sitemap)

---

## Page Map

| Page | URL | Purpose | Word Count |
|------|-----|---------|------------|
| Home | / | Lead capture, overview | 450 |
| About | /about | Trust building, owner story | 680 |
| Services | /services | Service overview | 320 |
| [etc.] |

---

## URL Patterns
[Note any URL patterns worth replicating:]
- Service pages use `/services/[name]` structure
- Location pages use `/locations/[city]`
- Case studies use `/work/[project-name]`
```

### 3.3 — Consolidated Content Files

These pull content out of the page files into single-topic files that are easier to reference when building:

**`content/headlines.md`** — Every major headline across the site:
```markdown
# All Headlines

## Home
- H1: [headline]
- H2: [section headline]
- H2: [section headline]

## About
- H1: [headline]
- H2: [section headline]

## Services
- H1: [headline]
- H2: [section headline]
```

**`content/ctas.md`** — Every CTA and its destination:
```markdown
# All CTAs

| Button Text | Page | Destination | Context |
|-------------|------|-------------|---------|
| "Get a Free Quote" | Home | /contact | Hero CTA |
| "Call Now: (601) 555-1234" | All pages | tel:link | Sticky nav |
| [etc.] |
```

**`content/testimonials.md`** — Every testimonial:
```markdown
# Testimonials

## Testimonial 1
**Quote:** "[exact quote]"
**Name:** [name]
**Role/Location:** [role or city]
**Source page:** /home

## Testimonial 2
[etc.]
```

**`content/faq.md`** — Every FAQ Q&A:
```markdown
# FAQ Content

## Q: [question exactly as written]
A: [answer exactly as written]

## Q: [question]
A: [answer]
```

**`content/pricing.md`** — Any pricing info:
```markdown
# Pricing Information

## Found on: /services

### Tier 1: Basic — $X
- [Included item 1]
- [Included item 2]

### Tier 2: Premium — $Y
- [Included item 1]
- [Included item 2]
```

**`content/forms.md`** — Every form on the site:
```markdown
# Forms

## Contact Form (on /contact)
**Fields:**
- Name* (text)
- Email* (email)
- Phone (tel)
- Message* (textarea, 4 rows)

**Submit button:** "Send My Message"
**Success state:** "Thanks! We'll be in touch within 24 hours."
```

### 3.4 — Summary File (`00_SUMMARY.md`)

```markdown
# Site Clone Summary — [domain.com]

**Source:** [original URL]
**Cloned:** [date]
**Pages extracted:** [N]
**Total word count:** [N]

---

## What's Here

This folder contains the extracted content and structure from [domain.com]. 
Use these files to rebuild the site with your own design system.

### Files
- `site-structure.md` — Full site map and navigation
- `pages/` — Per-page content breakdowns
- `content/` — Consolidated content by type (headlines, CTAs, testimonials, FAQ, pricing, forms)
- `raw/` — Original Firecrawl output for reference

---

## Key Observations

**Site purpose:** [1-2 sentence summary of what this site does]
**Primary CTA pattern:** [main action the site pushes]
**Tone of voice:** [formal / casual / warm / corporate / etc.]
**Content gaps (opportunities for the rebuild):**
- [Anything missing that a better site would have]
- [Thin pages that need more content]
- [Missing trust signals, testimonials, etc.]

**Content strengths (keep these):**
- [What this site does well — keep in the rebuild]

---

## Use Notes for Stone

The content in these files is the SOURCE site's words. Use them as:
- Reference for what the client expects to see (if this is their current site)
- Starting point for new copy (paraphrase and improve, don't verbatim copy for a client rebuild)
- Structural template for page hierarchy

**Remember:** Don't inherit the styling decisions. The fonts, colors, shadows, and layout choices in the source site are being replaced. Only the content and structure transfer over.
```

---

## PHASE 4: CLEANUP

### 4.1 — Remove Styling Leakage

Firecrawl sometimes includes inline styling or class references in its markdown output. After organizing the content, do a pass through each file to remove:
- Inline CSS mentions
- Class names or IDs
- Color hex values in copy (unless they're meaningful content, like "our brand color is #FF6B35")
- Font family references
- Specific pixel measurements

The goal: every file should read as pure content, stripped of how it was visually presented.

### 4.2 — Flag Problems

If any of these issues exist, note them in `00_SUMMARY.md` under "Extraction Issues":
- Pages that failed to scrape
- Pages with suspiciously little content (possible JS rendering failure)
- Duplicate content across pages
- Placeholder text that wasn't real content ("Lorem ipsum", "Your text here")
- Broken internal links

### 4.3 — Git Commit

Commit: "site-clone: extracted [N] pages from [domain.com]"

---

## OUTPUT SUMMARY

Print to terminal when complete:

```
═══════════════════════════════════════════════════════════
  SITE CLONE COMPLETE: [domain.com]
═══════════════════════════════════════════════════════════

  Source: [URL]
  Location: ./[slug]-clone/

  Extracted:
  ✓ [N] pages
  ✓ [N] total words of content
  ✓ [N] headlines
  ✓ [N] CTAs documented
  ✓ [N] testimonials captured
  ✓ [N] FAQ questions
  ✓ [N] form fields documented

  Skipped:
  ✗ Styling (fonts, colors, CSS) — by design
  ✗ Image files — descriptions only
  ✗ [N] pages (if any failed)

  Next steps:
  1. Review 00_SUMMARY.md for overview
  2. Use pages/ folder to understand per-page content
  3. Reference content/ folder when building new pages
  4. Apply YOUR design system — don't inherit theirs
═══════════════════════════════════════════════════════════
```

---

## RULES & CONSTRAINTS

1. **Never copy styling decisions.** This skill captures content, not design. If the user specifically wants styling captured (rare), they should use a different tool.

2. **Preserve exact wording.** When extracting content, preserve the source's exact words. Don't paraphrase. Don't "improve." Stone will decide what to keep and what to rewrite during the build.

3. **Structure over beauty.** The output files should be easy to grep and reference, not beautifully formatted. Use tables where they help, but prioritize extractability.

4. **One folder per clone.** Don't commingle multiple site clones. Each domain gets its own folder.

5. **Respect Firecrawl rate limits.** Use sensible delays between requests. Don't hammer the API.

6. **This is not research.** Don't add opinions, confidence ratings, or source quality assessments. Those belong in the `deep-research` skill. This skill is pure extraction.

7. **Firecrawl dependency.** This skill assumes Firecrawl MCP is configured. If Firecrawl isn't available, the skill should halt and tell Stone to configure it rather than falling back to a weaker scraper.
