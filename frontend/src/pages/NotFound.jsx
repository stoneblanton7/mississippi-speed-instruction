import { Link } from 'react-router-dom';
import Button from '../components/ui/Button.jsx';

export default function NotFound() {
  return (
    <section className="relative bg-bg min-h-[70vh] flex items-center overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-30 gradient-final-glow"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-32">
        <p className="font-mono text-xs text-accent uppercase tracking-[0.4em]">
          Error 404
        </p>
        <h1
          className="font-heading uppercase mt-6 leading-[1.0]"
          style={{ fontSize: 'clamp(64px, 12vw, 180px)' }}
        >
          Off the track.
        </h1>
        <p className="font-body text-text-muted text-lg lg:text-xl mt-8 max-w-2xl leading-relaxed">
          The page you're looking for doesn't exist. Let's get you back to the start line.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Button as={Link} to="/" variant="primary" arrow>
            Back to Home
          </Button>
          <Button as={Link} to="/camp" variant="ghost">
            View the Camps
          </Button>
          <Button as={Link} to="/contact" variant="ghost">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
