import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button.jsx';
import { CAMPS, REGISTER_LINK_PROPS } from '../../config.js';
import boysBanner from '../../assets/camp-boys-banner.png';
import girlsBanner from '../../assets/camp-girls-banner.png';

const CARDS = [
  { camp: CAMPS.boys, banner: boysBanner, detailHref: '/camp/boys' },
  { camp: CAMPS.girls, banner: girlsBanner, detailHref: '/camp/girls' },
];

function CampCard({ camp, banner, detailHref }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="group relative bg-surface border border-border overflow-hidden flex flex-col"
    >
      <div className="aspect-[16/9] overflow-hidden bg-bg">
        <img
          src={banner}
          alt={`${camp.name} promotional banner`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>

      <div className="p-8 lg:p-10 flex-1 flex flex-col">
        <p className="font-mono text-xs text-text-dim uppercase tracking-widest">
          Summer 2026 · {camp.gender}
        </p>
        <h3 className="font-heading text-4xl lg:text-5xl uppercase mt-2">
          {camp.name}
        </h3>

        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 font-body text-sm">
          <div>
            <dt className="font-mono text-[10px] text-text-dim uppercase tracking-widest">Dates</dt>
            <dd className="text-text mt-1">{camp.dates}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] text-text-dim uppercase tracking-widest">Time</dt>
            <dd className="text-text mt-1">{camp.time}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] text-text-dim uppercase tracking-widest">Ages</dt>
            <dd className="text-text mt-1">{camp.ageRange}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] text-text-dim uppercase tracking-widest">Cost</dt>
            <dd className="text-text mt-1 font-mono">${camp.cost}</dd>
          </div>
          <div className="col-span-2">
            <dt className="font-mono text-[10px] text-text-dim uppercase tracking-widest">Location</dt>
            <dd className="text-text mt-1">{camp.location}</dd>
          </div>
        </dl>

        <p className="font-mono text-xs text-text-dim uppercase tracking-widest mt-8">
          Only {camp.spots} spots
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4 mt-auto pt-6">
          <Button as="a" {...REGISTER_LINK_PROPS} variant="primary" arrow>
            Register {camp.gender}
          </Button>
          <Link
            to={detailHref}
            className="inline-flex items-center gap-1.5 font-body text-sm font-semibold uppercase tracking-widest text-text border-b border-transparent hover:border-text transition-colors pb-0.5"
          >
            Camp details
            <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function TwoCampsSection() {
  return (
    <section
      id="two-camps"
      className="bg-bg py-24 lg:py-32 border-t border-border scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl mb-14 lg:mb-20">
          <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
            Summer 2026
          </p>
          <h2 className="font-heading text-5xl lg:text-7xl uppercase mt-4 leading-[1.0]">
            Two camps.
            <br />
            Three days each.
          </h2>
          <p className="font-body text-text-muted text-lg mt-6">
            Same program, designed by Mike Frascogna and led by Coach Phillip Short.
            Boys and girls run separate weeks at Madison Ridgeland Academy.
          </p>
        </div>

        <div className="grid gap-6 lg:gap-10 md:grid-cols-2">
          {CARDS.map((c) => (
            <CampCard key={c.camp.id} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}
