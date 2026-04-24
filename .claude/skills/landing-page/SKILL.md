---
name: landing-page
description: Build high-converting landing pages backed by conversion research data. Use this skill whenever creating a landing page, sales page, lead generation page, service page, or any page designed to drive a specific conversion action. Also use when the user mentions conversion optimization, A/B testing patterns, CTA placement, form optimization, or landing page structure. Triggers on any mention of landing page, sales page, lead gen, conversion, funnel page, or squeeze page.
---

# Landing Page Skill

Build landing pages that convert using data from Unbounce (41K landing pages, 464M visitors), HubSpot (40K+ customers), and dozens of A/B test case studies. Every recommendation here traces to specific research.

## The Conversion Stack

This is the optimal section order. Follow it unless you have a specific reason not to:

1. **Hero** — Headline + subheadline + single primary CTA
2. **Trust Bar** — Client logos, certifications, review scores (just below hero)
3. **Problem** — Agitate the pain point the visitor has
4. **Solution** — Position the product/service as the answer
5. **Social Proof** — Testimonials, reviews, case study stats
6. **Benefits** — Features tied to outcomes (not feature lists)
7. **How It Works** — 3-step process (only for complex products/services)
8. **Pricing / Offer** — What they get, what it costs, what's included
9. **Final CTA** — Urgency push with supporting social proof nearby
10. **FAQs** — Address remaining objections (accordion pattern)
11. **Footer** — Minimal: legal links, contact info

## Critical Rules

### Single CTA Focus
One conversion action per landing page. Period. Single CTA pages convert at 13.5% average. Reducing to a single CTA increased conversions by 266% in testing. Every CTA button on the page should point to the same action — just positioned at multiple scroll depths.

### Remove Navigation
Only 16% of landing pages do this, despite HubSpot data showing +16-28% conversion lift for mid-funnel offers. On landing pages, strip the nav. Include only: logo (links to homepage) and phone number (for local businesses).

### Reading Level
Write at a 5th-7th grade reading level. This converts at 11.1% — which is 56% better than 8th-9th grade level. Complex copy is hurting conversions 62% more than it did in 2020. Use short sentences. Simple words. Clear meaning.

### Above the Fold
The headline, subheadline, and primary CTA must be visible without scrolling. 90% of users who read the headline also read the CTA. The headline-CTA relationship is the most critical pairing on the page.

## Section Blueprints

### Hero Section

```
STRUCTURE:
- Overline text (optional): category, tagline, or trust badge
- Headline: 6-12 words max, 5th-7th grade reading level
  → text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight
- Subheadline: expand with who it's for + key benefit + differentiator
  → text-lg md:text-xl text-text-muted mt-4 max-w-xl
- Primary CTA: single button, first-person copy ("Get My Free Quote")
  → mt-8, h-14 px-8 text-lg font-semibold rounded-lg
- Supporting proof: "Trusted by 500+ Jackson businesses" or star rating
  → mt-4 text-sm text-text-muted flex items-center gap-2

LAYOUT OPTIONS:
- Split hero (text left, image right): best for local businesses
  → grid grid-cols-1 lg:grid-cols-2 gap-12 items-center
- Centered hero: best for SaaS, simple offers
  → text-center max-w-3xl mx-auto
- Full-bleed image/video: best for visual businesses (food, events, real estate)
  → relative with overlay gradient

HERO TYPE PERFORMANCE:
- Static image heroes: safest, fastest loading, best for conversions
- Video backgrounds: mixed results, adds 1.2s to LCP, A/B test carefully
- Carousels/sliders: NEVER use. <1% CTR. Removing a slider produced 23% conversion lift.
- Text-only: gaining popularity in SaaS, +20% conversions vs image-heavy in VWO test
```

### Trust Bar

```
POSITION: Immediately below hero. Do not skip this.
CONTENT: 4-6 client logos (grayscale, 60-80% opacity) or certification badges
HEADING: "Trusted by 500+ businesses" — text-xs font-semibold uppercase tracking-widest
LAYOUT: flex items-center justify-center gap-8 md:gap-12, py-6
BACKGROUND: slightly different from hero (bg-surface or subtle tint)
IMPACT: Social proof near hero increases conversions up to 15%
```

### Problem Section

```
PURPOSE: Make the visitor feel understood. Agitate their current pain.
HEADLINE: "Tired of [problem]?" or "Most [industry] businesses struggle with [pain]"
BODY: 2-3 short paragraphs or bullet points describing the pain
TONE: Empathetic, not fear-mongering. Show you understand their world.
LAYOUT: max-w-3xl mx-auto text-center, or split with illustration
VISUAL: Optional icon grid showing 3-4 pain points
```

### Solution Section

```
PURPOSE: Position your service as the bridge from pain to outcome
HEADLINE: "Here's how [service] solves [problem]"
BODY: Clear, benefit-focused explanation
LAYOUT: Often a split — text + screenshot/mockup/photo
VISUAL: Product screenshot, service photo, or process illustration
CTA: Optional secondary CTA here ("See How It Works" → scrolls to How It Works)
```

### Social Proof Section

```
PLACEMENT: After Solution, and also sprinkled near every CTA
FORMATS (pick 2-3):
  - Testimonial cards: quote + photo + name + role
  - Video testimonials: +80% conversion increase
  - Star ratings: products with reviews = 270% higher purchase likelihood
  - Case study stats: "Increased revenue by 147% in 6 months"
  - Real-time proof: "23 people booked this week" (+98% conversions)

TESTIMONIAL CARD SPEC:
  - bg-surface rounded-xl p-6 md:p-8
  - Large quote mark (decorative, accent color, opacity-20)
  - Quote text: text-lg leading-relaxed (body font, regular weight)
  - Photo: 48-64px circle
  - Name: font-semibold
  - Role/company: text-sm text-text-muted
  - Star rating if applicable

LAYOUT: Grid of 2-3 cards, or single featured testimonial (large, centered)
KEY RULE: "Push back against placing testimonials at the bottom. Use social proof as supporting copy near CTAs or at points of friction."
```

### Benefits Section

```
PURPOSE: Show features tied to outcomes. Not a feature list — a benefit matrix.
FORMAT: 3-6 benefit cards in a grid
EACH CARD:
  - Icon (relevant, not generic)
  - Benefit headline (outcome-focused: "Save 10 hours per week" not "Task automation")
  - 1-2 sentence supporting copy
LAYOUT: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8
ANIMATION: Staggered reveal on scroll (see scroll-stop skill)
```

### How It Works

```
PURPOSE: Reduce complexity anxiety. Show the path is simple.
FORMAT: 3 steps (always 3 — cognitive sweet spot)
EACH STEP:
  - Number (large, accent color or accent background circle)
  - Step name (font-semibold)
  - 1 sentence description
LAYOUT: horizontal on desktop (flex gap-8), vertical stack on mobile
CONNECTOR: Subtle line or arrow between steps on desktop
EXAMPLE:
  1. "Book a Free Consultation" → "Tell us about your project in a 15-minute call"
  2. "Get Your Custom Plan" → "We design a strategy tailored to your goals"
  3. "Watch Results Roll In" → "Sit back while we execute and report monthly"
```

### Pricing / Offer Section

```
PURPOSE: Make the value exchange crystal clear
FORMAT:
  - For single offer: centered card with included items list + price + CTA
  - For tiers: 2-3 pricing cards, middle one featured (scale slightly, accent border)
INCLUDED LIST: Checkmark icons, clear descriptions, no jargon
CTA: Primary button on each card, first-person copy
GUARANTEE: "30-day money back" or "No contracts" badge near CTA
ANCHOR: Show crossed-out higher price if applicable (anchoring effect)
```

### Final CTA Section

```
PURPOSE: Last conversion push for users who scrolled the whole page
BACKGROUND: Accent color or dark contrast (stands out from rest of page)
HEADLINE: Urgency or outcome focused ("Ready to grow your business?")
SUBTEXT: Reinforce key benefit + social proof stat
CTA: Large primary button, same action as hero CTA
SUPPORTING: "Join 500+ businesses" or "No commitment required"
LAYOUT: text-center, generous padding py-16 md:py-24
```

### FAQ Section

```
PURPOSE: Overcome final objections before they leave
FORMAT: Accordion (click to expand, one open at a time)
COUNT: 5-8 questions
CONTENT: Real objections, not softball questions
  → "How much does it cost?" "How long until I see results?"
  → "What if I'm not happy?" "Do I need to sign a contract?"
LAYOUT: max-w-3xl mx-auto
ANIMATION: Smooth height transition on open/close
```

## CTA Button Rules

### Copy
- First-person: "Get My Free Quote" beats "Get Your Free Quote" by 90%
- Action verbs: Get, Start, Claim, Discover, Book, Try
- Avoid: Submit, Click Here, Contact Us, Learn More
- Personalized CTAs convert 202% better than generic
- Specific copy boosts conversions up to 161%

### Design
- Height: 48px minimum (52px for hero CTA)
- Centered alignment: 682% more clicks than left-aligned
- Highest contrast element on the page
- Rounded corners (rounded-lg or rounded-xl)
- No ALL CAPS for multi-word CTAs (sentence case)

### Placement
- Hero: always (above the fold)
- After social proof section
- After pricing/offer section
- Final CTA section
- Sticky on mobile for high-value pages (increases sales 8-33%)

### Sticky Mobile CTA
For service pages and high-value offers:
```
fixed bottom-0 left-0 right-0 z-50 p-3 bg-bg/95 backdrop-blur-sm border-t border-border
Keep under 20-30% of screen height
```

## Form Optimization

```
FIELD COUNT: 3 fields optimal (~25% conversion rate). Never exceed 5.
  - Reducing 11 → 4 fields = +120-160% conversions

FIELD TYPES TO AVOID:
  - Multiple textareas (powerful negative effect)
  - Multiple dropdowns (associated with lower conversion)

BEST PRACTICE:
  - Labels above fields (never placeholder-only)
  - 16px font minimum (prevents iOS zoom)
  - Single-line text fields have minimal negative impact
  - Multi-step forms for complex needs (reduces perceived effort)
  - Full-width submit button on mobile
  - Error states: text + icon, never color alone

LAYOUT:
  - Inline (2-3 fields + button in a row) for simple email capture
  - Stacked (fields + button vertical) for longer forms
  - Multi-step with progress indicator for 4+ fields
```

## Page Speed

Every second matters. These are the numbers:
- 1-second load: 2.5-5x more conversions than 5-10 second load
- 1-second delay: -7% conversions
- 3-second delay: -20% conversions

Optimization checklist:
- Images: WebP/AVIF, srcset for responsive, lazy load below fold
- Fonts: WOFF2, font-display: swap, preload critical fonts, max 2 families
- CSS: Purge unused Tailwind classes in production
- No hero video unless A/B tested (adds ~1.2s to LCP)
- Target LCP under 2.5 seconds

## Conversion Benchmarks

Know what "good" looks like:

| Industry | Median Rate |
|----------|------------|
| Restaurants | 18.2% |
| B2B | 13.28% |
| B2C | 9.87% |
| Agencies | 8.8% |
| Financial | 8.4% |
| SaaS | 3.8% |
| Overall median | 6.6% |
| Good | 10% |
| Excellent | 15%+ |

82.9% of visitors are on mobile. Desktop converts higher. Optimize both.
