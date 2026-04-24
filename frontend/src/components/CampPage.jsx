import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Button from './ui/Button.jsx';
import { REGISTER_LINK_PROPS } from '../config.js';
import { ELEMENTS } from '../api/data/elements.js';

function FactTile({ label, value, mono = true }) {
  return (
    <div className="border-l-2 border-border pl-6 py-4">
      <p className="font-mono text-[10px] text-text-dim uppercase tracking-widest">
        {label}
      </p>
      <p
        className={
          'mt-2 text-text leading-tight ' +
          (mono ? 'font-mono text-2xl lg:text-3xl' : 'font-heading text-3xl lg:text-4xl uppercase')
        }
      >
        {value}
      </p>
    </div>
  );
}

export default function CampPage({ camp, banner }) {
  const eyebrowYear = camp.dates.includes('2026') ? 'SUMMER 2026' : 'SUMMER';

  return (
    <article>
      <section className="relative bg-bg pt-32 pb-16 lg:pt-44 lg:pb-24 border-b border-border overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-30 gradient-final-glow"
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
            {eyebrowYear} · Madison Ridgeland Academy
          </p>
          <h1
            className="font-heading uppercase mt-6 leading-[0.85]"
            style={{ fontSize: 'clamp(64px, 12vw, 160px)' }}
          >
            {camp.name}
          </h1>
          <p className="font-body text-text-muted text-lg lg:text-xl mt-8 max-w-2xl">
            Three days. Ten elements. One faster athlete.
          </p>
          <div className="mt-10">
            <Button as="a" {...REGISTER_LINK_PROPS} variant="primary" size="lg" arrow>
              Register Now
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-surface border-b border-border">
        <div className="mx-auto max-w-6xl">
          <img
            src={banner}
            alt={`${camp.name} promotional banner`}
            className="w-full h-auto block"
          />
        </div>
      </section>

      <section className="bg-bg py-20 lg:py-28 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
            The Spec
          </p>
          <h2 className="font-heading text-4xl lg:text-6xl uppercase mt-4 leading-[0.9]">
            What you're signing up for.
          </h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
            <FactTile label="Dates" value={camp.dates} />
            <FactTile label="Time" value={camp.time} />
            <FactTile label="Location" value={camp.location} mono={false} />
            <FactTile label="Ages" value={camp.ageRange} />
            <FactTile label="Limit" value={`${camp.spots} ATHLETES`} />
            <FactTile label="Cost" value={`$${camp.cost}`} />
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 lg:py-28 border-b border-border">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
            The Camp
          </p>
          <h2 className="font-heading text-4xl lg:text-5xl uppercase mt-4 leading-[0.9]">
            How three days actually go.
          </h2>
          <p className="font-body text-text-muted text-lg lg:text-xl mt-8 leading-relaxed">
            A fun three (3) day introduction to speed agility and quickness training, 4:00–5:45
            at Madison Ridgeland Academy. The program is{' '}
            <span className="text-text font-semibold">designed by Mike Frascogna</span> and the
            camp will be led by{' '}
            <span className="text-text font-semibold">Coach Phillip Short</span> and other MSI
            instructors.
          </p>
          <p className="font-body text-text-muted text-lg lg:text-xl mt-6 leading-relaxed">
            High speed drills and competition will teach athletes correct movement form in areas
            such as acceleration, top speed, lateral speed, foot quickness, jumping, change of
            direction, and visual acuity. Great for athletes competing in any team sport.
          </p>
        </div>
      </section>

      <section className="bg-bg py-20 lg:py-28 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
            The Curriculum
          </p>
          <h2 className="font-heading text-4xl lg:text-6xl uppercase mt-4 leading-[0.9]">
            What your athlete will train.
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {ELEMENTS.map((el, i) => (
              <Link
                key={el.slug}
                to={`/elements/${el.slug}`}
                className="group bg-bg p-6 lg:p-8 hover:bg-surface transition-colors flex items-start gap-6"
              >
                <div className="flex flex-col items-start gap-3 shrink-0">
                  <span className="font-mono text-xs text-text-dim">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <img
                    src={el.icon}
                    alt=""
                    className="h-14 w-14 lg:h-16 lg:w-16 object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-2xl lg:text-3xl uppercase leading-tight">
                    {el.name}
                  </h3>
                  <p className="font-body text-text-muted mt-2 leading-relaxed">
                    {el.outcome}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-text-dim group-hover:text-text transition-colors">
                    Explore element
                    <ArrowRight size={12} strokeWidth={2.5} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-bg">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-30 gradient-final-glow"
        />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-10 py-28 lg:py-40 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
              Lock the spot
            </p>
            <h2
              className="font-heading uppercase mt-6 leading-[0.85]"
              style={{ fontSize: 'clamp(56px, 9vw, 140px)' }}
            >
              Register for
              <br />
              {camp.name}.
            </h2>
            <p className="font-body text-text-muted text-lg lg:text-xl mt-8">
              Only {camp.spots} spots. Three days. ${camp.cost}.
            </p>
            <div className="mt-10">
              <Button as="a" {...REGISTER_LINK_PROPS} variant="primary" size="lg" arrow>
                Register Now
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </article>
  );
}
