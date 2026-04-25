import { Link } from 'react-router-dom';
import leaderMike from '../../assets/leader-mike.png';
import leaderPhilip from '../../assets/leader-philip.png';

function LeaderHalf({ to, src, alt, role, name }) {
  return (
    <Link
      to={to}
      className="relative group overflow-hidden block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-overlay-top group-hover:bg-transparent transition-colors duration-500"
      />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <p className="font-mono text-xs text-accent uppercase tracking-[0.4em] mb-2">
          {role}
        </p>
        <p className="font-heading text-text text-2xl md:text-3xl uppercase leading-[1.0]">
          {name}
        </p>
      </div>
    </Link>
  );
}

export default function MeetTheLeaders() {
  return (
    <section className="bg-bg py-24 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 lg:mb-16 max-w-3xl">
          <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
            The Coaches
          </p>
          <h2
            className="font-heading text-text uppercase mt-4 leading-[1.0]"
            style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
          >
            Meet the Leaders.
          </h2>
          <p className="font-body text-text-muted text-lg lg:text-xl mt-6 leading-relaxed">
            Two coaches. Three decades of speed. Click to learn more about each.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-0 max-h-[600px] overflow-hidden">
          <LeaderHalf
            to="/about/mike-frascogna"
            src={leaderMike}
            alt="Mike Frascogna III, MSI Founder"
            role="Founder"
            name="Mike Frascogna III"
          />
          <LeaderHalf
            to="/about/philip-short"
            src={leaderPhilip}
            alt="Philip Short, MSI Lead Instructor"
            role="Lead Instructor"
            name="Philip Short"
          />
        </div>
      </div>
    </section>
  );
}
