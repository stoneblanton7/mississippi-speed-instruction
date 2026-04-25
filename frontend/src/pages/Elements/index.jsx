import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import SpeedCampFinal from '../../components/sections/SpeedCampFinal.jsx';
import { ELEMENTS } from '../../api/data/elements.js';

function ElementCard({ element, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (index % 5) * 0.05, ease: 'easeOut' }}
    >
      <Link
        to={`/elements/${element.slug}`}
        className="group block h-full bg-bg p-8 lg:p-10 hover:bg-surface transition-colors"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-text-dim">{element.number}</span>
          <span className="font-mono text-[10px] text-text-dim uppercase tracking-widest">
            Element
          </span>
        </div>
        <img
          src={element.icon}
          alt=""
          className="mt-8 h-24 w-24 lg:h-28 lg:w-28 object-contain"
        />
        <h2 className="font-heading text-3xl lg:text-4xl uppercase mt-8 leading-tight">
          {element.name}
        </h2>
        <p className="font-body text-text-muted text-base mt-4 leading-relaxed min-h-[3rem]">
          {element.outcome}
        </p>
        <span className="mt-8 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-text-dim group-hover:text-accent group-hover:gap-3 transition-all">
          Explore
          <ArrowRight size={12} strokeWidth={2.5} />
        </span>
      </Link>
    </motion.div>
  );
}

export default function ElementsIndex() {
  return (
    <>
      <section className="relative bg-bg pt-32 pb-16 lg:pt-44 lg:pb-24 border-b border-border overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-30 gradient-final-glow"
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
            The Methodology
          </p>
          <h1
            className="font-heading uppercase mt-6 leading-[1.0]"
            style={{ fontSize: 'clamp(64px, 12vw, 180px)' }}
          >
            Ten Elements
            <br />
            of <span className="text-accent">Speed.</span>
          </h1>
          <p className="font-body text-text-muted text-lg lg:text-xl mt-8 max-w-2xl leading-relaxed">
            Every drill at MSI maps to one of ten measurable elements. Click into any element
            to see the science, the drills, and the coaches who teach it.
          </p>
        </div>
      </section>

      <section className="bg-bg border-b border-border">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-border">
            {ELEMENTS.map((el, i) => (
              <ElementCard key={el.slug} element={el} index={i} />
            ))}
          </div>
        </div>
      </section>

      <SpeedCampFinal />
    </>
  );
}
