import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Play } from 'lucide-react';
import VideoModal from './ui/VideoModal.jsx';
import CoachToggle from './ui/CoachToggle.jsx';
import SpeedCampFinal from './sections/SpeedCampFinal.jsx';
import { useVimeoThumbnail } from '../hooks/useVimeoThumbnail.js';

function VideoTile({ video, index, onPlay }) {
  const thumbnail = useVimeoThumbnail(video.vimeo_id, video.vimeo_hash);
  return (
    <motion.button
      type="button"
      onClick={() => onPlay(video)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: 'easeOut' }}
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
      <div className="relative z-10 flex flex-col justify-between p-5 w-full">
        <span className="font-mono text-[10px] text-text-dim uppercase tracking-widest self-start">
          {video.type}
        </span>
        <div className="flex items-end justify-between gap-3">
          <h3 className="font-heading text-xl uppercase leading-tight">{video.title}</h3>
          <span
            aria-hidden="true"
            className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-border-strong bg-overlay-bottom shrink-0 group-hover:bg-text group-hover:text-text-inverted transition-colors"
          >
            <Play size={14} strokeWidth={2.5} className="ml-0.5" />
          </span>
        </div>
      </div>
    </motion.button>
  );
}

export default function BioPage({
  portrait,
  name,
  role,
  eyebrow,
  bio,
  pullquoteAfter,
  pullquote,
  videos,
  videoSectionTitle,
}) {
  const [open, setOpen] = useState(null);

  return (
    <>
      <section className="relative bg-bg pt-24 lg:pt-28 pb-16 lg:pb-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12">
            <CoachToggle />
          </div>
          <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] bg-surface overflow-hidden border border-border">
              <img
                src={portrait}
                alt={name}
                className="absolute inset-0 h-full w-full object-cover grayscale contrast-[1.05]"
                style={{ objectPosition: 'center top' }}
              />
              <div className="absolute inset-0 pointer-events-none gradient-portrait-bottom" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
              {eyebrow}
            </p>
            <h1
              className="font-heading uppercase mt-4 leading-[1.0]"
              style={{ fontSize: 'clamp(56px, 9vw, 140px)' }}
            >
              {name}
            </h1>
            <p className="font-body text-text text-xl lg:text-2xl mt-6">{role}</p>
          </div>
          </div>
        </div>
      </section>

      <section className="bg-bg py-20 lg:py-28 border-b border-border">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          {bio.map((para, i) => (
            <div key={i}>
              <p
                className={
                  'font-body text-text-muted text-lg lg:text-xl leading-relaxed ' +
                  (i === 0
                    ? 'first-letter:font-heading first-letter:text-7xl lg:first-letter:text-8xl first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:leading-[0.85] first-letter:text-text'
                    : 'mt-8')
                }
              >
                {para}
              </p>
              {pullquote && i === pullquoteAfter && (
                <blockquote className="my-12 lg:my-16 border-l-2 border-accent pl-6 lg:pl-10">
                  <p
                    className="font-heading uppercase leading-[1.0] text-text"
                    style={{ fontSize: 'clamp(28px, 3.5vw, 56px)' }}
                  >
                    {pullquote}
                  </p>
                </blockquote>
              )}
            </div>
          ))}
        </div>
      </section>

      {videos?.length > 0 && (
        <section className="bg-surface py-20 lg:py-28 border-b border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
              {videoSectionTitle}
            </p>
            <h2 className="font-heading text-4xl lg:text-6xl uppercase mt-4 leading-[1.0]">
              The film.
            </h2>
            <p className="font-body text-text-muted text-lg mt-6 max-w-2xl">
              {videos.length} reels — bio and drills. Click any tile to play.
            </p>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((v, i) => (
                <VideoTile key={v.vimeo_id} video={v} index={i} onPlay={setOpen} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-bg py-12 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-widest text-text border border-border-strong rounded-lg px-5 py-3 hover:border-text transition-colors"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
            Back to About
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
