import { ArrowRight } from 'lucide-react';

const BASE =
  'inline-flex items-center justify-center gap-2 font-body font-semibold uppercase tracking-widest rounded-lg transition-colors duration-200';

const SIZES = {
  sm: 'text-xs px-4 py-2',
  md: 'text-sm px-5 py-3',
  lg: 'text-sm px-7 py-4',
};

const VARIANTS = {
  primary: 'bg-accent text-text-inverted hover:bg-accent-hover active:bg-accent-pressed',
  ghost: 'bg-transparent text-text border border-border-strong hover:border-accent hover:text-accent',
  link: 'bg-transparent text-accent hover:text-accent-hover px-0',
};

export default function Button({
  as: Tag = 'button',
  variant = 'primary',
  size = 'md',
  arrow = false,
  className = '',
  children,
  ...props
}) {
  const cls = `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${className}`;
  return (
    <Tag className={cls} {...props}>
      {children}
      {arrow && <ArrowRight size={16} strokeWidth={2.5} />}
    </Tag>
  );
}
