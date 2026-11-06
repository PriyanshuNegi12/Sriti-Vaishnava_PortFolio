import { useSyncExternalStore } from 'react';

/** Reactive CSS media query (updates on resize AND on orientation change). */
export default function useMediaQuery(query) {
  return useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', notify);
      return () => mq.removeEventListener('change', notify);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
