import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { buildVimeoSrc } from '../../config.js';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, iframe, [tabindex]:not([tabindex="-1"])';

export default function VideoModal({ vimeoId, vimeoHash, title, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!vimeoId) return;

    // Remember what had focus so we can restore it when the modal closes.
    const previouslyFocused = document.activeElement;

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const root = dialogRef.current;
      if (!root) return;
      const focusable = Array.from(root.querySelectorAll(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);

    // Move focus into the modal so keyboard users start inside it.
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [vimeoId, onClose]);

  if (!vimeoId) return null;

  const src = buildVimeoSrc(
    vimeoId,
    { autoplay: 1, title: 0, byline: 0, portrait: 0 },
    vimeoHash
  );

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur flex items-center justify-center p-4"
      role="dialog"
      aria-label={title || 'Video player'}
      aria-modal="true"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        aria-label="Close video"
        onClick={onClose}
        className="absolute top-6 right-6 text-text hover:text-accent transition-colors"
      >
        <X size={28} />
      </button>
      <div
        className="relative w-full max-w-6xl aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={src}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={title || 'Vimeo video'}
        />
      </div>
    </div>
  );
}
