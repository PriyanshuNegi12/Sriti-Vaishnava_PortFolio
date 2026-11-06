import usePageTitle from '../hooks/usePageTitle';
import PageHero from '../components/ui/PageHero';
import Button from '../components/ui/Button';

export default function NotFound() {
  usePageTitle('Page not found');
  return (
    <>
      <PageHero eyebrow="404" title="Page not found" text="The page you are looking for does not exist or has moved." />
      <div className="mx-auto max-w-6xl px-5 pt-8 sm:px-8">
        <Button to="/">Back to home</Button>
      </div>
    </>
  );
}
