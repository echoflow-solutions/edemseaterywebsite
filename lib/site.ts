/**
 * Single source of truth for restaurant details.
 *
 * Contact info, hours and order links were previously duplicated across
 * Hero, Navigation, Location and Footer. Centralising them here means a
 * change to a phone number or trading hours only happens in one place.
 */

export const RESTAURANT = {
  name: "Edem's Eatery",
  tagline: 'Authentic Ghanaian Cuisine',
  street: '4/158 Macquarie Street',
  suburb: 'Liverpool NSW 2170',
  addressShort: '4/158 Macquarie St, Liverpool NSW 2170',
  region: 'Liverpool, New South Wales',
  regionShort: 'Liverpool, NSW',
  phoneDisplay: '(02) 7238 8800',
  phoneHref: 'tel:0272388800',
  email: 'info@edemseatery.com',
  established: '2024',
  /** Short trading summary. Monday is closed, so never "7 days a week". */
  openingSummary: 'Open Tue – Sun',
} as const;

export const ORDER_URL = 'https://orders.wowapps.com/order/edemseatery?src=web';

/**
 * Keyless Google Maps embed resolved from the street address. The previous
 * embed used hand-written coordinates that did not resolve to the venue.
 */
export const MAP_EMBED_URL =
  'https://maps.google.com/maps?q=' +
  encodeURIComponent(`${RESTAURANT.street}, ${RESTAURANT.suburb}`) +
  '&t=&z=15&ie=UTF8&iwloc=B&output=embed';

export const MAP_DIRECTIONS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=' +
  encodeURIComponent(`${RESTAURANT.street}, ${RESTAURANT.suburb}`);

export type OpeningHour = {
  day: string;
  time: string;
  closed?: boolean;
};

export const OPENING_HOURS: OpeningHour[] = [
  { day: 'Tuesday - Saturday', time: '11:00 AM - 8:00 PM' },
  { day: 'Sunday', time: '1:00 PM - 8:00 PM' },
  { day: 'Monday', time: 'CLOSED', closed: true },
];

export type OrderOption = {
  label: string;
  description: string;
  href: string;
};

/**
 * Targets for the Takeaway menu in the navigation bar. Only links we can
 * verify live here — third-party delivery platforms can be appended once
 * their store URLs are confirmed.
 */
export const ORDER_OPTIONS: OrderOption[] = [
  { label: 'Order for Pickup', description: 'Ready when you are', href: ORDER_URL },
  { label: 'Order for Delivery', description: 'Brought to your door', href: ORDER_URL },
  { label: 'Call to Order', description: RESTAURANT.phoneDisplay, href: RESTAURANT.phoneHref },
];

export type LegalLink = {
  label: string;
  href: string;
};

export const LEGAL_LINKS: LegalLink[] = [
  { label: 'Terms and Conditions', href: '/terms' },
  { label: 'Returns and Refunds Policy', href: '/returns' },
  { label: 'Privacy Policy', href: '/privacy' },
];

export type CateringService = {
  title: string;
  description: string;
};

export const CATERING_SERVICES: CateringService[] = [
  {
    title: 'Wedding Catering',
    description:
      'Full Ghanaian spreads for your big day, plated or served buffet style, tailored to your guest count.',
  },
  {
    title: 'Corporate Events',
    description:
      'Office lunches, launches and staff celebrations, delivered on time and set up ready to serve.',
  },
  {
    title: 'Private Parties',
    description:
      'Birthdays, naming ceremonies and family gatherings, cooked in the portions your table needs.',
  },
];
