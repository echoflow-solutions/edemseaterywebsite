'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Truck, Calendar, Users } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    { icon: Shield, title: '100% Halal Certified', description: 'All our ingredients are carefully sourced and certified' },
    { icon: Truck, title: 'Full Catering Services', description: 'Perfect for events, parties, and special occasions' },
    { icon: Calendar, title: 'Event & Party Orders', description: 'We cater to all your special celebrations' },
    { icon: Users, title: 'Delivery Partners', description: 'Available on all major delivery platforms' },
  ];

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full filter blur-3xl"></div>
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
            Welcome to <span className="text-secondary text-glow whitespace-nowrap">Edem&apos;s Eatery</span>
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto shimmer"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src="/media/all1.png"
                alt="Delicious Ghanaian Cuisine"
                className="w-full h-[500px] object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent"></div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary/20 rounded-full filter blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/20 rounded-full filter blur-xl"></div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-700 leading-relaxed">
              Welcome to Edem&apos;s Eatery, Liverpool&apos;s premier destination for authentic Ghanaian cuisine. 
              Nestled in the heart of the city, we bring the rich flavors, vibrant culture, and warm 
              hospitality of Ghana to the bustling streets of Liverpool.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              At Edem&apos;s Eatery, we take pride in crafting traditional Ghanaian dishes with a modern twist, 
              ensuring every bite tells a story of heritage, flavor, and passion. From our savory jollof rice, 
              perfectly spiced waakye, and tender goat light soup, to our crispy kelewele and indulgent banku 
              with tilapia, each dish is prepared using fresh, locally sourced ingredients and authentic 
              Ghanaian spices.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our restaurant provides more than just food; it&apos;s a cultural experience. Whether you&apos;re joining 
              us for dine-in service, ordering takeaway, or booking us for your special event catering, we 
              promise an unforgettable journey through West African flavors.
            </p>
          </motion.div>
        </div>

        {/* Service Badges */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 to-secondary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-secondary/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-secondary/30 transition-colors duration-300">
                  <service.icon className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;