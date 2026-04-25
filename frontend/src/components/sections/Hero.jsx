import { useState } from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import Button from '../ui/Button.jsx';
import VideoModal from '../ui/VideoModal.jsx';
import { VIMEO, REGISTER_LINK_PROPS } from '../../config.js';
import thirtyYears from '../../assets/thirty-years-icon.png';

const HERO_SRC = `https://player.vimeo.com/video/${VIMEO.homeHero}?h=${VIMEO.homeHeroHash}&background=1&autoplay=1&loop=1&muted=1&controls=0&playsinline=1`;

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      className="relative w-full overflow-hidden bg-bg flex flex-col"
      style={{ height: '100dvh', minHeight: '780px' }}
    >
      {/* TOP — text content + ghosted SPEED */}
      <div className="relative flex-shrink-0">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-28 lg:pt-32 pb-2">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-mono text-xs lg:text-sm text-accent uppercase tracking-[0.4em] mb-5"
          >
            Mississippi Speed Instruction · Est. 1993
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            className="font-heading text-text leading-[0.95] uppercase"
            style={{ fontSize: 'clamp(48px, 9vw, 128px)' }}
          >
            Faster Athletes
            <br />
            Start Here.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            className="font-body text-text-muted text-base lg:text-lg max-w-xl mt-6"
          >
            Three days. Ten elements. One faster athlete. Madison Ridgeland Academy, Summer 2026.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.45 }}
            className="mt-6 flex flex-col sm:flex-row gap-3"
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

        {/* Ghosted SPEED — full-width, sits at bottom of top section, slightly overlapping the video below */}
        <div
          aria-hidden="true"
          className="relative pointer-events-none select-none w-full overflow-hidden mt-2 lg:mt-4"
          style={{ marginBottom: '-0.18em' }}
        >
          <span
            className="block font-heading-italic font-semibold italic text-text-ghost leading-[0.85] text-center"
            style={{
              fontSize: 'clamp(140px, 22vw, 360px)',
              letterSpacing: '-0.04em',
            }}
          >
            SPEED
          </span>
        </div>
      </div>

      {/* BOTTOM — Vimeo background, fills remaining viewport */}
      <div className="relative flex-1 overflow-hidden bg-bg border-t border-border">
        <iframe
          src={HERO_SRC}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: 'max(100vw, calc(100vh * 16 / 9))',
            height: 'max(100vh, calc(100vw * 9 / 16))',
          }}
          frameBorder="0"
          allow="autoplay; fullscreen"
          title="MSI hero loop"
          aria-hidden="true"
        />
        {/* Subtle top fade so SPEED bleeds cleanly into the video */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-24 pointer-events-none bg-gradient-to-b from-bg to-transparent"
        />
      </div>

      {/* 30-Year badge — top-right */}
      <img
        src={thirtyYears}
        alt=""
        aria-hidden="true"
        className="absolute top-20 right-6 lg:top-24 lg:right-10 z-30 h-14 lg:h-16 w-auto opacity-70 pointer-events-none"
      />

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
