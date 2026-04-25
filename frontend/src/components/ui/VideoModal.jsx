import { useEffect } from 'react';
import { X } from 'lucide-react';
import { buildVimeoSrc } from '../../config.js';

export default function VideoModal({ vimeoId, vimeoHash, title, onClose }) {
  useEffect(() => {
    if (!vimeoId) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
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
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur flex items-center justify-center p-4"
      role="dialog"
      aria-label={title || 'Video player'}
      aria-modal="true"
      onClick={onClose}
    >
      <button
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
