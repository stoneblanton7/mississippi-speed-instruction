import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';
import VideoModal from '../../../components/ui/VideoModal.jsx';
import SpeedCampFinal from '../../../components/sections/SpeedCampFinal.jsx';
import { ELEMENTS, ELEMENTS_BY_SLUG, SPORTS } from '../../../api/data/elements.js';
import { useVimeoThumbnail } from '../../../hooks/useVimeoThumbnail.js';

const RELATED_DRILLS = {
  acceleration: [
    { title: 'Coach Epsy Acceleration Drill', vimeo_id: '1054590195' },
    { title: 'Coach NS Tether Drill', vimeo_id: '1065590680' },
  ],
  'top-speed': [{ title: 'Coach PS Wall Drill', vimeo_id: '1065590471' }],
  'change-of-direction': [
    { title: 'Coach SB Change of Direction', vimeo_id: '1065590323' },
  ],
  'foot-quickness': [
    { title: 'Ladder Drills — 1 & 2 Foot Runs', vimeo_id: '1065590864' },
  ],
  'visual-acuity': [{ title: 'Coach M4 Ball Drop Drill', vimeo_id: '1065591042' }],
};

function importanceLabel(level, sportLabel) {
  if (level >= 5) return `Critical for ${sportLabel.toLowerCase()} — every play depends on it.`;
  if (level === 4) return `Core skill for ${sportLabel.toLowerCase()} — coaches recruit for this.`;
  if (level === 3) return `Useful in ${sportLabel.toLowerCase()} — separates depth from starters.`;
  if (level === 2) return `Limited role in ${sportLabel.toLowerCase()} — situational.`;
  return `Less central in ${sportLabel.toLowerCase()} — but never wasted.`;
}

function MeterDots({ level }) {
  return (
    <div className="flex gap-1.5" aria-label={`Importance ${level} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={
            'h-2.5 w-2.5 rounded-full ' +
            (i <= level ? 'bg-accent' : 'bg-border-strong')
          }
        />
      ))}
    </div>
  );
}

function VideoTile({ video, onPlay }) {
  const thumbnail = useVimeoThumbnail(video.vimeo_id, video.vimeo_hash);
  return (
    <button
      type="button"
      onClick={() => onPlay(video)}
      aria-label={`Play ${video.title}`}
      className="group relative aspect-video bg-surface border border-border overflow-hidden text-left flex"
    >
      {thumbnail && (
        <img
          src={thumbnail}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-55 group-hover:opacity-75 transition-opacity duration-500"
        />
      )}
      <div className="absolute inset-0 pointer-events-none gradient-card-bottom" />
      <div className="relative z-10 flex flex-col justify-end p-5 w-full">
        <div className="flex items-end justify-between gap-3">
          <h3 className="font-heading text-lg uppercase leading-tight">{video.title}</h3>
          <span
            aria-hidden="true"
            className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-border-strong bg-overlay-bottom shrink-0 group-hover:bg-text group-hover:text-text-inverted transition-colors"
          >
            <Play size={12} strokeWidth={2.5} className="ml-0.5" />
          </span>
        </div>
      </div>
    </button>
  );
}

export default function ElementDetail() {
  const { slug } = useParams();
  const element = ELEMENTS_BY_SLUG[slug];
  const [open, setOpen] = useState(null);

  if (!element) {
    return <Navigate to="/elements" replace />;
  }

  const idx = ELEMENTS.findIndex((e) => e.slug === slug);
  const prev = ELEMENTS[(idx - 1 + ELEMENTS.length) % ELEMENTS.length];
  const next = ELEMENTS[(idx + 1) % ELEMENTS.length];
  const drills = RELATED_DRILLS[slug] || [];

  return (
    <>
      <section className="relative bg-bg pt-32 pb-16 lg:pt-44 lg:pb-24 border-b border-border overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-25 gradient-final-glow"
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
            Element {element.number} / 10
          </p>
          <motion.img
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            src={element.icon}
            alt=""
            className="mt-10 mx-auto h-40 lg:h-52 w-auto"
          />
          <h1
            className="font-heading uppercase mt-8 leading-[1.0]"
            style={{ fontSize: 'clamp(72px, 14vw, 220px)' }}
          >
            {element.name}
          </h1>
          <p className="font-body text-text-muted text-xl lg:text-2xl mt-8 max-w-2xl mx-auto leading-snug">
            {element.outcome}
          </p>
        </div>
      </section>

      <section className="bg-bg py-20 lg:py-28 border-b border-border">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
            Definition
          </p>
          <div className="mt-8 space-y-6 font-body text-text-muted text-lg lg:text-xl leading-relaxed">
            {element.definition.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg py-20 lg:py-28 border-b border-border">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
            Importance by Sport
          </p>
          <h2 className="font-heading text-3xl lg:text-5xl uppercase mt-4 leading-[1.0]">
            How it shows up on game day.
          </h2>
          <ul className="mt-12 divide-y divide-border">
            {SPORTS.map((sport) => {
              const level = element.sportImportance[sport.key];
              return (
                <li
                  key={sport.key}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-4 py-6 items-center"
                >
                  <p className="sm:col-span-3 font-heading text-2xl uppercase">{sport.label}</p>
                  <div className="sm:col-span-2">
                    <MeterDots level={level} />
                  </div>
                  <p className="sm:col-span-7 font-body text-text-muted">
                    {importanceLabel(level, sport.label)}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {drills.length > 0 && (
        <section className="bg-surface py-20 lg:py-28 border-b border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
              Watch the Drills
            </p>
            <h2 className="font-heading text-3xl lg:text-5xl uppercase mt-4 leading-[1.0]">
              How MSI coaches teach it.
            </h2>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {drills.map((d) => (
                <VideoTile key={d.vimeo_id} video={d} onPlay={setOpen} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-bg py-12 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid sm:grid-cols-2 gap-6">
          <Link
            to={`/elements/${prev.slug}`}
            className="group flex items-center gap-4 p-6 bg-surface border border-border hover:border-text transition-colors"
          >
            <ArrowLeft size={20} strokeWidth={2.5} />
            <div>
              <p className="font-mono text-[10px] text-text-dim uppercase tracking-widest">
                Prev — {prev.number}
              </p>
              <p className="font-heading text-xl uppercase mt-1">{prev.name}</p>
            </div>
          </Link>
          <Link
            to={`/elements/${next.slug}`}
            className="group flex items-center justify-end gap-4 p-6 bg-surface border border-border hover:border-text transition-colors text-right"
          >
            <div>
              <p className="font-mono text-[10px] text-text-dim uppercase tracking-widest">
                Next — {next.number}
              </p>
              <p className="font-heading text-xl uppercase mt-1">{next.name}</p>
            </div>
            <ArrowRight size={20} strokeWidth={2.5} />
          </Link>
        </div>
      </section>

      <SpeedCampFinal />

      {open && (
        <VideoModal
          vimeoId={open.vimeo_id}
          title={open.title}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}
