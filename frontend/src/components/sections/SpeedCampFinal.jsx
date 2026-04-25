import { motion } from 'motion/react';
import Button from '../ui/Button.jsx';
import { CAMPS, REGISTER_LINK_PROPS } from '../../config.js';

export default function SpeedCampFinal() {
  return (
    <section className="relative overflow-hidden bg-bg border-t border-border">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-30 gradient-final-glow"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none gradient-section-mask"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-32 lg:py-48">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
            Summer 2026 · Madison Ridgeland Academy
          </p>
          <h2
            className="font-heading uppercase mt-6 leading-[1.0]"
            style={{ fontSize: 'clamp(80px, 16vw, 240px)' }}
          >
            Speed
            <br />
            Camp.
          </h2>
          <p className="font-body text-text-muted text-lg lg:text-xl mt-12 max-w-2xl mx-auto">
            Three days. Ten elements. One faster athlete. Pick the camp that matches your
            athlete and lock the spot.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
            <Button as="a" {...REGISTER_LINK_PROPS} variant="primary" size="lg" arrow>
              Register Boys Camp
            </Button>
            <Button as="a" {...REGISTER_LINK_PROPS} variant="primary" size="lg" arrow>
              Register Girls Camp
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto pt-10 border-t border-border">
            <div className="text-left sm:text-center">
              <p className="font-mono text-[10px] text-text-dim uppercase tracking-widest">
                Boys Camp
              </p>
              <p className="font-heading text-2xl uppercase mt-2">{CAMPS.boys.dates}</p>
              <p className="font-body text-sm text-text-muted mt-1">
                {CAMPS.boys.time} · Ages {CAMPS.boys.ageRange} · ${CAMPS.boys.cost}
              </p>
            </div>
            <div className="text-left sm:text-center">
              <p className="font-mono text-[10px] text-text-dim uppercase tracking-widest">
                Girls Camp
              </p>
              <p className="font-heading text-2xl uppercase mt-2">{CAMPS.girls.dates}</p>
              <p className="font-body text-sm text-text-muted mt-1">
                {CAMPS.girls.time} · Ages {CAMPS.girls.ageRange} · ${CAMPS.girls.cost}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
