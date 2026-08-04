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
import { OrderProvider } from '@/components/OrderProvider';
import OrderModeModal from '@/components/OrderModeModal';
import CartDrawer from '@/components/CartDrawer';

export default function Home() {
  // Read server-side so the token itself never reaches the browser bundle.
  const checkoutEnabled = Boolean(
    process.env.SQUARE_ACCESS_TOKEN && process.env.SQUARE_LOCATION_ID
  );

  return (
    <OrderProvider checkoutEnabled={checkoutEnabled}>
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
        <OrderModeModal />
        <CartDrawer />
      </div>
    </OrderProvider>
  );
}
