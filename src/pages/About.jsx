import { motion } from 'framer-motion';
import { Award, BadgeCheck, BookOpen, Briefcase, Check, GraduationCap, HandHeart, Languages, Laptop, Presentation, Scale, Trophy } from 'lucide-react';
import { SITE } from '../data/site';
import usePageTitle from '../hooks/usePageTitle';
import { useIntroReady } from '../components/intro/IntroContext';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import ContactBand from '../components/home/ContactBand';
import portrait480 from '../assets/images/sriti-portrait-480.webp';
import portrait720 from '../assets/images/sriti-portrait-720.webp';

const EASE = [0.22, 1, 0.36, 1];
const ACTIVITY_ICONS = { Trophy, Award, HandHeart };
const SEMINAR_ICONS = [Presentation, BookOpen, Scale];

const facts = [
  { Icon: GraduationCap, label: 'Qualifications', value: SITE.qualifications.join(', ') },
  { Icon: BadgeCheck, label: 'Enrolment', value: `No. ${SITE.enrolment.number}` },
  { Icon: Scale, label: 'Practising at', value: SITE.court },
  { Icon: Languages, label: 'Languages', value: SITE.languages.join(', ') },
];

const cardBase =
  'rounded-[1.75rem] border border-ivory-deep bg-paper transition-[transform,box-shadow,border-color] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-teal/30 hover:shadow-[0_24px_46px_-28px_rgba(23,100,95,0.5)]';

function Pill({ children }) {
  return <span className="inline-block rounded-full bg-teal-mist px-3 py-1 text-xs font-semibold tracking-wide text-teal-dark">{children}</span>;
}

/* ---------------- top of the page: intro + portrait ---------------- */
function AboutHero() {
  const ready = useIntroReady();
  const state = ready ? 'show' : 'hidden';
  const item = {
    hidden: { opacity: 0, y: 26 },
    show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.75, delay: 0.1 + i * 0.1, ease: EASE } }),
  };

  return (
    <section className="relative overflow-hidden bg-paper pb-20 sm:pb-24">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-teal-mist/70" />
      <div aria-hidden className="pointer-events-none absolute -bottom-10 left-6 h-28 w-28 rounded-full bg-coral-soft" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 md:grid-cols-[1.15fr_0.85fr] md:gap-12">
        <div className="order-2 md:order-1">
          <motion.p custom={0} variants={item} initial="hidden" animate={state} className="mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-teal">
            <span className="h-px w-8 bg-coral" aria-hidden />
            About
          </motion.p>
          <motion.h1 custom={1} variants={item} initial="hidden" animate={state} className="font-display text-5xl font-semibold leading-[1.02] text-teal-dark sm:text-6xl">
            About Sriti
          </motion.h1>
          <motion.p custom={2} variants={item} initial="hidden" animate={state} className="mt-6 text-base leading-relaxed text-teal-ink/80 sm:text-lg">
            {SITE.about.short}
          </motion.p>
          <motion.p custom={3} variants={item} initial="hidden" animate={state} className="mt-4 text-base leading-relaxed text-teal-ink/80 sm:text-lg">
            {SITE.about.earlier}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 34 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          className="group relative order-1 mx-auto w-[min(76vw,19rem)] md:order-2 md:w-full md:max-w-sm"
        >
          <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] bg-teal transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-4 group-hover:translate-y-4" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-teal-mist">
            <img
              src={portrait720}
              srcSet={`${portrait480} 480w, ${portrait720} 720w`}
              sizes="(min-width: 768px) 384px, 76vw"
              alt="Adv. Sriti Vaishnava in advocate's robes"
              width="720"
              height="900"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- quick facts, overlapping the hero edge ---------------- */
function FactsRow() {
  return (
    <section className="relative z-10 mx-auto -mt-12 max-w-6xl px-5 sm:-mt-14 sm:px-8">
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {facts.map(({ Icon, label, value }, i) => (
          <Reveal as="li" key={label} delay={i * 0.07} className="group flex flex-col gap-3 rounded-3xl bg-ivory p-4 shadow-[0_18px_40px_-24px_rgba(18,48,45,0.5)] ring-1 ring-ivory-deep transition-transform duration-300 hover:-translate-y-1 active:scale-[0.97] sm:p-5">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-teal-mist text-teal transition-[background-color,color,transform] duration-300 group-hover:rotate-6 group-hover:bg-teal group-hover:text-ivory">
              <Icon size={20} aria-hidden="true" />
            </span>
            <span>
              <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-teal-ink/75">{label}</span>
              <span className="block font-display text-lg font-semibold leading-tight text-teal-dark sm:text-xl">{value}</span>
            </span>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/* ---------------- experience ---------------- */
function Experience() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-20 sm:px-8 sm:pt-28">
      <SectionHeading eyebrow="Experience" title="Professional experience" />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {SITE.experience.map((job, i) => (
          <Reveal key={job.role} delay={i * 0.1} className="h-full">
            <article className={`${cardBase} relative h-full overflow-hidden p-6 sm:p-8`}>
              <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-coral" />
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-teal text-ivory">
                  <Briefcase size={22} aria-hidden="true" />
                </span>
                <Pill>{job.when}</Pill>
              </div>
              <h3 className="mt-5 font-display text-3xl font-semibold text-teal-dark">{job.role}</h3>
              <p className="mt-1 text-[0.95rem] font-medium text-teal-ink/70">{job.org}</p>
              <ul className="mt-5 space-y-3">
                {job.points.map((pt, j) => (
                  <Reveal as="li" key={pt} variant="left" delay={0.1 + j * 0.07} className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-teal-ink/85">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-mist text-teal">
                      <Check size={13} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {pt}
                  </Reveal>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- education ---------------- */
function Education() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-20 sm:px-8 sm:pt-28">
      <SectionHeading eyebrow="Education" title="Qualifications" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {SITE.education.map((ed, i) => (
          <Reveal key={ed.degree} delay={i * 0.1} className="h-full">
            <article className={`${cardBase} group relative h-full overflow-hidden p-6 sm:p-8`}>
              <GraduationCap aria-hidden size={140} strokeWidth={1.2} className="absolute -bottom-6 -right-6 text-teal-mist transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-110" />
              <div className="relative">
                <Pill>{ed.when}</Pill>
                <h3 className="mt-4 font-display text-3xl font-semibold leading-tight text-teal-dark">{ed.degree}</h3>
                <p className="mt-2 text-[0.95rem] font-medium text-teal-ink/75">{ed.school}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- seminars + activities ---------------- */
function Seminars() {
  return (
    <section className="mt-20 bg-paper py-16 sm:mt-28 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Learning" title="Seminars & workshops" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {SITE.seminars.map((s, i) => {
            const Icon = SEMINAR_ICONS[i % SEMINAR_ICONS.length];
            return (
              <Reveal key={s.title} delay={i * 0.08} className="h-full">
                <article className={`${cardBase} group h-full bg-ivory p-6`}>
                  <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-teal-mist text-teal transition-[background-color,color,transform] duration-300 group-hover:-rotate-6 group-hover:bg-teal group-hover:text-ivory">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-2xl font-semibold leading-tight text-teal-dark">{s.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-teal-ink/75">{s.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-16">
          <SectionHeading eyebrow="Beyond the classroom" title="Moot court & legal aid" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {SITE.activities.map((a, i) => {
              const Icon = ACTIVITY_ICONS[a.icon];
              return (
                <Reveal key={a.title} delay={i * 0.08} className="h-full">
                  <article className="group relative h-full overflow-hidden rounded-[1.75rem] bg-teal p-6 text-ivory transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-[0_24px_46px_-24px_rgba(15,74,70,0.8)]">
                    <span aria-hidden className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-ivory/10 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[2]" />
                    <div className="relative flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ivory text-teal">
                        <Icon size={22} aria-hidden="true" />
                      </span>
                      <span className="rounded-full border border-ivory/40 px-3 py-1 text-xs font-semibold tracking-wide">{a.when}</span>
                    </div>
                    <h3 className="relative mt-5 font-display text-2xl font-semibold">{a.title}</h3>
                    <p className="relative mt-1.5 text-[0.95rem] leading-relaxed text-ivory/85">{a.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- skills, languages, computer ---------------- */
function Chips({ items, large = false }) {
  return (
    <ul className="flex flex-wrap gap-2.5">
      {items.map((t, i) => (
        <Reveal as="li" key={t} variant="scale" delay={i * 0.05} className={`cursor-default rounded-full border border-teal/25 bg-paper font-medium text-teal-dark transition-[background-color,color,transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-teal hover:bg-teal hover:text-ivory active:scale-95 ${large ? 'px-5 py-2.5 text-[0.95rem]' : 'px-4 py-2 text-sm'}`}>
          {t}
        </Reveal>
      ))}
    </ul>
  );
}

function Skills() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-24">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <SectionHeading eyebrow="Skills" title="How the work gets done" />
          <div className="mt-8">
            <Chips items={SITE.skills} large />
          </div>
        </div>
        <div className="space-y-8">
          <div>
            <h3 className="mb-3 flex items-center gap-2 font-display text-2xl font-semibold text-teal-dark">
              <Languages size={20} className="text-teal" aria-hidden="true" /> Languages
            </h3>
            <Chips items={SITE.languages} />
          </div>
          <div>
            <h3 className="mb-3 flex items-center gap-2 font-display text-2xl font-semibold text-teal-dark">
              <Laptop size={20} className="text-teal" aria-hidden="true" /> Computer skills
            </h3>
            <Chips items={SITE.computer} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  usePageTitle('About', 'About Adv. Sriti Vaishnava — advocate practising before the Dehradun District Court: qualifications, experience, seminars and activities.');
  return (
    <>
      <AboutHero />
      <FactsRow />
      <Experience />
      <Education />
      <Seminars />
      <Skills />
      <div className="mt-20 sm:mt-28">
        <ContactBand />
      </div>
    </>
  );
}
