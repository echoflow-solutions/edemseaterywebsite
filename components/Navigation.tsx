'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { ORDER_OPTIONS } from '@/lib/site';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Catering', href: '#catering' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [takeawayOpen, setTakeawayOpen] = useState(false);
  const takeawayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    // Initialize scroll state based on current position
    setScrolled(window.scrollY > 20);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dismiss the takeaway menu on outside click or Escape
  useEffect(() => {
    if (!takeawayOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (takeawayRef.current && !takeawayRef.current.contains(event.target as Node)) {
        setTakeawayOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setTakeawayOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [takeawayOpen]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-primary/95 backdrop-blur-md shadow-lg shadow-secondary/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-28 lg:h-36 xl:h-40">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="/media/logo-new.png"
              alt="Edem's Eatery Logo"
              className="h-24 md:h-28 lg:h-36 w-auto relative z-10"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(255, 193, 7, 0.6)) drop-shadow(0 6px 10px rgba(0, 0, 0, 0.4)) brightness(1.1)',
              }}
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-4 xl:space-x-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="text-white hover:text-secondary transition-colors duration-300 px-2 py-3 text-base xl:text-lg font-bold relative group"
                  style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </motion.a>
              ))}

              {/* Takeaway dropdown */}
              <div className="relative" ref={takeawayRef}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTakeawayOpen((open) => !open)}
                  aria-haspopup="menu"
                  aria-expanded={takeawayOpen}
                  className="flex items-center gap-2 bg-secondary text-primary px-6 py-3 rounded-full font-bold btn-shimmer glow hover:bg-secondary/90 transition-all duration-300"
                >
                  TAKEAWAY
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      takeawayOpen ? 'rotate-180' : ''
                    }`}
                  />
                </motion.button>

                <AnimatePresence>
                  {takeawayOpen && (
                    <motion.div
                      role="menu"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl overflow-hidden border border-secondary/20"
                    >
                      {ORDER_OPTIONS.map((option) => (
                        <a
                          key={option.label}
                          role="menuitem"
                          href={option.href}
                          onClick={() => setTakeawayOpen(false)}
                          className="block px-5 py-4 hover:bg-secondary/10 transition-colors duration-200 border-b border-gray-100 last:border-0"
                        >
                          <span className="block font-bold text-primary">{option.label}</span>
                          <span className="block text-sm text-gray-500">{option.description}</span>
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className="text-secondary hover:text-white transition-colors duration-300"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        className="lg:hidden overflow-hidden bg-primary/95 backdrop-blur-md"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className="text-white hover:text-secondary block px-3 py-2 text-base font-medium transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}

          <div className="pt-4 mt-2 border-t border-white/20 space-y-2">
            <p className="px-3 text-secondary text-sm font-bold tracking-wider uppercase">
              Takeaway
            </p>
            {ORDER_OPTIONS.map((option) => (
              <a
                key={option.label}
                href={option.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-3 py-2 text-white hover:text-secondary transition-colors duration-300"
              >
                <span className="font-medium">{option.label}</span>
                <span className="text-white/50 text-sm">{option.description}</span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navigation;
