import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MapPin, Phone, Mail } from 'lucide-react';
import { RESTAURANT, LEGAL_LINKS } from '@/lib/site';

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

type LegalPageShellProps = {
  title: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
};

const LegalPageShell = ({ title, intro, lastUpdated, sections }: LegalPageShellProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      {/* Header */}
      <header className="bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-4">
          <Link href="/" className="flex-shrink-0" aria-label={`${RESTAURANT.name} home`}>
            <Image
              src="/media/logo-new.png"
              alt={`${RESTAURANT.name} logo`}
              width={110}
              height={110}
              className="h-16 w-auto"
            />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors duration-300 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to site
          </Link>
        </div>
      </header>

      {/* Title */}
      <div className="bg-primary text-white border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-4">
          <p className="font-script text-3xl text-secondary">Good to know</p>
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">{title}</h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-2xl">{intro}</p>
          <p className="text-white/50 text-sm mt-4">Last updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Body */}
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-10">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-bold font-heading text-primary mb-4">
                  {section.heading}
                </h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="text-gray-700 leading-relaxed mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-3 space-y-2">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-gray-700">
                        <span className="w-2 h-2 rounded-full bg-secondary flex-shrink-0 mt-2"></span>
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* Contact */}
            <section className="border-t border-dashed border-gray-300 pt-8">
              <h2 className="text-2xl font-bold font-heading text-primary mb-4">
                Questions about this policy?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-5">
                We are happy to talk it through. Reach us any of these ways and we will get back to
                you.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-700">
                  <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  {RESTAURANT.addressShort}
                </li>
                <li>
                  <a
                    href={RESTAURANT.phoneHref}
                    className="flex items-center gap-3 text-gray-700 hover:text-secondary transition-colors"
                  >
                    <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                    {RESTAURANT.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${RESTAURANT.email}`}
                    className="flex items-center gap-3 text-gray-700 hover:text-secondary transition-colors break-all"
                  >
                    <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                    {RESTAURANT.email}
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      {/* Slim footer */}
      <footer className="bg-primary text-white">
        <div className="h-1 bg-gradient-to-r from-secondary via-yellow-300 to-secondary"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-5">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/70 hover:text-secondary transition-colors duration-300 text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-white/50 text-sm text-center">
            © {new Date().getFullYear()} {RESTAURANT.name} - {RESTAURANT.tagline} | Liverpool NSW
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LegalPageShell;
