import { Link } from 'react-router-dom';
import { Facebook, Instagram } from 'lucide-react';
import { SOCIAL, REGISTER_LINK_PROPS } from '../../config.js';
import logoWhite from '../../assets/logo-white.png';
import thirtyYears from '../../assets/thirty-years-icon.png';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 flex flex-col gap-6">
          <Link to="/" aria-label="MSI home" className="inline-block">
            <img src={logoWhite} alt="Mississippi Speed Instruction" className="h-10 w-auto" />
          </Link>
          <p className="font-body text-text-muted max-w-md leading-relaxed">
            Three days. Ten elements. One faster athlete. Speed, agility, and quickness training in
            Madison, Mississippi since 1993.
          </p>
          <a
            {...REGISTER_LINK_PROPS}
            className="self-start bg-accent text-text-inverted font-body text-sm font-semibold uppercase tracking-widest px-5 py-2.5 rounded-lg transition-colors hover:bg-accent-hover"
          >
            Register for Camp
          </a>
        </div>

        <div>
          <p className="font-mono text-xs text-text-dim uppercase tracking-widest mb-4">Site</p>
          <ul className="flex flex-col gap-3 font-body text-text">
            <li><Link to="/camp" className="hover:text-accent transition-colors">Camp</Link></li>
            <li><Link to="/elements" className="hover:text-accent transition-colors">Elements</Link></li>
            <li><Link to="/about" className="hover:text-accent transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs text-text-dim uppercase tracking-widest mb-4">Coaches</p>
          <ul className="flex flex-col gap-3 font-body text-text">
            <li>
              <Link to="/about/mike-frascogna" className="hover:text-accent transition-colors">
                Mike Frascogna III
              </Link>
            </li>
            <li>
              <Link to="/about/phillip-short" className="hover:text-accent transition-colors">
                Phillip Short
              </Link>
            </li>
          </ul>
          <div className="mt-8 flex items-center gap-4">
            <a
              href={SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-text-muted hover:text-accent transition-colors"
            >
              <Facebook size={20} />
            </a>
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-text-muted hover:text-accent transition-colors"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-text-dim uppercase tracking-widest">
            Mississippi Speed Instruction · Est. 1993
          </p>
          <img src={thirtyYears} alt="30 years of speed" className="h-12 w-auto opacity-70" />
        </div>
      </div>
    </footer>
  );
}
