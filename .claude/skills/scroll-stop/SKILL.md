---
name: scroll-stop
description: Create scroll-stopping, visually arresting web sections that make users pause and engage. Use this skill whenever building hero sections, feature showcases, testimonial sections, pricing tables, before/after reveals, stats counters, or any section that needs to grab attention. Also use for social media scroll-stop content, animated reveals, parallax effects, and micro-interactions. Triggers on any mention of animations, scroll effects, attention-grabbing, wow factor, impressive, scroll-stop, parallax, reveal animations, or making a section stand out.
---

# Scroll-Stop Skill

This skill creates sections and components that make people stop scrolling. The goal is to create a visceral "wait, what?" reaction — achieved through motion, contrast, timing, and visual surprise. Every technique here is CSS-first for performance, with JS only when CSS can't do the job.

## Philosophy

Scroll-stopping is about **contrast with surroundings**. A beautiful animation on a page full of animations is invisible. A single, well-timed reveal on an otherwise clean page is magnetic. Use restraint — pick 1-2 hero moments per page, not 15.

The hierarchy of attention:
1. **Motion** — the eye tracks movement before anything else
2. **Contrast** — large shifts in color, size, or density
3. **Scale** — oversized elements feel important
4. **Unexpected layout** — breaking the grid signals "this matters"
5. **Typography as art** — huge type with character IS the visual

## Scroll-Triggered Reveal System

Use `IntersectionObserver` for scroll-triggered animations. This is the foundation — build every scroll animation on this pattern:

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
          observer.unobserve(entry.target); // animate once
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

Usage pattern for any component:
```jsx
function FeatureCard({ title, description, delay = 0 }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* content */}
    </div>
  );
}
```

## Staggered Reveal Pattern

The single most effective scroll animation. Elements appear one after another with increasing delay. Creates rhythm and draws the eye through content in sequence.

```jsx
{items.map((item, i) => (
  <RevealCard key={i} delay={i * 120}>
    {/* card content */}
  </RevealCard>
))}
```

Timing rules:
- **Stagger delay**: 80-150ms between items (120ms is the sweet spot)
- **Duration**: 500-800ms per element (700ms default)
- **Easing**: `ease-out` for entrances, `ease-in-out` for transforms
- **Never exceed 6 staggered items** — after 6, the last ones feel sluggish. Group into rows of 3-4 instead.

## Hero Section Patterns

### Pattern 1: Split Hero (highest converting for local businesses)
Left side: big headline + subheadline + CTA. Right side: image/illustration/video.
The split layout guides eyes predictably and adapts well to mobile (stacks vertically).

```
Layout:     grid grid-cols-1 lg:grid-cols-2 gap-12 items-center
Headline:   text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight
Subhead:    text-lg md:text-xl text-text-muted mt-4 max-w-lg
CTA:        mt-8, primary button, large (h-14 px-8 text-lg)
Image:      rounded-2xl shadow-2xl, subtle float animation or parallax
```

### Pattern 2: Full-Width Impact Hero
Massive typography that IS the visual. No image needed. Type becomes art.

```
Headline:   text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter
            Gradient text or knockout text over textured background
Layout:     text-center, generous padding (py-32 md:py-48)
Effect:     Words animate in one at a time, or characters stagger
Accent:     One word in accent color, or underline/highlight animation
```

### Pattern 3: Video/Motion Background Hero
Use sparingly — adds 1.2s to LCP. Only for visually-driven businesses (restaurants, real estate, events).

```
Video:      object-cover, autoPlay muted loop playsInline
Overlay:    absolute inset-0 bg-gradient-to-b from-black/60 to-black/80
Text:       relative z-10, white text, large scale
Fallback:   poster image for slow connections, loading skeleton
```

## Scroll-Stop Section Recipes

### Counter / Stats Bar
Numbers animate from 0 to target when scrolled into view. Universally impressive.

```jsx
function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const { ref, isVisible } = useScrollReveal();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return (
    <span ref={ref} className="text-4xl md:text-6xl font-bold tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}
```

Layout: 3-4 stats in a row, staggered reveal, with supporting label below each number.

### Before/After Slider
Drag to compare. Extremely effective for service businesses (renovation, landscaping, detailing, design).

Core mechanic: Two images overlaid, clip-path on the top image controlled by a draggable handle.

```
Container:  relative overflow-hidden rounded-xl aspect-video
Before:     absolute inset-0 (full image)
After:      absolute inset-0, clip-path: inset(0 {100-percent}% 0 0)
Handle:     absolute, vertical line + circle grip, cursor-grab
Labels:     absolute top-4 left-4 "Before" / top-4 right-4 "After" badges
```

### Testimonial Carousel with Presence
Not an auto-rotating slider (those kill conversions). A swipeable card stack or grid with personality.

- Quote in large italic serif text (even if the rest of the site is sans-serif — the contrast IS the scroll-stop)
- Photo + name + role prominently displayed
- Star rating if applicable
- Stagger the cards on scroll with a slight rotation offset for depth

### Parallax Content Section
Background moves slower than foreground. Creates depth with minimal code.

```css
.parallax-bg {
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}
/* Or for React, use transform: translateY with scroll position */
```

For React: track scroll position with `useEffect` + `window.addEventListener('scroll')`, apply `transform: translateY(${scrollY * 0.3}px)` to background element. Use `will-change: transform` for GPU acceleration.

### Feature Bento Grid
Asymmetric grid of feature cards, some spanning 2 columns, some with icons, some with mini-illustrations. The irregular layout breaks expectations.

```
Grid:       grid grid-cols-2 md:grid-cols-3 gap-4
Featured:   col-span-2, larger text, accent background
Standard:   col-span-1, surface background
Effect:     Each card reveals on scroll with stagger
Hover:      Subtle scale(1.02) + shadow increase
```

### Sticky Scroll Section
Content on one side stays fixed while the other side scrolls through steps/features. Creates a guided narrative.

```
Layout:     grid grid-cols-1 lg:grid-cols-2
Left:       lg:sticky lg:top-24 lg:self-start (the fixed visual)
Right:      Space for scrollable content cards/steps
```

Each step on the right triggers a change in the visual on the left (image swap, animation state, highlighted feature).

## Canvas Frame-Sequence Scroll Scrubbing

The highest-impact scroll-stop technique. Extract video frames as JPEGs, preload them, and draw to a `<canvas>` based on scroll position. This is Apple's technique — frame-perfect, buttery smooth, no codec jank. Browser video decoders are optimized for sequential playback and produce choppy results when seeking on every scroll event. Canvas frame sequences eliminate this entirely.

### When to use
- Scroll-linked video reveals (product explodes, unfolds, rotates)
- Any section where a video should advance frame-by-frame with scroll position
- Hero or mid-page cinematic moments that need to feel premium

### Step 1: Extract frames with FFmpeg

Probe the video first to get duration and native frame count:
```bash
ffprobe -v error -select_streams v:0 \
  -show_entries stream=duration,r_frame_rate,nb_frames,width,height \
  -of csv=p=0 input.mp4
```

Extract frames — target ~120 frames for a good balance of smoothness vs. file size:
```bash
mkdir -p public/assets/frames/{name}
ffmpeg -i input.mp4 \
  -vf "scale=1280:-2" \
  -q:v 3 -start_number 0 \
  public/assets/frames/{name}/frame-%04d.jpg
```

Key flags:
- `scale=1280:-2` — caps width at 1280px (saves memory, imperceptible through overlays)
- `-q:v 3` — high quality JPEG, ~40-60KB per frame (~5-7MB total for 120 frames)
- `-start_number 0` — zero-indexed for clean array mapping
- If native frame count is close to target (~120), extract at native fps (omit the `fps=` filter)
- If video is longer, use `-vf "fps={target_frames/duration},scale=1280:-2"`

### Step 2: Component architecture

```jsx
const FRAME_COUNT = 121; // adjust after extraction
const FRAME_PATH = '/assets/frames/{name}/frame-';
function getFrameSrc(i) {
  return `${FRAME_PATH}${String(i).padStart(4, '0')}.jpg`;
}
```

**Refs and state:**
```jsx
const canvasRef = useRef(null);
const framesRef = useRef([]);          // Array of preloaded Image objects
const currentFrameRef = useRef(-1);    // Deduplication — skip drawImage if same frame
const [framesReady, setFramesReady] = useState(false);
```

**Frame preloading effect** (mount only, skip on mobile):
```jsx
useEffect(() => {
  if (isMobile) return;
  let loaded = 0;
  const frames = new Array(FRAME_COUNT);
  for (let i = 0; i < FRAME_COUNT; i++) {
    const img = new Image();
    img.src = getFrameSrc(i);
    const onDone = () => {
      loaded++;
      if (loaded === FRAME_COUNT) setFramesReady(true);
    };
    img.onload = onDone;
    img.onerror = onDone; // count errors too — don't get stuck
    frames[i] = img;
  }
  framesRef.current = frames;
}, [isMobile]);
```

**Cover-fit drawFrame helper** (retina-aware):
```jsx
function drawFrame(canvas, img) {
  if (!canvas || !img || !img.naturalWidth) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const cw = canvas.clientWidth * dpr;
  const ch = canvas.clientHeight * dpr;
  if (canvas.width !== cw || canvas.height !== ch) {
    canvas.width = cw;
    canvas.height = ch;
  }
  // Cover-fit: crop source to match canvas aspect ratio
  const imgAspect = img.naturalWidth / img.naturalHeight;
  const canvasAspect = cw / ch;
  let sx, sy, sw, sh;
  if (imgAspect > canvasAspect) {
    sh = img.naturalHeight; sw = sh * canvasAspect;
    sx = (img.naturalWidth - sw) / 2; sy = 0;
  } else {
    sw = img.naturalWidth; sh = sw / canvasAspect;
    sx = 0; sy = (img.naturalHeight - sh) / 2;
  }
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
}
```

### Step 3: Scroll-linked rendering

Inside a `useEffect` with a scroll listener + RAF throttle:
```jsx
const applyProgress = () => {
  const rect = section.getBoundingClientRect();
  const scrollRange = rect.height - window.innerHeight;
  if (scrollRange <= 0) return;
  const progress = clamp(-rect.top / scrollRange, 0, 1);

  if (framesReady) {
    const frameIndex = Math.min(Math.floor(progress * FRAME_COUNT), FRAME_COUNT - 1);
    if (frameIndex !== currentFrameRef.current && framesRef.current[frameIndex]) {
      currentFrameRef.current = frameIndex;
      drawFrame(canvasRef.current, framesRef.current[frameIndex]);
    }
  }
};

// RAF-throttled scroll listener
let rafId = null;
const onScroll = () => {
  if (rafId) return;
  rafId = requestAnimationFrame(() => { rafId = null; applyProgress(); });
};
window.addEventListener('scroll', onScroll, { passive: true });
```

### Step 4: Replay mode (autoplay at 30fps)

For a "replay" button that plays the animation without scrolling:
```jsx
if (isReplaying) {
  const totalDuration = FRAME_COUNT / 30 * 1000; // ms
  let startTime = null;
  let animId = null;
  const animate = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = clamp((timestamp - startTime) / totalDuration, 0, 1);
    const frameIndex = Math.min(Math.floor(progress * FRAME_COUNT), FRAME_COUNT - 1);
    if (frameIndex !== currentFrameRef.current && framesRef.current[frameIndex]) {
      currentFrameRef.current = frameIndex;
      drawFrame(canvasRef.current, framesRef.current[frameIndex]);
    }
    if (progress < 1) animId = requestAnimationFrame(animate);
    else { setIsReplaying(false); setShowReplay(true); }
  };
  animId = requestAnimationFrame(animate);
  return () => { if (animId) cancelAnimationFrame(animId); };
}
```

### Step 5: Canvas JSX (replaces `<video>`)

```jsx
<canvas
  ref={canvasRef}
  aria-hidden="true"
  style={{
    position: 'absolute', inset: 0,
    width: '100%', height: '100%',
    filter: 'brightness(0.85) contrast(1.1)',
  }}
/>
```

### Edge cases to handle

- **Poster while loading:** Draw a static poster image on the canvas immediately so it's not blank while frames preload
- **Frame deduplication:** Only call `drawImage` when `frameIndex !== currentFrameRef.current` — prevents redundant paints during slow scrolls
- **Window resize:** Add a resize listener that resets `canvas.width = 0` and redraws the current frame to recalculate dimensions
- **Mobile fallback:** Skip all frame preloading and canvas rendering on mobile — show a static image instead (saves ~5-7MB of downloads)
- **Error tolerance:** Count `onerror` the same as `onload` to avoid stuck loading states from broken frames
- **Scroll back up:** Progress decreases naturally → lower frame index → canvas draws earlier frame. No special handling needed.

### Performance characteristics

- ~5-7MB total for 120 frames at 1280px width, q:v 3
- Frames are browser-cached after first load — subsequent visits are instant
- 60fps during scroll (only one `drawImage` per unique frame index per RAF tick)
- Zero layout thrashing — only `transform` and `opacity` on text overlays
- Mobile users download 0 frames (static image fallback)

### Section structure pattern

Pair with a 200vh container + sticky viewport for the "pinned while scrolling" feel:
```jsx
<section ref={sectionRef}>
  <div style={{ height: '200vh' }}>
    <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
      <canvas ref={canvasRef} ... />
      {/* overlays: teal tint, vignette, text */}
    </div>
  </div>
</section>
```

Text choreography maps to scroll progress ranges (e.g., text1 at 20-35%, text2 at 55-70%) with `transition: none` for frame-exact positioning during scroll, and `transition: 0.3s ease` during replay autoplay.

## Micro-Interactions

These are small — they don't stop scrolling, but they make the site feel alive:

**Button hover**: `hover:scale-105 active:scale-95 transition-transform duration-150`
**Card hover**: `hover:-translate-y-1 hover:shadow-lg transition-all duration-200`
**Link underline**: Animated underline that grows from left on hover using `after:` pseudo-element
**Icon bounce**: Small bounce animation on hover for action icons
**Input focus**: Ring appears with a subtle scale from the center

```css
/* Animated underline for links */
.link-underline {
  position: relative;
}
.link-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-accent);
  transition: width 0.3s ease;
}
.link-underline:hover::after {
  width: 100%;
}
```

## CSS Animation Toolkit

### Fade + Rise (workhorse entrance)
```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-up {
  animation: fadeUp 0.7s ease-out forwards;
}
```

### Scale In (for modals, popovers, featured elements)
```css
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
```

### Slide In from Side (for sidebar content, drawer menus)
```css
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(32px); }
  to { opacity: 1; transform: translateX(0); }
}
```

### Gradient Shimmer (loading states, attention pulse)
```css
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
.animate-shimmer {
  background: linear-gradient(90deg, transparent 25%, var(--color-accent)/20 50%, transparent 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}
```

### Float (subtle idle animation for hero images)
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}
.animate-float {
  animation: float 6s ease-in-out infinite;
}
```

## Performance Rules

1. **Prefer CSS animations over JS** — they run on the compositor thread (GPU).
2. **Only animate `transform` and `opacity`** — these don't trigger layout/paint. Never animate `width`, `height`, `top`, `left`, `margin`, or `padding`.
3. **Use `will-change: transform`** on elements about to animate (add it right before animation starts, remove after).
4. **Intersection Observer over scroll listeners** — far more performant, doesn't fire on every pixel.
5. **`prefers-reduced-motion` media query** — respect user preferences:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
6. **Lazy load below-fold images** — `loading="lazy"` attribute or Intersection Observer.
7. **Keep hero LCP under 2.5 seconds.** Background videos add ~1.2s. Use poster images.

## Anti-Patterns

- Auto-rotating carousels (< 1% CTR, trigger banner blindness)
- Animations on every single element (nothing stands out when everything moves)
- Animation duration over 1 second for entrances (feels sluggish)
- Parallax on mobile (janky on most devices, skip it)
- Scroll-jacking (stealing control of scroll behavior — always disorienting)
- Animations that replay every time an element scrolls in/out (animate once, use `unobserve`)
- Loading animations that block content (show skeleton/placeholder, not spinner)
