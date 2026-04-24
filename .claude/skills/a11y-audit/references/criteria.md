# Accessibility Criteria Checklist

Reference file for the a11y-audit skill. Each item includes the check to perform, what to look for in source code, the WCAG success criterion, and severity level.

---

## 1. Contrast & Readability (25% weight)

### 1.1 Text contrast ratio — CRITICAL
**WCAG:** 1.4.3 Contrast (Minimum) — Level AA
**Rule:** Normal text needs 4.5:1 ratio. Large text (18px+ bold or 24px+ regular) needs 3:1.
**What to scan for:**
- Text color + background color combinations
- CSS variables: resolve them to actual hex values from global.css / tailwind config
- Text over images or video: MUST have a solid overlay/backdrop. Semi-transparent overlays must achieve contrast at worst-case (lightest frame)
- `text-white` or `color: #FFFFFF` on anything other than a dark background
- `text-muted` or low-opacity text — check the resolved color meets 4.5:1
- Placeholder text in inputs — often fails contrast

**Synaptix Labs specific contrast checks:**
- #FFFFFF on #0A0A0F = ~19.5:1 ✅ (primary text on bg — excellent)
- #00E5FF on #0A0A0F = ~12.3:1 ✅ (accent text on bg — passes)
- #00f2ff on #0A0A0F = ~12.7:1 ✅ (accent variant — passes)
- rgba(255,255,255,0.4) on #0A0A0F → resolves to ~#666669 on #0A0A0F = ~4.2:1 ⚠️ (BORDERLINE — may fail for normal text)
- rgba(255,255,255,0.5) on #0A0A0F → resolves to ~#858587 = ~5.3:1 ✅ (passes)
- rgba(255,255,255,0.3) on #0A0A0F → resolves to ~#4D4D4F = ~3.2:1 ❌ (FAILS for normal text, passes for large text only)
- #8A8F98 on #0A0A0F = ~5.0:1 ✅ (text-muted — passes)
- #FFFFFF on glass card (rgba(255,255,255,0.03) on #0A0A0F ≈ #0D0D12) = ~18.5:1 ✅
- #00E5FF on glass card ≈ ~11.8:1 ✅
- Placeholder text in inputs — check resolved color against glass background

**Scoring:**
- All text meets 4.5:1 (normal) or 3:1 (large): 100
- 1-2 failures on decorative/non-essential text: 80
- Failures on primary content text: 50
- Failures on navigation or interactive elements: 30
- White text over images/video without sufficient overlay: 20

### 1.2 Focus indicator contrast — HIGH
**WCAG:** 2.4.7 Focus Visible — Level AA
**Rule:** Focus indicators must be visible against the background. A 3:1 contrast ratio for the focus indicator itself.
**What to scan for:**
- `focus:ring-*` or `focus:outline-*` in Tailwind classes
- `focus-visible:ring-*` — preferred over `focus:`
- Custom focus styles that might be invisible (e.g., thin dark outline on dark background)
- `outline: none` or `focus:outline-none` WITHOUT a replacement focus style
- On this dark site, the default browser focus outline (often blue) may be hard to see — check if custom teal focus rings are applied

### 1.3 Font size minimums — MEDIUM
**WCAG:** 1.4.4 Resize Text — Level AA
**Rule:** Body text should be at least 16px. Never go below 12px for any readable text.
**What to scan for:**
- `text-xs` (12px) used for primary content (not just labels/captions)
- `text-[10px]` or `text-[11px]` — too small for readable content
- Section labels using text-[10px] — acceptable ONLY if they are decorative/supplementary, not essential information
- Font sizes that don't scale with user preferences (px vs rem)
- JetBrains Mono stat numbers — check they're large enough

---

## 2. Keyboard Navigation (20% weight)

### 2.1 All interactive elements are focusable — CRITICAL
**WCAG:** 2.1.1 Keyboard — Level A
**Rule:** Every interactive element (button, link, input, select) must be reachable via Tab key.
**What to scan for:**
- `<div onClick>` or `<span onClick>` without `tabIndex={0}` and `onKeyDown` — NOT keyboard accessible
- Custom components that look like buttons but use `<div>` or `<span>` instead of `<button>`
- `tabIndex="-1"` on interactive elements (removes from tab order)
- Links that use `<span>` or `<div>` instead of `<a href>`
- Glass cards with onClick handlers — must be keyboard accessible
- Service cards with "LEARN MORE" — check if using proper `<a>` or `<Link>`
- Pricing tier CTA buttons — must be `<button>` or `<Link>`
- FAQ accordion items — must be keyboard operable

### 2.2 Visible focus indicators — HIGH
**WCAG:** 2.4.7 Focus Visible — Level AA
**Rule:** When an element receives focus, there must be a visible indicator.
**What to scan for:**
- Global CSS with `outline: none` or `*:focus { outline: none }` without replacement
- Components with `focus:outline-none` but no `focus-visible:ring-*` or custom focus style
- On dark backgrounds, default browser focus outlines are often invisible — custom accent-colored focus rings needed
- Nav links, CTA buttons, form inputs, accordion triggers all need visible focus

### 2.3 No keyboard traps — CRITICAL
**WCAG:** 2.1.2 No Keyboard Trap — Level A
**Rule:** User must be able to navigate away from every component using keyboard.
**What to scan for:**
- Mobile menu overlay without Escape key handler
- FAQ accordion that captures focus without release
- Any modal/overlay without keyboard dismissal
- Canvas particle background — should not be focusable

### 2.4 Logical tab order — MEDIUM
**WCAG:** 2.4.3 Focus Order — Level A
**Rule:** Tab order should match visual layout (left-to-right, top-to-bottom).
**What to scan for:**
- Positive `tabIndex` values (tabIndex="1", "2", etc.) — disrupts natural order
- CSS `order` or flexbox `order` that changes visual layout without matching DOM order
- Sticky navbar elements that might disrupt tab flow

---

## 3. Screen Reader Support (20% weight)

### 3.1 Images have alt text — CRITICAL
**WCAG:** 1.1.1 Non-text Content — Level A
**Rule:** Every `<img>` must have an `alt` attribute. Decorative images use `alt=""`.
**What to scan for:**
- `<img>` without `alt` attribute — specifically hero-laptop.jpg
- `<img alt="image">` or `<img alt="photo">` — not descriptive
- Neuron images in ScrollExplode section — need descriptive alt or `alt=""` if decorative
- Background images (`background-image`) that convey content without text alternative
- SVG icons (Lucide React) without `aria-hidden="true"` when used decoratively alongside text
- SVG icons used as the ONLY content of a button — need `aria-label` on the button

### 3.2 Heading hierarchy — HIGH
**WCAG:** 1.3.1 Info and Relationships — Level A
**Rule:** Headings must follow a logical hierarchy (h1 → h2 → h3). Don't skip levels.
**What to scan for:**
- Multiple `<h1>` tags on the homepage (Hero h1 + other section h1s)
- Each page should have exactly ONE h1
- Section headlines ("RADICAL OFFERINGS", "HOW IT WORKS", etc.) should be h2
- Card titles within sections should be h3
- The oversized display text may use styled `<div>` instead of proper heading tags — check

### 3.3 ARIA labels on interactive elements — HIGH
**WCAG:** 4.1.2 Name, Role, Value — Level A
**Rule:** Interactive elements must have accessible names.
**What to scan for:**
- Hamburger menu button without `aria-label="Open menu"`
- Close button (X) on mobile menu without `aria-label="Close menu"`
- Social media icon links without `aria-label`
- Icon-only buttons (phone icon, mail icon) without `aria-label`
- "LEARN MORE →" links — need `aria-label` with context (e.g., "Learn more about Web Design services")
- FAQ accordion triggers — need `aria-expanded` attribute
- Form submit button — should have clear accessible name

### 3.4 Landmark regions — MEDIUM
**WCAG:** 1.3.1 Info and Relationships — Level A
**Rule:** Page should use semantic landmarks: `<nav>`, `<main>`, `<header>`, `<footer>`, `<section>`.
**What to scan for:**
- Missing `<main>` wrapper around primary content
- Navbar using `<div>` instead of `<nav>`
- Footer using `<div>` instead of `<footer>`
- Each major section should use `<section>` with `aria-label` or `aria-labelledby`

### 3.5 Form labels — CRITICAL
**WCAG:** 1.3.1 Info and Relationships — Level A
**Rule:** Every form input must have a visible or programmatic label.
**What to scan for:**
- Contact form inputs without `<label>` or `aria-label`
- `placeholder` used as the only label (placeholder disappears on input — NOT a label)
- The "tier interest" select dropdown needs a label
- The message textarea needs a label
- Blog subscribe email input needs a label
- Contact form: check each field has either a visible `<label htmlFor>` or `aria-label`

---

## 4. Touch Targets (15% weight)

### 4.1 Minimum touch target size — HIGH
**WCAG:** 2.5.8 Target Size (Minimum) — Level AA
**Rule:** Interactive elements must be at least 44x44px on mobile.
**What to scan for:**
- Small icon buttons (hamburger menu, close X) — check padding makes them 44x44
- Nav links on mobile — check they have sufficient padding
- Phone number link in navbar — check touch target size
- "LEARN MORE →" links — check they have sufficient padding
- Social media icon links in footer — check size
- FAQ accordion trigger areas — should be full-width tappable

### 4.2 Touch target spacing — MEDIUM
**WCAG:** 2.5.8 Target Size (Minimum) — Level AA
**Rule:** Touch targets should have at least 8px spacing between them.
**What to scan for:**
- Nav link spacing in mobile menu
- Button groups (hero buttons side by side) — check gap on mobile
- Service area tags/pills — check spacing between them
- Footer link columns on mobile

---

## 5. Motion & Animation (10% weight)

### 5.1 Prefers-reduced-motion support — HIGH
**WCAG:** 2.3.3 Animation from Interactions — Level AAA (but should be AA standard practice)
**Rule:** Respect `prefers-reduced-motion: reduce` media query. Disable or minimize animations.
**What to scan for:**
- Check if `@media (prefers-reduced-motion: reduce)` exists in global.css
- Canvas particle background — must be disabled or static under reduced-motion
- 3D cube rotation/float animation — must stop under reduced-motion
- Hero laptop float animation — must stop under reduced-motion
- Scroll reveal animations (IntersectionObserver) — should show content immediately under reduced-motion
- Framer Motion / motion library — check for `useReducedMotion` or motion preference respect
- Gradient border animations — must stop under reduced-motion
- FloatingParticles component — must be hidden or static under reduced-motion
- Glow pulse animations — must stop under reduced-motion
- Scanline animations — must stop under reduced-motion

### 5.2 Auto-playing content — MEDIUM
**WCAG:** 1.4.2 Audio Control — Level A / 2.2.2 Pause, Stop, Hide — Level A
**Rule:** Auto-playing video/audio must have pause/stop controls.
**What to scan for:**
- Scroll-linked video (if implemented) — needs a way to skip/pause
- Canvas particle background runs indefinitely — should this be pausable?
- Any infinite CSS animations that might be distracting

### 5.3 No seizure-triggering content — CRITICAL
**WCAG:** 2.3.1 Three Flashes — Level A
**Rule:** Nothing flashes more than 3 times per second.
**What to scan for:**
- `animation-duration` less than 333ms on opacity/color changes
- Scanline animation — check frequency
- Gradient border animation — check it doesn't create rapid flashing
- Particle animations — check they don't create strobe-like effects

---

## 6. Color Independence (10% weight)

### 6.1 Information not conveyed by color alone — HIGH
**WCAG:** 1.4.1 Use of Color — Level A
**Rule:** Color must not be the only visual means of conveying information.
**What to scan for:**
- "ACCEPTING NEW CLIENTS" badge with green dot — the dot is color-only, needs text label too (it has one — verify)
- "Based in Jackson, MS" badge with pulsing dot — same check
- Active nav link — if distinguished only by accent color, needs underline or other indicator too
- Pricing tier "MOST POPULAR" badge — check it uses more than just color
- Form validation states — if any exist, check they use text not just color

### 6.2 Error identification — HIGH
**WCAG:** 3.3.1 Error Identification — Level A
**Rule:** Errors must be identified in text, not just by color.
**What to scan for:**
- Contact form — if validation exists, errors must include text messages not just red borders
- Required fields — if any are required, indicate with text not just asterisk color
- Email validation — if present, show descriptive error text

---

## Automated Checks Cheat Sheet

Quick patterns to grep for across all Synaptix Labs files:

```bash
# Missing alt text
grep -rn '<img' frontend/src --include="*.jsx" | grep -v 'alt='

# Div/span click handlers (not keyboard accessible)
grep -rn 'onClick' frontend/src --include="*.jsx" | grep -E '<(div|span)' | grep -v 'tabIndex' | grep -v 'role='

# Icon buttons without aria-label
grep -rn 'onClick' frontend/src --include="*.jsx" | grep -v 'aria-label' | grep -v 'children'

# outline:none without replacement
grep -rn 'outline.*none\|outline-none' frontend/src --include="*.css" --include="*.jsx"

# Small text classes
grep -rn 'text-\[10px\]\|text-\[11px\]' frontend/src --include="*.jsx"

# Missing form labels
grep -rn '<input\|<textarea\|<select' frontend/src --include="*.jsx" | grep -v 'aria-label\|<label'

# Auto-playing media
grep -rn 'autoPlay\|autoplay' frontend/src --include="*.jsx"

# Check for reduced-motion support
grep -rn 'prefers-reduced-motion' frontend/src --include="*.css"
grep -rn 'useReducedMotion\|reducedMotion' frontend/src --include="*.jsx"

# Check for semantic HTML
grep -rn '<main\|<nav\|<header\|<footer\|<section' frontend/src --include="*.jsx" | head -20

# Check for aria-expanded on interactive elements
grep -rn 'aria-expanded' frontend/src --include="*.jsx"

# Check heading tags
grep -rn '<h1\|<h2\|<h3\|<h4' frontend/src --include="*.jsx" | head -30

# Motion/animation library usage
grep -rn 'from.*motion\|framer-motion\|react-awesome-reveal' frontend/src --include="*.jsx" | head -10
```

These grep commands give Claude Code a fast first pass before doing deeper per-file analysis.
