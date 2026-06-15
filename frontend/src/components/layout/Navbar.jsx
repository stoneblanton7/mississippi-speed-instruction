import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import NavDropdown from './NavDropdown.jsx';
import { REGISTER_LINK_PROPS } from '../../config.js';
import logo from '../../assets/logo.svg';

const CAMP_ITEMS = [
  { label: 'Boys Camp', path: '/camp/boys' },
  { label: 'Girls Camp', path: '/camp/girls' },
];

const ABOUT_ITEMS = [
  { label: 'Mike Frascogna III', path: '/about/mike-frascogna' },
  { label: 'Philip Short', path: '/about/philip-short' },
];

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

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className={navClass}>
      <nav className="flex h-20 w-full items-center justify-between px-6 lg:px-12 xl:px-20 2xl:px-32">
        <Link to="/" className="flex items-center gap-2" aria-label="MSI home">
          <img src={logo} alt="Mississippi Speed Instruction" className="h-14 md:h-16 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <NavDropdown label="Camp" items={CAMP_ITEMS} />
          <NavLink
            to="/podcast"
            className={({ isActive }) =>
              'font-body text-base uppercase tracking-widest transition-colors ' +
              (isActive ? 'text-accent' : 'text-text hover:text-accent')
            }
          >
            Podcast
          </NavLink>
          <NavLink
            to="/videos"
            className={({ isActive }) =>
              'font-body text-base uppercase tracking-widest transition-colors ' +
              (isActive ? 'text-accent' : 'text-text hover:text-accent')
            }
          >
            Videos
          </NavLink>
          <NavLink
            to="/elements"
            className={({ isActive }) =>
              'font-body text-base uppercase tracking-widest transition-colors ' +
              (isActive ? 'text-accent' : 'text-text hover:text-accent')
            }
          >
            Elements
          </NavLink>
          <NavDropdown label="About" items={ABOUT_ITEMS} />
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              'font-body text-base uppercase tracking-widest transition-colors ' +
              (isActive ? 'text-accent' : 'text-text hover:text-accent')
            }
          >
            Contact
          </NavLink>
          <a
            {...REGISTER_LINK_PROPS}
            className="bg-accent text-text-inverted font-body text-base font-semibold uppercase tracking-widest px-6 py-3 rounded-lg transition-colors hover:bg-accent-hover"
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
          <div className="flex flex-col gap-4 px-6 py-5">
            <MobileGroup label="Camp" items={CAMP_ITEMS} onItemClick={closeMobile} />
            <NavLink
              to="/podcast"
              onClick={closeMobile}
              className={({ isActive }) =>
                'font-body text-base uppercase tracking-widest py-2 ' +
                (isActive ? 'text-accent' : 'text-text')
              }
            >
              Podcast
            </NavLink>
            <NavLink
              to="/videos"
              onClick={closeMobile}
              className={({ isActive }) =>
                'font-body text-base uppercase tracking-widest py-2 ' +
                (isActive ? 'text-accent' : 'text-text')
              }
            >
              Videos
            </NavLink>
            <NavLink
              to="/elements"
              onClick={closeMobile}
              className={({ isActive }) =>
                'font-body text-base uppercase tracking-widest py-2 ' +
                (isActive ? 'text-accent' : 'text-text')
              }
            >
              Elements
            </NavLink>
            <MobileGroup label="About" items={ABOUT_ITEMS} onItemClick={closeMobile} />
            <NavLink
              to="/contact"
              onClick={closeMobile}
              className={({ isActive }) =>
                'font-body text-base uppercase tracking-widest py-2 ' +
                (isActive ? 'text-accent' : 'text-text')
              }
            >
              Contact
            </NavLink>
            <a
              {...REGISTER_LINK_PROPS}
              onClick={closeMobile}
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

function MobileGroup({ label, items, onItemClick }) {
  return (
    <div className="border-l-2 border-border pl-4">
      <p className="font-body text-text text-base uppercase tracking-widest mb-2">
        {label}
      </p>
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={onItemClick}
          className={({ isActive }) =>
            'block py-2 font-body text-sm uppercase tracking-widest ' +
            (isActive ? 'text-accent' : 'text-text-muted hover:text-accent')
          }
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );
}
