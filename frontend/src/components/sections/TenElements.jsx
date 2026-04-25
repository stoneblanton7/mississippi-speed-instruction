import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import iconAcceleration from '../../assets/skill-icon-acceleration.png';
import iconBalance from '../../assets/skill-icon-balance-body-control.png';
import iconCOD from '../../assets/skill-icon-change-of-direction.png';
import iconCore from '../../assets/skill-icon-core-strength.png';
import iconFlexibility from '../../assets/skill-icon-flexibility.png';
import iconFootQuickness from '../../assets/skill-icon-foot-quickness.png';
import iconJumping from '../../assets/skill-icon-jumping.png';
import iconLateralSpeed from '../../assets/skill-icon-lateral-speed.png';
import iconTopSpeed from '../../assets/skill-icon-top-speed.png';
import iconVisualAcuity from '../../assets/skill-icon-visual-acuity.png';

const ELEMENTS = [
  { slug: 'acceleration',         name: 'ACCELERATION',         outcome: 'The first three steps that separate starters from spectators.', icon: iconAcceleration },
  { slug: 'balance-body-control', name: 'BALANCE & CONTROL',    outcome: 'Stability under load. Play the game, not the ground.',          icon: iconBalance },
  { slug: 'change-of-direction',  name: 'CHANGE OF DIRECTION',  outcome: 'Stop-and-go that breaks defenders and creates daylight.',       icon: iconCOD },
  { slug: 'core-strength',        name: 'CORE STRENGTH',        outcome: 'The engine room. Transfer power from ground to field.',         icon: iconCore },
  { slug: 'flexibility',          name: 'FLEXIBILITY',          outcome: 'Range of motion that prevents injury and extends stride.',      icon: iconFlexibility },
  { slug: 'foot-quickness',       name: 'FOOT QUICKNESS',       outcome: 'Feet that get there first and stay there longer.',              icon: iconFootQuickness },
  { slug: 'jumping',              name: 'JUMPING',              outcome: 'Explosive power for headers, rebounds, and catches.',           icon: iconJumping },
  { slug: 'lateral-speed',        name: 'LATERAL SPEED',        outcome: 'Sideways quickness that defines great defenders.',              icon: iconLateralSpeed },
  { slug: 'top-speed',            name: 'TOP SPEED',            outcome: 'The velocity that leaves everyone else chasing.',               icon: iconTopSpeed },
  { slug: 'visual-acuity',        name: 'VISUAL ACUITY',        outcome: 'Eyes that read the game a half-second before everyone else.',  icon: iconVisualAcuity },
];

const RADIUS = 240;
const ICON_SIZE = 80;
const RING_PADDING = 60;
const RADIUS_MOBILE = 130;
const ICON_SIZE_MOBILE = 56;

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
            Ten Elements. One <span className="text-accent">Athlete.</span>
          </h2>
          <p className="font-body text-text-muted text-lg lg:text-xl mt-6 leading-relaxed max-w-2xl">
            Every drill, every session, every camp comes back to these ten
            foundations of speed. Hover to explore, click to dive in.
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
                    aria-label={`${el.name} — ${el.outcome}`}
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
                      className="w-10 h-10 md:w-12 md:h-12 object-contain"
                    />
                  </button>
                );
              })}
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 md:w-64 md:h-64 rounded-full bg-bg border border-border flex flex-col items-center justify-center text-center px-6 pointer-events-none">
              {hovered ? (
                <div>
                  <p className="font-mono text-[10px] md:text-xs text-accent uppercase tracking-[0.4em] mb-3">
                    Element
                  </p>
                  <p className="font-heading text-text uppercase text-lg md:text-2xl leading-[1.0] mb-3">
                    {hovered.name}
                  </p>
                  <p className="font-body text-text-muted text-xs md:text-sm leading-snug">
                    {hovered.outcome}
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
