import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ValueProps from '@/components/ValueProps';
import DiningExperience from '@/components/DiningExperience';
import Menu from '@/components/Menu';
import PopularItems from '@/components/PopularItems';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import Catering from '@/components/Catering';
import Location from '@/components/Location';
import Footer from '@/components/Footer';
import FloatingOrderButton from '@/components/FloatingOrderButton';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <ValueProps />
      <DiningExperience />
      <Menu />
      <PopularItems />
      <Gallery />
      <Reviews />
      <Catering />
      <Location />
      <Footer />
      <FloatingOrderButton />
    </div>
  );
}
