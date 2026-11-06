/**
 * introConfig.js — the ONE place to tune the intro.
 * Every timing, colour and responsive value lives here; components only read from it.
 */

/* ------------------------------------------------------------------ */
/* State machine order: idle → words → name → stamp → fly → reveal → done */
/* ------------------------------------------------------------------ */
export const STATES = ['idle', 'words', 'name', 'stamp', 'fly', 'reveal', 'done'];
export const stateIndex = (s) => STATES.indexOf(s);

export const SESSION_KEY = 'sriti-intro-seen';

/* ------------------------------------------------------------------ */
/* Colours — ivory stage, deep-teal name + logo, coral words            */
/* ------------------------------------------------------------------ */
export const COLORS = {
  bg: '#f3eee8', // ivory
  bgGlow: '#fbf8f3',
  bgEdge: '#e7dfd3',
  ink: '#0f3f3b', // name (deep teal ink)
  wordGold: '#ff6845', // coral words
  wordGrey: '#17645f', // teal words
  navy: '#17645f', // logo (teal)
  navyShadow: 'rgba(15,63,59,0.34)', // soft shadow under the descending stamp
};

/* ------------------------------------------------------------------ */
/* Timings (seconds)                                                   */
/*   Scene 1 words   0.0 → 1.2   words race across the screen          */
/*   Scene 2 name    1.2 → 2.4   name letters fly in (bottom centre)   */
/*   Scene 3 stamp   2.8 → 3.3   logo slams down from the viewer       */
/*                   3.3 → 4.1   IMPACT: earthquake + ink burst        */
/*   Scene 4 fly     4.3 → 5.1   everything flies away                 */
/*   Scene 5 reveal  4.55 → 5.25 site fades in underneath              */
/* ------------------------------------------------------------------ */
export const TIMINGS = {
  fontWait: 900, // ms — max wait for the display font before starting
  nameStart: 1.2,
  stampStart: 2.8,

  name: {
    duration: 0.64, // per letter
    step: 0.04, // stagger → 13 steps*0.04 + 0.64 ≈ 1.16s total
  },

  stamp: {
    descent: 0.5, // logo drops from scale 2.6 → 1 (accelerating)
    fromScale: 2.6,
    squash: 0.93, // pressed-into-paper squash at impact
    quake: 0.8, // earthquake duration (decaying)
    hold: 1.0, // impact → everything flies away (time to read the logo)
  },

  fly: 0.8, // length of the fly-away
  revealDelay: 0.25, // fly start → site starts revealing
  revealDuration: 0.7,
  skipFade: 0.4, // when the user skips (Esc / Enter)
};

/** When the fly-away starts (seconds from the start of the words scene). */
export const FLY_START = TIMINGS.stampStart + TIMINGS.stamp.descent + TIMINGS.stamp.hold; // 4.3s

/* ------------------------------------------------------------------ */
/* Words for Scene 1 (ordered by importance — mobile uses the first N) */
/* ------------------------------------------------------------------ */
export const WORDS = [
  'Advocate', 'Legal Consultant', 'LLB', 'LLM', 'Dehradun', 'SRITI', 'Lawyer',
  'Justice', 'Counsel', 'Law', 'Court', 'Verdict', 'Rights', 'Bar Council',
];

export const NAME_WORDS = ['Adv.', 'Sriti', 'Vaishnava'];

/* ------------------------------------------------------------------ */
/* Responsive config — mobile-first, enhanced for tablet and desktop.  */
/*   mobile  : shortest side < 560px (phones, portrait AND landscape)  */
/*   tablet  : width < 1024px                                          */
/*   desktop : everything else                                         */
/* ------------------------------------------------------------------ */
const SHARED = {
  logoWidth: 'min(84vw, 54dvh)', // fits portrait phones (width-limited) and landscape/desktop (height-limited)
  logoCenterY: 0.38, // logo centre as a fraction of screen height (upper area)
  nameBottom: 'max(2rem, calc(7dvh + env(safe-area-inset-bottom)))', // name sits at the bottom centre
};

export const BREAKPOINT_CONFIG = {
  mobile: {
    ...SHARED,
    words: 10,
    wordSize: [12, 19],
    wordOpacity: 0.22,
    wordSpeed: [1.6, 3.0], // seconds per sweep across the screen (lower = faster)
    nameSize: 'clamp(2.5rem, 15vw, 4.75rem)', // wraps to 2 lines on phones
    nameTracking: '0.01em',
    nameBlur: 3, // fly-in blur
    quake: 9, // earthquake strength in px
    ink: 8, // ink-splatter dots on impact
    ringScale: 1.7,
    revealBlur: 0, // no full-page blur on phones
  },
  tablet: {
    ...SHARED,
    words: 16,
    wordSize: [14, 26],
    wordOpacity: 0.22,
    wordSpeed: [1.7, 3.2],
    nameSize: 'clamp(3.75rem, 9vw, 6rem)',
    nameTracking: '0.03em',
    nameBlur: 5,
    quake: 13,
    ink: 10,
    ringScale: 1.6,
    revealBlur: 4,
  },
  desktop: {
    ...SHARED,
    words: 22,
    wordSize: [16, 34],
    wordOpacity: 0.22,
    wordSpeed: [1.8, 3.4],
    nameSize: 'clamp(5rem, 7.2vw, 8.5rem)',
    nameTracking: '0.05em',
    nameBlur: 6,
    quake: 17,
    ink: 14,
    ringScale: 1.5,
    revealBlur: 8,
  },
};

/* Low-end devices keep the same story beats but drop the costly extras. */
const LOW_END_OVERRIDES = (cfg) => ({
  words: Math.max(8, Math.round(cfg.words * 0.7)),
  ink: 0,
  nameBlur: 0,
  revealBlur: 0,
  quake: cfg.quake * 0.75,
});

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
export function getTier(w, h) {
  if (Math.min(w, h) < 560) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

export function isLowEndDevice() {
  if (typeof navigator === 'undefined') return false;
  const mem = navigator.deviceMemory;
  const cores = navigator.hardwareConcurrency;
  const saveData = navigator.connection?.saveData;
  return Boolean(saveData || (mem && mem <= 2) || (cores && cores <= 4));
}

export function resolveConfig(tier, lowEnd) {
  const base = BREAKPOINT_CONFIG[tier];
  return lowEnd ? { ...base, ...LOW_END_OVERRIDES(base) } : base;
}

/** Plays once per session; never when the user prefers reduced motion. */
export function shouldPlayIntro() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    // Dev convenience: visit /?intro to force a replay.
    if (new URLSearchParams(window.location.search).has('intro')) return true;
    if (window.sessionStorage.getItem(SESSION_KEY)) return false;
  } catch {
    /* storage blocked (private mode) → just play */
  }
  return true;
}
