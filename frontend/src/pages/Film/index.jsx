import { useState } from 'react';
import { VIDEOS } from '../../api/data/videos.js';
import { buildVimeoSrc } from '../../config.js';
import { useVimeoThumbnail } from '../../hooks/useVimeoThumbnail.js';

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'coaches', label: 'Coaches' },
  { value: 'elements', label: 'Elements' },
  { value: 'promo', label: 'Promo' },
];

const DEFAULT_VIDEO =
  VIDEOS.find((v) => v.category === 'promo') || VIDEOS[0];

function LibraryTile({ video, active, onSelect }) {
  const thumbnail = useVimeoThumbnail(video.id, video.hash);
  return (
    <button
      type="button"
      onClick={() => onSelect(video)}
      aria-pressed={active}
      className={
        'w-full text-left group transition-opacity ' +
        (active ? 'opacity-100' : 'opacity-75 hover:opacity-100')
      }
    >
      <div
        className={
          'aspect-video bg-surface rounded overflow-hidden mb-2 border-2 transition-colors ' +
          (active
            ? 'border-accent'
            : 'border-transparent group-hover:border-border-strong')
        }
      >
        {thumbnail && (
          <img
            src={thumbnail}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <p
        className={
          'font-body text-sm font-semibold leading-tight ' +
          (active ? 'text-accent' : 'text-text')
        }
      >
        {video.title}
      </p>
      <p className="font-mono text-[10px] text-text-dim uppercase tracking-widest mt-1">
        {video.category}
      </p>
    </button>
  );
}

export default function Film() {
  const [selected, setSelected] = useState(DEFAULT_VIDEO);
  const [filter, setFilter] = useState('all');

  const filtered =
    filter === 'all' ? VIDEOS : VIDEOS.filter((v) => v.category === filter);

  const playerSrc = buildVimeoSrc(
    selected.id,
    { autoplay: 0 },
    selected.hash,
  );

  return (
    <>
      <section className="relative bg-bg pt-32 pb-12 lg:pt-44 lg:pb-16 border-b border-border overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-25 gradient-final-glow"
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
            The Film Room
          </p>
          <h1
            className="font-heading uppercase mt-6 leading-[1.0]"
            style={{ fontSize: 'clamp(48px, 9vw, 144px)' }}
          >
            Every drill.
            <br />
            Every element.
          </h1>
          <p className="font-body text-text-muted text-lg lg:text-xl mt-8 max-w-2xl leading-relaxed">
            Watch how MSI builds speed. Pick a video below.
          </p>
        </div>
      </section>

      <section className="bg-bg py-16 lg:py-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="aspect-video bg-surface border border-border rounded overflow-hidden mb-6">
                <iframe
                  key={selected.id}
                  src={playerSrc}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={selected.title}
                />
              </div>
              <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
                {selected.coach}
              </p>
              <h2 className="font-heading text-3xl lg:text-4xl uppercase leading-[1.0] mt-3">
                {selected.title}
              </h2>
            </div>

            <div className="lg:col-span-1">
              <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
                Library
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {FILTERS.map((f) => {
                  const active = filter === f.value;
                  return (
                    <button
                      key={f.value}
                      type="button"
                      onClick={() => setFilter(f.value)}
                      aria-pressed={active}
                      className={
                        'font-body text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full transition-colors ' +
                        (active
                          ? 'bg-accent text-text-inverted'
                          : 'bg-surface text-text-muted hover:text-text border border-border')
                      }
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 lg:max-h-[600px] lg:overflow-y-auto space-y-4 lg:pr-2">
                {filtered.map((v) => (
                  <LibraryTile
                    key={v.id}
                    video={v}
                    active={selected.id === v.id}
                    onSelect={setSelected}
                  />
                ))}
                {filtered.length === 0 && (
                  <p className="font-body text-text-muted text-sm">
                    No videos in this category yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
