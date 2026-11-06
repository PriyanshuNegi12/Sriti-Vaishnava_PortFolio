import { motion } from 'framer-motion';

/** Simple animated title block used at the top of inner pages. */
export default function PageHero({ eyebrow, title, text }) {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-mist/70" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 left-10 h-24 w-24 rounded-full bg-coral-soft" />
      <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        {eyebrow && (
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-3 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-teal">
            <span className="h-px w-8 bg-coral" aria-hidden />
            {eyebrow}
          </motion.p>
        )}
        <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl font-display text-5xl font-semibold leading-[1.02] text-teal-dark sm:text-6xl">
          {title}
        </motion.h1>
        {text && (
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="mt-5 max-w-2xl text-base leading-relaxed text-teal-ink/75 sm:text-lg">
            {text}
          </motion.p>
        )}
      </div>
    </section>
  );
}
