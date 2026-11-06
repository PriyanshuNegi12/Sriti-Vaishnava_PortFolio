/* Pure helpers: seeded RNG, word layout, letter fly-in vectors. */

/** Small seeded PRNG so a word layout stays stable between re-renders. */
export function createRng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle(arr, rnd = Math.random) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ------------------------------------------------------------------ */
/* Scene 1 — non-overlapping scattered word layout                     */
/* Positions are returned as % of the viewport so a plain resize       */
/* (e.g. mobile URL bar) needs no recompute; only orientation / tier   */
/* changes re-run this.                                                */
/* ------------------------------------------------------------------ */
export function layoutWords({ words, w, h, sizeRange, seed }) {
  const rnd = createRng(seed);
  const PAD = 10; // keep clear of screen edges
  const GAP = 8; // desired gap between words

  const items = words.map((text, i) => {
    const size = sizeRange[0] + rnd() * (sizeRange[1] - sizeRange[0]);
    const rot = rnd() * 50 - 25; // -25° … +25°
    const bw = text.length * size * 0.58 + 6;
    const bh = size * 1.25;
    const rad = (rot * Math.PI) / 180;
    const cos = Math.abs(Math.cos(rad));
    const sin = Math.abs(Math.sin(rad));
    return {
      text,
      size,
      rot,
      hw: (cos * bw + sin * bh) / 2, // half-extents of the rotated box
      hh: (sin * bw + cos * bh) / 2,
      delay: rnd() * 0.8,
      tone: i % 3 === 0 ? 'gold' : 'grey',
      x: 0,
      y: 0,
    };
  });

  // Place the biggest first — they are hardest to fit.
  const order = items.map((_, i) => i).sort((a, b) => items[b].hw * items[b].hh - items[a].hw * items[a].hh);
  const placed = [];

  for (const idx of order) {
    const it = items[idx];
    const spanX = Math.max(0, w - 2 * (it.hw + PAD));
    const spanY = Math.max(0, h - 2 * (it.hh + PAD));
    let best = null;
    let bestScore = -Infinity;
    for (let t = 0; t < 70; t++) {
      const x = it.hw + PAD + rnd() * spanX;
      const y = it.hh + PAD + rnd() * spanY;
      let score = Infinity; // smallest separation to any placed word
      for (const p of placed) {
        const gap = Math.max(Math.abs(x - p.x) - (it.hw + p.hw), Math.abs(y - p.y) - (it.hh + p.hh));
        if (gap < score) score = gap;
      }
      if (score > bestScore) {
        bestScore = score;
        best = { x, y };
      }
      if (score >= GAP) break;
    }
    it.x = (best.x / w) * 100;
    it.y = (best.y / h) * 100;
    placed.push({ x: best.x, y: best.y, hw: it.hw, hh: it.hh });
  }
  return items;
}

/* ------------------------------------------------------------------ */
/* Scene 2 — random fly-in vectors, from all 8 directions + jitter    */
/* ------------------------------------------------------------------ */
export function buildLetterVectors(count, w, h) {
  const dirs = shuffle(Array.from({ length: count }, (_, i) => (i % 8) * 45));
  const order = shuffle(Array.from({ length: count }, (_, i) => i));
  return dirs.map((deg, i) => {
    const a = ((deg + (Math.random() - 0.5) * 30) * Math.PI) / 180;
    const dist = Math.max(w, h) * (0.85 + Math.random() * 0.3); // always fully off-screen
    return { x: Math.cos(a) * dist, y: Math.sin(a) * dist, r: (Math.random() - 0.5) * 80, order: order[i] };
  });
}
