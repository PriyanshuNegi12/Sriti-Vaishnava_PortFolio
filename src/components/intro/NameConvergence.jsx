import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { COLORS, NAME_WORDS, TIMINGS } from './introConfig';
import { buildLetterVectors } from './introUtils';

/**
 * SCENE 2 (1.2s – 2.6s) — name convergence.
 * Every letter starts off-screen in a random one of 8 directions (+ jitter),
 * with scale 0.6 and a slight blur, and flies to its final place (opacity 0.8).
 * Letters are staggered in a shuffled order; total ≈ 1.2s.
 *
 * Centred text; the overlay places it at the BOTTOM CENTRE of the screen. font-size
 * is a clamp() from config; two nowrap word groups in a wrapping flex row → one
 * line when there is room, two centred lines on phones. Never overflows.
 */
export default function NameConvergence({ active, flying, cfg, vp }) {
  const total = NAME_WORDS.join('').length;
  const [vectors] = useState(() => buildLetterVectors(total, vp.w, vp.h));

  const variants = useMemo(() => {
    const blur = cfg.nameBlur ? `blur(${cfg.nameBlur}px)` : undefined;
    const { duration, step } = TIMINGS.name;
    return {
      hidden: (v) => ({ x: v.x, y: v.y, rotate: v.r, scale: 0.6, opacity: 0, ...(blur && { filter: blur }) }),
      // fly away: every letter exits back the way it came, accelerating
      exit: (v) => ({
        x: v.x,
        y: v.y,
        rotate: -v.r,
        scale: 0.6,
        opacity: 0,
        transition: { duration: 0.7, delay: v.order * 0.012, ease: [0.55, 0, 0.9, 0.5] },
      }),
      show: (v) => ({
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        opacity: 0.8, // final opacity 80%
        ...(blur && { filter: 'blur(0px)' }),
        transition: {
          duration,
          delay: v.order * step,
          ease: [0.16, 1, 0.3, 1], // expo-out: fast arrival, soft landing
          opacity: { duration: duration * 0.6, delay: v.order * step },
        },
      }),
    };
  }, [cfg.nameBlur]);

  let n = 0;
  return (
    <div
      className="flex flex-wrap items-center justify-center text-center font-display font-semibold leading-[1.05]"
      style={{
        fontSize: cfg.nameSize,
        letterSpacing: cfg.nameTracking,
        columnGap: '0.32em',
        color: COLORS.ink,
        maxWidth: '100%',
      }}
    >
      {NAME_WORDS.map((word) => (
        <span key={word} className="inline-flex whitespace-nowrap">
          {[...word].map((ch) => {
            const v = vectors[n++];
            return (
              <motion.span
                key={n}
                className="inline-block"
                custom={v}
                variants={variants}
                initial="hidden"
                animate={flying ? 'exit' : active ? 'show' : 'hidden'}
              >
                {ch}
              </motion.span>
            );
          })}
        </span>
      ))}
    </div>
  );
}
