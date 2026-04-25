import { useState } from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import Button from '../ui/Button.jsx';
import VideoModal from '../ui/VideoModal.jsx';
import { VIMEO, REGISTER_LINK_PROPS } from '../../config.js';
import thirtyYears from '../../assets/thirty-years-icon.png';

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden bg-bg">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <iframe
          src={`https://player.vimeo.com/video/${VIMEO.homeHero}?background=1&autoplay=1&loop=1&muted=1&controls=0&playsinline=1`}
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

      <div className="absolute inset-0 pointer-events-none gradient-hero" />

      <span
        aria-hidden="true"
        className="absolute pointer-events-none select-none font-heading-italic font-semibold italic text-text-ghost leading-none whitespace-nowrap"
        style={{
          top: '12%',
          right: '-7vw',
          fontSize: 'clamp(180px, 28vw, 420px)',
          letterSpacing: '-0.04em',
        }}
      >
        SPEED
      </span>

      <img
        src={thirtyYears}
        alt=""
        aria-hidden="true"
        className="absolute top-20 right-6 lg:top-24 lg:right-10 h-14 lg:h-16 w-auto opacity-60"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10 h-full flex flex-col justify-end pb-16 lg:pb-20 pt-28">
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
          className="mt-8 flex flex-wrap gap-3"
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
