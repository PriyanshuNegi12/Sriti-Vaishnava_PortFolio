import { ArrowRight } from 'lucide-react';
import { SITE } from '../../data/site';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import { PRACTICE_ICONS } from '../ui/practiceIcons';

/** HOME — the six areas of practice as cards, linking to the full page. */
export default function PracticePreview() {
  return (
    <section className="bg-paper py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Practice areas" title="Areas of practice" text={`Matters handled at the ${SITE.court} and related documentation work.`} />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SITE.practiceAreas.map((area, i) => {
            const Icon = PRACTICE_ICONS[area.icon];
            return (
              <Reveal key={area.id} delay={(i % 3) * 0.08} className="h-full">
                <article className="group relative h-full overflow-hidden rounded-[1.75rem] border border-ivory-deep bg-ivory p-6 transition-[transform,box-shadow,border-color] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-teal/40 hover:shadow-[0_26px_50px_-28px_rgba(23,100,95,0.55)] active:scale-[0.98] sm:p-7">
                  <span aria-hidden className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-coral-soft transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[2.2]" />
                  <span className="relative mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-teal text-ivory transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                    <Icon size={26} aria-hidden="true" />
                  </span>
                  <h3 className="relative font-display text-2xl font-semibold text-teal-dark">{area.title}</h3>
                  <p className="relative mt-2 text-[0.95rem] leading-relaxed text-teal-ink/75">{area.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 flex justify-center sm:justify-start">
          <Button to="/practice-areas" variant="outline" icon={ArrowRight}>
            View all practice areas
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
