'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { UtensilsCrossed } from 'lucide-react';
import Image from 'next/image';
import MenuPDFViewer from './MenuPDFViewer';
import { menuSections } from '@/lib/menu';
import { ORDER_URL } from '@/lib/site';

const Menu = () => {
  const [isPDFOpen, setIsPDFOpen] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="menu" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden scroll-mt-28 lg:scroll-mt-36 xl:scroll-mt-40">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,193,7,0.1) 35px, rgba(255,193,7,0.1) 70px)`,
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-primary mb-4">
            Our Menu - <span className="text-secondary text-glow">Traditional Ghanaian Flavors</span>
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto shimmer"></div>
        </motion.div>

        {/* Menu Sections - Continuous List */}
        <div className="space-y-16">
          {menuSections.map((section, sectionIndex) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: sectionIndex * 0.2 }}
            >
              {/* Section Header */}
              <div className="text-center mb-8">
                <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {section.label}
                </h3>
                <div className="w-20 h-1 bg-secondary mx-auto shimmer"></div>
              </div>

              {/* Section Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {section.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
                    whileHover={{ y: -8, scale: 1.02 }}
                    onClick={() => {
                      window.location.href = ORDER_URL;
                    }}
                  >
                    {/* Image Section */}
                    <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary/10 to-secondary/10">
                          <UtensilsCrossed size={64} className="text-secondary/40" />
                        </div>
                      )}

                      {/* Price Badge — shrinks for items priced by add-ons */}
                      <div
                        className={`absolute top-4 right-4 bg-secondary text-primary px-4 py-2 rounded-full font-bold shadow-lg glow whitespace-nowrap ${
                          item.price.startsWith('$') ? 'text-lg' : 'text-xs'
                        }`}
                      >
                        {item.price}
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <span className="text-white font-bold text-lg bg-secondary/90 px-6 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          Click to Order
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors duration-300 mb-2 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{item.description}</p>
                    </div>

                    {/* Decorative corner element */}
                    <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-secondary/10 rounded-full filter blur-2xl group-hover:bg-secondary/30 transition-all duration-300"></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* View Full Menu Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.button
            onClick={() => setIsPDFOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg btn-shimmer hover:bg-primary/90 transition-all duration-300 shadow-lg"
          >
            VIEW FULL MENU PDF
          </motion.button>
        </motion.div>
      </div>

      {/* PDF Viewer Modal */}
      <MenuPDFViewer 
        isOpen={isPDFOpen} 
        onClose={() => setIsPDFOpen(false)} 
      />
    </section>
  );
};

export default Menu;