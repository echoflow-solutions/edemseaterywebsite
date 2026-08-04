import type { Metadata } from 'next';
import LegalPageShell, { type LegalSection } from '@/components/LegalPageShell';
import { RESTAURANT } from '@/lib/site';

export const metadata: Metadata = {
  title: `Returns and Refunds Policy | ${RESTAURANT.name}`,
  description: `How ${RESTAURANT.name} handles wrong orders, missing items, cancellations and refunds.`,
};

const sections: LegalSection[] = [
  {
    heading: 'Your rights come first',
    paragraphs: [
      'Under the Australian Consumer Law, food you buy must be safe, fit to eat, and match what was described to you. If it is not, you are entitled to a repair, replacement or refund. This policy explains how we handle that in practice, and it sits on top of those rights rather than replacing them.',
    ],
  },
  {
    heading: 'If something is wrong with your order',
    paragraphs: [
      'Tell us as soon as you can, ideally within two hours of collecting or receiving your order, while we can still check what happened in the kitchen.',
    ],
    bullets: [
      'Wrong item: we will remake the correct dish, or refund that item, whichever you prefer.',
      'Missing item: we will refund it, or have it ready for you to collect.',
      'Quality problem: let us know what was wrong. If the dish was not up to standard, we will replace it or refund it.',
      'Where practical, please keep the item. It helps us work out what went wrong so it does not happen again.',
    ],
  },
  {
    heading: 'Change of mind',
    paragraphs: [
      'Because our food is cooked fresh to order, we cannot accept returns simply because you changed your mind after the kitchen has started your order. If you catch us before cooking begins, call us and we will cancel it at no cost.',
    ],
  },
  {
    heading: 'Orders paid online',
    paragraphs: [
      'Pickup orders paid by card on this website are processed by Square, and any refund is issued back through Square to the card you paid with.',
    ],
    bullets: [
      'Cancel before the kitchen has started your order and we will refund it in full. Call us as soon as you can, especially for a pre-order placed for a later day.',
      'Once cooking has started we cannot refund a change of mind, though your rights above for a wrong, missing or poor-quality order still apply in full.',
      'If you do not collect a paid order and have not contacted us, the food is held until closing that day and cannot be refunded afterwards.',
      'If a payment is taken but no order reaches us, tell us straight away and we will refund it.',
    ],
  },
  {
    heading: 'How refunds are paid',
    bullets: [
      'Refunds go back to the original payment method.',
      'Card refunds usually appear within three to five business days, depending on your bank.',
      'Orders placed through an external delivery platform are refunded by that platform, so please raise those directly with them and let us know as well.',
    ],
  },
  {
    heading: 'Catering deposits and cancellations',
    bullets: [
      'Cancel more than 14 days before your event and any deposit is refunded in full.',
      'Cancel between 7 and 14 days before, and we refund your deposit less any ingredients already bought for your event.',
      'Cancel within 7 days and the deposit is not refundable, because the food has been ordered and the kitchen time reserved.',
      'If you need to move your date rather than cancel, talk to us. Where we can accommodate the new date we will carry your deposit across.',
    ],
  },
  {
    heading: 'Talk to us first',
    paragraphs: [
      `Most problems are quickest to fix with a phone call to ${RESTAURANT.phoneDisplay}. If you would rather write, email us and include your order number, the date, and what went wrong.`,
      'If we cannot sort it out between us, you can contact NSW Fair Trading for free advice about your consumer rights.',
    ],
  },
];

export default function ReturnsPage() {
  return (
    <LegalPageShell
      title="Returns and Refunds Policy"
      intro="What happens if an order is wrong, incomplete, or not up to standard, and how cancellations work for catering bookings."
      lastUpdated="4 August 2026"
      sections={sections}
    />
  );
}
