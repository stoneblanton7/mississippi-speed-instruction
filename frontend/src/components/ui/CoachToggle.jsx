import { Link, useLocation } from 'react-router-dom';

const TABS = [
  { to: '/about/mike-frascogna', label: 'Mike Frascogna III', match: 'mike-frascogna' },
  { to: '/about/philip-short', label: 'Philip Short', match: 'philip-short' },
];

export default function CoachToggle() {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="Switch coach"
      className="bg-surface border border-border rounded-lg p-1 inline-flex"
    >
      {TABS.map((tab) => {
        const active = pathname.includes(tab.match);
        return (
          <Link
            key={tab.to}
            to={tab.to}
            aria-current={active ? 'page' : undefined}
            className={
              'font-body text-sm font-semibold uppercase tracking-widest px-5 py-2.5 rounded-md transition-colors ' +
              (active
                ? 'bg-accent text-text-inverted'
                : 'text-text-muted hover:text-text')
            }
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
