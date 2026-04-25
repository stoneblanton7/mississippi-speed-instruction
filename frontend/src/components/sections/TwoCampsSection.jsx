import { Link } from 'react-router-dom';
import Button from '../ui/Button.jsx';
import Reveal from '../ui/Reveal.jsx';
import { CAMPS, REGISTER_LINK_PROPS } from '../../config.js';
import imgBoys from '../../assets/kids-camp (2).png';
import imgGirls from '../../assets/kids-camp 6.jpg';

const CARDS = [
  { camp: CAMPS.boys, detailHref: '/camp/boys', image: imgBoys },
  { camp: CAMPS.girls, detailHref: '/camp/girls', image: imgGirls },
];

function CampCard({ camp, detailHref, image }) {
  return (
    <article
      className="relative overflow-hidden rounded-sm h-[520px] md:h-[640px] group"
    >
      <img
        src={image}
        alt={`MSI ${camp.name} training`}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none gradient-card-bottom"
      />

      <div
        aria-hidden="true"
        className="absolute top-8 bottom-8 left-0 w-1 bg-accent"
      />

      <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-10">
        <div className="absolute top-8 md:top-10 left-8 md:left-10 right-8 md:right-10">
          <p className="font-mono text-xs text-accent uppercase tracking-[0.4em] [text-shadow:0_2px_4px_rgba(0,0,0,1),0_4px_16px_rgba(0,0,0,0.9)]">
            Summer 2026 · {camp.gender}
          </p>
        </div>

        <h3
          className="font-heading text-text uppercase leading-[1.0] mb-6"
          style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}
        >
          {camp.name}
        </h3>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-6 font-mono text-sm md:text-base font-medium text-text [text-shadow:0_2px_4px_rgba(0,0,0,1),0_4px_16px_rgba(0,0,0,0.9)]">
          <span>
            <span className="text-accent">●</span> {camp.dates}
          </span>
          <span>
            <span className="text-accent">●</span> {camp.time}
          </span>
          <span>
            <span className="text-accent">●</span> Ages {camp.ageRange}
          </span>
          <span>
            <span className="text-accent">●</span> ${camp.cost}
          </span>
          <span>
            <span className="text-accent">●</span> {camp.spots} spots
          </span>
        </div>

        <p className="font-body text-text text-sm md:text-base mb-8 max-w-md [text-shadow:0_2px_4px_rgba(0,0,0,1),0_4px_16px_rgba(0,0,0,0.9)]">
          {camp.location}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button as="a" {...REGISTER_LINK_PROPS} variant="primary" arrow>
            Register {camp.gender}
          </Button>
          <Button as={Link} to={detailHref} variant="ghost">
            Camp Details
          </Button>
        </div>
      </div>
    </article>
  );
}

export default function TwoCampsSection() {
  return (
    <section
      id="two-camps"
      className="bg-bg py-24 lg:py-32 border-t border-border scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
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
        </Reveal>

        <div className="grid gap-6 lg:gap-10 md:grid-cols-2">
          {CARDS.map((c, i) => (
            <Reveal key={c.camp.id} delay={i * 150}>
              <CampCard {...c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
