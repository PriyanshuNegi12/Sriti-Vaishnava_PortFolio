import { useEffect } from 'react';
import { SITE } from '../data/site';

/** Sets the browser tab title (and meta description) for each page. */
export default function usePageTitle(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE.displayName}` : `${SITE.displayName} — ${SITE.designation}, Dehradun`;
    if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [title, description]);
}
