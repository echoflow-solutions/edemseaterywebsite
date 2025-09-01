'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

const FloatingOrderButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="fixed bottom-8 right-8 z-40 bg-secondary text-primary rounded-full shadow-2xl glow group overflow-hidden cursor-pointer"
        >
          <div className="relative px-6 py-4">
            {/* Pulse animation */}
            <div className="absolute inset-0 bg-secondary animate-pulse opacity-50"></div>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            {/* Content */}
            <div className="relative flex items-center gap-2 font-bold">
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">ORDER NOW</span>
            </div>
          </div>
          
          {/* Outer ring animation */}
          <div className="absolute -inset-2 bg-secondary/20 rounded-full animate-ping"></div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingOrderButton;