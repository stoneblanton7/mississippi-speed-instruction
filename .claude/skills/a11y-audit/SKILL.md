# Accessibility Audit Skill

Scan a web project's source files and produce a scored accessibility report with specific fix recommendations.

## How It Works

1. **Scan** — Read all component files (JSX/TSX/HTML), stylesheets (CSS/global), and config files
2. **Evaluate** — Check each file against 6 accessibility categories using the criteria in `references/criteria.md`
3. **Score** — Rate each category 0-100 and compute a weighted overall score
4. **Report** — Output a markdown report with pass/fail/warning per item, file paths, and copy-paste fix code
5. **Prioritize** — Rank fixes by severity (Critical → High → Medium → Low)

## Running the Audit

### Step 1: Identify the project structure

Find all component/page files and stylesheets:
```bash
find frontend/src -name "*.jsx" | sort
find frontend/src -name "*.css" | sort
```

### Step 2: Read the criteria

Read `references/criteria.md` for the full checklist before scanning any files.

### Step 3: Scan files systematically

For each component file, check:
- Does it have images? → Check alt text
- Does it have interactive elements (button, a, input)? → Check keyboard access, ARIA, focus styles, touch targets
- Does it have text over images/video/dark backgrounds? → Check contrast
- Does it have animations? → Check reduced motion
- Does it use color to convey meaning? → Check non-color alternatives

### Step 4: Generate the report

Output format (write to `frontend/ACCESSIBILITY-AUDIT.md`):

```markdown
# Accessibility Audit Report
**Project:** Synaptix Labs Website
**Date:** [date]
**Overall Score:** [X]/100

## Score Breakdown
| Category | Score | Status |
|----------|-------|--------|
| Contrast & Readability | X/100 | ✅/⚠️/❌ |
| Keyboard Navigation | X/100 | ✅/⚠️/❌ |
| Screen Reader Support | X/100 | ✅/⚠️/❌ |
| Touch Targets | X/100 | ✅/⚠️/❌ |
| Motion & Animation | X/100 | ✅/⚠️/❌ |
| Color Independence | X/100 | ✅/⚠️/❌ |

## Critical Issues (fix immediately)
...

## High Priority Issues
...

## Medium Priority Issues
...

## Low Priority Issues
...

## Passed Checks
...
```

### Step 5: Write fix prompts

For each Critical and High issue, write a specific fix with:
- Exact file path
- What to change (old code → new code)
- Why it matters
- WCAG success criterion reference

Group related fixes into numbered prompts that can be copy-pasted to Claude Code. Write these to `frontend/ACCESSIBILITY-FIXES.md`.

## Scoring Weights

| Category | Weight | Description |
|----------|--------|-------------|
| Contrast & Readability | 25% | Text legibility, color contrast ratios |
| Keyboard Navigation | 20% | Tab order, focus visibility, no keyboard traps |
| Screen Reader Support | 20% | ARIA labels, alt text, heading hierarchy, landmarks |
| Touch Targets | 15% | Minimum 44x44px tap areas on mobile |
| Motion & Animation | 10% | Reduced motion support, no auto-playing distractions |
| Color Independence | 10% | Information not conveyed by color alone |

## Score Thresholds

- **90-100:** Excellent — meets WCAG 2.1 AA
- **70-89:** Good — minor issues, mostly compliant
- **50-69:** Needs Work — significant accessibility gaps
- **Below 50:** Critical — major barriers for disabled users

## Synaptix Labs Specific Concerns

This site has several design patterns that need extra scrutiny:

### Dark Theme + Teal Accent
- Primary text is white (#FFFFFF) on near-black (#0A0A0F) — high contrast, likely passes
- Muted text uses rgba(255,255,255,0.4) — resolve to actual color and check against #0A0A0F
- Accent text (#00E5FF / #00f2ff) on dark backgrounds — check contrast ratio
- Glass card backgrounds are semi-transparent — check text contrast on BOTH the card AND the underlying page background
- Section labels use text-[10px] uppercase — check minimum readable size

### Heavy Animation
- Canvas particle backgrounds — need reduced-motion disable
- 3D cube / float animations — need reduced-motion disable
- Scroll-triggered animations (IntersectionObserver reveals) — need reduced-motion alternative
- Framer Motion / motion library usage — check for useReducedMotion
- Gradient border animations — need reduced-motion disable
- Floating particles in every section — need reduced-motion disable

### Glassmorphism Cards
- Backdrop blur can cause readability issues for low-vision users
- Semi-transparent backgrounds mean contrast depends on what's behind the card
- Glowing borders may not provide sufficient visual boundary for some users

### Generated Images
- Hero laptop mockup (hero-laptop.jpg) needs descriptive alt text
- Neuron images need alt text or aria-hidden if decorative
- Any scroll-linked video needs accessible controls or static fallback

## Important Notes

- This audit is based on source code analysis. It catches ~80% of issues but cannot replace testing with real assistive technology.
- Always recommend also testing with: VoiceOver (Mac), NVDA (Windows), keyboard-only navigation, and browser zoom at 200%.
- WCAG 2.1 AA is the standard to target. AAA is aspirational but not required.
- Reference the full criteria checklist in `references/criteria.md` for detailed rules.
