import { Link } from 'react-router-dom';

/**
 * One button for the whole site. Renders a router <Link>, an <a> or a <button>.
 * Hover: a fill sweeps in from the left, the arrow slides, the button lifts.
 * Touch: pressing scales it down slightly (hover effects never "stick" on phones).
 */
const VARIANTS = {
  primary: { base: 'bg-teal text-ivory', sweep: 'bg-teal-dark', shadow: 'hover:shadow-[0_14px_30px_-10px_rgba(23,100,95,0.6)]' },
  accent: { base: 'bg-coral text-teal-ink', sweep: 'bg-[#ff8a6e]', shadow: 'hover:shadow-[0_14px_30px_-10px_rgba(255,104,69,0.7)]' },
  outline: { base: 'border-2 border-teal text-teal', sweep: 'bg-teal', shadow: '', hoverText: 'hover:text-ivory' },
  light: { base: 'bg-ivory text-teal-dark', sweep: 'bg-white', shadow: 'hover:shadow-[0_14px_30px_-10px_rgba(0,0,0,0.45)]' },
  'outline-light': { base: 'border-2 border-ivory/70 text-ivory', sweep: 'bg-ivory', shadow: '', hoverText: 'hover:text-teal-dark' },
};

export default function Button({ variant = 'primary', to, href, icon: Icon, children, className = '', ...rest }) {
  const v = VARIANTS[variant];
  const cls = `group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-[0.95rem] font-semibold transition-[transform,box-shadow,color] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] ${v.base} ${v.shadow} ${v.hoverText ?? ''} ${className}`;
  const inner = (
    <>
      <span aria-hidden className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100 ${v.sweep}`} />
      <span className="relative flex items-center gap-2">
        {children}
        {Icon && <Icon size={18} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />}
      </span>
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>;
  return <button type="button" className={cls} {...rest}>{inner}</button>;
}
