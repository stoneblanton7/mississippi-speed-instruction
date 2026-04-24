---
name: quick-research
description: Fast topic scan in 2-5 minutes. Use this skill whenever you need to quickly understand a topic, find top content about a person or company, or get a fast snapshot of what's out there — WITHOUT the 1-2 hour deep research pipeline. Triggers on any mention of quick research, fast research, scan this topic, what's out there on X, find top content about Y, or quick brief.
---

# Quick Research Skill

Fast topic scan. Get the top sources, extract the key content, output one clean markdown file. No phases, no dashboards, no confidence ratings, no interactive scoping. Just speed.

**Use this when:** You need to sound smart in a meeting in 10 minutes, you want the top Alex Hormozi YouTube videos on a topic, you need to quickly know what competitors charge, you want a snapshot of industry chatter on a subject.

**Don't use this when:** You need a knowledge base for a big project, you need source quality ratings, you need synthesis across 50+ sources. That's `deep-research`.

---

## INPUT

One argument: the topic or query.

Examples:
- "Alex Hormozi lead generation strategies"
- "best scroll animations 2026"
- "Mississippi gun trust attorney pricing"
- "top YouTube videos about React Server Components"

---

## PHASE 1: DISCOVER (SearXNG)

Run 2-3 SearXNG searches with different angles:

1. **Broad query:** [topic] — returns top general results
2. **Content query:** [topic] "top" OR "best" OR "2026" — returns curated/ranked content
3. **Platform query (optional):** If topic mentions YouTube/Twitter/Reddit specifically, add `site:youtube.com` or equivalent

Collect 8-15 URLs total. Prioritize:
- YouTube videos (if topic is content-related)
- Reputable publications
- Named expert blogs
- Company/product pages

Skip:
- Forums and Reddit (too much noise for a quick scan)
- Paywalled sites (waste of time)
- Aggregators that just republish (Medium reprints, etc.)

---

## PHASE 2: EXTRACT (Firecrawl)

Use Firecrawl to scrape the top 5-8 URLs in parallel.

- `formats: ['markdown']`
- `onlyMainContent: true`
- Skip any URL that takes longer than 10 seconds to return (move on)

If Firecrawl isn't configured or fails, fall back to web_fetch for the top 3-5 URLs. Don't halt.

---

## PHASE 3: SYNTHESIZE

One markdown file. One read. No folders, no dashboards.

**Output:** `./quick-research-[slug]-[date].md`

Where `[slug]` is the topic slugified and `[date]` is YYYY-MM-DD.

### File Format

```markdown
# Quick Research: [Topic]

**Generated:** [date]
**Sources scanned:** [N]
**Time to generate:** [actual duration]

---

## TL;DR

[3-5 bullet points. The top takeaways. What someone needs to know after 60 seconds of reading this file.]

- Key insight #1 with specific detail
- Key insight #2 with specific detail
- Key insight #3 with specific detail

---

## Top Sources

Ranked by relevance and authority. Each entry is a 1-2 sentence summary + link.

### 1. [Title] — [Source/Author]
[1-2 sentence summary of what this source says or teaches]
🔗 [URL]

### 2. [Title] — [Source/Author]
[Summary]
🔗 [URL]

[Continue for 5-10 top sources]

---

## Key Themes

[What patterns emerged across multiple sources. 3-5 short paragraphs or bullet sections.]

### [Theme 1]
[1-2 paragraphs explaining what the sources agree on in this area]

### [Theme 2]
[etc.]

---

## Specific Data Points

[Pull out every specific number, stat, or concrete claim worth remembering.]

- [X]% of [Y] according to [Source]
- $[X] average price for [Y]
- [X] days/weeks/months typical timeframe for [Y]
- [etc.]

---

## Notable Quotes

[3-5 direct quotes worth remembering, with attribution.]

> "[Quote]" — [Author/Source]

---

## What's Missing

[Anything you couldn't find, any pages that didn't load, any topics the sources skipped. Be honest.]

---

## Next Steps

If you want to go deeper on this:
- Run `/deep-research [topic]` for a full knowledge base
- Check out [specific recommended source] for the most in-depth take
- [Any other logical follow-up]
```

---

## PHASE 4: DONE

No git commit (this is ephemeral). No dashboard. No phases to track.

Print to terminal:

```
═══════════════════════════════════════════════════════════
  QUICK RESEARCH COMPLETE: [topic]
═══════════════════════════════════════════════════════════

  Sources scanned: [N]
  Sources extracted: [N]
  Time: [Xm Ys]

  File: ./quick-research-[slug]-[date].md

  Open it. Read the TL;DR. Done.
═══════════════════════════════════════════════════════════
```

---

## RULES

1. **Speed over completeness.** The whole point is fast. If it takes longer than 5 minutes, something is wrong — abort and tell the user.

2. **No scoping questions.** Just run. The user gave you a topic. Go. If the topic is ambiguous ("research pricing"), use best judgment and note the interpretation in the output.

3. **Quality filter.** Don't include garbage sources just to hit a count. Better to output 5 great sources than 15 mediocre ones.

4. **Preserve specifics.** Numbers, prices, dates, names — capture them exactly. That's what the user actually needs.

5. **No confidence ratings.** This isn't peer-reviewed research. The user knows it's a quick scan. Don't pretend it's more.

6. **Paraphrase, don't plagiarize.** Summaries are Stone's words interpreting the source. Direct quotes go in the "Notable Quotes" section with attribution.

7. **No folders or subdirectories.** One file. Lives in the current working directory. Gone when the user deletes it.

8. **SearXNG for discovery, Firecrawl for extraction.** That's the stack. If either is missing, fall back to web_search and web_fetch but note it in the output.

9. **Never use this for medical/legal/financial advice topics.** Those need the deep-research skill with proper source quality assessment. If the topic is in one of those areas, refuse and direct the user to deep-research instead.
