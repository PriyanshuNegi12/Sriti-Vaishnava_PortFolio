import Reveal from './Reveal';

/** Eyebrow + display heading + optional intro line, with a coral underline that draws in. */
export default function SectionHeading({ eyebrow, title, text, align = 'left', light = false, className = '' }) {
  const center = align === 'center';
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
      {eyebrow && (
        <Reveal variant="fade">
          <p className={`mb-3 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] ${light ? 'text-ivory/90' : 'text-teal'}`}>
            <span className="h-px w-8 bg-coral" aria-hidden />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className={`font-display text-4xl font-semibold leading-[1.05] sm:text-5xl ${light ? 'text-ivory' : 'text-teal-dark'}`}>{title}</h2>
      </Reveal>
      {text && (
        <Reveal delay={0.12}>
          <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? 'text-ivory/85' : 'text-teal-ink/75'}`}>{text}</p>
        </Reveal>
      )}
    </div>
  );
}
