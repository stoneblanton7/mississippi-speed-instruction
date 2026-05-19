import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';
import Button from '../ui/Button.jsx';

const INPUT_BASE =
  'w-full bg-bg border border-border focus:border-text rounded-lg px-4 py-3 font-body text-base text-text placeholder:text-text-dim focus:outline-none transition-colors';

const PARENT_TYPES = [
  { value: 'boys_parent', label: 'Boys Parent' },
  { value: 'girls_parent', label: 'Girls Parent' },
  { value: 'both_parent', label: 'Both' },
  { value: 'future_parent', label: 'Future Parent' },
];

function Toast({ visible, message }) {
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
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function NewsletterSignup() {
  const [form, setForm] = useState({
    first_name: '',
    email: '',
    parent_type: 'boys_parent',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          first_name: form.first_name,
          parent_type: form.parent_type,
        }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Submission failed.');
      }

      setForm({ first_name: '', email: '', parent_type: 'boys_parent' });
      setToast("Thanks! You're on the list.");
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again in a moment.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="bg-surface py-20 lg:py-28 border-t border-b border-border">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
              Stay in the loop
            </p>
            <h2
              className="font-heading text-text uppercase mt-4 leading-[1.0]"
              style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
            >
              News from MSI.
              <br />
              In your inbox.
            </h2>
            <p className="font-body text-text-muted text-lg mt-6 leading-relaxed">
              Camp updates, new podcast drops, training tips from the coaches.
              No spam — we send a few times a month, max.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
            aria-label="Newsletter signup"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="newsletter-first-name"
                  className="font-mono text-[10px] text-text-muted uppercase tracking-widest"
                >
                  First Name <span className="text-accent">*</span>
                </label>
                <input
                  id="newsletter-first-name"
                  type="text"
                  required
                  autoComplete="given-name"
                  value={form.first_name}
                  onChange={handleChange('first_name')}
                  placeholder="Your first name"
                  className={`mt-2 ${INPUT_BASE}`}
                />
              </div>
              <div>
                <label
                  htmlFor="newsletter-email"
                  className="font-mono text-[10px] text-text-muted uppercase tracking-widest"
                >
                  Email <span className="text-accent">*</span>
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  placeholder="you@example.com"
                  className={`mt-2 ${INPUT_BASE}`}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="newsletter-parent-type"
                className="font-mono text-[10px] text-text-muted uppercase tracking-widest"
              >
                I'm a... <span className="text-accent">*</span>
              </label>
              <select
                id="newsletter-parent-type"
                required
                value={form.parent_type}
                onChange={handleChange('parent_type')}
                className={`mt-2 ${INPUT_BASE} appearance-none cursor-pointer pr-10 bg-[length:14px] bg-no-repeat bg-[right_1rem_center]`}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23B8B8B8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\")",
                }}
              >
                {PARENT_TYPES.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <p
                role="alert"
                className="font-body text-error text-sm leading-relaxed"
              >
                {error}
              </p>
            )}

            <div className="pt-3 flex justify-center">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                arrow={!submitting}
                disabled={submitting}
                className={submitting ? 'opacity-60 cursor-not-allowed' : ''}
              >
                {submitting ? 'Sending…' : 'Subscribe'}
              </Button>
            </div>
          </form>
        </div>
      </section>

      <Toast visible={!!toast} message={toast || ''} />
    </>
  );
}
