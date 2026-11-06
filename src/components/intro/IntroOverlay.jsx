import { useRef } from 'react';
import { motion } from 'framer-motion';
import { COLORS, TIMINGS, stateIndex } from './introConfig';
import ScatteredWords from './ScatteredWords';
import NameConvergence from './NameConvergence';
import LogoStamp from './LogoStamp';

/**
 * The full-screen layer (z-index 100). Purely decorative → aria-hidden.
 * Layers, bottom → top:
 *   backdrop : static near-white gradient. It does NOT shake (so the earthquake
 *              can never expose the page behind it) and fades out on fly-away.
 *   scene    : words + name (bottom centre) + logo stamp (upper centre).
 *              This is what the EARTHQUAKE shakes (transform only).
 *
 * Mobile notes: height is 100dvh (no URL-bar jump), name is lifted above the
 * home indicator with env(safe-area-inset-bottom), touch-action is off so the
 * page can't scroll under the intro, and everything animated is
 * transform/opacity — no blur/backdrop filters.
 */
export default function IntroOverlay({ phase, skipExit, vp, tier, cfg }) {
  const quakeRef = useRef(null);
  const at = (s) => stateIndex(phase) >= stateIndex(s);
  const flying = at('fly');

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[100] w-full overflow-hidden"
      style={{ height: '100dvh', touchAction: 'none', pointerEvents: at('reveal') ? 'none' : 'auto' }}
      initial={{ opacity: 1 }}
      animate={{ opacity: skipExit ? 0 : 1 }}
      transition={{ duration: TIMINGS.skipFade, ease: 'easeOut' }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse at 50% 45%, ${COLORS.bgGlow} 0%, ${COLORS.bg} 58%, ${COLORS.bgEdge} 100%)` }}
        animate={{ opacity: flying ? 0 : 1 }}
        transition={{ duration: 0.5, delay: flying ? 0.2 : 0, ease: 'easeIn' }}
      />

      <div ref={quakeRef} className="absolute inset-0">
        <ScatteredWords active={at('words')} flying={flying} tier={tier} cfg={cfg} vp={vp} />

        {/* logo: upper centre */}
        <div
          className="absolute inset-x-0 flex justify-center"
          style={{ top: `${cfg.logoCenterY * 100}%`, transform: 'translateY(-50%)' }}
        >
          <LogoStamp active={at('stamp')} flying={flying} cfg={cfg} quakeRef={quakeRef} />
        </div>

        {/* name: bottom centre */}
        <div
          className="absolute inset-x-0 flex justify-center"
          style={{ bottom: cfg.nameBottom, paddingInline: 'max(1rem, env(safe-area-inset-left))' }}
        >
          <NameConvergence active={at('name')} flying={flying} cfg={cfg} vp={vp} />
        </div>
      </div>
    </motion.div>
  );
}
