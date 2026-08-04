'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Bike, X, ExternalLink, Clock } from 'lucide-react';
import { useOrder } from './OrderProvider';
import { DELIVERY_PLATFORMS, RESTAURANT } from '@/lib/site';
import { PICKUP_SETTINGS } from '@/lib/hours';

const OrderModeModal = () => {
  const { chooserOpen, closeChooser, chooseMode } = useOrder();

  // Lock background scroll and allow Escape to dismiss.
  useEffect(() => {
    if (!chooserOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeChooser();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [chooserOpen, closeChooser]);

  return (
    <AnimatePresence>
      {chooserOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={closeChooser}
          role="dialog"
          aria-modal="true"
          aria-labelledby="order-mode-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <button
              type="button"
              onClick={closeChooser}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-primary" />
            </button>

            <div className="p-6 sm:p-8">
              <p className="font-script text-2xl text-secondary">Let&apos;s get you fed</p>
              <h2
                id="order-mode-title"
                className="text-2xl sm:text-3xl font-bold font-heading text-primary mb-6"
              >
                How would you like your order?
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Pickup */}
                <button
                  type="button"
                  onClick={() => chooseMode('pickup')}
                  className="group text-left p-6 rounded-xl border-2 border-secondary bg-secondary/5 hover:bg-secondary/15 transition-colors duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                    <ShoppingBag className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-1">Pickup</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    Build your order here, pay online, then collect it from the shop.
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    <Clock className="w-4 h-4 text-secondary" />
                    Ready in about {PICKUP_SETTINGS.prepMinutes} minutes
                  </span>
                </button>

                {/* Delivery */}
                <div className="p-6 rounded-xl border-2 border-gray-200">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4">
                    <Bike className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-1">Delivery</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Delivery is handled by our partners. Pick one to continue.
                  </p>

                  <div className="space-y-2">
                    {DELIVERY_PLATFORMS.map((platform) => (
                      <a
                        key={platform.label}
                        href={platform.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => chooseMode('delivery')}
                        className="flex items-center justify-between gap-2 px-4 py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 transition-colors duration-200"
                      >
                        {platform.label}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-center text-sm text-gray-500 mt-6">
                Prefer to talk to someone?{' '}
                <a
                  href={RESTAURANT.phoneHref}
                  className="font-semibold text-primary hover:text-secondary transition-colors"
                >
                  Call {RESTAURANT.phoneDisplay}
                </a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderModeModal;
