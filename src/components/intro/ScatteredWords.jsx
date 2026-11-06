import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { COLORS, TIMINGS, WORDS } from './introConfig';
import { layoutWords } from './introUtils';

/**
 * SCENE 1+ — scattered word field.
 * Words fade in, then RACE across the whole screen (each one sweeps edge to
 * edge and back, 1.6–3.4s per sweep, GSAP yoyo) and keep moving through the
 * stamp. When `flying` turns true each word is thrown outward from the
 * screen centre (accelerating) while fading out.
 *
 * Three nested layers, one owner each, so libraries never fight over `transform`:
 *   outer div   → position + fixed rotation
 *   motion.span → Framer: fade in
 *   inner span  → GSAP: movement
 */
export default function ScatteredWords({ active, flying, tier, cfg, vp }) {
  const rootRef = useRef(null);
  const tweensRef = useRef([]);
  const portrait = vp.h >= vp.w;
  const layoutKey = `${tier}-${portrait ? 'p' : 'l'}-${cfg.words}`;

  const [seed] = useState(() => (Math.random() * 2 ** 32) >>> 0);
  const [snap, setSnap] = useState({ key: layoutKey, w: vp.w, h: vp.h });
  if (snap.key !== layoutKey) setSnap({ key: layoutKey, w: vp.w, h: vp.h });

  const layout = useMemo(() => {
    const words = Array.from({ length: cfg.words }, (_, i) => WORDS[i % WORDS.length]);
    return layoutWords({ words, w: snap.w, h: snap.h, sizeRange: cfg.wordSize, seed });
  }, [snap, cfg.words, cfg.wordSize, seed]);

  // fast full-screen movement
  useEffect(() => {
    if (!active) return;
    const tweens = [];
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-move]').forEach((el, i) => {
        const it = layout[i];
        if (!it) return;
        // travel range in px, relative to the word's own spot → can reach every part of the screen
        const px = (it.x / 100) * snap.w;
        const py = (it.y / 100) * snap.h;
        // start near one edge, end near the opposite one (long, fast sweeps)
        const ends = (lo, hi) => {
          const span = hi - lo;
          const a = lo + Math.random() * span * 0.3;
          const b = hi - Math.random() * span * 0.3;
          return Math.random() < 0.5 ? [a, b] : [b, a];
        };
        const [x0, x1] = ends(-px, snap.w - px);
        const [y0, y1] = ends(-py, snap.h - py);
        const tw = gsap.fromTo(
          el,
          { x: x0, y: y0 },
          { x: x1, y: y1, duration: gsap.utils.random(cfg.wordSpeed[0], cfg.wordSpeed[1]), ease: 'sine.inOut', yoyo: true, repeat: -1 },
        );
        tw.progress(Math.random());
        tweens.push(tw);
      });
    }, rootRef);
    tweensRef.current = tweens;
    return () => ctx.revert();
  }, [active, layout, snap, cfg.wordSpeed]);

  // fly away: throw every word outward from the screen centre
  useEffect(() => {
    if (!flying) return;
    const W = window.innerWidth;
    const H = window.innerHeight;
    const ctx = gsap.context(() => {
      tweensRef.current.forEach((t) => t.kill());
      gsap.utils.toArray('[data-move]').forEach((el) => {
        const r = el.getBoundingClientRect();
        const dx = r.left + r.width / 2 - W / 2;
        const dy = r.top + r.height / 2 - H / 2;
        const len = Math.hypot(dx, dy) || 1;
        const dist = Math.max(W, H) * 1.1;
        gsap.to(el, {
          x: `+=${(dx / len) * dist}`,
          y: `+=${(dy / len) * dist}`,
          rotation: gsap.utils.random(-60, 60),
          duration: TIMINGS.fly,
          ease: 'power3.in',
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [flying]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {layout.map((it, i) => (
        <div
          key={`${layoutKey}-${i}`}
          className="absolute"
          style={{ left: `${it.x}%`, top: `${it.y}%`, transform: `translate(-50%, -50%) rotate(${it.rot}deg)` }}
        >
          <motion.span
            className="block"
            initial={{ opacity: 0 }}
            animate={{ opacity: active && !flying ? cfg.wordOpacity : 0 }}
            transition={{ duration: flying ? 0.6 : 0.5, delay: flying ? 0.1 : it.delay * 0.7, ease: 'easeOut' }}
          >
            <span
              data-move
              className="block whitespace-nowrap font-display font-semibold"
              style={{ fontSize: it.size, color: it.tone === 'gold' ? COLORS.wordGold : COLORS.wordGrey }}
            >
              {it.text}
            </span>
          </motion.span>
        </div>
      ))}
    </div>
  );
}
