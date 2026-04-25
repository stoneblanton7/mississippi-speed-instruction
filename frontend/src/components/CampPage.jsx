import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Button from './ui/Button.jsx';
import SpeedCampFinal from './sections/SpeedCampFinal.jsx';
import { REGISTER_LINK_PROPS } from '../config.js';
import { ELEMENTS } from '../api/data/elements.js';
import imgIncludedDefault from '../assets/kids-camp 9.png';
import imgDay from '../assets/kids-camp (1).png';

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

const FAQS = [
  {
    q: 'What if my child has never done speed training before?',
    a: "Most of our campers haven't. The drills are built for first-timers. By day two, your kid will be doing things they couldn't do on day one — that's the point.",
  },
  {
    q: 'What should they bring?',
    a: 'Athletic shoes (cleats optional), athletic gear, and a water bottle. Sunscreen if it’s hot. Bring energy.',
  },
  {
    q: "What if my child can't make all three days?",
    a: "Let us know in advance and we'll do our best to catch them up. Three days together is ideal because the elements build on each other, but one missed day isn't a deal-breaker.",
  },
  {
    q: 'Have a different question?',
    a: (
      <>
        Reach out through the{' '}
        <Link
          to="/contact"
          className="text-accent hover:text-accent-hover border-b border-current"
        >
          contact page
        </Link>{' '}
        — we usually reply within a day.
      </>
    ),
  },
];

export default function CampPage({ camp, banner, includedImage = imgIncludedDefault }) {
  const eyebrowYear = camp.dates.includes('2026') ? 'SUMMER 2026' : 'SUMMER';
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <article>
      <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden border-b border-border bg-bg">
        <img
          src={banner}
          alt={`${camp.name} training`}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none gradient-card-bottom"
        />
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-10 flex flex-col justify-end pb-16 md:pb-24">
          <p className="font-mono text-xs text-accent uppercase tracking-[0.4em] [text-shadow:0_2px_4px_rgba(0,0,0,1),0_4px_16px_rgba(0,0,0,0.9)]">
            {eyebrowYear} · {camp.gender} Camp · Madison Ridgeland Academy
          </p>
          <h1
            className="font-heading uppercase mt-6 leading-[1.0]"
            style={{ fontSize: 'clamp(64px, 12vw, 160px)' }}
          >
            {camp.name}
          </h1>
          <p className="font-body text-text-muted text-lg lg:text-xl mt-8 max-w-2xl leading-relaxed [text-shadow:0_2px_4px_rgba(0,0,0,1),0_4px_16px_rgba(0,0,0,0.9)]">
            Three days at Madison Ridgeland Academy where your kid learns the
            foundations of real athletic speed — from coaches who've been doing
            this for thirty years.
          </p>
          <div className="mt-10">
            <Button as="a" {...REGISTER_LINK_PROPS} variant="primary" size="lg" arrow>
              Register for Camp
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-bg py-20 lg:py-28 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
                Included
              </p>
              <h2 className="font-heading text-4xl lg:text-6xl uppercase mt-4 leading-[1.0]">
                What's included.
              </h2>
              <div className="mt-8 space-y-5 font-body text-text-muted text-lg lg:text-xl leading-relaxed">
                <p>
                  Every camper gets the same coaching that's trained Mississippi
                  athletes for thirty years — sized down for the {camp.ageRange} age
                  group and built to feel like a great three days, not a tryout.
                </p>
                <p>
                  The camp covers all ten elements of speed across the three days —
                  acceleration, change of direction, foot quickness, lateral
                  movement, and the rest — with drills designed to be genuinely fun.
                  Kids leave faster, more coordinated, and (in our experience)
                  asking when they can come back.
                </p>
              </div>
              <ul className="mt-10 grid grid-cols-1 gap-y-3 font-body text-text text-base lg:text-lg">
                <li className="flex gap-3">
                  <span aria-hidden="true" className="text-accent shrink-0">●</span>
                  Three days of in-person, small-group instruction
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="text-accent shrink-0">●</span>
                  All ten elements of speed taught across the camp
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="text-accent shrink-0">●</span>
                  Direct coaching from Phillip Short and the MSI team
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="text-accent shrink-0">●</span>
                  Daily team competition that puts the work into action
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="text-accent shrink-0">●</span>
                  Capped at {camp.spots} athletes so every kid gets attention
                </li>
              </ul>
            </div>
            <div className="overflow-hidden rounded-sm bg-surface aspect-video group">
              <img
                src={includedImage}
                alt="MSI coach with athletes during training"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>
          <div className="mt-16 lg:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
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
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="overflow-hidden rounded-sm bg-bg aspect-[4/5] lg:aspect-[3/4] order-2 lg:order-1 group">
              <img
                src={imgDay}
                alt="MSI campers ready for a day of training"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
                The Day
              </p>
              <h2 className="font-heading text-4xl lg:text-5xl uppercase mt-4 leading-[1.0]">
                A day at camp.
              </h2>
              <p className="font-body text-text-muted text-lg lg:text-xl mt-8 leading-relaxed">
                Camp runs {camp.time} each day. Your athlete shows up in athletic
                gear, ready to go. We start with a group warm-up that wakes everyone
                up, then break into smaller groups for the day's elements. Coaches
                rotate so every kid gets direct instruction from each one. We close
                out with a fun team competition — relay races, agility games,
                friendly contests that put the day's learning into practice. Pickup
                is at the same spot every day.
              </p>
              <p className="font-body text-text-muted text-base lg:text-lg mt-6 leading-relaxed">
                The program is{' '}
                <span className="text-text font-semibold">designed by Mike Frascogna</span>{' '}
                and the camp is led by{' '}
                <span className="text-text font-semibold">Coach Phillip Short</span>{' '}
                and other MSI instructors.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg py-20 lg:py-28 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
            The Curriculum
          </p>
          <h2 className="font-heading text-4xl lg:text-6xl uppercase mt-4 leading-[1.0]">
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

      <section className="bg-surface py-20 lg:py-28 border-b border-border">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
            FAQ
          </p>
          <h2 className="font-heading text-4xl lg:text-5xl uppercase mt-4 leading-[1.0]">
            Common questions.
          </h2>
          <div className="mt-12 divide-y divide-border border-y border-border">
            {FAQS.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                  >
                    <span className="font-heading text-text text-xl lg:text-2xl uppercase leading-tight group-hover:text-accent transition-colors">
                      {item.q}
                    </span>
                    <ChevronDown
                      size={24}
                      strokeWidth={2}
                      className={
                        'shrink-0 transition-transform duration-300 ' +
                        (isOpen ? 'rotate-180 text-accent' : 'text-text-muted')
                      }
                    />
                  </button>
                  <div
                    className={
                      'overflow-hidden transition-all duration-300 ease-out ' +
                      (isOpen ? 'max-h-[500px] pb-6' : 'max-h-0')
                    }
                  >
                    <p className="font-body text-text-muted text-base lg:text-lg leading-relaxed pr-12">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SpeedCampFinal />
    </article>
  );
}
