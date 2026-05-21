import TwoCampsSection from '../../components/sections/TwoCampsSection.jsx';
import SpeedCampFinal from '../../components/sections/SpeedCampFinal.jsx';

export default function Camp() {
  return (
    <>
      <section className="relative bg-bg pt-32 pb-16 lg:pt-44 lg:pb-24 border-b border-border overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-30 gradient-final-glow"
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
            Summer 2026 Camps
          </p>
          <h1
            className="font-heading uppercase mt-6 leading-[1.0]"
            style={{ fontSize: 'clamp(64px, 12vw, 180px)' }}
          >
            Speed Camp
          </h1>
          <p className="font-body text-text-muted text-lg lg:text-xl mt-8 max-w-2xl leading-relaxed">
            Three days of speed, agility, and quickness training at Madison Ridgeland
            Academy. Boys and girls run separate weeks — same program, designed by Mike
            Frascogna and led by Coach Philip Short. Pick a week below for full details.
          </p>
        </div>
      </section>

      <TwoCampsSection />

      <SpeedCampFinal />
    </>
  );
}
