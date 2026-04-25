import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import mikePortrait from '../../assets/portrait-mike.jpg';
import phillipPortrait from '../../assets/portrait-philip.jpg';

export default function BuiltByTheBest() {
  return (
    <section className="bg-surface py-24 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
          Built by the best
        </p>

        <div className="mt-10 grid gap-12 lg:gap-16 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/5] bg-bg overflow-hidden border border-border">
              <img
                src={mikePortrait}
                alt="Mike Frascogna III"
                className="absolute inset-0 h-full w-full object-cover grayscale contrast-[1.05]"
              />
              <div className="absolute inset-0 pointer-events-none gradient-portrait-bottom" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-mono text-[10px] text-text-dim uppercase tracking-widest">
                  Founder · Owner
                </p>
                <p className="font-heading text-3xl uppercase mt-1">
                  Mike Frascogna III
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-7"
          >
            <h2
              className="font-heading uppercase leading-[1.0]"
              style={{ fontSize: 'clamp(48px, 6vw, 96px)' }}
            >
              Thirty years
              <br />
              of speed.
            </h2>

            <div className="mt-8 space-y-5 font-body text-text-muted text-lg leading-relaxed max-w-2xl">
              <p>
                MSI was founded by Mike Frascogna III in 1993 — the summer after his first
                year at the University of Notre Dame. A student of legendary athletic speed
                pioneer Randy Smythe, Frascogna agreed to allow a handful of high school
                athletes to participate as his training partners as he prepared himself for
                the 1993 college football season.
              </p>
              <p>
                After Notre Dame he served as speed and agility coach at Millsaps College and
                was hired by Coach Jackie Sherrill as a speed-enhancement specialist for the
                1998 Mississippi State Bulldogs — a team that ultimately earned a trip to the
                SEC Championship game in Atlanta.
              </p>
            </div>

            <blockquote className="mt-10 border-l-2 border-accent pl-6 max-w-2xl">
              <p className="font-heading text-2xl lg:text-3xl uppercase leading-tight">
                Now the proud father of four athletes himself, Frascogna has re-launched MSI
                to train a new generation of athletes in the Magnolia state.
              </p>
            </blockquote>

            <div className="mt-10">
              <Link
                to="/about/mike-frascogna"
                className="inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-widest text-text border-b border-transparent hover:border-text transition-colors pb-0.5"
              >
                Read the full bio
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-16 lg:mt-20 border-t border-border pt-8 flex flex-col sm:flex-row sm:items-center gap-6"
        >
          <img
            src={phillipPortrait}
            alt=""
            className="h-16 w-16 rounded-full object-cover grayscale border border-border-strong"
          />
          <div className="flex-1">
            <p className="font-mono text-[10px] text-text-dim uppercase tracking-widest">
              Lead Camp Coach · Quarterback Specialist
            </p>
            <p className="font-heading text-2xl uppercase mt-1">Phillip Short</p>
          </div>
          <Link
            to="/about/phillip-short"
            className="inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-widest text-accent hover:text-accent-hover transition-colors"
          >
            Meet Phillip
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
