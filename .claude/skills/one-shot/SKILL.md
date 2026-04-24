---
name: one-shot
description: Build complete, high-quality websites in a single prompt with minimal revisions. Use this skill whenever building a new website, landing page, marketing page, portfolio site, or any project where the goal is to one-shot a polished result. Combines design system foundations, anti-slop enforcement, conversion-backed layout structure, animation patterns, and creative direction controls. Triggers on any mention of one-shot, new website, new landing page, build a site, or "make it look good the first time."
---

# One-Shot Website Skill

Build websites that look custom-designed on the first pass. This skill pre-decides every design choice so Claude Code doesn't fall back to generic defaults. The goal: fewer revisions, faster delivery, no AI slop.

Read this entire file before writing any code.

---

## CREATIVE DIALS

Set these before building. They control the entire output. If Stone doesn't specify values, use the defaults.

```
DESIGN_VARIANCE: 6    (1-3: Safe, centered, corporate | 4-7: Modern, confident | 8-10: Artsy, asymmetric, experimental)
MOTION_INTENSITY: 5   (1-3: Simple hover states only | 4-7: Scroll reveals, stagger, micro-interactions | 8-10: Scroll-scrubbing, parallax, spring physics)
VISUAL_DENSITY: 4     (1-3: Luxury gallery — one idea per viewport | 4-7: Normal website | 8-10: Dashboard cockpit — data-dense)
```

How to interpret these dials:

**DESIGN_VARIANCE** drives layout decisions:
- 1-3: Centered text blocks, symmetric grids, predictable flow. Corporate safety.
- 4-5: Subtle asymmetry, split heroes, varied card sizes. Modern but grounded.
- 6-7: Bento grids, overlapping elements, broken grid moments, text-as-art headings.
- 8-10: Diagonal flows, full asymmetry, bleeding elements, parallax card stacks, experimental typography.

**MOTION_INTENSITY** drives animation decisions:
- 1-3: Hover color changes, focus rings, basic transitions. No scroll animations.
- 4-5: Fade-up reveals on scroll, staggered card entrances, button scale on hover.
- 6-7: Counter animations, parallax backgrounds, sticky scroll sections, animated underlines.
- 8-10: Canvas frame-scrubbing, spring physics, magnetic cursor effects, split-screen scroll, text mask reveals.

**VISUAL_DENSITY** drives spacing and content decisions:
- 1-3: py-32 md:py-48 sections, max-w-3xl content, one element per viewport, huge whitespace.
- 4-5: py-16 md:py-24 sections, max-w-5xl content, 2-3 elements visible at once.
- 6-7: py-12 md:py-16 sections, max-w-7xl content, card grids, feature lists.
- 8-10: py-6 md:py-8 sections, sidebar + main layouts, dense grids, compact cards.

---

## ANTI-SLOP RULES

These are hard failures. Never produce them. They are the specific patterns that make AI output look like AI output.

### Banned Visual Defaults
- NEVER use Inter, Roboto, Arial, Open Sans, or system-ui as the primary font
- NEVER use purple gradients on white backgrounds (the #1 AI cliché)
- NEVER use the centered-heading-plus-three-equal-cards layout for every section
- NEVER use gray placeholder backgrounds where real color should be
- NEVER use rounded-full on large containers or primary buttons (pills on cards = amateur)
- NEVER use default Tailwind shadow-md or shadow-lg (customize shadows with color tints or use border instead)
- NEVER use h-screen (use min-h-[100dvh] to prevent iOS Safari jump)
- NEVER use identical border-radius on every element (vary: rounded-lg on cards, rounded-xl on hero images, rounded-md on buttons)

### Banned Content Patterns
- NEVER use "Lorem ipsum" or any placeholder text — write real, specific content for the business
- NEVER use "John Doe", "Jane Smith", "Acme Corp" — use realistic names and businesses
- NEVER use "Learn More" as button text — use specific action verbs (Get, Start, Book, Claim, See, Try)
- NEVER use "Welcome to our website" as a heading
- NEVER use generic taglines: "Elevate your experience", "Seamless solutions", "Unleash potential", "Next-gen", "Game-changer", "Cutting-edge", "Delve into", "Innovative", "Synergy"
- NEVER use emoji in markup, headings, or body text — use icons or SVG
- NEVER create dead buttons that do nothing — every button navigates, opens a modal, shows a toast, or triggers a visible animation
- NEVER use the word "Submit" on any form button

### Banned Layout Patterns
- NEVER center-align everything on the page — use left-alignment for body text, reserve center for headings and CTAs
- NEVER stack more than 3 full-width sections with the same background color back-to-back
- NEVER use a carousel or auto-rotating slider (< 1% CTR, removing them increases conversions by 23%)
- NEVER put the CTA below the fold without also having one above the fold
- NEVER use a hamburger menu on desktop — only on mobile
- NEVER hide the phone number (for local businesses) behind a menu or "Contact" page — it stays visible

### Banned Technical Patterns
- NEVER hardcode hex values in components — all colors come from CSS variables or Tailwind tokens
- NEVER use !important in Tailwind
- NEVER animate width, height, top, left, margin, or padding — only transform and opacity
- NEVER use scroll-jacking (hijacking native scroll behavior)
- NEVER skip dark mode — every component must render correctly in both themes
- NEVER use font sizes under 16px for body text (causes iOS auto-zoom)

---

## TECH STACK

Every project built with this skill uses:
- **React + Vite + Tailwind CSS + JSX** (no TypeScript)
- **Font loading**: Google Fonts via `<link>` in index.html, font-display: swap
- **State**: useState / useReducer only (no Redux)
- **Routing**: React Router v6 with Layout components wrapping `<Outlet />`
- **Styling**: CSS variables in global.css → mapped in tailwind.config.js → referenced in components
- **Dark mode**: `darkMode: 'class'` in Tailwind config, `.dark` class on `<html>`, ThemeContext for toggle
- **Containerized**: Docker + docker-compose, dev at localhost:5173

---

## DESIGN TOKEN SYSTEM

Define these in `global.css`. Swap hex values per project — variable names never change:

```css
:root {
  /* Backgrounds */
  --color-bg: /* light page background */;
  --color-surface: /* card/panel background */;
  --color-surface-elevated: /* modal/popover/dropdown background */;

  /* Accent — the brand color, used for CTAs and active states */
  --color-accent: /* primary accent */;
  --color-accent-hover: /* lighter/shifted for hover */;
  --color-accent-pressed: /* darker for active/pressed */;

  /* Text */
  --color-text: /* primary text — never pure #000, use #1A1A1A or darker */;
  --color-text-muted: /* secondary/supporting text */;
  --color-text-inverted: /* text on accent-colored backgrounds */;

  /* Borders & Utility */
  --color-border: /* subtle dividers */;
  --color-border-strong: /* prominent borders */;
  --color-success: #16A34A;
  --color-warning: #F59E0B;
  --color-error: #DC2626;
  --color-overlay: rgba(0, 0, 0, 0.5);

  /* Typography */
  --font-heading: /* display/heading font */, sans-serif;
  --font-body: /* body/UI font */, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Shape */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Depth */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 12px 24px rgba(0,0,0,0.12);
}

.dark {
  --color-bg: /* dark page background — #0D0D0F or similar */;
  --color-surface: /* dark card — #1A1A1E */;
  --color-surface-elevated: /* dark modal — #25252A */;
  /* accent can stay the same or adjust for dark contrast */
  --color-text: #F3F4F6;
  --color-text-muted: #9CA3AF;
  --color-text-inverted: #1A1A1A;
  --color-border: #2D2D32;
  --color-border-strong: #404046;
  --color-overlay: rgba(0, 0, 0, 0.7);
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.35);
  --shadow-lg: 0 12px 24px rgba(0,0,0,0.45);
}
```

### Tailwind Config — Map Variables

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-elevated': 'var(--color-surface-elevated)',
        accent: 'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',
        'accent-pressed': 'var(--color-accent-pressed)',
        'text-primary': 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        'text-inverted': 'var(--color-text-inverted)',
        border: 'var(--color-border)',
        'border-strong': 'var(--color-border-strong)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
    },
  },
}
```

### Color Selection Rules
- **60-30-10**: 60% background, 30% surface/secondary, 10% accent
- CTA button must be the highest-contrast element on the page
- Never use color alone to convey meaning (add icon or text label)
- Body text is never pure #000000 — use #1A1A1A or a project-appropriate dark
- Alternate section backgrounds between bg and surface to create visual rhythm

---

## TYPOGRAPHY

### Scale

| Element | Desktop | Mobile | Weight | Line Height | Tailwind |
|---------|---------|--------|--------|-------------|----------|
| H1 (Hero) | 48-72px | 32-40px | 700-800 | 1.05-1.1 | `text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight` |
| H2 (Section) | 32-40px | 26-32px | 700 | 1.15 | `text-3xl md:text-4xl font-bold leading-snug` |
| H3 (Card/Sub) | 22-28px | 20-24px | 600 | 1.2 | `text-xl md:text-2xl font-semibold` |
| Body | 18px | 16px | 400 | 1.6 | `text-base md:text-lg leading-relaxed` |
| Small | 14px | 14px | 400 | 1.4 | `text-sm` |
| Overline | 12-14px | 12px | 600 | 1.2 | `text-xs font-semibold uppercase tracking-widest text-accent` |
| Button | 16-18px | 16px | 600 | 1.25 | `text-base font-semibold` |

### Max Content Width
- Body text: 65ch (`max-w-prose`)
- Content container: `max-w-7xl mx-auto px-4 md:px-8`
- Hero headline: `max-w-4xl`
- Centered subheadline: `max-w-xl mx-auto`

### Font Pairing Guide

Pick one pairing. Never mix. Never use both fonts from the "banned" list.

| Vibe | Heading | Body | Use When |
|------|---------|------|----------|
| Modern Premium | DM Sans 700 | DM Sans 400 | SaaS, tech, apps, dashboards |
| Editorial Luxury | Playfair Display 700 | Lato 400 | Fine dining, law, real estate, luxury |
| Clean Corporate | Poppins 600 | Poppins 400 | Agencies, consulting, finance |
| Bold Energy | Oswald 700 | Source Sans 3 400 | Fitness, sports, events, automotive |
| Warm Approachable | Nunito 700 | Nunito 400 | Education, healthcare, family, wellness |
| Geometric Sharp | Space Grotesk 700 | Space Grotesk 400 | Dev tools, crypto, technical |
| Magazine Editorial | Cormorant Garamond 700 | Lato 400 | Fashion, art, culture, high-end food |
| Brutalist Raw | JetBrains Mono 700 | JetBrains Mono 400 | Experimental, creative agencies, counter-culture |

---

## PAGE STRUCTURE — The Conversion Stack

Follow this section order for landing pages. Skip sections that don't apply, but never rearrange them.

### 1. Hero Section
```
REQUIRED ELEMENTS:
- Overline (optional): category label or trust badge — text-xs font-semibold uppercase tracking-widest text-accent
- Headline: 6-12 words, 5th-7th grade reading level, specific to the business
- Subheadline: who it's for + key benefit + differentiator — text-text-muted
- Primary CTA: first-person copy ("Get My Free Quote"), single action
- Supporting proof: "Trusted by 500+ businesses" or star rating — text-sm text-text-muted

LAYOUT BY DESIGN_VARIANCE:
- 1-4: Centered hero — text-center max-w-3xl mx-auto
- 5-7: Split hero — grid grid-cols-1 lg:grid-cols-2 gap-12 items-center (text left, visual right)
- 8-10: Full-bleed visual or typography-as-art hero — oversized heading, minimal other elements

WHAT GOES ON THE RIGHT SIDE OF A SPLIT HERO:
- Real photo of the business, team, or product (preferred)
- Mockup/screenshot of the product
- AI-generated 3D render or animation (if using Kling/video assets)
- Abstract illustration that matches the brand
- NEVER: generic stock photo, empty space, or placeholder box
```

### 2. Trust Bar
```
Position: immediately below hero, visually separated
Content: 4-6 logos (grayscale, 40-60% opacity) OR trust stats
Format: "Trusted by 500+ businesses" or "4.8★ on Google · 15+ years · Licensed & Insured"
Layout: flex items-center justify-center gap-8 md:gap-12, py-6 md:py-8
Background: bg-surface (subtle contrast from hero background)
```

### 3. Problem Section
```
Purpose: make the visitor feel understood
Headline: "Tired of [specific pain]?" or "Most [audience] struggle with [pain]"
Body: 2-3 short paragraphs or 3-4 icon+text pain points
Tone: empathetic, not fear-mongering
Layout: max-w-3xl mx-auto text-center, or icon grid
```

### 4. Solution Section
```
Purpose: position the product/service as the bridge from pain → outcome
Headline: "Here's how [service] solves [problem]"
Layout: split — text on one side, product visual on the other
CTA: optional secondary ("See How It Works")
```

### 5. Social Proof
```
Formats (pick 2-3):
- Testimonial cards: large quote + photo + name + role
- Star ratings with review count
- Case study stats: "Increased revenue 147% in 6 months"
- Real-time proof: "23 people booked this week"

Testimonial card spec:
- bg-surface rounded-xl p-6 md:p-8
- Decorative quote mark (accent color, opacity-20, large)
- Quote: text-lg leading-relaxed
- Photo: 48-64px circle
- Name: font-semibold
- Role: text-sm text-text-muted
- Stars: amber/gold (#F59E0B) filled icons

CRITICAL: Place social proof NEAR every CTA, not just in its own section.
```

### 6. Benefits / Features
```
Format: 3-6 benefit cards in grid
Each card: icon + outcome-focused headline + 1-2 sentence support
Headlines: "Save 10 hours/week" NOT "Task automation feature"
Layout: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8
Animation: staggered reveal on scroll (120ms between items, 700ms duration)
```

### 7. How It Works
```
Format: exactly 3 steps (cognitive sweet spot)
Each step: large number (accent color) + step name + 1-sentence description
Layout: horizontal flex on desktop, vertical stack on mobile
Connector: subtle line or arrow between steps (desktop only)
```

### 8. Pricing / Offer
```
Single offer: centered card with included-items list + price + CTA
Tiers: 2-3 cards, middle one featured (slight scale, accent border, "Most Popular" badge)
Include: checkmark icons on included items, guarantee badge near CTA
Anchor: crossed-out higher price if applicable
```

### 9. Final CTA
```
Background: accent color or dark contrast — must stand out from rest of page
Headline: urgency or outcome focused
Subtext: reinforce benefit + social proof stat
CTA: large primary button, same action as hero
Layout: text-center py-16 md:py-24
```

### 10. FAQ
```
Format: accordion (click to expand, one open at a time)
Count: 5-8 real objection-based questions
Layout: max-w-3xl mx-auto
Animation: smooth height transition (200ms ease)
```

### 11. Footer
```
Minimal: logo, legal links, contact info, social links
For local businesses: full NAP (Name, Address, Phone), business hours, Google Maps link
```

---

## CTA BUTTON RULES

### Copy
- First-person: "Get My Free Quote" beats "Get Your Free Quote" by 90%
- Action verbs: Get, Start, Claim, Book, Try, See
- Personalized CTAs convert 202% better than generic
- BANNED: Submit, Click Here, Contact Us, Learn More, Send

### Design
```
Primary:    h-12 px-6 rounded-lg text-base font-semibold bg-accent text-text-inverted
            hover:bg-accent-hover active:bg-accent-pressed transition-colors duration-150
            (Hero CTA: h-14 px-8 text-lg)
Secondary:  border-2 border-accent text-accent bg-transparent hover:bg-accent/10
            Same sizing as primary
Ghost:      text-accent hover:bg-accent/5 px-4 py-2 rounded-md transition-colors
```

### Placement
- Hero: always (above the fold)
- After social proof section
- After pricing section
- Final CTA section
- Sticky mobile bar for high-value pages: `fixed bottom-0 left-0 right-0 z-50 p-3 bg-bg/95 backdrop-blur-sm border-t border-border`

---

## COMPONENT PATTERNS

### Card
```
bg-surface border border-border rounded-lg p-6
hover:-translate-y-1 hover:shadow-md transition-all duration-200
dark:bg-surface dark:border-border
```

### Modal
```
Backdrop: fixed inset-0 bg-overlay z-50, click-to-close
Panel:    bg-surface-elevated rounded-xl shadow-lg max-w-lg mx-auto p-6
Close:    absolute top-4 right-4, X icon button
Enter:    fade backdrop + scale panel from 0.95 → 1
```

### Toast
```
Position: fixed bottom-4 right-4 z-50
Style:    bg-surface-elevated shadow-lg rounded-lg p-4
Dismiss:  auto 3 seconds
Animation: slide up + fade in → slide down + fade out
```

### Input
```
h-12 px-4 text-base border border-border rounded-lg bg-bg
focus:ring-2 focus:ring-accent focus:border-accent outline-none
Label: above field, text-sm font-medium mb-1.5
Error: text-error text-sm mt-1 with icon
```

### Navigation
```
h-16 md:h-18 sticky top-0 z-40
bg-bg/80 backdrop-blur-md border-b border-border
Desktop: logo left, links center or right, CTA button right
Mobile: logo left, hamburger right → full-screen overlay menu
Max items: 5-7
```

---

## ANIMATION SYSTEM

### Scroll Reveal Hook (use for all scroll animations)
```jsx
// hooks/useScrollReveal.js
import { useEffect, useRef, useState } from 'react';

export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: options.threshold || 0.15, rootMargin: options.rootMargin || '0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
```

### Animation Classes (add to global.css)
```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(32px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Timing Rules
- Stagger delay between items: 100-150ms (120ms default)
- Entrance duration: 500-800ms (700ms default)
- Hover transitions: 150-200ms
- Easing: ease-out for entrances, ease-in-out for transforms
- Max staggered items per group: 6 (after 6, group into rows)
- Animations fire ONCE — use IntersectionObserver with unobserve

### By MOTION_INTENSITY Level

**Level 1-3: Subtle**
- Hover color/shadow changes on buttons and cards
- Focus ring animations on inputs
- Smooth height transitions on accordions

**Level 4-5: Standard**
- Fade-up reveal on scroll (the workhorse)
- Staggered card entrances
- Button: hover:scale-105 active:scale-95
- Card: hover:-translate-y-1 hover:shadow-lg
- Animated counter for stats

**Level 6-7: Enhanced**
- Parallax background on 1-2 sections
- Sticky scroll section (visual pins while content scrolls)
- Animated underline links
- Gradient shimmer on loading states
- Float animation on hero images

**Level 8-10: Cinematic**
- Canvas frame-scrubbing tied to scroll position
- Spring physics on interactive elements
- Text mask reveals (type as window to background)
- Split-screen opposing scroll
- Staggered character animation on headings
- Magnetic cursor effects on buttons/links

---

## AESTHETIC STYLES

When Stone references a style name, apply its full specification. Pick ONE per project.

### Linear / Vercel
```
BG: #000000 or #0A0A0A | Text: #EDEDED primary, #888 muted
Accent: one color only (blue, purple, or green)
Cards: bg-white/5 border border-white/10 rounded-xl
Font: DM Sans, Geist Sans, or similar geometric sans
Shadows: none or very subtle glow in accent color
Vibe: quiet confidence, nothing wasted
```

### Glassmorphism
```
Cards: bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl
BG: dark gradient or mesh gradient with floating color orbs
Radius: generous — rounded-2xl or rounded-3xl
Shadows: colored tint (shadow-accent/20)
```

### Minimal Luxury
```
BG: #FDFBF7 (warm off-white) or #0D0D0D (rich black)
Accent: gold (#C9A84C), copper (#B87333), or burgundy (#6B1D2A)
Font: Playfair Display headings, Lato body
Layout: max-w-4xl centered, large imagery, text-image overlap
Lots of whitespace, tight heading tracking, generous body leading
```

### Bento Grid
```
Grid: grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4
Featured items: col-span-2 or row-span-2
Cards: rounded-2xl p-6 overflow-hidden, each with its own mini-visual
Mix: text, icons, mini-charts, code snippets, illustrations
```

### Soft / Pastel
```
BG: #FFF8F0 (warm) or #F0F4FF (cool)
Cards: bg-white rounded-3xl shadow-lg shadow-accent/10 p-8
Colors: lavender, mint, peach, sky
Font: Nunito or Poppins with rounded characters
Radius: rounded-2xl minimum on everything
```

### Brutalist
```
BG: stark #FFFFFF or pure #000000
Borders: border-2 border-black, sharp corners (no radius)
Font: monospace or system-ui, oversized (text-6xl+)
Accent: neon yellow (#CCFF00), electric blue (#0000FF), hot pink (#FF0066)
```

### Dashboard / Data Dense
```
BG: #0F1117 | Surface: #1A1D27
Text: #E2E8F0 primary, #64748B muted
Accent: functional only — green/amber/red for status
Font: Inter UI, JetBrains Mono for data
Grid: dense gap-3, many small cards, sidebar nav
```

---

## FORM OPTIMIZATION

- 3 fields optimal (~25% conversion rate). Never exceed 5.
- Labels above fields (never placeholder-only)
- 16px font minimum (prevents iOS zoom)
- Full-width submit button on mobile
- Multi-step with progress indicator for 4+ fields
- Error: text + icon, never color alone

---

## PAGE SPEED

- Images: WebP/AVIF, srcset for responsive, lazy load below fold
- Fonts: WOFF2 preferred, font-display: swap, preload critical, max 2 families
- No hero video unless specifically requested (adds ~1.2s to LCP)
- Target LCP under 2.5 seconds
- CSS: purge unused Tailwind in production

---

## LOCAL BUSINESS ADDITIONS

When building for a local business, also apply:

- Phone number visible in nav (click-to-call on mobile) — this is THE primary CTA
- Google reviews displayed: star rating + review count + 3-6 recent reviews
- "Locally Owned" / "Serving [City] Since [Year]" trust signals
- Owner photo and brief personal story (builds local trust)
- Service area list: neighborhoods and surrounding cities
- LocalBusiness schema markup (JSON-LD)
- NAP consistency: Name, Address, Phone identical everywhere + matching Google Business Profile
- Real photos of real local people — never generic stock photos
- Warm color palette: saturated tones, warm golds/browns signal Southern hospitality
- Background: cream (#FDF5E6) or warm gray (#F5F2EE), not sterile white

---

## DARK MODE

Every project supports dark mode. Implementation:

1. CSS variables in `:root` (light) and `.dark` (dark) in global.css
2. `darkMode: 'class'` in tailwind.config.js
3. ThemeContext that toggles `.dark` class on `<html>` element
4. Persist preference in localStorage
5. Default: respect `prefers-color-scheme` on first visit
6. Toggle: sun/moon icon in nav

Test EVERY component in both modes before shipping.

---

## ACCESSIBILITY BASELINE

- WCAG AA contrast minimum: 4.5:1 normal text, 3:1 large text, 3:1 UI components
- Touch targets: 48x48px minimum
- All interactive elements keyboard-accessible (visible focus states)
- Images: meaningful alt text (not "image" or "photo")
- Form fields: proper label association
- Color never sole indicator of meaning
- prefers-reduced-motion respected (see animation system)

---

## OUTPUT RULES

When Claude Code uses this skill:

1. **Read this entire file first** before writing any code
2. **Ask Stone for creative dial values** if not provided (or use defaults: 6/5/4)
3. **Pick a font pairing and color palette** before writing components — declare them in the first commit
4. **Build the page in section order** from the Conversion Stack — hero first, footer last
5. **Every section gets a scroll reveal** at MOTION_INTENSITY 4+
6. **No placeholder content** — write real, specific copy for the business
7. **Test both themes** — verify light and dark mode render correctly
8. **Commit after each section** with descriptive messages
