'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import MenuPDFViewer from './MenuPDFViewer';

const Menu = () => {
  const [activeTab, setActiveTab] = useState('appetizers');
  const [isPDFOpen, setIsPDFOpen] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const menuData = {
    appetizers: [
      { name: 'Chinchinga (Suya/Kebab)', price: '$10.00', description: 'Ghanaian-style beef or chicken skewers seasoned and served with a spicy rub (3 pcs)' },
      { name: 'Yam Chips', price: '$10.00', description: 'Thick-cut yam slices fried until golden, served with a spicy dipping sauce (6pcs)' },
      { name: 'Spring Rolls', price: '$7.00', description: 'Crispy spring rolls stuffed with seasoned vegetables and a hint of local spices, served with a tangy chili dipping sauce (5pcs)' },
      { name: 'Kelewele', price: '$10.00', description: 'Spiced fried ripped plantain. Peanuts (+$2)' },
      { name: 'Kosua ne Meko', price: '$5.00', description: 'Boiled egg with chilli (1)' },
    ],
    mains: [
      { name: 'Jollof Rice', price: '$25.00', description: 'Ghanaian style tomato rice infused with local spices, served with garden salad & shito (black fish chilli sauce) + your choice of protein: chicken, fish (+$5), lamb (+$3), beef stew (+$3)' },
      { name: 'Fried Rice', price: '$25.00', description: 'Ghanaian-style fried rice contains vegetables and a hint of local spices, served with a side of green chilli and with garden salad + your choice of protein: chicken, fish (+$5), lamb (+$3), beef stew (+$3)' },
      { name: 'Waakye (Rice + beans)', price: '$28.00', description: 'A unique Ghanaian rice and bean. Served with gari, spaghetti, beef stew (tomato beef stew), shito (black fish chilli sauce) + served with garden salad' },
      { name: 'Banku or Kenkey', price: 'From $28.00', description: 'Fermented corn and cassava dough meal, served with a selected side of your choice. Side options: Tilapia soup ($30), Okra Soup and beef ($30), Fried fish and assorted chilli ($28), Grilled tilapia and assorted chili ($30), Grilled barramundi and assorted chili ($40)' },
      { name: 'Fufu', price: 'From $28.00', description: 'Pounded cassava and plantain, served with a selected soup of choice. Side options: Tilapia soup ($30), Goat meat pepper soup ($30), Light Soup with chicken ($28), Peanut Soup with beef ($28), Peanut Soup with chicken ($28)' },
      { name: 'Semolina Fufu or Eba or White Rice or Pounded Yam + Egusi Stew', price: '$30.00', description: 'Semolina fufu is a thick, dough-like dish made from semolina flour and water. Eba (garri) is a starchy food made from dried cassava. Jazmine rice served. Spiced spinach is cooked in a rich palm oil base with egusi (melon seeds) w/ beef and dried fish' },
      { name: 'White Rice + Beef Stew', price: '$28.00', description: 'Jazmine rice served with beef stew + garden salad' },
      { name: 'Red Red (Kokoo + Beans)', price: '$25.00', description: 'Fried ripped plantain served with black-eyed peas stew (sauce)' },
      { name: 'Omotuo', price: 'From $28.00', description: 'Soft, sticky rice balls served with a rich side of your choice. Side options: Tilapia soup ($30), Goat meat pepper soup ($30), Light Soup with chicken ($28), Peanut Soup with beef ($28), Peanut Soup with chicken ($28)' },
      { name: 'Sadza/Ugali', price: '$28.00', description: 'A staple African dish made from finely ground white maize, cooked to a smooth, thick consistency. Served with your choice of meat & vegetable relish, such as beef stew or chicken and sautéed greens' },
      { name: 'Ampesi + Kontomire', price: '$35.00', description: 'Kontomire stew is a popular and healthy Ghanaian dish made with cocoyam leaves & spinach. It\'s full of flavor and nutrients and is served with beef & ampesi which is boiled yam or plantain & a boiled egg' },
    ],
    kidsMenu: [
      { name: 'Chips', price: '$8.00', description: 'Crispy fried potato chips' },
      { name: 'Chicken + Chips', price: '$15.00', description: 'Crispy fried potato chips + Fried Chicken' },
    ],
    desserts: [
      { name: 'Boflot (Puff Puff)', price: '$10.00', description: 'Light and fluffy fried dough balls with a hint of sweetness, perfect for breakfast or as a snack. Crispy on the outside and soft on the inside, they\'re delicious on their own or with toppings of your choice (3pc). Flavours: Cinnamon Sugar (+$2), Cookie + Cream (+$2), Biscoff (+$2)' },
      { name: 'Waffles', price: '$12.00', description: 'Flavours: Cinnamon Sugar + ice cream, Cookie + Cream + ice cream, Biscoff + ice cream, Strawberries, bananas & chocolate + ice cream' },
      { name: 'Fries', price: '$8.00', description: 'Flavored with different choices and assorted chili' },
    ],
    drinks: [
      { name: 'Water', price: '$2.00', description: '' },
      { name: 'Soft drink (Cans)', price: '$3.00', description: '' },
      { name: 'Soft drink (Bottle)', price: '$4.50', description: '' },
      { name: 'Juice', price: '$4.00', description: '' },
      { name: 'Malt', price: '$4.50', description: '' },
      { name: 'Sobolo (Hibiscus drink)', price: '$4.00', description: '' },
      { name: 'Emudro (Ginger drink)', price: '$4.00', description: '' },
    ],
    proteins: [
      { name: 'Boiled egg', price: '$3.00', description: '' },
      { name: 'Chicken', price: '$10.00', description: '' },
      { name: 'Beef stew', price: '$7.00', description: '' },
      { name: 'Goat', price: '$10.00', description: '' },
      { name: 'Lamb cutlets', price: '$15.00', description: '' },
      { name: 'Ghanaian meat pie', price: '$10.00', description: '' },
      { name: 'Fried fish', price: '$15.00', description: '' },
      { name: 'Grilled tilapia', price: '$25.00', description: '' },
      { name: 'Grilled barramundi', price: '$35.00', description: '' },
    ],
  };

  const tabs = [
    { id: 'appetizers', label: 'Appetizers' },
    { id: 'mains', label: 'Main Courses' },
    { id: 'kidsMenu', label: 'Kids Menu' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'drinks', label: 'Drinks' },
    { id: 'proteins', label: 'Protein Add-ons' },
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