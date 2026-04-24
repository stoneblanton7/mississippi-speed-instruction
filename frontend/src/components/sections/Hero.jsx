import { useState } from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import Button from '../ui/Button.jsx';
import VideoModal from '../ui/VideoModal.jsx';
import { VIMEO, REGISTER_LINK_PROPS } from '../../config.js';
import thirtyYears from '../../assets/thirty-years-icon.png';

const STATS = [
  { value: '30+ YEARS', label: 'Of speed instruction' },
  { value: 'HUNDREDS', label: 'Of MS athletes trained' },
  { value: '8:1', label: 'Athlete-coach ratio' },
  { value: '10', label: 'Elements of speed' },
];

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-bg">
      <iframe
        src={`https://player.vimeo.com/video/${VIMEO.homeHero}?background=1&autoplay=1&loop=1&muted=1&controls=0&playsinline=1`}
        className="absolute inset-0 h-full w-full pointer-events-none"
        style={{
          objectFit: 'cover',
          transform: 'scale(1.25)',
          transformOrigin: 'center',
        }}
        allow="autoplay; fullscreen; picture-in-picture"
        title="MSI hero loop"
        aria-hidden="true"
      />

      <div className="absolute inset-0 pointer-events-none gradient-hero" />

      <span
        aria-hidden="true"
        className="absolute pointer-events-none select-none font-heading-italic font-semibold italic text-text-ghost leading-none whitespace-nowrap"
        style={{
          top: '14%',
          right: '-7vw',
          fontSize: 'clamp(220px, 32vw, 460px)',
          letterSpacing: '-0.04em',
        }}
      >
        SPEED
      </span>

      <img
        src={thirtyYears}
        alt=""
        aria-hidden="true"
        className="absolute top-24 right-6 lg:top-28 lg:right-10 h-16 lg:h-20 w-auto opacity-60"
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="flex-1 mx-auto w-full max-w-7xl px-6 lg:px-10 pt-40 lg:pt-48 pb-16 flex flex-col justify-end">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-mono text-xs lg:text-sm text-accent uppercase tracking-[0.4em] mb-6"
          >
            Mississippi Speed Instruction · Est. 1993
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            className="font-heading text-text leading-[0.85] uppercase"
            style={{ fontSize: 'clamp(60px, 12vw, 180px)' }}
          >
            Faster Athletes
            <br />
            Start Here.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            className="font-body text-text-muted text-lg lg:text-xl max-w-xl mt-8"
          >
            Three days. Ten elements. One faster athlete. Madison Ridgeland Academy, Summer 2026.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.45 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Button as="a" {...REGISTER_LINK_PROPS} variant="primary" size="lg" arrow>
              Register for Camp
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="lg"
              onClick={() => setModalOpen(true)}
            >
              <Play size={16} strokeWidth={2.5} />
              Watch the film
            </Button>
          </motion.div>
        </div>

        <div className="relative border-t border-border bg-overlay-bottom backdrop-blur">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {STATS.map((stat, i) => (
              <div key={stat.label} className={`py-5 ${i === 0 ? '' : 'pl-6'}`}>
                <p className="font-mono text-text text-base lg:text-lg tracking-tight">
                  {stat.value}
                </p>
                <p className="font-body text-text-dim text-[11px] lg:text-xs uppercase tracking-widest mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {modalOpen && (
        <VideoModal
          vimeoId={VIMEO.homeHero}
          title="MSI hero film"
          onClose={() => setModalOpen(false)}
        />
      )}
    </section>
  );
}
