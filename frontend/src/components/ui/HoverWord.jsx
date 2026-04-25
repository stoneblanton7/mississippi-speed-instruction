export default function HoverWord({ children, className = '' }) {
  return (
    <span className={`hover-word inline-block relative ${className}`}>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className="hover-word-overlay absolute inset-0 text-accent overflow-hidden whitespace-nowrap"
      >
        {children}
      </span>
    </span>
  );
}
