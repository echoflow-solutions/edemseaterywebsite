'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Phone } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pre-generate particle data to avoid hydration issues
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 30 + 20, // 20-50px particles
      initialX: Math.random() * 100, // 0-100% of screen width
      midX: Math.random() * 100,
      endX: Math.random() * 100,
      duration: Math.random() * 30 + 25, // 25-55 seconds
      delay: Math.random() * 20, // 0-20 seconds delay
      opacity: Math.random() * 0.4 + 0.3, // 0.3-0.7 opacity
    }));
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2187')`,
          }}
        ></div>
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent z-20"></div>
      </div>

      {/* Floating particles effect - only render after mount */}
      {mounted && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                background: `radial-gradient(circle, rgba(255, 193, 7, ${particle.opacity + 0.3}) 0%, rgba(255, 193, 7, ${particle.opacity}) 50%, transparent 70%)`,
                boxShadow: `0 0 ${particle.size}px rgba(255, 193, 7, 0.6), 0 0 ${particle.size * 2}px rgba(255, 193, 7, 0.3)`,
              }}
              initial={{ 
                left: `${particle.initialX}%`,
                bottom: '-10%',
                opacity: 0,
              }}
              animate={{ 
                left: [
                  `${particle.initialX}%`,
                  `${particle.midX}%`,
                  `${particle.endX}%`
                ],
                bottom: ['-10%', '50%', '110%'],
                opacity: [0, particle.opacity, particle.opacity, 0],
              }}
              transition={{ 
                duration: particle.duration,
                repeat: Infinity,
                ease: 'linear',
                delay: particle.delay,
                times: [0, 0.5, 1],
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-30 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pt-8 md:pt-0"
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading text-white mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block">Authentic</span>
            <span className="text-secondary text-glow">Ghanaian Cuisine</span>
            <span className="block text-3xl md:text-5xl mt-4">in Liverpool</span>
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-white/90 mb-8 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Where Every Bite Tells a Story of Heritage, Flavor &amp; Passion
          </motion.p>

          {/* Service badges */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {['100% Halal', 'Dine-in', 'Takeaway', 'Catering'].map((badge, index) => (
              <motion.span
                key={badge}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white border border-secondary/30"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 193, 7, 0.2)' }}
              >
                {badge}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="relative px-8 py-4 bg-secondary text-primary rounded-full font-bold text-lg btn-shimmer glow overflow-hidden group cursor-pointer"
            >
              <span className="relative z-10">ORDER NOW - Delivery &amp; Pickup</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const menuSection = document.getElementById('menu');
                if (menuSection) {
                  menuSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 py-4 border-2 border-secondary text-secondary rounded-full font-bold text-lg hover:bg-secondary hover:text-primary transition-all duration-300 cursor-pointer"
            >
              View Menu
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Quick info */}
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {[
            { icon: MapPin, text: '4/158 Macquarie St, Liverpool' },
            { icon: Clock, text: 'Tue-Sat: 11AM-8PM, Sun: 1PM-8PM' },
            { icon: Phone, text: '(02) 7238 8800' },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center gap-2 text-white/80"
              whileHover={{ scale: 1.05, color: '#FFC107' }}
            >
              <item.icon size={20} className="text-secondary" />
              <span className="text-sm">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
};

export default Hero;