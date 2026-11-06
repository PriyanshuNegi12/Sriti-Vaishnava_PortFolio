import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { COLORS, TIMINGS } from './introConfig';

/* ------------------------------------------------------------------ */
/* The ADVOCACY emblem, drawn as SVG: laurel wreath + scales of        */
/* justice + stars + wordmark. Built from code so it stays crisp at    */
/* any size and weighs almost nothing.                                 */
/* ------------------------------------------------------------------ */
const VB = { w: 300, h: 310 };
const CX = 150;
const CY = 118;
const R = 90;

// One laurel branch (left side); the right side is a mirrored copy.
const LEAVES = (() => {
  const out = [];
  const n = 15;
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const th = ((98 + t * 150) * Math.PI) / 180; // bottom → near the top
    const x = CX + R * Math.cos(th);
    const y = CY + R * Math.sin(th);
    const tangent = Math.atan2(Math.cos(th), -Math.sin(th)); // direction of travel along the arc
    const len = 31 - 12 * t; // leaves shrink toward the tip
    for (const side of [-1, 1]) out.push({ x, y, len, deg: ((tangent + side * 0.62) * 180) / Math.PI });
  }
  const end = out[out.length - 1];
  out.push({ x: end.x, y: end.y, len: 15, deg: ((Math.atan2(Math.cos(4.36), -Math.sin(4.36))) * 180) / Math.PI });
  return out;
})();

const leafPath = (l) =>
  `M0 0 C${l * 0.3} ${-l * 0.32} ${l * 0.75} ${-l * 0.28} ${l} 0 C${l * 0.75} ${l * 0.28} ${l * 0.3} ${l * 0.32} 0 0Z`;

const arcPt = (deg) => {
  const th = (deg * Math.PI) / 180;
  return `${(CX + R * Math.cos(th)).toFixed(1)} ${(CY + R * Math.sin(th)).toFixed(1)}`;
};

const star = (cx, cy, r) =>
  Array.from({ length: 10 }, (_, i) => {
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const rr = i % 2 ? r * 0.42 : r;
    return `${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`;
  }).join(' ');

function Branch() {
  return (
    <g>
      <path d={`M${arcPt(92)} A${R} ${R} 0 0 1 ${arcPt(250)}`} fill="none" stroke={COLORS.navy} strokeWidth="2.4" strokeLinecap="round" />
      {LEAVES.map((l, i) => (
        <path key={i} d={leafPath(l.len)} transform={`translate(${l.x.toFixed(1)} ${l.y.toFixed(1)}) rotate(${l.deg.toFixed(1)})`} fill={COLORS.navy} />
      ))}
    </g>
  );
}

function Pan({ x }) {
  return (
    <g>
      <path d={`M${x} 82 L${x - 14} 124 M${x} 82 L${x + 14} 124`} stroke={COLORS.navy} strokeWidth="1.6" fill="none" />
      <path d={`M${x - 20} 124 Q${x} 144 ${x + 20} 124 Z`} fill={COLORS.navy} />
    </g>
  );
}

function Emblem() {
  return (
    <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="absolute inset-0 h-full w-full overflow-visible" focusable="false">
      <Branch />
      <g transform={`translate(${CX * 2} 0) scale(-1 1)`}>
        <Branch />
      </g>

      {/* scales of justice */}
      <g fill={COLORS.navy} stroke="none">
        <circle cx="150" cy="52" r="6" />
        <path d="M146.5 58 L153.5 58 L155.5 150 L144.5 150 Z" />
        <rect x="140" y="72" width="20" height="5" rx="2" />
        <path d="M128 150 L172 150 L178 168 L122 168 Z" />
        <rect x="108" y="168" width="84" height="9" rx="2.5" />
      </g>
      <path d="M100 82 Q150 64 200 82" fill="none" stroke={COLORS.navy} strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="100" cy="82" r="3.6" fill={COLORS.navy} />
      <circle cx="200" cy="82" r="3.6" fill={COLORS.navy} />
      <Pan x={100} />
      <Pan x={200} />

      {/* wordmark */}
      <polygon points={star(30, 279, 11)} fill={COLORS.navy} />
      <polygon points={star(270, 279, 11)} fill={COLORS.navy} />
      <text x="150" y="291" textAnchor="middle" fontSize="35" letterSpacing="3" fill={COLORS.navy} className="font-display" fontWeight="600">
        ADVOCACY
      </text>
    </svg>
  );
}

/**
 * SCENE 3 — STAMP.
 * The emblem starts huge, tilted and invisible (as if held close to the
 * camera) and is slammed down onto the page: accelerating drop (power4.in),
 * a soft shadow tightening beneath it, then at the exact landing frame:
 *   • squash + springy settle (pressed into paper)
 *   • EARTHQUAKE: the whole scene rumbles with a decaying random shake
 *   • expanding shockwave ring + a burst of ink dots (cfg.ink, 0 on low-end)
 * SCENE 4 — when `flying` turns true the emblem lifts away up and off-screen.
 *
 * Everything is transform/opacity only. Quake strength and dot count are
 * read from cfg at impact time (ref) so a resize never rebuilds the timeline.
 */
export default function LogoStamp({ active, flying, cfg, quakeRef }) {
  const boxRef = useRef(null);
  const logoRef = useRef(null);
  const shadowRef = useRef(null);
  const ringRef = useRef(null);
  const inkRefs = useRef([]);
  const tlRef = useRef(null);
  const cfgRef = useRef(cfg);

  useEffect(() => {
    cfgRef.current = cfg;
  });

  useEffect(() => {
    const S = TIMINGS.stamp;
    const logo = logoRef.current;
    const shadow = shadowRef.current;
    const ring = ringRef.current;
    const ink = inkRefs.current.filter(Boolean);
    const quakeEl = quakeRef.current;

    gsap.set(logo, { opacity: 0, scale: S.fromScale, rotation: -8 });
    gsap.set(shadow, { opacity: 0, scale: 1.9 });
    gsap.set(ring, { xPercent: -50, yPercent: -50, scale: 0.9, opacity: 0 });
    gsap.set(ink, { xPercent: -50, yPercent: -50, opacity: 0 });

    const impact = () => {
      const c = cfgRef.current;

      // EARTHQUAKE — decaying random rumble of the whole scene
      if (quakeEl) {
        const A = c.quake;
        const steps = Math.round(S.quake / 0.05);
        gsap.killTweensOf(quakeEl);
        const q = gsap.timeline();
        q.to(quakeEl, { y: A, duration: 0.04, ease: 'power2.out' }); // the initial thump
        for (let i = 0; i < steps; i++) {
          const a = A * Math.pow(1 - i / steps, 1.6);
          q.to(quakeEl, {
            x: (Math.random() * 2 - 1) * a,
            y: (Math.random() * 2 - 1) * a,
            rotation: (Math.random() * 2 - 1) * a * 0.05,
            duration: 0.05,
            ease: 'none',
          });
        }
        q.to(quakeEl, { x: 0, y: 0, rotation: 0, duration: 0.06 });
      }

      // shockwave ring
      gsap.fromTo(ring, { scale: 0.9, opacity: 0.5 }, { scale: c.ringScale, opacity: 0, duration: 0.55, ease: 'power2.out', overwrite: 'auto' });

      // ink splatter: dots burst out from the rim of the emblem
      const w = boxRef.current.offsetWidth;
      ink.slice(0, c.ink).forEach((el, i, arr) => {
        const a = (i / arr.length) * Math.PI * 2 + gsap.utils.random(-0.2, 0.2);
        const d = w * gsap.utils.random(0.12, 0.34);
        gsap.fromTo(
          el,
          { x: Math.cos(a) * w * 0.4, y: Math.sin(a) * w * 0.4, scale: 1, opacity: 0.8 },
          { x: Math.cos(a) * (w * 0.4 + d), y: Math.sin(a) * (w * 0.4 + d), scale: 0.3, opacity: 0, duration: gsap.utils.random(0.4, 0.7), ease: 'power2.out', overwrite: 'auto' },
        );
      });
    };

    const tl = gsap.timeline({ paused: true });
    tl.to(logo, { opacity: 1, duration: S.descent * 0.55, ease: 'power1.out' }, 0);
    tl.to(logo, { scale: 1, rotation: 0, duration: S.descent, ease: 'power4.in' }, 0); // accelerating drop
    tl.to(shadow, { opacity: 0.55, scale: 1.02, duration: S.descent, ease: 'power4.in' }, 0);
    tl.call(impact, null, S.descent); // exact landing frame
    tl.to(logo, { scale: S.squash, duration: 0.06, ease: 'power2.out' }, S.descent);
    tl.to(logo, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.35)' }, S.descent + 0.06);
    tl.to(shadow, { opacity: 0, duration: 0.4, ease: 'power2.out' }, S.descent + 0.05);

    tlRef.current = tl;
    return () => {
      tl.kill();
      gsap.killTweensOf([logo, shadow, ring, quakeEl, ...ink]);
    };
  }, [quakeRef]);

  useEffect(() => {
    if (active) tlRef.current?.play();
  }, [active]);

  // fly away: lift up and off-screen, growing slightly, spinning a touch
  useEffect(() => {
    if (!flying) return;
    const tw = gsap.to(logoRef.current, {
      y: -window.innerHeight * 0.8,
      scale: 1.35,
      rotation: 7,
      opacity: 0,
      duration: TIMINGS.fly,
      ease: 'power3.in',
    });
    return () => tw.kill();
  }, [flying]);

  return (
    <div ref={boxRef} className="relative shrink-0" style={{ width: cfg.logoWidth, aspectRatio: `${VB.w} / ${VB.h}` }}>
      {/* soft contact shadow that tightens as the stamp comes down */}
      <div
        ref={shadowRef}
        className="pointer-events-none absolute"
        style={{ inset: '-8%', background: `radial-gradient(closest-side, ${COLORS.navyShadow}, transparent)`, opacity: 0 }}
      />
      <div ref={logoRef} className="absolute inset-0" style={{ opacity: 0 }}>
        <Emblem />
      </div>

      <div
        ref={ringRef}
        className="pointer-events-none absolute rounded-full"
        style={{ left: '50%', top: '42%', width: '86%', aspectRatio: '1', border: `2px solid ${COLORS.navy}`, opacity: 0 }}
      />
      {Array.from({ length: 14 }, (_, i) => (
        <span
          key={i}
          ref={(el) => (inkRefs.current[i] = el)}
          className="pointer-events-none absolute rounded-full"
          style={{ left: '50%', top: '42%', width: i % 3 ? 5 : 8, height: i % 3 ? 5 : 8, background: COLORS.navy, opacity: 0 }}
        />
      ))}
    </div>
  );
}
