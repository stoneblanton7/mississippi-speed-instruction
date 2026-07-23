# Architecture summary — mike-website

Static-first marketing site with one serverless function. See
[[universal-rules]] for the contract and [[data-model]] for data shapes.

## Services

| Piece | What it is | Where |
|---|---|---|
| Frontend | React 18 + Vite SPA, Tailwind v3, React Router v6 | `frontend/` |
| Newsletter API | Vercel serverless function → Mailchimp member upsert + tags | `api/subscribe.js` |
| Contact form | Client-side POST to an n8n webhook (`CONTACT_WEBHOOK_URL` in config.js) | n8n (external) |
| Registration | Fully external — campnetwork.com via `REGISTER_URL` | external |
| Dev container | Docker + compose, Vite dev server on port 5191 | `docker-compose.yml` |

## How data flows

- All page content is compiled in: `frontend/src/config.js` (camps, Vimeo IDs,
  social, register URL) and `frontend/src/api/data/` (elements, podcast
  episodes, videos). No CMS, no database.
- `scrape-output/` holds the editorial source-of-record from the original site
  (copy.md, camps.json, videos.json, images.json) — build-time reference, not
  consumed at runtime. `MSI-AMENDMENT.md` overrides it where they conflict.
- Newsletter: form → POST `/api/subscribe` → Mailchimp (honeypot + validation
  in the function). Contact: form → n8n webhook directly from the browser.

## Deploy reality

Two paths exist and they differ:
- **Vercel** — serves the SPA and runs `api/subscribe.js`.
- **Sam's server (static Docker path)** — Sam pulls the repo and serves the
  static build; `/api/*` serverless routes may NOT run there. Any feature that
  depends on `/api/*` must degrade gracefully on that path.

## External dependencies

Mailchimp (newsletter), n8n (contact), Vimeo (all video), campnetwork.com
(registration), Google Fonts (Anton, Oswald, Inter, JetBrains Mono).
