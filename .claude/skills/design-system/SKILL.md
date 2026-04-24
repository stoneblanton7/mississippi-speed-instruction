---
name: design-system
description: Foundation design system for all web projects. Use this skill whenever building any web page, component, layout, or UI element. Defines CSS variables, color tokens, typography pairings, spacing scale, component specs, dark/light mode, and Tailwind configuration. Always read this skill before writing any frontend code — even for small components. Triggers on any mention of styling, theming, colors, fonts, spacing, buttons, cards, forms, navigation, or layout.
---

# Design System Skill

Every web project starts here. This skill defines the token system, component patterns, and design rules that keep output consistent and professional. Read this before writing any CSS, Tailwind classes, or component code.

## Core Principles

1. **Never hardcode colors.** Every color comes from a CSS variable or Tailwind token. Zero raw hex values in components.
2. **Dark and light mode required.** Use CSS variables in `:root` and `.dark`, plus Tailwind's `dark:` prefix.
3. **Mobile-first.** Start with mobile styles, scale up with `md:` and `lg:` breakpoints. 16px minimum font size (prevents iOS auto-zoom).
4. **Touch targets: 48x48px minimum.** Every interactive element.
5. **WCAG AA contrast minimum.** Normal text: 4.5:1. Large text (18px+ or 14px bold): 3:1. UI components: 3:1.
6. **Max 2 font families per project.** One heading, one body. Load WOFF2 with `font-display: swap`. Preload critical fonts.
7. **4px base spacing unit.** All spacing derives from multiples of 4.

## CSS Variable Template

Define these in `global.css` (or your project's main CSS file). Swap hex values per project — variable names stay consistent:

```css
:root {
  --color-bg: #FFFFFF;
  --color-surface: #F9FAFB;
  --color-surface-elevated: #FFFFFF;
  --color-accent: /* project primary — CTAs, links, active states */;
  --color-accent-hover: /* slightly lighter or shifted */;
  --color-accent-pressed: /* slightly darker */;
  --color-text: #1A1A1A;
  --color-text-muted: #6B7280;
  --color-text-inverted: #FFFFFF;
  --color-border: #E5E7EB;
  --color-border-strong: #D1D5DB;
  --color-success: #16A34A;
  --color-warning: #F59E0B;
  --color-error: #DC2626;
  --color-overlay: rgba(0, 0, 0, 0.5);
  --font-heading: /* heading font */, sans-serif;
  --font-body: /* body font */, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
}

.dark {
  --color-bg: #0D0D0F;
  --color-surface: #1A1A1E;
  --color-surface-elevated: #25252A;
  --color-text: #F3F4F6;
  --color-text-muted: #9CA3AF;
  --color-text-inverted: #1A1A1A;
  --color-border: #2D2D32;
  --color-border-strong: #404046;
  --color-overlay: rgba(0, 0, 0, 0.7);
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.4);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.5);
}
```

## Tailwind Config Pattern

Map CSS variables into Tailwind so utility classes reference them:

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

## Typography Scale

| Element | Desktop | Mobile | Weight | Line Height | Tailwind |
|---------|---------|--------|--------|-------------|----------|
| H1 | 36-48px | 28-36px | 700 | 1.1 | `text-3xl md:text-5xl font-bold leading-tight tracking-tight` |
| H2 | 28-32px | 24-28px | 700 | 1.15 | `text-2xl md:text-3xl font-bold leading-snug` |
| H3 | 22-24px | 20-22px | 600 | 1.2 | `text-xl md:text-2xl font-semibold` |
| Body | 18px | 16px | 400 | 1.5 | `text-base md:text-lg leading-relaxed` |
| Small | 14px | 14px | 400 | 1.4 | `text-sm` |
| Button | 16-18px | 16px | 600 | 1.25 | `text-base font-semibold` |
| Overline | 12-14px | 12px | 600 | 1.2 | `text-xs font-semibold uppercase tracking-widest` |

Max line length: 65ch (`max-w-prose`). Container: `max-w-7xl mx-auto px-4 md:px-8`.

## Font Pairing Quick Reference

Pick one pairing per project. Never mix pairings:

| Industry | Heading | Body |
|----------|---------|------|
| Fine dining / luxury | Playfair Display 700 | Lato 400 |
| Casual restaurant / bakery | Montserrat 700 | Open Sans 400 |
| Gym / fitness | Oswald 700 | Roboto 400 |
| Yoga / wellness | Raleway 600 | Lato 400 |
| Medical / dental | Open Sans 700 | Lato 400 |
| Law firm (traditional) | Lora 700 | Roboto 400 |
| Law firm (modern) | Montserrat 700 | Open Sans 400 |
| HVAC / contractor | Montserrat 700 | Roboto 400 |
| SaaS / tech | Poppins 600 | Inter 400 |
| Developer tools | Inter 600 | Fira Code (mono) |

## Spacing Scale (4px base)

| Token | px | Tailwind | Use |
|-------|-----|----------|-----|
| 1 | 4px | `1` | Tight gaps |
| 2 | 8px | `2` | Icon gaps, inline |
| 3 | 12px | `3` | Small padding |
| 4 | 16px | `4` | Standard padding, mobile gutter |
| 6 | 24px | `6` | Card padding, form spacing |
| 8 | 32px | `8` | Desktop gutter |
| 12 | 48px | `12` | Button/input height |
| 16 | 64px | `16` | Section padding mobile |
| 20 | 80px | `20` | Section padding desktop |
| 24 | 96px | `24` | Large section padding |
| 32 | 128px | `32` | Hero top padding |

Standard section: `py-16 md:py-24`. Card grid gap: `gap-6 md:gap-8`.

## Component Specs

### Primary CTA Button
```
Height:     48px min (h-12)
Padding:    12px 24px (py-3 px-6)
Radius:     8px (rounded-lg)
Font:       16px, weight 600
Color:      bg-accent text-text-inverted
Hover:      bg-accent-hover
Active:     bg-accent-pressed
Transition: transition-colors duration-150
```
Pattern: `className="h-12 px-6 rounded-lg text-base font-semibold bg-accent text-text-inverted hover:bg-accent-hover active:bg-accent-pressed transition-colors duration-150"`

### Secondary Button
```
Outline style: border-2 border-accent text-accent bg-transparent
Hover:         bg-accent/10
Same sizing as primary
```

### Card
```
Background: bg-surface
Border:     border border-border (or shadow-md for elevated)
Radius:     rounded-lg
Padding:    p-6
Dark mode:  dark:bg-surface dark:border-border
```

### Input / Form Field
```
Height:     48px (h-12)
Padding:    px-4
Font:       16px (text-base) — prevents iOS zoom
Border:     border border-border rounded-lg
Focus:      focus:ring-2 focus:ring-accent focus:border-accent
Label:      Above the field, text-sm font-medium mb-1.5
Error:      text-error text-sm mt-1, icon + text (never color alone)
```

### Badge / Status Pill
```
Padding:    px-2.5 py-0.5
Font:       text-xs font-semibold
Radius:     rounded-full
Variants:   green=published, orange=review, yellow=revision, blue=ready, gray=draft
```

### Modal
```
Backdrop:   fixed inset-0 bg-overlay z-50
Panel:      bg-surface-elevated rounded-lg shadow-lg max-w-lg mx-auto p-6
Close:      absolute top-4 right-4 (X icon)
Animation:  fade in backdrop, scale up panel
```

### Toast
```
Position:   fixed bottom-4 right-4 z-50
Background: bg-surface-elevated shadow-lg rounded-lg p-4
Auto-dismiss: 3 seconds
Animation:  slide up + fade in, slide down + fade out on dismiss
```

### Navigation
```
Height:     64-72px desktop (h-16 md:h-18)
Background: bg-bg/80 backdrop-blur-md (glassmorphism on scroll)
Position:   sticky top-0 z-40
Items:      5-7 max, text-sm font-medium
Mobile:     Hamburger → full-screen overlay
Phone CTA:  text-xl font-bold, click-to-call on mobile
```

## Aesthetic Vocabulary

When the user references a style by name, execute it precisely. These are the named styles you must recognize and know how to build. Pick one per project — never blend styles unless explicitly asked.

### Linear / Vercel Style
The modern SaaS gold standard. Dark background (#000 or near-black), clean sans-serif type (Inter, Geist), subtle gradient text, monochromatic palette with one accent color, generous whitespace, fine 1px borders, and a premium sense of restraint. Cards use subtle border with low-opacity backgrounds. Animations are minimal and elegant — fade + slight translate on scroll. Nav is minimal with a blur backdrop on scroll.
```
BG: #000000 or #0A0A0A
Text: #EDEDED primary, #888 muted
Accent: one color (blue, purple, or green)
Cards: bg-white/5 border border-white/10 rounded-xl
Font: Inter, Geist Sans, or similar geometric sans
Vibe: "Quiet confidence. Nothing wasted."
```

### Glassmorphism
Frosted glass effect over colorful or dark backgrounds. Cards and panels have semi-transparent backgrounds with `backdrop-filter: blur()` and subtle borders. Works best on dark or gradient backgrounds where the blur reveals depth. Feels premium and layered.
```
Card: bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl
Background: dark gradient or mesh gradient with floating color orbs
Shadow: shadow-lg with colored tint (e.g., shadow-accent/20)
Radius: generous — rounded-2xl or rounded-3xl
Vibe: "Looking through frosted glass at something beautiful."
```

### Aurora UI
Inspired by the Northern Lights. Dark backgrounds with large, soft, animated color gradients that shift slowly. Ethereal and immersive. Gradients use 2-3 colors (teals, purples, pinks, greens) with large blur radii. Text is clean white against the dark + gradient combo.
```
BG: #0A0A0A with absolutely-positioned gradient blobs
Blobs: w-96 h-96 rounded-full blur-3xl opacity-20, animated with slow translate/scale
Colors: teal (#14B8A6), purple (#8B5CF6), pink (#EC4899), emerald (#10B981)
Animation: 8-15 second infinite ease-in-out loops, each blob on different timing
Vibe: "Standing under the Northern Lights with a MacBook."
```

### Bento Grid
Named after Japanese bento boxes. Asymmetric grid layouts where cards are different sizes — some span 2 columns, some span 2 rows, creating visual interest through irregular tiling. Each card is a self-contained feature showcase. Apple and Vercel popularized this.
```
Grid: grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4
Spanning: col-span-2, row-span-2 on featured items
Cards: rounded-2xl p-6 overflow-hidden, each with its own mini-visual
Content: mix of text, icons, small illustrations, mini-charts, code snippets
Vibe: "Everything has its place, but nothing is uniform."
```

### Minimal Luxury
High-end, editorial feel. Lots of whitespace. Serif headings (Playfair Display, Cormorant Garamond) paired with clean sans body text. Muted color palette — blacks, warm grays, one metallic or warm accent (gold, copper, burgundy). Photography-forward. Feels like a luxury magazine layout.
```
BG: #FDFBF7 (warm off-white) or #0D0D0D (rich black)
Text: tight tracking on headings, generous leading on body
Accent: gold (#C9A84C), copper (#B87333), or deep burgundy (#6B1D2A)
Font: Playfair Display or Cormorant Garamond headings, Lato body
Layout: max-w-4xl centered, large imagery, text-image splits with overlap
Vibe: "If Vogue designed a website."
```

### Brutalist
Raw, deliberately unpolished, anti-design design. Exposed system fonts or monospace, hard borders, no border-radius, high contrast, visible grid lines, stark black-and-white with occasional neon accents. Typography is oversized and sometimes overlapping. Feels intentionally rough and punk.
```
BG: #FFFFFF stark white or #000000 pure black
Borders: border-2 border-black (no radius, sharp corners)
Font: monospace or system-ui, often oversized (text-6xl+)
Accent: neon yellow (#CCFF00), electric blue (#0000FF), hot pink (#FF0066)
Layout: visible grid, overlapping elements, text as structural element
Vibe: "We know the rules. We're breaking them on purpose."
```

### Soft / Pastel
Light, friendly, approachable. Soft rounded shapes (rounded-2xl to rounded-3xl), pastel color palette, generous padding, playful sans-serif fonts (Nunito, Quicksand, Poppins). Shadows are soft and colored (not gray). Great for wellness, education, family, and consumer products.
```
BG: #FFF8F0 (warm) or #F0F4FF (cool)
Cards: bg-white rounded-3xl shadow-lg shadow-accent/10 p-8
Colors: soft pastels — lavender (#E8D5F5), mint (#D1FAE5), peach (#FDDCB5), sky (#BFDBFE)
Font: Nunito, Quicksand, or Poppins with rounded characters
Radius: rounded-2xl minimum on everything
Vibe: "Friendly, warm, zero intimidation."
```

### Retro / Vintage
Warm tones, textured backgrounds (noise grain, paper texture), retro typography (slab serifs, display fonts with character), muted earth-tone palettes. May include decorative borders, stamp-like badges, or illustration-forward sections. Feels handcrafted.
```
BG: #FDF5E6 (cream) with CSS noise overlay
Accent: rust (#B7410E), forest (#2D5A27), navy (#1B2A4A), gold (#C9A84C)
Font: Slab serifs (Roboto Slab, Bitter) or display fonts (Playfair, Libre Baskerville)
Texture: background-image noise at 3-5% opacity over warm base
Details: decorative underlines, badge shapes, illustrated icons
Vibe: "A craft coffee shop that opened in 1952 and got a website in 2024."
```

### Dashboard / Data Dense
Optimized for information density. Dark backgrounds, tight spacing, monospace numbers, status indicator dots, small cards in dense grids. Sidebar navigation. Muted palette with color used only for status and data visualization. Feels like mission control.
```
BG: #0F1117 (near-black with slight blue)
Surface: #1A1D27
Text: #E2E8F0 primary, #64748B muted
Accent: functional only — green for success, amber for warning, red for error
Font: Inter for UI, JetBrains Mono for data/numbers
Grid: dense, gap-3 or gap-4, many small cards
Sidebar: w-64, collapsible, icon + label nav items
Vibe: "Houston, we have data."
```

### How to Use These

When the user says "build it in Linear style" or "I want a glassmorphism look" — apply that style's full specification to every component on the page. Override the default CSS variables with the style's palette. Use the style's radius, spacing feel, and font choices. The style IS the design system for that project.

When no style is specified, default to a clean, modern look that matches the industry from the Font Pairing table above. Don't guess — ask the user what vibe they want, or suggest 2-3 options that fit their industry.

## Color Rules

1. **60-30-10**: 60% background, 30% surface/secondary, 10% accent.
2. CTA button must be the highest-contrast element on the page.
3. Never use color alone to convey meaning (WCAG 1.4.1).
4. Color-blind safe combos: Blue+Orange, Blue+Red, Black+Yellow.
5. Avoid: Red+Green, Green+Brown, Blue+Purple at similar values.

## Anti-Patterns — Never Do These

- Raw hex in components (`bg-[#FF5500]`) — use tokens
- Placeholder text in demos ("Lorem ipsum", "John Doe") — use realistic content
- Dead buttons that do nothing — every button navigates, opens a modal, or shows a toast
- Missing dark mode — every component must work in both themes
- Font sizes under 16px for body text on mobile
- More than 2-3 font weights per family loaded
- `!important` in Tailwind — restructure specificity instead
