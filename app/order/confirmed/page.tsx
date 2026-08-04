import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, MapPin, Phone, Clock } from 'lucide-react';
import { RESTAURANT } from '@/lib/site';
import ClearCartOnMount from './ClearCartOnMount';

export const metadata: Metadata = {
  title: `Order confirmed | ${RESTAURANT.name}`,
  description: 'Your pickup order has been received.',
  robots: { index: false, follow: false },
};

export default function OrderConfirmedPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <ClearCartOnMount />

      <header className="bg-primary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <Link href="/" aria-label={`${RESTAURANT.name} home`}>
            <Image
              src="/media/logo-new.png"
              alt={`${RESTAURANT.name} logo`}
              width={110}
              height={110}
              className="h-16 w-auto"
            />
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-11 h-11 text-secondary" />
            </div>

            <p className="font-script text-3xl text-secondary">Thank you</p>
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-primary mb-4">
              Your order is in
            </h1>
            <p className="text-gray-700 leading-relaxed max-w-xl mx-auto mb-8">
              The kitchen has your order and will have it ready at your pickup time. Square has
              emailed your receipt to the address you entered at checkout.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left mb-8">
              <div className="bg-cream rounded-xl p-5">
                <Clock className="w-5 h-5 text-secondary mb-2" />
                <p className="font-bold text-primary text-sm mb-1">Collecting</p>
                <p className="text-gray-600 text-sm">
                  At the pickup time you chose. We will call if anything changes.
                </p>
              </div>
              <div className="bg-cream rounded-xl p-5">
                <MapPin className="w-5 h-5 text-secondary mb-2" />
                <p className="font-bold text-primary text-sm mb-1">Where</p>
                <p className="text-gray-600 text-sm">{RESTAURANT.addressShort}</p>
              </div>
              <div className="bg-cream rounded-xl p-5">
                <Phone className="w-5 h-5 text-secondary mb-2" />
                <p className="font-bold text-primary text-sm mb-1">Need us?</p>
                <a
                  href={RESTAURANT.phoneHref}
                  className="text-gray-600 text-sm hover:text-secondary transition-colors"
                >
                  {RESTAURANT.phoneDisplay}
                </a>
              </div>
            </div>

            <Link
              href="/"
              className="inline-block px-8 py-4 bg-secondary text-primary rounded-full font-bold hover:bg-secondary/90 transition-colors"
            >
              Back to the menu
            </Link>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Something not right with your order?{' '}
            <a
              href={RESTAURANT.phoneHref}
              className="font-semibold text-primary hover:text-secondary transition-colors"
            >
              Call us on {RESTAURANT.phoneDisplay}
            </a>{' '}
            and we will sort it out.
          </p>
        </div>
      </main>
    </div>
  );
}
