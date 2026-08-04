'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useOrder } from './OrderProvider';

const FloatingOrderButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { mode, itemCount, openCart, openChooser } = useOrder();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Once the customer is building a pickup order the button becomes the cart.
  const showingCart = mode === 'pickup' && itemCount > 0;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => (showingCart ? openCart() : openChooser())}
          aria-label={showingCart ? `View your order, ${itemCount} items` : 'Start an order'}
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
              <span className="hidden sm:inline">
                {showingCart ? 'VIEW ORDER' : 'ORDER NOW'}
              </span>
              {showingCart && (
                <span className="min-w-[1.5rem] h-6 px-1.5 rounded-full bg-primary text-secondary text-sm flex items-center justify-center">
                  {itemCount}
                </span>
              )}
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
