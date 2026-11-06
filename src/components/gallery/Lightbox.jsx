import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const btn =
  'grid h-12 w-12 place-items-center rounded-full bg-ivory/15 text-ivory transition-[background-color,transform] duration-300 hover:bg-ivory hover:text-teal-dark active:scale-90 focus-visible:outline-coral';

/**
 * Full-screen photo viewer.
 *  • swipe left/right on phones, arrow keys on desktop, Esc / tap backdrop to close
 *  • page scroll is locked while open; focus moves in and returns to the thumbnail on close
 */
export default function Lightbox({ photos, index, onClose, onIndex }) {
  const closeRef = useRef(null);
  const total = photos.length;
  const photo = photos[index];

  const go = useCallback((dir) => onIndex((index + dir + total) % total), [index, total, onIndex]);

  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      root.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight' && total > 1) go(1);
      else if (e.key === 'ArrowLeft' && total > 1) go(-1);
      else if (e.key === 'Tab') {
        // keep keyboard focus inside the viewer
        const f = [...document.querySelectorAll('[data-lightbox] button')];
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose, total]);

  return createPortal(
    <motion.div
      data-lightbox
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${total}: ${photo.caption}`}
      className="fixed inset-0 z-[90] flex flex-col bg-teal-ink/[0.97]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <span className="text-sm font-medium text-ivory/90">
          {index + 1} / {total}
        </span>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close photo" className={btn}>
          <X size={24} aria-hidden="true" />
        </button>
      </div>

      {/* tapping the empty area closes; the photo itself is draggable */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-16" onClick={onClose}>
        <motion.img
          key={photo.id}
          src={photo.src}
          alt={photo.alt}
          width={photo.w}
          height={photo.h}
          onClick={(e) => e.stopPropagation()}
          drag={total > 1 ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.5}
          onDragEnd={(_, info) => {
            if (info.offset.x < -70) go(1);
            else if (info.offset.x > 70) go(-1);
          }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="max-h-full max-w-full cursor-grab select-none rounded-2xl object-contain shadow-2xl active:cursor-grabbing"
          draggable={false}
        />

        {total > 1 && (
          <>
            <button type="button" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous photo" className={`${btn} absolute left-2 top-1/2 hidden -translate-y-1/2 sm:grid`}>
              <ChevronLeft size={26} aria-hidden="true" />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next photo" className={`${btn} absolute right-2 top-1/2 hidden -translate-y-1/2 sm:grid`}>
              <ChevronRight size={26} aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      <div className="px-5 pb-5 pt-3 text-center sm:pb-7">
        <p className="mx-auto max-w-xl font-display text-xl text-ivory sm:text-2xl">{photo.caption}</p>
        {total > 1 && (
          <div className="mt-3 flex items-center justify-center gap-4 sm:hidden">
            <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={btn}>
              <ChevronLeft size={24} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next photo" className={btn}>
              <ChevronRight size={24} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </motion.div>,
    document.body,
  );
}
