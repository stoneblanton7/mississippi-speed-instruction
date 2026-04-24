import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { REGISTER_LINK_PROPS } from '../../config.js';
import logo from '../../assets/logo.svg';

const TWO_CAMPS_ID = 'two-camps';

const ROUTE_LINKS = [
  { to: '/elements', label: 'Elements' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

function CampNavLink({ onClick, mobile = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const baseClass =
    (mobile
      ? 'font-body text-base uppercase tracking-widest py-2 '
      : 'font-body text-sm uppercase tracking-widest transition-colors ') +
    'text-text hover:text-accent';

  const handleClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(TWO_CAMPS_ID);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      onClick?.();
    } else {
      e.preventDefault();
      onClick?.();
      navigate('/', { state: { scrollTo: TWO_CAMPS_ID } });
    }
  };

  return (
    <a href={`/#${TWO_CAMPS_ID}`} onClick={handleClick} className={baseClass}>
      Camp
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navClass =
    'fixed inset-x-0 top-0 z-50 transition-colors duration-300 ' +
    (scrolled
      ? 'bg-overlay-bottom backdrop-blur border-b border-border'
      : 'bg-transparent');

  return (
    <header className={navClass}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link to="/" className="flex items-center gap-2" aria-label="MSI home">
          <img src={logo} alt="Mississippi Speed Instruction" className="h-8 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <CampNavLink />
          {ROUTE_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                'font-body text-sm uppercase tracking-widest transition-colors ' +
                (isActive ? 'text-accent' : 'text-text hover:text-accent')
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a
            {...REGISTER_LINK_PROPS}
            className="bg-accent text-text-inverted font-body text-sm font-semibold uppercase tracking-widest px-5 py-2.5 rounded-lg transition-colors hover:bg-accent-hover"
          >
            Register
          </a>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden text-text"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-bg">
          <div className="flex flex-col gap-1 px-6 py-4">
            <CampNavLink mobile onClick={() => setMobileOpen(false)} />
            {ROUTE_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  'font-body text-base uppercase tracking-widest py-2 ' +
                  (isActive ? 'text-accent' : 'text-text')
                }
              >
                {link.label}
              </NavLink>
            ))}
            <a
              {...REGISTER_LINK_PROPS}
              onClick={() => setMobileOpen(false)}
              className="mt-3 bg-accent text-text-inverted font-body text-sm font-semibold uppercase tracking-widest px-5 py-3 rounded-lg text-center"
            >
              Register
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
