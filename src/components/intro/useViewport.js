import { useEffect, useState } from 'react';

const read = () => ({ w: window.innerWidth, h: window.innerHeight });

/**
 * Debounced viewport size. Listens to resize + orientationchange.
 * Only updates React state — it never touches the running sequence, so
 * rotating the phone or showing/hiding the mobile URL bar cannot restart it.
 */
export default function useViewport(delay = 150) {
  const [vp, setVp] = useState(read);

  useEffect(() => {
    let timer;
    const onChange = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const next = read();
        setVp((prev) => (prev.w === next.w && prev.h === next.h ? prev : next));
      }, delay);
    };
    window.addEventListener('resize', onChange);
    window.addEventListener('orientationchange', onChange);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', onChange);
      window.removeEventListener('orientationchange', onChange);
    };
  }, [delay]);

  return vp;
}
