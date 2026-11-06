import usePageTitle from '../hooks/usePageTitle';
import Hero from '../components/home/Hero';
import AboutBrief from '../components/home/AboutBrief';
import PracticePreview from '../components/home/PracticePreview';
import JourneyPreview from '../components/home/JourneyPreview';
import ContactBand from '../components/home/ContactBand';

export default function Home() {
  usePageTitle();
  return (
    <>
      <Hero />
      <AboutBrief />
      <PracticePreview />
      <JourneyPreview />
      <ContactBand />
    </>
  );
}
