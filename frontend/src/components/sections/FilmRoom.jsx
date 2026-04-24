import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import VideoModal from '../ui/VideoModal.jsx';
import { VIMEO } from '../../config.js';

const REELS = [
  {
    id: VIMEO.homeFeatured[0],
    title: 'Acceleration drill',
    coach: 'Coach Epsy',
    duration: '1:18',
  },
  {
    id: VIMEO.homeFeatured[1],
    title: 'Tether resistance',
    coach: 'Coach NS',
    duration: '0:48',
  },
  {
    id: VIMEO.homeFeatured[2],
    title: 'Wall drill',
    coach: 'Coach PS',
    duration: '0:51',
  },
];

function ReelCard({ reel, onPlay, index }) {
  return (
    <motion.button
      type="button"
      onClick={() => onPlay(reel)}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      aria-label={`Play ${reel.title}, ${reel.duration}`}
      className="group relative aspect-[4/5] bg-surface border border-border overflow-hidden text-left flex flex-col"
    >
      <img
        src={`https://vumbnail.com/${reel.id}.jpg`}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-50 group-hover:opacity-65 transition-opacity duration-500"
      />
      <div className="absolute inset-0 pointer-events-none gradient-card-bottom" />

      <div className="relative z-10 flex-1 flex items-start justify-between p-6">
        <span className="font-mono text-xs text-text-dim">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="font-mono text-xs text-text-dim">{reel.duration}</span>
      </div>

      <div className="relative z-10 p-6 flex flex-col gap-3">
        <span
          aria-hidden="true"
          className="inline-flex items-center justify-center h-12 w-12 rounded-full border border-border-strong bg-overlay-bottom group-hover:bg-text group-hover:text-text-inverted transition-colors"
        >
          <Play size={18} strokeWidth={2.5} className="ml-0.5" />
        </span>
        <p className="font-mono text-[10px] text-text-dim uppercase tracking-widest">
          {reel.coach}
        </p>
        <h3 className="font-heading text-3xl uppercase leading-tight">{reel.title}</h3>
      </div>
    </motion.button>
  );
}

export default function FilmRoom() {
  const [open, setOpen] = useState(null);

  return (
    <section className="bg-bg py-24 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 lg:mb-16">
          <div className="max-w-xl">
            <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
              The Film Room
            </p>
            <h2 className="font-heading text-5xl lg:text-7xl uppercase mt-4 leading-[0.9]">
              Drills.
              <br />
              On the field.
            </h2>
          </div>
          <p className="font-body text-text-muted text-lg max-w-md">
            Three reels from the MSI vault. The full library lives on the about pages —
            drills broken down by element and coach.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REELS.map((reel, i) => (
            <ReelCard key={reel.id} reel={reel} index={i} onPlay={setOpen} />
          ))}
        </div>

        <div className="mt-12">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-widest text-text hover:text-accent transition-colors"
          >
            View all 25+ videos
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>
      </div>

      {open && (
        <VideoModal
          vimeoId={open.id}
          title={open.title}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  );
}
