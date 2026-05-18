import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import SpeedCampFinal from '../../../components/sections/SpeedCampFinal.jsx';
import { EPISODES, EPISODES_BY_SLUG } from '../../../api/data/episodes.js';

function cleanTranscript(raw) {
  const lines = raw.split('\n').filter((line) => !/^\s*\d+:\d+\s*$/.test(line));
  return lines.join(' ').replace(/\s+/g, ' ').trim();
}

function paragraphize(text, wordsPerPara = 140) {
  const sentences = text.match(/[^.!?]+[.!?]+\s*/g) || [text];
  const paragraphs = [];
  let current = '';
  let wordCount = 0;
  for (const sentence of sentences) {
    current += sentence;
    wordCount += sentence.trim().split(/\s+/).length;
    if (wordCount >= wordsPerPara) {
      paragraphs.push(current.trim());
      current = '';
      wordCount = 0;
    }
  }
  if (current.trim()) paragraphs.push(current.trim());
  return paragraphs;
}

function useTranscript(path, enabled) {
  const [paragraphs, setParagraphs] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!enabled || paragraphs) return;
    let cancelled = false;
    fetch(path)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((raw) => {
        if (cancelled) return;
        setParagraphs(paragraphize(cleanTranscript(raw)));
      })
      .catch(() => {
        if (cancelled) return;
        setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [path, enabled, paragraphs]);

  return { paragraphs, error };
}

export default function EpisodeDetail() {
  const { slug } = useParams();
  const episode = EPISODES_BY_SLUG[slug];
  const [transcriptOpen, setTranscriptOpen] = useState(false);
  const { paragraphs, error } = useTranscript(
    episode?.transcriptPath,
    transcriptOpen,
  );

  if (!episode) {
    return <Navigate to="/podcast" replace />;
  }

  const publishedSorted = [...EPISODES].sort((a, b) => a.number - b.number);
  const idx = publishedSorted.findIndex((ep) => ep.slug === slug);
  const prev = idx > 0 ? publishedSorted[idx - 1] : null;
  const next = idx < publishedSorted.length - 1 ? publishedSorted[idx + 1] : null;

  const epNumber = String(episode.number).padStart(2, '0');

  return (
    <>
      <section className="relative bg-bg pt-32 pb-12 lg:pt-44 lg:pb-16 border-b border-border overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-25 gradient-final-glow"
        />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
          <Link
            to="/podcast"
            className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-accent uppercase tracking-widest transition-colors mb-10"
          >
            <ArrowLeft size={14} strokeWidth={2.5} />
            All Episodes
          </Link>
          <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
            Episode {epNumber} · {episode.publishedAt}
          </p>
          <h1
            className="font-heading uppercase mt-6 leading-[1.0]"
            style={{ fontSize: 'clamp(44px, 8vw, 120px)' }}
          >
            {episode.shortTitle}
          </h1>
          <p className="font-body text-text-muted text-lg lg:text-xl mt-8 leading-relaxed">
            {episode.hook}
          </p>
        </div>
      </section>

      <section className="bg-bg py-12 lg:py-16 border-b border-border">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="aspect-video bg-surface border border-border overflow-hidden rounded-sm">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${episode.youtubeId}`}
              title={episode.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="bg-bg py-16 lg:py-24 border-b border-border">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
              About this episode
            </p>
            <h2 className="font-heading text-3xl lg:text-4xl uppercase mt-4 leading-[1.0]">
              {episode.title}
            </h2>
            <p className="font-body text-text-muted text-lg mt-8 leading-relaxed">
              {episode.description}
            </p>
          </div>
          <div className="lg:col-span-1">
            <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
              {episode.guestDetails.length > 1 ? 'Guests' : 'Guest'}
            </p>
            <ul className="mt-6 space-y-6">
              {episode.guestDetails.map((g) => (
                <li
                  key={g.name}
                  className="border-l-2 border-accent pl-5 py-1"
                >
                  <p className="font-heading text-xl uppercase leading-tight">
                    {g.name}
                  </p>
                  <p className="font-body text-text-muted text-sm mt-2 leading-relaxed">
                    {g.role}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 lg:py-24 border-b border-border">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <button
            type="button"
            onClick={() => setTranscriptOpen((v) => !v)}
            aria-expanded={transcriptOpen}
            className="group w-full flex items-center justify-between gap-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            <div>
              <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
                Transcript
              </p>
              <h2 className="font-heading text-3xl lg:text-4xl uppercase mt-3 leading-[1.0] group-hover:text-accent transition-colors">
                {transcriptOpen ? 'Hide transcript' : 'Read the full transcript'}
              </h2>
            </div>
            <ChevronDown
              size={28}
              strokeWidth={2}
              className={
                'shrink-0 transition-transform duration-300 ' +
                (transcriptOpen ? 'rotate-180 text-accent' : 'text-text-muted')
              }
            />
          </button>

          {transcriptOpen && (
            <div className="mt-10 space-y-6 font-body text-text-muted text-base lg:text-lg leading-relaxed">
              {!paragraphs && !error && (
                <p className="text-text-muted italic">Loading transcript…</p>
              )}
              {error && (
                <p className="text-text-muted italic">
                  Transcript couldn't load. Try refreshing.
                </p>
              )}
              {paragraphs &&
                paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          )}
        </div>
      </section>

      {(prev || next) && (
        <section className="bg-bg py-12 border-b border-border">
          <div className="mx-auto max-w-5xl px-6 lg:px-10 grid sm:grid-cols-2 gap-6">
            {prev ? (
              <Link
                to={`/podcast/${prev.slug}`}
                className="group flex items-center gap-4 p-6 bg-surface border border-border hover:border-text transition-colors"
              >
                <ArrowLeft size={20} strokeWidth={2.5} />
                <div>
                  <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                    Previous · Episode {String(prev.number).padStart(2, '0')}
                  </p>
                  <p className="font-heading text-xl uppercase mt-1">{prev.shortTitle}</p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                to={`/podcast/${next.slug}`}
                className="group flex items-center justify-end gap-4 p-6 bg-surface border border-border hover:border-text transition-colors text-right"
              >
                <div>
                  <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                    Next · Episode {String(next.number).padStart(2, '0')}
                  </p>
                  <p className="font-heading text-xl uppercase mt-1">{next.shortTitle}</p>
                </div>
                <ArrowRight size={20} strokeWidth={2.5} />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </section>
      )}

      <SpeedCampFinal />
    </>
  );
}
