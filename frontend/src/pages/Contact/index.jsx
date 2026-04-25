import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Facebook, Instagram, Mail, MapPin, Check } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import HoverWord from '../../components/ui/HoverWord.jsx';
import SpeedCampFinal from '../../components/sections/SpeedCampFinal.jsx';
import { SOCIAL } from '../../config.js';

const INPUT_BASE =
  'w-full bg-bg border border-border focus:border-text rounded-lg px-4 py-3 font-body text-base text-text placeholder:text-text-dim focus:outline-none transition-colors';

function Toast({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-text text-text-inverted font-body text-sm font-semibold uppercase tracking-widest px-5 py-3 rounded-lg shadow-2xl shadow-black/50"
          role="status"
          aria-live="polite"
        >
          <Check size={16} strokeWidth={2.5} />
          Message sent
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!showToast) return;
    const t = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(t);
  }, [showToast]);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <>
      <section className="relative bg-bg pt-32 pb-16 lg:pt-44 lg:pb-24 border-b border-border overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-25 gradient-final-glow"
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
            Get in touch
          </p>
          <h1
            className="font-heading uppercase mt-6 leading-[1.0]"
            style={{ fontSize: 'clamp(56px, 10vw, 160px)' }}
          >
            <span className="block">
              <HoverWord>Questions?</HoverWord>
            </span>
            <span className="block">
              <HoverWord>Let's</HoverWord> <HoverWord>talk.</HoverWord>
            </span>
          </h1>
          <p className="font-body text-text-muted text-lg lg:text-xl mt-12 max-w-2xl leading-relaxed">
            Drop us a line — we respond within one business day.
          </p>
        </div>
      </section>

      <section className="bg-bg py-20 lg:py-28 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 flex flex-col gap-5"
            aria-label="Contact MSI"
          >
            <div>
              <label
                htmlFor="contact-name"
                className="font-mono text-[10px] text-text-dim uppercase tracking-widest"
              >
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={handleChange('name')}
                placeholder="Your name"
                className={`mt-2 ${INPUT_BASE}`}
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="font-mono text-[10px] text-text-dim uppercase tracking-widest"
              >
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange('email')}
                placeholder="you@example.com"
                className={`mt-2 ${INPUT_BASE}`}
              />
            </div>
            <div>
              <label
                htmlFor="contact-message"
                className="font-mono text-[10px] text-text-dim uppercase tracking-widest"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                required
                value={form.message}
                onChange={handleChange('message')}
                placeholder="What can we help with?"
                rows={6}
                className={`mt-2 ${INPUT_BASE} resize-y`}
              />
            </div>
            <div className="pt-2">
              <Button type="submit" variant="primary" size="lg" arrow>
                Send Message
              </Button>
            </div>
          </form>

          <aside className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-surface border border-border p-8">
              <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
                Find us
              </p>
              <ul className="mt-8 space-y-6">
                <li className="flex items-start gap-4">
                  <Mail size={18} strokeWidth={2} className="text-text-muted mt-0.5" />
                  <div>
                    <p className="font-mono text-[10px] text-text-dim uppercase tracking-widest">
                      Email
                    </p>
                    <a
                      href="mailto:info@mississippispeed.com"
                      className="font-body text-text mt-1 block hover:text-accent transition-colors"
                    >
                      info@mississippispeed.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin size={18} strokeWidth={2} className="text-text-muted mt-0.5" />
                  <div>
                    <p className="font-mono text-[10px] text-text-dim uppercase tracking-widest">
                      Camps held at
                    </p>
                    <p className="font-body text-text mt-1">Madison Ridgeland Academy</p>
                    <p className="font-body text-text-muted text-sm">
                      Madison, Mississippi
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-surface border border-border p-8">
              <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
                Follow MSI
              </p>
              <div className="mt-6 flex items-center gap-4">
                <a
                  href={SOCIAL.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex items-center justify-center h-12 w-12 rounded-lg border border-border-strong text-text-muted hover:text-text hover:border-text transition-colors"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex items-center justify-center h-12 w-12 rounded-lg border border-border-strong text-text-muted hover:text-text hover:border-text transition-colors"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <SpeedCampFinal />

      <Toast visible={showToast} />
    </>
  );
}
