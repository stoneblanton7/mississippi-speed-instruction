# Scrape Summary — mississippispeed.com

Scraped 2026-04-24 via Firecrawl `/v1/scrape` endpoint.

## Pages scraped (15 / 15 ok)

| Page | URL | Status |
|------|-----|--------|
| Home | https://mississippispeed.com/ | ok |
| Classes | https://mississippispeed.com/classes/ | ok |
| Contact | https://mississippispeed.com/contact/ | ok |
| Mike Frascogna III bio | https://mississippispeed.com/mike-frascogna-iii/ | ok |
| Philip Short bio | https://mississippispeed.com/philip-short/ | ok |
| Skill: Acceleration | https://mississippispeed.com/skill/acceleration/ | ok |
| Skill: Balance & Body Control | https://mississippispeed.com/skill/balance-body-control/ | ok |
| Skill: Change of Direction | https://mississippispeed.com/skill/change-of-direction/ | ok |
| Skill: Core Strength | https://mississippispeed.com/skill/core-strength/ | ok |
| Skill: Flexibility | https://mississippispeed.com/skill/flexibility/ | ok |
| Skill: Foot Quickness | https://mississippispeed.com/skill/foot-quickness/ | ok |
| Skill: Jumping | https://mississippispeed.com/skill/jumping/ | ok |
| Skill: Lateral Speed | https://mississippispeed.com/skill/lateral-speed/ | ok |
| Skill: Top Speed | https://mississippispeed.com/skill/top-speed/ | ok |
| Skill: Visual Acuity | https://mississippispeed.com/skill/visual-acuity/ | ok |

Raw JSON responses are in `/scrape-output/raw/` (one file per URL).

## Vimeo URLs (27 entries / 24 unique IDs)

| Section | Count | Notes |
|---------|-------|-------|
| Home hero | 1 | "MSI Web Header" — auto-play loop |
| Home featured | 3 | Coach Epsy, NS, PS drills |
| Mike's page | 7 | 1 bio + 6 drills (3 also appear on home) |
| Philip's page | 6 | 1 bio + 5 quarterback drills |
| Skill overviews | 10 | One per skill page |
| Camp videos | 0 | Live site has no embedded camp video |

All Vimeo IDs are owned by `Frascogna IP` (vimeo.com/user32580864). Player embed format: `https://player.vimeo.com/video/{ID}`.

**Note:** Vimeo URLs were captured from the live HTML iframes, not tested for public playback. Mike's account may have privacy/domain restrictions on some videos — verify embeddability during the rebuild.

## Images (36 cataloged)

| Bucket | Count | Notes |
|--------|-------|-------|
| Brand (logo, white logo, 30-years icon, hero jpg) | 4 | All present |
| Skill icons (10 unique) | 10 | One per skill |
| Sport meter graphics | 16 | 5 sports × 1–5 levels (only the level values actually used in skill pages exist on disk) |
| Portraits (Mike, Philip) | 2 | |
| Camp photos | 4 | summer-speed-camp + 3 candid camp photos |

The site only uses 5 sports for the importance-by-sport meter (Baseball, Basketball, Football, Soccer, Volleyball) — not the broader list mentioned in the original prompt.

## Brand assets downloaded (32 / 32 ok)

Saved to `/scrape-output/brand-assets/`:

- `logo.svg` — primary MSI Cheetah logo (vector)
- `logo-white.png` — footer white version
- `thirty-years-icon.png` — "30 Years of Speed" badge
- `thirty-years-hero.jpg` — homepage 30-years section image
- `skill-icon-{slug}.png` — all 10 skill icons (acceleration, balance-body-control, change-of-direction, core-strength, flexibility, foot-quickness, jumping, lateral-speed, top-speed, visual-acuity)
- `meter-{sport}-{level}.png` — sport importance meters present on site (16 files: baseball 2/3/4/5, basketball 1/4/5, football 4/5, soccer 4/5, volleyball 1/2/3/4/5)
- `portrait-mike.jpg` — Mike's bio portrait
- `portrait-philip.jpg` — Philip's bio portrait

## Failures / gaps

- ~~**No girls speed camp page exists.**~~ **Resolved 2026-04-24:** Shane provided real summer 2026 data for both Boys (June 9-11) and Girls (June 23-25) camps. Authoritative copy now lives in `copy.md` and `camps.json`. The live mississippispeed.com still shows stale 2024 single-camp data — the rebuild replaces both.
- ~~**Camp registration URL.**~~ **Resolved 2026-04-24:** Both camps share `https://portal.campnetwork.com/Register/Register.php?camp_id=398473` per Shane.
- ~~**Camp marketing image files.**~~ **Resolved 2026-04-24:** `camp-boys-banner.png` and `camp-girls-banner.png` saved to `brand-assets/`. May be replaced with updated art before launch.
- **Skill pages are placeholders.** All 10 skill pages on the live site use Lorem ipsum for both the definition paragraph and per-sport importance copy. Only the meter values (encoded in image filenames like `Baseball-5.png`) are real signal. Per Stone, we'll fill these in during the build phase. `copy.md` preserves the placeholders verbatim so the structure isn't lost.
- **Phillip Short — name spelling correction.** Live site has a typo: it spells the name "Philip" (one L). Per Stone, the correct spelling is **"Phillip" with two Ls**. The rebuild uses the correct two-L spelling. `copy.md` and `camps.json` have been corrected; raw scrape JSON keeps the original (typo) wording for reference. The Vimeo video titles still use the one-L spelling because they are the actual asset titles on Mike's Vimeo account; the rebuild can re-label them on-page without renaming the source.
- **No copyright line.** The live footer has no copyright statement.
- **Latin-1 mojibake in scraped markdown.** Firecrawl returned curly apostrophes/dashes as replacement chars (`�`); I normalized them to ASCII apostrophes/dashes before writing `copy.md`. The raw JSON files keep the original bytes.
- **Vimeo URLs not playback-tested at scrape time.** Stone confirmed they worked in the previous build of the site, so we expect them to be fine.

## Files produced

```
scrape-output/
├── SUMMARY.md           ← this file
├── copy.md              ← all body copy, structured by page
├── camps.json           ← real 2025 boys + girls camp data (supersedes scraped values)
├── videos.json          ← all Vimeo URLs grouped by section
├── images.json          ← every image URL on the live site, bucketed
├── brand-assets/        ← 32 downloaded image files (camp marketing art still pending)
└── raw/                 ← 15 raw firecrawl JSON responses
```

## Reproducing

```bash
python scripts/scrape.py <url> [<url> ...]   # writes raw/{slug}.json
python scripts/extract.py                     # parses raw/* into copy.md, videos.json, images.json
python scripts/download_assets.py             # downloads brand-assets/* from images.json
```

Firecrawl API key is read from project `.env` (already gitignored).
