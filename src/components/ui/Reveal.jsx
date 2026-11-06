import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useIntroReady } from '../intro/IntroContext';

/**
 * Scroll-reveal wrapper: fades/slides its children in the first time they
 * enter the viewport. Waits for the intro to finish, so content that is
 * already on screen still animates in when the intro lifts away.
 * Motion is transform + opacity only (smooth on phones).
 */
const VARIANTS = {
  up: { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -20 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -32 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 32 }, show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
};

const TAGS = { div: motion.div, li: motion.li, article: motion.article, section: motion.section, ul: motion.ul };

export default function Reveal({ as = 'div', children, variant = 'up', delay = 0, duration = 0.7, className = '', ...rest }) {
  const Tag = TAGS[as];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const ready = useIntroReady();
  return (
    <Tag
      ref={ref}
      className={className}
      variants={VARIANTS[variant]}
      initial="hidden"
      animate={inView && ready ? 'show' : 'hidden'}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
