import usePageTitle from '../hooks/usePageTitle';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import ContactMethods from '../components/contact/ContactMethods';
import LocationExplorer from '../components/contact/LocationExplorer';
import { SITE } from '../data/site';

export default function Contact() {
  usePageTitle('Contact', 'Contact Adv. Sriti Vaishnava, Dehradun — phone, email, court chamber and home office addresses with map.');
  return (
    <>
      <PageHero eyebrow="Contact" title="Contact" text={`Call or write to ${SITE.displayName}, or find either address in Dehradun on the map below.`} />

      <section className="mx-auto max-w-6xl px-5 pt-10 sm:px-8 sm:pt-14">
        <ContactMethods />
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-24">
        <SectionHeading eyebrow="Find us" title="Court chamber & home office" text="Both addresses are in Dehradun. Pick one to see it on the map and get directions." />
        <div className="mt-10">
          <LocationExplorer />
        </div>
        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-teal-ink/75">{SITE.disclaimer}</p>
      </section>
    </>
  );
}
