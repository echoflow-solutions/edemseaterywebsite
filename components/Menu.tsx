'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { UtensilsCrossed } from 'lucide-react';
import Image from 'next/image';
import MenuPDFViewer from './MenuPDFViewer';

const Menu = () => {
  const [isPDFOpen, setIsPDFOpen] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const menuData = {
    appetizers: [
      { name: 'Chinchinga (Suya/Kebab)(3pcs)', price: '$10.00', description: 'Ghanaian-style beef or chicken skewers seasoned and served with a spicy sauce', image: '/media/kebab.jpg' },
      { name: 'Yam Chips (6pcs)', price: '$10.00', description: 'Thick-cut yam slices fried until golden, served with a spicy dipping sauce', image: null },
      { name: 'Spring Rolls (5pcs)', price: '$7.00', description: 'Crispy spring rolls stuffed with seasoned vegetables and a hint of local spices', image: '/media/spring-rolls.jpg' },
      { name: 'Kelewele', price: '$10.00', description: 'Spiced fried ripped plantain', image: '/media/beans-plantain.jpg' },
      { name: 'Kosua ne Meko', price: '$5.00', description: 'Boiled egg with chilli', image: '/media/egg-chilli.jpg' },
    ],
    kidsMenu: [
      { name: 'Chips', price: '$8.00', description: 'Crispy fried potato chips', image: null },
      { name: 'Chicken + Chips', price: '$15.00', description: 'Crispy fried potato chips + Fried chicken', image: null },
    ],
    mains: [
      { name: 'Jollof Rice', price: '$25.00', description: 'Ghanaian style tomato rice infused with local spices, served with garden salad', image: '/media/jollof-chicken.jpg' },
      { name: 'Fried Rice', price: '$25.00', description: 'Ghanaian-style fried rice contains vegetables and a hint of local spices', image: '/media/fried-rice.jpg' },
      { name: 'Waakye (Rice + Beans)', price: '$28.00', description: 'A unique Ghanaian rice and bean dish. Served with gari, spaghetti, beef stew', image: '/media/waakye.jpg' },
      { name: 'Banku', price: '$28.00', description: 'Fermented corn and cassava dough meal, served with a selected side of your choice', image: '/media/banku-tilapia.jpg' },
      { name: 'Kenkey', price: '$28.00', description: 'Kenkey is a fermented maize dough that is a staple food in Ghana, served with fish and pepper', image: null },
      { name: 'Fufu', price: '$28.00', description: 'Pounded cassava and plantain, served with a selected soup of choice', image: '/media/fufu.jpg' },
      { name: 'Ampesi + Kontomire', price: '$35.00', description: 'Kontomire stew is a popular and healthy Ghanaian dish made with cocoyam leaves', image: null },
      { name: 'Omotuo', price: '$28.00', description: 'Soft, sticky rice balls served with a rich side of your choice', image: null },
      { name: 'Red Red (Kokoo + Beans)', price: '$25.00', description: 'Fried ripped plantain served with black eyed peas stew (sauce)', image: null },
      { name: 'Sadza/Ugali', price: '$28.00', description: 'A staple African dish made from finely ground white maize, cooked to a smooth consistency', image: null },
      { name: 'Semolina Fufu + Egusi Stew', price: '$30.00', description: 'Semolina fufu is a thick, dough-like dish made from semolina flour and water', image: null },
      { name: 'Eba + Egusi Stew', price: '$30.00', description: 'Eba (garri) is a starchy food made from dried cassava. Spiced spinach is cooked with egusi', image: null },
      { name: 'Pounded Yam + Egusi Stew', price: '$30.00', description: 'Traditional Nigerian dish with pounded yam and egusi, a savory melon seed stew', image: null },
      { name: 'White Rice + Beef Stew', price: '$28.00', description: 'Jazmine rice served with beef stew + garden salad', image: null },
    ],
    proteins: [
      { name: 'Boiled Egg', price: '$3.00', description: 'Perfect protein addition to any meal', image: null },
      { name: 'Chicken', price: '$10.00', description: 'Succulent grilled or fried chicken', image: null },
      { name: 'Beef Stew', price: '$7.00', description: 'Rich and flavorful beef stew', image: null },
      { name: 'Goat', price: '$10.00', description: 'Tender goat meat', image: null },
      { name: 'Lamb Cutlets', price: '$15.00', description: 'Juicy lamb cutlets grilled to perfection', image: null },
      { name: 'Ghanaian Meat Pie', price: '$10.00', description: 'Savory pastry filled with spiced meat', image: null },
      { name: 'Fried Fish', price: '$15.00', description: 'Crispy fried fish fillet', image: null },
      { name: 'Grilled Tilapia', price: '$25.00', description: 'Fresh tilapia grilled with Ghanaian spices', image: null },
      { name: 'Grilled Barramundi', price: '$35.00', description: 'Premium barramundi grilled to perfection', image: null },
    ],
    desserts: [
      { name: 'Boflot (Puff Puff)(3pcs)', price: '$10.00', description: 'Light and fluffy fried dough balls with a hint of sweetness, perfect for dessert', image: null },
      { name: 'Waffles', price: '$12.00', description: 'Golden crispy waffles served with syrup', image: '/media/waffles.jpg' },
    ],
    drinks: [
      { name: 'Water', price: '$2.00', description: 'Refreshing bottled water', image: null },
      { name: 'Softdrink (Cans)', price: '$3.00', description: 'Assorted canned soft drinks', image: null },
      { name: 'Softdrink (Bottle)', price: '$4.50', description: 'Assorted bottled soft drinks', image: null },
      { name: 'Juice', price: '$4.00', description: 'Fresh fruit juice', image: null },
      { name: 'Malt', price: '$4.50', description: 'Rich malt drink', image: null },
      { name: 'Sobolo (Hibiscus Drink)', price: '$4.00', description: 'Traditional hibiscus drink', image: null },
      { name: 'Emudro (Ginger Drink)', price: '$4.00', description: 'Spicy ginger drink', image: null },
    ],
  };

  const menuSections = [
    { id: 'appetizers', label: 'APPETISERS', items: menuData.appetizers },
    { id: 'kidsMenu', label: 'KIDS MENU', items: menuData.kidsMenu },
    { id: 'mains', label: 'MAIN COURSE', items: menuData.mains },
    { id: 'proteins', label: 'PROTEIN', items: menuData.proteins },
    { id: 'desserts', label: 'DESSERT', items: menuData.desserts },
    { id: 'drinks', label: 'DRINKS', items: menuData.drinks },
  ];

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
                      window.location.href = 'https://orders.wowapps.com/order/edemseatery?src=web';
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

                      {/* Price Badge */}
                      <div className="absolute top-4 right-4 bg-secondary text-primary px-4 py-2 rounded-full font-bold text-lg shadow-lg glow">
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