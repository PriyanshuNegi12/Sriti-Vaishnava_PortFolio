import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, GraduationCap, Scale } from 'lucide-react';
import { SITE } from '../../data/site';
import { useIntroReady } from '../intro/IntroContext';
import Button from '../ui/Button';
import portrait480 from '../../assets/images/sriti-portrait-480.webp';
import portrait720 from '../../assets/images/sriti-portrait-720.webp';

const EASE = [0.22, 1, 0.36, 1];
const item = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.15 + i * 0.12, ease: EASE } }),
};

/**
 * HOME — hero: slogan + portrait.
 * Mobile: portrait on top (so her face is on the very first screen), slogan below.
 * Tablet/desktop: text left, portrait right. Everything animates in as the
 * intro flies away (waits for `ready`).
 */
export default function Hero() {
  const ready = useIntroReady();
  const state = ready ? 'show' : 'hidden';
  const { slogan } = SITE;

  return (
    <section className="relative overflow-hidden">
      {/* soft background shapes (static → free on mobile) */}
      <div aria-hidden className="pointer-events-none absolute -left-28 top-16 h-72 w-72 rounded-full bg-teal-mist/80 sm:h-96 sm:w-96" />
      <div aria-hidden className="pointer-events-none absolute -right-16 bottom-10 h-40 w-40 rounded-full bg-coral-soft sm:h-56 sm:w-56" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-14 pt-6 sm:px-8 md:min-h-[calc(100dvh-4.25rem)] md:grid-cols-[1.08fr_0.92fr] md:gap-8 md:pb-20 md:pt-8">
        {/* text */}
        <div className="order-2 text-center md:order-1 md:text-left">
          <motion.p custom={0} variants={item} initial="hidden" animate={state} className="mb-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-teal">
            <span className="h-px w-8 bg-coral" aria-hidden />
            {SITE.designation} · Dehradun
          </motion.p>

          <motion.h1 custom={1} variants={item} initial="hidden" animate={state} className="font-display text-[clamp(3rem,9.5vw,5.6rem)] md:text-[clamp(3rem,6.4vw,5.6rem)] font-semibold leading-[0.98] text-teal-dark">
            {slogan.before}{' '}
            <span className="relative inline-block">
              {slogan.emphasis}
              <svg viewBox="0 0 200 12" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-[0.28em] w-full" aria-hidden="true">
                <motion.path d="M2 8 Q50 2 100 7 T198 6" fill="none" stroke="#ff6845" strokeWidth="4.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: ready ? 1 : 0 }} transition={{ duration: 0.9, delay: 1, ease: 'easeOut' }} />
              </svg>
            </span>{' '}
            {slogan.after}
          </motion.h1>

          <motion.p custom={2} variants={item} initial="hidden" animate={state} className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-teal-ink/80 sm:text-lg md:mx-0">
            <span className="font-semibold text-teal-dark">{SITE.name}</span> is an advocate practising before the {SITE.court}, working across criminal, family, consumer and revenue matters.
          </motion.p>

          <motion.div custom={3} variants={item} initial="hidden" animate={state} className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            <Button to="/about" icon={ArrowRight}>
              About Sriti
            </Button>
            <Button to="/contact" variant="outline">
              Contact
            </Button>
          </motion.div>

          <motion.ul custom={4} variants={item} initial="hidden" animate={state} className="mt-8 flex flex-wrap justify-center gap-2.5 text-sm font-medium text-teal-dark md:justify-start">
            <li className="inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2 shadow-sm">
              <GraduationCap size={16} className="text-teal" aria-hidden="true" />
              {SITE.qualifications.join(' · ')}
            </li>
            <li className="inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2 shadow-sm">
              <BadgeCheck size={16} className="text-teal" aria-hidden="true" />
              Enrolment No. {SITE.enrolment.number}
            </li>
          </motion.ul>
        </div>

        {/* portrait in an arch frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          className="relative order-1 mx-auto w-[min(68vw,18rem)] sm:w-[min(50vw,21rem)] md:order-2 md:w-[min(40vw,25rem)]"
        >
          <motion.div
            aria-hidden
            className="absolute -inset-3 rounded-t-[999px] rounded-b-[2rem] border-2 border-coral"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={ready ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-teal shadow-[0_30px_60px_-25px_rgba(18,48,45,0.55)]">
            <motion.img
              src={portrait720}
              srcSet={`${portrait480} 480w, ${portrait720} 720w`}
              sizes="(min-width: 768px) 400px, 70vw"
              alt="Adv. Sriti Vaishnava in advocate's robes outside the Dehradun District Courts"
              width="720"
              height="900"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
              initial={{ scale: 1.15 }}
              animate={{ scale: ready ? 1 : 1.15 }}
              transition={{ duration: 1.6, ease: EASE }}
            />
          </div>

          <motion.div
            className="absolute -bottom-5 -left-2 flex items-center gap-3 rounded-2xl bg-paper px-4 py-3 shadow-[0_18px_40px_-18px_rgba(18,48,45,0.5)] sm:-left-10"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: [0, -7, 0] } : { opacity: 0, y: 20 }}
            transition={{ opacity: { duration: 0.6, delay: 1.1 }, y: { duration: 6, delay: 1.4, repeat: Infinity, ease: 'easeInOut' } }}
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-teal text-ivory">
              <Scale size={18} aria-hidden="true" />
            </span>
            <span className="text-left text-xs leading-tight text-teal-ink/70">
              Practising at
              <strong className="block text-sm font-semibold text-teal-dark">{SITE.court}</strong>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
