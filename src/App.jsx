import { BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import '@fontsource-variable/dm-sans'; // body font (self-hosted)
import IntroSequence from './components/intro';
import Layout from './components/layout/Layout';

/**
 * Intro (plays once per session) → then the site.
 * MotionConfig reducedMotion="user": people who turned on "reduce motion"
 * in their phone/computer settings get gentle fades instead of movement.
 */
function App() {
  return (
    <IntroSequence>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </MotionConfig>
    </IntroSequence>
  );
}

export default App;
