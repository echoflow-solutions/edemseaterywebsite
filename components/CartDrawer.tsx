'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Clock,
  AlertCircle,
  Phone,
  ArrowLeft,
  Loader2,
} from 'lucide-react';
import { useOrder } from './OrderProvider';
import { findMenuItem, formatCents, priceSelection, describeSelections } from '@/lib/menu';
import { getPickupAvailability, PICKUP_SETTINGS } from '@/lib/hours';
import { RESTAURANT, ORDER_URL } from '@/lib/site';

const CartDrawer = () => {
  const {
    cartOpen,
    closeCart,
    lines,
    itemCount,
    subtotalCents,
    setQuantity,
    clearCart,
    pickupWhen,
    setPickupWhen,
    checkoutEnabled,
  } = useOrder();

  const [step, setStep] = useState<'cart' | 'details'>('cart');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Availability depends on the current time, so it is resolved on the client
  // after mount. Rendering it during SSR would bake in the build time.
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    if (!cartOpen) return;
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, [cartOpen]);

  useEffect(() => {
    if (!cartOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeCart();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [cartOpen, closeCart]);

  const availability = useMemo(() => (now ? getPickupAvailability(now) : null), [now]);

  /** Every selectable slot, flattened, with its day prefixed onto the label. */
  const allSlots = useMemo(
    () =>
      availability
        ? availability.days.flatMap((day) =>
            day.slots.map((slot) => ({ ...slot, label: `${day.label}, ${slot.label}` }))
          )
        : [],
    [availability]
  );

  // If ASAP stops being offered (kitchen closed for the day), fall back to a slot.
  useEffect(() => {
    if (!availability) return;
    if (pickupWhen.type === 'asap' && !availability.asapAvailable && allSlots.length > 0) {
      const first = allSlots[0];
      setPickupWhen({ type: 'scheduled', value: first.value, label: first.label });
    }
  }, [availability, allSlots, pickupWhen, setPickupWhen]);

  const cartRows = lines.flatMap((line) => {
    const item = findMenuItem(line.id);
    if (!item) return [];
    const unitCents = priceSelection(item, line.options);
    if (unitCents === null) return [];
    return [{ line, item, unitCents, detail: describeSelections(item, line.options) }];
  });

  const orderingBlocked = availability !== null && allSlots.length === 0;

  // Reset back to the item list whenever the drawer is dismissed.
  useEffect(() => {
    if (!cartOpen) {
      setStep('cart');
      setSubmitError(null);
    }
  }, [cartOpen]);

  const detailsValid = name.trim().length >= 2 && phone.trim().length >= 8;

  const handlePay = async () => {
    if (!detailsValid || submitting) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Ids, quantities and option choices only — the server prices it.
          lines: lines.map((line) => ({
            id: line.id,
            quantity: line.quantity,
            options: line.options,
          })),
          pickupAt: pickupWhen.type === 'scheduled' ? pickupWhen.value : null,
          customer: {
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim() || undefined,
          },
          note: note.trim() || undefined,
        }),
      });

      const payload: { url?: string; error?: string } = await response
        .json()
        .catch(() => ({}));

      if (!response.ok || !payload.url) {
        setSubmitError(payload.error ?? 'We could not start the payment. Please try again.');
        setSubmitting(false);
        return;
      }

      // Hand off to Square's hosted checkout page.
      window.location.href = payload.url;
    } catch {
      setSubmitError('We could not reach the payment service. Please check your connection.');
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          onClick={closeCart}
          role="dialog"
          aria-modal="true"
          aria-label="Your order"
        >
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            onClick={(event) => event.stopPropagation()}
            className="absolute right-0 top-0 h-full w-full sm:w-[26rem] bg-cream shadow-2xl flex flex-col"
          >
            {/* Header */}
            <header className="flex items-center justify-between gap-3 px-5 py-4 bg-primary text-white flex-shrink-0">
              <div>
                <p className="font-script text-xl text-secondary leading-none">Pickup order</p>
                <h2 className="text-lg font-bold">
                  Your order{itemCount > 0 ? ` (${itemCount})` : ''}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            {/* Details step */}
            {step === 'details' ? (
              <div className="flex-1 overflow-y-auto px-5 py-4">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to your order
                </button>

                <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
                  <div>
                    <label htmlFor="cart-name" className="block font-semibold text-primary mb-1">
                      Name for the order <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="cart-name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      autoComplete="name"
                      className="w-full rounded-lg border border-primary/20 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label htmlFor="cart-phone" className="block font-semibold text-primary mb-1">
                      Mobile number <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="cart-phone"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      type="tel"
                      autoComplete="tel"
                      placeholder="04XX XXX XXX"
                      className="w-full rounded-lg border border-primary/20 px-3 py-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      So we can reach you if there is a question about your order.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="cart-email" className="block font-semibold text-primary mb-1">
                      Email <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input
                      id="cart-email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      type="email"
                      autoComplete="email"
                      className="w-full rounded-lg border border-primary/20 px-3 py-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Square emails your receipt to whatever address you enter at payment.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="cart-note" className="block font-semibold text-primary mb-1">
                      Notes for the kitchen{' '}
                      <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <textarea
                      id="cart-note"
                      value={note}
                      onChange={(event) => setNote(event.target.value)}
                      rows={3}
                      maxLength={300}
                      className="w-full rounded-lg border border-primary/20 px-3 py-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Allergies? Please call us as well — our kitchen handles nuts, fish, egg,
                      soy, sesame, milk and gluten.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm mt-4">
                  <p className="font-semibold text-primary mb-1">Collecting</p>
                  <p className="text-gray-600 text-sm">
                    {pickupWhen.type === 'asap'
                      ? (availability?.asapLabel ?? 'As soon as possible')
                      : pickupWhen.label}
                  </p>
                  <p className="text-gray-600 text-sm mt-2">{RESTAURANT.addressShort}</p>
                </div>
              </div>
            ) : (

            /* Cart step */
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {cartRows.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 text-secondary" />
                  </div>
                  <p className="font-bold text-primary mb-1">Your order is empty</p>
                  <p className="text-gray-600 text-sm max-w-xs">
                    Browse the menu and tap a dish to add it.
                  </p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {cartRows.map(({ line, item, unitCents, detail }) => (
                    <li
                      key={line.key}
                      className="bg-white rounded-xl p-4 shadow-sm flex items-start gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-primary leading-snug">{item.name}</p>
                        {detail && (
                          <p className="text-sm text-primary/70 leading-snug">{detail}</p>
                        )}
                        <p className="text-sm text-gray-500">{formatCents(unitCents)} each</p>

                        <div className="flex items-center gap-2 mt-3">
                          <button
                            type="button"
                            onClick={() => setQuantity(line.key, line.quantity - 1)}
                            aria-label={`Reduce ${item.name}`}
                            className="w-8 h-8 rounded-full border border-primary/20 hover:bg-secondary/20 flex items-center justify-center transition-colors"
                          >
                            {line.quantity === 1 ? (
                              <Trash2 className="w-4 h-4 text-primary" />
                            ) : (
                              <Minus className="w-4 h-4 text-primary" />
                            )}
                          </button>
                          <span className="w-8 text-center font-bold text-primary" aria-live="polite">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity(line.key, line.quantity + 1)}
                            aria-label={`Add another ${item.name}`}
                            className="w-8 h-8 rounded-full border border-primary/20 hover:bg-secondary/20 flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-4 h-4 text-primary" />
                          </button>
                        </div>
                      </div>

                      <p className="font-bold text-primary whitespace-nowrap">
                        {formatCents(unitCents * line.quantity)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}

              {/* Pickup time */}
              {cartRows.length > 0 && availability && (
                <section className="mt-6 bg-white rounded-xl p-4 shadow-sm">
                  <h3 className="flex items-center gap-2 font-bold text-primary mb-3">
                    <Clock className="w-4 h-4 text-secondary" />
                    Pickup time
                  </h3>

                  {availability.notice && (
                    <p className="flex items-start gap-2 text-sm text-gray-600 bg-secondary/10 rounded-lg p-3 mb-3">
                      <AlertCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                      {availability.notice}
                    </p>
                  )}

                  {availability.asapAvailable && (
                    <label className="flex items-start gap-3 p-3 rounded-lg border border-primary/10 mb-2 cursor-pointer hover:bg-secondary/5 transition-colors">
                      <input
                        type="radio"
                        name="pickup-when"
                        checked={pickupWhen.type === 'asap'}
                        onChange={() => setPickupWhen({ type: 'asap' })}
                        className="mt-1 accent-[#FFC107]"
                      />
                      <span>
                        <span className="block font-semibold text-primary">As soon as possible</span>
                        <span className="block text-sm text-gray-500">{availability.asapLabel}</span>
                      </span>
                    </label>
                  )}

                  {allSlots.length > 0 && (
                    <label className="flex items-start gap-3 p-3 rounded-lg border border-primary/10 cursor-pointer hover:bg-secondary/5 transition-colors">
                      <input
                        type="radio"
                        name="pickup-when"
                        checked={pickupWhen.type === 'scheduled'}
                        onChange={() => {
                          const first = allSlots[0];
                          setPickupWhen({
                            type: 'scheduled',
                            value: first.value,
                            label: first.label,
                          });
                        }}
                        className="mt-1 accent-[#FFC107]"
                      />
                      <span className="flex-1">
                        <span className="block font-semibold text-primary mb-2">
                          {availability.asapAvailable ? 'Schedule for later' : 'Choose a pickup time'}
                        </span>
                        <select
                          value={pickupWhen.type === 'scheduled' ? pickupWhen.value : ''}
                          onChange={(event) => {
                            const slot = allSlots.find(
                              (candidate) => candidate.value === event.target.value
                            );
                            if (slot) {
                              setPickupWhen({
                                type: 'scheduled',
                                value: slot.value,
                                label: slot.label,
                              });
                            }
                          }}
                          disabled={pickupWhen.type !== 'scheduled'}
                          aria-label="Pickup time"
                          className="w-full rounded-lg border border-primary/20 px-3 py-2 text-primary disabled:opacity-50 bg-white"
                        >
                          <option value="" disabled>
                            Choose a time
                          </option>
                          {/*
                            The day is repeated in each option because a
                            collapsed select shows the option text only, never
                            its optgroup — "11:00am" alone reads as today.
                          */}
                          {availability.days.map((day) => (
                            <optgroup key={day.label} label={day.label}>
                              {day.slots.map((slot) => (
                                <option key={slot.value} value={slot.value}>
                                  {day.label} {slot.label}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                        </select>
                      </span>
                    </label>
                  )}

                  <p className="text-xs text-gray-400 mt-3">
                    All times are Liverpool NSW time. Last orders{' '}
                    {PICKUP_SETTINGS.lastOrderBufferMinutes} minutes before close.
                  </p>
                </section>
              )}
            </div>
            )}

            {/* Footer */}
            <footer className="flex-shrink-0 border-t border-primary/10 bg-white px-5 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-2xl font-bold text-primary">
                  {formatCents(subtotalCents)}
                </span>
              </div>

              {submitError && (
                <p
                  role="alert"
                  className="flex items-start gap-2 text-sm text-red-700 bg-red-50 rounded-lg p-3"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  {submitError}
                </p>
              )}

              {checkoutEnabled ? (
                step === 'cart' ? (
                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    disabled={itemCount === 0 || orderingBlocked}
                    className="w-full px-6 py-4 rounded-full font-bold bg-secondary text-primary hover:bg-secondary/90 transition-colors disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
                  >
                    Continue to details
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handlePay}
                    disabled={!detailsValid || submitting}
                    className="w-full px-6 py-4 rounded-full font-bold bg-secondary text-primary hover:bg-secondary/90 transition-colors disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitting && <Loader2 className="w-5 h-5 animate-spin" />}
                    {submitting ? 'Taking you to payment' : 'Pay securely with Square'}
                  </button>
                )
              ) : (
                <>
                  {/*
                    No Square credentials configured. Rather than dead-end the
                    customer, the existing ordering page and phone stay usable.
                  */}
                  <button
                    type="button"
                    disabled
                    className="w-full px-6 py-4 rounded-full font-bold bg-gray-200 text-gray-500 cursor-not-allowed"
                  >
                    Card payment coming soon
                  </button>
                  <p className="text-xs text-center text-gray-500">
                    Online card payment goes live once Square is connected. Until then:
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={ORDER_URL}
                      className="text-center px-4 py-3 rounded-full font-bold bg-secondary text-primary hover:bg-secondary/90 transition-colors text-sm"
                    >
                      Ordering page
                    </a>
                    <a
                      href={RESTAURANT.phoneHref}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-full font-bold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors text-sm"
                    >
                      <Phone className="w-4 h-4" />
                      Call us
                    </a>
                  </div>
                </>
              )}

              {cartRows.length > 0 && step === 'cart' && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="w-full text-sm text-gray-400 hover:text-primary transition-colors pt-1"
                >
                  Clear order
                </button>
              )}

              {itemCount > 0 && orderingBlocked && (
                <p className="text-xs text-center text-gray-500">
                  Ordering is closed right now — your items are saved for later.
                </p>
              )}
            </footer>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
