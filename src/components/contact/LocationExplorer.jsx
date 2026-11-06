import { lazy, Suspense, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Check, Copy, MapPin, Navigation } from 'lucide-react';
import { SITE } from '../../data/site';
import Reveal from '../ui/Reveal';

// The map library is only downloaded when this section scrolls into view (saves data on phones).
const LocationMap = lazy(() => import('./LocationMap'));

const hasPin = (a) => a.lat != null && a.lng != null;

function MapSkeleton() {
  return (
    <div className="grid h-full w-full place-items-center bg-ivory-deep">
      <div className="flex flex-col items-center gap-3 text-teal">
        <MapPin size={32} className="animate-bounce" aria-hidden="true" />
        <span className="text-sm font-medium">Loading map…</span>
      </div>
    </div>
  );
}

function CopyButton({ text, active }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button
      type="button"
      onClick={onCopy}
      className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-[background-color,color,border-color,transform] duration-300 active:scale-95 ${
        active ? 'border-ivory/50 text-ivory hover:bg-ivory hover:text-teal-dark' : 'border-teal/30 text-teal hover:bg-teal hover:text-ivory'
      }`}
    >
      {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy address'}</span>
    </button>
  );
}

function AddressCard({ a, active, onSelect, index }) {
  return (
    <Reveal delay={index * 0.1}>
      <article
        className={`rounded-[1.75rem] border p-5 transition-[transform,background-color,border-color,box-shadow,color] duration-500 ease-[var(--ease-out-expo)] sm:p-6 ${
          active ? 'border-teal bg-teal text-ivory shadow-[0_26px_50px_-24px_rgba(15,74,70,0.85)]' : 'border-ivory-deep bg-paper text-teal-ink hover:-translate-y-1 hover:border-teal/40'
        }`}
      >
        <button type="button" onClick={() => onSelect(a.id)} aria-pressed={active} className="group flex w-full items-start gap-4 rounded-2xl text-left">
          <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition-[background-color,color,transform] duration-300 group-hover:-rotate-6 ${active ? 'bg-ivory text-teal' : 'bg-teal-mist text-teal'}`}>
            <MapPin size={22} aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="flex items-center gap-2 font-display text-2xl font-semibold leading-tight">
              {a.label}
              {active && <span className="rounded-full bg-coral px-2 py-0.5 font-sans text-[0.65rem] font-bold uppercase tracking-wider text-teal-ink">On map</span>}
            </span>
            <address className={`mt-2 text-[0.95rem] not-italic leading-relaxed ${active ? 'text-ivory/90' : 'text-teal-ink/75'}`}>
              {a.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
          </span>
        </button>

        <div className="mt-4 flex flex-wrap gap-2.5">
          <a
            href={a.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-[background-color,color,transform] duration-300 active:scale-95 ${active ? 'bg-ivory text-teal-dark hover:bg-coral' : 'bg-teal text-ivory hover:bg-teal-dark'}`}
          >
            <Navigation size={16} aria-hidden="true" /> Get directions
          </a>
          <CopyButton text={`${SITE.displayName}, ${a.label}: ${a.lines.join(' ')}`} active={active} />
        </div>
      </article>
    </Reveal>
  );
}

/** CONTACT — segmented tabs + map + both address cards. */
export default function LocationExplorer() {
  const defaultId = (SITE.addresses.find(hasPin) ?? SITE.addresses[0]).id;
  const [activeId, setActiveId] = useState(defaultId);
  const shellRef = useRef(null);
  const near = useInView(shellRef, { once: true, margin: '300px' });
  const active = SITE.addresses.find((a) => a.id === activeId);

  return (
    <div>
      {/* sliding segmented tabs */}
      <Reveal>
        <div role="tablist" aria-label="Choose a location" className="relative inline-flex rounded-full bg-paper p-1.5 shadow-sm ring-1 ring-ivory-deep">
          {SITE.addresses.map((a) => {
            const on = a.id === activeId;
            return (
              <button
                key={a.id}
                role="tab"
                aria-selected={on}
                type="button"
                onClick={() => setActiveId(a.id)}
                className={`relative min-h-11 rounded-full px-5 text-sm font-semibold transition-colors duration-300 sm:px-7 ${on ? 'text-ivory' : 'text-teal-dark hover:text-teal'}`}
              >
                {on && <motion.span layoutId="loc-tab" className="absolute inset-0 rounded-full bg-teal" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <span className="relative">{a.label}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.9fr]">
        {/* map */}
        <Reveal variant="scale" duration={0.8}>
          <div ref={shellRef} className="relative h-[21rem] overflow-hidden rounded-[2rem] bg-ivory-deep shadow-[0_30px_60px_-34px_rgba(18,48,45,0.6)] ring-1 ring-ivory-deep sm:h-[28rem] lg:h-full lg:min-h-[34rem]" style={{ isolation: 'isolate' }}>
            {near ? (
              <Suspense fallback={<MapSkeleton />}>
                <LocationMap locations={SITE.addresses} activeId={activeId} onSelect={setActiveId} />
              </Suspense>
            ) : (
              <MapSkeleton />
            )}

            {/* shown only while a location has no exact pin yet */}
            <AnimatePresence>
              {!hasPin(active) && (
                <motion.div
                  key="nopin"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  className="absolute inset-x-3 bottom-3 rounded-2xl bg-paper/95 p-4 shadow-xl ring-1 ring-ivory-deep sm:inset-x-auto sm:left-4 sm:max-w-xs"
                  style={{ zIndex: 1001 }}
                >
                  <p className="text-sm font-semibold text-teal-dark">{active.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-teal-ink/70">The exact map pin is being added. Use the button to open this address in Google Maps.</p>
                  <a href={active.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-full bg-teal px-4 text-sm font-semibold text-ivory transition active:scale-95">
                    <Navigation size={15} aria-hidden="true" /> Open in Google Maps
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        {/* both addresses, always visible */}
        <div className="flex flex-col gap-4">
          {SITE.addresses.map((a, i) => (
            <AddressCard key={a.id} a={a} index={i} active={a.id === activeId} onSelect={setActiveId} />
          ))}
        </div>
      </div>
    </div>
  );
}
