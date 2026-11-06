import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SITE } from '../../data/site';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

/** HOME — education & experience timeline. The coral line draws itself as you scroll. */
export default function JourneyPreview() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 65%'] });

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <SectionHeading eyebrow="Background" title="Education & experience" />

      <div ref={ref} className="relative mt-12 max-w-3xl pl-10 sm:pl-14">
        <div aria-hidden className="absolute bottom-2 left-[7px] top-2 w-0.5 bg-ivory-deep sm:left-[11px]" />
        <motion.div aria-hidden style={{ scaleY: scrollYProgress }} className="absolute bottom-2 left-[7px] top-2 w-0.5 origin-top bg-coral sm:left-[11px]" />

        <ol className="space-y-9">
          {SITE.timeline.map((t, i) => (
            <li key={t.title + t.when} className="relative">
              <Reveal variant="scale" delay={0.05} className="absolute -left-10 top-1.5 sm:-left-14">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-teal ring-4 ring-ivory sm:h-6 sm:w-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-ivory sm:h-2 sm:w-2" />
                </span>
              </Reveal>
              <Reveal variant="left" delay={i * 0.04}>
                <span className="inline-block rounded-full bg-teal-mist px-3 py-1 text-xs font-semibold tracking-wide text-teal-dark">{t.when}</span>
                <h3 className="mt-2 font-display text-2xl font-semibold text-teal-dark sm:text-3xl">{t.title}</h3>
                <p className="mt-1 text-[0.95rem] leading-relaxed text-teal-ink/75 sm:text-base">{t.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      <Reveal className="mt-12">
        <Button to="/about" variant="outline" icon={ArrowRight}>
          Full background
        </Button>
      </Reveal>
    </section>
  );
}
