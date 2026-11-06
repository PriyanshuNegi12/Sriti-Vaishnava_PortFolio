import { ArrowRight, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import { SITE } from '../../data/site';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';

/** HOME — contact strip: call / email buttons and BOTH addresses with direction links. */
export default function ContactBand() {
  return (
    <section className="mx-auto max-w-6xl px-5 sm:px-8">
      <Reveal variant="scale" duration={0.8}>
        <div className="relative overflow-hidden rounded-[2rem] bg-teal px-6 py-12 text-ivory sm:rounded-[2.75rem] sm:px-12 sm:py-16">
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-ivory/[0.07]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-coral/20" />

          <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="mb-3 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-ivory/90">
                <span className="h-px w-8 bg-coral" aria-hidden />
                Contact
              </p>
              <h2 className="font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">Reach the chamber, or visit either office.</h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-ivory/85">Call or write to {SITE.displayName}. Both addresses are in Dehradun.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href={SITE.contact.phoneHref} variant="light" icon={Phone}>
                  Call
                </Button>
                <Button href={`mailto:${SITE.contact.email}`} variant="outline-light" icon={Mail}>
                  Email
                </Button>
                <Button to="/contact" variant="outline-light" icon={ArrowRight}>
                  Map &amp; details
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {SITE.addresses.map((a, i) => (
                <Reveal key={a.id} delay={0.1 + i * 0.1} variant="up" className="h-full">
                  <div className="group flex h-full flex-col rounded-3xl border border-ivory/25 bg-ivory/10 p-5 transition-[transform,background-color] duration-300 hover:-translate-y-1 hover:bg-ivory/[0.16] active:scale-[0.98]">
                    <span className="mb-3 inline-flex items-center gap-2 text-sm font-semibold">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-ivory text-teal transition-transform duration-300 group-hover:scale-110">
                        <MapPin size={18} aria-hidden="true" />
                      </span>
                      {a.label}
                    </span>
                    <address className="flex-1 text-sm not-italic leading-relaxed text-ivory">
                      {a.lines.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </address>
                    <a href={a.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-semibold underline decoration-coral decoration-2 underline-offset-[6px]">
                      <Navigation size={15} aria-hidden="true" /> Get directions
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
