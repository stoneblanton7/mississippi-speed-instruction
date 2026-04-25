import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ELEMENTS } from '../../api/data/elements.js';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

function StaticGrid() {
  return (
    <section className="bg-bg py-24 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl mb-14">
          <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
            The Methodology
          </p>
          <h2 className="font-heading text-5xl lg:text-7xl uppercase mt-4 leading-[1.0]">
            Ten Elements
            <br />
            of Speed
          </h2>
          <p className="font-body text-text-muted text-lg mt-6">
            Every drill at MSI maps to one of ten measurable elements. Master them and
            athletes get faster on the field, in the paint, on the line.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
          {ELEMENTS.map((el, i) => (
            <Link
              key={el.slug}
              to={`/elements/${el.slug}`}
              className="group bg-bg p-8 hover:bg-surface transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-text-dim">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <img src={el.icon} alt="" className="h-14 w-14 object-contain" />
              </div>
              <h3 className="font-heading text-3xl uppercase mt-6">
                {el.name}
              </h3>
              <p className="font-body text-text-muted mt-3">{el.outcome}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function TenElements() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const indexValue = useTransform(scrollYProgress, [0, 1], [0, ELEMENTS.length - 1]);
  const [activeIdx, setActiveIdx] = useState(0);

  useMotionValueEvent(indexValue, 'change', (v) => {
    const next = Math.min(ELEMENTS.length - 1, Math.max(0, Math.round(v)));
    setActiveIdx(next);
  });

  if (reduced) return <StaticGrid />;

  const active = ELEMENTS[activeIdx];

  return (
    <section
      ref={ref}
      className="relative bg-bg border-t border-border"
      style={{ height: '600vh' }}
      aria-label="Ten Elements of Speed"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <div className="flex-1 mx-auto w-full max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
              The Methodology
            </p>
            <h2 className="font-heading text-5xl lg:text-7xl uppercase mt-4 leading-[1.0]">
              Ten Elements
              <br />
              of Speed
            </h2>
            <p className="font-body text-text-muted text-lg mt-6 max-w-md">
              Every drill at MSI maps to one of ten measurable elements. Scroll to meet them.
            </p>

            <ol className="mt-10 grid grid-cols-2 gap-x-6 gap-y-2 max-w-md font-mono text-xs uppercase tracking-widest">
              {ELEMENTS.map((el, i) => (
                <li
                  key={el.slug}
                  className={
                    'flex items-center gap-2 py-1 transition-colors ' +
                    (i === activeIdx ? 'text-accent' : 'text-text-dim')
                  }
                >
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <span>{el.name}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-7 relative h-[60vh] lg:h-[70vh]">
            {ELEMENTS.map((el, i) => (
              <motion.div
                key={el.slug}
                aria-hidden={i !== activeIdx}
                animate={{
                  opacity: i === activeIdx ? 1 : 0,
                  y: i === activeIdx ? 0 : 24,
                }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <p className="font-mono text-sm text-text-dim uppercase tracking-widest">
                  Element {String(i + 1).padStart(2, '0')} / 10
                </p>
                <div className="mt-6 flex items-start gap-6">
                  <img
                    src={el.icon}
                    alt=""
                    className="h-24 w-24 lg:h-32 lg:w-32 object-contain shrink-0"
                  />
                  <h3
                    className="font-heading uppercase leading-[1.0]"
                    style={{ fontSize: 'clamp(56px, 7vw, 120px)' }}
                  >
                    {el.name}
                  </h3>
                </div>
                <p className="font-body text-text-muted text-xl lg:text-2xl mt-8 max-w-xl leading-relaxed">
                  {el.outcome}
                </p>
                <Link
                  to={`/elements/${el.slug}`}
                  className="mt-10 inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-widest text-accent hover:text-accent-hover transition-colors w-fit"
                >
                  See the drill
                  <ArrowRight size={16} strokeWidth={2.5} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="border-t border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 py-3 flex items-center gap-4">
            <span className="font-mono text-xs text-text-dim">SCROLL</span>
            <div className="flex-1 h-px bg-border-strong relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent"
                style={{ width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
              />
            </div>
            <span className="font-mono text-xs text-accent">
              {String(activeIdx + 1).padStart(2, '0')} / 10
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
