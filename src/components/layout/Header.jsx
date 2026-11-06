import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, Menu, Phone, Scale, X } from 'lucide-react';
import { SITE } from '../../data/site';
import useMediaQuery from '../../hooks/useMediaQuery';
import { useIntroReady } from '../intro/IntroContext';

/**
 * Fixed header.
 *  • Inline links  : desktop, AND tablets held horizontally (landscape)
 *  • Drop-down menu: phones, AND tablets held vertically (portrait)
 * It starts transparent and turns solid (with a soft shadow) once you scroll.
 * Safe-area aware (iPhone notch), and the menu button is a 48px touch target.
 */
const INLINE_QUERY = '(min-width: 1024px), (min-width: 768px) and (orientation: landscape)';

const linkCls = ({ isActive }) =>
  `relative px-1 py-2 text-[0.95rem] font-medium transition-colors duration-300 after:absolute after:inset-x-1 after:-bottom-0.5 after:h-[2px] after:origin-left after:bg-coral after:transition-transform after:duration-300 after:ease-[var(--ease-out-expo)] hover:text-teal ${
    isActive ? 'text-teal after:scale-x-100' : 'text-teal-ink/80 after:scale-x-0 hover:after:scale-x-100'
  }`;

const pillCls = ({ isActive }) =>
  `ml-2 inline-flex min-h-11 items-center rounded-full px-5 text-[0.95rem] font-semibold transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-teal-dark hover:shadow-[0_10px_24px_-10px_rgba(23,100,95,0.7)] active:scale-95 ${
    isActive ? 'bg-teal-dark text-ivory' : 'bg-teal text-ivory'
  }`;

export default function Header() {
  const inline = useMediaQuery(INLINE_QUERY);
  const ready = useIntroReady();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuOpen = open && !inline; // rotating to landscape closes the dropdown automatically

  useEffect(() => {
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 8));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const close = () => setOpen(false);
  const solid = scrolled || menuOpen;

  return (
    <>
      {/* tap-outside scrim for the dropdown (below the header bar) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={close}
            className="fixed inset-0 z-40 cursor-default bg-teal-ink/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : { y: -24, opacity: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${solid ? 'bg-ivory/95 shadow-[0_6px_24px_-14px_rgba(18,48,45,0.45)]' : 'bg-transparent'}`}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 transition-[height] duration-300 sm:px-8 ${scrolled ? 'h-[3.75rem]' : 'h-[4.25rem]'}`}
        style={{ paddingLeft: 'max(1.25rem, env(safe-area-inset-left))', paddingRight: 'max(1.25rem, env(safe-area-inset-right))' }}
      >
        {/* left: scales of justice + name */}
        <Link to="/" onClick={close} aria-label={`${SITE.displayName} — home`} className="group flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal text-ivory transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-12 group-hover:scale-110">
            <Scale size={20} aria-hidden="true" />
          </span>
          <span className="truncate font-display text-[1.3rem] font-semibold leading-none text-teal-dark sm:text-2xl">{SITE.displayName}</span>
        </Link>

        {/* right: inline links OR menu button */}
        {inline ? (
          <nav aria-label="Main" className="flex items-center gap-4 lg:gap-6">
            {SITE.nav.map((item, i) =>
              i === SITE.nav.length - 1 ? (
                <NavLink key={item.to} to={item.to} className={pillCls}>
                  {item.label}
                </NavLink>
              ) : (
                <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkCls}>
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>
        ) : (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-teal-dark transition-colors duration-300 hover:bg-teal-mist active:scale-90"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={menuOpen ? 'x' : 'm'} initial={{ rotate: -90, opacity: 0, scale: 0.6 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.6 }} transition={{ duration: 0.2 }} className="grid place-items-center">
                {menuOpen ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
              </motion.span>
            </AnimatePresence>
          </button>
        )}
      </div>

      {/* drop-down panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Main"
            className="absolute inset-x-0 top-full border-t border-ivory-deep bg-ivory shadow-[0_24px_40px_-20px_rgba(18,48,45,0.5)]"
            initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0.6 }}
            animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
            exit={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="mx-auto max-w-6xl px-5 pb-6 pt-3 sm:px-8">
              {SITE.nav.map((item, i) => (
                <motion.li key={item.to} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.05, duration: 0.35 }}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    onClick={close}
                    className={({ isActive }) =>
                      `group flex min-h-14 items-center justify-between border-b border-ivory-deep font-display text-2xl font-semibold transition-colors active:bg-teal-mist/50 ${isActive ? 'text-teal' : 'text-teal-ink'}`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="flex items-center gap-3">
                          <span className={`h-2 w-2 rounded-full transition-all duration-300 ${isActive ? 'scale-100 bg-coral' : 'scale-0 bg-coral group-hover:scale-100'}`} aria-hidden />
                          {item.label}
                        </span>
                      </>
                    )}
                  </NavLink>
                </motion.li>
              ))}
              <motion.li initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-5 grid grid-cols-2 gap-3">
                <a href={SITE.contact.phoneHref} onClick={close} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-teal font-semibold text-ivory transition active:scale-95">
                  <Phone size={18} aria-hidden="true" /> Call
                </a>
                <a href={`mailto:${SITE.contact.email}`} onClick={close} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-teal font-semibold text-teal transition active:scale-95">
                  <Mail size={18} aria-hidden="true" /> Email
                </a>
              </motion.li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
    </>
  );
}
