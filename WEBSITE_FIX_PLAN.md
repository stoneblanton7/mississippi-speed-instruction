# MSI Website Cleanup and Hardening Plan

This plan is based on a read-only audit of the current Mississippi Speed Instruction website repo. It is written as an implementation guide for the next work session: what to fix, why it matters, where to look, how to verify it, and what "done" should mean.

No code changes are included in this document.

## Current State Summary

The project is a Vite + React + Tailwind single-page marketing site with a small Vercel API endpoint for Mailchimp newsletter subscriptions.

The site is substantially past scaffold state. It currently includes:

- Home page with hero video/poster, camp cards, ten elements feature, coaches, newsletter, and final CTA.
- Boys and girls camp pages using shared `CampPage`.
- Ten elements index and detail pages backed by `frontend/src/api/data/elements.json`.
- Mike Frascogna and Philip Short bio pages using shared `BioPage`.
- Podcast index and episode detail pages with YouTube embeds and transcript loading.
- Video library page with Vimeo embeds and oEmbed thumbnail fetching.
- Contact page posting to an n8n webhook.
- Newsletter signup posting to `/api/subscribe`, which upserts Mailchimp subscribers.
- Docker, Vercel, scrape, Mailchimp import, and Mailchimp email-template tooling.

The biggest risks are not architectural collapse; they are polish and consistency issues: a broken route, stale docs, duplicated data, oversized assets, accessibility gaps, and a few operational cleanups.

## Priority Order

1. Fix broken navigation and route behavior.
2. Bring documentation up to the real state of the project.
3. Consolidate duplicated/stale data and remove dead config.
4. Optimize heavy media assets.
5. Improve accessibility and mobile interaction details.
6. Harden forms and API behavior.
7. Add quality scripts and smoke-test coverage.
8. Clean up deployment/runtime config and repo hygiene.

## Phase 1: Routing and Navigation Fixes

### 1.1 Fix the missing `/camp` route

**Problem**

The footer links to `/camp`, but `App.jsx` does not define a `/camp` route. The navbar uses dropdown links to `/camp/boys` and `/camp/girls`, so the broken path is easy to miss.

**Files**

- `frontend/src/App.jsx`
- `frontend/src/components/layout/Footer.jsx`
- Optional: `frontend/src/pages/Camp/index.jsx`

**Options**

Option A: Redirect `/camp` to `/camp/boys`.

- Fastest fix.
- Keeps the route alive.
- Less ideal because parents wanting girls camp have to infer there is another page.

Option B: Create a real camp landing page.

- Better user experience.
- Can reuse the home `TwoCampsSection` or a tighter camp comparison view.
- Gives the footer "Camp" link a meaningful destination.

**Recommendation**

Create a lightweight `/camp` landing page with both boys and girls camps side by side, then keep `/camp/boys` and `/camp/girls` as detail pages.

**Implementation Notes**

- Add `frontend/src/pages/Camp/index.jsx`.
- Import it in `App.jsx`.
- Add `<Route path="/camp" element={<Camp />} />`.
- Reuse existing `CAMPS`, `REGISTER_LINK_PROPS`, and camp imagery.
- Avoid duplicating too much of `TwoCampsSection`; if reuse feels clumsy, extract a shared `CampCard`.

**Acceptance Criteria**

- `/camp` renders a real page.
- Footer "Camp" link no longer lands on an unmatched route.
- `/camp/boys` and `/camp/girls` still work.
- Mobile and desktop navigation remain unchanged unless intentionally improved.

**Verification**

- Run `npm run build` from `frontend`.
- Open `/camp`, `/camp/boys`, `/camp/girls`, `/`, and `/contact`.
- Confirm no console errors for route resolution.

### 1.2 Add a catch-all route

**Problem**

There is no explicit 404 or fallback route. In an SPA, an unknown route can become a confusing blank content area depending on router behavior and layout.

**Files**

- `frontend/src/App.jsx`
- Optional: `frontend/src/pages/NotFound.jsx`

**Recommendation**

Add a simple branded 404 page with links back to home, camps, and contact.

**Acceptance Criteria**

- Unknown routes show a useful page.
- The page includes a clear path back to useful site actions.
- The layout keeps the same navbar/footer.

### 1.3 Decide old URL redirects

**Problem**

`MSI-AMENDMENT.md` says old URLs are intentionally not preserved unless Mike says otherwise. Before launch, this should be an explicit decision.

Old live-site equivalents:

- `/classes/`
- `/mike-frascogna-iii/`
- `/philip-short/`
- `/skill/<slug>/`

**Files**

- `vercel.json`
- `frontend/vercel.json`
- `frontend/src/App.jsx`

**Recommendation**

If the domain has existing inbound traffic, add redirects:

- `/classes` -> `/camp`
- `/classes/` -> `/camp`
- `/mike-frascogna-iii` -> `/about/mike-frascogna`
- `/philip-short` -> `/about/philip-short`
- `/skill/:slug` -> `/elements/:slug`

If not preserving old links, document the decision in `CLAUDE.md` and launch notes.

**Acceptance Criteria**

- Either redirects are implemented or the no-redirect decision is documented.
- There is no half-state where old URLs accidentally return blank pages.

## Phase 2: Documentation Refresh

### 2.1 Replace stale `README.md`

**Problem**

`README.md` currently appears to describe the portable `stone-skills` library, not the MSI website. This is actively misleading.

**Files**

- `README.md`

**Recommendation**

Rewrite it for this project.

Suggested structure:

- Project title and purpose.
- Tech stack.
- Local setup.
- Environment variables.
- Available scripts.
- Routes.
- Deployment notes.
- Content/data source-of-truth notes.
- Known operational tools.

**Draft README Outline**

```md
# Mississippi Speed Instruction Website

## What This Is

## Tech Stack

## Local Development

## Environment Variables

## Scripts

## Routes

## Data Sources

## Forms and Integrations

## Deployment

## Maintenance Notes
```

**Acceptance Criteria**

- A new developer can run the site from the README alone.
- The README no longer references cloning `stone-skills` as the project quick start.
- The README clearly says the frontend lives in `frontend/`.

### 2.2 Update `CLAUDE.md`

**Problem**

`CLAUDE.md` says the route pages are stubs, but most are built. It also contains status notes that are now stale.

**Files**

- `CLAUDE.md`

**Recommendation**

Update:

- Status section.
- Project structure.
- Route table.
- "What NOT to break" section.
- Lab notes.
- Current known issues.

**Important**

Keep the project-specific guardrails:

- Register link single-source.
- Philip Short spelling is one L.
- `MSI-AMENDMENT.md` is authoritative.
- Dark-only.
- External register links.

**Acceptance Criteria**

- Route table reflects actual implemented pages.
- It does not say "stub" for built pages.
- It mentions the pending cleanup items after this plan.

### 2.3 Reconcile contradictory Philip/Phillip notes

**Problem**

`MSI-AMENDMENT.md` and `CLAUDE.md` say "Philip" with one L is correct, but `scrape-output/SUMMARY.md` and `scrape-output/camps.json` contain older "Phillip" notes/data.

**Files**

- `MSI-AMENDMENT.md`
- `CLAUDE.md`
- `scrape-output/SUMMARY.md`
- `scrape-output/camps.json`
- `frontend/src/config.js`

**Recommendation**

Do not rewrite raw scrape JSON files, but update derived/summary files so they do not contradict the accepted rule.

Specific changes:

- Keep `MSI-AMENDMENT.md` as the tiebreaker.
- Update `scrape-output/SUMMARY.md` to say the final decision is one L.
- Update `scrape-output/camps.json` descriptions from "Coach Phillip Short" to "Coach Philip Short" if this file is still considered derived/authoritative data rather than immutable raw scrape.
- Confirm `frontend/src` has zero `Phillip` matches.

**Acceptance Criteria**

- `rg -n "Phillip|phillip" frontend/src` returns nothing.
- Any remaining `Phillip` text is clearly historical/raw-source context, not active website truth.

## Phase 3: Data Source Consolidation

### 3.1 Consolidate the elements data

**Problem**

The ten elements are represented in multiple places:

- `frontend/src/config.js` exports a simple `ELEMENTS` list.
- `frontend/src/api/data/elements.js` exports full element data from JSON plus icons.
- `frontend/src/components/sections/TenElements.jsx` defines its own local `ELEMENTS` array with different outcome copy.

This creates drift. A content update could fix one page and miss another.

**Files**

- `frontend/src/config.js`
- `frontend/src/api/data/elements.js`
- `frontend/src/api/data/elements.json`
- `frontend/src/components/sections/TenElements.jsx`
- `frontend/src/pages/Elements/index.jsx`
- `frontend/src/pages/Elements/[ElementSlug]/index.jsx`
- `frontend/src/components/CampPage.jsx`

**Recommendation**

Use `frontend/src/api/data/elements.js` as the single frontend source of truth.

Implementation path:

1. Remove or stop exporting `ELEMENTS` from `config.js`.
2. Update `TenElements.jsx` to import `ELEMENTS` from `../../api/data/elements.js`.
3. If the home-page outcomes need different punchier copy, add a field to `elements.json`, such as `homeOutcome`, rather than defining a separate local array.
4. Keep icon mapping centralized in `elements.js`.

**Acceptance Criteria**

- There is one canonical elements dataset.
- Home, camp pages, elements index, and element details all use the same source.
- No copy drift between element names/slugs/icons.

### 3.2 Consolidate camp data

**Problem**

Camp data appears in:

- `frontend/src/config.js`
- `scrape-output/camps.json`
- `MSI-AMENDMENT.md`

`frontend/src/config.js` is what the app actually uses, but `scrape-output/camps.json` is described as authoritative in docs.

**Files**

- `frontend/src/config.js`
- `scrape-output/camps.json`
- `MSI-AMENDMENT.md`

**Recommendation**

For v1, keep `frontend/src/config.js` as the runtime source, but make the docs say that clearly. If you want stronger data hygiene later, move camp data into `frontend/src/api/data/camps.json` and have `config.js` import/transform it.

**Acceptance Criteria**

- Docs accurately describe which file drives the actual UI.
- The active UI data matches the amendment.
- Boys and girls camp dates, cost, limit, age range, and register URL are consistent everywhere.

### 3.3 Remove unused `WEB3FORMS_ACCESS_KEY`

**Problem**

`frontend/src/config.js` still exports `WEB3FORMS_ACCESS_KEY`, but the contact form now uses n8n and the newsletter uses Mailchimp.

**Files**

- `frontend/src/config.js`

**Recommendation**

Remove the unused export if no code references it.

**Verification**

- `rg -n "WEB3FORMS|WEB3FORMS_ACCESS_KEY" frontend/src`

**Acceptance Criteria**

- No dead Web3Forms config remains in active frontend source.

### 3.4 Remove unused nav constant

**Problem**

`ROUTE_LINKS` is defined in `Navbar.jsx` but not used.

**Files**

- `frontend/src/components/layout/Navbar.jsx`

**Recommendation**

Either use it to render the repeated desktop/mobile links or remove it.

Best cleanup:

- Use `ROUTE_LINKS` to render Podcast, Videos, Elements, Contact in both desktop and mobile nav.
- This reduces duplication and lowers future nav drift.

**Acceptance Criteria**

- No unused `ROUTE_LINKS` constant.
- Desktop and mobile nav links remain identical in behavior.

## Phase 4: Performance and Asset Optimization

### 4.1 Convert large PNG photos to WebP or AVIF

**Problem**

Several image assets are very large for web delivery:

- `kids-camp 7.png`: about 2.5 MB.
- `kids-camp (1).png`: about 2.4 MB.
- `camp-boys-banner.png`: about 2.3 MB.
- `kids-camp (2).png`: about 2.1 MB.
- `camp-girls-banner.png`: about 2.0 MB.
- `kids-camp 10.png`: about 2.0 MB.
- `kids-camp(8).png`: about 1.9 MB.
- `kids-camp 9.png`: about 1.7 MB.
- `kids-camp 5.png`: about 1.7 MB.

These are likely the biggest user-facing performance issue.

**Files**

- `frontend/src/assets/*`
- Components importing these images:
  - `Hero.jsx`
  - `TwoCampsSection.jsx`
  - `CampPage.jsx`
  - `SpeedCampFinal.jsx`
  - Boys/Girls camp pages

**Recommendation**

Use an image pipeline to create optimized versions:

- WebP for broad support.
- AVIF if you want extra compression and can use `<picture>`.
- Width variants for large banners and cards, such as 640, 960, 1280, 1920.

**Implementation Notes**

- Do not optimize logos/icons in a way that introduces blur.
- Keep original source images somewhere if they are useful for future exports.
- Avoid filenames with spaces/parentheses in new optimized assets.

Suggested naming:

```txt
camp-boys-banner-1280.webp
camp-girls-banner-1280.webp
kids-camp-hurdles-960.webp
kids-camp-huddle-1280.webp
```

**Acceptance Criteria**

- Largest visual assets used by the app are WebP/AVIF.
- No page visually regresses.
- Image byte weight drops significantly.
- Build succeeds.

### 4.2 Add explicit image dimensions or stable aspect containers

**Problem**

Most images are in stable containers, which is good, but not all image loads communicate dimensions directly. Layout shift risk is lower because containers use fixed aspect/height, but this should be verified.

**Files**

- Visual components using `img`.

**Recommendation**

For layout-critical images:

- Keep `aspect-*`, fixed-height, or grid row constraints.
- Consider `width` and `height` attributes for images where practical.

**Acceptance Criteria**

- No visible layout shift during load on home/camp pages.
- Lighthouse CLS is low.

### 4.3 Review Vimeo and thumbnail loading

**Problem**

The hero delays Vimeo iframe mounting until after load, which is a smart tradeoff. Other Vimeo thumbnails are fetched client-side through oEmbed. This is simple, but it creates runtime network chatter and depends on Vimeo oEmbed being available.

**Files**

- `frontend/src/hooks/useVimeoThumbnail.js`
- `frontend/src/pages/Videos/index.jsx`
- `frontend/src/components/BioPage.jsx`
- `frontend/src/pages/Elements/[ElementSlug]/index.jsx`

**Options**

Option A: Keep current oEmbed fetching.

- Simple.
- No build-time thumbnail maintenance.

Option B: Precompute/store thumbnails.

- Faster page rendering.
- Fewer client-side requests.
- More maintenance when videos change.

**Recommendation**

For launch, keep current behavior unless Lighthouse/network waterfall shows it hurting. Add fallback placeholder styling for tiles where thumbnails fail.

**Acceptance Criteria**

- Video tiles look intentional even before thumbnails load.
- Failed thumbnail fetches do not create broken-looking blank cards.

## Phase 5: Accessibility and Interaction Polish

### 5.1 Add focus trap to `VideoModal`

**Problem**

`VideoModal` sets `aria-modal="true"` and closes on Escape, but focus is not trapped inside the modal. Keyboard users may tab behind the overlay.

**Files**

- `frontend/src/components/ui/VideoModal.jsx`

**Recommendation**

Implement basic focus management:

- Save the previously focused element.
- Focus the close button when modal opens.
- Trap Tab/Shift+Tab inside the modal.
- Restore focus on close.

**Acceptance Criteria**

- Escape closes the modal.
- Tab stays inside the modal while open.
- Focus returns to the video tile/button that opened it.
- Clicking backdrop still closes the modal.

### 5.2 Make hover-only coach labels keyboard/touch friendly

**Problem**

`MeetTheLeaders.jsx` reveals coach role/name primarily on hover. The link has focus styling, but the text reveal does not appear on focus and may not be visible on touch devices.

**Files**

- `frontend/src/components/sections/MeetTheLeaders.jsx`

**Recommendation**

Use `group-focus-visible` alongside `group-hover`, and consider making the labels always visible on mobile.

**Acceptance Criteria**

- Keyboard focus reveals the same content as hover.
- Mobile users can identify both coaches without needing hover.

### 5.3 Improve Ten Elements mobile language and interaction

**Problem**

The home page says "Hover to explore, click to dive in." Hover is not a mobile interaction.

**Files**

- `frontend/src/components/sections/TenElements.jsx`

**Recommendation**

Change copy to something like:

```txt
Tap an element to dive in. On desktop, hover to preview each one.
```

Or provide a mobile-specific non-rotating list/grid below the ring.

**Acceptance Criteria**

- Instructional copy makes sense on touch devices.
- The rotating ring remains usable on mobile.
- No text or icons overlap at narrow widths.

### 5.4 Review ARIA roles on `CoachToggle`

**Problem**

`CoachToggle` uses `role="tablist"` and `role="tab"` with links. This can be acceptable if implemented carefully, but route navigation tabs often work better as normal links unless full tab semantics are implemented.

**Files**

- `frontend/src/components/ui/CoachToggle.jsx`

**Recommendation**

Either:

- Keep tab semantics and ensure keyboard behavior matches tab expectations.
- Or simplify to a navigation group with `aria-label`, using plain links and `aria-current="page"`.

**Acceptance Criteria**

- Screen reader semantics match actual behavior.
- Keyboard navigation is predictable.

### 5.5 Toast announcements

**Problem**

Both contact and newsletter toasts use `role="status"` and `aria-live="polite"`. Error messages may deserve `role="alert"` or a visible inline error tied to the form.

**Files**

- `frontend/src/components/sections/NewsletterSignup.jsx`
- `frontend/src/pages/Contact/index.jsx`

**Recommendation**

- Keep success as `role="status"`.
- Use inline form errors for validation/submission failures.
- Consider `role="alert"` for failures.

**Acceptance Criteria**

- Success and failure are announced correctly.
- Users do not have to notice a transient toast to understand what happened.

## Phase 6: Forms, API, and Security Hardening

### 6.1 Strengthen newsletter API validation

**Problem**

`api/subscribe.js` validates email with a basic `includes('@')`. It accepts arbitrary `parent_type` and `first_name` shape, falling back tags if unknown.

**Files**

- `api/subscribe.js`
- `frontend/src/components/sections/NewsletterSignup.jsx`

**Recommendation**

Improve validation:

- Trim and normalize email before validation.
- Use a modest email regex, not an over-engineered one.
- Enforce allowed `parent_type` values.
- Limit `first_name` length.
- Return consistent JSON errors.

**Acceptance Criteria**

- Invalid email gets 400.
- Unknown `parent_type` gets either 400 or a deliberate fallback.
- Very long names are rejected or truncated intentionally.
- Valid submissions still upsert to Mailchimp.

### 6.2 Handle non-JSON Mailchimp responses safely

**Problem**

`api/subscribe.js` calls `await response.json()` directly. If Mailchimp ever returns non-JSON content, the handler will throw and return generic 500 instead of a clearer upstream failure.

**Files**

- `api/subscribe.js`

**Recommendation**

Read response text and parse JSON defensively.

**Acceptance Criteria**

- Non-JSON upstream responses do not crash the handler unexpectedly.
- Logs still capture useful upstream information.

### 6.3 Add rate limiting or spam protection

**Problem**

Public newsletter and contact forms can be abused. Contact posts directly to configured webhook from the browser. Newsletter posts to the API endpoint.

**Files**

- `api/subscribe.js`
- `frontend/src/pages/Contact/index.jsx`
- Deployment/provider config

**Options**

- Add a honeypot field.
- Add timestamp/minimum-submit-time checks.
- Add server-side rate limiting if the deployment platform supports it.
- Move contact submission through a first-party API route to hide the n8n webhook.

**Recommendation**

Short term:

- Add honeypot fields to newsletter and contact.
- Add basic server-side checks to `/api/subscribe`.

Better:

- Move contact submission behind `/api/contact`, then forward to n8n server-side.

**Acceptance Criteria**

- Normal users see no added friction.
- Basic bots are filtered.
- The n8n webhook is not exposed if the contact API proxy is implemented.

### 6.4 Clarify contact configuration

**Problem**

`CONTACT_WEBHOOK_URL` can come from runtime `window.__MSI_CONFIG__` or `VITE_N8N_CONTACT_WEBHOOK_URL`. This is flexible, but should be documented clearly.

**Files**

- `frontend/src/config.js`
- `frontend/public/config.js`
- `docker-entrypoint.sh`
- `docker-compose.yml`
- `docker-compose.prod.yml`
- `.env.example`
- `README.md`

**Recommendation**

Document:

- Local Vite uses `VITE_N8N_CONTACT_WEBHOOK_URL`.
- Docker prod writes `/config.js` at container startup from `N8N_CONTACT_WEBHOOK_URL`.
- Vercel/static deploy may need a build-time env var or a runtime config strategy.

**Acceptance Criteria**

- A future deployer knows where to set the contact webhook.
- Contact form does not silently ship unconfigured.

## Phase 7: Testing and Quality Scripts

### 7.1 Add linting

**Problem**

`frontend/package.json` only has:

- `dev`
- `build`
- `preview`

There is no lint or formatting guard.

**Files**

- `frontend/package.json`
- New ESLint config files if needed

**Recommendation**

Add ESLint for React:

- `eslint`
- `eslint-plugin-react`
- `eslint-plugin-react-hooks`
- `eslint-plugin-jsx-a11y`

Suggested scripts:

```json
{
  "lint": "eslint .",
  "check": "npm run lint && npm run build"
}
```

**Acceptance Criteria**

- `npm run lint` works.
- `npm run build` still works.
- The lint rules catch unused variables like `ROUTE_LINKS`.

### 7.2 Add Playwright smoke tests

**Problem**

The site has many routes but no automated route smoke test. Broken routes like `/camp` can slip through.

**Files**

- `frontend/package.json`
- `frontend/tests/routes.spec.js` or similar
- Playwright config

**Recommendation**

Add a small Playwright suite that verifies:

- `/`
- `/camp`
- `/camp/boys`
- `/camp/girls`
- `/elements`
- One element detail page
- `/about/mike-frascogna`
- `/about/philip-short`
- `/podcast`
- One podcast detail page
- `/videos`
- `/contact`

Checks should be simple:

- Page loads.
- No major console errors.
- Main heading or expected text exists.
- No obvious blank page.

**Acceptance Criteria**

- Route smoke tests run locally.
- They catch missing routes.
- They do not rely on external Vimeo/YouTube playback success.

### 7.3 Add form handler tests

**Problem**

There is a direct Mailchimp integration test script, but not a small no-network unit-style validation suite.

**Files**

- `api/subscribe.js`
- `scripts/test-subscribe-handler.mjs`
- Optional new test script

**Recommendation**

Keep the existing Mailchimp integration test for manual verification, but add validation tests that mock fetch:

- rejects non-POST
- rejects missing email
- rejects invalid email
- rejects missing Mailchimp env
- sends expected payload for valid request

**Acceptance Criteria**

- Basic API behavior can be verified without touching Mailchimp.
- Integration test remains available for end-to-end confirmation.

## Phase 8: Deployment and Repo Hygiene

### 8.1 Review Vercel config duplication

**Problem**

There is a root `vercel.json` and a `frontend/vercel.json`. Root config includes API-aware rewrites; frontend config rewrites everything to `index.html`.

**Files**

- `vercel.json`
- `frontend/vercel.json`

**Recommendation**

Decide which deploy root is canonical.

If deploying from repo root:

- Keep root `vercel.json`.
- Consider removing or documenting `frontend/vercel.json`.

If deploying from `frontend/` only:

- The `/api/subscribe` root API route may not deploy as expected.

**Acceptance Criteria**

- Deployment instructions specify the correct root.
- There is no ambiguity around API route availability.

### 8.2 Review Docker production flow

**Problem**

Docker production builds the frontend and serves it with `serve`. The root API route is not included in that runtime, so newsletter `/api/subscribe` will not work in a pure static Docker deployment unless separately handled.

**Files**

- `Dockerfile.prod`
- `docker-compose.prod.yml`
- `api/subscribe.js`
- `README.md`

**Recommendation**

Document this clearly:

- Vercel deployment supports `/api/subscribe`.
- Docker static deployment needs a separate API service or alternative newsletter endpoint.

Or implement a Node server that serves both static frontend and API endpoint in Docker.

**Acceptance Criteria**

- Production deployment target is clear.
- Newsletter signup works in the chosen production environment.

### 8.3 Handle untracked files intentionally

**Current untracked files**

- `.claude/settings.local.json`
- `scripts/mailchimp-upload-template.mjs`

**Recommendation**

- `.claude/settings.local.json`: likely machine-local; add to `.gitignore` if it should stay local.
- `scripts/mailchimp-upload-template.mjs`: appears useful; decide whether to commit it.

**Acceptance Criteria**

- `git status --short` is clean except intentional local files.
- Useful scripts are tracked.
- Local-only tool settings are ignored.

### 8.4 Review large artifacts

**Problem**

The repo root contains `msi-prod-build.zip`, but `.gitignore` excludes `msi-prod-build*.zip`. Confirm whether the existing file is untracked and whether it should be deleted locally after handoff.

**Files**

- `.gitignore`
- root build artifacts

**Recommendation**

Keep generated handoff archives out of git. Do not remove local files unless intentionally cleaning the workspace.

**Acceptance Criteria**

- No build ZIPs are tracked.
- Generated archives are clearly temporary.

## Suggested Work Sessions

### Session 1: Broken Routes and Docs

Scope:

- Add `/camp`.
- Add 404 fallback.
- Update `README.md`.
- Update `CLAUDE.md`.
- Reconcile Philip spelling notes in derived docs.

Verification:

- `npm run build`.
- Manual route smoke test.
- `rg -n "stub|stone-skills|Phillip|phillip" README.md CLAUDE.md MSI-AMENDMENT.md scrape-output/SUMMARY.md frontend/src`.

### Session 2: Data Cleanup

Scope:

- Consolidate elements data.
- Clarify camp data source.
- Remove unused Web3Forms config.
- Remove or use unused `ROUTE_LINKS`.

Verification:

- `npm run build`.
- Visit home, elements index, element detail, camp pages.
- Confirm all element names/icons/slugs still match.

### Session 3: Media Optimization

Scope:

- Convert large PNG photos/banners to optimized WebP/AVIF.
- Update imports.
- Verify visual quality.

Verification:

- `npm run build`.
- Compare build asset sizes before/after.
- Browser check desktop/mobile home and camp pages.
- Lighthouse or equivalent performance check.

### Session 4: Accessibility Polish

Scope:

- Video modal focus trap.
- Coach hover/focus/touch improvements.
- Ten Elements mobile interaction copy/layout.
- Toast and form accessibility tweaks.
- CoachToggle semantics cleanup.

Verification:

- Keyboard-only pass.
- Screen reader spot check if available.
- Browser check on narrow mobile viewport.

### Session 5: Forms, API, and Tests

Scope:

- Newsletter validation hardening.
- Defensive Mailchimp response parsing.
- Honeypot/rate-limit strategy.
- Optional `/api/contact` proxy.
- Add lint and smoke tests.

Verification:

- Unit-style API validation tests.
- Existing Mailchimp integration test when credentials are available.
- `npm run lint`.
- `npm run build`.
- Playwright route smoke tests.

### Session 6: Deployment Hygiene

Scope:

- Decide Vercel deploy root.
- Document Docker limitations or add API-capable Docker runtime.
- Resolve untracked files.
- Clean local/generated artifact policy.

Verification:

- Deployment docs match actual deploy target.
- Newsletter/contact behavior is verified in production-like environment.
- `git status --short` is understandable.

## Concrete Acceptance Checklist

Use this as the final "done" checklist after all cleanup phases.

- [ ] `/camp` renders a useful page or intentionally redirects.
- [ ] Unknown routes render a useful 404.
- [ ] Footer, navbar, and route map agree.
- [ ] README describes the MSI project, not the reusable skills repo.
- [ ] `CLAUDE.md` no longer says implemented pages are stubs.
- [ ] Philip Short spelling is consistent in active source and derived docs.
- [ ] Elements data has one canonical source.
- [ ] Camp data source of truth is documented and consistent.
- [ ] `WEB3FORMS_ACCESS_KEY` is removed if unused.
- [ ] Unused nav constants are removed or used.
- [ ] Large camp images are optimized for web delivery.
- [ ] Video modal traps focus and restores focus on close.
- [ ] Hover-only content also works for keyboard and touch users.
- [ ] Ten Elements instructions make sense on mobile.
- [ ] Newsletter API validates input more strictly.
- [ ] Contact/newsletter spam protection strategy is implemented.
- [ ] Lint script exists.
- [ ] Build script passes.
- [ ] Route smoke tests exist.
- [ ] Vercel/Docker deployment behavior is documented.
- [ ] Untracked files are either committed or ignored intentionally.

## Risk Notes

- Do not change register URLs casually. `REGISTER_LINK_PROPS` exists so all register CTAs stay consistent.
- Do not change Philip Short spelling back to two Ls unless the client reverses the decision again.
- Do not rewrite raw scrape output unless clearly distinguishing raw historical data from derived planning data.
- Do not optimize images in a way that damages the real camp photography; visual trust matters here.
- Be careful with Docker assumptions: the static Docker image does not automatically provide the Vercel API route.
- Form changes should be tested with realistic production env behavior, not only local Vite.

## Recommended First Pull Request

If this were broken into PRs, the first one should be:

**PR 1: Route and Docs Baseline**

Included:

- Add `/camp` page.
- Add 404 page.
- Update README.
- Update `CLAUDE.md`.
- Fix derived Philip spelling contradictions.

Why first:

- It fixes the most obvious user-facing bug.
- It makes the repo easier for any future human or agent to work in.
- It avoids mixing content/doc cleanup with performance and API changes.

Suggested verification:

```bash
cd frontend
npm run build
```

Then manually check:

- `/`
- `/camp`
- `/camp/boys`
- `/camp/girls`
- `/elements`
- `/about/mike-frascogna`
- `/about/philip-short`
- `/podcast`
- `/videos`
- `/contact`
- an intentionally bad URL like `/not-a-real-page`

