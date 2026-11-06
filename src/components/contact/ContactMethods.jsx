import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { SITE } from '../../data/site';
import { InstagramIcon, LinkedInIcon } from '../ui/Icons';
import Reveal from '../ui/Reveal';

const card =
  'group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-ivory-deep bg-paper p-6 transition-[transform,box-shadow,background-color,border-color,color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-teal hover:bg-teal hover:text-ivory hover:shadow-[0_28px_54px_-26px_rgba(15,74,70,0.8)] active:scale-[0.98]';
const bubble =
  'grid h-14 w-14 place-items-center rounded-2xl bg-teal text-ivory transition-[background-color,color,transform] duration-300 group-hover:-rotate-6 group-hover:scale-105 group-hover:bg-ivory group-hover:text-teal';

/** CONTACT — call, email and social links as big tappable cards. */
export default function ContactMethods() {
  return (
    <ul className="grid gap-5 sm:grid-cols-3">
      <Reveal as="li">
        <a href={SITE.contact.phoneHref} className={card}>
          <span className={bubble}>
            <Phone size={26} aria-hidden="true" />
          </span>
          <span className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] opacity-70">Call</span>
          <span className="mt-1 font-display text-3xl font-semibold leading-tight">{SITE.contact.phone}</span>
          <span className="mt-2 inline-flex items-center gap-1.5 text-sm opacity-80">
            Tap to call <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </a>
      </Reveal>

      <Reveal as="li" delay={0.08}>
        <a href={`mailto:${SITE.contact.email}`} className={card}>
          <span className={bubble}>
            <Mail size={26} aria-hidden="true" />
          </span>
          <span className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] opacity-70">Email</span>
          <span className="mt-1 break-all font-display text-2xl font-semibold leading-tight sm:text-[1.65rem]">{SITE.contact.email}</span>
          <span className="mt-2 inline-flex items-center gap-1.5 text-sm opacity-80">
            Write an email <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </a>
      </Reveal>

      <Reveal as="li" delay={0.16}>
        <div className="relative flex h-full flex-col rounded-[1.75rem] border border-ivory-deep bg-paper p-6">
          <span className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-teal-ink/70">Find online</span>
          <div className="flex flex-1 flex-col justify-center gap-3">
            {[
              { href: SITE.social.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
              { href: SITE.social.instagram, label: 'Instagram', Icon: InstagramIcon },
            ].map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`} className="group inline-flex min-h-12 items-center justify-between rounded-full border border-teal/25 px-5 font-semibold text-teal-dark transition-[background-color,color,transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-teal hover:bg-teal hover:text-ivory active:scale-95">
                <span className="inline-flex items-center gap-3">
                  <Icon size={20} />
                  {label}
                </span>
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </ul>
  );
}
