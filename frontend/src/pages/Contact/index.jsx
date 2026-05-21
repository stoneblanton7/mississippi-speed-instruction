import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, Facebook, Instagram, Youtube, MapPin, Check } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import TikTokIcon from '../../components/ui/TikTokIcon.jsx';
import NewsletterSignup from '../../components/sections/NewsletterSignup.jsx';
import SpeedCampFinal from '../../components/sections/SpeedCampFinal.jsx';
import { CONTACT_WEBHOOK_URL, SOCIAL } from '../../config.js';

const INPUT_BASE =
  'w-full bg-bg border border-border focus:border-text rounded-lg px-4 py-3 font-body text-base text-text placeholder:text-text-dim focus:outline-none transition-colors';

function Toast({ message, type }) {
  const visible = Boolean(message);
  const isError = type === 'error';
  const Icon = isError ? AlertCircle : Check;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-text text-text-inverted font-body text-sm font-semibold uppercase tracking-widest px-5 py-3 rounded-lg shadow-2xl shadow-black/50"
          role={isError ? 'alert' : 'status'}
          aria-live={isError ? 'assertive' : 'polite'}
        >
          <Icon size={16} strokeWidth={2.5} />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '', website: '' });
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const loadedAt = useRef(Date.now());

  useEffect(() => {
    if (!toast.message) return;
    const t = setTimeout(() => setToast({ message: '', type: 'success' }), 3000);
    return () => clearTimeout(t);
  }, [toast.message]);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Honeypot + timing: silently accept obvious bots without posting.
    if (form.website || Date.now() - loadedAt.current < 1500) {
      setToast({ message: 'Message sent', type: 'success' });
      setForm({ name: '', email: '', message: '', website: '' });
      return;
    }

    if (!CONTACT_WEBHOOK_URL) {
      setToast({ message: 'Contact not configured', type: 'error' });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        form: 'contact',
        source: 'mississippi-speed-instruction',
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        submittedAt: new Date().toISOString(),
        page: window.location.href,
        userAgent: window.navigator.userAgent,
      };

      const response = await fetch(CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Webhook returned ${response.status}`);
      }

      setToast({ message: 'Message sent', type: 'success' });
      setForm({ name: '', email: '', message: '', website: '' });
    } catch (error) {
      console.error('Contact form submission failed', error);
      setToast({ message: 'Message failed', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
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
            <span className="block">Questions?</span>
            <span className="block">Let's talk.</span>
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
            {/* Honeypot: hidden from real users; bots that fill it are dropped. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={handleChange('website')}
              />
            </div>

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
              <Button
                type="submit"
                variant="primary"
                size="lg"
                arrow={!isSubmitting}
                disabled={isSubmitting}
                className={isSubmitting ? 'opacity-70 cursor-wait' : ''}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
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
                <a
                  href={SOCIAL.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="inline-flex items-center justify-center h-12 w-12 rounded-lg border border-border-strong text-text-muted hover:text-text hover:border-text transition-colors"
                >
                  <Youtube size={20} />
                </a>
                <a
                  href={SOCIAL.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="inline-flex items-center justify-center h-12 w-12 rounded-lg border border-border-strong text-text-muted hover:text-text hover:border-text transition-colors"
                >
                  <TikTokIcon size={20} />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <NewsletterSignup />

      <SpeedCampFinal />

      <Toast message={toast.message} type={toast.type} />
    </>
  );
}
