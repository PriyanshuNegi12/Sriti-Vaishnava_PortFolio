import { lazy, Suspense, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import PageTransition from './PageTransition';
import Home from '../../pages/Home';

// Home loads with the app; the other pages are downloaded on demand (and pre-fetched when the browser is idle).
const loaders = {
  About: () => import('../../pages/About'),
  PracticeAreas: () => import('../../pages/PracticeAreas'),
  Gallery: () => import('../../pages/Gallery'),
  Contact: () => import('../../pages/Contact'),
  NotFound: () => import('../../pages/NotFound'),
};
const About = lazy(loaders.About);
const PracticeAreas = lazy(loaders.PracticeAreas);
const Gallery = lazy(loaders.Gallery);
const Contact = lazy(loaders.Contact);
const NotFound = lazy(loaders.NotFound);

function RouteFallback() {
  return (
    <div className="grid min-h-[50dvh] place-items-center" role="status" aria-label="Loading page">
      <span className="h-9 w-9 animate-spin rounded-full border-2 border-teal/25 border-t-teal" />
    </div>
  );
}

/** Header + animated page area + footer. Add new pages as <Route>s below. */
export default function Layout() {
  const location = useLocation();

  // once the first page is up and the browser is idle, quietly fetch the other pages so navigation feels instant
  useEffect(() => {
    const run = () => Object.values(loaders).slice(0, 4).forEach((load) => load());
    const id = 'requestIdleCallback' in window ? window.requestIdleCallback(run, { timeout: 5000 }) : window.setTimeout(run, 3000);
    return () => ('cancelIdleCallback' in window ? window.cancelIdleCallback(id) : window.clearTimeout(id));
  }, []);

  return (
    <>
      <a href="#main" className="fixed left-3 top-3 z-[60] -translate-y-20 rounded-full bg-teal px-4 py-2 text-sm font-semibold text-ivory transition-transform focus:translate-y-0">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none" style={{ paddingTop: 'calc(4.25rem + env(safe-area-inset-top))', minHeight: '70dvh' }}>
        <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
          <PageTransition key={location.pathname}>
            <Suspense fallback={<RouteFallback />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/practice-areas" element={<PracticeAreas />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
