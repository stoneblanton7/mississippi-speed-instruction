# Decisions — mike-website

Dated, newest first. Add an entry when a real decision is made (not for routine edits).

## 2026-07-23 — Fleet armed; docs vault established at `.opencode/docs/`

In-repo agent fleet (executor / executor-light / reviewer / doc-keeper) ported
from `~/.claude/fleet-templates/`. This vault is the canonical living-docs
location; [[data-model]] is the ERD-gate target for data-shape changes.

## Earlier (pre-vault, from CLAUDE.md / MSI-AMENDMENT.md / git history)

- Philip Short spelled with **one L** everywhere — reversed earlier two-L guidance.
- Newsletter moved to Mailchimp via `api/subscribe.js`; contact moved to n8n
  webhook; Web3Forms removed.
- Canonical elements data consolidated into `frontend/src/api/data/elements.js`;
  dead `ELEMENTS` export removed from `config.js`.
- Dark-only, no theme toggle; identical tokens on `:root` and `.dark`.
- All video is Vimeo private-hashed-link embeds; hashes centralized in
  `config.js` `VIMEO_HASHES`.
