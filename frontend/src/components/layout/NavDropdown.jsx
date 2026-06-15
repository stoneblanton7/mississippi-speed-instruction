import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

export default function NavDropdown({ label, items }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const { pathname } = useLocation();

  const isActive = items.some((item) => pathname.startsWith(item.path));

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
        className={
          'inline-flex items-center gap-1.5 font-body text-base uppercase tracking-widest transition-colors ' +
          (isActive ? 'text-accent' : 'text-text hover:text-accent')
        }
      >
        {label}
        <ChevronDown
          size={14}
          strokeWidth={2.5}
          className={
            'transition-transform duration-200 ' + (open ? 'rotate-180' : '')
          }
        />
      </button>

      <div
        role="menu"
        className={
          'absolute top-full left-0 mt-3 min-w-[220px] bg-surface border border-border rounded-sm shadow-2xl py-2 transition-all duration-200 origin-top ' +
          (open
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none')
        }
      >
        {items.map((item) => {
          const itemActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              role="menuitem"
              onClick={() => setOpen(false)}
              className={
                'block px-5 py-3 font-body text-sm uppercase tracking-wide transition-colors ' +
                (itemActive
                  ? 'text-accent bg-accent-soft'
                  : 'text-text-muted hover:text-accent hover:bg-surface-elevated')
              }
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
