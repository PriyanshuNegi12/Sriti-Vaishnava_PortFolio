import { ArrowRight, BadgeCheck, GraduationCap, Languages, Scale } from 'lucide-react';
import { SITE } from '../../data/site';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

const facts = [
  { Icon: GraduationCap, label: 'Qualifications', value: SITE.qualifications.join(', ') },
  { Icon: Scale, label: 'Practising at', value: SITE.court },
  { Icon: BadgeCheck, label: 'Enrolment', value: `No. ${SITE.enrolment.number}` },
  { Icon: Languages, label: 'Languages', value: SITE.languages.join(', ') },
];

/** HOME — short "about" with a quick-facts card and a button to the full About page. */
export default function AboutBrief() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <div>
          <SectionHeading eyebrow="About" title="About Sriti" />
          <Reveal delay={0.12}>
            <p className="mt-5 text-base leading-relaxed text-teal-ink/80 sm:text-lg">{SITE.about.short}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-4 text-base leading-relaxed text-teal-ink/80 sm:text-lg">{SITE.about.earlier}</p>
          </Reveal>
          <Reveal delay={0.24} className="mt-8">
            <Button to="/about" icon={ArrowRight}>
              Read more
            </Button>
          </Reveal>
        </div>

        <Reveal variant="right" delay={0.1}>
          <ul className="divide-y divide-ivory-deep rounded-[2rem] bg-paper p-3 shadow-[0_24px_50px_-30px_rgba(18,48,45,0.45)] sm:p-4">
            {facts.map(({ Icon, label, value }) => (
              <li key={label} className="group flex items-center gap-4 rounded-2xl p-4 transition-colors duration-300 hover:bg-teal-mist/60">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-teal-mist text-teal transition-[background-color,color,transform] duration-300 group-hover:rotate-6 group-hover:bg-teal group-hover:text-ivory">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-teal-ink/75">{label}</span>
                  <span className="block font-display text-xl font-semibold text-teal-dark">{value}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
