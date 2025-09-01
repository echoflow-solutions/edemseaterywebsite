'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Menu = () => {
  const [activeTab, setActiveTab] = useState('starters');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const menuData = {
    starters: [
      { name: 'Chinchinga (Suya/Kebab)', price: '$10.00', description: 'Ghanaian-style beef or chicken skewers seasoned and served with a spicy rub (2 pcs)' },
      { name: 'Fried Yam', price: '$7.00', description: 'Thick-cut yam slices fried until golden, served with spicy dipping sauce' },
      { name: 'Spring Rolls', price: '$6.00', description: 'Crispy spring rolls stuffed with seasoned vegetables and a hint of local spices (3pcs)' },
      { name: 'Kelewele', price: '$8.00', description: 'Spiced fried ripped plantain served with peanuts' },
    ],
    mains: [
      { name: 'Jollof Rice', price: '$25.00', description: 'Ghana\'s signature tomato rice infused with local spices, served with garden salad, shito and your choice of protein' },
      { name: 'Fried Rice', price: '$25.00', description: 'Ghanaian-style fried rice with vegetables and local spices, served with green chilli, garden salad and your choice of protein' },
      { name: 'Waakye (Rice + Beans)', price: '$28.00', description: 'Traditional rice and beans served with gari, spaghetti, beef stew, shito and garden salad' },
      { name: 'Banku', price: '$28.00', description: 'Fermented corn and cassava dough served with grilled tilapia and assorted chilli or Okra Soup ($30)' },
      { name: 'Fufu', price: '$28-30', description: 'Pounded cassava and plantain served with Light Soup with goat meat ($30) or Peanut Soup with chicken ($28)' },
      { name: 'Red Red (Kokoo + Beans)', price: '$25.00', description: 'Fried ripped plantain served with black-eyed peas stew' },
      { name: 'Omotuo', price: '$28.00', description: 'Soft, sticky rice balls served with Light Soup or Peanut Soup' },
    ],
    desserts: [
      { name: 'Boflot (Puff Puff)', price: '$10.00', description: 'Light fluffy fried dough balls - Choose from Cinnamon Sugar, Cookie + Cream, or Biscoff' },
      { name: 'Choc Strawberry Waffles', price: '$12.00', description: 'Waffles with bananas, strawberries, vanilla ice cream and chocolate' },
    ],
    beverages: [
      { name: 'Water', price: '$2.00', description: 'Still or sparkling' },
      { name: 'Soft Drinks (Can)', price: '$3.00', description: 'Variety of sodas' },
      { name: 'Soft Drinks (Bottle)', price: '$4.50', description: 'Premium sodas' },
      { name: 'Juice', price: '$4.00', description: 'Fresh fruit juices' },
    ],
  };

  const tabs = [
    { id: 'starters', label: 'Starters' },
    { id: 'mains', label: 'Main Courses' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'beverages', label: 'Beverages' },
  ];

  return (
    <section id="menu" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
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

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-secondary text-primary shadow-lg glow'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Menu Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          >
            {menuData[activeTab as keyof typeof menuData].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 overflow-hidden"
                whileHover={{ y: -5 }}
              >
                {/* Shimmer overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors duration-300">
                      {item.name}
                    </h3>
                    <span className="text-2xl font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>

                {/* Decorative corner element */}
                <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-secondary/10 rounded-full filter blur-2xl group-hover:bg-secondary/20 transition-all duration-300"></div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View Full Menu Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg btn-shimmer hover:bg-primary/90 transition-all duration-300 shadow-lg"
          >
            VIEW FULL MENU PDF
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Menu;