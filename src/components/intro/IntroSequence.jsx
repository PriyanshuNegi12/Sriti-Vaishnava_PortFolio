import { useCallback, useEffect, useReducer, useState } from 'react';
import gsap from 'gsap';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import { FLY_START, SESSION_KEY, TIMINGS, getTier, isLowEndDevice, resolveConfig, shouldPlayIntro, stateIndex } from './introConfig';
import useViewport from './useViewport';
import { IntroContext, NOT_READY, READY } from './IntroContext';
import IntroOverlay from './IntroOverlay';

/**
 * <IntroSequence> — the orchestrator. Wrap your whole site with it:
 *
 *   <IntroSequence><App /></IntroSequence>
 *
 * SCENE 0: the real site is mounted from the first render (rendered, but
 * invisible + `inert` so it can't be focused or read) → it fades in the
 * moment everything flies away, with no loading gap.
 *
 * STATE MACHINE (forward-only, all time-driven on one GSAP clock):
 *   idle → words (0s) → name (1.2s) → stamp (2.8s) → fly (4.3s)
 *        → reveal (fly + 0.25s) → done (reveal + 0.7s, overlay removed)
 *   Esc / Enter skips straight to reveal from anywhere.
 *
 * Resize / orientationchange only update the viewport value; nothing in the
 * sequence depends on it, so it can never restart.
 */

const initState = (play) => ({ phase: play ? 'idle' : 'done', skipped: false });

function reducer(s, a) {
  switch (a.type) {
    case 'goto':
      return stateIndex(a.phase) > stateIndex(s.phase) ? { ...s, phase: a.phase } : s;
    case 'skip':
      if (stateIndex(s.phase) >= stateIndex('reveal')) return s;
      return { phase: 'reveal', skipped: stateIndex(s.phase) < stateIndex('fly') };
    default:
      return s;
  }
}

async function waitForFonts(timeout) {
  if (!document.fonts?.load) return;
  await Promise.race([
    document.fonts.load('600 64px "Cormorant Garamond"'),
    new Promise((r) => setTimeout(r, timeout)),
  ]);
}

export default function IntroSequence({ children }) {
  const [play] = useState(shouldPlayIntro);
  const [lowEnd] = useState(isLowEndDevice);
  const [state, dispatch] = useReducer(reducer, play, initState);
  const vp = useViewport();

  const tier = getTier(vp.w, vp.h);
  const cfg = resolveConfig(tier, lowEnd);
  const { phase, skipped } = state;
  const active = play && phase !== 'done';
  const revealed = phase === 'reveal' || phase === 'done';

  const skip = useCallback(() => dispatch({ type: 'skip' }), []);

  // Start: mark the session, then run scenes 1–3 on a GSAP clock.
  useEffect(() => {
    document.documentElement.classList.remove('intro-pending');
    if (!play) return;
    try {
      window.sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* ignore */
    }
    let cancelled = false;
    let master;
    waitForFonts(TIMINGS.fontWait).then(() => {
      if (cancelled) return;
      dispatch({ type: 'goto', phase: 'words' }); // SCENE 1 at t = 0
      master = gsap
        .timeline()
        .call(() => dispatch({ type: 'goto', phase: 'name' }), null, TIMINGS.nameStart) // SCENE 2 at 1.2s
        .call(() => dispatch({ type: 'goto', phase: 'stamp' }), null, TIMINGS.stampStart) // SCENE 3 at 2.8s
        .call(() => dispatch({ type: 'goto', phase: 'fly' }), null, FLY_START); // SCENE 4 at 4.3s
    });
    return () => {
      cancelled = true;
      master?.kill();
    };
  }, [play]);

  // fly → reveal ; reveal → done (overlay removed from the DOM)
  useEffect(() => {
    let call;
    if (phase === 'fly') {
      call = gsap.delayedCall(TIMINGS.revealDelay, () => dispatch({ type: 'goto', phase: 'reveal' }));
    } else if (phase === 'reveal') {
      const d = skipped ? TIMINGS.skipFade : TIMINGS.revealDuration;
      call = gsap.delayedCall(d, () => dispatch({ type: 'goto', phase: 'done' }));
    }
    return () => call?.kill();
  }, [phase, skipped]);

  // Esc / Enter skips (keyboard only — there is no on-screen skip button). Page scroll is locked only while the intro is up.
  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter') skip();
    };
    window.addEventListener('keydown', onKey);
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      root.style.overflow = prev;
    };
  }, [active, skip]);

  // SCENE 5 — reveal: fade + scale 0.98→1 + blur→sharp (blur only on tablet/desktop).
  // Once finished all transform/filter is cleared (`none`), so it can't break
  // position:fixed / sticky elements inside the site.
  const d = skipped ? TIMINGS.skipFade : TIMINGS.revealDuration;
  let siteStyle;
  if (play) {
    siteStyle = revealed
      ? {
          opacity: 1,
          transform: 'none',
          filter: 'none',
          transition:
            phase === 'reveal' ? `opacity ${d}s ease-out, transform ${d}s cubic-bezier(0.22,1,0.36,1), filter ${d}s ease-out` : undefined,
        }
      : { opacity: 0, transform: 'scale(0.98)', filter: cfg.revealBlur ? `blur(${cfg.revealBlur}px)` : 'none' };
  }

  return (
    <>
      {/* SCENE 0 — the real site, mounted from the start. `inert` until revealed. */}
      <div style={siteStyle} inert={play && !revealed}>
        {/* the site reads `ready` to start its own entrance animations at the reveal */}
        <IntroContext.Provider value={!play || revealed ? READY : NOT_READY}>{children}</IntroContext.Provider>
      </div>

      {active && (
        <IntroOverlay phase={phase} skipExit={skipped && phase === 'reveal'} vp={vp} tier={tier} cfg={cfg} />
      )}
    </>
  );
}
