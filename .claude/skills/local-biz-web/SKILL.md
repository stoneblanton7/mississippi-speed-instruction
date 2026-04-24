---
name: local-biz-web
description: Build websites for local businesses optimized for the Jackson, Mississippi market and similar Southern/local markets. Use this skill whenever building a website for a local business — restaurants, gyms, salons, contractors, lawyers, dentists, HVAC, landscaping, auto repair, or any brick-and-mortar service business. Also triggers for Google Business Profile optimization, local SEO, review integration, community trust signals, and local market demographics. Use whenever the user mentions local business, small business website, Jackson MS, Southern market, or service-area business.
---

# Local Business Web Skill

Build websites for local businesses that win trust, drive calls, and convert visitors into customers. Optimized for the Jackson, MS market and applicable to any local/Southern market. Every recommendation backed by conversion research and local consumer behavior data.

## Jackson, MS Market Context

Understand the audience before designing:

- **Demographics**: 81.9% African American population in Jackson proper
- **Color preferences**: Rich, saturated colors resonate. Warm gold/brown accents signal Southern warmth and hospitality. Avoid sterile all-white — use cream (#FDF5E6) or warm gray (#F5F2EE) backgrounds.
- **Representation matters**: 59% of Black consumers leave if they don't see genuine community representation. Use real photos of real local people — never generic stock photos.
- **Device context**: Ensure high contrast for older/lower-quality devices. 16px minimum font.
- **Trust signals**: Local = personal. Emphasize owner story, years in community, local partnerships, neighborhood involvement.
- **Phone is king**: For service businesses, the phone number IS the primary CTA. Make it impossible to miss. Click-to-call on mobile. 20-24px bold on desktop.

## Local Business Page Structure

Different from SaaS landing pages. Local businesses need trust-first, action-second:

### Homepage Sections (in order)

1. **Hero** — What you do + who you serve + phone number / booking CTA
2. **Trust Bar** — Google rating, years in business, certifications, "Locally owned"
3. **Services Overview** — 3-6 service cards linking to detail pages
4. **About / Story** — Owner photo + brief story (builds trust with local audience)
5. **Social Proof** — Google reviews, before/after photos, community involvement
6. **Service Area** — Map or list of neighborhoods/cities served
7. **Contact / CTA** — Phone, address, hours, simple contact form (3 fields max)
8. **Footer** — NAP (Name, Address, Phone), links, social, hours

### Service Detail Pages

Each service gets its own page (critical for local SEO):

1. **Service Hero** — Service name + brief description + CTA
2. **Problem/Solution** — Why customers need this service
3. **What's Included** — Clear scope, no jargon
4. **Before/After** — Photos if applicable (83% engagement increase)
5. **Testimonials** — Service-specific reviews
6. **Pricing** — At minimum a "Starting at $X" or "Free estimates"
7. **FAQ** — Service-specific objections
8. **CTA** — Phone number + contact form

## Phone Number Treatment

The phone number is the most important element on a local business website. Treat it like a hero:

```
DESKTOP NAV:
  text-xl md:text-2xl font-bold text-accent
  Position: right side of nav, always visible
  Icon: phone icon left of number

MOBILE:
  Sticky bottom bar with click-to-call button
  OR prominent in mobile nav
  Always use tel: link: <a href="tel:+16015551234">

HERO SECTION:
  Phone number visible in or immediately below the hero CTA
  "Call Now: (601) 555-1234" or as the CTA button text itself

BODY SECTIONS:
  Repeat phone number near every CTA throughout the page
  "Questions? Call us at (601) 555-1234"
```

## Google Review Integration

98% of consumers read reviews for local businesses. 81% specifically use Google reviews.

### Display Strategy
- Show Google rating prominently: star icons + "4.8 ★ on Google (127 reviews)"
- Link directly to your Google Business Profile review page
- Pull and display 3-6 recent reviews on the homepage
- Each review shows: star rating, reviewer first name, date, excerpt, "Read more on Google" link
- 68% of consumers require minimum 4-star rating
- Optimal perceived rating: 4.2-4.5 stars (perfect 5.0 raises suspicion)
- Reviews must be recent: 73% only trust reviews from the last 30 days

### Review Card Pattern
```
Container: bg-surface rounded-xl p-5 border border-border
Stars:     flex gap-0.5, filled stars in amber/gold (#F59E0B)
Quote:     text-base leading-relaxed, 2-3 lines max (truncate with "...")
Name:      font-semibold mt-3
Date:      text-sm text-text-muted
Google:    Small Google icon + "Google Review" badge
```

## Before/After Photo Pattern

83% engagement increase. Especially powerful for:
- Contractors (renovation, painting, roofing)
- Landscaping
- Auto detailing
- Salons / barbers
- Dental (smile transformations)
- Cleaning services

Implementation: Use the slider pattern from the scroll-stop skill, or a simple side-by-side grid:
```
Layout:     grid grid-cols-2 gap-2 rounded-xl overflow-hidden
Before:     relative, "Before" badge top-left
After:      relative, "After" badge top-left
Badge:      absolute top-3 left-3 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded
```

## Local SEO Essentials

Build these into every local business site:

### NAP Consistency
Name, Address, Phone number — identical everywhere on the site and matching Google Business Profile exactly. Put in footer, contact page, and schema markup.

### Schema Markup
Add LocalBusiness JSON-LD to every page:
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Business Name",
  "image": "https://example.com/photo.jpg",
  "telephone": "+1-601-555-1234",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "Jackson",
    "addressRegion": "MS",
    "postalCode": "39201"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 32.2988,
    "longitude": -90.1848
  },
  "openingHoursSpecification": [],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  }
}
```

### Title Tag Pattern
`[Service] in [City], [State] | [Business Name]`
Example: "Emergency Plumbing in Jackson, MS | Thompson Plumbing Co."

### Meta Description Pattern
`[Business Name] offers [service] in [City/Area]. [Key differentiator]. Call (601) 555-1234 for [offer]. [Trust signal].`
Example: "Thompson Plumbing offers 24/7 emergency plumbing in Jackson, MS. Licensed & insured with 15+ years experience. Call (601) 555-1234 for a free estimate. 4.8★ on Google."

## Service Area Display

Show where you work. Builds trust and helps local SEO:

### Map Pattern
- Embedded Google Map showing service area
- Pin on business location
- Shaded service radius or city boundaries if possible
- List of neighborhoods/cities served alongside map

### Text List Pattern
```
Heading: "Proudly Serving Jackson & Surrounding Areas"
Layout:  columns-2 md:columns-3 gap-y-2
Items:   Jackson, Ridgeland, Madison, Brandon, Pearl, Flowood,
         Clinton, Terry, Byram, Florence, Richland, Canton
```

## Contact Section

### Form Specs
- 3 fields maximum: Name, Phone, Message (or Service Needed dropdown)
- "Get a Free Quote" as submit button (not "Submit")
- Phone field should accept formatted input: (601) 555-1234
- Response time promise: "We respond within 2 hours" builds urgency and trust

### Contact Info Display
```
Layout: grid grid-cols-1 md:grid-cols-2 gap-8
Left:   Contact form
Right:  Business info stack:
        - Phone (large, prominent, click-to-call)
        - Email
        - Address with Google Maps link
        - Business hours (clearly formatted)
        - Social media links
```

## Industry-Specific Patterns

### Restaurants
- Menu must be on the site (not just a PDF — SEO can't read PDFs)
- Online ordering link prominent in nav and hero
- Hours visible on every page
- Photo gallery of food and space (real photos, not stock)
- Reservation CTA if applicable

### Contractors / Home Services
- License and insurance numbers visible
- Before/after gallery (critical for trust)
- "Free estimate" as primary CTA
- Emergency service callout if applicable
- Service area map

### Law Firms
- "Free consultation" as primary CTA
- Practice area pages (each area = separate page)
- Attorney bios with photos and credentials
- Case results / settlements (if permitted by state bar)
- Conservative color palette (navy, charcoal, gold accents)

### Medical / Dental
- Online booking integration
- Insurance accepted list
- Provider bios with credentials and photos
- Patient testimonials (with consent)
- HIPAA notice in footer
- Calming color palette (blue, teal, soft greens)

### Fitness / Gyms
- Class schedule prominently displayed
- "Free trial" or "First class free" as primary CTA
- Trainer bios with photos
- Transformation photos (before/after)
- Pricing visible (or "See Plans" CTA)
- Energy-forward color palette (red, orange, electric green on dark backgrounds)

## Community Trust Signals

For Jackson and similar Southern markets, these build deep trust:

- "Locally Owned & Operated Since [Year]"
- "Proud to Serve the Jackson Community"
- Owner photo and personal story (not corporate headshot — real, warm, approachable)
- Community involvement: sponsor local events, youth sports, churches
- "As seen in" local media (Clarion-Ledger, WLBT, Jackson Free Press)
- BBB rating badge
- Chamber of Commerce membership
- Neighborhood-specific landing pages for SEO

## Performance Priorities

Local business visitors are often on mobile, on cellular data, possibly on older devices:

1. **Optimize images aggressively** — WebP, proper sizing, lazy load
2. **No hero video unless specifically requested** — static images are safer
3. **Google Fonts: max 2 families, 2-3 weights** — or self-host for speed
4. **Target LCP under 2.5s, ideally under 1.5s**
5. **Click-to-call must work instantly** — no delays, no popups
6. **Google Maps embed lazy loaded** — heavy on initial page load

## Anti-Patterns for Local Business Sites

- Generic stock photos (trust drops drastically — use real photos or none)
- No phone number visible without scrolling
- Menu as PDF only (bad for SEO, bad for mobile)
- "Submit" as form button text (use action-oriented copy)
- Auto-playing video (slows load, annoying on mobile data)
- Missing business hours
- No Google reviews displayed
- "Contact us for pricing" with no price range at all (visitors bounce)
- Overly corporate tone for a neighborhood business (be warm, be human)
