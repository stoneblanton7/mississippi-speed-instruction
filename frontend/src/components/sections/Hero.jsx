import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import Button from '../ui/Button.jsx';
import {
  VIMEO,
  REGISTER_LINK_PROPS,
  buildVimeoSrc,
} from '../../config.js';
import thirtyYears from '../../assets/thirty-years-icon.png';

const HERO_SRC = buildVimeoSrc(VIMEO.homeHero, {
  background: 1,
  autoplay: 1,
  loop: 1,
  muted: 1,
  controls: 0,
  playsinline: 1,
});

export default function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden bg-bg"
      style={{ height: '100dvh', minHeight: '640px' }}
    >
        {/* Vimeo background — full bleed cover */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <iframe
            src={HERO_SRC}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: 'max(100vw, calc(100vh * 16 / 9))',
              height: 'max(100vh, calc(100vw * 9 / 16))',
            }}
            frameBorder="0"
            allow="autoplay; fullscreen"
            title="MSI hero loop"
            aria-hidden="true"
          />
        </div>

        {/* Dark gradient overlay — readable text */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-overlay-top via-transparent to-overlay-bottom"
        />

        {/* 30-Year badge */}
        <img
          src={thirtyYears}
          alt=""
          aria-hidden="true"
          className="absolute top-20 right-6 lg:top-24 lg:right-10 z-30 h-14 lg:h-16 w-auto opacity-70 pointer-events-none"
        />

        {/* Content — anchored bottom-left */}
        <div className="relative z-20 mx-auto h-full max-w-7xl px-6 lg:px-10 flex flex-col justify-end pb-16 lg:pb-24">
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
            className="font-heading text-text leading-[1.0] uppercase mb-8"
            style={{ fontSize: 'clamp(48px, 9vw, 128px)' }}
          >
            Faster Athletes
            <br />
            Start <span className="text-accent">Here.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            className="font-body text-text-muted text-base lg:text-lg leading-relaxed mb-8 max-w-2xl"
          >
            Three days. Ten elements. One faster athlete. Madison Ridgeland Academy, Summer 2026.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button as="a" {...REGISTER_LINK_PROPS} variant="primary" size="lg" arrow>
              Register for Camp
            </Button>
            <Button as={Link} to="/film" variant="ghost" size="lg">
              <Play size={16} strokeWidth={2.5} />
              Watch the Film
            </Button>
          </motion.div>
        </div>
    </section>
  );
}
