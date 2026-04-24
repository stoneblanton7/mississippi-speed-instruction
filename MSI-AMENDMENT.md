# MSI Build Amendment

Project-specific corrections and decisions that apply across every phase of the build. When the brief, the live site, and `scrape-output/` disagree, this file is the tiebreaker.

## Camp data (authoritative)

| Field    | Boys                    | Girls                   |
|----------|-------------------------|-------------------------|
| Dates    | June 9-11, 2026         | June 23-25, 2026        |
| Time     | 4:00–5:45 PM            | 4:00–5:45 PM            |
| Location | Madison Ridgeland Academy | Madison Ridgeland Academy |
| Ages     | 7-14                    | 7-14                    |
| Spots    | 50                      | 50                      |
| Cost     | $115                    | $115                    |
| Register | https://portal.campnetwork.com/Register/Register.php?camp_id=398473 (both share) | (same)                |

Source: Shane on behalf of Mike, 2026-04-24 — see `scrape-output/camps.json`. The CAMPS const in `frontend/src/config.js` is wired from this; the placeholder values in the build-site brief (June 2025, $135, 40 spots, ages 6-12) are stale and ignored per the brief's own override rule.

## Name spelling

- **Mike Frascogna III** — founder. Always include "III" in his bio headline; URL slug omits it (`/about/mike-frascogna`) for cleanliness.
- **Phillip Short** — quarterback specialist coach. **Two Ls.** Live mississippispeed.com has typo "Philip" (one L); we use the correct two-L spelling everywhere on-site. The two existing Vimeo asset titles (`Philip Short Bio Video`) keep the one-L spelling because they're the actual asset titles on Mike's Vimeo account; we re-label them on-page if needed without renaming the source.

Phase 6 grep audit: `grep -rn "Philip[^l]" frontend/src/` returns zero hits.

## Route map (intentionally diverges from live site)

| Route                          | Live site equivalent          |
|--------------------------------|-------------------------------|
| `/about/mike-frascogna`        | `/mike-frascogna-iii/`        |
| `/about/phillip-short`         | `/philip-short/`              |
| `/elements/<slug>`             | `/skill/<slug>/`              |
| `/camp/boys`, `/camp/girls`    | (only `/classes/` existed)    |

Old URLs aren't preserved — no real inbound links worth keeping. If Mike says otherwise later, add 301s in the deploy config.

## Anti-slop guardrails (project-specific, on top of one-shot defaults)

- **Lime budget** — no more than 15 instances of `--color-accent` across the home page combined. Reserved for: REGISTER CTAs, nav register button, hover states, eyebrow text, max one accent divider per section. Not for stat numbers, not for icon backgrounds, not for card borders.
- **No invented credentials or stats** — every stat/cert in copy must trace to `scrape-output/copy.md`. Three real stats > four fake ones.
- **External register links** — every Register CTA uses `target="_blank" rel="noopener noreferrer"`. Parents don't lose their place on MSI when registering.
- **Dark-only** — `:root` and `.dark` get identical token values; no light-mode visual treatment exists. Theme toggle deliberately not built.

## Skill-page copy (tracked, not blocking)

All 10 skill pages on the live site use Lorem ipsum for definitions and per-sport text. Only the meter values (1-5, encoded in scraped image filenames) are real signal. Per Stone, we ship the structure and meter values now, with light placeholder copy in Mike's voice. Mike replaces real copy as a content pass after launch.

## Out of scope for v1 home page

- Football scroll-pass animation on About page
- Skill detail magazine layout (separate session, separate spec)
- Real testimonials (none exist)
- FAQ accordion
- Light mode
- Mobile sticky register CTA
- Coaches roster page
- Image-gen run (deferred to between Session 1 and Session 2)
