import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone, Scale } from 'lucide-react';
import { SITE } from '../../data/site';
import { InstagramIcon, LinkedInIcon } from '../ui/Icons';
import Reveal from '../ui/Reveal';

const linkHover = 'underline decoration-transparent decoration-2 underline-offset-[6px] transition-[text-decoration-color,color] duration-300 hover:decoration-coral';

export default function Footer() {
  const year = new Date().getFullYear();
  const { enrolment } = SITE;
  const enrolmentLine = ['Enrolment No. ' + enrolment.number, enrolment.date && `Enrolled ${enrolment.date}`, enrolment.council].filter(Boolean).join(' · ');

  return (
    <footer className="relative mt-24 rounded-t-[2rem] bg-teal text-ivory sm:rounded-t-[3rem]" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="mx-auto max-w-6xl px-5 pb-8 pt-14 sm:px-8 sm:pt-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.8fr_1fr] lg:gap-10">
          {/* who */}
          <Reveal>
            <Link to="/" className="group inline-flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-ivory/70 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-12 group-hover:scale-110">
                <Scale size={22} aria-hidden="true" />
              </span>
              <span className="font-display text-2xl font-semibold leading-tight">
                {SITE.displayName}
                <span className="block font-sans text-xs font-medium uppercase tracking-[0.2em] text-ivory/85">{SITE.designation}</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/90">Practising before the {SITE.court}.</p>
          </Reveal>

          {/* contact */}
          <Reveal delay={0.08}>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-ivory/85">Contact</h2>
            <ul className="space-y-3 text-[0.95rem]">
              <li>
                <a href={`mailto:${SITE.contact.email}`} className={`group inline-flex items-start gap-3 break-all ${linkHover}`}>
                  <Mail size={18} className="mt-0.5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
                  {SITE.contact.email}
                </a>
              </li>
              <li>
                <a href={SITE.contact.phoneHref} className={`group inline-flex items-center gap-3 ${linkHover}`}>
                  <Phone size={18} className="shrink-0 transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
                  {SITE.contact.phone}
                </a>
              </li>
              <li>
                <Link to="/contact" className={`group inline-flex items-start gap-3 ${linkHover}`}>
                  <MapPin size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <span>Court Chamber &amp; Home Office, Dehradun</span>
                </Link>
              </li>
            </ul>
          </Reveal>

          {/* pages */}
          <Reveal delay={0.16}>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-ivory/85">Pages</h2>
            <ul className="space-y-1 text-[0.95rem]">
              {SITE.nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="group inline-flex min-h-9 items-center gap-2 transition-transform duration-300 hover:translate-x-1">
                    <span className="h-px w-3 bg-coral transition-all duration-300 group-hover:w-5" aria-hidden />
                    <span className={linkHover}>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* links */}
          <Reveal delay={0.24}>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-ivory/85">Connect</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { href: SITE.social.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
                { href: SITE.social.instagram, label: 'Instagram', Icon: InstagramIcon },
              ].map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`} className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-ivory/40 px-4 text-sm font-medium transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-coral hover:bg-ivory/10 active:scale-95">
                  <Icon size={18} />
                  {label}
                  <ArrowUpRight size={14} className="opacity-60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* bottom bar */}
        <div className="mt-12 border-t border-ivory/20 pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-3xl space-y-2 text-xs leading-relaxed text-ivory/85">
              <p className="font-medium text-ivory/90">{enrolmentLine}</p>
              <p>{SITE.disclaimer}</p>
            </div>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="group grid h-12 w-12 shrink-0 place-items-center self-start rounded-full border border-ivory/40 transition-[background-color,transform] duration-300 hover:-translate-y-1 hover:bg-coral hover:text-teal-ink active:scale-90 sm:self-auto"
            >
              <ArrowUp size={20} className="transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
            </button>
          </div>
          <p className="mt-5 text-sm text-ivory/85">
            © {year} {SITE.displayName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
