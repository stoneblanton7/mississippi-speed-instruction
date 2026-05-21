import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';

// Shared vertical episode card. Used by the podcast hub (/podcast) and the
// home-page podcast section so both render the identical card.
export default function EpisodeCard({ episode }) {
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
