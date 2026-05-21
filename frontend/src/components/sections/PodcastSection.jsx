import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import Button from '../ui/Button.jsx';
import { EPISODES } from '../../api/data/episodes.js';

function FeaturedEpisode({ episode }) {
  const epNumber = String(episode.number).padStart(2, '0');
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="mb-6 lg:mb-8"
    >
      <Link
        to={`/podcast/${episode.slug}`}
        className="group grid md:grid-cols-2 bg-surface border border-border hover:border-text transition-colors overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <div className="relative aspect-video md:aspect-auto md:min-h-[340px] bg-bg overflow-hidden">
          <img
            src={episode.thumbnail}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-4 right-4 inline-flex items-center justify-center h-14 w-14 rounded-full bg-accent text-text-inverted shadow-lg transition-transform duration-300 group-hover:scale-110"
          >
            <Play size={22} strokeWidth={2.5} className="ml-0.5" fill="currentColor" />
          </span>
        </div>

        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
            Latest episode · Episode {epNumber} · {episode.publishedAt}
          </p>
          <h3 className="font-heading text-4xl lg:text-5xl uppercase mt-5 leading-[1.0]">
            {episode.shortTitle}
          </h3>
          <p className="font-body text-text-muted text-sm mt-4 uppercase tracking-widest font-semibold">
            ft. {episode.guests}
          </p>
          <p className="font-body text-text-muted text-base lg:text-lg mt-5 leading-relaxed">
            {episode.hook}
          </p>
          <span className="mt-8 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-text-muted group-hover:text-accent group-hover:gap-3 transition-all">
            Watch episode
            <ArrowRight size={14} strokeWidth={2.5} />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export default function PodcastSection() {
  const sorted = [...EPISODES].sort((a, b) => b.number - a.number);
  const featured = sorted[0];

  if (!featured) return null;

  return (
    <section
      id="podcast"
      className="bg-bg py-24 lg:py-32 border-t border-border scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl mb-14 lg:mb-20">
          <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
            The Podcast
          </p>
          <h2 className="font-heading text-5xl lg:text-7xl uppercase mt-4 leading-[1.0]">
            Speed, sport &amp;
            <br />
            raising athletes.
          </h2>
          <p className="font-body text-text-muted text-lg mt-6">
            Long-form conversations with the coaches, athletes, and parents
            behind MSI — straight from the studio in Jackson.
          </p>
        </div>

        <FeaturedEpisode episode={featured} />

        <div className="mt-12 lg:mt-16 flex justify-center">
          <Button as={Link} to="/podcast" variant="ghost" arrow>
            See more episodes
          </Button>
        </div>
      </div>
    </section>
  );
}
