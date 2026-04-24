import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { REGISTER_LINK_PROPS } from '../../config.js';

export default function StickyRegisterCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          {...REGISTER_LINK_PROPS}
          key="sticky-register"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: 'easeOut' },
          }}
          exit={{
            opacity: 0,
            y: 20,
            transition: { duration: 0.25, ease: 'easeIn' },
          }}
          className="hidden lg:inline-flex fixed bottom-8 right-8 z-40 items-center gap-2 bg-accent text-text-inverted font-body text-sm font-semibold uppercase tracking-widest px-6 py-4 rounded-lg shadow-2xl shadow-black/50 hover:bg-accent-hover transition-colors"
          aria-label="Register for speed camp (opens new tab)"
        >
          <motion.span
            aria-hidden="true"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex items-center gap-2"
          >
            Register
            <ArrowRight size={16} strokeWidth={2.5} />
          </motion.span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
