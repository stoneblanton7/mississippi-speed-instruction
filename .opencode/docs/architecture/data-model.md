# Data model — mike-website

No database. All runtime data is compiled-in JS/JSON. This doc is the ERD-gate
target: **any change to a shape below gets updated here before the work is
reported done.** See [[architecture-summary]] for where each piece runs.

## `frontend/src/config.js` (runtime constants)

- `REGISTER_URL` / `REGISTER_LINK_PROPS` — the ONE campnetwork.com register
  link (`href`, `target: '_blank'`, `rel: 'noopener noreferrer'`). All Register
  CTAs spread `REGISTER_LINK_PROPS`; nothing else hardcodes the URL.
- `CAMPS` — `{ boys, girls }`, each:
  `{ id, name, gender, ageRange, dates, time, location, sports, spots, cost, description }`.
  2026 values: boys June 9-11, girls June 23-25, ages 7-14, 4:00–5:45 PM,
  Madison Ridgeland Academy, 50 spots, $115. Editorial source:
  `scrape-output/camps.json` + `MSI-AMENDMENT.md` (tiebreaker).
- `SOCIAL` — facebook / instagram / youtube / tiktok URLs.
- `CONTACT_WEBHOOK_URL` — n8n webhook; resolved at runtime from
  `window.__MSI_CONFIG__.N8N_CONTACT_WEBHOOK_URL`, else
  `VITE_N8N_CONTACT_WEBHOOK_URL`, else `''`.
- `VIMEO` — named embed IDs (homeHero + hash, homeFeatured[3], mikeBio,
  philipBio). `VIMEO_HASHES` — id → `h=` hash for every private-hashed-link
  video (14 entries). `buildVimeoSrc(id, params, explicitHash)` builds player
  URLs from these.

## `frontend/src/api/data/`

- `elements.js` (canonical ten-elements data) — maps `elements.json` rows into
  ordered records keyed by slug, attaching a PNG icon per element. Note:
  `components/sections/TenElements.jsx` still holds a local home-copy variant —
  consolidation pending (WEBSITE_FIX_PLAN §3.1).
- `episodes.js` — maps `episodes.json` (podcast episodes with speaker-tagged
  transcripts under `frontend/public/podcast/ep_N_transcript.txt`) and attaches
  thumbnails by `thumbnailKey` (ep1-ep7). Consumers sort by `number`, so the
  highest-numbered episode is automatically "latest" on home and the hub.
- `videos.js` — `VIDEO_CATEGORIES` (`coaches`, `promo`) and `VIDEOS`:
  `{ id, hash, title, coach, category }` per Vimeo video.

## `/api/subscribe` contract (Vercel function → Mailchimp)

POST JSON: `{ email, first_name?, parent_type?, website? }`.
- `website` is a honeypot — non-empty → fake 200 success, no Mailchimp call.
- `email` lowercased, regex-checked; `first_name` capped at 100 chars.
- `parent_type` allow-listed (`boys_parent`, `girls_parent`, `both_parent`,
  `future_parent`; anything else → general) and mapped to Mailchimp tags via
  `TAG_MAP`. Upserts the member (MD5 email hash) in the configured list.
- Secrets (Mailchimp key/list) are server-side env only. On Sam's static
  deploy path this route may not exist — the form must degrade gracefully.

## Contact form → n8n

Browser POSTs the contact form payload directly to `CONTACT_WEBHOOK_URL`.
No server component in this repo.

## Editorial sources (not runtime)

`scrape-output/copy.md`, `camps.json`, `videos.json`, `images.json` — the
scraped source-of-record. Keep `config.js` CAMPS in sync with `camps.json` per
`MSI-AMENDMENT.md`.
