import useScrollReveal from '../../hooks/useScrollReveal';

export default function Reveal({ children, delay = 0, className = '' }) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={
        'transition-all duration-[600ms] ease-out ' +
        (isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6') +
        (className ? ' ' + className : '')
      }
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
}
