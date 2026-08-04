import type { Metadata } from 'next';
import LegalPageShell, { type LegalSection } from '@/components/LegalPageShell';
import { RESTAURANT } from '@/lib/site';

export const metadata: Metadata = {
  title: `Terms and Conditions | ${RESTAURANT.name}`,
  description: `The terms that apply when you order, dine in, or book catering with ${RESTAURANT.name} in Liverpool, NSW.`,
};

const sections: LegalSection[] = [
  {
    heading: 'About these terms',
    paragraphs: [
      `These terms apply whenever you order from ${RESTAURANT.name}, dine with us at ${RESTAURANT.addressShort}, or book us for catering. By placing an order you agree to them.`,
      'Nothing in these terms takes away rights you have under the Australian Consumer Law. Where a term conflicts with those rights, the law wins.',
    ],
  },
  {
    heading: 'Orders and prices',
    paragraphs: [
      'Prices shown on this website and on our menu include GST unless we say otherwise. We update prices from time to time, and the price confirmed at the moment you order is the price that applies.',
      'We do our best to keep every dish available, but ingredients occasionally run out. If we cannot prepare something you have ordered, we will contact you to offer an alternative or a refund for that item.',
    ],
  },
  {
    heading: 'Ordering and paying online',
    paragraphs: [
      'When you place a pickup order on this website, your card payment is processed by Square. We never see or store your card number — it goes directly to Square.',
      'Your order is confirmed once payment succeeds. Square emails you a receipt at that point, and the order is sent to our kitchen. If payment fails, no order reaches us, so please try again or give us a call.',
    ],
    bullets: [
      'You choose a pickup time when you order, either as soon as possible or a later slot. We prepare your food for that time.',
      'Pre-orders can be placed for upcoming trading days. Payment is taken when you order, not on the day you collect.',
      'Prices shown at checkout are in Australian dollars and include GST.',
      'If we cannot fulfil an order you have already paid for, we will contact you and refund it in full.',
    ],
  },
  {
    heading: 'Pickup and delivery',
    bullets: [
      'Pickup times are estimates. Busy periods can add to the wait, and we will tell you if your order will take noticeably longer.',
      'Delivery is handled through our ordering partner. Delivery areas, fees and times are set at checkout.',
      'Please check your delivery address before confirming. We cannot recover an order delivered to an address you entered incorrectly.',
    ],
  },
  {
    heading: 'Allergies and dietary requirements',
    paragraphs: [
      'Our kitchen prepares dishes containing peanuts, tree nuts, fish, shellfish, eggs, soy, sesame, milk and gluten. We take care with preparation, but we cannot guarantee any dish is entirely free of a given allergen.',
      'If you have a food allergy or intolerance, please tell us before you order so we can advise you honestly about what is safe for you.',
    ],
  },
  {
    heading: 'Catering bookings',
    bullets: [
      'Catering is confirmed once we have agreed the date, guest numbers, menu and price with you in writing.',
      'We may ask for a deposit to hold your date. Any deposit is credited against your final invoice.',
      'Final guest numbers should be confirmed at least five days before your event so we can shop and prepare accordingly.',
      'Cancellations are covered in our Returns and Refunds Policy.',
    ],
  },
  {
    heading: 'Using this website',
    paragraphs: [
      'The text, photographs, menu content and branding on this site belong to us. You are welcome to share links to the site, but please do not copy our content for commercial use without asking first.',
      'We keep the site as accurate as we can. Occasionally a menu item, price or opening hour may be out of date. If something matters to your plans, give us a call and we will confirm it.',
    ],
  },
  {
    heading: 'Third-party ordering and delivery platforms',
    paragraphs: [
      'When you order through an external ordering or delivery platform, that platform has its own terms and privacy practices covering payment, delivery and refunds. Those terms apply alongside ours for the part of the service the platform provides.',
    ],
  },
  {
    heading: 'Changes to these terms',
    paragraphs: [
      'We may update these terms as our business changes. The version published on this page is the one that applies, and the date at the top tells you when it last changed.',
    ],
  },
  {
    heading: 'Governing law',
    paragraphs: [
      'These terms are governed by the laws of New South Wales, Australia.',
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPageShell
      title="Terms and Conditions"
      intro="The everyday terms that apply when you order, dine in, or book catering with us. Written plainly, because you should not need a lawyer to read them."
      lastUpdated="4 August 2026"
      sections={sections}
    />
  );
}
