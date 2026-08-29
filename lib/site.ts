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
  email: 'info@edemseatery.com.au',
  established: '2024',
  /** Short trading summary. Confirmed with the owner on 19 August 2026. */
  openingSummary: 'Open 7 days',
} as const;

/** Public origin of the site. Used to build absolute metadata URLs. */
export const SITE_URL = 'https://edemseatery.com.au';

export const ORDER_URL = 'https://orders.wowapps.com/order/edemseatery?src=web';

/**
 * Australian GST.
 *
 * Menu prices already include GST, so this is recorded as an inclusive tax:
 * Square back-calculates the GST component out of the price rather than
 * adding it on top. Without it Square reports $0 tax collected on every
 * online order, which makes BAS reporting wrong.
 */
export const GST = {
  name: 'GST',
  /** Percentage as a plain string, the format Square expects. */
  percentage: '10',
} as const;

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
  { day: 'Monday - Wednesday', time: '11:00 AM - 8:00 PM' },
  { day: 'Thursday - Saturday', time: '11:00 AM - 9:00 PM' },
  { day: 'Sunday', time: '1:00 PM - 9:00 PM' },
];

export type OrderOption = {
  label: string;
  description: string;
  /** Omitted when the option only opens a nested list of choices. */
  href?: string;
  /** Opens in a new tab, so the restaurant site stays put behind it. */
  external?: boolean;
  /** Nested choices, used by delivery to offer each platform. */
  options?: OrderOption[];
  /** Handled in-app rather than by navigating away. */
  action?: 'pickup';
};

/**
 * Third-party delivery storefronts.
 *
 * The `srsltid` query parameter was stripped from both URLs — it is a Google
 * search click-tracking token tied to a single search session, not part of the
 * store address.
 */
export const DELIVERY_PLATFORMS: OrderOption[] = [
  {
    label: 'Uber Eats',
    description: 'Order on Uber Eats',
    href: 'https://www.ubereats.com/au/store/edems-eatery-liverpool/rMRmyzCbU8mfhVQv00iCHQ',
    external: true,
  },
  {
    label: 'DoorDash',
    description: 'Order on DoorDash',
    href: 'https://www.doordash.com/en-AU/store/edems-eatery-liverpool-42514042/106374353/',
    external: true,
  },
];

/** Targets for the Takeaway menu in the navigation bar. */
export const ORDER_OPTIONS: OrderOption[] = [
  { label: 'Order for Pickup', description: 'Build your order here', action: 'pickup' },
  {
    label: 'Order for Delivery',
    description: 'Uber Eats or DoorDash',
    options: DELIVERY_PLATFORMS,
  },
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
