import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import SpeedCampFinal from '../../components/sections/SpeedCampFinal.jsx';
import mikePortrait from '../../assets/portrait-mike.jpg';
import phillipPortrait from '../../assets/portrait-philip.jpg';

const STATS = [
  {
    value: '30+ YEARS',
    label: 'Coaching elite speed in Mississippi since 1993',
    range: [0.12, 0.28],
  },
  {
    value: '1,000+ ATHLETES',
    label: 'Trained across three decades',
    range: [0.38, 0.54],
  },
  {
    value: 'ONE PHILOSOPHY',
    label: 'Every athlete, faster than they came in',
    range: [0.64, 0.80],
  },
];

function StatReveal({ stat, scrollYProgress }) {
  const opacity = useTransform(
    scrollYProgress,
    [stat.range[0] - 0.05, stat.range[0], stat.range[1], stat.range[1] + 0.05],
    [0, 1, 1, 0]
  );
  const y = useTransform(scrollYProgress, [stat.range[0] - 0.05, stat.range[0]], [16, 0]);
  return (
    <motion.div
      style={{ opacity, y }}
      className="text-center max-w-2xl mx-auto px-6"
    >
      <p
        className="font-heading uppercase leading-[1.0]"
        style={{ fontSize: 'clamp(64px, 10vw, 160px)' }}
      >
        {stat.value}
      </p>
      <p className="font-body text-text-muted text-lg lg:text-xl mt-6">{stat.label}</p>
    </motion.div>
  );
}

export default function About() {
  const corridorRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: corridorRef,
    offset: ['start end', 'end start'],
  });

  return (
    <>
      <section className="relative min-h-screen bg-bg pt-24 lg:pt-28 pb-16 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-[4/5] bg-surface overflow-hidden border border-border">
              <img
                src={mikePortrait}
                alt="Mike Frascogna III"
                className="absolute inset-0 h-full w-full object-cover grayscale contrast-[1.05]"
                style={{ objectPosition: 'center top' }}
              />
              <div className="absolute inset-0 pointer-events-none gradient-portrait-bottom" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-mono text-[10px] text-text-dim uppercase tracking-widest">
                  Founder · 1993
                </p>
                <p className="font-heading text-2xl uppercase mt-1">Mike Frascogna III</p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 order-1 lg:order-2"
          >
            <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
              Founder · 1993
            </p>
            <h1
              className="font-heading uppercase mt-4 leading-[1.0]"
              style={{ fontSize: 'clamp(56px, 9vw, 140px)' }}
            >
              Mike
              <br />
              Frascogna III
            </h1>
            <p className="font-body text-text text-xl lg:text-2xl mt-8 max-w-xl leading-snug">
              Notre Dame. Nike. And one idea that built a program.
            </p>

            <div className="mt-8 space-y-5 font-body text-text-muted text-lg leading-relaxed max-w-2xl">
              <p>
                MSI was founded by Mike Frascogna III in 1993 — the summer after his first year
                at the University of Notre Dame. A student of legendary athletic speed pioneer
                Randy Smythe, he started by training a handful of high school athletes alongside
                himself.
              </p>
              <p>
                After Notre Dame he served as speed and agility coach at Millsaps and was hired
                by Coach Jackie Sherrill as a speed-enhancement specialist for the 1998
                Mississippi State Bulldogs — a team that earned a trip to the SEC Championship
                game. He went on to lead Nike's emerging athletic performance enhancement
                division, training thousands of athletes across the United States and Europe.
              </p>
            </div>

            <blockquote className="mt-10 border-l-2 border-accent pl-6 max-w-xl">
              <p className="font-heading text-2xl lg:text-3xl uppercase leading-tight">
                "Speed isn't talent. It's trainable."
              </p>
            </blockquote>

            <div className="mt-10">
              <Link
                to="/about/mike-frascogna"
                className="inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-widest text-text border-b border-transparent hover:border-text transition-colors pb-0.5"
              >
                Read Mike's full story
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        ref={corridorRef}
        className="relative bg-bg border-b border-border"
        style={{ height: '200vh' }}
        aria-label="Three decades, one philosophy"
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="relative w-full">
            {STATS.map((stat) => (
              <div key={stat.value} className="absolute inset-0 flex items-center justify-center">
                <StatReveal stat={stat} scrollYProgress={scrollYProgress} />
              </div>
            ))}
          </div>

          <div className="absolute bottom-8 left-0 right-0 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-text-dim">MIKE</span>
              <div className="flex-1 h-px bg-border-strong relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-accent"
                  style={{ width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
                />
              </div>
              <span className="font-mono text-xs text-text-dim">PHILLIP</span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-screen bg-bg py-16 lg:py-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 order-1"
          >
            <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
              Lead Camp Instructor
            </p>
            <h2
              className="font-heading uppercase mt-4 leading-[1.0]"
              style={{ fontSize: 'clamp(56px, 9vw, 140px)' }}
            >
              Phillip
              <br />
              Short
            </h2>
            <p className="font-body text-text text-xl lg:text-2xl mt-8 max-w-xl leading-snug">
              Carrying the program forward.
            </p>

            <div className="mt-8 space-y-5 font-body text-text-muted text-lg leading-relaxed max-w-2xl">
              <p>
                Phillip Short is a highly skilled quarterback specialist with a proven track
                record as both a player and a mentor. A graduate of Madison-Ridgeland Academy,
                he led his team to victory in the 2019 State Championship — setting a
                Mississippi state record with 593 passing yards in the title game and earning
                MS High School Player of the Year.
              </p>
              <p>
                After Mississippi Gulf Coast Community College and Jackson State University, he
                now trains the next generation of quarterbacks and leads MSI's summer speed
                camps.
              </p>
            </div>

            <div className="mt-10">
              <Link
                to="/about/phillip-short"
                className="inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-widest text-text border-b border-transparent hover:border-text transition-colors pb-0.5"
              >
                Read Phillip's full story
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
            </div>
          </motion.div>

          <div className="lg:col-span-5 order-2">
            <div className="relative aspect-[4/5] bg-surface overflow-hidden border border-border">
              <img
                src={phillipPortrait}
                alt="Phillip Short"
                className="absolute inset-0 h-full w-full object-cover grayscale contrast-[1.05]"
                style={{ objectPosition: 'center top' }}
              />
              <div className="absolute inset-0 pointer-events-none gradient-portrait-bottom" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-mono text-[10px] text-text-dim uppercase tracking-widest">
                  Quarterback Specialist
                </p>
                <p className="font-heading text-2xl uppercase mt-1">Phillip Short</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-24 lg:py-32 border-b border-border">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
            The Program Today
          </p>
          <h2
            className="font-heading uppercase mt-6 leading-[1.0]"
            style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}
          >
            One team.
            <br />
            One standard.
          </h2>
          <div className="mt-10 space-y-6 font-body text-text-muted text-lg lg:text-xl leading-relaxed">
            <p>
              MSI runs separate boys and girls speed camps each summer at Madison Ridgeland
              Academy. The program is designed by Mike Frascogna and led by Coach Phillip Short
              and other MSI instructors, with high-speed drills and competition that teach the
              ten elements of speed across every team sport.
            </p>
            <p>
              The format is the same week after week: small camp limits, real coaches on the
              field, and a curriculum that has trained athletes from middle school to the SEC
              for thirty years. Whether your athlete plays baseball, basketball, football,
              soccer, or volleyball, the work transfers.
            </p>
          </div>
        </div>
      </section>

      <SpeedCampFinal />
    </>
  );
}
