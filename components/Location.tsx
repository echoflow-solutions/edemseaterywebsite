'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Clock, Phone, Mail, Car, Train, ParkingSquare } from 'lucide-react';

const Location = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const hours = [
    { day: 'Tuesday - Saturday', time: '11:00 AM - 8:00 PM' },
    { day: 'Sunday', time: '1:00 PM - 8:00 PM' },
    { day: 'Monday', time: 'CLOSED', closed: true },
  ];

  const transport = [
    { icon: Car, text: '45 minutes drive from Sydney CBD' },
    { icon: Train, text: '10 minute walk from Liverpool Train Station' },
    { icon: ParkingSquare, text: 'Street parking available' },
  ];

  return (
    <section id="contact" className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-t from-secondary to-transparent rounded-full filter blur-3xl"></div>
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
            Visit Us <span className="text-secondary text-glow">Today</span>
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto shimmer"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px] lg:h-[500px] group"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3311.9999999999995!2d150.9229999999999!3d-33.939999999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12bad3c8c8c8c9%3A0x0!2s4%2F158%20Macquarie%20Street%2C%20Liverpool%20NSW%202170!5e0!3m2!1sen!2sau!4v1635000000000!5m2!1sen!2sau"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="filter grayscale group-hover:grayscale-0 transition-all duration-500"
            ></iframe>
            
            {/* Map overlay with address */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-transparent p-6">
              <div className="bg-white/95 backdrop-blur rounded-lg p-4 shadow-lg">
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-secondary mt-1" />
                  <div>
                    <p className="font-semibold text-primary">Edem&apos;s Eatery</p>
                    <p className="text-gray-600">4/158 Macquarie Street</p>
                    <p className="text-gray-600">Liverpool NSW 2170</p>
                    <p className="text-gray-600">Sydney, Australia</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Hours */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-primary">Operating Hours</h3>
              </div>
              <div className="space-y-3">
                {hours.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-gray-700">{item.day}</span>
                    <span className={`font-semibold ${item.closed ? 'text-red-500' : 'text-primary'}`}>
                      {item.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-primary mb-4">Contact Information</h3>
              <div className="space-y-4">
                <motion.a
                  href="tel:0272388800"
                  className="flex items-center gap-3 text-gray-700 hover:text-secondary transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-secondary" />
                  </div>
                  <span className="font-medium">(02) 7238 8800</span>
                </motion.a>
                
                <motion.a
                  href="mailto:info@edemseatery.com"
                  className="flex items-center gap-3 text-gray-700 hover:text-secondary transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-secondary" />
                  </div>
                  <span className="font-medium">info@edemseatery.com</span>
                </motion.a>

                <motion.a
                  href="https://instagram.com/edemseatery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-700 hover:text-secondary transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                    </svg>
                  </div>
                  <span className="font-medium">@edemseatery</span>
                </motion.a>
              </div>
            </div>

            {/* Getting Here */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-primary mb-4">Getting Here</h3>
              <div className="space-y-3">
                {transport.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <item.icon className="w-5 h-5 text-secondary" />
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Order Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-4 bg-secondary text-primary rounded-full font-bold btn-shimmer glow hover:bg-secondary/90 transition-all duration-300 shadow-lg"
              >
                ORDER FOR PICKUP
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all duration-300 shadow-lg"
              >
                ORDER FOR DELIVERY
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Location;