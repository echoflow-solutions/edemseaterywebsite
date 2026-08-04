'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { RESTAURANT } from '@/lib/site';

const highlights = [
  'Rich Ghanaian flavours crafted with warmth and care.',
  'Fresh ingredients served with bold authentic taste.',
  'Memorable dining made for every special occasion.',
  'Comforting dishes inspired by culture and tradition.',
];

const ValueProps = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-gradient-to-b from-white to-cream relative overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Headline block: image, overlapping caption, benefit list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative h-[380px] md:h-[460px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/media/fried-rice.jpg"
              alt="Fried rice with grilled meat, salad and house sauces"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-primary leading-tight mb-6">
              Delicious food to make every occasion{' '}
              <span className="text-secondary text-glow">special</span>
            </h2>

            {/* Caption card, pulled left on desktop so it overlaps the image edge */}
            <div className="bg-primary text-white p-6 rounded-xl shadow-xl mb-8 lg:-ml-24 relative z-20">
              <p className="text-lg leading-relaxed">
                Delicious Ghanaian food, crafted with care to make every occasion feel special.
              </p>
            </div>

            <ul className="space-y-1">
              {highlights.map((highlight, index) => (
                <motion.li
                  key={highlight}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-3 py-3 border-b border-dashed border-gray-300 last:border-0"
                >
                  <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-1" strokeWidth={3} />
                  <span className="text-gray-700 text-lg">{highlight}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Established card paired with a second dish photo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mt-16 rounded-2xl overflow-hidden shadow-2xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-cream p-10 md:p-14 flex flex-col items-center justify-center text-center"
          >
            <div className="flex items-center gap-4 w-full max-w-xs mb-2">
              <span className="h-px flex-1 bg-primary/30"></span>
              <span className="font-script text-2xl text-primary/70">Since</span>
              <span className="h-px flex-1 bg-primary/30"></span>
            </div>
            <p className="text-6xl md:text-7xl font-bold font-heading text-primary">
              {RESTAURANT.established}
            </p>
            <div className="w-full max-w-xs h-px bg-primary/30 mt-2 mb-8"></div>

            <h3 className="text-2xl md:text-3xl font-bold font-heading text-primary mb-8">
              Fresh flavours made memorable.
            </h3>

            <div className="w-full max-w-xs border-t border-dashed border-primary/20 pt-6">
              <p className="font-script text-2xl text-primary/70">We are open</p>
              <p className="text-xl font-bold text-primary mt-1">Tuesday &ndash; Sunday</p>
            </div>

            <div className="w-full max-w-xs border-t border-dashed border-primary/20 mt-6 pt-6">
              <p className="text-sm text-gray-600">{RESTAURANT.addressShort}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="relative min-h-[360px] lg:min-h-full"
          >
            <Image
              src="/media/waakye.jpg"
              alt="Waakye served with gari, spaghetti, salad and beef stew"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
