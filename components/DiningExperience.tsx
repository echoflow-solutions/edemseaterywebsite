'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const pillars = [
  {
    number: '01',
    title: 'Warm Hospitality',
    description:
      'Relaxed service, welcoming energy, and a dining space made for sharing good moments.',
  },
  {
    number: '02',
    title: 'Generous Plates',
    description: 'Comforting portions, layered spices, and soulful flavours served with care.',
  },
  {
    number: '03',
    title: 'Cultural Soul',
    description:
      'A celebration of Ghanaian food traditions, brought to life with modern elegance.',
  },
];

const DiningExperience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-cream relative overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          {/* Statement card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl relative z-20 lg:mr-[-3rem]"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-px bg-secondary"></span>
              <span className="font-script text-2xl text-secondary">The dining experience</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold font-heading text-primary leading-tight mb-6">
              A warm table, bold flavours, lasting memories.
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Every visit is designed to feel generous, welcoming, and full of character &mdash;
              where rich Ghanaian cooking meets a refined Liverpool dining atmosphere.
            </p>

            <div className="inline-flex items-center gap-3 bg-cream border border-primary/10 rounded-full px-6 py-3 shadow-sm">
              {['Gather', 'Share', 'Celebrate'].map((word, index) => (
                <span key={word} className="flex items-center gap-3">
                  {index > 0 && <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>}
                  <span className="text-sm font-bold tracking-widest uppercase text-primary">
                    {word}
                  </span>
                </span>
              ))}
            </div>
          </motion.div>

          {/* Pillars panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-olive rounded-2xl p-8 md:p-12 lg:pl-20 pt-16 lg:pt-12 mt-[-2rem] lg:mt-0 shadow-2xl"
          >
            <div className="space-y-5">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.15 }}
                  className="flex items-start gap-4 bg-white/10 rounded-xl p-5 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300"
                >
                  <span className="w-11 h-11 flex-shrink-0 rounded-full bg-secondary text-primary font-bold text-sm flex items-center justify-center">
                    {pillar.number}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{pillar.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{pillar.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DiningExperience;
