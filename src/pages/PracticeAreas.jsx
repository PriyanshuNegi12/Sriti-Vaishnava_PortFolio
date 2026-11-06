import { Check, MapPin, Scale } from 'lucide-react';
import { SITE } from '../data/site';
import usePageTitle from '../hooks/usePageTitle';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import ContactBand from '../components/home/ContactBand';
import { PRACTICE_ICONS } from '../components/ui/practiceIcons';

/** Row of "jump to" chips. On phones it scrolls sideways inside its own box (the page never does). */
function JumpChips() {
  return (
    <nav aria-label="Jump to a practice area" className="mx-auto max-w-6xl px-5 pt-8 sm:px-8">
      <ul className="-mx-5 flex snap-x gap-2.5 overflow-x-auto px-5 pb-3 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {SITE.practiceAreas.map((a, i) => {
          const Icon = PRACTICE_ICONS[a.icon];
          return (
            <Reveal as="li" key={a.id} variant="up" delay={i * 0.05} className="shrink-0 snap-start">
              <a href={`#${a.id}`} className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-teal/25 bg-paper px-4 text-sm font-medium text-teal-dark transition-[background-color,color,transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-teal hover:bg-teal hover:text-ivory active:scale-95">
                <Icon size={16} aria-hidden="true" />
                {a.title}
              </a>
            </Reveal>
          );
        })}
      </ul>
    </nav>
  );
}

function AreaCard({ area, index }) {
  const Icon = PRACTICE_ICONS[area.icon];
  return (
    <Reveal as="article" delay={(index % 2) * 0.1} className="h-full">
      <div id={area.id} className="group relative h-full overflow-hidden rounded-[2rem] border border-ivory-deep bg-paper p-6 transition-[transform,box-shadow,border-color] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-teal/40 hover:shadow-[0_28px_54px_-30px_rgba(23,100,95,0.6)] sm:p-8">
        {/* big faint number + soft coral circle that grows on hover */}
        <span aria-hidden className="pointer-events-none absolute right-6 top-3 select-none font-display text-7xl font-semibold leading-none text-teal-mist transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:scale-110 sm:text-8xl">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span aria-hidden className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-coral-soft transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[2.4]" />

        <div className="relative flex h-full flex-col">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-teal text-ivory transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
            <Icon size={26} aria-hidden="true" />
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-teal-dark sm:text-4xl">{area.title}</h2>
          <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-teal-ink/75 sm:text-base">{area.text}</p>

          <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-teal-ink/75">Work includes</h3>
          <ul className="mb-6 mt-3 space-y-2.5">
            {area.includes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-teal-ink/85">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-mist text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-ivory">
                  <Check size={13} strokeWidth={3} aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-auto inline-flex items-start gap-2 self-start rounded-2xl bg-ivory px-3.5 py-2 text-xs font-semibold text-teal-dark ring-1 ring-ivory-deep">
            <MapPin size={14} className="mt-0.5 shrink-0 text-teal" aria-hidden="true" />
            <span>
              <span className="font-medium text-teal-ink/75">Usually handled at: </span>
              {area.forum}
            </span>
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export default function PracticeAreas() {
  usePageTitle('Practice Areas', 'Areas of practice of Adv. Sriti Vaishnava, Dehradun: criminal, family and matrimonial, consumer, revenue, property registry and marriage registration matters.');
  return (
    <>
      <PageHero
        eyebrow="Practice areas"
        title="Areas of practice"
        text={`Matters handled at the ${SITE.court}, along with property and marriage-related documentation work.`}
      />
      <JumpChips />

      <section className="mx-auto max-w-6xl px-5 pt-8 sm:px-8 sm:pt-10">
        <div className="grid gap-6 lg:grid-cols-2">
          {SITE.practiceAreas.map((area, i) => (
            <AreaCard key={area.id} area={area} index={i} />
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="flex items-start gap-4 rounded-[1.75rem] bg-teal-mist/60 p-5 sm:p-6">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-teal text-ivory">
              <Scale size={20} aria-hidden="true" />
            </span>
            <p className="text-sm leading-relaxed text-teal-ink/80">{SITE.disclaimer}</p>
          </div>
        </Reveal>
      </section>

      <div className="mt-20 sm:mt-28">
        <ContactBand />
      </div>
    </>
  );
}
