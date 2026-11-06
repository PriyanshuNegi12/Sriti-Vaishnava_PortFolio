import { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Camera, Maximize2 } from 'lucide-react';
import { GALLERY } from '../data/gallery';
import usePageTitle from '../hooks/usePageTitle';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import Lightbox from '../components/gallery/Lightbox';

export default function Gallery() {
  usePageTitle('Gallery', 'Photos of Adv. Sriti Vaishnava from court and work in Dehradun.');
  const categories = ['All', ...new Set(GALLERY.map((p) => p.category))];
  const [category, setCategory] = useState('All');
  const [open, setOpen] = useState(null); // index inside `shown`, or null
  const triggerRef = useRef(null);

  const shown = category === 'All' ? GALLERY : GALLERY.filter((p) => p.category === category);
  const showFilter = GALLERY.length >= 4 && categories.length > 2; // filter only appears once there are enough photos

  const close = () => {
    setOpen(null);
    setTimeout(() => triggerRef.current?.focus(), 0); // return focus to the photo you opened
  };

  return (
    <>
      <PageHero eyebrow="Gallery" title="Gallery" text="A few moments from court and work in Dehradun. More photos will be added over time." />

      <section className="mx-auto max-w-6xl px-5 pt-10 sm:px-8 sm:pt-14">
        {showFilter && (
          <div role="tablist" aria-label="Filter photos" className="mb-8 flex flex-wrap gap-2.5">
            {categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={category === c}
                type="button"
                onClick={() => setCategory(c)}
                className={`min-h-11 rounded-full border px-5 text-sm font-semibold transition-[background-color,color,transform,border-color] duration-300 active:scale-95 ${category === c ? 'border-teal bg-teal text-ivory' : 'border-teal/25 bg-paper text-teal-dark hover:border-teal'}`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {shown.map((p, i) => (
            <Reveal as="li" key={p.id} delay={(i % 3) * 0.08} className="mb-5 break-inside-avoid">
              <button
                type="button"
                onClick={(e) => {
                  triggerRef.current = e.currentTarget;
                  setOpen(i);
                }}
                aria-label={`Open photo: ${p.caption}`}
                className="group relative block w-full overflow-hidden rounded-[1.75rem] bg-teal-mist shadow-[0_20px_44px_-28px_rgba(18,48,45,0.6)] transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:shadow-[0_30px_56px_-26px_rgba(18,48,45,0.7)] active:scale-[0.98]"
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  width={p.w}
                  height={p.h}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between gap-3 bg-gradient-to-t from-teal-ink/85 via-teal-ink/40 to-transparent p-4 pt-14 text-left text-ivory opacity-100 transition-[transform,opacity] duration-500 sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                  <span className="text-sm font-medium leading-snug">{p.caption}</span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ivory/20">
                    <Maximize2 size={16} aria-hidden="true" />
                  </span>
                </span>
              </button>
            </Reveal>
          ))}

          {/* invitation tile: more photos can be added from data/gallery.js */}
          <Reveal as="li" delay={0.2} className="mb-5 break-inside-avoid">
            <div className="grid place-items-center gap-3 rounded-[1.75rem] border-2 border-dashed border-teal/30 bg-paper/60 px-6 py-12 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-teal-mist text-teal">
                <Camera size={24} aria-hidden="true" />
              </span>
              <p className="font-display text-2xl font-semibold text-teal-dark">More photos soon</p>
              <p className="max-w-[16rem] text-sm leading-relaxed text-teal-ink/70">Moments from court, seminars and legal-aid camps will be added here.</p>
            </div>
          </Reveal>
        </ul>
      </section>

      <AnimatePresence>{open !== null && <Lightbox photos={shown} index={open} onClose={close} onIndex={setOpen} />}</AnimatePresence>
    </>
  );
}
