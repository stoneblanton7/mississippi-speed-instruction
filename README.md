# Stone Skills — Portable AI Skills Library for Web Development

A collection of SKILL.md files that get pulled into any new web project. These files teach Claude Code (or any AI coding agent) how to build professional, high-converting websites without the generic AI slop.

Built for **React + Vite + Tailwind CSS + JSX** stack.

## Quick Start

```bash
# Clone into any project
git clone https://github.com/StoneBlanton7/stone-skills.git .claude

# Or add as a submodule
git submodule add https://github.com/StoneBlanton7/stone-skills.git .claude

# Claude Code auto-discovers .claude/skills/ — no extra config needed.
```

## Skills Index

| Skill | Description |
|-------|-------------|
| **[one-shot](.claude/skills/one-shot/SKILL.md)** | The "start here" skill. Combines anti-slop rules, creative dials, design tokens, conversion-backed page structure, animation system, and component patterns into one file for building complete websites with minimal revisions. |
| **[design-system](.claude/skills/design-system/SKILL.md)** | Foundation design tokens: CSS variables, Tailwind config, typography scale, spacing system, component specs (buttons, cards, modals, toasts, inputs, nav), aesthetic style definitions, and color rules. |
| **[landing-page](.claude/skills/landing-page/SKILL.md)** | Conversion-optimized page structure backed by data from Unbounce (41K landing pages), HubSpot, and A/B test case studies. Section blueprints, CTA rules, form optimization, and conversion benchmarks. |
| **[scroll-stop](.claude/skills/scroll-stop/SKILL.md)** | Scroll-triggered animation system: IntersectionObserver hook, staggered reveals, parallax, animated counters, before/after sliders, sticky scroll sections, canvas frame-scrubbing, CSS animation toolkit, and performance rules. |
| **[local-biz-web](.claude/skills/local-biz-web/SKILL.md)** | Local business website patterns optimized for Jackson, MS and Southern markets. Phone number treatment, Google review integration, local SEO schema markup, community trust signals, and industry-specific patterns. |
| **[a11y-audit](.claude/skills/a11y-audit/SKILL.md)** | Accessibility audit checklist for scanning source files. WCAG compliance, contrast checking, keyboard navigation, screen reader support. |

## How Skills Work Together

- **New marketing website** — start with `one-shot/SKILL.md` (it references patterns from the others)
- **Adding animations to an existing project** — use `scroll-stop/SKILL.md`
- **Local business client** — use `one-shot/SKILL.md` + `local-biz-web/SKILL.md`
- **Auditing accessibility** — use `a11y-audit/SKILL.md`
- **Design token reference during any build** — use `design-system/SKILL.md`

## Stack

React, Vite, Tailwind CSS, JSX (no TypeScript), React Router v6, CSS variables, dark mode via class strategy.

## Author

Stone Blanton
