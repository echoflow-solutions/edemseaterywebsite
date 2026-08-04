'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { popularItems } from '@/lib/menu';
import { ORDER_URL } from '@/lib/site';

const GoldCaret = ({ pointsUp }: { pointsUp: boolean }) => (
  <svg
    className="w-5 h-3 text-secondary mx-auto"
    viewBox="0 0 20 12"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d={pointsUp ? 'M10 0 L20 12 L0 12 Z' : 'M10 12 L0 0 L20 0 Z'} />
  </svg>
);

const PopularItems = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Testimonial over a dish photo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative min-h-[520px] flex items-center justify-center p-8 md:p-14"
        >
          <Image
            src="/media/banku-tilapia.jpg"
            alt="Grilled tilapia served with banku and pepper sauce"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-primary/80"></div>

          <div className="relative z-10 text-center max-w-lg">
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: 5 }, (_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Star className="w-6 h-6 fill-secondary text-secondary" />
                </motion.div>
              ))}
            </div>

            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">
              Our most popular food items
            </h2>
            <div className="border-t border-dashed border-white/40 mb-6"></div>

            <p className="text-white/90 leading-relaxed mb-6">
              I&apos;m a Ghanaian Australian and I&apos;ve just gotten back from Ghana last month.
              I&apos;ve always loved Ghanaian food, and I thought of inviting some people from my
              church who are non-Ghanaians to this Ghanaian restaurant in Liverpool, as I wanted
              them to try Ghanaian food for the first time.
            </p>

            <p className="text-white font-bold text-lg">Richard Boachie</p>
            <p className="font-script text-xl text-secondary">Customer</p>
          </div>
        </motion.div>

        {/* Price cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-olive flex items-center justify-center p-8 md:p-14"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-xl">
            {popularItems.map((item, index) => (
              <motion.button
                key={item.name}
                type="button"
                onClick={() => {
                  window.location.href = ORDER_URL;
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white/10 hover:bg-white/20 transition-colors duration-300 rounded-lg p-6 text-center cursor-pointer"
              >
                <h3 className="text-white font-bold text-lg leading-snug mb-2">{item.name}</h3>
                <p className="text-secondary font-semibold mb-3">{item.price}</p>
                <GoldCaret pointsUp={index % 2 === 0} />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularItems;
