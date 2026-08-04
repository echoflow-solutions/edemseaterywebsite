'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Briefcase, PartyPopper, Phone, Mail } from 'lucide-react';
import { CATERING_SERVICES, RESTAURANT } from '@/lib/site';

const serviceIcons = [Heart, Briefcase, PartyPopper];

const Catering = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="catering"
      className="py-20 bg-primary relative overflow-hidden scroll-mt-28 lg:scroll-mt-36 xl:scroll-mt-40"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent rounded-full filter blur-3xl"></div>
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="font-script text-3xl text-secondary mb-1">Our services</p>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
            Catering for <span className="text-secondary text-glow">every occasion</span>
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto shimmer"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATERING_SERVICES.map((service, index) => {
            const Icon = serviceIcons[index];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.12 }}
                whileHover={{ y: -6 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300"
              >
                <div className="w-14 h-14 bg-secondary/20 rounded-full flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-white/70 leading-relaxed">{service.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-white/80 mb-6">
            Tell us your date, guest count and the dishes you have in mind &mdash; we will put a
            quote together for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href={RESTAURANT.phoneHref}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-primary rounded-full font-bold btn-shimmer glow hover:bg-secondary/90 transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              {RESTAURANT.phoneDisplay}
            </motion.a>
            <motion.a
              href={`mailto:${RESTAURANT.email}?subject=Catering%20enquiry`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-secondary text-secondary rounded-full font-bold hover:bg-secondary hover:text-primary transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
              Email an enquiry
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Catering;
