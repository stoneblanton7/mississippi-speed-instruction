import NewsletterSignup from '../../components/sections/NewsletterSignup.jsx';
import EpisodeCard from '../../components/podcast/EpisodeCard.jsx';
import { EPISODES } from '../../api/data/episodes.js';

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
              <EpisodeCard key={ep.slug} episode={ep} />
            ))}
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </>
  );
}
