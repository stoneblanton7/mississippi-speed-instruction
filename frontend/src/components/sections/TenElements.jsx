import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ELEMENTS } from '../../api/data/elements.js';

// Home-ring display helpers: prefer the punchy home copy, fall back to canonical.
const ringName = (el) => el.homeName || el.name.toUpperCase();
const ringOutcome = (el) => el.homeOutcome || el.outcome;

const RADIUS = 320;
const ICON_SIZE = 110;
const RING_PADDING = 80;
const RADIUS_MOBILE = 150;
const ICON_SIZE_MOBILE = 64;

const toRadians = (degrees) => (Math.PI / 180) * degrees;

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia('(min-width: 768px)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (e) => setIsDesktop(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return isDesktop;
}

export default function TenElements() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();

  const radius = isDesktop ? RADIUS : RADIUS_MOBILE;
  const iconSize = isDesktop ? ICON_SIZE : ICON_SIZE_MOBILE;
  const ringSize = radius * 2 + iconSize + RING_PADDING;

  const isPaused = hoveredIndex !== null;
  const hovered = isPaused ? ELEMENTS[hoveredIndex] : null;

  return (
    <section className="bg-bg py-24 lg:py-32 border-t border-border overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 lg:mb-20 max-w-3xl">
          <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
            The Curriculum
          </p>
          <h2
            className="font-heading text-text uppercase mt-4 leading-[1.0]"
            style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
          >
            Ten Elements. One Athlete.
          </h2>
          <p className="font-body text-text-muted text-lg lg:text-xl mt-6 leading-relaxed max-w-2xl">
            Every drill, every session, every camp comes back to these ten
            foundations of speed. Tap any element to dive in — on desktop, hover to preview each one.
          </p>
        </div>

        <div className="flex justify-center">
          <div
            className="relative"
            style={{ width: ringSize, height: ringSize }}
          >
            <div
              className={
                'absolute inset-0 animate-spin-slow ' +
                (isPaused ? 'paused' : '')
              }
            >
              {ELEMENTS.map((el, i) => {
                const angle = (360 / ELEMENTS.length) * i - 90;
                const isHovered = hoveredIndex === i;

                return (
                  <button
                    key={el.slug}
                    type="button"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onFocus={() => setHoveredIndex(i)}
                    onBlur={() => setHoveredIndex(null)}
                    onClick={() => navigate(`/elements/${el.slug}`)}
                    aria-label={`${ringName(el)} — ${ringOutcome(el)}`}
                    className={
                      'absolute flex items-center justify-center rounded-full bg-surface border-2 transition-[transform,border-color,box-shadow,opacity] duration-300 cursor-pointer animate-spin-reverse focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ' +
                      (isPaused ? 'paused ' : '') +
                      (isHovered
                        ? 'border-accent scale-110 glow-accent'
                        : 'border-border opacity-80 hover:opacity-100')
                    }
                    style={{
                      width: iconSize,
                      height: iconSize,
                      top: `calc(50% - ${iconSize / 2}px + ${
                        radius * Math.sin(toRadians(angle))
                      }px)`,
                      left: `calc(50% - ${iconSize / 2}px + ${
                        radius * Math.cos(toRadians(angle))
                      }px)`,
                    }}
                  >
                    <img
                      src={el.icon}
                      alt=""
                      className="w-14 h-14 md:w-16 md:h-16 object-contain"
                    />
                  </button>
                );
              })}
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 rounded-full bg-bg border border-border flex flex-col items-center justify-center text-center px-6 pointer-events-none">
              {hovered ? (
                <div>
                  <p className="font-mono text-[10px] md:text-xs text-accent uppercase tracking-[0.4em] mb-3">
                    Element
                  </p>
                  <p className="font-heading text-text uppercase text-lg md:text-2xl leading-[1.0] mb-3">
                    {ringName(hovered)}
                  </p>
                  <p className="font-body text-text-muted text-xs md:text-sm leading-snug">
                    {ringOutcome(hovered)}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="font-heading text-accent text-6xl md:text-8xl leading-none">
                    10
                  </p>
                  <p className="font-mono text-text-muted text-xs md:text-sm uppercase tracking-[0.4em] mt-3">
                    Elements
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
