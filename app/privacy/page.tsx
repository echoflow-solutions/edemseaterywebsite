import type { Metadata } from 'next';
import LegalPageShell, { type LegalSection } from '@/components/LegalPageShell';
import { RESTAURANT } from '@/lib/site';

export const metadata: Metadata = {
  title: `Privacy Policy | ${RESTAURANT.name}`,
  description: `How ${RESTAURANT.name} collects, uses and protects your personal information.`,
};

const sections: LegalSection[] = [
  {
    heading: 'What this policy covers',
    paragraphs: [
      `This policy explains how ${RESTAURANT.name} handles your personal information when you order from us, book catering, or use this website. We follow the Australian Privacy Principles set out in the Privacy Act 1988 (Cth).`,
    ],
  },
  {
    heading: 'What we collect',
    bullets: [
      'Your name, phone number and email address when you place an order or make an enquiry.',
      'A delivery address, if you are having food delivered.',
      'Details of your order, including any allergy or dietary notes you give us.',
      'Event details for catering bookings, such as the date, venue and guest numbers.',
      'Basic technical information about your visit to this site, such as the pages you viewed and the type of device you used.',
    ],
  },
  {
    heading: 'What we do not collect',
    paragraphs: [
      'We do not store your full card number. Payments are processed by our ordering and payment providers, and your card details go to them rather than to us.',
    ],
  },
  {
    heading: 'How we use it',
    bullets: [
      'To prepare, confirm and deliver your order.',
      'To contact you if there is a problem with an order or a booking.',
      'To prepare quotes and plan catering events.',
      'To meet our food safety, tax and other legal obligations.',
      'To improve the website and our menu, using information that does not identify you.',
    ],
  },
  {
    heading: 'Who else sees it',
    paragraphs: [
      'We share only what is needed for the service you asked for. That may include our online ordering provider, a delivery platform when you order through one, our payment processor, and professional advisers where the law requires it.',
      'We do not sell your personal information, and we do not pass it to anyone for their own marketing.',
    ],
  },
  {
    heading: 'Marketing',
    paragraphs: [
      'If you have asked to hear about specials or events, you can opt out at any time by replying to any message or calling us. We will action it promptly.',
    ],
  },
  {
    heading: 'How long we keep it',
    paragraphs: [
      'We keep order and booking records for as long as we need them to run the business and to meet our legal obligations, then we securely delete or de-identify them.',
    ],
  },
  {
    heading: 'Keeping it safe',
    paragraphs: [
      'We take reasonable steps to protect your information from loss, misuse and unauthorised access. That includes limiting who on our team can see it and relying on reputable providers for ordering and payments.',
    ],
  },
  {
    heading: 'Cookies and this website',
    paragraphs: [
      'This site uses only what it needs to load and display pages correctly. Embedded content, such as the Google map on our contact section, is served by Google and is subject to Google privacy practices.',
    ],
  },
  {
    heading: 'Accessing or correcting your information',
    paragraphs: [
      `You can ask us what personal information we hold about you and ask us to correct it. Contact us at ${RESTAURANT.email} or call ${RESTAURANT.phoneDisplay} and we will respond within a reasonable time.`,
      'If you are not satisfied with how we have handled your information, you can raise it with the Office of the Australian Information Commissioner.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPageShell
      title="Privacy Policy"
      intro="What personal information we collect when you order or book with us, why we need it, and how you can access or correct it."
      lastUpdated="4 August 2026"
      sections={sections}
    />
  );
}
