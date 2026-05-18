import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import NewsletterSignup from '../../components/sections/NewsletterSignup.jsx';
import { EPISODES } from '../../api/data/episodes.js';

function EpisodeTile({ episode }) {
  const epNumber = String(episode.number).padStart(2, '0');
  return (
    <Link
      to={`/podcast/${episode.slug}`}
      className="group block bg-surface border border-border hover:border-text transition-colors overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="relative aspect-video bg-bg overflow-hidden">
        <img
          src={episode.thumbnail}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-4 right-4 inline-flex items-center justify-center h-12 w-12 rounded-full bg-accent text-text-inverted shadow-lg transition-transform duration-300 group-hover:scale-110"
        >
          <Play size={18} strokeWidth={2.5} className="ml-0.5" fill="currentColor" />
        </span>
      </div>
      <div className="p-6 lg:p-7">
        <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
          Episode {epNumber} · {episode.publishedAt}
        </p>
        <h3 className="font-heading text-2xl lg:text-3xl uppercase mt-4 leading-[1.05]">
          {episode.shortTitle}
        </h3>
        <p className="font-body text-text-muted text-sm mt-3 uppercase tracking-widest font-semibold">
          ft. {episode.guests}
        </p>
        <p className="font-body text-text-muted text-base mt-4 leading-relaxed">
          {episode.hook}
        </p>
        <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-text-muted group-hover:text-accent group-hover:gap-3 transition-all">
          Watch episode
          <ArrowRight size={12} strokeWidth={2.5} />
        </span>
      </div>
    </Link>
  );
}

export default function Podcast() {
  const sorted = [...EPISODES].sort((a, b) => b.number - a.number);

  return (
    <>
      <section className="relative bg-bg pt-32 pb-12 lg:pt-44 lg:pb-16 border-b border-border overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-25 gradient-final-glow"
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
            The MSI Podcast
          </p>
          <h1
            className="font-heading uppercase mt-6 leading-[1.0]"
            style={{ fontSize: 'clamp(48px, 9vw, 144px)' }}
          >
            Get the latest
            <br />
            on MSI.
          </h1>
          <p className="font-body text-text-muted text-lg lg:text-xl mt-8 max-w-2xl leading-relaxed">
            Long-form conversations with coaches, athletes, and the parents
            behind them — straight from the studio in Jackson.
          </p>
        </div>
      </section>

      <section className="bg-bg py-16 lg:py-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-baseline justify-between mb-10">
            <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
              All Episodes
            </p>
            <p className="font-mono text-xs text-text-muted uppercase tracking-widest">
              {sorted.length} {sorted.length === 1 ? 'episode' : 'episodes'}
            </p>
          </div>
          <div className="grid gap-6 lg:gap-8 sm:grid-cols-2">
            {sorted.map((ep) => (
              <EpisodeTile key={ep.slug} episode={ep} />
            ))}
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </>
  );
}
